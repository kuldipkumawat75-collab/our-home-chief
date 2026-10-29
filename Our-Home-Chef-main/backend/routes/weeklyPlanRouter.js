import express from "express";
console.log("WeeklyPlan Router Loaded");
import {
  createWeeklyPlan,
  getWeeklyPlan,
  getAllWeeklyPlans,
  updateWeeklyPlan,
  deleteWeeklyPlan,
} from "../controllers/weeklyPlanController.js";

const weeklyPlanRouter = express.Router();

weeklyPlanRouter.post("/create", createWeeklyPlan);

weeklyPlanRouter.get("/hello", (req, res) => {
  res.json({
    success: true,
    message: "Hello Weekly Plan",
  });
});

weeklyPlanRouter.get("/all", getAllWeeklyPlans);

weeklyPlanRouter.get("/:userId", getWeeklyPlan);

weeklyPlanRouter.put("/update/:id", updateWeeklyPlan);

weeklyPlanRouter.delete("/delete/:id", deleteWeeklyPlan);

export default weeklyPlanRouter;