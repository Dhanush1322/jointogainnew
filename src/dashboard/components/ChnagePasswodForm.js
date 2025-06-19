import React from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useChangePassword from "../hooks/useChangePassword";

function ChangePasswordForm() {
  const token = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("_id");

  const { formik, showPassword, togglePasswordVisibility } = useChangePassword(userId, token);

  return (
    <Container maxWidth="sm" sx={{ ml: { xs: 0, md: 32 } }}>
      <Card sx={{ boxShadow: 3, borderRadius: 3, mt: 10, mb: 10, p: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Change Password
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            {["old", "new", "confirm"].map((type) => {
              const fieldName =
                type === "old" ? "oldPassword" : type === "new" ? "newPassword" : "confirmPassword";

              return (
                <TextField
                  key={type}
                  fullWidth
                  label={
                    type === "old"
                      ? "Old Password"
                      : type === "new"
                      ? "New Password"
                      : "Confirm New Password"
                  }
                  name={fieldName}
                  type={showPassword[type] ? "text" : "password"}
                  value={formik.values[fieldName]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  margin="normal"
                  variant="outlined"
                  error={formik.touched[fieldName] && Boolean(formik.errors[fieldName])}
                  helperText={formik.touched[fieldName] && formik.errors[fieldName]}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => togglePasswordVisibility(type)} edge="end">
                          {showPassword[type] ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              );
            })}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2, backgroundColor: "#070534", "&:hover": { backgroundColor: "#050422" } }}
              disabled={formik.isSubmitting}
            >
              Change Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ChangePasswordForm;
