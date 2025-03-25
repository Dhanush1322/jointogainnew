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

function ReTopUpForm() {
  const [formData, setFormData] = useState({
    investmentPlan: "",
    selectPlan: "",
    amount: "",
    utrNo: "",
    proof: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "proof") {
      setFormData({ ...formData, proof: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form data (e.g., send to API)
    console.log("Form submitted:", formData);
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
            <TextField
              fullWidth
              label="Investment Plan"
              name="investmentPlan"
              value={formData.investmentPlan}
              onChange={handleChange}
            />
          </Box>
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
                <MenuItem value="longTerm">Long Term</MenuItem>
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
