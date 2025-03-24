import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";

const AddProductForm = () => {
  const [product, setProduct] = useState({
    productName: "",
    price: "",
    description: "",
    file: null,
    status: "active",
    quantity: "",
  });
  
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setProduct({ ...product, file: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.productName || !product.price || !product.description || !product.quantity) {
      setSnackbarMessage("Please fill all required fields.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    if (!product.file) {
      setSnackbarMessage("Please upload an image.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    const formData = new FormData();
    Object.keys(product).forEach((key) => {
      formData.append(key, product[key]);
    });

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2NhOGEzODEyMGI2ZGQ5N2RkYWU0MzUiLCJlbWFpbCI6Im11aGFtbWFkc2hvYWliMjgwM0BnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJhdXRoVG9rZW4iOnRydWUsImlhdCI6MTc0MTU5NDUyOCwiZXhwIjoxODI3OTk0NTI4fQ.7gbOR4LrRwTAlGqrUcMDLcM4F2U5c61M1E9Qx55LSj4"; // Replace with actual token

    try {
      const response = await axios.post("http://localhost:5001/api/admin/product/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setSnackbarMessage("Product added successfully!");
        setSnackbarSeverity("success");
        setProduct({ productName: "", price: "", description: "", file: null, status: "active", quantity: "" });
      } else {
        setSnackbarMessage("Product submission failed.");
        setSnackbarSeverity("error");
      }
    } catch (error) {
      setSnackbarMessage(error.response?.data?.message || "Failed to add product. Please try again.");
      setSnackbarSeverity("error");
    }
    setOpenSnackbar(true);
  };

  return (
    <Container maxWidth="sm" sx={{ ml: { xs: 0, md: 32 } }}>
      <Card sx={{ boxShadow: 3, borderRadius: 3, mt: 10, mb: 10, p: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Add New Product
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField fullWidth label="Product Name" name="productName" value={product.productName} onChange={handleChange} margin="normal" variant="outlined" required />
            <TextField fullWidth label="Price" name="price" type="number" value={product.price} onChange={handleChange} margin="normal" variant="outlined" required />
            <TextField fullWidth label="Description" name="description" multiline rows={3} value={product.description} onChange={handleChange} margin="normal" variant="outlined" required />
            <TextField fullWidth label="Quantity" name="quantity" type="number" value={product.quantity} onChange={handleChange} margin="normal" variant="outlined" required />
            <input type="file" accept="image/*" name="file" onChange={handleImageChange} style={{ margin: "10px 0" }} />

            <Box sx={{ textAlign: "left", mt: 2 }}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Status</FormLabel>
                <RadioGroup row name="status" value={product.status} onChange={handleChange}>
                  <FormControlLabel value="active" control={<Radio />} label="Active" />
                  <FormControlLabel value="inactive" control={<Radio />} label="Inactive" />
                </RadioGroup>
              </FormControl>
            </Box>

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, backgroundColor: "#070534", "&:hover": { backgroundColor: "#050422" } }}>
              Submit Product
            </Button>
          </form>
        </CardContent>
      </Card>

      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddProductForm;