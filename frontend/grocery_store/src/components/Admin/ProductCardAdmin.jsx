import React from 'react';

const ProductCardAdmin = ({ imgURL, category, productName, price, inStock }) => {
  return (
    <div className='overflow-x-auto whitespace-nowrap scroll-smooth pt-10 pb-4 mr-4'>
      <div className='inline-block w-[280px] border border-[#ccc] rounded-lg ml-4 overflow-hidden align-top transition-all duration-300 ease-in-out hover:shadow-[0_20px_25px_rgba(0,0,0,0.15)] bg-white'>
        
        {/* Image Section */}
        <div className='h-[200px] overflow-hidden relative'>
          <img src={imgURL} alt={productName} className='w-full h-full object-cover block' />
          
          {/* Stock Badge */}
          <p className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-full font-semibold
            ${inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
            {inStock ? "In Stock" : "Out of Stock"}
          </p>
        </div>

        {/* Info Section */}
        <div className='mt-2'>
          <p className='text-sm text-primary mb-1 ml-4'>{category || "Bakery"}</p>
          <p className='text-sm font-semibold ml-4'>{productName || "Fresh Bread Loaf"}</p>

          <div className='flex justify-between items-center mx-4 my-2.5'>
            <p className='text-sm font-semibold'>{price || "$2.79"}</p>
          </div>

          <div className='flex justify-between items-center mx-4 gap-2 my-2.5'>
            <button className='primary-btn w-full text-sm bg-blue-500 hover:bg-blue-600 text-white'>Edit</button>
            <button className='primary-btn text-sm bg-red-500 hover:bg-red-600 text-white'>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardAdmin;
