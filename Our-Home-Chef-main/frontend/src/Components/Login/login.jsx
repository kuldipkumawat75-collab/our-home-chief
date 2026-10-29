import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  // useEffect(() => {
  //   window.fbAsyncInit = function () {
  //     window.FB.init({
  //       appId: "YOUR_FACEBOOK_APP_ID", // <-- Replace with your App ID
  //       cookie: true,
  //       xfbml: true,
  //       version: "v23.0",
  //     });
  //   };

  //   const script = document.createElement("script");
  //   script.src = "https://connect.facebook.net/en_US/sdk.js";
  //   script.async = true;
  //   script.defer = true;
  //   document.body.appendChild(script);
  // }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:4000/api/user/login",
        data
      );

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);

        alert("Login Successful");
        console.log("Saved UserId:", localStorage.getItem("userId"));
        navigate("/");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Facebook Login
  const facebookLogin = () => {
    window.FB.login(
      async function (response) {
        if (response.authResponse) {
          try {
            const res = await axios.post(
              "http://localhost:4000/api/user/facebook-login",
              {
                accessToken: response.authResponse.accessToken,
              }
            );

            if (res.data.success) {
              localStorage.setItem("token", res.data.token);
              alert("Facebook Login Successful");
              navigate("/");
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          alert("Facebook Login Cancelled");
        }
      },
      { scope: "public_profile,email" }
    );
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button type="submit">Login</button>
      </form>

      {/* <button
        onClick={facebookLogin}
        style={{
          marginTop: "15px",
          width: "100%",
          padding: "10px",
          background: "#1877F2",
          color: "white",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
        }}
      >
        Continue with Facebook
      </button> */}

      <p className="forgot-password">
        <Link to="/forgot-password">Forgot Password?</Link>
      </p>

      <p>
        Don’t have an account?
        <Link to="/signup"> Sign up here</Link>
      </p>
    </div>
  );
};

export default Login;