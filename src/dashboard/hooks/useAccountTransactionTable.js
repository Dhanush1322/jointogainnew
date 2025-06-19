import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const useAccountTransactionTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [withdrawData, setWithdrawData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const recordsPerPage = 10;

  const fetchData = async () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem("_id");
      const token = localStorage.getItem("accessToken");

      if (!userId || !token) {
        Swal.fire("Error", "User not authenticated!", "error");
        return;
      }

      const response = await axios.get(`https://jointogain.ap-1.evennode.com/api/user/getUser/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = response.data.data.data;

      const formattedData = user.investment_info?.flatMap((investment) => {
        const approvedPayoutsCount = investment.roi_payout_status?.filter(payout => payout.status === "Approved").length || 0;
        const remainingMonths = (investment.invest_duration_in_month || 0) - approvedPayoutsCount;

        return investment.roi_payout_status?.some((payout) => payout.status === "Pending")
          ? [{
              userID: user.user_profile_id,
              name: user.name,
              id: user._id,
              availableCredit: (investment.capital_amount || 0) + (investment.profit_amount || 0),
              amountReq: investment.net_amount_per_month || 0,
              tds: investment.tds_deduction_amount || 0,
              sc: investment.sc_deduction_amount || 0,
              investmentid: investment._id || 0,
              investedamount: investment.invest_amount || 0,
              invest_type: investment.invest_type || 0,
              netPay: investment.net_amount_per_month || 0,
              invest_duration_in_month: investment.invest_duration_in_month || 0,
              remainingmonth: remainingMonths,
              date: investment.invest_confirm_date ? new Date(investment.invest_confirm_date).toLocaleDateString() : "N/A",
              payoutDate: new Date(investment.roi_payout_status.find((p) => p.status === "Pending").payout_date).toLocaleDateString(),
              bankImage: user.bankImage,
            }]
          : [];
      }) || [];

      setWithdrawData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire("Error", "Failed to fetch data!", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = withdrawData.filter((record) =>
    record.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  const handleOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  return {
    currentPage,
    open,
    selectedImage,
    searchTerm,
    filteredData,
    currentRecords,
    totalPages,
    loading,
    setCurrentPage,
    setSearchTerm,
    handleOpen,
    setOpen
  };
};

export default useAccountTransactionTable;
