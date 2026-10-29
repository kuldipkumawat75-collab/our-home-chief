import Razorpay from "razorpay";
import crypto from "crypto";
import Payment from "../models/paymentmodel.js";
import Order from "../models/ordermodel.js";


const razorpay = new Razorpay({

  key_id: process.env.RAZORPAY_KEY_ID,

  key_secret: process.env.RAZORPAY_KEY_SECRET,

});


// Create Razorpay Order
const createOrder = async (req, res) => {

  try {

    const { amount, userId } = req.body;


    const options = {

      amount: amount * 100,

      currency: "INR",

      receipt: "receipt_" + Date.now(),

    };


    const order = await razorpay.orders.create(options);


    await Payment.create({

      userId,

      razorpayOrderId: order.id,

      amount,

      status: "Pending",

    });


    res.json({

      success: true,

      order,

    });


  } catch (error) {

    res.status(500).json({

      success:false,

      message:error.message,

    });

  }

};



// Verify Payment
const verifyPayment = async (req, res) => {
  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;


    const body =
      razorpay_order_id + "|" + razorpay_payment_id;


    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");


    if (expectedSignature !== razorpay_signature) {

      return res.json({
        success:false,
        message:"Payment Verification Failed"
      });

    }



    // Payment update
    const payment = await Payment.findOneAndUpdate(

      {
        razorpayOrderId: razorpay_order_id
      },

      {
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status:"Success"
      },

      {
        new:true
      }

    );



    // 👇 Yaha Order create karna hai

    await Order.create({

      userId: payment.userId,

      fullname: req.body.fullname,

      email: req.body.email,

      phone: req.body.phone,

      address: req.body.address,

      city: req.body.city,

      pincode: req.body.pincode,


      products: req.body.products,


      totalAmount: payment.amount,


      paymentId: razorpay_payment_id,


      orderStatus:"Order Placed"

    });



    res.json({

      success:true,

      message:"Payment Successful and Order Created"

    });


  }
  catch(error){

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

}

export {
  createOrder,
  verifyPayment
};