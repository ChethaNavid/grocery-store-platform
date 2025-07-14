import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar/NavBar'
import ProductCard from '../../components/Card/ProductCard'
import FooterCard from '../../components/Card/FooterCard'
import CategoriesNavbar from '../../components/NavBar/CategoriesNavbar'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import AddToCartModal from '../../pages/Home/AddToCartModal';
import { CartContext } from '../../context/CartContext';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import ToastMessage from '../ToastMessage/ToastMessage';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { userInfo } = useContext(UserContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [showToastMsg, setShowToastMsg] = useState({
      isShown: false,
      type:"add",
      message: "",
  });

  const [allProduct, setAllProduct] = useState([]);
  const isLoggedIn = Boolean(userInfo); 

  const onLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
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

  const handleAddButton = (product) => {
    if (!isLoggedIn) return navigate('/');
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
    getProductFromCategory();
    return () => {}
  }, [categoryName])

  return (
    <div className='pt-[120px]'>
      <NavBar isLoggedIn={isLoggedIn} onLogout={onLogout} />

      <CategoriesNavbar />

      <p className='m-4 text-xl font-bold'>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Products</p>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-4 pb-8'>
        {allProduct.map((items) => {
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

export default CategoryPage