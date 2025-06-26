import React, { useState } from 'react'
import SearchBar from './SearchBar'
import Auth from './Auth'
import { useNavigate } from 'react-router-dom';

const NavBar = ({ onLogout, isLoggedIn, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const handleSearch = () => {
    if(searchQuery) {
      onSearchNote(searchQuery);
    }
  }

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  }
  return (
    <div className='flex justify-between items-center bg-white w-full px-10 py-2.5 fixed z-100 top-0 left-0'>
        <div className='flex items-center gap-4'>
            <img src='' alt='logo'></img>
            <div className=''>
                <p className='text-2xl font-bold'>FreshMart</p>
                <p className='text-sm text-slate-500 font-light'>Fresh groceries delivered</p>
            </div>
        </div>

        <SearchBar 
          value={searchQuery}
          onChange={(target) => {
            setSearchQuery(target.value);
          }}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />

        <Auth isLoggedIn={isLoggedIn} onLogout={onLogout}/>
    </div>
  )
}

export default NavBar