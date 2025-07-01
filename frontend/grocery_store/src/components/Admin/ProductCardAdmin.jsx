// components/ProductCardAdmin.jsx
import React from 'react';

const ProductCardAdmin = ({ imgURL, category, productName, price, inStock }) => {
  return (
    <div className='w-[280px] border border-gray-300 rounded-lg m-4 shadow-md bg-white transition hover:shadow-lg'>
      {/* Image Section */}
      <div className='h-[200px] relative overflow-hidden'>
        <img src={imgURL} alt={productName} className='w-full h-full object-cover' />
        <span className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-full font-semibold
          ${inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
          {inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>

      {/* Info Section */}
      <div className='p-4'>
        <p className='text-sm text-gray-600 mb-1'>{category}</p>
        <h3 className='font-semibold text-md'>{productName}</h3>
        <p className='text-sm font-semibold text-gray-700 my-2'>{price}</p>
        <div className='flex gap-2'>
          <button className='flex-1 text-sm bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded'>Edit</button>
          <button className='flex-1 text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded'>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardAdmin;
