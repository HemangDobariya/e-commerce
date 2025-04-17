import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./Features/CartSlice"
 const store = configureStore({
    reducer: {
        Carts: CartReducer
    }
})
export default store
// CartSlice