import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InvoiceLeftSidebar from './InvoiceLeftSidebar';
import '../styles/Invoice.css';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return date.toLocaleDateString(undefined, options);
};

const IssueInvoice = () => {
  const navigate = useNavigate();
  const [userInvoices, setUserInvoices] = useState([]);
  const [username, setUsername] = useState('');
  const [expandedImage, setExpandedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const Logo = 'path-to-your-logo'; // Replace with the actual path or import statement for your logo image

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername || '');

    if (storedUsername) {
      fetchUserInvoices(storedUsername);
    }
    const storedProfilePic = localStorage.getItem(`profilePic_${username}`);
    setProfilePic(storedProfilePic || null);
  }, [username]);

  const fetchUserInvoices = (username) => {
    axios.get(`http://localhost:5000/api/invoices?username=${username}`)
      .then(response => {
        setUserInvoices(response.data.invoices);
      })
      .catch(error => {
        console.error('Error fetching user invoices:', error);
      });
  };

  const todayInvoices = userInvoices.filter((invoice) => {
    const formattedIssueDate = formatDate(invoice.issue_date);
    const formattedToday = formatDate(new Date().toISOString());

    return formattedIssueDate === formattedToday;
  });

  const handleViewImage = (invoice) => {
    setExpandedImage(invoice);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const activeItem = 'invoice';

  const handleLogout = () => {
    localStorage.removeItem('authenticated');
    localStorage.removeItem('username');
    navigate('/home');
  };

  return (
    <>
      <div className="Invoice-dashboard">
        <InvoiceLeftSidebar activeItem={activeItem} handleItemClick={navigate} handleLogout={handleLogout} />

        {todayInvoices.length > 0 ? (
          <div className="table">
            <h2>Your Invoices</h2>
            <table>
              <thead>
                <tr>
                  <th>Invoice Number</th>
                  <th>Issue Date</th>
                  <th>Address</th>
                  <th>Billed To</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>
                {todayInvoices.map((invoice, index) => (
                  <tr key={index}>
                    <td className="table-td">{invoice.invoice_number}</td>
                    <td className="table-td">{invoice.issue_date}</td>
                    <td className="table-td">{invoice.address}</td>
                    <td className="table-td">{invoice.billed_to}</td>
                    <td>
                      {invoice.image_data && (
                        <div className="image-cell">
                          <span className="view-icon" onClick={() => handleViewImage(invoice)}>
                            <i className="fas fa-eye"></i> View
                          </span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-invoice-message">
            <p>No invoices issued today.</p>
          </div>
        )}

        <div className="profile-info">
          <div className="I1-avatar">
            <label htmlFor="profile-pic-input">
              <img src={profilePic || Logo} alt="" />
            </label>
            <input
              type="file"
              id="profile-pic-input"
              accept="image/*"
              style={{ display: 'none' }}
            />
          </div>
          <p className="Invoiceusername">{username}</p>
        </div>
      </div>

      <Footer />

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="View Image Modal"
        className="custom-modal"
        overlayClassName="custom-modal-overlay"
      >
        <button className="close-modal-button" onClick={handleCloseModal}>
          <i className="fas fa-times"></i>
        </button>
        {expandedImage && (
          <img
            src={`data:image/jpeg;base64,${expandedImage.image_data}`}
            alt={`Invoice ${expandedImage.invoice_number}`}
            className="modal-image"
          />
        )}
      </Modal>
    </>
  );
};

export default IssueInvoice;
