import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  Checkbox,
  Grid
} from "@mui/material";
import axios from "axios";

function AddNewMemberForm() {
  const [formData, setFormData] = useState({
    name: "",
    gender: "male",
    email: "",
    phone_no: "",
    date_of_birth: "",
    address: "",
    city: "",
    state: "",
    pan_number: "",
    aadhar_number: "",
    nominee_name: "",
    nominee_aadhar_number: "",
    nominee_relationship: "",
  });

  const [agree, setAgree] = useState(false);
  const [sponsorId, setSponsorId] = useState("");
  const [sponsorName, setSponsorName] = useState("");

  useEffect(() => {
    setSponsorId(localStorage.getItem("user_id") || "");
    setSponsorName(localStorage.getItem("user_name") || "");
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!agree) {
      Swal.fire("Error", "You must agree to the Terms and Conditions", "error");
      return;
    }
  
    const token = localStorage.getItem("accessToken");
    
    if (!token) {
      Swal.fire("Unauthorized", "No token found", "error");
      return;
    }
  
    console.log("Submitting form with data:", formData);
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/addNewMember",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      Swal.fire("Success", "Member added successfully!", "success");
      console.log(response.data);
      
    } catch (error) {
      console.error("Error adding member:", error);
      Swal.fire("Failed", "Failed to add member. Please try again.", "error");
    }
  };
  
  return (
    <Container maxWidth={false} disableGutters sx={{ mb: "30px", minHeight: "100vh" }}>
      <Box sx={{ width: "100%", p: 4, boxShadow: 3, borderRadius: 2, bgcolor: "#fff" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Add New Member
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Sponsor ID</Typography>
              <TextField fullWidth value={sponsorId} disabled sx={{ mb: 2 }} />
              <Typography variant="subtitle1">Sponsor Name</Typography>
              <TextField fullWidth value={sponsorName} disabled sx={{ mb: 2 }} />
              <TextField fullWidth label="Name *" name="name" value={formData.name} onChange={handleChange} sx={{ mb: 2 }} />
              <FormControl component="fieldset" sx={{ mb: 2 }}>
                <FormLabel component="legend">Gender *</FormLabel>
                <RadioGroup row name="gender" value={formData.gender} onChange={handleChange}>
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                </RadioGroup>
              </FormControl>
              <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} sx={{ mb: 2 }} />
              <TextField fullWidth label="Mobile Number *" name="phone_no" value={formData.phone_no} onChange={handleChange} sx={{ mb: 2 }} />
              <Typography variant="subtitle1">Date of Birth</Typography>
              <TextField fullWidth type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} sx={{ mb: 2 }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Address *" name="address" value={formData.address} onChange={handleChange} sx={{ mb: 2 }} />
              <TextField fullWidth label="City *" name="city" value={formData.city} onChange={handleChange} sx={{ mb: 2 }} />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <Typography variant="subtitle1">State *</Typography>
                <Select name="state" value={formData.state} onChange={handleChange}>
                  <MenuItem value="Karnataka">Karnataka</MenuItem>
                  <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
                  <MenuItem value="Kerala">Kerala</MenuItem>
                </Select>
              </FormControl>
              <TextField fullWidth label="Pan Number *" name="pan_number" value={formData.pan_number} onChange={handleChange} sx={{ mb: 2 }} />
              <TextField fullWidth label="Aadhar Number *" name="aadhar_number" value={formData.aadhar_number} onChange={handleChange} sx={{ mb: 2 }} />
              <TextField fullWidth label="Nominee Name *" name="nominee_name" value={formData.nominee_name} onChange={handleChange} sx={{ mb: 2 }} />
              <TextField fullWidth label="Nominee Aadhar Number *" name="nominee_aadhar_number" value={formData.nominee_aadhar_number} onChange={handleChange} sx={{ mb: 2 }} />
              <TextField fullWidth label="Nominee Relationship *" name="nominee_relationship" value={formData.nominee_relationship} onChange={handleChange} sx={{ mb: 2 }} />
            </Grid>
          </Grid>
          <FormControlLabel
            control={<Checkbox checked={agree} onChange={(e) => setAgree(e.target.checked)} />}
            label="I hereby agree to Terms and Conditions"
          />
          <Button fullWidth type="submit" variant="contained" color="primary" sx={{ mt: 2, background: "#1a1f36" }}>
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default AddNewMemberForm;