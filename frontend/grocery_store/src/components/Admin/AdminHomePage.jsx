import React from 'react'
import NavBarAdmin from '../../components/Admin/NavBarAdmin'
import ProductCardAdmin from './ProductCardAdmin'
import CategoriesNavbarAdmin from '../../components/Admin/CategoriesNavBarAdmin'
import axiosInstance from '../../utils/axiosInstance'
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

const AdminHome = () => {
  const { categoryName } = useParams();

  const [allProduct, setAllProduct] = useState([]);

  // Get All Products
  const getProduct = async () => {
      try {
          const response = categoryName 
          ? await axiosInstance.get(`/category/${categoryName}`)
          : await axiosInstance.get('/admin/products');

          if(response.data && response.data.products) {
              setAllProduct(response.data.products);
          }
      } catch (error) {
          console.log("Unexpected error occurred.");
      }
  }

  useEffect(() => {
    getProduct();
    return () => {}
  }, [categoryName])

  return (
    <div className='pt-[150px]'>
      <NavBarAdmin />
      <CategoriesNavbarAdmin />

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-5 pb-8'>
        {allProduct.map((items) => {
          return (
            <ProductCardAdmin
              key={items.id}
              imgURL={items.imageUrl}
              category={items.Category?.name}
              productName={items.name}
              price={`$${items.price}`}
              inStock={items.inStock}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          )
        })}
      </div>
    </div>
  )
}

export default AdminHome