import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import addproduct from '../../assets/addproduct.png'
import listofproduct from '../../assets/listofproduct.png'


const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to={'/AddFood'} style={{textDecoration:"none"}}>
         <div className='sidebar-item'>
            <img src={addproduct} alt="" />
            <p>Add Product</p>
         </div>
      </Link>
       <Link to={'/getproduct'} style={{textDecoration:"none"}}>
         <div className='sidebar-item'>
            <img src={listofproduct} alt="" />
             <p>Product List</p>
         </div>
      </Link>
      <Link to={'/orders'} style={{textDecoration:"none"}}>
       <div className="sidebar-item">
        <p>Orders</p>
       </div>
      </Link>
      <Link to={'/weeklyplan'} state={{textDecoration:"none"}}>
      <div className="sidebar-item">
        <p>Weekly Plans</p>
       </div>
      </Link>
    </div>
  )
}

export default Sidebar
