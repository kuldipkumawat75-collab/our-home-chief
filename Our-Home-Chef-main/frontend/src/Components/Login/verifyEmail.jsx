import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Backend verification baad me
    navigate("/new-password", { state: { email } });
  };

  return (
    <div className="auth-container">
      <h2>Verify Email</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Enter Registered Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">Continue</button>
      </form>
    </div>
  );
};

export default VerifyEmail;