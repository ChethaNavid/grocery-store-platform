import React from 'react'
import NavBarAdmin from '../../components/Admin/NavBarAdmin'
import ProductListAdmin from '../../components/Admin/ProductListAdmin'
import CategoriesNavbarAdmin from '../../components/Admin/CategoriesNavBarAdmin'

const AdminHome = () => {
  return (
    <div className='pt-[120px] overflow-y-hidden'>
      <NavBarAdmin />
      <CategoriesNavbarAdmin />
      <h1 className="text-2xl font-bold my-6">Admin Product Management</h1>
      <ProductListAdmin />
    </div>
  )
}

export default AdminHome