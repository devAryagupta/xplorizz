import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <header
      className="hero-section"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1350&q=80')"
      }}
    >
      <div className="overlay">
        <h1>Explore Stories</h1>
        <button className="cta-btn">Explore Stories</button>
      </div>
    </header>
  );
};

export default HeroSection;