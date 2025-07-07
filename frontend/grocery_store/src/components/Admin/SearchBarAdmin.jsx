import React from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBarAdmin = ({ value, onChange, handleSearch, onClearSearch }) => {
  const onSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    handleSearch();     // Trigger search
  };

  return (
    <form 
      onSubmit={onSubmit}
      className="w-3/4 border flex items-center gap-2.5 border-[#ccc] rounded-lg bg-white p-2"
    >
      <FaMagnifyingGlass className="w-4 h-4 ml-2 text-gray-500" onClick={handleSearch}/>
      
      <input
        type="text"
        placeholder="Search product..."
        value={value}
        onChange={onChange}
        className="w-full outline-none p-1 bg-transparent text-sm"
      />

      {value && (
        <IoMdClose
          className="cursor-pointer mr-2 text-gray-500"
          onClick={onClearSearch}
        />
      )}
    </form>
  );
};

export default SearchBarAdmin;
