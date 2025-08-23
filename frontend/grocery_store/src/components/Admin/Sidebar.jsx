import React from 'react'
import { User, ShoppingCart, Tag } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    // Menu items.
    const items = [
        {
          title: "Customers",
          url: "/admin/customers",
          icon: User,
        },
        {
          title: "Products",
          url: "/admin/products",
          icon: Tag,
        },
        {
          title: "Orders",
          url: "/admin/orders",
          icon: ShoppingCart,
        }
    ]
  return (
    <div className="fixed top-[76px] left-0 w-52 h-[calc(100vh-76px)] p-4 space-y-2 bg-white border-r flex flex-col">
      {items.map((item, index) => (
        <NavLink
          key={index}
          to={item.url}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md transition ${
              isActive ? 'bg-gray-200 text-black' : 'text-gray-700 hover:text-black hover:bg-gray-100'
            }`
          }
        >
          <item.icon className="w-5 h-5" />
          <span className="text-sm">{item.title}</span>
        </NavLink>
      ))}
    </div>
  )
}

export default Sidebar