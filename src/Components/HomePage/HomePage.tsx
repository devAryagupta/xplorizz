import React from "react";


import ReactPlayer from "react-player";
import FeaturedDestinations from "./FeaturedDestinations";


import Testimonials from "./Testimonials";
import "./HomePage.css";

const HomePage: React.FC = () => {




  return (
    <div className="homepage-container">
      
      <main className="main-content">
        <section className="hero-section">
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

        </section>
        <FeaturedDestinations />
        
        <Testimonials />
      </main>
      <footer className="footer">
        <p>&copy; 2025 Xplorizz. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;