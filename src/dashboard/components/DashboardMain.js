import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { People, MonetizationOn, AccountBalanceWallet, Star } from "@mui/icons-material";
import axios from "axios";
import "./DashboardMain.css";

const DashboardMain = () => {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    roiIncome: "Rs. 0.00",
    levelIncome: "Rs. 0.00",
    totalEarnings: "Rs. 0.00",
    myInvestment: "Rs. 0.00",
    directReferrals: 0,
    totalWithdrawals: "Rs. 0.00",
    rank: "N/A",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("accessToken"); // Replace with the actual token
        const userId =  localStorage.getItem("_id"); // Replace with the actual token
        const response = await axios.get(
          `http://localhost:5000/api/user/getUser/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Pass token in headers
            },
          }
        );

        if (response.data.Status) {
          const userData = response.data.data.data;
          setDashboardData({
            totalUsers: userData.referrals.length + 1, // Including the main user
            roiIncome: `Rs. ${userData.investment_info.length > 0 ? userData.investment_info[0].profit_amount : 0}`,
            levelIncome: "Rs. 0.00", // Adjust based on API response
            totalEarnings: "Rs. 0.00", // Adjust based on API response
            myInvestment: `Rs. ${userData.investment_info.length > 0 ? userData.investment_info[0].invest_amount : 0}`,
            directReferrals: userData.no_of_direct_referrals,
            totalWithdrawals: "Rs. 0.00", // Adjust based on API response
            rank: userData.user_rank || "N/A",
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const stats = [
    { title: "Total Users", count: dashboardData.totalUsers, icon: <People fontSize="large" />, color: "#f5ee24" },
    { title: "ROI Income", count: dashboardData.roiIncome, icon: <MonetizationOn fontSize="large" />, color: "#f5ee24" },
    { title: "Level Income", count: dashboardData.levelIncome, icon: <MonetizationOn fontSize="large" />, color: "#f5ee24" },
    { title: "Total Earning", count: dashboardData.totalEarnings, icon: <AccountBalanceWallet fontSize="large" />, color: "#f5ee24" },
    { title: "My Investment", count: dashboardData.myInvestment, icon: <AccountBalanceWallet fontSize="large" />, color: "#f5ee24" },
    { title: "Direct Referrals", count: dashboardData.directReferrals, icon: <People fontSize="large" />, color: "#f5ee24" },
    { title: "Total Withdrawals", count: dashboardData.totalWithdrawals, icon: <AccountBalanceWallet fontSize="large" />, color: "#f5ee24" },
    { title: "Rank", count: dashboardData.rank, icon: <Star fontSize="large" />, color: "#f5ee24" },
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
