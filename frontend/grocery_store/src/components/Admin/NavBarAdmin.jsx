import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBarAdmin = ({ handleAddProduct }) => {
  const navigate = useNavigate();
  return (
    <div className='flex justify-between items-center bg-white w-full px-10 py-2.5 fixed z-50 top-0 left-0 border-b-2'>
      <div className='flex items-center gap-4'>
        <button className='text-2xl text-white bg-primary p-1 rounded-lg font-semibold' onClick={() => navigate('/admin')}>FM</button>
        <div>
          <p className='text-2xl font-bold'>FreshMart Admin</p>
          <p className='text-sm text-slate-500 font-light'>Product Management</p>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <button className='primary-btn text-sm' onClick={handleAddProduct}>Add Product</button>
      </div>
    </div>
  );
};

export default NavBarAdmin;