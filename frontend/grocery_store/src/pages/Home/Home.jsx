import React, { useState, useEffect, useContext } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import AdsCard from '../../components/Card/AdsCard'
import ProductCard from '../../components/Card/ProductCard'
import FooterCard from '../../components/Card/FooterCard'
import CategoriesNavbar from '../../components/NavBar/CategoriesNavbar'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import AddToCartModal from './AddToCartModal'
import { CartContext } from '../../context/CartContext'
import { useRef } from 'react'
import ToastMessage from '../../components/ToastMessage/ToastMessage'

const Home = () => {
  const navigate = useNavigate();
  const featuredRef = useRef();
  const { addToCart } = useContext(CartContext);

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
  
  const onLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    setisLoggedIn(false);
  }

  //Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if(response.data && response.data.user) {
          setUserInfo(response.data.user);
          setisLoggedIn(true);
      }
    } catch(error) {
      if(error.response.status === 401) {
          localStorage.clear();
          navigate("/login");
      }
    }
  }

  // Get All Products
  const getFeatureProduct = async () => {
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
    addToCart(selectedProduct, quantity)
    setShowToastMsg({
      isShown: true,
      type: 'add',
      message: `${selectedProduct.name} added to cart!`
    });
    closeModal()
  }

  useEffect(() => {
    getUserInfo();
    getFeatureProduct();
    getPopularProduct();
    return () => {}
  }, [])

  return (
    <div className='pt-[120px]'>
      <NavBar isLoggedIn={userInfo} onLogout={onLogout} />

      <CategoriesNavbar />

      <AdsCard onShopNow={() => featuredRef.current?.scrollIntoView({ behavior: 'smooth' })} />

      <p ref={featuredRef} className='m-4 text-xl font-bold'>Featurd Products</p>

      <div className='overflow-x-auto scrollbar-hide scroll-smooth pb-4 mr-4'>
        <div className='flex gap-6 ml-4'>
          {allProduct.map((items) => {
            return (
              <ProductCard 
                key={items.id}
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
                key={items.id} 
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

      <ToastMessage
        isShown={showToastMsg.isShown}
        type={showToastMsg.type}
        message={showToastMsg.message}
        onClose={() => setShowToastMsg(prev => ({ ...prev, isShown: false }))}
      />

    </div>
  )
}

export default Home