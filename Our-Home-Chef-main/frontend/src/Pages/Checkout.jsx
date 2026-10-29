import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Pages/CSS/Checkout.css";

const Checkout = () => {

  const [cartItems, setCartItems] = useState([]);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
  });


  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const userId = localStorage.getItem("userId");


  // FETCH CART
  const fetchCart = async () => {

    try {

      const res = await axios.post(
        "http://localhost:4000/api/user/get-cart",
        { userId }
      );


      if (res.data.success) {

        setCartItems(res.data.cartData);

      }

    } catch (err) {

      console.log(err);

    }

  };


  useEffect(() => {

    fetchCart();

  }, []);



  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.newPrice * item.quantity,
    0
  );



  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };



  const isFormValid =
    form.name &&
    form.mobile &&
    form.email &&
    form.address &&
    form.city &&
    form.pincode;



  const clearCart = async () => {

    try {

      await axios.post(
        "http://localhost:4000/api/user/clear-cart",
        {
          userId
        }
      );


      setCartItems([]);


    } catch(err) {

      console.log(err);

    }

  };



  const handlePayment = async () => {


    try {


      setLoading(true);

      setStatus("");



      const res = await axios.post(

        "http://localhost:4000/api/payment/create-order",

        {
          amount: totalPrice,
          userId
        }

      );



      const order = res.data?.order;



      if(!order){

        setStatus("failed");
        setLoading(false);
        return;

      }




      const options = {


        key: import.meta.env.VITE_RAZORPAY_KEY_ID,


        amount: order.amount,


        currency:"INR",


        name:"Food App",


        description:"Order Payment",


        order_id:order.id,



        handler: async function(response){


          try {



            const products = cartItems.map((item)=>(

              {

                productid:item._id,

                name:item.name,

                price:item.newPrice,

                quantity:item.quantity

              }

            ));



            const verifyRes = await axios.post(

              "http://localhost:4000/api/payment/verify",

              {


                razorpay_order_id:
                response.razorpay_order_id,


                razorpay_payment_id:
                response.razorpay_payment_id,


                razorpay_signature:
                response.razorpay_signature,



                userId,

                fullname:form.name,

                email:form.email,

                phone:form.mobile,

                address:form.address,

                city:form.city,

                pincode:form.pincode,


                products,


                totalAmount:totalPrice


              }

            );




            if(verifyRes.data.success){


              setStatus("success");


              await clearCart();


            }

            else{


              setStatus("failed");


            }



            setLoading(false);



          }

          catch(err){


            console.log(err);

            setStatus("failed");

            setLoading(false);


          }


        }

      };



      const razor = new window.Razorpay(options);



      razor.on(
        "payment.failed",
        ()=>{
          setStatus("failed");
          setLoading(false);
        }
      );



      razor.open();



    }

    catch(err){


      console.log(err);

      setStatus("failed");

      setLoading(false);


    }


  };



  return (

    <div className="checkout">


      <h1>Checkout</h1>



      <div className="checkout-form">


        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />



        <input
          name="mobile"
          placeholder="Mobile"
          onChange={handleChange}
        />



        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />



        <textarea
          name="address"
          placeholder="Address"
          onChange={handleChange}
        />



        <input
          name="city"
          placeholder="City"
          onChange={handleChange}
        />



        <input
          name="pincode"
          placeholder="Pincode"
          onChange={handleChange}
        />


      </div>




      {status==="success" &&
        <p>✅ Order Success</p>
      }


      {status==="failed" &&
        <p>❌ Payment Failed</p>
      }




      <h2>
        Total: ₹{totalPrice}
      </h2>



      <button

        disabled={!isFormValid || loading}

        onClick={handlePayment}

      >

        {
          loading
          ? "Processing..."
          : "Pay Now"
        }


      </button>



    </div>

  );

};


export default Checkout;