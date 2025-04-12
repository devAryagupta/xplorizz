import React from "react";
import "./Testimonials.css";

const Testimonials: React.FC = () => {
  const reviews = [
    { name: "Alice", text: "An unforgettable experience!" },
    { name: "Bob", text: "Loved every second of it!" }
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