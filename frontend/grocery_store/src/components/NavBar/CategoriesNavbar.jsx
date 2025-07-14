import React from 'react'
import { Link } from 'react-router-dom'

const CategoriesNavbar = () => {
  return (
    <nav className="fixed top-[69px] w-full left-0 z-99 text-sm text-slate-600 border border-[#ccc] flex gap-[30px] bg-[#F9FAFB] px-2.5 py-3.5">
      <Link to="/category/fruits">Fruits</Link>
      <Link to="/category/vegetables">Vegetables</Link>
      <Link to="/category/dairy">Dairy</Link>
      <Link to="/category/meat">Meat</Link>
      <Link to="/category/bakery">Bakery</Link>
      <Link to="/category/beverages">Beverages</Link>
      <Link to="/category/snacks">Snacks</Link>
    </nav>
  )
}

export default CategoriesNavbar