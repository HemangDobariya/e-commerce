import React, { useState, useEffect } from 'react'
// import Cart from '../Cart'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, removeProduct, totalQuentitys, setCart } from '../../../Features/CartSlice'
import { useNavigate } from 'react-router-dom'
const CheckCart = () => {
    const [cartItems, setCartItems] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [quentity, setQuentity] = useState(1)
    const [totalPrice, setTotalPrice] = useState()
    const [price, setPrice] = useState()
    //   const [cartItems, setCartItems] = useState()
    const [couponCode, setCouponCode] = useState("")
    const [disCountPrice, setDisCountPrice] = useState(0)
    const [disCount, setDiscount] = useState(0)
    const [total, setTotal] = useState(0)
    const [couponError, setCouponError] = useState()
    const [promoData, setPromoData] = useState()

    const { cart, totalQuentity, } = useSelector((state) => state.Carts)
    //   const dispatch = useDispatch()
    console.log("cart", cart)
    //   const navigate = useNavigate()

    // hanldePrice
    const handlePrice = () => {
        let totalprices = 0
        cart.map((item) => {
            totalprices += item.price * item.prod_quentity
            console.log(item.prod_quentity)
        })
        setTotalPrice(totalprices)
        setTotal(totalprices)

        setDiscount(0)
        setCouponCode("")
    }


    const handleDiscounts = async () => {
const res = await api(`/promo/getPromo?promoCode=${couponCode}`)
        // const res = await fetch(`http://localhost:3000/promo/getPromo?promoCode=${couponCode}`)

        try {
            let result = await res.json()
            // console.log(result)
            // setPromoData(result)
            let discountedPrice = 0


            // }
            // }
            // if(result.data.promo_type=="percentage"){
            //   discountedPrice = parseInt(totalPrice*result.data.promo_value / 100)
            // }else{
            //   discountedPrice = result.data.promo_value
            // }
            const promo = result.data;
            // console.log(promo)
            if (totalPrice >= promo.promo_min_val) {
                if (promo.promo_type === "percentage") {
                    discountedPrice = parseInt(totalPrice * promo.promo_value / 100);
                    console.log(discountedPrice)
                } else {
                    discountedPrice = promo.promo_value;
                    // setDiscount(promo.promo_value);
                    // setTotal(discountedPrice);
                    // console.log(discountedPrice)
                }
            }

            setDiscount(discountedPrice);
            setTotal(totalPrice - discountedPrice);
            console.log("Discount", discountedPrice);

        } catch (error) {
            console.log("error", error.message)
            setCouponError("invalid coupon")
        }
    }
    const handleApply = (e) => {
        e.preventDefault()
        handleDiscounts()
    }


    console.log("cartItems", cartItems)

    const updateQuantity = () => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }



    useEffect(() => {
        dispatch(setCart());
    }, []);
    useEffect(() => {

        dispatch(totalQuentitys())
        handlePrice()
        updateQuantity()
    }, [cart, totalPrice])

    useEffect(() => {
        const userdata = localStorage.getItem("cart")
        setCartItems(JSON.parse(userdata))
    }, [])
    console.log(cartItems)

    return (

        <div className='bg-[rgb(28,28,28)] w-200 h-[90%] py-10 relative'>
            <div className='w-[100%] h-full py-3 relative'>
                <div className='text-white  '>
                    {cartItems ? (cartItems.map((val) => <div className='bg-[#1c1c1c] h-20  w-[90%] mb-5 px-10 flex justify-between items-center'>
                        <img className=" h-40 w-40 pt-5 pb-5 px-5  rounded-t-lg" src={`http://localhost:3000/images/${val.image}`} alt="product image" />
                        <h5 className=' text-xl'>{val.title}</h5>
                        <div className=''>
                            <button onClick={(e) => dispatch(decrement(val.product_id))} className='text-sm  py-1 px-2 font-semibold border-1  w-10  mr-1 rounded border-gray-400 border-xl-rounded bg-white text-gray-500 pointer'>-</button>
                            <input value={val.prod_quentity} className='bg-white text-sm border-1 border-gray-500 rounded w-10 py-1 pl-4 text-gray-600' type="text" name="" id="" placeholder='999' />
                            <button onClick={(e) => dispatch(increment(val.product_id))} className='text-sm font-semibold py-1 px-2 border-1  w-10  ml-1 rounded border-gray-400 border-xl-rounded bg-white  text-gray-500 pointer'>+</button>
                        </div>
                        <h3 className='text-xl'>{val.price}$</h3>
                        <button onClick={(e) => dispatch(removeProduct(val.product_id))} className="text-red-400 text-xl px-3 py-1">Clear</button>
                    </div>)) : (<h2 className='text-white text-2xl'> Cart is empty</h2>)
                    }
                </div>

                <div className='absolute bottom-1 left-100'>
                    <hr />
                    <div className='mt-3 '>
                        <div className='flex justify-between mb-2  '>
                            <lable className="font-bold text-l" >Coupon</lable>
                            <div className=''>
                                <input type="text" onChange={(e) => setCouponCode(e.target.value)} value={couponCode} placeholder="coupon" className='w-40 bg-gray-200 text-gray-600 border-1 border-gray-600 px-3 py-1 rounded' />
                                <button className='py-1 px-4 bg-blue-400 text-white' onClick={(e) => handleApply(e)}>Apply</button>
                                {/* {couponError && couponCode ? (<p className='text-red-400 text-sm'>{couponError}</p>) : (<></>)} */}
                            </div>
                        </div>
                        <h5 className='font-bold  text-l mb-2 mt-2'>TotalQuentity: <span className='ml-45'>{totalQuentity}</span> </h5>
                        <h5 className='font-bold text-l mb-2'>SubTotal : <span className='ml-52'>{totalPrice}</span> </h5>
                        <h5 className='font-bold text-l mb-2'>Discount : <span className='ml-54'>{disCount}</span> </h5>
                        <h5 className='font-bold text-l '>Total : <span className='ml-60'>{total} </span> </h5>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CheckCart

