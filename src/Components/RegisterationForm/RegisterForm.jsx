import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserAlt, FaEnvelope } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import logo from "../Assets/LOGO Xplorizz (1).png";
import './RegisterForm.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('register-page');
    return () => {
      document.body.classList.remove('register-page');
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }
    
    try {
      const response = await axios.post(
        "/api/auth/register", 
        {
          username: formData.username,
          email: formData.email,
          password: formData.password
        }
      );
      
      // If registration successful, navigate to login
      if (response.data.msg === "User registered successfully") {
        navigate('/login');
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.msg || "Registration failed");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <h1>Register</h1>
        </div>
        
        <div className="inputbox">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <FaUserAlt className="icon" />
        </div>
        
        <div className="inputbox">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <FaEnvelope className="icon" />
        </div>
        
        <div className="inputbox">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <RiLockPasswordFill className="icon" />
        </div>
        
        <div className="inputbox">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <RiLockPasswordFill className="icon" />
        </div>
        
        {error && <p className="error">{error}</p>}
        
        <button type="submit">Register</button>
        
        <div className="login-link">
          <p>
            Already have an account? <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Login</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;