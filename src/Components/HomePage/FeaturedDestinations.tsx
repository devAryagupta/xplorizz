import React from "react";
import { Link } from "react-router-dom";
import "./FeaturedDestination.css";

const FeaturedDestinations: React.FC = () => {
  return (
    <section className="destinations-section" id="destinations">
      <h3>Featured Destinations</h3>
      <div className="destinations-gallery">
        <Link to="/experiences" className="destination-card">
          <img
            src="https://images.unsplash.com/photo-1461603950871-cd64bcf7acf0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fFdJTERMSUZFJTIwU0NBTlRVUklFUyUyMElOJTIwSU5ESUF8ZW58MHx8MHx8fDA%3D"
            alt="Cultural Escapade"
          />
          <div className="destination-info">
            <h4>Cultural Escapade</h4>
            <p>Immerse yourself in the rich heritage and timeless art of historic destinations.</p>
          </div>
        </Link>

        <Link to="/experiences" className="destination-card">
          <img
            src="https://plus.unsplash.com/premium_photo-1661812423307-aea4bd629e28?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Wildlife Encounters"
          />
          <div className="destination-info">
            <h4>Wildlife Encounters</h4>
            <p>Experience the thrill of getting close to nature in its wildest form.</p>
          </div>
        </Link>

        <Link to="/experiences" className="destination-card">
          <img
            src="https://images.unsplash.com/photo-1634400001131-d04275db2076?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Adrenaline Rush"
          />
          <div className="destination-info">
            <h4>Adrenaline Rush</h4>
            <p>Embark on thrilling adventures that push your limits and ignite your spirit.</p>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedDestinations;