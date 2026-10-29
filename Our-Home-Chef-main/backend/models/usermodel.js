import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    default: null,
  },

  facebookId: {
    type: String,
    default: null,
  },

  cartData: {
  type: Array,
  default: [],
},

  otp: {
    type: String,
    default: null,
  },

  otpExpiry: {
    type: Date,
    default: null,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;