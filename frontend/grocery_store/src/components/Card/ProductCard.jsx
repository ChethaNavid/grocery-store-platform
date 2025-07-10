import React from 'react'

const ProductCard = ({ imgURL, category, productName, price, handleAddButton }) => {
  return (
    
    <div className='w-[280px] border border-[#ccc] rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-[0_20px_25px_rgba(0,0,0,0.15)] flex-shrink-0'>
        <div className='h-[200px] overflow-hidden'>
            <img src={imgURL} alt={productName} className='w-full h-full object-cover block'></img>
        </div>
        <div className=''>
            <p className='text-sm text-primary mb-1 ml-4'>{category}</p>
            <p className='text-sm font-semibold ml-4'>{productName}</p>
            <div className='flex justify-between items-center mx-4 my-2.5'>
                <p className='text-lg font-semibold'>{price}</p>
                <button className='primary-btn text-sm' onClick={handleAddButton}>Add</button>
            </div>
        </div>
    </div>

  )
}

export default ProductCard