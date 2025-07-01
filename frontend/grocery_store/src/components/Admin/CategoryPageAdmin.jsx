import React from 'react'
import { useParams } from 'react-router-dom'
import ProductCardAdminByCategory from './ProductCardAdmin';
import NavBarAdmin from './NavBarAdmin';
import CategoriesNavbarAdmin from './CategoriesNavBarAdmin';

const CategoryPageAdmin = () => {
  const { categoryName } = useParams();
  return (
    <div className='pt-[120px] overflow-y-hidden'>
    <NavBarAdmin />
    <CategoriesNavbarAdmin />
    <ProductCardAdminByCategory categoryName={categoryName} />
    </div>
  )
}

export default CategoryPageAdmin
// Note: The ProductCardAdminByCategory component should be modified to fetch and display products based