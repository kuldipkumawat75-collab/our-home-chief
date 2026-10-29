import React from "react";
import { useNavigate } from "react-router-dom";
import heroVideo from "../../assets/heroVideo.mp4";
import "./HomeVideo.css";

const HomeVideo = () => {

  const navigate = useNavigate();

  return (
    <div className="hero">

      <video autoPlay loop muted playsInline className="hero-video">
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="hero-overlay">
        <h1>Welcome to Shri Ram Polibhaji Kendra</h1>
        <p>Fresh, Delicious & Healthy Meals</p>

        <button
          className="explore-btn"
          onClick={() => navigate("/menu")}
        >
          Explore Menu
        </button>
      </div>

    </div>
  );
};

export default HomeVideo;