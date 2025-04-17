import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Login = (props) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [formErrors, setFormErrors] = useState()
  const [lodaing, setLoading] = useState(false)
  const [selectedRole, setSelectedRole] = useState("user");
  const [response, setResponse] = useState()
  const [formvalues, setformvalues] = useState()
  const navigate = useNavigate()
  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };
  const Submithandler = async (e) => {
    e.preventDefault()

    setformvalues({ email, password })
    setFormErrors(validate({ email, password }))
    await loginApi()
    setEmail("")
    setPassword("")
  }

  const validate = ({ email, password }) => {
    // console.log('value', value)
    const errors = {}
    // if (!value?.email) {
    //   errors.email = "email must required!"

    // }

    // if (!value?.password) {
    //   errors.password = "password must required!"

    // }
    if (!email) {
      errors.email = "email must required!"

    }

    if (!password) {
      errors.password = "password must required!"

    }
    return errors
  }


  const loginApi = async () => {
    console.log('formvalues', formvalues);
    console.log('email && password', email, password);

    if (email && password) {


      // setformvalues({ email, password })
      const res = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        }, body: JSON.stringify({ email, password })
      })

      try {
        const result = await res.json()
        console.log('==================================', result)
        localStorage.setItem("userData", JSON.stringify(result))
        if (result.data) {
          toast.success("successfuly login")
          if (result.data.role === "user") {
            navigate("/show-product")
          } else if (result.data.role === "seller") {
            navigate("/add-product")
          }
        } else {
          toast.error(result.msg)
        }
        setResponse(result)
        return result
      } catch (error) {
        toast.error(error.message)
        console.log(error)
      }
    }
  }
  // console.log("response", response.role)
  console.log(formErrors)
  return (

    <div className='flex items-center h-screen w-screen justify-center text-white bg-[#111]' >
      <Outlet />
      <div className=' bg-[#1c1c1c] px-10  rounded-xl  py-20 '>

        <form onSubmit={(e) => Submithandler(e)} className='flex flex-col items-center justify-center '>
          <h2 className='pb-15 text-3xl font-semibold'>Login Page</h2>
          {/* <div className='mb-5 mr-40'>
            <input type="radio"
              id="user"
              name="role"
              value="user"
              checked={selectedRole === 'user'}
              onChange={handleRoleChange} /><label className='ml-1 mr-4'>user</label>
            <input type="radio"
              id="seller"
              name="role"
              value="Seller"
              checked={selectedRole === 'Seller'}
              onChange={handleRoleChange} /><label className='ml-1 mr-4'>seller</label>
          </div> */}
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="border-1 mb-5 rounded text-sm py-2 px-2 w-80 border-gray-400 " type="email" name="" id="" placeholder='Enter Your Email' />

          {formErrors && formErrors.email ? <p className='text-sm text-red-400 mt-[-17px] mb-3  mr-[55%]' >{formErrors.email}</p> : <></>}
          <div className='flex relative'> <input value={password} onChange={(e) => setPassword(e.target.value)} className="border-1 mb-5 rounded text-sm py-2 px-2 w-80 border-gray-400  " type="password" name="" id="" placeholder='Enter Your Password' />
          </div>

          {formErrors && formErrors.password ? (<p className='text-sm text-red-400 mt-[-17px] mb-3  mr-[45%]' >{formErrors.password}</p>) : (<></>)}
          <button className="  text-sm py-2 px-5 border-1 border-gray-400 bg-blue-400 w-80 rounded mx-3 mt-5">{lodaing ? "Login..." : "Login"}</button>
        </form>
        {/* <h5 className='text-sm mt-4 ml-4'>create an Account ? <a className='text-blue-500' onClick={(e) => props.setIsRegister(false)}>sign up</a> </h5> */}
        <h5 className='text-sm mt-4 ml-4'>Create An Account ?
          <NavLink className='text-blue-500 ml-1' to={'/register'}>sign up</NavLink> </h5>
      </div>


    </div>

  )
}

export default Login