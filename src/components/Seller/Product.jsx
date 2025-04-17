import React from 'react'

const Product = ({ data }) => {
    console.log(data)
    return (

        <div class="w-full h-130  max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm ">
            <a href="#">
                <img class="p-7 pb-5 h-80 w-full rounded-t-lg" src={`http://localhost:3000/images/${data.image}`} alt="product image" />
            </a>
            <div class="px-7 pb-7">
                <a href="#">
                    <h5 class="text-3xl font-semibold tracking-tight text-gray-900 ml-1  dark:text-white">{data.title}</h5>
                </a>
                <h5 class="text-xl font-semibold tracking-tight text-gray-600 ml-1  dark:text-white">{data.descripton}</h5>
                <h5 class="text-l font-semibold tracking-tight mt-1 ml-1  text-gray-600 dark:text-white">quantity: {data.quentity}</h5>
                <div class="flex items-center justify-between">
                    <span class="text-2xl mt-3 ml-3 font-bold text-yellow-600 dark:text-white">{data.price}$</span>
                    {/* <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mt-1 text-center ">Add to cart</a> */}
                </div>
            </div>
        </div>
    )
}

export default Product