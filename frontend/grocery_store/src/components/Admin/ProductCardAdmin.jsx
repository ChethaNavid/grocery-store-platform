// components/ProductCardAdmin.jsx
import React from 'react';

const ProductCardAdmin = ({ imgURL, category, productName, price, inStock, onEdit, onDelete }) => {
  return (
    <div className='w-[280px] border border-[#ccc] rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-[0_20px_25px_rgba(0,0,0,0.15)] flex-shrink-0'>
      <div className='h-[200px] overflow-hidden relative'>
          <img src={imgURL} alt={productName} className='w-full h-full object-cover block'></img>
          <span className={`absolute top-2 right-2 text-xs px-2 py-1 rounded font-semibold
            ${inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
            {inStock ? 'In Stock' : 'Out of Stock'}
          </span>
      </div>
      <div className=''>
          <p className='text-sm text-primary mb-1 ml-4'>{category}</p>
          <p className='text-sm font-semibold ml-4'>{productName}</p>
          <p className='text-lg font-semibold ml-4 mt-1'>{price}</p>
          <div className='flex gap-2 mb-4 mt-2 mx-4'>
            <button 
              className='flex-1 text-sm bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded'
              onClick={onEdit}
            >Edit</button>
            <button 
              className='flex-2 text-sm bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded'
              onClick={onDelete}
            >Delete</button>
          </div>
      </div>
    </div>
  );
};

export default ProductCardAdmin;
