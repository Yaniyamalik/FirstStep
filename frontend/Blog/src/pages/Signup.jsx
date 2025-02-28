import React, { useState } from 'react';
import axios from 'axios';  // Make sure axios is imported
import { RiAccountCircle2Line } from "react-icons/ri";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineMailOutline } from "react-icons/md";
import { BrowserRouter as Router, Link,Routes, Route,useNavigate } from 'react-router-dom';
import { RxAvatar } from "react-icons/rx";
import image1 from "../public/image1s.png";
import "./Signup.css";

export const Signup = () => {
  const [message, setMessage] = useState('');
  const [formdata, setFormdata] = useState({
    username: '',
    email: '',
    password: '',
    avatar: null,
    fullname: ''
  });

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value
    });
  };

  const handlefilechange = (e) => {
    const file = e.target.files[0];
    setFormdata({
      ...formdata,
      avatar: file // Update avatar with the selected file
    });
  };
    const navigate=useNavigate()
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();  // Create FormData object

    // Append form data
    formDataToSend.append('username', formdata.username);
    formDataToSend.append('email', formdata.email);
    formDataToSend.append('password', formdata.password);
    formDataToSend.append('fullname', formdata.fullname);
    if (formdata.avatar) {
      formDataToSend.append('avatar', formdata.avatar);  // Add avatar as file
    }

    try {
      // Send the FormData using POST request
      const response = await axios.post('http://localhost:8000/api/v1/users/register', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Ensure correct content-type
        }
      });

      alert("Registration Successful");
      navigate("/login")
      //setMessage(response.data.message);  // Show success message

    } catch (error) {
      //setMessage(error.response?.data?.message || 'Error during registration');
    }
  };

  return (
    <div className="register">
      <img src={image1} className="register-img" />
      <form onSubmit={handleRegisterSubmit} className="register-container">
        <h1>Create your Account</h1>
        <div className="username">
          <RiAccountCircle2Line />&nbsp;
          <input
            placeholder="username"
            id="username"
            name="username"
            type="text"
            value={formdata.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="email">
          <MdOutlineMailOutline />&nbsp;
          <input
            placeholder="email"
            type="text"
            name="email"
            value={formdata.email}
            onChange={handleChange}
            required
            id="email"
          />
        </div>
        <div className="password">
          <RiLockPasswordLine /> &nbsp;
          <input
            placeholder="password"
            type="password"
            name="password"
            value={formdata.password}
            onChange={handleChange}
            required
            id="password"
          />
        </div>
        <div className="fullname">
          <RiAccountCircle2Line /> &nbsp;
          <input
            placeholder="fullname"
            type="text"
            name="fullname"
            value={formdata.fullname}
            onChange={handleChange}
            required
            id="fullname"
          />
        </div>
        <div className="avatar">
          <RxAvatar /> &nbsp;
          <input
            type="file"
            accept="image/*"
            name="avatar"
            onChange={handlefilechange}
            required
            id="avatar"
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};
