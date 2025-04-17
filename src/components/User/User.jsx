import React from 'react'
import { NavLink } from 'react-router-dom';
import { Outlet, useNavigate } from "react-router-dom";
const User = () => {
  const navigate = useNavigate()
  return (
    <div className=' w-screen  '>
      <div className='p-10 px-20 bg-[#1c1c1c] text-white text-semibold fixed w-full z-50 top-0'>
        <div className='flex gap-20 realtive'>
          <a href='' className='text-semibold text-xl' onClick={(e) => { navigate("/show-product"), e.preventDefault() }}>Product</a>
          <a href='' className='text-semibold text-xl' onClick={(e) => { navigate("/cart"), e.preventDefault() }}>Cart</a>
          <button className='text-semibold text-xl bg-red-500 rounded px-5 py-3 absolute right-10' onClick={(e) => { e.preventDefault(), navigate("/login"), localStorage.removeItem("userData"), localStorage.removeItem("cart") }}>Logout</button>
        </div>
        </div>
      <div>
   </div>
 </div>
  )
}

export default User