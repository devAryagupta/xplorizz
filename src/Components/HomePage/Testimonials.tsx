import React from "react";
import "./Testimonials.css";

const Testimonials: React.FC = () => {
  const reviews = [
    { name: "Matthew Karsten", text: "Investment in travel is an investment in yourself." },
    { name: "Ibn Battuta", text: "Traveling – it leaves you speechless, then turns you into a storyteller." }
  ];

  return (
    <section className="testimonials-section">
      <h2 className="testimonials-title">What Travelers Say</h2>
      <div className="testimonials-container">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="testimonial-card"
          >
            <p className="testimonial-text">"{review.text}"</p>
            <p className="testimonial-name">- {review.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;