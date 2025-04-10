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
        const token = localStorage.getItem("accessToken");
        const userId = localStorage.getItem("_id");

        const response = await axios.get(
          `https://jointogain.ap-1.evennode.com/api/user/getUser/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.Status) {
          const userData = response.data.data.data;

          // ROI Income calculation
          let totalRoiPayoutAmount = 0;
          userData.investment_info.forEach((investment) => {
            const approvedCount = (investment.roi_payout_status || []).filter(
              (payout) => payout.status === "Approved"
            ).length;
            const investmentTotal =
              approvedCount * (investment.net_amount_per_month || 0);
            totalRoiPayoutAmount += investmentTotal;
          });

          // Level Income calculation
          let totalLevelIncome = 0;
          userData.referral_payouts.forEach((payout) => {
            if (payout.status === "Approved") {
              totalLevelIncome += payout.amount || 0;
            }
          });

          // Total Investment calculation
          let totalInvestmentAmount = 0;
          userData.investment_info.forEach((investment) => {
            totalInvestmentAmount += investment.invest_amount || 0;
          });

        
          setDashboardData({
            totalUsers: userData.referrals.length + 1,
            roiIncome: `Rs. ${totalRoiPayoutAmount.toFixed(2)}`,
            levelIncome: `Rs. ${totalLevelIncome.toFixed(2)}`,
            totalEarnings: `Rs. ${(totalRoiPayoutAmount + totalLevelIncome).toFixed(2)}`,
            myInvestment: `Rs. ${totalInvestmentAmount.toFixed(2)}`,
            directReferrals: userData.no_of_direct_referrals || 0,
            totalWithdrawals: `Rs. ${(totalRoiPayoutAmount + totalLevelIncome).toFixed(2)}`,
            rank: userData.user_rank_info?.[0]?.rank_of_user || "N/A",
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
