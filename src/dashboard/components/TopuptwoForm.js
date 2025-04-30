
import { useNavigate } from "react-router-dom";
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
import Swal from "sweetalert2";

function TopuptwoForm() {
  const [formData, setFormData] = useState({
    selectPlan: "",
    amount: "",
    utrNo: "",
    proof: null,
    investDuration: "",
  });

  const token = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("newUserId");
   const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "proof") {
      setFormData({ ...formData, proof: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { selectPlan, amount, utrNo, proof, investDuration } = formData;
  
    if (
      selectPlan === "long term" &&
      (!investDuration || isNaN(investDuration) || investDuration <= 0)
    ) {
      Swal.fire({
        icon: "error",
        title: "Invalid Duration",
        text: "Please enter a valid investment duration in months.",
      });
      return;
    }
  
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("invest_type", selectPlan);
      formDataToSend.append("utr_no", utrNo);
      formDataToSend.append("invest_amount", amount);
      formDataToSend.append("file", proof);
  
      if (selectPlan === "long term") {
        formDataToSend.append("invest_duration_in_month", investDuration);
      }
  
      const response = await fetch(
        `https://jointogain.ap-1.evennode.com/api/user/addTopUp/${userId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        }
      );
  
      const responseBody = await response.json();
  
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Form submitted successfully!",
        }).then(() => {
          setFormData({
            selectPlan: "",
            amount: "",
            utrNo: "",
            proof: null,
            investDuration: "",
          });
          navigate("/AddNewMember");
        });
        
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: responseBody.message || "An error occurred, please try again.",
        });
      }
    } catch (error) {
      console.error("Request failed:", error);
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "There was a network error. Please check your internet connection and try again.",
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

export default TopuptwoForm;
