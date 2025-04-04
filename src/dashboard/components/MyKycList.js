import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import axios from "axios";

function MyKycList() {
  const [kycData, setKycData] = useState(null);
  const userId = localStorage.getItem("_id");
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!userId || !token) {
      console.error("User ID or Token missing");
      return;
    }

    axios
      .get(`http://jointogain.ap-1.evennode.com/api/user/getUser/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      .then((response) => {
        if (response.data.Status) {
          console.log("KYC Data:", response.data.data.data);
          setKycData(response.data.data.data);
        }
      })
      .catch((error) => console.error("Error fetching KYC data:", error));
  }, [userId, token]);

  if (!kycData) return <p>Loading...</p>;

  const getFileType = (filename) => {
    return filename?.split('.').pop().toLowerCase();
  };

  const renderFile = (fileName, type) => {
    if (!fileName || fileName.trim() === "") return "Not Uploaded";

    const fileUrl = `http://jointogain.ap-1.evennode.com/api/user/download${type}File/${fileName}`;
    const fileType = getFileType(fileName);

    const isImage = fileType === "jpg" || fileType === "jpeg" || fileType === "png";

    if (isImage) {
      return (
        <img
          src={fileUrl}
          alt={type}
          width="100"
          height="100"
          style={{
            objectFit: "cover",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
          onError={(e) => {
            console.error(`Error loading ${type} image:`, e);
            e.target.alt = "Image Not Found";
            e.target.style.border = "1px solid red";
          }}
        />
      );
    } else {
      return (
        <a href={fileUrl} target="_blank" rel="noopener noreferrer">
          View Document
        </a>
      );
    }
  };

  return (
    <Paper sx={{ padding: 2, margin: 2 }}>
      <h3>My KYC List</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Username</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>PAN</strong></TableCell>
              <TableCell><strong>Aadhar</strong></TableCell>
              <TableCell><strong>Bank Passbook</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{kycData.user_profile_id}</TableCell>
              <TableCell>{kycData.name}</TableCell>
              <TableCell>{renderFile(kycData.uploaded_pan_file, "Pan")}</TableCell>
              <TableCell>{renderFile(kycData.uploaded_aadher_file, "Aadhar")}</TableCell>
              <TableCell>{renderFile(kycData.uploaded_bank_passbook_file, "BankPassbook")}</TableCell>
              <TableCell>{kycData.kyc_status?.trim() || "Pending"}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default MyKycList;
