import foodModel from "../models/foodmodel.js";

import fs from 'fs'
const addFood = async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                success:false,
                message:"Image is required"
            });
        }

        const food = new foodModel({

            name: req.body.name,
            newPrice: req.body.newPrice,
            category: req.body.category,
            image: req.file.filename,
            isTodaysMeal: req.body.isTodaysMeal === "true"

        });

        await food.save();

        res.json({
            success:true,
            message:"Food Added"
        });

    } catch(error){

        console.log(error);

        res.status(400).json({
            success:false,
            message:error.message
        });

    }

}

//get todays meal
const getTodaysMeal = async (req, res) => {
  try {
    const foods = await foodModel.find({ isTodaysMeal: true });

    res.status(200).json({
      success: true,
      data: foods,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Foods
const getAllFoods = async (req, res) => {
  try {
    const foods = await foodModel.find();

    res.status(200).json({
      success: true,
      data: foods,
    });
  } catch (error) {
    
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {addFood,getTodaysMeal,getAllFoods}