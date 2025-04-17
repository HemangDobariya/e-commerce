import React, { useState, useEffect } from 'react'
import Product from './Product'
import { api } from '../../utils/Api'
const Show = () => {
  const [response, setResponse] = useState()
  const [pageNo, setPageNo] = useState(0)
  const [userSize, setUserSize] = useState(4)
  const allProductApi = async ({ pageNo, userSize }) => {
    const userdata = JSON.parse(localStorage.getItem("userData"))
    const res = await api(`/seller/show-seller-product?id=${userdata.data.id}&page=${pageNo}&size=${userSize}`,"GET")
    // const res = await fetch(`http://localhost:3000/seller/show-seller-product?id=${userdata.data.id}&page=${pageNo}&size=${userSize}`)
    try {
      const result = await res.json()
      console.log(result)
      setResponse(result)
      return result

    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    allProductApi({ pageNo, userSize })

// console.log(token)
  }, [pageNo, userSize])


  console.log(response)


  return (
    <div className='grid p-2 h-screen w-screen justify-center text-white bg-[#111] pt-30'>
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
            {/* localhost:3000/promo/getPromo */}
            <button onClick={() => setPageNo(pageNo - 1)} className='text-sm py-2 px-2 border-1  w-20  rounded border-gray-400 border-xl-rounded bg-white pointer' >prev</button>
            <button onClick={() => setPageNo(1)} className='text-sm py-2 px-2 border-1  w-10 mx-1 rounded border-gray-400 border-xl-rounded bg-white pointer' >1</button>
            {/* <button onClick={() => setPageNo(2)} className='text-sm py-2 px-2 border-1  w-10  mr-1 rounded border-gray-400 border-xl-rounded bg-white pointer' >2</button>
            <button onClick={() => setPageNo(3)} className='text-sm py-2 px-2 border-1  w-10  mr-1 rounded border-gray-400 border-xl-rounded bg-white pointer' >3</button> */}
           {response && response.data?.length >= userSize ? (<button onClick={() => setPageNo(1)} className='text-sm py-2 px-2 border-1  w-10  mr-1 rounded border-gray-400 border-xl-rounded bg-white pointer' >2</button>) : (<></>)}
           {response && response.data?.length >= userSize ? (<button onClick={() => setPageNo(2)} className='text-sm py-2 px-2 border-1  w-10  mr-1 rounded border-gray-400 border-xl-rounded bg-white pointer' >3</button>) : (<></>)}
            <button onClick={() => setPageNo(pageNo + 1)} className='text-sm py-2 px-2 border-1 mr-10 w-20 rounded border-gray-400 border-xl-rounded bg-white'>Next</button>
            {/* <button className='text-sm absolute right-10 py-2 px-2 border-1 w-40 rounded border-gray-400 bg-blue-500 text-white' onClick={(e) => setIsAdd(true)}>Add</button> */}
          </div>
        </div>
        <div className='p-10 w-full grid grid-cols-4 gap-5 mt-10' >


          {response && response.data ? (response.data.map((elem, idx) => {
            return <Product idx={idx} data={elem} />
          })) : (<></>)}

        </div>
      </div>

    </div >
  )
}

export default Show


{/* <div className='p-10 grid grid-cols-4 gap-10 mt-30' >
{response.data.map((elem, idx) => {
  return <Product idx={idx} data={elem} />
})

}

</div> */}
{/* <input type="number" className='text-sm py-2 px-2 border-1 w-40 mr-10 ml-10 rounded border-gray-400 bg-white' name="" id="" placeholder="pageNo" onChange={(e) => setPageNo(e.target.value)} />
                  <input type="number" className='text-sm py-2 px-2 border-1 mr-10 w-40 rounded border-gray-400 bg-white' name="" id="" placeholder="pageData" onChange={(e) => setUserSize(e.target.value)} /> */}
{/* {response&&response.data?(response.data.map((elem, idx) => {
  return <Product idx={idx} data={elem} />
}):(<></>)} */}