import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TablePagination,
  Typography, Box, Button, TextField, Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function DownlineTable() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");
  const currentUserId = localStorage.getItem("_id");
  const userId = selectedUser ? selectedUser._id : currentUserId;

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

        const flattenReferrals = (referrals, level = 1) => {
          let flattened = [];

          for (const referral of referrals) {
            referral.user_level = level;
            flattened.push(referral);

            if (referral.referrals?.length > 0) {
              flattened = flattened.concat(flattenReferrals(referral.referrals, level + 1));
            }
          }

          return flattened;
        };

        const rootUser = result?.data?.data;

        if (rootUser?.referrals?.length > 0) {
          let flattenedData = flattenReferrals(rootUser.referrals, 1);

          // Exclude current user's own ID
          flattenedData = flattenedData.filter(user => user._id !== currentUserId);

          setData(flattenedData);
          setFilteredData(flattenedData);
        } else {
          // If no referrals and this is not the current user, show the user
          if (rootUser._id !== currentUserId) {
            rootUser.user_level = 0;
            setData([rootUser]);
            setFilteredData([rootUser]);
          } else {
            setData([]);
            setFilteredData([]);
          }
        }

      } catch (error) {
        console.error('Error fetching data:', error);
        setData([]);
        setFilteredData([]);
      }
    };

    fetchData();
  }, [userId, token, currentUserId]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = data.filter(user =>
      user.name?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
    setPage(0);
  };

  const handleExport = () => {
    const rows = filteredData.map(row => ({
      Username: row.user_profile_id,
      Level: row.user_level,
      Name: row.name,
      Investment: row.investment_info?.reduce((sum, inv) => sum + (inv.invest_amount || 0), 0) || 0,
      JoinDate: new Date(row.createdAt).toLocaleDateString(),
      Status: row.user_status
    }));

    const csvContent = [
      Object.keys(rows[0]).join(','),
      ...rows.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "downline_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewClick = (userId) => {
    navigate(`/ViewInvestments/${userId}`);
  };

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
          onChange={handleSearch}
        />
        <Button variant="contained" color="success" onClick={handleExport}>
          Export CSV
        </Button>
      </Stack>

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
    </Paper>
  );
}

export default DownlineTable;
