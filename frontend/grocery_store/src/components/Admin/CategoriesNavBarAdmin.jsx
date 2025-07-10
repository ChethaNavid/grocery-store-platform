import React, { useMemo, useState } from 'react';
import SearchBarAdmin from '../Admin/SearchBarAdmin';
import { useNavigate, useLocation } from "react-router-dom";

const CategoriesNavbar = ({ onSearch, handleClearSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedValue = useMemo(() => {
    const path = location.pathname;
    if (path === "/admin") return "admin";
    return path.replace("/", "");
  }, [location.pathname]);

  const handleChange = (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory === 'admin') {
      navigate('/admin');
    } else {
      navigate(`/${selectedCategory}`);
    }
  };

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if(searchQuery) {
      onSearch(searchQuery);
    }
  }

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  }

  return (
    <nav className="fixed top-[69px] w-full left-0 z-40 text-sm text-slate-600 flex justify-between gap-[10px] bg-white px-2.5 py-3.5">
      <div className="w-full max-w-2xl mx-5">
        <SearchBarAdmin value={searchQuery}
          onChange={({target}) => {
            setSearchQuery(target.value);
          }}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />
      </div>
      <div className="flex items-center pr-10 gap-4">
        <p className="text-sm text-gray-800 ">Category: </p>
        <select
          onChange={handleChange}
          value={selectedValue}
          className="text-sm font-semibold border bg-[#D9D9D9] rounded-lg p-2 w-full max-w-xs px-4 py-2 border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
        >
          <option value="admin">All Category</option>
          <option value="admin/fruits">Fruit</option>
          <option value="admin/vegetables">Vegetables</option>
          <option value="admin/dairy">Dairy</option>
          <option value="admin/meat">Meat</option>
          <option value="admin/bakery">Bakery</option>
          <option value="admin/beverages">Beverages</option>
          <option value="admin/snacks">Snacks</option>
          <option value="admin/frozen">Frozen</option>
        </select>
      </div>
    </nav>
  );
};

export default CategoriesNavbar;
