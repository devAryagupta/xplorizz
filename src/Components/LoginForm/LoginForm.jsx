import React, { useState } from "react";
import axios from "axios"; 
import './LoginForm.css'
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import logo from "../Assets/LOGO Xplorizz (1).png";
const LoginForm = () =>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/login", {
                username,
                password,
            });
            if (response.data.token) {
                // Assuming you're redirecting to a homepage in the future
                window.location.href = "/homepage";
            }
        } catch (err) {
            setError("Invalid username or password");
        }
    };
    return(
        <div className="wrapper">
            <form action="">
            <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo" />
                    <h1>Login</h1>
            </div>      
            <div className="inputbox">
                <input type="text" placeholder="Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)} required></input>
                <FaUserAlt className="icon" />
            </div>
            <div className="inputbox">
                <input type="password" placeholder="Password"                         value={password}
                        onChange={(e) => setPassword(e.target.value)} required></input>
                <RiLockPasswordFill className="icon" />

            </div>
             {error && <p className="error">{error}</p>}

            <div className="remember-forgot">
                <label><input type="checkbox"></input>Remember me</label>
                <a href ="#">Forgot Password?</a>
            </div>
            <button type="submit">Login</button>
            <div className="register-link">
                <p>Don't have an account?<a href="#">Register</a></p>
            </div>
            </form>
        </div>
    );
};
export default LoginForm;