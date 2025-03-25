import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
  Box,
} from '@mui/material';

function WithdrawDeatislTable() {
  const data = [
    {
      sNo: 1,
      reqDate: '21-Mar-2025',
      paidDate: '',
      amountReq: 52450,
      tds: 0.00,
      sc: 0.00,
      netPay: 52450,
      transactionNo: '',
      status: 'Pending',
    },
    {
      sNo: 2,
      reqDate: '01-Mar-2025',
      paidDate: '11-Mar-2025',
      amountReq: 27900,
      tds: 0.00,
      sc: 0.00,
      netPay: 27900,
      transactionNo: 'Paid',
      status: 'Paid',
    },
    {
      sNo: 3,
      reqDate: '21-Feb-2025',
      paidDate: '21-Feb-2025',
      amountReq: 12850,
      tds: 0.00,
      sc: 0.00,
      netPay: 12850,
      transactionNo: 'Paid',
      status: 'Paid',
    },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', p: 2 }}>
      <Box mb={2}>
        <Typography variant="h6" component="div">
          Withdraw Details
        </Typography>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SNo.</TableCell>
              <TableCell>Req Date</TableCell>
              <TableCell>Paid Date</TableCell>
              <TableCell>Amount Req (Rs)</TableCell>
              <TableCell>TDS</TableCell>
              <TableCell>S.C</TableCell>
              <TableCell>NetPay (Rs)</TableCell>
              <TableCell>Transaction No</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.sNo}>
                <TableCell>{row.sNo}</TableCell>
                <TableCell>{row.reqDate}</TableCell>
                <TableCell>{row.paidDate || '-'}</TableCell>
                <TableCell>{row.amountReq.toLocaleString()}</TableCell>
                <TableCell>{row.tds.toFixed(2)}</TableCell>
                <TableCell>{row.sc.toFixed(2)}</TableCell>
                <TableCell>{row.netPay.toLocaleString()}</TableCell>
                <TableCell>{row.transactionNo || '-'}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Paper>
  );
}

export default WithdrawDeatislTable;
