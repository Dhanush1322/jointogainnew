import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import useKycForm from "../hooks/useKycForm";

function KycForm() {
  const userId = localStorage.getItem("_id");
  const token = localStorage.getItem("accessToken");

  const {
    panFile,
    bankPassFile,
    aadhaarFile,
    setPanFile,
    setBankPassFile,
    setAadhaarFile,
    handleFileChange,
    handleSubmit,
  } = useKycForm(userId, token);

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
