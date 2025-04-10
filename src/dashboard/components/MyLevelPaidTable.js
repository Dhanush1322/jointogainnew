import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Typography, TablePagination, Chip
} from '@mui/material';

const MyLevelPaidTable = () => {
  const [referralPayouts, setReferralPayouts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const userId = localStorage.getItem('_id');

  useEffect(() => {
    if (!userId) return;

    // 1. Fetch user and their referral payouts
    fetch(`https://jointogain.ap-1.evennode.com/api/user/getUser/${userId}`)
      .then(res => res.json())
      .then(async (data) => {
        if (data.Status && data.data?.Status) {
          const payouts = data.data.data?.referral_payouts || [];

          // Filter only "Pending"
          const pendingPayouts = payouts.filter(p => p.status === "Approved");

          // 2. Fetch amount for each referral payout
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
                  amount: result.amount || payout.amount // fallback to existing amount
                };
              } catch (err) {
                console.error("Error fetching payout amount:", err);
                return payout; // fallback
              }
            })
          );

          setReferralPayouts(updatedPayouts);
        }
      })
      .catch(err => {
        console.error("Failed to fetch user details:", err);
      });
  }, [userId]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div style={{ padding: 16 }}>
      <Typography variant="h5" gutterBottom>
        My Paid Referral Payouts
      </Typography>

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
            {referralPayouts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((payout, index) => (
                <TableRow key={payout._id}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                 
                  <TableCell>{new Date(payout.payout_date).toLocaleDateString()}</TableCell>
                  <TableCell>₹ {payout.amount}</TableCell>
                  <TableCell>
                    <Chip label="Approved" color="success" variant="outlined" />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={referralPayouts.length}
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

export default MyLevelPaidTable;
