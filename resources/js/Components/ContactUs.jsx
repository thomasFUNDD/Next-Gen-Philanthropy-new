// ContactUs.jsx
import React from 'react';
import utaLogo from '../../images/logo.png';

const ContactUs = () => {
  return (
    <div className="contact-us-page">
      <h2 className="contact-us-heading">Contact Us</h2>
      <div className="contact-us-container">
        <div className="contact-us-header">
          <img src={utaLogo} alt="UTA Logo" className="uta-logo" />
        </div>
        <div className="contact-us-content">
          <div className="contact-us-form">
            <div className="form-group">
              <label htmlFor="issueType">What type of issue do you have?:</label>
              <select id="issueType" className="form-control">
                <option value="general">General Inquiries</option>
                <option value="technical">Technical Support</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="email">Alta Fogel:</label>
              <input type="email" id="email" className="form-control" value="biczybitzgb@gmail.com" readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="message">Your Message:</label>
              <textarea id="message" className="form-control" rows="4"></textarea>
            </div>
            <button className="send-message-btn">Send Message</button>
          </div>
          <div className="contact-details">
            <h3>Contact Details</h3>
            <div className="contact-item">
              <h4>Technical Support</h4>
              <p>Tel: 020.3007.0760</p>
              <p>Email: uta-support@utauk.org</p>
            </div>
            <div className="contact-item">
              <h4>General Enquiries</h4>
              <p>Tel: 020.8806.8283</p>
              <p>Email: info@utauk.org</p>
            </div>
            <div className="contact-item">
              <h4>Address</h4>
              <p>33 Old Hill Street, London N16 6LR</p>
              <p>Charity No: 291834</p>
              <p>Inland Rev No: XN 80498</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;