import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { People, ShoppingCart, AccountBalanceWallet, Star, MonetizationOn } from "@mui/icons-material";
import "./DashboardMain.css";

const DashboardMain = () => {
  const stats = [
    { title: "Total Users", count: 3000, icon: <People fontSize="large" />, color: "#ffb901" },
    { title: "Total Products", count: 150, icon: <ShoppingCart fontSize="large" />, color: "#ffb901" },
    { title: "ROI Income", count: "Rs. 10,000.00", icon: <MonetizationOn fontSize="large" />, color: "#ffb901" },
    { title: "Level Income", count: "Rs. 49,000.00", icon: <MonetizationOn fontSize="large" />, color: "#ffb901" },
    { title: "Today's Earning", count: "Rs. 0", icon: <AccountBalanceWallet fontSize="large" />, color: "#ffb901" },
    { title: "Total Earning", count: "Rs. 59,000.00", icon: <AccountBalanceWallet fontSize="large" />, color: "#ffb901" },
    { title: "My Investment", count: "Rs. 1,000,000", icon: <AccountBalanceWallet fontSize="large" />, color: "#ffb901" },
    { title: "Direct Referrals", count: 10, icon: <People fontSize="large" />, color: "#ffb901" },
    { title: "Wallet Balance", count: "Rs. 0", icon: <AccountBalanceWallet fontSize="large" />, color: "#ffb901" },
    { title: "Total Withdrawals", count: "Rs. 0.0", icon: <AccountBalanceWallet fontSize="large" />, color: "#ffb901" },
    { title: "Rank", count: "Gold", icon: <Star fontSize="large" />, color: "#ffb901" }
  ];

  return (
    <div className="dashboard-main">
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                padding: 2,
                backgroundColor: "#070534",
                color: "#ffb901",
                borderRadius: 3,
                boxShadow: 3,
              }}
            >
              {stat.icon}
              <CardContent>
                <Typography variant="h6" sx={{ color: stat.color }}>{stat.title}</Typography>
                <Typography variant="h4" sx={{ color: stat.color }}>{stat.count}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default DashboardMain;