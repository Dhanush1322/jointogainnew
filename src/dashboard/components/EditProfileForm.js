import React, { useState, useEffect } from "react";
import { Container, Card, CardContent, Typography, Grid, Button, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import Swal from "sweetalert2";
const EditProfileForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Get user ID and token from local storage
  const userId = localStorage.getItem("_id");
  const token = localStorage.getItem("accessToken");

  console.log("Retrieved User ID:", userId);
  console.log("Retrieved Access Token:", token);

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    state: "",
    address: "",
    mobile: "",
    dob: "",
    city: "",
    pincode: "",
    pan: "",
    aadhar: "",
    bankName: "",
    ifsc: "",
    branch: "",
    accountNumber: "",
    nomineeName: "",
    nomineeRelation: "",
    nomineeAadhar: "",
  });

  useEffect(() => {
    if (userId && token) {
      axios
        .get(`http://localhost:5000/api/user/getUser/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log("API Response:", response.data);
          if (response.data && response.data.data && response.data.data.data) {
            const userData = response.data.data.data;

            setFormData({
              name: userData.name || "",
              email: userData.email || "",
              gender: userData.gender || "",
              state: userData.state || "",
              address: userData.address || "",
              mobile: userData.phone_no || "",
              dob: userData.date_of_birth ? userData.date_of_birth.split("T")[0] : "",
              city: userData.city || "",
              pincode: userData.pincode || "",
              pan: userData.pan_number || "",
              aadhar: userData.aadhar_number || "",
              bankName: userData.bank_name || "",
              ifsc: userData.ifsc || "",
              branch: userData.branch || "",
              accountNumber: userData.ac_number || "",
              nomineeName: userData.nominee_name || "",
              nomineeRelation: userData.nominee_relationship || "",
              nomineeAadhar: userData.nominee_aadhar_number || "",
            });
          } else {
            console.warn("API returned empty data.");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user details:", error.response ? error.response.data : error.message);
          setLoading(false);
        });
    } else {
      console.warn("Missing User ID or Token. Skipping API call.");
      setLoading(false);
    }
  }, [userId, token]);
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const updatedData = {
      name: formData.name,
      email: formData.email,
      gender: formData.gender,
      state: formData.state,
      address: formData.address,
      phone_no: formData.mobile,
      date_of_birth: formData.dob,
      city: formData.city,
      pincode: formData.pincode,
      pan_number: formData.pan,
      aadhar_number: formData.aadhar,
      bank_name: formData.bankName,
      ifsc: formData.ifsc,
      branch: formData.branch,
      ac_number: formData.accountNumber,
      nominee_name: formData.nomineeName,
      nominee_aadhar_number: formData.nomineeAadhar,
      nominee_relationship: formData.nomineeRelation,
    };
  
    console.log("Submitting Data:", updatedData);
  
    axios
      .put(`http://localhost:5000/api/user/updateUserProfile/${userId}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Update Response:", response.data);
        
        Swal.fire({
          title: "Success!",
          text: "Profile Updated Successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((error) => {
        console.error("Error updating profile:", error.response ? error.response.data : error.message);
        
        Swal.fire({
          title: "Error!",
          text: "Failed to update profile.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log("Updated Form Data:", formData); // Debugging Log
  };
  
  if (loading) return <Typography variant="h6" align="center">Loading...</Typography>;

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
  {/* Personal Information */}
  <Card sx={{ p: 3 }}>
    <CardContent>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>Personal Information</Typography>
      <Grid container spacing={3}>
        {[
          "name", "email", "gender", "state", "address", "mobile", "dob",
          "city", "pincode", "pan", "aadhar"
        ].map((field, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <TextField
              fullWidth
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              name={field}
              type={field === "dob" ? "date" : "text"}
              value={formData[field] || ""}
              onChange={handleChange}
              InputLabelProps={field === "dob" ? { shrink: true } : {}}
            />
          </Grid>
        ))}
      </Grid>
    </CardContent>
  </Card>

  {/* Bank Information */}
  <Card sx={{ p: 3, mt: 3 }}>
    <CardContent>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>Bank Information</Typography>
      <Grid container spacing={3}>
        {["bankName", "ifsc", "branch", "accountNumber"].map((field, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <TextField
              fullWidth
              label={field.replace(/([A-Z])/g, " $1").trim()}
              name={field}
              value={formData[field] || ""}
              onChange={handleChange}
            />
          </Grid>
        ))}
      </Grid>
    </CardContent>
  </Card>

  {/* Nominee Details */}
  <Card sx={{ p: 3, mt: 3 }}>
    <CardContent>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>Nominee Details</Typography>
      <Grid container spacing={3}>
        {["nomineeName", "nomineeRelation", "nomineeAadhar"].map((field, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <TextField
              fullWidth
              label={field.replace(/([A-Z])/g, " $1").trim()}
              name={field}
              value={formData[field] || ""}
              onChange={handleChange}
            />
          </Grid>
        ))}
      </Grid>
    </CardContent>
  </Card>

  {/* Submit Button */}
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
