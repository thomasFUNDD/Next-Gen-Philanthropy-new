// OnlineAccessModal.js
import React, { useState } from 'react';

const OnlineAccessModal = ({ showModal, closeModal }) => {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleGetOnlineAccess = async () => {
    try {
      const response = await fetch('/api/online-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccessMessage('Online Access email sent successfully.');
      } else {
        const data = await response.json();
        setSuccessMessage(data.message);
      }
    } catch (error) {
      console.error('Online Access error:', error);
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
            <h5 className="modal-title">Get Online Access</h5>
            <button type="button" className="btn-close" onClick={closeModal}></button>
          </div>
          <div className="modal-body">
            <p>
              By clicking the 'Get Online Access' button, you will receive an email if you have an account associated
              with your UTA account. Once your email is confirmed, you will be able to set your password and access the
              UTA dashboard.
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
            <button type="button" className="btn btn-primary" onClick={handleGetOnlineAccess}>
              Get Online Access
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineAccessModal;