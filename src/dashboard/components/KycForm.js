import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

function KycForm() {
  const [panFile, setPanFile] = useState(null);
  const [bankPassbookFile, setBankPassbookFile] = useState(null);
  const [aadhaarFile, setAadhaarFile] = useState(null);

  const handleFileChange = (event, setFile) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("PAN File:", panFile);
    console.log("Bank Passbook File:", bankPassbookFile);
    console.log("Aadhaar File:", aadhaarFile);
    // You can handle the file upload logic here
  };

  return (
    <Container maxWidth="sm" >
     <Box sx={{ p: 4, boxShadow: 3, borderRadius: 2, mt: 5, bgcolor: "#fff" , mt :'90px'}}>
        <Typography variant="h5" align="center" gutterBottom>
          KYC Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Upload PAN Card</Typography>
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => handleFileChange(e, setPanFile)}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Upload Bank Passbook</Typography>
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => handleFileChange(e, setBankPassbookFile)}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Upload Aadhaar Card</Typography>
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => handleFileChange(e, setAadhaarFile)}
            />
          </Box>

          <Button type="submit" variant="contained" sx={{background:'#1a1f36'}} fullWidth>
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default KycForm;