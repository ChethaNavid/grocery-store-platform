import React, { useState } from 'react';
import SearchBarAdmin from '../Admin/SearchBarAdmin';
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { MdAdd } from "react-icons/md";

const CategoriesNavbar = ({ onSearch, handleClearSearch, handleAdd, addButtonLabel, onFilterCategory }) => {
  
  const pathToTitle = {
    "/admin": "Dashboard",
    "/admin/customers": "Customers",
    "/admin/products": "Products",
    "/admin/orders": "Orders",
  };

  const location = useLocation();
  const currentPath = location.pathname;

  const title = pathToTitle[currentPath] || "Dashboard";

  const showAddButton = currentPath === "/admin/products";
  const showFilter = currentPath === "/admin/products";
  const showSearch = currentPath === "/admin/products";

  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "";


  const handleSearch = () => {
    if(searchQuery) {
      onSearch(searchQuery);
    }
  }

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  }

  const handleCategoryChange = (e) => {
    const value = e.target.value;

    const newParams = new URLSearchParams(searchParams.toString());
    if (value) {
      newParams.set("category", value);
      newParams.set("page", 1); // Reset to first page on filter change
    } else {
      newParams.delete("category");
      newParams.set("page", 1);
    }

    setSearchParams(newParams);
    onFilterCategory(value);
  };

  return (
    <>
      <div className='flex justify-between mx-4 mt-4'>
        <h1 className='text-2xl font-semibold'>{title}</h1>

        {showAddButton && (
          <button className='flex items-center gap-1 primary-btn text-sm' onClick={handleAdd}>
            <MdAdd size={18}/>
            {addButtonLabel}
          </button>
        )}
      </div>

      {showSearch && (
        <nav className="flex items-center justify-between gap-4 bg-white p-4 border-b border-gray-200">
          <div className="flex-grow">
            <SearchBarAdmin value={searchQuery}
              onChange={({target}) => {
                setSearchQuery(target.value);
              }}
              handleSearch={handleSearch}
              onClearSearch={onClearSearch}
            />
          </div>

          {showFilter && (
            <div className="flex items-center gap-4">
              <select
                onChange={handleCategoryChange}
                value={selectedCategory}
                className="text-sm font-medium border bg-[#fcfbfb] rounded-lg p-1 w-full max-w-xs px-4 py-2 border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              >
                  <option value="">All</option>
                  <option value="fruits">Fruits</option>
                  <option value="vegetables">Vegetables</option>
                  <option value="dairy">Dairy</option>
                  <option value="meat">Meat</option>
                  <option value="bakery">Bakery</option>
                  <option value="beverages">Beverages</option>
                  <option value="snacks">Snacks</option>
              </select>
            </div>
          )}
        </nav>
      )}
    </>
  );
};

export default CategoriesNavbar;
