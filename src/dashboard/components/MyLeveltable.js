import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Typography, TablePagination, Chip, TextField, Button, Skeleton
} from '@mui/material';
import { Download as DownloadIcon, Search as SearchIcon } from '@mui/icons-material';

const MyLeveltable = () => {
  const [referralPayouts, setReferralPayouts] = useState([]);
  const [filteredPayouts, setFilteredPayouts] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem('_id');

  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    fetch(`https://jointogain.ap-1.evennode.com/api/user/getUser/${userId}`)
      .then(res => res.json())
      .then(async (data) => {
        if (data.Status && data.data?.Status) {
          const user = data.data.data;
          const payouts = user?.referral_payouts || [];
          const pendingPayouts = payouts.filter(p => p.status === "Pending");

          const updatedPayouts = await Promise.all(
            pendingPayouts.map(async (payout) => {
              let fromUserName = "N/A";

              if (Array.isArray(user.referrals)) {
                for (const referral of user.referrals) {
                  if (Array.isArray(referral.investment_info)) {
                    const match = referral.investment_info.find(info => info._id === payout.investment_id);
                    if (match) {
                      fromUserName = referral.name || "N/A";
                      break;
                    }
                  }
                }
              }

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
                  amount: result.amount || payout.amount,
                  fromUserName: fromUserName
                };
              } catch (err) {
                console.error("Error fetching payout amount:", err);
                return {
                  ...payout,
                  fromUserName: fromUserName
                };
              }
            })
          );

          setReferralPayouts(updatedPayouts);
          setFilteredPayouts(updatedPayouts);
        }
      })
      .catch(err => {
        console.error("Failed to fetch user details:", err);
      })
      .finally(() => setLoading(false));
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
      ["S.N", "From Name", "Payout Date", "Amount", "Status"],
      ...filteredPayouts.map((payout, index) => [
        index + 1,
        payout.fromUserName,
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

  const totalAmount = filteredPayouts.reduce((sum, payout) => sum + Number(payout.amount || 0), 0);

  return (
    <div style={{ padding: 16 }}>
      <Typography variant="h5" gutterBottom>
        My Pending Referral Payouts
      </Typography>

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
              <TableCell><strong>From Name</strong></TableCell>
              <TableCell><strong>Payout Date</strong></TableCell>
              <TableCell><strong>Amount</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading
              ? Array.from(new Array(rowsPerPage)).map((_, idx) => (
                  <TableRow key={idx}>
                    {Array.from(new Array(5)).map((__, cellIdx) => (
                      <TableCell key={cellIdx}>
                        <Skeleton variant="text" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : filteredPayouts
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((payout, index) => (
                    <TableRow key={payout._id}>
                      <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                      <TableCell>{payout.fromUserName || "N/A"}</TableCell>
                      <TableCell>{new Date(payout.payout_date).toLocaleDateString()}</TableCell>
                      <TableCell>₹ {payout.amount}</TableCell>
                      <TableCell>
                        <Chip label="Pending" color="warning" variant="outlined" />
                      </TableCell>
                    </TableRow>
                  ))}
          </TableBody>
        </Table>

        {!loading && (
          <p style={{ padding: '10px', fontWeight: 'bold' }}>
            Total Amount: ₹ {totalAmount.toFixed(2)}
          </p>
        )}

        {!loading && (
          <TablePagination
            component="div"
            count={filteredPayouts.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        )}
      </TableContainer>
    </div>
  );
};

export default MyLeveltable;
