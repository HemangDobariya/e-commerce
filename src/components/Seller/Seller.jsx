import React, { useState } from 'react'
import { Outlet, useNavigate } from "react-router-dom";

const Seller = () => {
    const [isshow, setIsShow] = useState(false)
    // const [isAdd,setIsAdd]=useState(true)
    const navigate = useNavigate()
    const logoutHandler = (e) => {
        e.preventDefault()
        navigate("/login")
        localStorage.removeItem("userData");
    }
    
    return (
        <div className=' w-screen bg-[#111]'>
{/* p-10 px-20 bg-[#1c1c1c] text-white font-semibold fixed w-full z-50 top-0 */}
            <div className='py-10 px-20 bg-[#1c1c1c] text-white text-semibold fixed w-full z-50 top-0'>
                <div className='flex gap-20 relative'>
                    {/* <a href='' className='text-semibold text-xl' onClick={(e) => { setIsShow(false), e.preventDefault() }}>Add</a> */}
                    <a href='' className='text-semibold text-xl' onClick={(e) => { navigate("/add-product"), e.preventDefault() }}>Add</a>
                    {/* <a href='' className='text-semibold text-xl' onClick={(e) => { setIsShow(true), e.preventDefault() }}>show</a> */}
                    <a href='' className='text-semibold text-xl' onClick={(e) => { navigate("/show"), e.preventDefault() }}>Show</a>
                    {/* <NavLink to={"/addProduct"} className='text-semibold text-xl'>Add</NavLink> */}
                    {/* <a href='' className='text-semibold text-xl' onClick={(e) => { setIsShow(true), e.preventDefault() }}>show</a> */}
                    {/* <NavLink to={"/show"} className='text-semibold text-xl'>Show</NavLink> */}
                    <button className='text-semibold text-xl absolute right-10 bg-red-500 px-5 py-2 rounded' onClick={(e) => logoutHandler(e)}>Logout</button>
                </div>

            </div>
            <div>
                {/* {!isshow ? (<AddProduct />) : (<Show />)} */}


            </div>
        </div>
    )
}

export default Seller