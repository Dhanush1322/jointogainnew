import React, { useEffect, useState } from "react";
import {
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function MyKycList() {
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);
const userid = localStorage.getItem("_id");
useEffect(() => {
  fetch(`https://jointogain.ap-1.evennode.com/api/user/getUser/${userid}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.Status && data.data?.Status) {
        console.log("Fetched User:", data.data.data); // <-- Add this
        setUsers([data.data.data]); 
      }
    })
    .catch((err) => {
      console.error("Error fetching users:", err);
    });
}, []);


  const handleView = (fileUrl) => {
    if (!fileUrl || fileUrl.trim() === "") return;
    setDialogContent(fileUrl);
    setOpenDialog(true);
  };

  const getFileUrl = (type, fileName) => {
    const baseUrls = {
      aadhar: "https://jointogain.ap-1.evennode.com/api/user/downloadAadharFile?fileUrl=",
      pan: "https://jointogain.ap-1.evennode.com/api/user/downloadPanFile?fileUrl=",
      bank: "https://jointogain.ap-1.evennode.com/api/user/downloadBankPassbookFile?fileUrl=",
    };
    return `${baseUrls[type]}${fileName}`;
  };

  
  return (
    <div style={{ padding: "16px" }}>
     

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>KYC Documents</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .filter((user) => user.kyc_status?.trim() === "" || user.kyc_status?.trim() === "Approved" || user.kyc_status?.trim() === "Rejected")
              .map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.kyc_status || "Pending"}</TableCell>
                  <TableCell>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {user.uploaded_aadher_file?.trim() !== "" && (
                        <Button
                          variant="outlined"
                          onClick={() => handleView(getFileUrl("aadhar", user.uploaded_aadher_file))}
                        >
                          View Aadhar
                        </Button>
                      )}
                      {user.uploaded_pan_file?.trim() !== "" && (
                        <Button
                          variant="outlined"
                          onClick={() => handleView(getFileUrl("pan", user.uploaded_pan_file))}
                        >
                          View PAN
                        </Button>
                      )}
                      {user.uploaded_bank_passbook_file?.trim() !== "" && (
                        <Button
                          variant="outlined"
                          onClick={() => handleView(getFileUrl("bank", user.uploaded_bank_passbook_file))}
                        >
                          View Passbook
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>View Document</DialogTitle>
        <DialogContent>
          {dialogContent && (
            <img
              src={dialogContent}
              alt="Document"
              style={{ width: "100%", marginTop: 10, borderRadius: 8 }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default MyKycList;

