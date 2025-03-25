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

function AccountTransactionTable() {
  const data = [
    {
      sNo: 1,
      description: 'ROI Income',
      credit: 5000,
      tax: 125,
      sc: 125,
      netAmount: 4750,
      debit: 0,
      date: '21-Mar-2025',
      confirmedDate: '21-Mar-2025',
      remarks: 'ROI Income',
    },
    {
      sNo: 2,
      description: 'Level Income',
      credit: 1500,
      tax: 75,
      sc: 75,
      netAmount: 1350,
      debit: 0,
      date: '21-Mar-2025',
      confirmedDate: '21-Mar-2025',
      remarks: 'Level-1',
    },
    {
      sNo: 3,
      description: 'Level Income',
      credit: 1500,
      tax: 75,
      sc: 75,
      netAmount: 1350,
      debit: 0,
      date: '21-Mar-2025',
      confirmedDate: '21-Mar-2025',
      remarks: 'Level-1',
    },
    {
      sNo: 4,
      description: 'Level Income',
      credit: 1500,
      tax: 75,
      sc: 75,
      netAmount: 1350,
      debit: 0,
      date: '21-Mar-2025',
      confirmedDate: '21-Mar-2025',
      remarks: 'Level-1',
    },
    {
      sNo: 5,
      description: 'Level Income',
      credit: 1500,
      tax: 75,
      sc: 75,
      netAmount: 1350,
      debit: 0,
      date: '21-Mar-2025',
      confirmedDate: '21-Mar-2025',
      remarks: 'Level-1',
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
          Account Transaction Details
        </Typography>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SNo.</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Credit (Rs)</TableCell>
              <TableCell>Tax (Rs)</TableCell>
              <TableCell>SC (Rs)</TableCell>
              <TableCell>Net Amount (Rs)</TableCell>
              <TableCell>Debit</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Confirmed Date</TableCell>
              <TableCell>Remarks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.sNo}>
                <TableCell>{row.sNo}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.credit.toLocaleString()}</TableCell>
                <TableCell>{row.tax.toLocaleString()}</TableCell>
                <TableCell>{row.sc.toLocaleString()}</TableCell>
                <TableCell>{row.netAmount.toLocaleString()}</TableCell>
                <TableCell>{row.debit.toLocaleString()}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.confirmedDate}</TableCell>
                <TableCell>{row.remarks}</TableCell>
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

export default AccountTransactionTable;
