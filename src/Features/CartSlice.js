import { createSlice } from "@reduxjs/toolkit";

// JSON.parse(localStorage.getItem("cart"))||
const initialState = {
    cart: [],
    totalQuentity: 0,
    totalPrice: 0
    // JSON.parse(localStorage.getItem("cart"))||
}
export const CartSlice = createSlice({
    name: "Cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            console.log("addTocart", action.payload)
            let find = state.cart.findIndex((item) => item.product_id === action.payload.product_id)
            if (find >= 0) {
                state.cart[find].prod_quentity += 1
            } else {
                state.cart.push(action.payload)
            }
            localStorage.setItem('cart', JSON.stringify(state.cart))
        }
        , increment: (state, action) => {
            let find = state.cart.findIndex((item) => item.product_id === action.payload)
            if (find >= 0) {
                // const val = localStorage.getItem("cart")
                // let data = val[find].prod_quentity += 1
                // let data= val[find].prod_quentity+= 1
                state.cart[find].prod_quentity += 1
                localStorage.setItem('cart', JSON.stringify(state.cart))
            }

        }, decrement: (state, action) => {
            // const val = localStorage.getItem("cart")
            let find = state.cart.findIndex((item) => item.product_id === action.payload)
            if (state.cart[find].prod_quentity > 0) {
                if (find >= 0) {
                    state.cart[find].prod_quentity -= 1
                    localStorage.setItem('cart', JSON.stringify(state.cart))
                } else {
                    state.cart.splice(find, 1); // Remove item if quantity is 1 and user clicks "-"
                }
                localStorage.setItem('cart', JSON.stringify(state.cart))
            }

            // else if (state.cart[find].prod_quentity == 0) {
            //     state.cart = state.cart.filter((val) => val.product_id !== action.payload)
            //     console.log("==========================================", data)
            //     localStorage.setItem('cart', JSON.stringify(state.cart))
            // }
        },
        totalQuentitys: (state, action) => {
            // let val = state.cart.map((val)=>{
            //     state.totalQuentity+=val.prod_quentity
            // })
            state.totalQuentity = state.cart.reduce((total, item) => total + item.prod_quentity, 0);

        }, setCart: (state) => {
            const savedCart = JSON.parse(localStorage.getItem("cart"));
            if (savedCart) {
                state.cart = savedCart;
            }
        },
        removeProduct: (state, action) => {
            state.cart = state.cart.filter((val) => val.product_id !== action.payload)
            console.log("------------------------------------------------------", state.cart)
            localStorage.setItem('cart', JSON.stringify(state.cart))
        }
    }
}
)

export const { addToCart, TotalCart, increment, decrement, totalQuentitys, setCart, removeProduct } = CartSlice.actions
export default CartSlice.reducer