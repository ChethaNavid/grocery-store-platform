import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar/NavBar'
import AdsCard from '../../components/Card/AdsCard'
import ProductCard from '../../components/Card/ProductCard'
import FooterCard from '../../components/Card/FooterCard'
import CategoriesNavbar from '../../components/NavBar/CategoriesNavbar'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'

const CategoryPage = () => {
  const { categoryName } = useParams();

  const [allProduct, setAllProduct] = useState([]);
  const [isLoggedIn, setisLoggedIn] = useState(false);

  const onLogout = () => {
    localStorage.clear();
    navigate('/login');
    setisLoggedIn(false);
  }

  // Get All Products
  const getProductFromCategory = async () => {
      try {
          const response = await axiosInstance.get(`/category/${categoryName}`);
          if(response.data && response.data.products) {
              setAllProduct(response.data.products);
          }
      } catch (error) {
          console.log("Unexpected error occurred.");
      }
  }

  const handleAddButton = () => {

  }

  useEffect(() => {
    getProductFromCategory();
    return () => {}
  }, [categoryName])

  return (
    <div className='pt-[120px]'>
      <NavBar isLoggedIn={isLoggedIn} onLogout={onLogout} onSearchNote={() => {}} handleClearSearch={() => {}} />

      <CategoriesNavbar />

      <p className='m-4 text-xl font-bold'>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Products</p>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-4 pb-8'>
        {allProduct.map((items) => {
          return (
            <ProductCard 
              imgURL={items.imageUrl}
              category={items.Category?.name}
              productName={items.name}
              price={`$${items.price}`}
              handleAddButton={() => {handleAddButton(items)}}
            />
          )
        })}
      </div>

      <FooterCard />

    </div>
  )
}

export default CategoryPage