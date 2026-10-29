import React from 'react'
import './Navbar.css'
import eccomerce_logo from '../../assets/eccommece_logo.png'
import profile_logo from '../../assets/profile_logo.png'
const Navbar = () => {
  return (
    <>
    <div className='navbar'>
        <div className='admin-navbar'>
      <img src={eccomerce_logo} alt=""/>
      <div className='admin-info'>
        <h1>Admin</h1>
      <h2>Panel</h2>
      </div>
      </div>
      <div className="profile">
        <img src={profile_logo} alt="" />
      </div>
    </div>
 </>
  )
}

export default Navbar
