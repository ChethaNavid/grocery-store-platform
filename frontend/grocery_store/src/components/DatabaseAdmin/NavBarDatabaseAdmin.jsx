import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBarDatabaseAdmin = ({ handleAddUser }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center bg-white w-full px-10 py-2.5 fixed z-50 top-0 left-0 border-b-2">
      {/* Left side: logo and title */}
      <div className="flex items-center gap-4">
        <button
          className="text-2xl text-white bg-primary p-1 rounded-lg font-semibold"
          onClick={() => navigate('/admin')}
        >
          FM
        </button>
        <div>
          <p className="text-2xl font-bold">FreshMart Database Admin</p>
          <p className="text-sm text-slate-500 font-light">User Management</p>
        </div>
      </div>
    </div>
  );
};

export default NavBarDatabaseAdmin;
