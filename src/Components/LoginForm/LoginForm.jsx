import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";       
import './LoginForm.css';
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import logo from "../Assets/LOGO Xplorizz (1).png";
import { AuthContext } from "../../Context/AuthContext";
import {jwtDecode} from "jwt-decode";

const LoginForm = () => {
  const [username, setUsername] = useState("");  
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext); // reading the context from the authcontext.jsx file

  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('login-page');
    return () => {
      document.body.classList.remove('login-page');
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const { data } = await axios.post("/api/auth/login", 
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );
      // yh flow gya authroutes.js me login route pe
      //console.log("Data:",data); // check the data returned from the server
      //console.log(data.token); // check the token returned from the server

      const { token } = data;// destructuring the token from the data
      if (token) {
        login(token); // auth contrext se refer  we call the login function
        sessionStorage.setItem("token", token);// save the token in local storage
         const { role, username } = jwtDecode(token);;// decode the token to get the role
        sessionStorage.setItem("role", role);
        sessionStorage.setItem("username", username);
        navigate(role === "admin" ? "/admin" : "/homepage");
      }
    } catch {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <h1>Login</h1>
        </div>
        <div className="inputbox">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <FaUserAlt className="icon" />
        </div>
        <div className="inputbox">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <RiLockPasswordFill className="icon" />
        </div>
        {error && <p className="error">{error}</p>}
        <div className="remember-forgot">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <a href="#">Forgot Password?</a>
        </div>
        <button type="submit">Login</button>
        <div className="register-link">
          <p>
            Don't have an account? <a href="/register" onClick={(e) => { e.preventDefault(); navigate('/register'); }}>Register</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;