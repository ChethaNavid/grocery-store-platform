import React from 'react'
import NavBarAdmin from '../../components/Admin/NavBarAdmin'
import ProductCardAdmin from '../../components/Admin/ProductCardAdmin'
import CategoriesNavbarAdmin from '../../components/Admin/CategoriesNavBarAdmin'

const AdminHome = () => {
  return (
    <div className='pt-[120px] overflow-y-hidden'>
      <NavBarAdmin />
      <CategoriesNavbarAdmin />
      <ProductCardAdmin />
    </div>
  )
}

export default AdminHome