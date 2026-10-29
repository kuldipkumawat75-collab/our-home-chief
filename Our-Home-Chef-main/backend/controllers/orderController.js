import Order from "../models/ordermodel.js";


// Get all orders (Admin)
const getAllOrders = async (req, res) => {

    try {

        const orders = await Order.find({})
            .sort({ createdAt: -1 });


        res.json({

            success: true,

            orders

        });


    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



// Get order by userId (User orders)
const getUserOrders = async (req, res) => {

    try {

        const { userId } = req.params;


        const orders = await Order.find({
            userId
        })
        .sort({ createdAt: -1 });



        res.json({

            success:true,

            orders

        });


    } catch(error) {

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};



// Update order status (Admin)
const updateOrderStatus = async(req,res)=>{

    try{

        const {id} = req.params;

        const {orderStatus} = req.body;


        const order = await Order.findByIdAndUpdate(

            id,

            {
                orderStatus
            },

            {
                new:true
            }

        );


        res.json({

            success:true,

            message:"Order status updated",

            order

        });


    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};



export {
    getAllOrders,
    getUserOrders,
    updateOrderStatus
};