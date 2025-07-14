import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdShoppingCart } from 'react-icons/md';
import { CartContext } from '../../context/CartContext';

const Auth = ({ isLoggedIn, onLogout }) => {

  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext); 

  return (
    <div className='flex items-center text-sm gap-5'>
      {isLoggedIn ? (
        <button className='text-sm text-slate-700 underline' onClick={onLogout}>
            Logout
        </button>
      ) : (
        <>
          <Link to={"/login"} className='font-meduim'>Login</Link>
          <Link to={"/signup"}>
            <button className='primary-btn'>Sign Up</button>
          </Link>
        </>
      )}
        <button className="relative">
          <MdShoppingCart className="text-gray-800" size={24} 
            onClick={() => navigate("/payment")}
          />
          {cartItems.length > 0 && (
            <span className="absolute -top-0 -right-0 -translate-y-1/2 translate-x-1/2  bg-red-600 flex items-center justify-center text-white text-xs font-semibold w-4 h-4 rounded-full shadow-md">
              {cartItems.length}
            </span>
          )}
        </button>
    </div>
  )
}

export default Auth