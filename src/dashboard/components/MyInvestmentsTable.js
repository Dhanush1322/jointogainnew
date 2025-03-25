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

function MyInvestmentsTable() {
  const data = [
    {
      sNo: 1,
      requestDate: '16/Jan/2025',
      approvedDate: '16/Jan/2025',
      investment: 50000,
      status: 'Active',
      roiLeft: 18,
      roiSchedule: 'View',
      agreement: 'View',
    },
    {
      sNo: 2,
      requestDate: '27/Feb/2025',
      approvedDate: '27/Feb/2025',
      investment: 950000,
      status: 'Active',
      roiLeft: 20,
      roiSchedule: 'View',
      agreement: 'View',
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
          My Investments
        </Typography>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SNo.</TableCell>
              <TableCell>Request Date</TableCell>
              <TableCell>Approved Date</TableCell>
              <TableCell>Investment (Rs)</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>ROI Left</TableCell>
              <TableCell>ROI Schedule</TableCell>
              <TableCell>Agreement</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.sNo}>
                <TableCell>{row.sNo}</TableCell>
                <TableCell>{row.requestDate}</TableCell>
                <TableCell>{row.approvedDate}</TableCell>
                <TableCell>{row.investment.toLocaleString()}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.roiLeft}</TableCell>
                <TableCell>{row.roiSchedule}</TableCell>
                <TableCell>{row.agreement}</TableCell>
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

export default MyInvestmentsTable;
