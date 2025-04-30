import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Typography, TablePagination, Chip, TextField, Button
} from '@mui/material';
import { Download as DownloadIcon, Search as SearchIcon } from '@mui/icons-material';

const MyLeveltable = () => {
  const [referralPayouts, setReferralPayouts] = useState([]);
  const [filteredPayouts, setFilteredPayouts] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const userId = localStorage.getItem('_id');

  useEffect(() => {
    if (!userId) return;

    fetch(`https://jointogain.ap-1.evennode.com/api/user/getUser/${userId}`)
      .then(res => res.json())
      .then(async (data) => {
        if (data.Status && data.data?.Status) {
          const payouts = data.data.data?.referral_payouts || [];
          const pendingPayouts = payouts.filter(p => p.status === "Pending");

          const updatedPayouts = await Promise.all(
            pendingPayouts.map(async (payout) => {
              try {
                const res = await fetch("https://jointogain.ap-1.evennode.com/api/user/getReferralPayoutAmountOfInvestment", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    user_id: userId,
                    investment_id: payout.investment_id,
                    referral_payout_id: payout._id
                  })
                });
                const result = await res.json();
                return {
                  ...payout,
                  amount: result.amount || payout.amount
                };
              } catch (err) {
                console.error("Error fetching payout amount:", err);
                return payout;
              }
            })
          );

          setReferralPayouts(updatedPayouts);
          setFilteredPayouts(updatedPayouts);
        }
      })
      .catch(err => {
        console.error("Failed to fetch user details:", err);
      });
  }, [userId]);

  const handleSearch = () => {
    if (!searchDate) {
      setFilteredPayouts(referralPayouts);
      return;
    }

    const filtered = referralPayouts.filter(payout =>
      new Date(payout.payout_date).toLocaleDateString().includes(searchDate)
    );
    setFilteredPayouts(filtered);
    setPage(0);
  };

  const handleExport = () => {
    const csvRows = [
      ["S.N", "Payout Date", "Amount", "Status"],
      ...filteredPayouts.map((payout, index) => [
        index + 1,
        new Date(payout.payout_date).toLocaleDateString(),
        payout.amount,
        payout.status
      ])
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(row => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "referral_payouts.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div style={{ padding: 16 }}>
      <Typography variant="h5" gutterBottom>
        My Pending Referral Payouts
      </Typography>

      {/* Search and Export */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <TextField
          label="Search by Date (e.g. 4/30/2025)"
          variant="outlined"
          size="small"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          InputProps={{
            endAdornment: <SearchIcon onClick={handleSearch} style={{ cursor: 'pointer' }} />
          }}
        />

        <Button variant="contained" color="primary" startIcon={<DownloadIcon />} onClick={handleExport}>
          Export CSV
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ backgroundColor: '#f0f0f0' }}>
            <TableRow>
              <TableCell><strong>S.N</strong></TableCell>
              <TableCell><strong>Payout Date</strong></TableCell>
              <TableCell><strong>Amount</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPayouts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((payout, index) => (
                <TableRow key={payout._id}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{new Date(payout.payout_date).toLocaleDateString()}</TableCell>
                  <TableCell>₹ {payout.amount}</TableCell>
                  <TableCell>
                    <Chip label="Pending" color="warning" variant="outlined" />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={filteredPayouts.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </TableContainer>
    </div>
  );
};

export default MyLeveltable;
