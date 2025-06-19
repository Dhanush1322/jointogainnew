import React from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  TextField
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import useUserProfile from "../hooks/useUserProfile"; // Adjust the import path as necessary

const EditProfileForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const userId = localStorage.getItem("_id");
  const token = localStorage.getItem("accessToken");

  const { formData, loading, handleChange, handleSubmit } = useUserProfile(userId, token);

  if (loading) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

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

        {/* Submit */}
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
