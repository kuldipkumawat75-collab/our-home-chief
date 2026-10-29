import User from "../models/userModel.js";
import foodModel from "../models/foodModel.js";
import transporter from "../config/mail.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import axios from "axios";


const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // Check existing user
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Response
    return res.status(201).json({
      success: true,
      message: "Signup Successful",
      token,
      userId: user._id,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



  const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Invalid Password",
        });
      }
  
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
  
      res.status(200).json({
        success: true,
        message: "Login Successful",
        token,
        userId: user._id,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };




const forgotPassword = async (req, res) => {
  try {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    await user.save();

    // Send Email
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset OTP",
      html: `
        <h2>Password Reset</h2>
        <p>Your OTP is:</p>

        <h1>${otp}</h1>

        <p>This OTP is valid for 5 minutes.</p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully to your email",
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
  };

const verifyOtp = async (req, res) => {

  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  if (user.otp !== otp) {
    return res.status(400).json({
      success: false,
      message: "Invalid OTP",
    });
  }

  if (new Date() > user.otpExpiry) {
    return res.status(400).json({
      success: false,
      message: "OTP Expired",
    });
  }

  return res.status(200).json({
    success: true,
    message: "OTP Verified",
  });
};


const resetPassword = async (req, res) => {

  const { email, newPassword } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  user.password = await bcrypt.hash(newPassword, 10);

  user.otp = null;
  user.otpExpiry = null;

  await user.save();

  res.json({
    success: true,
    message: "Password Updated Successfully",
  });
};

const facebookLogin = async (req, res) => {
  try {
    const { accessToken } = req.body;

    const response = await axios.get(
      `https://graph.facebook.com/me?fields=id,name,email&access_token=${accessToken}`
    );

    const { name, email } = response.data;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        password: "",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      message: "Facebook Login Successful",
      token,
      userId: user._id,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//add to cart 
const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    if (!userId || !itemId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Item ID are required",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const food = await foodModel.findById(itemId);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    let cart = user.cartData || [];

    const existingItem = cart.find(
      (item) => item._id.toString() === itemId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        _id: food._id,
        name: food.name,
        image: food.image,
        newPrice: food.newPrice,
        quantity: 1,
      });
    }

    user.cartData = cart;

    await user.save();

    return res.json({
      success: true,
      message: "Item added to cart",
      cartData: cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//get cart
const getCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      cartData: user.cartData || [],
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Increse quantity
const increaseQuantity = async (req, res) => {
  try {

    const { userId, itemId } = req.body;

    const user = await User.findById(userId);

    const item = user.cartData.find(
      (item) => item._id.toString() === itemId
    );

    if (!item) {
      return res.json({
        success: false,
        message: "Item not found",
      });
    }

    item.quantity++;

    await user.save();

    res.json({
      success: true,
      cartData: user.cartData,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const decreaseQuantity = async (req, res) => {
  try {

    const { userId, itemId } = req.body;

    const user = await User.findById(userId);

    const item = user.cartData.find(
      (item) => item._id.toString() === itemId
    );

    if (!item) {
      return res.json({
        success: false,
        message: "Item not found",
      });
    }

    if (item.quantity > 1) {
      item.quantity--;
    }

    await user.save();

    res.json({
      success: true,
      cartData: user.cartData,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const removeItem = async (req, res) => {
  try {

    const { userId, itemId } = req.body;

    const user = await User.findById(userId);

    user.cartData = user.cartData.filter(
      (item) => item._id.toString() !== itemId
    );

    await user.save();

    res.json({
      success: true,
      cartData: user.cartData,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export {signup, login, forgotPassword, verifyOtp, resetPassword, addToCart,getCart,increaseQuantity,decreaseQuantity, removeItem};