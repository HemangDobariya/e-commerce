import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, totalQuentitys, setCart, removeProduct } from "../../Features/CartSlice"
import { useNavigate } from 'react-router-dom'

// import{TotalCart}from "../../features/CartSlice"



const Cart = () => {
  const [quentity, setQuentity] = useState(1)
  const [totalPrice, setTotalPrice] = useState()
  const [price, setPrice] = useState()
  const [cartItems, setCartItems] = useState()
  const [couponCode, setCouponCode] = useState("")
  const [disCountPrice, setDisCountPrice] = useState(0)
  const [disCount, setDiscount] = useState(0)
  const [total, setTotal] = useState(0)
  const [couponError, setCouponError] = useState()
  const [promoData, setPromoData] = useState()

  const { cart, totalQuentity, } = useSelector((state) => state.Carts)
  const dispatch = useDispatch()
  console.log("cart", cart)
  const navigate = useNavigate()

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

  // handling discount 
  // const handleDiscount = () => {
  //   if (csetCouponErrorouponCode == "5%OFF") {
  //     // console.log("totalPrice",totalPrice)
  //     let Price = totalPrice
  //     let discountedPrice = parseInt((Price * 5) / 100)
  //     setDiscount(discountedPrice)
  //     // console.log("dicounted", discountedPrice)
  //     Price = Price - discountedPrice
  //     setTotal(totalPrice - discountedPrice)
  //     setDiscountPrice(Price)
  //   }
  //   else if (couponCode == "10%OFF") {
  //     let discountedPrice = parseInt(totalPrice * 10 / 100)
  //     //  console.log("dicounted",discountedPrice)
  //     setDiscount(discountedPrice)
  //     setTotal(totalPrice - discountedPrice)
  //     setDiscountPrice(totalPrice - discountedPrice)
  //   }
  //   else if (couponCode == "15%OFF") {
  //     let discountedPrice = parseInt(totalPrice * 15 / 100)
  //     setDiscount(discountedPrice)
  //     setTotal(totalPrice - discountedPrice)
  //     setDiscountPrice(totalPrice - discountedPrice)
  //   }
  //   else if (couponCode == "BASH50") {
  //     let discountedPrice = parseInt(totalPrice * 50 / 100)
  //     setDiscount(discountedPrice)
  //     setTotal(totalPrice - discountedPrice)
  //     setDiscountPrice(totalPrice - discountedPrice)
  //   }
  //   else if (couponCode == "") {
  //     setDiscountPrice(0)
  //     setDiscount(0)
  //     setTotal(totalPrice)
  //   }
  // }

  // const handleDiscount = () => {
  //   let coupons = [{ couponCode: "10%OFF", disCountType: "%", disCount: "10" }, { couponCode: "15%OFF", disCountType: "%", disCount: "15" }, { couponCode: "FLAT200", disCountType: "-", disCount: "200" }]

  //   let find = coupons.findIndex((val) => val.couponCode == couponCode)

  //   console.log("data", find)
  //   if (find >= 0) {
  //     let disCountedPrice = 0
  //     if (coupons[find].disCountType == "%") {
  //       disCountedPrice = parseInt(totalPrice * coupons[find].disCount / 100)
  //       setDiscount(disCountedPrice)
  //       setTotal(totalPrice-disCountedPrice)
  //     } else {
  //       if (totalPrice > 2000) {
  //         disCountedPrice = totalPrice - coupons[find].disCount
  //       } else {
  //         setTotal(totalPrice)
  //       }
  //       setDiscount(coupons[find].disCount)
  //       setTotal(disCountedPrice)
  //     }
  //     if(couponCode==""){
  //       setDiscount(0)
  //     }
  //     console.log(disCountedPrice)

  //   } else {
  //     // if (coupons[find].couponCode !== couponCode) {
  //     //   setCouponError("invalid coupon")
  //     // }
  //     //  if(couponCode==""){
  //     //   setCouponError("")
  //     //  }else{
  //     //   setCouponError("invalid coupon")
  //     //  }
  //   }

  // }

  // promo codes 
  const handleDiscounts = async () => {

    const res = await fetch(`http://localhost:3000/promo/getPromo?promoCode=${couponCode}`)

    try {
      let result = await res.json()
      console.log(result)
      // setPromoData(result)
      let discountedPrice = 0

      // if (totalPrice >= result.promo_min_val) {
      // if (result.promo_type == "percentage") {
      //   discountedPrice = parseInt(totalPrice * result.promo_value / 100)
      //   console.log("discount",discountedPrice)
      //   setDiscount(discountedPrice)
      //   setTotal(totalPrice - discountedPrice)
      //   console.log(disCount)
      // }

      // else {
      //   console.log(result.promo_value)
      //   discountedPrice = totalPrice -result.promo_value
      //   console.log(discountedPrice)
      //   setDiscount(result.promo_value)
      //   // setTotal(totalPrice - discountedPrice)

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
  const handleApply=(e)=>{
    e.preventDefault()
    handleDiscounts()
  }


console.log("cartItems" ,cartItems)

  const updateQuantity = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }

  const handleClearCart = (e) => {
    e.preventDefault()
      (localStorage.removeItem("cart"))
  }

  useEffect(() => {
    dispatch(setCart());
  }, []);
  useEffect(() => {
    //  setTotalPrice(quentity*cart[0].price)
    dispatch(totalQuentitys())
    handlePrice()
    // handleDiscount()
    // discount()
    // handleDiscounts()
    updateQuantity()
  }, [cart, totalPrice])

  // console.log(totalPrice)
  return (
    <div className="bg-[#111] h-screen w-screen flex justify-center px-20 py-10 pt-35">
      <div className='w-[70%] h-full '>
        <div className='text-white '>
          {cartItems  ? (cartItems.map((val) => <div className='bg-[#1c1c1c] h-40 w-[90%] mb-5 px-10 flex justify-between items-center'>
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
      </div>

      <div className='w-[30%] h-[70%]  p-7  rounded'>
        <div className=" bg-white h-[70%] p-7  rounded">
          <h2 className='font-semibold text-2xl'>Summary</h2>
          <hr />
          <div className='mt-3 '>
            <div className='flex justify-between mb-2  '>
              <lable className="font-bold text-xl" >Coupon</lable>
              <div className=''>
                <input type="text" onChange={(e) => setCouponCode(e.target.value)} value={couponCode} placeholder="coupon" className='w-40 bg-gray-200 border-1 border-gray-600 px-3 py-1 rounded' /> 
                <button className='py-1 px-4 bg-blue-400 text-white' onClick={(e)=> handleApply(e)}>Apply</button>
                {/* {couponError && couponCode ? (<p className='text-red-400 text-sm'>{couponError}</p>) : (<></>)} */}
              </div>
            </div>
            <h5 className='font-bold  text-xl mb-2 mt-2'>TotalQuentity: <span className='ml-45'>{totalQuentity}</span> </h5>
            <h5 className='font-bold text-xl mb-2'>SubTotal : <span className='ml-52'>{totalPrice}</span> </h5>
            <h5 className='font-bold text-xl mb-2'>Discount : <span className='ml-54'>{disCount}</span> </h5>
            <h5 className='font-bold text-xl mb-2'>Total : <span className='ml-60'>{total} </span> </h5>
          </div>
          <button className='w-full px-auto py-3  mt-3 bg-blue-500 text-white font-semibold rounded' onClick={(e)=>navigate("/checkout")}>Go To CheckOut</button>
        </div>
        <div className=" mt-10 px-4">
          {/* <button onClick={((e) => navigate("/show-product"))} className="w-45 ml-4 bg-blue-400 text-white font-semibold px-2 py-3 mr-5 rounded">Continue Shopping</button> */}
          {/* <button onClick={(e) => handleClearCart(e)} className="w-45  bg-red-500 text-white font-semibold px-5 py-3 rounded">Clear Cart</button> */}
        </div>
      </div>
      {/* localStorage.removeItem("cart") */}
    </div>
  )
}

export default Cart



