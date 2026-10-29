import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  // Send OTP
  const sendOtp = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:4000/api/user/forget-password",
        { email }
      );

      if (res.data.success) {
        alert("OTP sent successfully");
        setOtpSent(true);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  // Verify OTP
  const verifyOtp = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:4000/api/user/verify-otp",
        {
          email,
          otp,
        }
      );

      if (res.data.success) {
        alert("OTP Verified");

        navigate("/new-password", {
          state: { email },
        });
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>

      {!otpSent ? (
        <form onSubmit={sendOtp} className="auth-form">
          <input
            type="email"
            placeholder="Enter Registered Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">Send OTP</button>
        </form>
      ) : (
        <form onSubmit={verifyOtp} className="auth-form">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <button type="submit">Verify OTP</button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;