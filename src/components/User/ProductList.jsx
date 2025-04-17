import React, { useState } from 'react'
// import Cart from "./Cart"
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from "../../Features/CartSlice"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const ProductList = ({ data }) => {
    // const [cartdata, setCartData] = useState()
    const [exist, setExits] = useState(false)
    const dispatch = useDispatch()
    const { cart } = useSelector((state) => state.Carts)
    const navigate = useNavigate()
    // console.log(cartdata)
    console.log("data",data)
    const handleCartClick = (e) => {
        e.preventDefault(),
            // cart.map((val) => {
            //     if (val.product_id === data.product_id) {
            //         setExits(true)
            //     }
            //     if (exist == true) {
            //         toast.error("already added")
            //     } else if (exist == false) {
            //         dispatch(addToCart(data))
            //     }
            // })
        // setCartData({data})
        // localStorage.setItem('cart',JSON.stringify([]))
        // localStorage.removeItem("cart")
        console.log(data)
        dispatch(addToCart({...data,prod_quentity:1}))
navigate("/cart")
    }
console.log("cart",cart)

    return (

        <div className="w-full  h-120  max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm ">
            <a href="#">
                <img className="p-7 pb-5 h-90 w-full rounded-t-lg" src={`http://localhost:3000/images/${data.image}`} alt="product image" />
            </a>
            <div className="px-7 pb-7">
                <a href="#">
                    <h5 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white ml-1">{data.title}</h5>
                </a>
                <h5 className="text-sm font-semibold tracking-tight text-gray-600 dark:text-white ml-1">{data.descripton}</h5>
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-yellow-500 ml-1 dark:text-white">{data.price}$</span>
                    <NavLink to={"/cart"}  onClick={(e) => handleCartClick(e)} className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center " > Add to cart</NavLink>
                </div>
            </div>

        </div>

    )
}
// to={"/cart"} 
export default ProductList