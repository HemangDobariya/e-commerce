import React, { useEffect,useState } from 'react'
import CheckForm from './CheckOut/CheckForm'
import CheckCart from './CheckOut/CheckCart'
const CheckOut = () => {
const [cartItems,setCartItems]=useState()
    useEffect(() => {
  const userdata = localStorage.getItem("cart")
  setCartItems(JSON.parse(userdata))
    }, [])
    
    return (
        <div className='w-screen h-screen px-30 py-10 bg-[#111] text-white flex gap-4 pt-40'>
            <CheckForm />
            <div className=''>
             <CheckCart/>

            </div>
        </div>
    )
}

export default CheckOut




































{/* <div className='bg-[rgb(28,28,28)] w-[50%] h-[80%] py-10'>  
                <div className='px-10 py-5  flex ml-8 gap-5'>
                    <div className='flex flex-col w-[50%]'>
                        <lable className="text-white text-sm ml-2">First Name</lable>
                        <input type='text' placeholder='First Name' className='border-1 mb-5 rounded text-sm py-2 px-2 w-[100%] border-gray-400' />
                    </div>
                    <div className='flex flex-col w-[50%]'>
                        <lable className="text-white text-sm ml-2">Last Name</lable>
                        <input type='text' placeholder='Last Name' className='border-1 mb-5 rounded text-sm py-2 px-2 w-[100%] border-gray-400' />
                    </div>
                </div>
                <div className='px-10   flex ml-8 gap-5'>
                    <div className='flex flex-col w-[50%] '>
                        <lable className="text-white text-sm ml-2">Phone Number</lable>
                        <input type='text' placeholder='Phone Number' className='border-1 mb-5 rounded text-sm py-2 px-2 w-[100%] border-gray-400' />
                    </div>
                    <div className='flex flex-col w-[50%]'>
                        <lable className="text-white text-sm ml-2">Email</lable>
                        <input type='text' placeholder='Email Address' className='border-1 mb-5 rounded text-sm py-2 px-2 w-[100%] border-gray-400' />
                    </div>
                </div>
                <div className='px-10 ml-8 mt-5'>
                    <select className='w-[100%]  text-white px-5 py-3 border-1 border-gray-400' >
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>


            </div>  */}