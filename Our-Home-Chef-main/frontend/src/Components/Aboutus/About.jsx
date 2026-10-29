import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">

      <div className="about-container">

        {/* Header */}
        <h1>About FoodFit 🍎</h1>
        <p className="subtitle">
          Your healthy food partner for everyday meals
        </p>

        {/* Content */}
        <div className="about-content">

          <div className="about-box">
            <h2>🌱 Our Mission</h2>
            <p>
              We aim to deliver fresh, healthy and affordable meals to everyone.
              FoodFit helps you stay fit with balanced nutrition every day.
            </p>
          </div>

          <div className="about-box">
            <h2>🚀 What We Do</h2>
            <p>
              We provide breakfast, lunch, and dinner options with proper
              calorie-balanced meals. You can also get personalized food recommendations.
            </p>
          </div>

          <div className="about-box">
            <h2>❤️ Why Choose Us</h2>
            <p>
              ✔ Fresh ingredients <br />
              ✔ Fast delivery <br />
              ✔ Healthy recipes <br />
              ✔ Affordable prices
            </p>
          </div>

        </div>

        {/* Footer note */}
        <div className="about-footer">
          <p>Eat healthy, live healthy with FoodFit 💪</p>
        </div>

      </div>

    </div>
  );
};

export default About;