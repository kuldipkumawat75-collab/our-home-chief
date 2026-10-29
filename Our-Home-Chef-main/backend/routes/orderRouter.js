import express from "express";
import { getAllOrders,getUserOrders,updateOrderStatus } from "../controllers/orderController.js";


const orderRouter = express.Router();
// Admin all orders
orderRouter.get("/allorders",getAllOrders);

// User orders
orderRouter.get("/user/:userId",getUserOrders);

// Admin update status
orderRouter.put("/status/:id", updateOrderStatus);

export default orderRouter;