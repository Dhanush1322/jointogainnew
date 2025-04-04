import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Swal from "sweetalert2"; // Import SweetAlert2

function ReTopUpForm() {
  const [formData, setFormData] = useState({
    selectPlan: "",
    amount: "",
    utrNo: "",
    proof: null,
    investDuration: "",  // Added for storing duration in months
  });

  const token = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("_id");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "proof") {
      setFormData({ ...formData, proof: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent page reload

    const { selectPlan, amount, utrNo, proof, investDuration } = formData;

    // Validate that investDuration is a valid number when Long Term is selected
    if (selectPlan === "long term" && (!investDuration || isNaN(investDuration) || investDuration <= 0)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Duration',
        text: 'Please enter a valid investment duration in months.',
      });
      return;
    }

    // Create FormData to send as multipart form data
    const formDataToSend = new FormData();
    formDataToSend.append("invest_type", selectPlan);  // Append plan type
    formDataToSend.append("utr_no", utrNo);            // Append UTR number
    formDataToSend.append("invest_amount", amount);    // Append investment amount
    formDataToSend.append("file", proof);              // Append the file (proof)

    // If Long Term is selected, add invest_duration_in_month
    if (selectPlan === "long term") {
      formDataToSend.append("invest_duration_in_month", investDuration);
    }

    try {
      // Send the form data to the API
      const response = await fetch(`http://jointogain.ap-1.evennode.com/api/user/addTopUp/${userId}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,  // Include token in Authorization header
        },
        body: formDataToSend,  // FormData as body content
      });

      // Debugging: Log the status and the response body
      console.log("Response Status:", response.status);  // Log status code
      const responseBody = await response.json();  // Parse the response body
      console.log("Response Body:", responseBody);   // Log the response content

      if (response.ok) {
        // If the request is successful, show success alert using SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Form submitted successfully!',
        }).then(() => {
          // Reset form fields after successful submission
          setFormData({
            selectPlan: "",
            amount: "",
            utrNo: "",
            proof: null,
            investDuration: "",
          });
        });
      } else {
        // If the response is not OK, show error alert using SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: responseBody.message || 'An error occurred, please try again.',
        });
        console.error("Error details:", responseBody);
      }
    } catch (error) {
      console.error("Request failed:", error);  // Handle network or request failure
      Swal.fire({
        icon: 'error',
        title: 'Network Error',
        text: 'There was a network error. Please check your internet connection and try again.',
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          p: 4,
          boxShadow: 2,
          borderRadius: 2,
          bgcolor: "#fff",
          mt: 5,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Re TopUp Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="select-plan-label">Select Plan</InputLabel>
              <Select
                labelId="select-plan-label"
                id="select-plan"
                name="selectPlan"
                value={formData.selectPlan}
                label="Select Plan"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="long term">Long Term</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              type="number"
              label="Amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="UTR No."
              name="utrNo"
              value={formData.utrNo}
              onChange={handleChange}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Button variant="outlined" component="label">
              Attach Proof
              <input type="file" name="proof" hidden onChange={handleChange} />
            </Button>
            {formData.proof && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                {formData.proof.name}
              </Typography>
            )}
          </Box>

          {/* Conditionally render the 'Invest Duration' field if Long Term is selected */}
          {formData.selectPlan === "long term" && (
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                type="number"
                label="Investment Duration (Months)"
                name="investDuration"
                value={formData.investDuration}
                onChange={handleChange}
              />
            </Box>
          )}

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ background: "#1a1f36" }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default ReTopUpForm;
