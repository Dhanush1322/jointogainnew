import { useState } from "react";
import Swal from "sweetalert2";

const useKycForm = (userId, token) => {
  const [panFile, setPanFile] = useState(null);
  const [bankPassFile, setBankPassFile] = useState(null);
  const [aadhaarFile, setAadhaarFile] = useState(null);

  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async (file, url) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("File upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      Swal.fire({ title: "Error", text: error.message, icon: "error" });
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId || !token) {
      Swal.fire({ title: "Error", text: "User not authenticated", icon: "error" });
      return;
    }

    if (!panFile || !bankPassFile || !aadhaarFile) {
      Swal.fire({
        icon: "warning",
        title: "Missing Files",
        text: "Please upload all required documents (PAN, Bank Passbook, Aadhaar) before submitting.",
      });
      return;
    }

    try {
      await Promise.all([
        uploadFile(panFile, `https://jointogain.ap-1.evennode.com/api/user/addPanCardFile/${userId}`),
        uploadFile(aadhaarFile, `https://jointogain.ap-1.evennode.com/api/user/addAadharCardFile/${userId}`),
        uploadFile(bankPassFile, `https://jointogain.ap-1.evennode.com/api/user/addBankPassbookFile/${userId}`),
      ]);

      setPanFile(null);
      setBankPassFile(null);
      setAadhaarFile(null);

      Swal.fire({ title: "Success!", text: "Files uploaded successfully!", icon: "success" });
    } catch {
      // Errors handled in uploadFile, no need to repeat here
    }
  };

  return {
    panFile,
    bankPassFile,
    aadhaarFile,
    setPanFile,
    setBankPassFile,
    setAadhaarFile,
    handleFileChange,
    handleSubmit,
  };
};

export default useKycForm;
