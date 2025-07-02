import React, { useState, useEffect } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import AdsCard from '../../components/Card/AdsCard'
import ProductCard from '../../components/Card/ProductCard'
import FooterCard from '../../components/Card/FooterCard'
import CategoriesNavbar from '../../components/NavBar/CategoriesNavbar'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'

const Home = () => {
  const navigate = useNavigate();
  const [imgURL, setImgURL] = useState("");
  const [category, setCategory] = useState("");
  const [productName, setproductName] = useState("");
  const [price, setPrice] = useState(0);

  const [allProduct, setAllProduct] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  
  const onLogout = () => {
    localStorage.clear();
    navigate('/login');
    setisLoggedIn(false);
  }

  // Get All Products
    const getAllProduct = async () => {
        try {
            const response = await axiosInstance.get("/product");
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
      getAllProduct();
      return () => {}
    }, [])

  return (
    <div className='pt-[120px]'>
      <NavBar isLoggedIn={isLoggedIn} onLogout={onLogout} onSearchNote={() => {}} handleClearSearch={() => {}} />

      <CategoriesNavbar />

      <AdsCard />

      <p className='m-4 text-xl font-bold'>Featurd Products</p>

      <div className='overflow-x-auto scrollbar-hide scroll-smooth pb-4 mr-4'>
        <div className='flex gap-6 ml-4'>
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
      </div>
      
      <p className='m-4 text-xl font-bold'>Popular Products</p>

      <div className='overflow-x-auto scrollbar-hide scroll-smooth pb-4 mr-4'>
        <div className='flex gap-6 ml-4'>
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
      </div>

      <FooterCard />

    </div>
  )
}

export default Home