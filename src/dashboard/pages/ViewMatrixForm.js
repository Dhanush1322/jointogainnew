import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

function ViewMatrixForm() {
  const data = [
    { level: 1, active: 10, inactive: 10, total: 20, business: 1000000 },
    { level: 2, active: 30, inactive: 30, total: 60, business: 5800000 },
    { level: 3, active: 32, inactive: 32, total: 64, business: 7950000 },
    { level: 4, active: 28, inactive: 28, total: 56, business: 4600000 },
    { level: 5, active: 18, inactive: 18, total: 36, business: 4850000 },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">View Matrix </h2>
      <TableContainer component={Paper} >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Level</TableCell>
              <TableCell>Active Members</TableCell>
              <TableCell>Inactive Members</TableCell>
              <TableCell>Total Members</TableCell>
              <TableCell>Total Business</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.level}</TableCell>
                <TableCell>{row.active}</TableCell>
                <TableCell>{row.inactive}</TableCell>
                <TableCell>{row.total}</TableCell>
                <TableCell>{row.business.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2, 5, 10]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default ViewMatrixForm;
