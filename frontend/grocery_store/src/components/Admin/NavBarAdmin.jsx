import React from 'react';

const NavBarAdmin = () => {
  return (
    <div className='flex justify-between items-center bg-white w-full px-10 py-2.5 fixed z-50 top-0 left-0'>
      <div className='flex items-center gap-4'>
        <img src='/logo.png' alt='logo' className='h-12 w-12 object-contain' />
        <div>
          <p className='text-2xl font-bold'>FreshMart</p>
          <p className='text-sm text-slate-500 font-light'>Fresh groceries delivered</p>
        </div>
      </div>
      <div>
        <button className='primary-btn text-sm'>Add Product</button>
      </div>
    </div>
  );
};

export default NavBarAdmin;