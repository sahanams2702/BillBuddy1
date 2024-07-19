import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userIsLoggedIn = checkAuthenticationStatus();
    setIsLoggedIn(userIsLoggedIn);
  }, []);

  const checkAuthenticationStatus = () => {
    const isAuthenticated = localStorage.getItem('authenticated') === 'true';
    return isAuthenticated;
  };

  const handleGetStarted = () => {
    if (isLoggedIn) {
      // If the user is logged in, redirect to "/upload-invoice"
      navigate('/upload-invoice');
    } else {
      // If the user is not logged in, redirect to the login page
      navigate('/login');
    }
  };

  return (
    <>
      <section className="home" id="home">
        <div className="content">
          <h3>
            "REVOLUTIONIZE <span>YOUR INVOICING </span> WITH OUR PROCESSING AND GENERATOR"
          </h3>
          <p>Click here to begin your invoice journey</p>
          <button className="btn" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      </section>
    </>
  );
};

export default Home;
