import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MyKycList() {
  const [kycData, setKycData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    axios.get('http://localhost:5000/api/user/getUser/67ea1f1325fe46d0da2fa112', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      if (response.data.Status && response.data.data) {
        setKycData(response.data.data.data);
      }
    })
    .catch(error => console.error("Error fetching KYC data:", error));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My KYC List</h2>
      {kycData ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">PAN Image</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="border border-gray-300 p-2">{kycData._id}</td>
              <td className="border border-gray-300 p-2">{kycData.name}</td>
              <td className="border border-gray-300 p-2">
                <img 
                  src={`http://localhost:5000/api/user/downloadPanFile/${kycData.uploaded_pan_file}`} 
                  alt="PAN" 
                  className="w-32 h-auto mx-auto border rounded"
                  onError={(e) => { e.target.onerror = null; e.target.src="/default-pan.png"; }} 
                />
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MyKycList;
