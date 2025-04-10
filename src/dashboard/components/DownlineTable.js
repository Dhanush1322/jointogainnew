import React, { useState, useEffect } from 'react';
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
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import

function DownlineTable() {
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate(); // Initialize

  const token = localStorage.getItem("accessToken");
  const userId = selectedUser ? selectedUser._id : localStorage.getItem("_id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://jointogain.ap-1.evennode.com/api/user/getUser/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const result = await response.json();
        if (result?.data?.data?.referrals) {
          setData(result.data.data.referrals);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setData([]);
      }
    };

    fetchData();
  }, [userId, token]);

  const handleViewClick = (userId) => {
    // Navigate to another page with the userId in the route or as a query param
    navigate(`/ViewInvestments/${userId}`);
    // or use query param
    // navigate(`/user-details?userId=${userId}`);
  };

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
        <Typography variant="h6">
          {selectedUser ? `Referrals of ${selectedUser.name}` : 'Downline Members'}
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
              <TableCell>View Investment</TableCell>
              <TableCell>Join Date</TableCell>
              <TableCell>Activation Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">No data available</TableCell>
              </TableRow>
            ) : (
              data
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
                    <TableCell>{row.user_level || 'N/A'}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>
  {row.investment_info?.length > 0
    ? row.investment_info
        .reduce((sum, inv) => sum + (inv.invest_amount || 0), 0)
        .toLocaleString('en-IN')
    : 'N/A'}
</TableCell>

                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={(e) => {
                          e.stopPropagation(); // prevent row click
                          handleViewClick(row._id); // pass ID
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
