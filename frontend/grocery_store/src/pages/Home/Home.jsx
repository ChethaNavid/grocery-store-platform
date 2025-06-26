import React, { useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import AdsCard from '../../components/Card/AdsCard'
import ProductCard from '../../components/Card/ProductCard'
import FooterCard from '../../components/Card/FooterCard'
import CategoriesNavbar from '../../components/NavBar/CategoriesNavbar'
import { useNavigate } from 'react-router-dom'

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

  const handleAddButton = () => {

  }

  return (
    <div className='pt-[120px] overflow-y-hidden'>
      <NavBar isLoggedIn={isLoggedIn} onLogout={onLogout} onSearchNote={() => {}} handleClearSearch={() => {}} />
      <CategoriesNavbar />
      <AdsCard />
      <p className='m-4 text-xl font-bold'>Featurd Products</p>
      {allProduct.map((items) => {
        return (
          <ProductCard 
            imgURL={items.imgURL}
            category={items.category}
            productName={items.productName}
            price={items.price}
            handleAddButton={() => {handleAddButton(items)}}
          />
        )
      })}
      <p className='m-4 text-xl font-bold'>Popular Products</p>
      <ProductCard />
      <FooterCard />
    </div>
  )
}

export default Home