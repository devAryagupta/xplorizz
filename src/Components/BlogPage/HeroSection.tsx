import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <header
      className="hero-section"
      style={{ backgroundImage: "url('/path/to/image.jpg')" }}
    >
      <div className="overlay">
        <h1>Explore Stories</h1>
        <button className="cta-btn">Explore Stories</button>
      </div>
    </header>
  );
};

export default HeroSection;