import { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'

import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home'
import Menu from './Pages/Menu';
import Signup from './Components/Login/signup';
import Login from './Components/Login/login';
import Profile from './Pages/Profile';
import Footer from './Components/Footer/Footer';
import About from './Components/Aboutus/About';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import ForgotPassword from './Components/Login/forgotPassword';
import NewPassword from './Components/Login/newPassword';
import CreateWeeklyPlan from './Pages/CreateWeeklyPlan';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
      <Navbar />
      <Routes>
      
        <Route path='/' element={<Home />}/>
        <Route path='/menu' element={<Menu />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/weeklyPlan" element={<CreateWeeklyPlan />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/new-password' element={<NewPassword />} />
        <Route path='/profile' element={<Profile />}/>
        <Route path='/cart' element={<Cart />}/>
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
       <Footer />
   
    </>
  )
}

export default App
