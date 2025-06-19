import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TablePagination,
  Typography, Button, TextField, Stack, CircularProgress, Box
} from '@mui/material';
import useDownlineTable from '../hooks/useDownlineTable';

function DownlineTable() {
  const {
    filteredData,
    searchTerm,
    selectedUser,
    page,
    rowsPerPage,
    loading,
    setSelectedUser,
    handleSearch,
    handleExport,
    handleViewClick,
    setPage,
    setRowsPerPage
  } = useDownlineTable();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', p: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} mb={2}>
        <Typography variant="h6">
          {selectedUser ? `Referrals of ${selectedUser.name}` : 'Downline Members'}
        </Typography>
        <TextField
          label="Search by name"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Button variant="contained" color="success" onClick={handleExport}>
          Export CSV
        </Button>
      </Stack>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>SNo.</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Level</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Investment (Rs)</TableCell>
                  <TableCell>View Investment</TableCell>
                  <TableCell>Join Date</TableCell>
                  <TableCell>Activation Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center">No data available</TableCell>
                  </TableRow>
                ) : (
                  filteredData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow
                        key={row._id}
                        hover
                        onClick={() => setSelectedUser(row)}
                        style={{
                          cursor: "pointer",
                          backgroundColor: selectedUser?._id === row._id ? "#f0f8ff" : "inherit",
                        }}
                      >
                        <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                        <TableCell>{row.user_profile_id}</TableCell>
                        <TableCell>{row.user_level}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>
                          {row.investment_info?.length > 0
                            ? row.investment_info.reduce((sum, inv) => sum + (inv.invest_amount || 0), 0).toLocaleString('en-IN')
                            : 'N/A'}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewClick(row._id);
                            }}
                          >
                            View
                          </Button>
                        </TableCell>
                        <TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{row.user_status === 'Inactive' ? 'Inactive' : 'Active'}</TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={filteredData.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </>
      )}
    </Paper>
  );
}

export default DownlineTable;
