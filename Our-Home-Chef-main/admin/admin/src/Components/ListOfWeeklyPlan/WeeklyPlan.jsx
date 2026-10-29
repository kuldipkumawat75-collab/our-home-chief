import React, { useEffect, useState } from "react";
import axios from "axios";
import "./WeeklyPlan.css";

const WeeklyPlan = () => {
  const url = "http://localhost:4000";

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeeklyPlans();
  }, []);

  const fetchWeeklyPlans = async () => {
    try {
      const res = await axios.get(`${url}/api/weekly-plan/all`);

      console.log(res.data);

      if (res.data.success) {
        setPlans(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading Weekly Plans...</h2>;
  }

  return (
    <div className="weekly-plan-list">

      <h2>Weekly Plans</h2>

      {plans.length === 0 ? (
        <h3>No Weekly Plans Found</h3>
      ) : (
        plans.map((plan) => (
          <div className="plan-card" key={plan._id}>

            <h3>{plan.userId?.name}</h3>

            <p>
              <strong>Email:</strong> {plan.userId?.email}
            </p>

            <p>
              <strong>Week Start:</strong>{" "}
              {new Date(plan.weekStart).toLocaleDateString()}
            </p>

            <hr />

            {plan.days.map((day, index) => (
              <div className="day-card" key={index}>

                <h4>{day.day}</h4>

                <table>
                  <thead>
                    <tr>
                      <th>Meal</th>
                      <th>Food</th>
                      <th>Time</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>Breakfast</td>
                      <td>{day.breakfast?.food?.name || "-"}</td>
                      <td>{day.breakfast?.time || "-"}</td>
                    </tr>

                    <tr>
                      <td>Lunch</td>
                      <td>{day.lunch?.food?.name || "-"}</td>
                      <td>{day.lunch?.time || "-"}</td>
                    </tr>

                    <tr>
                      <td>Dinner</td>
                      <td>{day.dinner?.food?.name || "-"}</td>
                      <td>{day.dinner?.time || "-"}</td>
                    </tr>

                    <tr>
                      <td>Snacks</td>
                      <td>{day.snacks?.food?.name || "-"}</td>
                      <td>{day.snacks?.time || "-"}</td>
                    </tr>
                  </tbody>
                </table>

              </div>
            ))}

          </div>
        ))
      )}

    </div>
  );
};

export default WeeklyPlan;