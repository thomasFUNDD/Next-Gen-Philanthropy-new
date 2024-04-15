// ForgotPasswordModal.js
import React, { useState } from 'react';

const ForgotPasswordModal = ({ showModal, closeModal }) => {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = async () => {
    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccessMessage('Email sent successfully.');
      } else {
        const data = await response.json();
        setSuccessMessage(data.message);
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      setSuccessMessage('An error occurred. Please try again later.');
    }
  };

  if (!showModal) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Forgot Password</h5>
            <button type="button" className="btn-close" onClick={closeModal}></button>
          </div>
          <div className="modal-body">
            <p>
              By clicking the Forgot Password button, an email will be sent to your registered email with instructions on
              how to reset your password.
            </p>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
            />
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={handleResetPassword}>
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;