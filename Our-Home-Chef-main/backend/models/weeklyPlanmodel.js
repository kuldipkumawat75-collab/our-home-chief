import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "food",
        default: null,
    },
    time: {
        type: String,
        default:"",
    },
});

const daySchema = new mongoose.Schema({
    day: {
        type: String,
        required: true,
    },

    breakfast: mealSchema,
    lunch: mealSchema,
    dinner: mealSchema,
    snacks: mealSchema,
});

const weeklyPlanSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },

        weekStart: {
            type: Date,
            required: true,
        },

        days: [daySchema],
    },
    {
        timestamps: true,
    }
);

const WeeklyPlan = mongoose.model(
    "weeklyplan",
    weeklyPlanSchema
);

export default WeeklyPlan;