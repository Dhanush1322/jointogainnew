import React, { useState } from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import Swal from "sweetalert2";

function KycForm() {
  const [panFile, setPanFile] = useState(null);
  const [bankPassFile, setBankPassFile] = useState(null);
  const [aadhaarFile, setAadhaarFile] = useState(null);

  const userId = localStorage.getItem("userId");

  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async (file, endpoint) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch(`http://localhost:5000/api/user/${endpoint}/${userId}`, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      console.log(`${endpoint} upload result:`, result);
    } catch (error) {
      console.error(`Error uploading ${endpoint}:`, error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadFile(panFile, "addPanCardFile");
    await uploadFile(aadhaarFile, "addAadharCardFile");
    await uploadFile(bankPassFile, "addBankPassbookFile");

    // Reset form
    setPanFile(null);
    setBankPassFile(null);
    setAadhaarFile(null);

    Swal.fire({
      title: "Success!",
      text: "Files uploaded successfully!",
      icon: "success",
      confirmButtonText: "OK"
    });
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
