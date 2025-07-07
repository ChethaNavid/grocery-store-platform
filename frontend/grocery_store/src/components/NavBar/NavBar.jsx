import React, { useState } from 'react'
import SearchBar from './SearchBar'
import Auth from './Auth'
import { useNavigate } from 'react-router-dom';

const NavBar = ({ onLogout, isLoggedIn }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const handleSearch = () => {
    const trimmedQuery = (searchQuery || "").trim();
    if (trimmedQuery) {
      navigate(`/search/${encodeURIComponent(trimmedQuery.toLowerCase())}`);
    }
  };

  return (
    <div className='flex justify-between items-center bg-white w-full px-10 py-2.5 fixed z-100 top-0 left-0'>
        <div className='flex items-center gap-4'>
            <button className='text-2xl text-white bg-primary p-1 rounded-lg font-semibold' onClick={() => navigate('/')}>FM</button>
            <div className=''>
                <p className='text-2xl font-bold'>FreshMart</p>
                <p className='text-sm text-slate-500 font-light'>Fresh groceries delivered</p>
            </div>
        </div>

        <SearchBar 
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          handleSearch={handleSearch}
        />

        <Auth isLoggedIn={isLoggedIn} onLogout={onLogout}/>
    </div>
  )
}

export default NavBar