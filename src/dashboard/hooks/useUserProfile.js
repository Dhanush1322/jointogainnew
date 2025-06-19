import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const useUserProfile = (userId, token) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    state: "",
    address: "",
    mobile: "",
    dob: "",
    city: "",
    pincode: "",
    pan: "",
    aadhar: "",
    bankName: "",
    ifsc: "",
    branch: "",
    accountNumber: "",
    nomineeName: "",
    nomineeRelation: "",
    nomineeAadhar: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch user data
  useEffect(() => {
    if (userId && token) {
      axios
        .get(`https://jointogain.ap-1.evennode.com/api/user/getUser/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.data?.data?.data) {
            const userData = response.data.data.data;
            setFormData({
              name: userData.name || "",
              email: userData.email || "",
              gender: userData.gender || "",
              state: userData.state || "",
              address: userData.address || "",
              mobile: userData.phone_no || "",
              dob: userData.date_of_birth ? userData.date_of_birth.split("T")[0] : "",
              city: userData.city || "",
              pincode: userData.pincode || "",
              pan: userData.pan_number || "",
              aadhar: userData.aadhar_number || "",
              bankName: userData.bank_name || "",
              ifsc: userData.ifsc || "",
              branch: userData.branch || "",
              accountNumber: userData.ac_number || "",
              nomineeName: userData.nominee_name || "",
              nomineeRelation: userData.nominee_relationship || "",
              nomineeAadhar: userData.nominee_aadhar_number || "",
            });
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user details:", error.response?.data || error.message);
          setLoading(false);
        });
    } else {
      console.warn("Missing User ID or Token. Skipping API call.");
      setLoading(false);
    }
  }, [userId, token]);

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      name: formData.name,
      email: formData.email,
      gender: formData.gender,
      state: formData.state,
      address: formData.address,
      phone_no: formData.mobile,
      date_of_birth: formData.dob,
      city: formData.city,
      pincode: formData.pincode,
      pan_number: formData.pan,
      aadhar_number: formData.aadhar,
      bank_name: formData.bankName,
      ifsc: formData.ifsc,
      branch: formData.branch,
      ac_number: formData.accountNumber,
      nominee_name: formData.nomineeName,
      nominee_aadhar_number: formData.nomineeAadhar,
      nominee_relationship: formData.nomineeRelation,
    };

    axios
      .put(`https://jointogain.ap-1.evennode.com/api/user/updateUserProfile/${userId}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        Swal.fire("Success!", "Profile Updated Successfully!", "success");
      })
      .catch((error) => {
        console.error("Error updating profile:", error.response?.data || error.message);
        Swal.fire("Error!", "Failed to update profile.", "error");
      });
  };

  return { formData, loading, handleChange, handleSubmit };
};

export default useUserProfile;
