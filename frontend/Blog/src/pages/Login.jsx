import React, { useState } from 'react';
import axios from 'axios'; // Make sure axios is imported
import { RiAccountCircle2Line } from "react-icons/ri";
import { RiLockPasswordLine } from "react-icons/ri";
import { RiLoginCircleFill } from "react-icons/ri";
import { MdOutlineMailOutline } from "react-icons/md";

import "./Login.css";
import { BrowserRouter as Router, Link,Routes, Route,useNavigate } from 'react-router-dom';
import image1 from "../public/imagel1.jpg";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate=useNavigate()
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send data as an object in the body
      const response = await axios.post('http://localhost:8000/api/v1/users/login', { username, password, email });
      
      // Set success message (optional)
      alert('Login Successful');
      navigate("/")
    } catch (error) {
      // Handle error (if any)
      setError(error.response?.data?.message || 'Error during login');
    }
  };

  return (
    <div className="login">
      <h3>
        <p>User Login</p>
        <br />
        <img src={image1} className='login-img' alt="Login"/>
      </h3>
      <form className='login-container' onSubmit={handleLoginSubmit}>
        <h3>Welcome Back</h3>
        
        <div className="username">
          <RiAccountCircle2Line />&nbsp;
          <input
            placeholder="username"
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        
        <div className="email">
          <MdOutlineMailOutline />&nbsp;
          <input
            placeholder="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            id="email"
          />
        </div>
        
        <div className="password">
          <RiLockPasswordLine />&nbsp;
          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            id="password"
          />
        </div>
        
        {error && <p className="error-message">{error}</p>} {/* Show error message */}
        
        <div className="login-btn">
          <RiLoginCircleFill />&nbsp;
          <button type="submit">Login</button>
        </div>

        <div className="signup">
          <h3>
            <p>New User? Register here!!</p>
            &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/signup">
              <button type="button">Sign Up</button>
            </Link>
          </h3>
        </div>
      </form>
    </div>
  );
}

export default Login;
