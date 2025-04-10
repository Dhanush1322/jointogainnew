import React, { useState } from "react";
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
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

function ChangePasswordForm() {
  const [showPassword, setShowPassword] = useState({ old: false, new: false, confirm: false });
  
  const token = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("_id");

  const togglePasswordVisibility = (type) => {
    setShowPassword((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Old password is required"),
      newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .matches(/[A-Za-z]/, "Must contain at least one letter")
        .matches(/[0-9]/, "Must contain at least one number")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Must contain one special character")
        .notOneOf([Yup.ref("oldPassword")], "New password must be different from old password")
        .required("New password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await axios.patch(
          `https://jointogain.ap-1.evennode.com/api/user/editUserPassword/${userId}`,
          {
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        Swal.fire({ icon: "success", title: "Success", text: "Password changed successfully!" });
        resetForm();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response?.data?.message || "Something went wrong",
        });
      }
      setSubmitting(false);
    },
  });

  return (
    <Container maxWidth="sm" sx={{ ml: { xs: 0, md: 32 } }}>
      <Card sx={{ boxShadow: 3, borderRadius: 3, mt: 10, mb: 10, p: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Change Password
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            {['old', 'new', 'confirm'].map((type) => (
              <TextField
                key={type}
                fullWidth
                label={type === "old" ? "Old Password" : type === "new" ? "New Password" : "Confirm New Password"}
                name={type === "old" ? "oldPassword" : type === "new" ? "newPassword" : "confirmPassword"}
                type={showPassword[type] ? "text" : "password"}
                value={formik.values[type === "old" ? "oldPassword" : type === "new" ? "newPassword" : "confirmPassword"]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                margin="normal"
                variant="outlined"
                error={formik.touched[type === "old" ? "oldPassword" : type === "new" ? "newPassword" : "confirmPassword"] &&
                  Boolean(formik.errors[type === "old" ? "oldPassword" : type === "new" ? "newPassword" : "confirmPassword"])}
                helperText={formik.touched[type === "old" ? "oldPassword" : type === "new" ? "newPassword" : "confirmPassword"] &&
                  formik.errors[type === "old" ? "oldPassword" : type === "new" ? "newPassword" : "confirmPassword"]}
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
            ))}
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
