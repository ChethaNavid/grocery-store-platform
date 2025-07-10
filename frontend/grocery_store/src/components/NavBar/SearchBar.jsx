import React from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  const onSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    handleSearch();
  };

  return (
    <form onSubmit={onSubmit} className='w-[60%] border flex items-center gap-2.5 border-[#ccc] rounded-lg bg-white p-2'>
      <FaMagnifyingGlass className='w-5 h-5 ml-2' />

      <input 
        type='text'
        placeholder='Search for groceries, brands and more...'
        value={value}
        onChange={onChange}
        className='w-full outline-none p-2 bg-transparent text-sm'
      />

      {value && (
        <IoMdClose 
          className='cursor-pointer mr-3'
          onClick={onClearSearch}
        />
      )}

      <button type='submit' className='primary-btn text-sm'>Search</button>
    </form>
  );
};

export default SearchBar;
