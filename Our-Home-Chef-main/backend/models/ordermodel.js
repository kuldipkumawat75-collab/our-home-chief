import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({

    userId:{
        type:String,
        required:true
    },

    fullname:{
        type:String,
        required:true
    },

    email:String,

    phone:String,

    address:String,

    city:String,

    pincode:String,


    products:[
        {
            productid:String,
            quantity:Number,
            size:String
        }
    ],


    totalAmount:Number,


    paymentId:String,


    orderStatus:{
        type:String,
        default:"Order Placed"
    }


},{
    timestamps:true
})


export default mongoose.model("Order",orderSchema);