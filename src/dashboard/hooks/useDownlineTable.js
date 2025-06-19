import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useDownlineTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);  // 👈 loader state

  const token = localStorage.getItem("accessToken");
  const currentUserId = localStorage.getItem("_id");
  const navigate = useNavigate();

  const userId = selectedUser ? selectedUser._id : currentUserId;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);  // Start loading
      try {
        const response = await fetch(`https://jointogain.ap-1.evennode.com/api/user/getUser/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const result = await response.json();

        const flattenReferrals = (referrals, level = 1) => {
          let flattened = [];
          for (const referral of referrals) {
            referral.user_level = level;
            flattened.push(referral);
            if (referral.referrals?.length > 0) {
              flattened = flattened.concat(flattenReferrals(referral.referrals, level + 1));
            }
          }
          return flattened;
        };

        const rootUser = result?.data?.data;

        if (rootUser?.referrals?.length > 0) {
          let flattenedData = flattenReferrals(rootUser.referrals, 1);
          flattenedData = flattenedData.filter(user => user._id !== currentUserId);
          setData(flattenedData);
          setFilteredData(flattenedData);
        } else {
          if (rootUser._id !== currentUserId) {
            rootUser.user_level = 0;
            setData([rootUser]);
            setFilteredData([rootUser]);
          } else {
            setData([]);
            setFilteredData([]);
          }
        }

      } catch (error) {
        console.error('Error fetching data:', error);
        setData([]);
        setFilteredData([]);
      } finally {
        setLoading(false);  // End loading
      }
    };

    fetchData();
  }, [userId, token, currentUserId]);

  // Same methods as before...
  const handleSearch = (value) => {
    setSearchTerm(value);
    const filtered = data.filter(user =>
      user.name?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
    setPage(0);
  };

  const handleExport = () => {
    const rows = filteredData.map(row => ({
      Username: row.user_profile_id,
      Level: row.user_level,
      Name: row.name,
      Investment: row.investment_info?.reduce((sum, inv) => sum + (inv.invest_amount || 0), 0) || 0,
      JoinDate: new Date(row.createdAt).toLocaleDateString(),
      Status: row.user_status
    }));

    if (rows.length === 0) return;

    const csvContent = [
      Object.keys(rows[0]).join(','),
      ...rows.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "downline_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewClick = (userId) => {
    navigate(`/ViewInvestments/${userId}`);
  };

  return {
    data,
    filteredData,
    searchTerm,
    selectedUser,
    page,
    rowsPerPage,
    loading,  // 👈 return loading
    setSelectedUser,
    handleSearch,
    handleExport,
    handleViewClick,
    setPage,
    setRowsPerPage
  };
};

export default useDownlineTable;
