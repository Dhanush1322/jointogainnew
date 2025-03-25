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

function DownlineTable() {
  const data = [
    { sNo: 1, username: 'user1', level: 1, name: 'John Doe', investment: 10000, joinDate: '2022-01-01', activationDate: '2022-01-02' },
    { sNo: 2, username: 'user2', level: 2, name: 'Jane Smith', investment: 20000, joinDate: '2022-02-01', activationDate: '2022-02-02' },
    { sNo: 3, username: 'user3', level: 1, name: 'Alice Johnson', investment: 15000, joinDate: '2022-03-01', activationDate: '2022-03-02' },
    { sNo: 4, username: 'user4', level: 3, name: 'Bob Brown', investment: 25000, joinDate: '2022-04-01', activationDate: '2022-04-02' },
    { sNo: 5, username: 'user5', level: 2, name: 'Charlie Davis', investment: 30000, joinDate: '2022-05-01', activationDate: '2022-05-02' },
    // You can add more rows here
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
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Box mb={2}>
        <Typography variant="h6" component="div">
          Downline Members
        </Typography>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SNo.</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Investment (Rs)</TableCell>
              <TableCell>Join Date</TableCell>
              <TableCell>Activation Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.sNo}>
                  <TableCell>{row.sNo}</TableCell>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>{row.level}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.investment.toLocaleString()}</TableCell>
                  <TableCell>{row.joinDate}</TableCell>
                  <TableCell>{row.activationDate}</TableCell>
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

export default DownlineTable;
