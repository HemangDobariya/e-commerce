import React from 'react'
import { useState, useEffect } from 'react'
import ProductList from './ProductList'
import { api } from '../../utils/Api'
const Showproduct = () => {
  const [response, setResponse] = useState()
  const [pageNo, setPageNo] = useState(0)
  const [userSize, setUserSize] = useState(10)
  const allProductData = async ({ pageNo, userSize }) => {
const res = await api(`/user/show-Product?page=${pageNo}&size=${userSize}`)
    // const res = await fetch(`http://localhost:3000/seller/show-Product?page=${pageNo}&size=${userSize}`)
    try {
      const result = await res.json()
      console.log(result)
      setResponse(result)
      return result
    } catch (error) {
      if(error.message =="json token expired! please login again"){
        localStorage.removeItem("userData")
      }
      console.log(error.message)
    }
  }

  useEffect(() => {
    allProductData({ pageNo, userSize })
  }, [pageNo, userSize])
  console.log(response)
  return (
    <div className='grid p-2 h-full w-screen justify-center text-white bg-[#111] pt-30'>
      <div>
        <div className='w-screen relative flex justify-center '>
          <h1 className='text-2xl font-semibold '>All Products</h1>
          <div className='px-20 text-gray-600 absolute left-15 mt-10 flex'>
            <div className='mr-20'>
               <button onClick={() => setUserSize(10)} className={`text-sm py-2 px-2 border-1 w-10 mx-1 rounded border-gray-400  pointer ${userSize === 10 ? 'bg-blue-500 text-white border-blue-500' : 'bg-white'}`} >10</button>
              <button onClick={() => setUserSize(20)}   className={`text-sm py-2 px-2 border-1 w-10 mx-1 rounded border-gray-400  pointer ${userSize === 20 ? 'bg-blue-500 text-white border-blue-500' : 'bg-white'}`} >20</button>
              <button onClick={() => setUserSize(50)}  className={`text-sm py-2 px-2 border-1 w-10 mx-1 rounded border-gray-400  pointer ${userSize === 50 ? 'bg-blue-500 text-white border-blue-500' : 'bg-white'}`} >50</button>
              <button onClick={() => setUserSize(100)}  className={`text-sm py-2 px-2 border-1 w-10 mx-1 rounded border-gray-400  pointer ${userSize === 100 ? 'bg-blue-500 text-white border-blue-500' : 'bg-white'}`} >100</button>
            </div>
            <button onClick={() => setPageNo(pageNo - 1)} className='text-sm py-2 px-2 border-1  w-20  rounded border-gray-400 border-xl-rounded bg-white pointer' >prev</button>
            <button onClick={() => setPageNo(0)} className='text-sm py-2 px-2 border-1  w-10 mx-1 rounded border-gray-400 border-xl-rounded bg-white pointer' >1</button>
            {response && response.data?.length >= userSize ? (<button onClick={() => setPageNo(1)} className='text-sm py-2 px-2 border-1  w-10  mr-1 rounded border-gray-400 border-xl-rounded bg-white pointer' >2</button>) : (<></>)}
            {response && response.data?.length >= userSize ? (<button onClick={() => setPageNo(2)} className='text-sm py-2 px-2 border-1  w-10  mr-1 rounded border-gray-400 border-xl-rounded bg-white pointer' >3</button>) : (<></>)}
            <button onClick={() => setPageNo(pageNo + 1)} className='text-sm py-2 px-2 border-1 mr-10 w-20 rounded border-gray-400 border-xl-rounded bg-white'>next</button>
            {/* <button className='text-sm absolute right-10 py-2 px-2 border-1 w-40 rounded border-gray-400 bg-blue-500 text-white' onClick={(e) => setIsAdd(true)}>Add</button> */}
          </div>
          {/* className={`text-sm py-2 px-2 border-1 w-10 mx-1 rounded border-gray-400 bg-white pointer ${userSize === size ? 'bg-blue-500 text-white border-blue-500' : ''}`} */}

        </div>
        <div className='p-10 w-full grid grid-cols-4 gap-rows-5 mt-10 gap-10' >

          {response && response.data ? (response.data.map((elem, idx) => {
            return <ProductList idx={idx} data={elem} />
          })) : (<></>)}

        </div>
      </div>

    </div >
  )
}

export default Showproduct






{/* <input type="number" className='text-sm py-2 px-2 border-1 w-40 mr-10 ml-10 rounded border-gray-400 bg-white' name="" id="" placeholder="pageNo" onChange={(e) => setPageNo(e.target.value)} />
                  <input type="number" className='text-sm py-2 px-2 border-1 mr-10 w-40 rounded border-gray-400 bg-white' name="" id="" placeholder="pageData" onChange={(e) => setUserSize(e.target.value)} /> */}