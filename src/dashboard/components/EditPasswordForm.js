import React, { useState } from 'react';
import axios from 'axios';  // Import axios for making HTTP requests
import './EditPasswordForm.css'; // Include CSS for styling if needed

function EditPasswordForm() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');  // New state for success message
  const [loading, setLoading] = useState(false);  // Loading state for the form submission

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation logic
    if (newPassword !== confirmNewPassword) {
      setError('New Password and Confirm New Password do not match.');
      return;
    }

    if (newPassword.length < 8) {
      setError('New Password must be at least 8 characters long.');
      return;
    }

    // Reset error and proceed with form submission logic
    setError('');
    setSuccessMessage('');
    setLoading(true);  // Set loading state to true when submitting

    // Make API request to reset the password
    try {
      const response = await axios.post('https://host-rl4ol.ondigitalocean.app/reset-password', {
        oldPassword,        // Changed to 'oldPassword'
        newPassword,        // New password field
        confirmNewPassword  // Confirm new password field
      });

      if (response.status === 200) {
        setSuccessMessage('Password updated successfully!');
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      } else {
        // Handle non-200 responses
        setError(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (err) {
      // Log the full error for debugging
      console.error('Error details:', err.response || err); // Log the full error object

      // If the error is related to response data or status, show appropriate message
      if (err.response) {
        setError(`Error: ${err.response.status} - ${err.response.data.message || 'Failed to update password. Please try again.'}`);
      } else {
        setError('Failed to update password. Please try again.');
      }
    } finally {
      setLoading(false);  // Set loading state back to false after request completion
    }
  };

  return (
    <div className="edit-password-container">
      <h2>Edit Password</h2>
      <form onSubmit={handleSubmit} className="edit-password-form">
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>} {/* Success message */}
        
        <div className="form-group">
          <label htmlFor="oldPassword">Old Password</label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Enter current password"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmNewPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmNewPassword"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            placeholder="Confirm new password"
            required
          />
        </div>
        
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  );
}

export default EditPasswordForm;
