import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { People, MonetizationOn, AccountBalanceWallet, Star } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
    nextLevelPayout: "Rs. 0.00",
  });

  const navigate = useNavigate();

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

          let totalRoiPayoutAmount = 0;
          userData.investment_info.forEach((investment) => {
            const approvedCount = (investment.roi_payout_status || []).filter(
              (payout) => payout.status === "Approved"
            ).length;
            const investmentTotal =
              approvedCount * (investment.net_amount_per_month || 0);
            totalRoiPayoutAmount += investmentTotal;
          });

          let totalLevelIncome = 0;
          userData.referral_payouts.forEach((payout) => {
            if (payout.status === "Approved") {
              totalLevelIncome += payout.amount || 0;
            }
          });

          let totalInvestmentAmount = 0;
          userData.investment_info.forEach((investment) => {
            totalInvestmentAmount += investment.invest_amount || 0;
          });

          // ✅ Calculate Nearest Upcoming Pending Level Payout
          const now = new Date();
          const pendingPayoutsMap = new Map();

          userData.referral_payouts.forEach((payout) => {
            if (payout.status === "Pending") {
              const payoutDate = new Date(payout.payout_date);
              if (payoutDate > now) {
                const key = `${payoutDate.getFullYear()}-${payoutDate.getMonth()}`; // YYYY-MM
                const currentAmount = pendingPayoutsMap.get(key) || 0;
                pendingPayoutsMap.set(key, currentAmount + (payout.amount || 0));
              }
            }
          });

          let nearestMonthAmount = 0;
          let nearestMonthText = "";

          if (pendingPayoutsMap.size > 0) {
            const sortedKeys = [...pendingPayoutsMap.keys()].sort();
            const [year, month] = sortedKeys[0].split("-");
            const amount = pendingPayoutsMap.get(sortedKeys[0]);
            const date = new Date(parseInt(year), parseInt(month));
            const monthName = date.toLocaleString("default", { month: "long" });
            nearestMonthAmount = amount;
            nearestMonthText = `${monthName} ${year}`;
          }
          // ✅ Calculate Nearest Upcoming Pending ROI Payout
          const roiPayoutMap = new Map();

          userData.investment_info.forEach((investment) => {
            (investment.roi_payout_status || []).forEach((payout) => {
              const payoutDate = new Date(payout.payout_date);
              if (payout.status === "Pending" && payoutDate > now) {
                const key = `${payoutDate.getFullYear()}-${payoutDate.getMonth()}`; // YYYY-MM
                const currentAmount = roiPayoutMap.get(key) || 0;
                roiPayoutMap.set(key, currentAmount + (investment.net_amount_per_month || 0));
              }
            });
          });

          let nearestRoiAmount = 0;
          if (roiPayoutMap.size > 0) {
            const sortedRoiKeys = [...roiPayoutMap.keys()].sort();
            const nearestKey = sortedRoiKeys[0];
            nearestRoiAmount = roiPayoutMap.get(nearestKey);
          }

          setDashboardData({
            totalUsers: userData.referrals.length + 1,
            roiIncome: `Rs. ${totalRoiPayoutAmount.toFixed(2)}`,
            levelIncome: `Rs. ${totalLevelIncome.toFixed(2)}`,
            totalEarnings: `Rs. ${(totalRoiPayoutAmount + totalLevelIncome).toFixed(2)}`,
            myInvestment: `Rs. ${totalInvestmentAmount.toFixed(2)}`,
            directReferrals: userData.no_of_direct_referrals || 0,
            totalWithdrawals: `Rs. ${(totalRoiPayoutAmount + totalLevelIncome).toFixed(2)}`,
            rank: userData.user_rank_info?.[0]?.rank_of_user || "N/A",
            nextLevelPayout: nearestMonthAmount > 0 ? `Rs. ${nearestMonthAmount.toFixed(2)}` : "Rs. 0.00",
            nextRoiPayout: nearestRoiAmount > 0 ? `Rs. ${nearestRoiAmount.toFixed(2)}` : "Rs. 0.00", // 👈 Add this line
          });

        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleCardClick = (title) => {
    if (title === "Next ROI Payout Amount") {
      navigate("/AccountTransaction");
    } else if (title === "Next Level Payout Amount") {
      navigate("/MyLevel");
    }
  };

  const stats = [
    { title: "ROI Income", count: dashboardData.roiIncome, icon: <MonetizationOn fontSize="large" />, color: "#f5ee24" },
    { title: "Level Income", count: dashboardData.levelIncome, icon: <MonetizationOn fontSize="large" />, color: "#f5ee24" },
    { title: "Total Earning", count: dashboardData.totalEarnings, icon: <AccountBalanceWallet fontSize="large" />, color: "#f5ee24" },
    { title: "My Investment", count: dashboardData.myInvestment, icon: <AccountBalanceWallet fontSize="large" />, color: "#f5ee24" },
    { title: "Direct Referrals", count: dashboardData.directReferrals, icon: <People fontSize="large" />, color: "#f5ee24" },
    { title: "Total Withdrawals", count: dashboardData.totalWithdrawals, icon: <AccountBalanceWallet fontSize="large" />, color: "#f5ee24" },
    { title: "Next ROI Payout Amount", count: dashboardData.nextRoiPayout, icon: <AccountBalanceWallet fontSize="large" />, color: "#f5ee24" },
    { title: "Next Level Payout Amount", count: dashboardData.nextLevelPayout, icon: <AccountBalanceWallet fontSize="large" />, color: "#f5ee24" },
    ...(dashboardData.rank !== "Default Rank" ? [{
      title: "Rank", count: dashboardData.rank, icon: <Star fontSize="large" />, color: "#f5ee24"
    }] : [])
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
                cursor: (stat.title === "Next ROI Payout Amount" || stat.title === "Next Level Payout Amount") ? "pointer" : "default"
              }}
              onClick={() => handleCardClick(stat.title)}
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
