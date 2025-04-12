import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import ReactPlayer from "react-player";
import FeaturedDestinations from "./FeaturedDestinations";
import SearchFilter from "./SearchFilter";
import BlogSection from "./BlogSection";
import Testimonials from "./Testimonials";
import "./HomePage.css";


const HomePage = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="homepage-container">
      <header className="header">
        <div className="nav-wrapper">
          <h1 className="site-title">Xplorizz</h1>
          <nav>
            <ul className="nav-links">
              <li><a href="#destinations">Destinations</a></li>
              <li><a href="#experiences">Experiences</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </header>
      <main className="main-content">
        <section className="hero-section">
          {/* Using ReactPlayer as the background video */}
          <ReactPlayer
            className="hero-video"
            url="https://www.youtube.com/watch?v=rTDaZoDDW5g"
            playing
            loop
            muted
            width="100%"
            height="100%"
          />
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h2> Unveiling the Wonders of Incredible Bharat</h2>
            <p>
            Uncover the enchanting mystique of India, where ancient traditions meet vibrant modernity.
            </p>
            <a href="#destinations" className="btn-primary">Explore Now</a>
          </div>
          <div className="scroll-indicator">
            <span className="arrow">&#x2193;</span>
          </div>
        </section>
        <FeaturedDestinations />
        <SearchFilter />
        
        <Testimonials />  

      </main>
      <footer className="footer">
        <p>&copy; 2025 Xplorizz. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;