import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRouter.js";
import userRouter from "./routes/userRouter.js";
import weeklyPlanRouter from "./routes/weeklyPlanRouter.js";
import paymentRouter from "./routes/paymentRouter.js";
import orderRouter from "./routes/orderRouter.js";


const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

connectDB();

app.use("/image", express.static("upload"));
//api endpoint 

app.use("/api/food",foodRouter)
app.use("/api/user",userRouter)
app.use("/api/weekly-plan", weeklyPlanRouter);
app.use("/api/payment",paymentRouter)
app.use("/api/order",orderRouter)



app.get("/", (req, res) => {
  res.send("API WORKING");
});



app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});