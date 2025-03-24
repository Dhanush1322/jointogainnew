import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import '../css/OrderListTable.css';

function RejectedOrderTable() {
    const [searchQuery, setSearchQuery] = useState('');
    const [orders] = useState([
        { 
            id: 1, 
            name: 'Alice Johnson', 
            address: '789 Street, City, State', 
            contact: '9988776655', 
            product: 'Tablet', 
            price: '30000', 
            quantity: 1, 
            image: 'https://via.placeholder.com/50', 
            status: 'Rejected'
        },
        { 
            id: 2, 
            name: 'Michael Brown', 
            address: '321 Avenue, City, State', 
            contact: '8877665544', 
            product: 'Headphones', 
            price: '5000', 
            quantity: 2, 
            image: 'https://via.placeholder.com/50', 
            status: 'Rejected'
        }
    ]);

    return (
        <div className="order-table-container">
            <h3>Rejected Orders</h3>
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
                        <TableRow sx={{ backgroundColor: "#8B0000", color: "white" }}>
                            <TableCell sx={{ color: "white" }}>SL</TableCell>
                            <TableCell sx={{ color: "white" }}>Customer Name</TableCell>
                            <TableCell sx={{ color: "white" }}>Address</TableCell>
                            <TableCell sx={{ color: "white" }}>Contact</TableCell>
                            <TableCell sx={{ color: "white" }}>Product</TableCell>
                            <TableCell sx={{ color: "white" }}>Image</TableCell>
                            <TableCell sx={{ color: "white" }}>Price</TableCell>
                            <TableCell sx={{ color: "white" }}>Quantity</TableCell>
                            <TableCell sx={{ color: "white" }}>Status</TableCell>
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
                                <TableCell style={{ color: 'red', fontWeight: 'bold' }}>{order.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default RejectedOrderTable;