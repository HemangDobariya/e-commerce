import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Seller from './components/Seller/Seller'
import User from './components/User/User'
import AddProduct from './components/Seller/AddProduct';
import Show from './components/Seller/Show';
import Showproduct from './components/User/ShowProduct';
import Cart from './components/User/Cart';
import Protected from './Protected';
import CheckOut from './components/User/CheckOut';
function App() {
  const [isRegister, setIsRegister] = useState()
  const userData = JSON.parse(localStorage.getItem('userData'))

  const router = createBrowserRouter([{
    path: "/",
    element: <div>
      {!userData ? (<Login />) : (<></>)}
    </div>
  }, {
    path: "/login",
    element: <div>
      {!userData ? (<Login />) : (<></>)}
    </div>

  },
  {
    path: "/register",
    element: <div> {!userData ? (<Register />) : (<></>)}</div>
  }
    , {
    path: "/user",
    element: <Protected Component={User} />
  },

  {
    path: "/show",
    element: <Protected Component={Seller} Component2={Show} requiredRole="seller" />
  },
  {
    path: "/add-product",
    element: <Protected Component={Seller} Component2={AddProduct} requiredRole="seller" />
    // },   <div><Seller /><AddProduct /></div>
  },
  {
    path: "/show-product",
    element: <Protected Component={User} Component2={Showproduct} requiredRole="user" />
    // <div><User/><Showproduct /></div>
  },
  {
    path: "/cart",
    element: <Protected Component={User} Component2={Cart} requiredRole="user" />
    //  <div><User/><Cart/></div>
  }, {
    path: "/checkout",
    element: <Protected Component={User} Component2={CheckOut}  requiredRole="user" />
  }
  ])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App

// ,{
//   path:"/seller",
//   element:<Seller/>, children: [
//     {
//       path: "addProduct",
//       element: <AddProduct />
//     }, {
//       path: "show",
//       element: <Show />
//     }]
// },
// {
//   path: "/user",Component2={Cart}
//   element: <User />
// },{
//   path: "/show",
//   element : <div><Seller/><Show/></div>
// },{
//   path: "/add-product",
//   element: <div><Seller /><AddProduct /></div>
// },{
//   path: "/show-product",
//   element : <div><User/><Showproduct /></div>
// },
// {
//   path: "/cart",
//   element : <div><User/><Cart/></div>
// }
{/* <Login/> */ }
{/* <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/main" element={<MainPage />} />
        <Route path="/" element={<MainPage />} /> Default route */}
{/* </Routes>
    </Router> */}
{/* {!isRegister?(<Register setIsRegister={setIsRegister}/>):(<Login setIsRegister={setIsRegister}/>)} */ }
{/* <Seller/> */ }