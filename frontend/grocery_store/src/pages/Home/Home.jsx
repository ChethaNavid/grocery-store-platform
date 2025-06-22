import React from 'react'
import NavBar from '../../components/NavBar/NavBar'
import AdsCard from '../../components/Card/AdsCard'
import ProductCard from '../../components/Card/ProductCard'
import FooterCard from '../../components/Card/FooterCard'
import CategoriesNavbar from '../../components/NavBar/CategoriesNavbar'

const Home = () => {
  return (
    <div className='pt-[120px] overflow-y-hidden'>
      <NavBar />
      <CategoriesNavbar />
      <AdsCard />
      <p className='m-4 text-xl font-bold'>Featurd Products</p>
      <ProductCard />
      <p className='m-4 text-xl font-bold'>Popular Products</p>
      <ProductCard />
      <FooterCard />
    </div>
  )
}

export default Home