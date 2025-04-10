import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Pagination, Dialog, DialogContent,
} from "@mui/material";
import { red } from "@mui/material/colors";

const WithdrawDeatislTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [withdrawData, setWithdrawData] = useState([]);
  const recordsPerPage = 10;

  const fetchData = async () => {
    try {
      const userId = localStorage.getItem("_id"); // Retrieve user ID from localStorage
      const token = localStorage.getItem("accessToken"); // Retrieve token from localStorage

      if (!userId || !token) {
        Swal.fire("Error", "User not authenticated!", "error");
        return;
      }

      const response = await axios.get(`https://jointogain.ap-1.evennode.com/api/user/getUser/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }, // Pass token in headers
      });

      const user = response.data.data.data; // Assuming API returns { data: user }
      const formattedData = user.investment_info?.flatMap((investment) => {
        const approvedPayoutsCount = investment.roi_payout_status?.filter(payout => payout.status === "Approved").length || 0;
        const remainingMonths = (investment.invest_duration_in_month || 0) - approvedPayoutsCount;

        return investment.roi_payout_status?.some((payout) => payout.status === "Pending")
          ? [{
              userID: user.user_profile_id,
              name: user.name,
              id: user._id,
              availableCredit: (investment.capital_amount || 0) + (investment.profit_amount || 0),
              amountReq: investment.net_amount_per_month || 0,
              tds: investment.tds_deduction_amount || 0,
              sc: investment.sc_deduction_amount || 0,
              investmentid: investment._id || 0,
              investedamount: investment.invest_amount || 0,
              invest_type: investment.invest_type || 0,
              netPay: investment.net_amount_per_month || 0,
              invest_duration_in_month: investment.invest_duration_in_month || 0,
              remainingmonth: remainingMonths,
              date: investment.invest_confirm_date ? new Date(investment.invest_confirm_date).toLocaleDateString() : "N/A",
              payoutDate: new Date(investment.roi_payout_status.find((p) => p.status === "Pending").payout_date).toLocaleDateString(),
              bankImage: user.bankImage,
            }]
          : [];
      }) || [];

      setWithdrawData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire("Error", "Failed to fetch data!", "error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = withdrawData.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(withdrawData.length / recordsPerPage);

  const handleOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  return (
    <Paper sx={{ padding: 2, margin: 2 }}>
      <h3>Withdraw Request List</h3>
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
           
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRecords.map((record, index) => (
              <TableRow key={`${record.userID}-${index}`}>
                <TableCell>{indexOfFirstRecord + index + 1}</TableCell>
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
            
                <TableCell sx={{color:'Green'}}>Paid</TableCell>
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

      {/* Dialog for Viewing Bank Image */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          {selectedImage && <img src={selectedImage} alt="Bank Proof" style={{ width: "100%", maxHeight: "500px" }} />}
        </DialogContent>
      </Dialog>
    </Paper>
  );
};

export default WithdrawDeatislTable;
