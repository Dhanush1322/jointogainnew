import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Edit, Delete, CheckCircle, Cancel } from '@mui/icons-material';
import '../css/OrderListTable.css';

function OrderListTable() {
    const [searchQuery, setSearchQuery] = useState('');
    const [orders, setOrders] = useState([
        { 
            id: 1, 
            name: 'John Doe', 
            address: '123 Street, City, State', 
            contact: '9876543210', 
            product: 'Smartphone', 
            price: '50000', 
            quantity: 2, 
            image: 'https://via.placeholder.com/50', 
            status: 'Pending' 
        },
        { 
            id: 2, 
            name: 'Jane Smith', 
            address: '456 Avenue, City, State', 
            contact: '8765432109', 
            product: 'Laptop', 
            price: '75000', 
            quantity: 1, 
            image: 'https://via.placeholder.com/50', 
            status: 'Pending' 
        }
    ]);
    
    const handleStatusChange = (id, newStatus) => {
        setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order));
    };

    return (
        <div className="order-table-container">
            <h3>Customer Orders</h3>
            <TextField 
                label="Search by name" 
                variant="outlined" 
                fullWidth 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                className="search-input" 
                margin="normal"
            />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#070534", color: "white" }}>
                            <TableCell sx={{ color: "white" }}>SL</TableCell>
                            <TableCell sx={{ color: "white" }}>Customer Name</TableCell>
                            <TableCell sx={{ color: "white" }}>Address</TableCell>
                            <TableCell sx={{ color: "white" }}>Contact</TableCell>
                            <TableCell sx={{ color: "white" }}>Product</TableCell>
                            <TableCell sx={{ color: "white" }}>Image</TableCell>
                            <TableCell sx={{ color: "white" }}>Price</TableCell>
                            <TableCell sx={{ color: "white" }}>Quantity</TableCell>
                            <TableCell sx={{ color: "white" }}>Status</TableCell>
                            <TableCell sx={{ color: "white" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.filter(order => 
                            order.name.toLowerCase().includes(searchQuery.toLowerCase())
                        ).map((order, index) => (
                            <TableRow key={order.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{order.name}</TableCell>
                                <TableCell>{order.address}</TableCell>
                                <TableCell>{order.contact}</TableCell>
                                <TableCell>{order.product}</TableCell>
                                <TableCell><img src={order.image} alt={order.product} width="50" height="50" /></TableCell>
                                <TableCell>{order.price}</TableCell>
                                <TableCell>{order.quantity}</TableCell>
                                <TableCell>{order.status}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" onClick={() => handleStatusChange(order.id, 'Approved')}>
                                        <CheckCircle />
                                    </IconButton>
                                    <IconButton color="secondary" onClick={() => handleStatusChange(order.id, 'Rejected')}>
                                        <Cancel />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => setOrders(orders.filter(o => o.id !== order.id))}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default OrderListTable;
