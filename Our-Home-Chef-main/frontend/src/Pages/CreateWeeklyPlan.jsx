import React, { useEffect, useState } from "react";
import "../Pages/CSS/CreateWeeklyPlan.css";
import axios from "axios";
import DayCard from "../Components/DayCard/DayCard.jsx";

const CreateWeeklyPlan = () => {

  const url = "http://localhost:4000";

  const [foods, setFoods] = useState([]);
  const [weekStart, setWeekStart] = useState("");

  const [days, setDays] = useState([
    {
      day: "Monday",
      breakfast: { food: "", time: "" },
      lunch: { food: "", time: "" },
      dinner: { food: "", time: "" },
      snacks: { food: "", time: "" },
    },
    {
      day: "Tuesday",
      breakfast: { food: "", time: "" },
      lunch: { food: "", time: "" },
      dinner: { food: "", time: "" },
      snacks: { food: "", time: "" },
    },
    {
      day: "Wednesday",
      breakfast: { food: "", time: "" },
      lunch: { food: "", time: "" },
      dinner: { food: "", time: "" },
      snacks: { food: "", time: "" },
    },
    {
      day: "Thursday",
      breakfast: { food: "", time: "" },
      lunch: { food: "", time: "" },
      dinner: { food: "", time: "" },
      snacks: { food: "", time: "" },
    },
    {
      day: "Friday",
      breakfast: { food: "", time: "" },
      lunch: { food: "", time: "" },
      dinner: { food: "", time: "" },
      snacks: { food: "", time: "" },
    },
    {
      day: "Saturday",
      breakfast: { food: "", time: "" },
      lunch: { food: "", time: "" },
      dinner: { food: "", time: "" },
      snacks: { food: "", time: "" },
    },
    {
      day: "Sunday",
      breakfast: { food: "", time: "" },
      lunch: { food: "", time: "" },
      dinner: { food: "", time: "" },
      snacks: { food: "", time: "" },
    },
  ]);

  // Fetch Foods
  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const res = await axios.get(`${url}/api/food/get-food`);

      if (res.data.success) {
        setFoods(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Dropdown & Time Change
  const handleChange = (dayIndex, meal, field, value) => {
    const updatedDays = [...days];
    updatedDays[dayIndex][meal][field] = value;
    setDays(updatedDays);
  };

  // Save Weekly Plan
  const savePlan = async () => {
  try {
    console.log(days);
    const userId = localStorage.getItem("userId");

    // Sirf wahi days bhejo jisme kuch data fill hua hai
    const filteredDays = days.filter((day) => {
      return (
        day.breakfast.food ||
        day.breakfast.time ||
        day.lunch.food ||
        day.lunch.time ||
        day.dinner.food ||
        day.dinner.time ||
        day.snacks.food ||
        day.snacks.time
      );
    });

    if (filteredDays.length === 0) {
      alert("Please fill at least one day's meal plan.");
      return;
    }

    console.log({
      userId,
      weekStart,
      days: filteredDays,
    });

    const res = await axios.post(
      `${url}/api/weekly-plan/create`,
      {
        userId,
        weekStart,
        days: filteredDays,
      }
    );

    if (res.data.success) {
      alert(res.data.message);
    } else {
      alert(res.data.message);
    }

  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message || "Something went wrong"
    );
  }
};

  return (
    <div className="weekly-plan">

      <h2>Create Weekly Plan</h2>

      <label>Week Start</label>

      <input
        type="date"
        value={weekStart}
        onChange={(e) => setWeekStart(e.target.value)}
      />

      {days.map((day, index) => (
        <DayCard
          key={index}
          day={day}
          index={index}
          foods={foods}
          handleChange={handleChange}
        />
      ))}

      <button onClick={savePlan}>
        Save Weekly Plan
      </button>

    </div>
  );
};

export default CreateWeeklyPlan;