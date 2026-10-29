import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // 🔥 LOGIN STATE SAFE CHECK
  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  // ✅ FETCH CART COUNT
  const fetchCartCount = async () => {
    try {
      if (!userId) {
        setCartCount(0);
        return;
      }

      const res = await axios.post(
        "http://localhost:4000/api/user/get-cart",
        { userId }
      );

      if (res.data.success && res.data.cartData) {
        const count = res.data.cartData.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        setCartCount(count);
      } else {
        setCartCount(0);
      }
    } catch (error) {
      console.log(error);
      setCartCount(0);
    }
  };

  // 🔥 INITIAL + EVENT SYNC
  useEffect(() => {
    fetchCartCount();

    window.addEventListener("cartUpdated", fetchCartCount);

    return () => {
      window.removeEventListener("cartUpdated", fetchCartCount);
    };
  }, [userId]); // 🔥 IMPORTANT FIX

  // 🔥 LOGOUT FIXED
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    setCartCount(0); // instant UI reset
    setIsLoggedIn(false);

    window.dispatchEvent(new Event("cartUpdated"));

    navigate("/login");
  };

  return (
    <nav className="navbar">

      {/* LOGO */}
      <div className="logo">
        🍎
        <div className="logo-text">
          <p>Shri Ram</p>
          <p>Polibhaji Kendra</p>
        </div>
      </div>

      {/* NAV LINKS */}
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/weeklyPlan">Weekly Plan</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>

      {/* RIGHT SECTION */}
      <div className="right-section">

        {/* CART */}
        <div className="cart-icon" onClick={() => navigate("/cart")}>
          🛒
          <span className="cart-count">{cartCount}</span>
        </div>

        {/* AUTH */}
        {!isLoggedIn ? (
          <div className="auth-buttons">
            <Link to="/login"><button className="login-btn">Login</button></Link>
            <Link to="/signup"><button className="signup-btn">Sign Up</button></Link>
          </div>
        ) : (
          <div className="profile-section">

            <div
              className="user-avatar"
              onClick={() => setShowProfile(!showProfile)}
            >
              👤
            </div>

            {showProfile && (
              <div className="profile-dropdown">
                <p onClick={() => navigate("/profile")}>My Profile</p>
                <p onClick={() => navigate("/orders")}>Orders</p>
                <hr />
                <p onClick={handleLogout}>Logout</p>
              </div>
            )}

          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;