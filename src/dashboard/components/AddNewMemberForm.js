import React, { useState } from "react";
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

function AddNewMemberForm() {
  const [gender, setGender] = useState("male");
  const [state, setState] = useState("");
  const [agree, setAgree] = useState(false);

  return (
    <Container maxWidth={false} disableGutters sx={{ mb:'30px', minHeight: "100vh" }}>
      <Box sx={{ width: "100%", p: 4, boxShadow: 3, borderRadius: 2, bgcolor: "#fff" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Add New Member
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Sponsor ID</Typography>
            <TextField fullWidth value="G956396" disabled sx={{ mb: 2 }} />
            <Typography variant="subtitle1">Sponsor Name</Typography>
            <TextField fullWidth value="K S SUNIL" disabled sx={{ mb: 2 }} />
            <TextField fullWidth label="Name *" sx={{ mb: 2 }} />
            <FormControl component="fieldset" sx={{ mb: 2 }}>
              <FormLabel component="legend">Gender *</FormLabel>
              <RadioGroup row value={gender} onChange={(e) => setGender(e.target.value)}>
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
              </RadioGroup>
            </FormControl>
            <TextField fullWidth label="Email" sx={{ mb: 2 }} />
            <TextField fullWidth label="Mobile Number *" sx={{ mb: 2 }} />
            <Typography variant="subtitle1">Date of Birth</Typography>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <TextField fullWidth label="Day" type="number" />
              <TextField fullWidth label="Month" type="number" />
              <TextField fullWidth label="Year" type="number" />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Address *" sx={{ mb: 2 }} />
            <TextField fullWidth label="City *" sx={{ mb: 2 }} />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <Typography variant="subtitle1">State *</Typography>
              <Select value={state} onChange={(e) => setState(e.target.value)}>
                <MenuItem value="Karnataka">Karnataka</MenuItem>
                <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
                <MenuItem value="Kerala">Kerala</MenuItem>
              </Select>
            </FormControl>
            <TextField fullWidth label="Pan Number *" sx={{ mb: 2 }} />
            <TextField fullWidth label="Aadhar Number *" sx={{ mb: 2 }} />
            <TextField fullWidth label="Nominee Name *" sx={{ mb: 2 }} />
            <TextField fullWidth label="Nominee Aadhar Number *" sx={{ mb: 2 }} />
            <TextField fullWidth label="Nominee Relationship *" sx={{ mb: 2 }} />
          </Grid>
        </Grid>
        <FormControlLabel
          control={<Checkbox checked={agree} onChange={(e) => setAgree(e.target.checked)} />}
          label="I hereby agree to Terms and Conditions"
        />
        <Button fullWidth variant="contained" color="primary" sx={{ mt: 2, background: '#1a1f36' }}>
          Submit
        </Button>
      </Box>
    </Container>
  );
}

export default AddNewMemberForm;
