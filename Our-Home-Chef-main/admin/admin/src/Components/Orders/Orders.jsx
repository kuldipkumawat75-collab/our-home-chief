import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Orders.css'

const AdminOrders = () => {

  const [orders,setOrders] = useState([])
  const [search,setSearch] = useState('')

  useEffect(()=>{

    fetchOrders()

  },[])

  const fetchOrders = async()=>{

    try{

      const response = await axios.get(
        "http://localhost:4000/api/order/allorders"
      )

      if(response.data.success){

        setOrders(response.data.orders)

      }

    }
    catch(error){

      console.log(error)

    }

  }

  const filteredOrders = orders.filter((item)=>

    item.fullname.toLowerCase().includes(search.toLowerCase()) ||

    item.phone.includes(search)

  )

  return (

    <div className='admin-orders'>

      <h1>All Orders</h1>

      <input
        type='text'
        placeholder='Search by customer name or phone'
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        className='search-box'
      />

      <div className='orders-container'>

        {
          filteredOrders.map((order,index)=>(

            <div className='order-card' key={index}>

              <h3>{order.fullname}</h3>

              <p><strong>Phone:</strong> {order.phone}</p>

              <p><strong>Email:</strong> {order.email}</p>

              <p><strong>Address:</strong> {order.address}</p>

              <p><strong>City:</strong> {order.city}</p>

              <p><strong>Pincode:</strong> {order.pincode}</p>

              <p>
                <strong>Total:</strong> ₹{order.totalAmount}
              </p>

              <p>
                <strong>Status:</strong> {order.orderStatus}
              </p>

              <h4>Products</h4>

              {
                order.products.map((product,i)=>(

                  <div key={i}>

                    <p>
                      Product ID: {product.productid}
                    </p>

                    <p>
                      Quantity: {product.quantity}
                    </p>

                    <hr />

                  </div>

                ))
              }

            </div>

          ))
        }

      </div>

    </div>

  )
}

export default AdminOrders