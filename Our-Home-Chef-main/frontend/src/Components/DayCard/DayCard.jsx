import React from "react";
import "./DayCard.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DayCard = ({ day, index, foods, handleChange }) => {

  const meals = ["breakfast", "lunch", "dinner", "snacks"];

  return (
    <div className="day-card">

      <h3>{day.day}</h3>

      {meals.map((meal) => (
        <div className="meal-row" key={meal}>

          <label>
            {meal.charAt(0).toUpperCase() + meal.slice(1)}
          </label>

          {/* Food Dropdown */}
          <select
            value={day[meal].food}
            onChange={(e) =>
              handleChange(index, meal, "food", e.target.value)
            }
          >
            <option value="">Select Food</option>

            {foods.map((food) => (
              <option key={food._id} value={food._id}>
                {food.name}
              </option>
            ))}
          </select>

          {/* Time Picker */}
          <DatePicker
            selected={
              day[meal].time
                ? new Date(`1970-01-01T${day[meal].time}:00`)
                : null
            }
            onChange={(date) => {
              if (!date) return;

              const hours = String(date.getHours()).padStart(2, "0");
              const minutes = String(date.getMinutes()).padStart(2, "0");

              handleChange(
                index,
                meal,
                "time",
                `${hours}:${minutes}`
              );
            }}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="hh:mm aa"
            placeholderText="Select Time"
          />

        </div>
      ))}

    </div>
  );
};

export default DayCard;