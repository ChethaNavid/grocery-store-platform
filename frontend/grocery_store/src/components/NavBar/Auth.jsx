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
          <MdShoppingCart className="text-2xl text-gray-800" 
            onClick={() => navigate("/payment")}
          />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
            {cartItems.length}
          </span>
        </button>
    </div>
  )
}

export default Auth