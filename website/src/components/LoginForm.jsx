import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PersonCircle, LockFill } from 'react-bootstrap-icons';
import axios from 'axios'; // Import axios for making HTTP requests
import '../styles/LoginForm.css';
import LoginImage from "../assets/images/login.png";


function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

 // ... (imports and other code)



  const handleSubmit = async (event) => { 
   event.preventDefault();

    try {
      if (username === 'admin' && password === 'password') {
          alert('Admin login successful.');
          localStorage.setItem('username', username);
          localStorage.setItem('authenticated', 'true');
          localStorage.setItem('role', 'admin');
          // Reload the page
          navigate('/admin-dashboard'); // Redirect to the admin dashboard
          
      } 
      else {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });

      alert(response.data.message);
      localStorage.setItem('username', username);
      localStorage.setItem('authenticated', 'true');
      
      navigate('/upload-invoice'); // Redirect to the user dashboard
      window.location.reload();
    }
  } catch (error) {
    console.error(error);
    alert('Invalid username or password. Please try again.');
  }
};

// ... (rest of the code)


  return (
    <div className="login-page">
      <img src={LoginImage} alt="Phone" height="600px" width="700px" />
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <label htmlFor="username" className="label-icon">
              <PersonCircle size={20} />
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              style={{ textTransform: "none" }}
            />
          </div>

          <div className="input-box">
            <label htmlFor="password" className="label-icon">
              <LockFill size={20} />
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="button-container">
            <button type="submit">Login</button>
          </div>

          <p className='text-right'>
            Forgot <a href="button"><span>Password?</span></a> <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
