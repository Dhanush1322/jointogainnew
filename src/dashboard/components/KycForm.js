import React, { useState } from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import Swal from "sweetalert2";

function KycForm() {
  const [panFile, setPanFile] = useState(null);
  const [bankPassFile, setBankPassFile] = useState(null);
  const [aadhaarFile, setAadhaarFile] = useState(null);
  
  const userId = localStorage.getItem("_id");
  const token = localStorage.getItem("accessToken");

  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async (file, url) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("File upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      Swal.fire({ title: "Error", text: error.message, icon: "error" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId || !token) {
      Swal.fire({ title: "Error", text: "User not authenticated", icon: "error" });
      return;
    }

    await Promise.all([
      uploadFile(panFile, `http://jointogain.ap-1.evennode.com/api/user/addPanCardFile/${userId}`),
      uploadFile(aadhaarFile, `http://jointogain.ap-1.evennode.com/api/user/addAadharCardFile/${userId}`),
      uploadFile(bankPassFile, `http://jointogain.ap-1.evennode.com/api/user/addBankPassbookFile/${userId}`),
    ]);

    setPanFile(null);
    setBankPassFile(null);
    setAadhaarFile(null);

    Swal.fire({ title: "Success!", text: "Files uploaded successfully!", icon: "success" });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ p: 4, boxShadow: 2, borderRadius: 2, bgcolor: "#fff" }}>
        <Typography variant="h5" gutterBottom>
          KYC Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Upload PAN</Typography>
            <Button variant="outlined" component="label">
              Choose File
              <input type="file" hidden onChange={(e) => handleFileChange(e, setPanFile)} />
            </Button>
            <Typography variant="body2" sx={{ ml: 2, display: "inline" }}>
              {panFile ? panFile.name : "No file chosen"}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Upload Bank Passbook</Typography>
            <Button variant="outlined" component="label">
              Choose File
              <input type="file" hidden onChange={(e) => handleFileChange(e, setBankPassFile)} />
            </Button>
            <Typography variant="body2" sx={{ ml: 2, display: "inline" }}>
              {bankPassFile ? bankPassFile.name : "No file chosen"}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Upload Aadhaar</Typography>
            <Button variant="outlined" component="label">
              Choose File
              <input type="file" hidden onChange={(e) => handleFileChange(e, setAadhaarFile)} />
            </Button>
            <Typography variant="body2" sx={{ ml: 2, display: "inline" }}>
              {aadhaarFile ? aadhaarFile.name : "No file chosen"}
            </Typography>
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, background: "#1a1f36" }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default KycForm;
