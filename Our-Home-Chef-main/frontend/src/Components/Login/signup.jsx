import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const Signup = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:4000/api/user/register", data);

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
         localStorage.setItem("userId", res.data.userId);
        alert("Signup Successful");

        navigate("/"); // redirect after signup
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />

        <button type="submit">Sign Up</button>
      </form>

      <p>
        Already have an account?
        <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Signup;