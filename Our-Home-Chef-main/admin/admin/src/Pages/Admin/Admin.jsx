import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
 import { Route,Routes } from 'react-router-dom'
import AddFood from '../../Components/AddFood/AddFood'
import Listofproduct from '../../Components/Listofproduct/Listofproduct'
import Orders from '../../Components/Orders/Orders'
import WeeklyPlan from '../../Components/ListOfWeeklyPlan/WeeklyPlan'


const Admin = () => {
  return (
    <div className='admin'>
         <Sidebar />
         <Routes>
  <Route path="/" element={<AddFood />} />
  <Route path="/AddFood" element={<AddFood />} />
  <Route path="/getproduct" element={<Listofproduct />} />
  <Route path="/orders" element={<Orders />} />
  <Route path='/weeklyplan' element={<WeeklyPlan />}/>
</Routes>
    </div>
  )
}

export default Admin
