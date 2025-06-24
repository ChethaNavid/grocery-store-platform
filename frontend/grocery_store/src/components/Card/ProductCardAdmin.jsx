import React from 'react'
import Categories from '../Categories/CategoryPage'

const ProductCardAdmin = ({ imgURL, category, productName, price }) => {
  return (
    <div className='overflow-x-auto whitespace-nowrap scroll-smooth pb-4 mr-4'>
        <div className='inline-block w-[280px] border border-[#ccc] rounded-lg ml-4 overflow-hidden align-top transition-all duration-300 ease-in-out hover:shadow-[0_20px_25px_rgba(0,0,0,0.15)]'>
            <div className='h-[200px] overflow-hidden'>
                <img src={imgURL} className='w-full h-full object-cover block'></img>
            </div>
            <div className=''>
                <p className='text-sm text-primary mb-1 ml-4'>{category || "Bakery"}</p>
                <p className='text-sm font-semibold ml-4'>{productName || "Fresh Bread Loaf"}</p>
                <div className='flex justify-between items-center mx-4 my-2.5'>
                    <p className='text-sm'>{price || "$2.79"}</p>
                    <button className='primary-btn text-sm'>Edit</button>
                    <button className='primary-btn text-sm'>Delete</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductCardAdmin