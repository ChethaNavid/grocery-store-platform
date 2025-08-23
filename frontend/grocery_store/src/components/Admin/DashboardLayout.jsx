import React from 'react'
import NavBarAdmin from './NavBarAdmin'
import Sidebar from './Sidebar'
import CategoriesNavbar from './CategoriesNavBarAdmin'
import { Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { AdminPageContext } from '../../context/AdminPageContext'

const DashboardLayout = () => {

    const { config } = useContext(AdminPageContext);
    const { handleAdd, addButtonLabel, onSearch, handleClearSearch, onFilterCategory } = config;

  return (
    <div className="pt-[76px]">
        <NavBarAdmin />
        <div>
            <Sidebar />
            <main className='pl-52'>
                <CategoriesNavbar 
                    onSearch={onSearch} 
                    handleClearSearch={handleClearSearch}
                    handleAdd={handleAdd}
                    addButtonLabel={addButtonLabel}
                    onFilterCategory={onFilterCategory}
                />
                
                <div className='p-4'>
                    <Outlet />
                </div>
            </main>
        </div>
    </div>
  )
}

export default DashboardLayout