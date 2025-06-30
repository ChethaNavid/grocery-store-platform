import React from 'react'
import SearchBarAdmin from '../Admin/SearchBarAdmin'
import { useNavigate } from "react-router-dom"

const CategoriesNavbar = () => {
  const navigate = useNavigate();
  const handleChange = (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory) {
      navigate(`/category/${selectedCategory}`);
    }
  };
  
  return (
    <nav className="fixed top-[69px] w-full left-0 z-99 text-sm text-slate-600 border border-[#ccc] flex justify-between gap-[10px] bg-[#F9FAFB] px-2.5 py-3.5">
      <div className="w-full max-w-2xl mx-5">
        <SearchBarAdmin />
      </div>
      <div className="flex items-center pr-10 gap-4">
        <p className="text-lg text-gray-800 ">Category: </p>
        <select onChange={handleChange} className="text-lg font-semibold border border-[#ccc] bg-[#D9D9D9] rounded-lg p-2 w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 bg-white" defaultValue="">
        <option value="" disabled>All Category</option>
        <option value="fruit">Fruit</option>
        <option value="vegetables">Vegetables</option>
        <option value="diary">Diary</option>
        <option value="meat">Meat</option>
        <option value="bakery">Bakery</option>
        <option value="beverages">Beverages</option>
        <option value="snacks">Snacks</option>
        <option value="frozen">Frozen</option>
    </select>
      </div>
      
    </nav>
  )
}

export default CategoriesNavbar