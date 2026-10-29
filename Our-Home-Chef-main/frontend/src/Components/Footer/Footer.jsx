import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Logo / About */}
        <div className="footer-box">
          <h2>🍎 FoodFit</h2>
          <p>
            Healthy and tasty meals delivered to your doorstep.
            Eat fresh, stay fit.
          </p>
        </div>

        {/* Links */}
        <div className="footer-box">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>Menu</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-box">
          <h3>Categories</h3>
          <ul>
            <li>Breakfast</li>
            <li>Lunch</li>
            <li>Dinner</li>
            <li>Snacks</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-box">
          <h3>Contact</h3>
          <p>📍 Vileparle, Mumbai</p>
          <p>📞 +91 9356334818</p>
          <p>✉️ support@foodfit.com</p>
        </div>

      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>© 2026 FoodFit. All rights reserved.</p>
      </div>

    </footer>
  );
};

export default Footer;