import React, { use, useEffect, useState } from 'react'
// import Address from './Address'
import { api } from '../../../utils/Api'
const CheckForm = () => {
    const [response, setResponse] = useState()
    const [addAddress, setAddAddress] = useState(false)
    const [shipping, setShipping] = useState()
    const [zip, setZip] = useState()
    const [city, setCity] = useState()
    const [country, setCountry] = useState()
    const [email, setEmail] = useState()
    const [phoneNo, setPhoneNo] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [selectedAddressId, setSelectedAddressId] = useState();
    const [isEdit, setIsEdit] = useState(false)
    const [editId, setEditId] = useState(null)
    const [formError, setFormError] = useState()


    const getUserAddress = async () => {
        const userdata = JSON.parse(localStorage.getItem("userData"))
        console.log(userdata)
        const response = await api(`/address/get-address?user_id=${userdata.data.id}`, "GET")
        // const response = await fetch(`http://localhost:3000/address/get-address?user_id=${2}`)
        // const response = await fetch(`http://localhost:3000/address/get-address`) 
        try {
            const result = await response.json()
            console.log(result)
            setResponse(result)

            if (result.message == "json token expired! please login again") {
                localStorage.removeItem("userData")
            }
        } catch (error) {
            console.log("error", error.message)
        }
    }

    console.log(response?.data)

    useEffect(() => {
        getUserAddress()

        // console.log("response", response.data)
    }, [])

    // const response = await fetch("http://localhost:3000/address/add-address", {
    //     method: "POST",
    //     headers: {
    //         'Content-Type': 'application/json',
    //     }, body: JSON.stringify({ user_id: userdata.data.id, shipping_address: shipping, country: country, city: city, zip_code: zip, first_name: firstName, last_name: lastName, email: email, phone_no: phoneNo })
    // })

    const addAddres = async () => {
        const userdata = JSON.parse(localStorage.getItem("userData"))
        console.log("userData", userdata.data.id)
        if (shipping, zip, city, country, firstName, lastName, email, phoneNo) {
            // if(!formError){
            const body = JSON.stringify({ user_id: userdata.data.id, shipping_address: shipping, country: country, city: city, zip_code: zip, first_name: firstName, last_name: lastName, email: email, phone_no: phoneNo })
            const response = await api("/address/add-address", "POST", body)
            try {
                const result = await response.json()
                console.log(result)


                setAddAddress(false)
                setCity("")
                setCountry("")
                setEmail("")
                setFirstName("")
                setLastName("")
                setZip("")
                setPhoneNo("")
                setShipping("")
                getUserAddress()
            } catch (error) {
                console.log("error", error.message)
            }
        }
    }


    const handleAddAddress = (e) => {

        setFormError(validateAddAddress({ shipping, country, city, zip, firstName, lastName, email, phoneNo }))
        addAddres()
        e.preventDefault()

    }



    // adddress validation 
    const validateAddAddress = (value) => {
        const errors = {}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const postalCodeRegex = /^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/;
        if (!value.firstName) {
            errors.firstName = "firstName is required"
        }
        if (!value.lastName) {
            errors.lastName = "lastName is required"
        }
        if (!value.shipping) {
            errors.shipping = "shipping address is required"
        }
        if (!value.email) {
            errors.email = "email is required"
        } else if (!regex.test(value.email)) {
            errors.email = "email is not valid type"

        }
        if (!value.phoneNo) {
            errors.phoneNo = "phoneNo is required"
        } else if (!(value.phoneNo.match('[0-9]{10}'))) {
            errors.phoneNo = "Please provide valid phone number"
        }
        if (!value.city) {
            errors.city = "city is require"
        }
        if (!value.country) {
            errors.country = "country is required"
        }
        else if (typeof value.country !== 'string') {
            errors.country = "please enter valid country"
        }
        if (!value.zip) {
            errors.zip = 'zip is required'
        } else if (!postalCodeRegex.test(value.zip)) {
            errors.zip = "please enter valid zip"
        }
        return errors
    }

    console.log(formError)

    // delete address
    const handleDelete = async (id) => {
        console.log("id", id)
        if (response.data.length > 1) {
            const response = await api(`/address/delete?id=${id}`, 'DELETE')
            // const response = await fetch(`http://localhost:3000/address/delete?id=${id}`, { method: "DELETE" })
            try {
                const result = await response.json()
                console.log(result)

                console.log("response", response.data)
                const updatedAddresses = response.data.filter(item => item.id !== id);
                setResponse({ ...response, data: updatedAddresses });

                // const updatedAddresses = await response.data.filter(val=>val.id!==id )
                // setResponse({...response , data:updatedAddresses})
                // setResponse(prev => ({ ...prev, data: updatedAddresses }));
                // getUserAddress()
                if (result.message == "json token expired! please login again") {
                    localStorage.removeItem("userData")
                }
            } catch (error) {

                console.log("error", error.message)
            }
        }
    }

    const handleUpdate = async (id) => {
        setAddAddress(true)
        setIsEdit(true)
        setEditId(id)
        const data = response.data?.find((val) => val.id == id)
        if (data) {

            setCity(data.city)
            setCountry(data.country)
            setEmail(data.email)
            setFirstName(data.first_name)
            setLastName(data.last_name)
            setZip(data.zip_code)
            setPhoneNo(data.phone_no)
            setShipping(data.shipping_address)
        }
        // const response = await fetch(`http://localhost:3000/address/update?id=${id}`, {
        //     method: "PUT",
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ shipping_address: shipping, country: country, city: city, zip_code: zip, first_name: firstName, last_name: lastName, email: email, phone_no: phoneNo })
        // })
        // try {
        //     const result = response.json()
        //     console.log(result)
        // } catch (error) {
        //     console.log(error)
        // }

    }
    const handleEditAddress = async (e) => {
        e.preventDefault()
        let body = JSON.stringify({ shipping_address: shipping, country: country, city: city, zip_code: zip, first_name: firstName, last_name: lastName, email: email, phone_no: phoneNo })
        const response = await api(`/address/update?id=${editId}`, 'PUT', body)
        try {
            const result = await response.json()
            console.log("update", result.data)
            setIsEdit(false)
            setAddAddress(false)
            if (response.data) {
                const editedAddress = response.data.filter(val => val.id == editId ? result.data : val)
                setResponse({ ...response, data: editedAddress })
            }


            setCity("")
            setCountry("")
            setEmail("")
            setFirstName("")
            setLastName("")
            setZip("")
            setPhoneNo("")
            setShipping("")


            // setResponse(result.data)
            // getUserAddress()
        } catch (error) {
            console.log(error.message)
        }
    }
  useEffect(() => {
  if (response?.data && response.data.length > 0 && selectedAddressId === null) {
    setSelectedAddressId(response.data[0].id);
  }
}, [response, selectedAddressId]); 
    return (
        <div className='bg-[rgb(28,28,28)] w-[45%] h-[90%] py-10 relative '>

            {addAddress == false ? (
                <div className='px-10 py-4'>

                    <h1 className='text-xl mb-3'>Order Details</h1>
                    {response && response.data ? (response.data.map(val => {
                        return (
                            <div className='w-[100%] h-[10%] bg-gray-200 text-gray-900 px-5 py-4 rounded mb-3 relative' >

                                <div className='flex items-center gap-13 pt-2 '>
                                    <div>
                                        <input type="radio" name="" id="" className='' checked={selectedAddressId===val.id}    onChange={() => setSelectedAddressId(val.id)} />
                                        {/* checked={val.id > 1 ? selectedAddressId === val.id : true} */}
                                    {/* {val.id>1?checked={selectedAddressId == val.id}:defaultChecked} */}
                                   
                                    </div>
                                    <div>
                                        <div className='flex gap-2 mb-2 text-xl'>
                                            <h5>{val.first_name} </h5>
                                            <h5>{val.last_name}</h5>
                                            <h5>- (+91) {val.phone_no}</h5>
                                        </div>
                                        <div className='text-l text-gray-500 flex gap-2'>
                                            <h5>{val.shipping_address}</h5>
                                            <h5>{val.city},</h5>
                                            <h6>-{val.zip_code},</h6>
                                        </div>
                                        <div className='absolute top-10 right-10'>
                                            <button className='text-red-500 mr-6' onClick={(e) => handleDelete(val.id)}> Remove</button>
                                            <button className='text-red-500' onClick={(e) => handleUpdate(val.id)}> Edit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )
                    })
                    ) : (<h2> data not avalable</h2>)}
                </div>



            ) : (

                <div>
                    <div className='px-10 py-5  flex ml-8 gap-5'>
                        <div className='flex flex-col w-[50%]'>
                            <lable className="text-white text-sm ml-2">First Name</lable>
                            <input type='text' placeholder='First Name' onChange={(e) => setFirstName(e.target.value)} value={firstName} className='border-1 mb-1 rounded text-sm py-2 px-2 w-[100%] border-gray-400' />
                            {formError && formError.firstName ? (<p className='text-sm text-red-400'>{formError.firstName}</p>) : (<></>)}
                        </div>
                        <div className='flex flex-col w-[50%]'>
                            <lable className="text-white text-sm ml-2">Last Name</lable>
                            <input type='text' placeholder='Last Name' onChange={(e) => setLastName(e.target.value)} value={lastName} className='border-1 mb-1 rounded text-sm py-2 px-2 w-[100%] border-gray-400' />
                            {formError && formError.lastName ? (<p className='text-sm text-red-400'>{formError.lastName}</p>) : (<></>)}
                        </div>
                    </div>
                    <div className='px-10   flex ml-8 gap-5'>
                        <div className='flex flex-col w-[50%] '>
                            <lable className="text-white text-sm ml-2">Phone Number</lable>
                            <input type='number' placeholder='Phone Number' onChange={(e) => setPhoneNo(e.target.value)} value={phoneNo} className='border-1 mb-1 rounded text-sm py-2 px-2 w-[100%] border-gray-400' />
                            {formError && formError.phoneNo ? (<p className='text-sm text-red-400'>{formError.phoneNo}</p>) : (<></>)}
                        </div>
                        <div className='flex flex-col w-[50%]'>
                            <lable className="text-white text-sm ml-2">Email</lable>
                            <input type='email' placeholder='Email Address' onChange={(e) => setEmail(e.target.value)} value={email} className='border-1 mb-1 rounded text-sm py-2 px-2 w-[100%] border-gray-400' />
                            {formError && formError.email ? (<p className='text-sm text-red-400'>{formError.email}</p>) : (<></>)}
                        </div>
                    </div>

                    <div className='flex flex-col w-[95%] px-10 ml-8 mt-5 mb-5'>
                        <lable className='text-white text-sm ml-2 mb-2'> Shipping address</lable>
                        <textarea onChange={(e) => setShipping(e.target.value)} value={shipping} className='border-1 mb-1 rounded text-sm py-2 px-2 w-[100%] border-gray-400' cols="40" rows='4' name="" id="" ></textarea>

                        {formError && formError.shipping ? (<p className='text-sm text-red-400'>{formError.shipping}</p>) : (<></>)}
                    </div>

                    <div className='px-10   flex ml-8 gap-5'>
                        <div className='flex flex-col w-[50%] '>
                            <lable className="text-white text-sm ml-2">Country</lable>
                            <input type='text' placeholder='country' value={country} onChange={(e) => setCountry(e.target.value)} className='border-1 mb-1 rounded text-sm py-2 px-2 w-[100%] border-gray-400' />
                            {formError && formError.country ? (<p className='text-sm text-red-400'>{formError.country}</p>) : (<></>)}
                        </div>
                        <div className='flex flex-col w-[50%]'>
                            <lable className="text-white text-sm ml-2">City</lable>
                            <input type='text' placeholder='city' value={city} onChange={(e) => setCity(e.target.value)} className='border-1 mb-1 rounded text-sm py-2 px-2 w-[100%] border-gray-400' />
                            {formError && formError.city ? (<p className='text-sm text-red-400'>{formError.city}</p>) : (<></>)}
                        </div>
                        <div className='flex flex-col w-[50%]'>
                            <lable className="text-white text-sm ml-2">Zip code</lable>
                            <input type='number' placeholder='zip code' value={zip} onChange={(e) => setZip(e.target.value)} className='border-1 mb-1 rounded text-sm py-2 px-2 w-[100%] border-gray-400' />
                            {formError && formError.zip ? (<p className='text-sm text-red-400'>{formError.zip}</p>) : (<></>)}
                        </div>
                    </div>
                    {/* <div className=' flex justify-center items-center'> <button onClick={(e) => handleAddAddress(e)} className='w-[40%] px-auto py-2 mt-5 bg-blue-400'> Add </button></div> */}
                    <div className=' flex justify-center items-center mt-20'>
                        <button onClick={(e) => isEdit ? handleEditAddress(e) : handleAddAddress(e)} className='w-[40%] px-auto py-2 mt-5 bg-blue-400'>{isEdit ? "Update Address" : "Add Address"}</button>
                    </div>
                    <div className='flex justify-center items-center mt-10' >
                        <p className='px-auto border-b-1' onClick={() => { setAddAddress(false), setIsEdit(false) }}>back</p>
                    </div>

                </div>
            )}
            {addAddress == false ? (<div className=' flex justify-center items-center absolute bottom-10 w-full'> <button onClick={(e) => { setAddAddress(true) }} className='w-[80%] px-auto py-2 mt-5 bg-blue-400'> Add Address</button></div>) : (<></>)}




        </div>

    )
}

export default CheckForm