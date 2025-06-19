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
  Skeleton
} from '@mui/material';

function MyInvestmentsTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const userid = localStorage.getItem("_id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://jointogain.ap-1.evennode.com/api/user/getTopUp/${userid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();

        if (result.investment_info && result.investment_info.length > 0) {
          const formattedData = result.investment_info.map((item, index) => ({
            sNo: index + 1,
            requestDate: new Date(item.invest_apply_date).toLocaleDateString(),
            approvedDate: item.invest_confirm_date ? new Date(item.invest_confirm_date).toLocaleDateString() : 'Pending',
            investment: item.invest_amount,
            status: item.invest_confirm_date ? 'Active' : 'Pending',
            roiLeft: item.invest_duration_in_month,
          }));

          setData(formattedData);
        } else {
          console.log('No investment data available');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userid]);

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
              <TableCell>Invest Duration (month)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading
              ? Array.from(new Array(rowsPerPage)).map((_, idx) => (
                  <TableRow key={idx}>
                    {Array.from(new Array(6)).map((__, cellIdx) => (
                      <TableCell key={cellIdx}>
                        <Skeleton variant="text" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row.sNo}>
                      <TableCell>{row.sNo}</TableCell>
                      <TableCell>{row.requestDate}</TableCell>
                      <TableCell>{row.approvedDate}</TableCell>
                      <TableCell>{row.investment.toLocaleString()}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>{row.roiLeft}</TableCell>
                    </TableRow>
                  ))}
          </TableBody>
        </Table>
      </TableContainer>
      {!loading && (
        <TablePagination
          component="div"
          count={data.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      )}
    </Paper>
  );
}

export default MyInvestmentsTable;
