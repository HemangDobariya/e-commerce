import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from "react-router-dom";
const Register = ({ setIsRegister }) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [first_name, setFirst_Name] = useState()
  const [last_name, setLast_Name] = useState()
  const [formErrors, setFormErrors] = useState()
  const [lodaing, setLoading] = useState(false)
  const [selectedRole, setSelectedRole] = useState("user");
  const [response, setResponse] = useState()
  const [formvalues, setformvalues] = useState()
  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };
  const Submithandler = async(e) => {
    e.preventDefault()
    setformvalues({ first_name, last_name, email, password, selectedRole })
    setFormErrors(validate({ first_name, last_name, email, password, selectedRole }))
    await loginapi()
    setEmail("")
    setPassword("")
    setFirst_Name("")
    setLast_Name("")
  
  }
  console.log(selectedRole)
  const validate = (value) => {

    const errors = {}
    if (!value.first_name) {
      errors.first_name = "firstname required!"
    }
    if (!value.last_name) {
      errors.last_name = "lastname required!"
    } if (!value.email) {
      errors.email = "email must required!"

    }

    if (!value.password) {
      errors.password = "password must required!"

    }
     else if (value.password.length < 4) {
      errors.password = "password must more than 4 digit"
    }
    else if (value.password.length > 10) {
      errors.password = "password must less than 10 digit"
    }
    return errors
  }
console.log(formvalues)
  const loginapi = async () => {
    // setformvalues({first_name,last_name,email,password,selectedRole})
    if (first_name && last_name && email && password && selectedRole) {
      const res = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        }, body: JSON.stringify({first_name, last_name, email, password, selectedRole })
      })
      try {
        const result = await res.json()
        console.log(result)
        if (result.data) {
          toast.success("successfuly Register")
        } else {
          toast.error(result.message)
        }
        setResponse(result)
        return result
      } catch (error) {
        console.log(error)
      }
    }
  }



  console.log(formErrors)

  return (
    <div className='flex items-center h-screen w-screen justify-center text-white bg-[#111]'>

      <div className=' bg-[#1c1c1c] px-10  rounded-xl  py-20 '>

        <form onSubmit={(e) => Submithandler(e)} className='flex flex-col items-center justify-center '>
          <h2 className='pb-15 text-3xl font-semibold'>Registration Page</h2>
          <div className='mb-5 mr-40'>
            <input type="radio"
              id="user"
              name="role"
              value="user"
              checked={selectedRole === 'user'}
              onChange={handleRoleChange} /><label className='ml-1 mr-4'>user</label>
            <input type="radio"
              id="seller"
              name="role"
              value="seller"
              checked={selectedRole === 'seller'}
              onChange={handleRoleChange} /><label className='ml-1 mr-4'>seller</label>
          </div>

          <input value={first_name} onChange={(e) => setFirst_Name(e.target.value)} className="border-1 mb-5 rounded text-sm py-2 px-2 w-80 border-gray-400 " type="text" name="" id="" placeholder='Enter Your firstName' />
          {formErrors && formErrors.first_name ? <p className='text-sm text-red-400 mt-[-17px] mb-3 mr-[55%]' >{formErrors.first_name}</p> : <></>}
          <input value={last_name} onChange={(e) => setLast_Name(e.target.value)} className="border-1 mb-5 rounded text-sm py-2 px-2 w-80 border-gray-400 " type="text" name="" id="" placeholder='Enter Your firstName' />
          {formErrors && formErrors.last_name ? <p className='text-sm text-red-400 mt-[-17px] mb-3  mr-[55%]' >{formErrors.last_name}</p> : <></>}
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="border-1 mb-5 rounded text-sm py-2 px-2 w-80 border-gray-400 " type="email" name="" id="" placeholder='Enter Your Email' />
          {formErrors && formErrors.email ? <p className='text-sm text-red-400 mt-[-17px] mb-3  mr-[55%] ' >{formErrors.email}</p> : <></>}
          <div className='flex relative'> <input value={password} onChange={(e) => setPassword(e.target.value)} className="border-1 mb-5 rounded text-sm py-2 px-2 w-80 border-gray-400  " type="password" name="" id="" placeholder='Enter Your Password' />
          </div>
          {formErrors && formErrors.password ? (<p className='text-sm text-red-400 mt-[-17px] mb-3   w-80 ' >{formErrors.password}</p>) : (<></>)}
          <button className="  text-sm py-2 px-5 border-1 border-gray-400 bg-blue-400 w-80 rounded mx-3 mt-5">{lodaing ? "Register..." : "Register"}</button>

        </form>
        {/* <h5 className='text-sm mt-4 ml-4'>alredy have an Account ? <a className='text-blue-500' onClick={(e) => setIsRegister(true)}>sign in</a> </h5> */}
        <h5 className='text-sm mt-4 ml-4'>alredy have an Account ?<NavLink to={"/Login"} className='text-blue-500 ml-1'>sign in </NavLink> </h5>

      </div>


    </div>
  )
}

export default Register

