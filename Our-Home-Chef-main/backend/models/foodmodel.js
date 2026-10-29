import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    newPrice: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["Breakfast", "Lunch", "Dinner"],
    },

    image: {
      type: String,
      required: true,
    },

    isTodaysMeal: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const foodModel =
  mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;