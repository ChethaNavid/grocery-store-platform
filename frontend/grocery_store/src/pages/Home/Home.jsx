import React, { useState, useEffect } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import AdsCard from '../../components/Card/AdsCard'
import ProductCard from '../../components/Card/ProductCard'
import FooterCard from '../../components/Card/FooterCard'
import CategoriesNavbar from '../../components/NavBar/CategoriesNavbar'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import AddToCartModal from './AddToCartModal'

const Home = () => {
  const navigate = useNavigate();

  const [imgURL, setImgURL] = useState("");
  const [category, setCategory] = useState("");
  const [productName, setproductName] = useState("");
  const [price, setPrice] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [showToastMsg, setShowToastMsg] = useState({
      isShown: false,
      type:"add",
      message: "",
  });

  const [allProduct, setAllProduct] = useState([]);
  const [popularProduct, setPopularProduct] = useState([]);
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

    // Get Popular Products
    const getPopularProduct = async () => {
        try {
            const response = await axiosInstance.get("/popular-product");
            if(response.data && response.data.products) {
                setPopularProduct(response.data.products);
            }
        } catch (error) {
            console.log("Unexpected error occurred.");
        }
    }

  const handleAddButton = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  const confirmAddToCart = (quantity) => {
    // TODO: dispatch to your cart/store:
    // cart.add(selectedProduct, quantity)
    closeModal()
  }

  useEffect(() => {
    getAllProduct();
    getPopularProduct();
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
                handleAddButton={() => handleAddButton(items)}
              />
            )
          })}
        </div>
      </div>
      
      <p className='m-4 text-xl font-bold'>Popular Products</p>

      <div className='overflow-x-auto scrollbar-hide scroll-smooth pb-4 mr-4'>
        <div className='flex gap-6 ml-4'>
          {popularProduct.map((items) => {
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

      {isModalOpen && selectedProduct && (
        <AddToCartModal
          product={{
            ...selectedProduct,
            category: selectedProduct.Category?.name
          }}
          onClose={closeModal}
          onAdd={confirmAddToCart}
        />
      )}

    </div>
  )
}

export default Home