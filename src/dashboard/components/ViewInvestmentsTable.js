import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TablePagination,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';

function ViewInvestmentsTable({ userId }) {
  const [investments, setInvestments] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInvestmentData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://jointogain.ap-1.evennode.com/api/user/getUser/${userId}`);
        const userData = res.data?.data?.data;

        if (userData && userData.investment_info?.length > 0) {
          const mappedInvestments = userData.investment_info.map((item, index) => ({
            id: item._id,
            name: userData.name,
            level: userData.user_level,
            type: item.invest_type,
            amount: item.invest_amount,
            joinDate: new Date(item.invest_apply_date).toLocaleDateString(),
          }));
          setInvestments(mappedInvestments);
        }
      } catch (error) {
        console.error('Error fetching user investment info:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchInvestmentData();
    }
  }, [userId]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const paginatedData = investments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Investment Details
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#0072a0' }}>
                <TableCell sx={{ color: 'white' }}>SL</TableCell>
                <TableCell sx={{ color: 'white' }}>Name</TableCell>
                <TableCell sx={{ color: 'white' }}>Level</TableCell>
                <TableCell sx={{ color: 'white' }}>Investment Type</TableCell>
                <TableCell sx={{ color: 'white' }}>Investment Amount</TableCell>
                <TableCell sx={{ color: 'white' }}>Join Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((inv, index) => (
                <TableRow key={inv.id}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{inv.name}</TableCell>
                  <TableCell>{inv.level}</TableCell>
                  <TableCell>{inv.type}</TableCell>
                  <TableCell>₹{inv.amount}</TableCell>
                  <TableCell>{inv.joinDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={investments.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </TableContainer>
      )}
    </div>
  );
}

export default ViewInvestmentsTable;
