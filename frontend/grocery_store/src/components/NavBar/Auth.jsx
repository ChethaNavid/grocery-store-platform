import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdShoppingCart } from 'react-icons/md';

const Auth = ({ isLoggedIn, onLogout }) => {

  const navigate = useNavigate();

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
          <MdShoppingCart className="text-2xl text-gray-800" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
            2
          </span>
        </button>
    </div>
  )
}

export default Auth