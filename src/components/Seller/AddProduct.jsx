import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from '../../utils/Api';
const AddProduct = () => {
  const [quentity, setQuentity] = useState()
  const [price, setPrice] = useState()
  const [title, setTitle] = useState()
  const [descripton, setDesc] = useState()
  const [file, setFile] = useState(null)
  const [addErrors, setAddErrors] = useState()
  const Submithandler = async (e) => {
    e.preventDefault()
    setAddErrors(validate({ quentity, price, title, descripton, file }))
    await addProductApi()
    // const formdata = new FormData
    // formdata.append("file", file)
    // console.log(formdata)
    // console.log(file)

  }
  const validate = ({ quentity, price, title, descripton, file }) => {
    const errors = {}
    if (!quentity) {

      errors.quentity = "quentity must required"
    }
    if (!price) {
      errors.price = "price must required"
    }
    if (!title) {
      errors.title = "title must required"
    } if (!descripton) {
      errors.descripton = "description must required"
    }
    if (!file) {
      errors.file = "file must required"
    }
    return errors
  }
  const addProductApi = async () => {
    console.log(file, quentity, price, title, descripton)
    console.log(quentity)
    console.log(price)
    const userdata = JSON.parse(localStorage.getItem("userData"))
    console.log("dataid", userdata.data.id)
    if (file && quentity && price && title && descripton) {
      console.log(title)

      const formdata = new FormData();
      formdata.append("seller_id", userdata.data.id)
      formdata.append("file", file);
      formdata.append("quentity", quentity);
      formdata.append("price", price);
      formdata.append("title", title);
      formdata.append("descripton", descripton);
      console.log(formdata)
      const res = await api("http://localhost:3000/seller/add-Product", "POST", formdata)
      // const res = await fetch("http://localhost:3000/seller/add-Product", {
      //   method: 'POST',
      //   body: formdata
      // })

      try {
        const result = await res.json()
        console.log(result)

        if (result) {
          toast.success("successfully added")
        }
        return result

      }
      catch (error) {
        console.log(error.message)
        setQuentity("")
        setPrice("")
        setTitle("")
        setDesc("")
        setFile("")
      }
    } else {
      console.log("fileds are empty")
    }
  }
  console.log(addErrors)


  return (

    <div className='flex  h-screen w-screen justify-center text-white bg-[#111] pt-50'>

      <div className=' bg-[#1c1c1c] px-10  rounded-xl  py-10 h-150 '>

        <form onSubmit={(e) => Submithandler(e)} className='flex flex-col items-center justify-center  '>
          <h2 className='pb-5 text-3xl font-semibold'>Add Product</h2>
          <label className='mr-[80%] text-sm  '>Title</label>
          <input type="text" name="" className="border-1 mb-5 rounded text-sm py-2 px-2 w-80 border-gray-400 " id="" onChange={(e) => setTitle(e.target.value)} value={title} placeholder='Add Title' />
          {addErrors && addErrors.title ? <p className='text-sm text-red-400 mt-[-17px] mb-1  mr-[55%]' >{addErrors.title}</p> : <></>}
          <label className='mr-[80%] text-sm  '>Price </label>
          <input type="number" className="border-1 mb-5 rounded text-sm py-2 px-2 w-80 border-gray-400 " name="" id="" onChange={(e) => setPrice(e.target.value)} value={price} placeholder='Enter Price' />
          {addErrors && addErrors.price ? <p className='text-sm text-red-400 mt-[-19px] mb-1  mr-[55%]' >{addErrors.price}</p> : <></>}
          <label className='mr-[75%] text-sm  '>Quentity </label>
          <input value={quentity} onChange={(e) => setQuentity(e.target.value)} className="border-1 mb-5 rounded text-sm py-2 px-2 w-80 border-gray-400 " type="number" name="" id="" placeholder='Enter quentity' />
          {addErrors && addErrors.quentity ? <p className='text-sm text-red-400 mt-[-17px] mb-1  mr-[50%]' >{addErrors.quentity}</p> : <></>}
          <label className='mr-[75%] text-sm  '> Address </label>
          <textarea name="" id="" className="border-1 mb-5 rounded text-sm py-2 px-2 w-80 border-gray-400 " onChange={(e) => setDesc(e.target.value)} value={descripton} placeholder='Enter description'></textarea>
          {addErrors && addErrors.descripton ? <p className='text-sm text-red-400 mt-[-17px] mb-1 w-80 mr-[1%]' >{addErrors.descripton}</p> : <></>}
          <label className='mr-[75%] text-sm  '> image </label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} className="border-1 mb-5 rounded text-sm py-2 px-2 w-80  border-gray-400 " />
          {addErrors && addErrors.file ? <p className='text-sm text-red-400 mt-[-17px] mb-1  mr-[55%]' >{addErrors.file}</p> : <></>}
          <button className="  text-sm py-2 px-5 border-1 border-gray-400 bg-blue-400 w-80 rounded mx-3 mt-5">Add</button>
        </form>

      </div>


    </div>
  )
}

export default AddProduct
