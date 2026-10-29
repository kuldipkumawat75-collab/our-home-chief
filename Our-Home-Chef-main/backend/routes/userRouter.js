import express from "express";
import {signup, login, forgotPassword, verifyOtp, resetPassword, addToCart, getCart, increaseQuantity, decreaseQuantity, removeItem,} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);

userRouter.post("/forget-password", forgotPassword);
userRouter.post("/verify-otp", verifyOtp);
userRouter.post("/reset-password", resetPassword);

// Cart APIs
userRouter.post("/add-to-cart", addToCart);
userRouter.post("/get-cart", getCart);
userRouter.post("/increase", increaseQuantity);
userRouter.post("/decrease", decreaseQuantity);
userRouter.post("/remove", removeItem);

export default userRouter;