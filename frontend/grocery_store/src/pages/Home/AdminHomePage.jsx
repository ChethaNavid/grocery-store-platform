import React from 'react'
import NavBar from '../../components/NavBar/NavBar'
import AdsCard from '../../components/Card/AdsCard'
import ProductCardAdmin from '../../components/Card/ProductCardAdmin'
import FooterCard from '../../components/Card/FooterCard'
import CategoriesNavbar from '../../components/NavBar/CategoriesNavbar'

const AdminHome = () => {
  return (
    <div className='pt-[120px] overflow-y-hidden'>
      <NavBar />
      <CategoriesNavbar />
      <ProductCardAdmin />
    </div>
  )
}

export default AdminHome