import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Pagination, Dialog, DialogContent, TextField, Box, CircularProgress
} from "@mui/material";
import { CSVLink } from "react-csv";
import useAccountTransactionTable from "../hooks/useAccountTransactionTable";

const AccountTransactionTable = () => {
  const {
    currentPage,
    open,
    selectedImage,
    searchTerm,
    filteredData,
    currentRecords,
    totalPages,
    loading,
    setCurrentPage,
    setSearchTerm,
    handleOpen,
    setOpen
  } = useAccountTransactionTable();

  return (
    <Paper sx={{ padding: 2, margin: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
        <TextField
          label="Search by Name"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <Button variant="contained" color="primary">
          <CSVLink
            filename="withdraw_request_data.csv"
            data={filteredData}
            headers={[
              { label: "Name", key: "name" },
              { label: "Invested Amount", key: "investedamount" },
              { label: "Investment Type", key: "invest_type" },
              { label: "Duration", key: "invest_duration_in_month" },
              { label: "Remaining", key: "remainingmonth" },
              { label: "Available Credit", key: "availableCredit" },
              { label: "Amount Req", key: "amountReq" },
              { label: "TDS", key: "tds" },
              { label: "SC", key: "sc" },
              { label: "Net Pay", key: "netPay" },
              { label: "Date", key: "date" },
              { label: "Payout Date", key: "payoutDate" },
            ]}
            style={{ textDecoration: "none", color: "white" }}
          >
            Export CSV
          </CSVLink>
        </Button>
      </Box>

      <h3>Withdraw Request List</h3>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Invested Amount</TableCell>
                  <TableCell>Investment Type</TableCell>
                  <TableCell>Investment Duration</TableCell>
                  <TableCell>Remaining Month</TableCell>
                  <TableCell>Available Credit</TableCell>
                  <TableCell>Amount Req</TableCell>
                  <TableCell>TDS</TableCell>
                  <TableCell>S.C</TableCell>
                  <TableCell>NetPay (Rs)</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Payout Date</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentRecords.map((record, index) => (
                  <TableRow key={`${record.userID}-${index}`}>
                    <TableCell>{(currentPage - 1) * 10 + index + 1}</TableCell>
                    <TableCell>{record.name}</TableCell>
                    <TableCell>{record.investedamount}</TableCell>
                    <TableCell>{record.invest_type}</TableCell>
                    <TableCell style={{ color: "green", fontWeight: "bold" }}>{record.invest_duration_in_month}</TableCell>
                    <TableCell style={{ color: "red", fontWeight: "bold" }}>{record.remainingmonth}</TableCell>
                    <TableCell>{record.availableCredit}</TableCell>
                    <TableCell>{record.amountReq}</TableCell>
                    <TableCell>{record.tds}</TableCell>
                    <TableCell>{record.sc}</TableCell>
                    <TableCell>{record.netPay}</TableCell>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.payoutDate}</TableCell>
                    <TableCell>Pending</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
          />
        </>
      )}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          {selectedImage && (
            <img src={selectedImage} alt="Bank Proof" style={{ width: "100%", maxHeight: "500px" }} />
          )}
        </DialogContent>
      </Dialog>
    </Paper>
  );
};

export default AccountTransactionTable;
