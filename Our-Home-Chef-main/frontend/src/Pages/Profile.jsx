import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Pages/CSS/Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:4000/api/user/profile", {
          headers: {
            token
          }
        });

        if (res.data.success) {
          setUser(res.data.user);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="profile-container">

      <h2>My Profile</h2>

      {user ? (
        <div className="profile-card">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}

    </div>
  );
};

export default Profile;