import React, { useState } from "react";
import { Container, Card, CardContent, Typography, Grid, Button, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const EditProfileForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Detect mobile view

  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: "K S SUNIL",
    email: "ks.sunilrnr@gmail.com",
    gender: "Male",
    state: "Karnataka",
    address: "D C M TOWNSHIP",
    mobile: "9620171587",
    dob: "",
    city: "DAVANGERE",
    pincode: "576221",
    pan: "CDUPS7569F",
    aadhar: "996186607638",
    bankName: "HDFC BANK",
    ifsc: "HDFC0004957",
    branch: "BANGALORE",
    accountNumber: "50100783125288",
    nomineeName: "",
    nomineeRelation: "",
    nomineeAadhar: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Data:", formData);
    alert("Profile Updated Successfully!");
  };

  return (
    <Container
      maxWidth="lg"
      style={{
        marginTop: "60px",
        marginLeft: isMobile ? "0px" : "250px",
        transition: "margin-left 0.3s ease-in-out",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Card sx={{ p: 3 }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
              Personal Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} required /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Gender" name="gender" value={formData.gender} onChange={handleChange} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="State" name="state" value={formData.state} onChange={handleChange} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Address" name="address" value={formData.address} onChange={handleChange} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Mobile No" name="mobile" type="tel" value={formData.mobile} onChange={handleChange} required /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Date of Birth" name="dob" type="date" InputLabelProps={{ shrink: true }} value={formData.dob} onChange={handleChange} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="City" name="city" value={formData.city} onChange={handleChange} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="PAN" name="pan" value={formData.pan} onChange={handleChange} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Aadhar" name="aadhar" value={formData.aadhar} onChange={handleChange} /></Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card sx={{ p: 3, mt: 3 }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
              Bank Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Bank Name" name="bankName" value={formData.bankName} onChange={handleChange} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="IFSC" name="ifsc" value={formData.ifsc} onChange={handleChange} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Branch" name="branch" value={formData.branch} onChange={handleChange} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="A/c Number" name="accountNumber" value={formData.accountNumber} onChange={handleChange} /></Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card sx={{ p: 3, mt: 3 }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
              Nominee Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Nominee Name" name="nomineeName" value={formData.nomineeName} onChange={handleChange} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Nominee Relation" name="nomineeRelation" value={formData.nomineeRelation} onChange={handleChange} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Nominee Aadhar" name="nomineeAadhar" value={formData.nomineeAadhar} onChange={handleChange} /></Grid>
            </Grid>
          </CardContent>
        </Card>

        <Grid container justifyContent="center" sx={{ mt: 3 }}>
          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
        </Grid>
      </form>
    </Container>
  );
};

export default EditProfileForm;