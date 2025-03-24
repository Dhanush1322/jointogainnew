import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Snackbar, Alert, Modal, TextField, Button } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import '../css/ProductListTable.css';
import TablePagination from '@mui/material/TablePagination';

const API_URL = 'http://localhost:5001/api/admin/product/all';
const UPDATE_URL = 'http://localhost:5001/api/admin/product/update';
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2NhOGEzODEyMGI2ZGQ5N2RkYWU0MzUiLCJlbWFpbCI6Im11aGFtbWFkc2hvYWliMjgwM0BnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJhdXRoVG9rZW4iOnRydWUsImlhdCI6MTc0MTU4OTg5MCwiZXhwIjoxODI3OTg5ODkwfQ.aXD4mCR8bkLKLP_AJpxkw0t-laVLxNCXMZGqtvfe32U';

function ProductListTable() {
    const [products, setProducts] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [openModal, setOpenModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [updatedProduct, setUpdatedProduct] = useState({});
    const [imageFile, setImageFile] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5); // Default to 5 rows per page
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
            });
            const updatedProducts = response.data.result.products.docs.map(product => ({
                ...product,
                imageUrl: `http://localhost:5001/${product.filePath.replace("src\\", "").replace(/\\/g, "/")}`
            }));
            setProducts(updatedProducts);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:5001/api/admin/product/delete", {
                headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
                data: { id }
            });
            setSnackbarMessage("Product deleted successfully!");
            setSnackbarSeverity("success");
            setOpenSnackbar(true);
            fetchProducts();
        } catch (error) {
            setSnackbarMessage("Failed to delete product. Please try again.");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
        }
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setUpdatedProduct({ ...product }); // Copy existing details into state
        setOpenModal(true);
    };

    const handleUpdate = async () => {
        if (!selectedProduct) return;

        const formData = new FormData();
        formData.append("id", selectedProduct._id); // Ensure ID is sent
        formData.append("productName", updatedProduct.productName || selectedProduct.productName);
        formData.append("price", updatedProduct.price || selectedProduct.price);
        formData.append("description", updatedProduct.description || selectedProduct.description);
        formData.append("quantity", updatedProduct.quantity || selectedProduct.quantity);
        formData.append("status", updatedProduct.status || selectedProduct.status);

        if (imageFile) {
            formData.append("file", imageFile);
        }

        try {
            const response = await axios.put(UPDATE_URL, formData, {
                headers: {
                    Authorization: `Bearer ${AUTH_TOKEN}`,
                    "Content-Type": "multipart/form-data"
                }
            });

            if (response.data.success) {
                setSnackbarMessage("Product updated successfully!");
                setSnackbarSeverity("success");
                setOpenSnackbar(true);
                setOpenModal(false);
                fetchProducts(); // Refresh product list
            } else {
                throw new Error("Update failed");
            }
        } catch (error) {
            setSnackbarMessage("Failed to update product. Please try again.");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
        }
    };
    const filteredProducts = products.filter(product =>
        product.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page when rows per page changes
    };

    return (
        <div className="active-table-container">
            <h3>Product List</h3>
            <TextField
                label="Search Product"
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#070534", color: "white" }}>
                            <TableCell sx={{ color: "white" }}>SL</TableCell>
                            <TableCell sx={{ color: "white" }}>Product Name</TableCell>
                            <TableCell sx={{ color: "white" }}>Price</TableCell>
                            <TableCell sx={{ color: "white" }}>Description</TableCell>
                            <TableCell sx={{ color: "white" }}>Quantity</TableCell>
                            <TableCell sx={{ color: "white" }}>Status</TableCell>
                            <TableCell sx={{ color: "white" }}>Image</TableCell>
                            <TableCell sx={{ color: "white" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product, index) => (

                            <TableRow key={product._id}>
                                <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                                <TableCell>{product.productName}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>{product.quantity}</TableCell>
                                <TableCell>{product.status}</TableCell>
                                <TableCell>
                                    <img src={product.imageUrl} alt={product.productName} width={50} height={50} />
                                </TableCell>
                                <TableCell>
                                    <IconButton color="primary" onClick={() => handleEdit(product)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleDelete(product._id)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={products.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

            </TableContainer>

            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
                <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} variant="filled">
                    {snackbarMessage}
                </Alert>
            </Snackbar>

            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Paper style={{ padding: 20, width: 400, margin: 'auto', marginTop: 50 }}>
                    <h3>Edit Product</h3>
                    <TextField fullWidth label="Product Name" value={updatedProduct.productName || ''} onChange={(e) => setUpdatedProduct({ ...updatedProduct, productName: e.target.value })} margin="dense" />
                    <TextField fullWidth label="Price" value={updatedProduct.price || ''} onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })} margin="dense" />
                    <TextField fullWidth label="Description" value={updatedProduct.description || ''} onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })} margin="dense" />
                    <TextField fullWidth label="Quantity" value={updatedProduct.quantity || ''} onChange={(e) => setUpdatedProduct({ ...updatedProduct, quantity: e.target.value })} margin="dense" />
                    <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />
                    <Button variant="contained" color="primary" onClick={handleUpdate} style={{ marginTop: 10 }}>Update Product</Button>
                </Paper>
            </Modal>
        </div>
    );
}

export default ProductListTable;
