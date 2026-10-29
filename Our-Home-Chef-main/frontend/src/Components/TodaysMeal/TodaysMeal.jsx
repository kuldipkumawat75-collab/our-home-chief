import React, { useEffect, useState } from "react";
import axios from "axios";
import Item from "../Item/Item";

const TodaysMeal = () => {
  const [todays, setTodays] = useState([]);

  const userId = localStorage.getItem("userId");

  // FETCH DATA
  const fetchTodaysMeal = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/food/todays-meal"
      );

      if (res.data.success) {
        setTodays(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodaysMeal();
  }, []);

  // ✅ ADD TO CART (BACKEND)
  const addToCart = async (itemId) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/cart/add",
        {
          userId,
          itemId,
        }
      );

      if (res.data.success) {
        window.dispatchEvent(new Event("cartUpdated"));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="menu">

      <h1>Today's Meal</h1>
      <p>Fresh meals available today</p>

      <div className="menu-products">
        <div className="row">

          {todays.map((item) => (
            <Item
              key={item._id}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.newPrice}
              addToCart={addToCart}
            />
          ))}

        </div>
      </div>

    </div>
  );
};

export default TodaysMeal;