import React, { useState, useEffect } from 'react';
import '../styles/CustomerDashboard.css';
import CustomerLeftSideBar from './CustomerLeftSideBar';
import RightSidebar from './RightSidebar';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Horn from '../assets/images/horn.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [userInvoices, setUserInvoices] = useState([]);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUsername = localStorage.getItem('username');
        setUsername(storedUsername || '');

        const currentDate = new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
        setCurrentDate(currentDate);

        if (storedUsername) {
          const response = await fetchUserInvoices(storedUsername);
          setUserInvoices(response.data.invoices);
        }
      } catch (error) {
        console.error('Error fetching user invoices:', error);
      }
    };

    fetchData();
  }, []);

  const fetchUserInvoices = async (username) => {
    return await axios.get(`http://localhost:5000/api/invoices?username=${username}`);
  };

  // Helper function to check if a date matches the current date
const isCurrentDate = (dateString) => {
  // Check if the dateString is a valid date
  const isValidDate = (new Date(dateString)).toString() !== 'Invalid Date';

  if (!isValidDate) {
    return false;
  }

  const today = new Date().toISOString().split('T')[0];
  return new Date(dateString).toISOString().split('T')[0] === today;
};


  // Filter invoices that match the current day
  const todayIssuedInvoices = userInvoices.filter(invoice => isCurrentDate(invoice.issue_date));
  const todaydueInvoices = userInvoices.filter(invoice => isCurrentDate(invoice.due_date));
  const activeItem = 'customerdashboard';

  const handleLogout = () => {
    localStorage.removeItem('authenticated');
    localStorage.removeItem('username');
    navigate('/home');
    window.location.reload();
  };

  return (
    <>
      <div className="user-dashboard2">
        <CustomerLeftSideBar activeItem={activeItem} handleItemClick={navigate} handleLogout={handleLogout} />
        <div className="userflex">
          Welcome To BillBuddy!!! <br /> {username} <img src={Horn} alt="Horn" />
        </div>
        <br />
        <div className="userflex1">
          Hey {username} You have {userInvoices.length} {userInvoices.length === 1 ? 'invoice' : 'invoices'} in your account<br></br>
          Click here to Check
          <Link to="/invoicedashboard"> 
            <button className="money-icon">
              <i className="fas fa-invoice"></i>
            </button>
          </Link>{' '}
          <br />
        </div>
        <div className="userflex2">
          You have {userInvoices.length} {userInvoices.length === 1 ? 'invoice' : 'invoices'} invoice paid, <i class="fas fa-money-check-alt" ></i> <br />
          You have {userInvoices.length} {userInvoices.length === 1 ? 'invoice' : 'invoices'} invoice unpaid, <i class="fa fa-credit-card" ></i> <br />
          pay it Now!!! <p>{username}!</p>
        </div>
        <div className="userflex3">
          You have {todaydueInvoices.length} {todaydueInvoices.length === 1 ? 'invoice' : 'invoices'} Invoices Due on {currentDate}{' '}<br></br>
          click here to check
          <Link to="/dueinvoice"> 
            <button className="money-icon">
              <i className="fas fa-money-check-alt"></i>
            </button>
          </Link>{' '}
          <br />
        </div>
        <div className="userflex4">
          You have {todayIssuedInvoices.length} {todayIssuedInvoices.length === 1 ? 'invoice' : 'invoices'} Issued on this day <i class="fas fa-money-check-alt" ></i> <br></br>{currentDate}<br />
          click here to check
          <Link to="/issueinvoice"> 
            <button className="money-icon">
              <i className="fas fa-money-check-alt"></i>
            </button>
          </Link>{' '}
        </div>
      </div>
      <RightSidebar username={username} invoices={userInvoices} />
      <Footer />
    </>
  );
};

export default CustomerDashboard;
