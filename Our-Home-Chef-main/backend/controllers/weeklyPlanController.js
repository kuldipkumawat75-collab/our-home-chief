import WeeklyPlan from "../models/weeklyPlanmodel.js";

// Create Plan
const createWeeklyPlan = async (req, res) => {
    try {

        const { userId, weekStart, days } = req.body;

        const existingPlan = await WeeklyPlan.findOne({
            userId,
            weekStart,
        });

        if (existingPlan) {
            return res.json({
                success: false,
                message: "Weekly Plan already exists",
            });
        }

        const plan = new WeeklyPlan({
            userId,
            weekStart,
            days,
        });

        await plan.save();

        res.json({
            success: true,
            message: "Weekly Plan Created",
            data: plan,
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: error.message,
        });

    }
};

const getAllWeeklyPlans = async (req, res) => {
    try {
         console.log("===== GET ALL WEEKLY PLANS =====");

        const plans = await WeeklyPlan.find()
            .populate("userId", "name email")
            .populate("days.breakfast.food", "name")
            .populate("days.lunch.food", "name")
            .populate("days.dinner.food", "name")
            .populate("days.snacks.food", "name");

        res.json({
            success: true,
            data: plans,
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message,
        });
    }
};

const getWeeklyPlan = async (req, res) => {

    try {
  console.log("WeeklyPlan Router Loaded");
        const { userId } = req.params;

        const plan = await WeeklyPlan.findOne({ userId })
            .populate("days.breakfast.food")
            .populate("days.lunch.food")
            .populate("days.dinner.food")
            .populate("days.snacks.food");

        if (!plan) {
            return res.json({
                success: false,
                message: "Plan Not Found",
            });
        }

        res.json({
            success: true,
            data: plan,
        });

    } catch (error) {

        res.json({
            success: false,
            message: error.message,
        });

    }

};

const updateWeeklyPlan = async (req, res) => {

    try {

        const { id } = req.params;

        const updatedPlan =
            await WeeklyPlan.findByIdAndUpdate(
                id,
                req.body,
                { new: true }
            );

        res.json({
            success: true,
            message: "Weekly Plan Updated",
            data: updatedPlan,
        });

    } catch (error) {

        res.json({
            success: false,
            message: error.message,
        });

    }

};

const deleteWeeklyPlan = async (req, res) => {

    try {

        const { id } = req.params;

        await WeeklyPlan.findByIdAndDelete(id);

        res.json({
            success: true,
            message: "Weekly Plan Deleted",
        });

    } catch (error) {

        res.json({
            success: false,
            message: error.message,
        });

    }

};

export {
    createWeeklyPlan,
    getWeeklyPlan,
    getAllWeeklyPlans,
    updateWeeklyPlan,
    deleteWeeklyPlan,
};