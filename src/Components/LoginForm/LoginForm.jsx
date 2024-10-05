import React from "react";
import './LoginForm.css'
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import logo from "../Assets/LOGO Xplorizz (1).png";
const LoginForm = () =>{
    return(
        <div className="wrapper">
            <form action="">
            <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo" />
                    <h1>Login</h1>
            </div>      
            <div className="inputbox">
                <input type="text" placeholder="Username" required></input>
                <FaUserAlt className="icon" />
            </div>
            <div className="inputbox">
                <input type="password" placeholder="Password" required></input>
                <RiLockPasswordFill className="icon" />
            </div>
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