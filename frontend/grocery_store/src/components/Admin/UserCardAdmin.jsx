// components/ProductCardAdmin.jsx
import React from 'react';

const UserCardAdmin = ({ id, username, email, phoneNumber, changeToStaff, onDelete }) => {
  return (
    <div className='w-[280px] border border-[#ccc] rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-[0_20px_25px_rgba(0,0,0,0.15)] flex-shrink-0'>
      <div className=''>
          <p className='text-sm text-primary mb-1 ml-4'>{id}</p>
          <p className='text-sm font-semibold ml-4'>{username}</p>
          <p className='text-lg font-semibold ml-4 mt-1'>{email}</p>
          <p className='text-lg font-semibold ml-4 mt-1'>{phoneNumber}</p>
          <div className='flex gap-2 mb-4 mt-2 mx-4'>
            <button
                className='flex-1 text-sm bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded'
                onClick={changeToStaff}
            >Change to Staff</button>
            <button 
              className='flex-2 text-sm bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded'
              onClick={onDelete}
            >Delete</button>
          </div>
      </div>
    </div>
  );
};

export default UserCardAdmin;
