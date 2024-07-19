import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/AdminDashboard.css'; // Import your custom styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faStar, faEnvelope, faFileInvoice } from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const navigateToUserRegistration = () => {
    navigate('/user-registration'); // Update with the actual path of your UserRegistration component
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <div className="card-row">
        {/* User Details */}
        <div className="dashboard-card user-card" onClick={navigateToUserRegistration}>
          <FontAwesomeIcon icon={faUsers} size="3x" />
          <div className="card-title">User Details</div>
        </div>

        {/* Reviews */}
        <div className="dashboard-card review-card">
          <FontAwesomeIcon icon={faStar} size="3x" />
          <div className="card-title">Reviews</div>
        </div>
      </div>

      <div className="card-row">
        {/* Contact Us Messages */}
        <div className="dashboard-card contact-card">
          <FontAwesomeIcon icon={faEnvelope} size="3x" />
          <div className="card-title">Contact Us Messages</div>
        </div>

        {/* Invoice Processed */}
        <div className="dashboard-card invoice-card">
          <FontAwesomeIcon icon={faFileInvoice} size="3x" />
          <div className="card-title">Invoice Processed</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
