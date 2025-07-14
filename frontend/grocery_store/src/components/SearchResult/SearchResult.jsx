import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import NavBar from '../../components/NavBar/NavBar';
import ProductCard from '../../components/Card/ProductCard';
import FooterCard from '../../components/Card/FooterCard';
import CategoriesNavbar from '../../components/NavBar/CategoriesNavbar';
import AddToCartModal from '../../pages/Home/AddToCartModal';

const SearchResult = () => {
  const { query } = useParams();
  const navigate = useNavigate();

  const [allProduct, setAllProduct] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onLogout = () => {
    localStorage.clear();
    navigate('/login');
    setIsLoggedIn(false);
  }

  const getSearchResults = async () => {
    try {
      const response = await axiosInstance.get('/search-product', {
        params: { query }
      });
      if (response.data && response.data.products) {
        setAllProduct(response.data.products);
      }
    } catch (error) {
      console.log("Search failed", error);
    }
  };

  const handleAddButton = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    getSearchResults();
  }, [query]);

  return (
    <div className='pt-[120px]'>
      <NavBar isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <CategoriesNavbar />

      <p className='m-4 text-xl'>Search Results for <strong>{query}</strong></p>

      {allProduct.length === 0 ? (
        <div className='flex justify-center items-center h-[60vh]'>
          <p className='text-gray-600 text-lg'>
            No matching products found.
          </p>
        </div>
      ) : (
        <>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-4 pb-8'>
            {allProduct.map((item) => (
              <ProductCard
                key={item.id}
                imgURL={item.imageUrl}
                category={item.Category?.name}
                productName={item.name}
                price={`$${item.price}`}
                handleAddButton={() => handleAddButton(item)}
              />
            ))}
          </div>

          <FooterCard />

          {isModalOpen && selectedProduct && (
            <AddToCartModal
              product={{
                ...selectedProduct,
                category: selectedProduct.Category?.name
              }}
              onClose={closeModal}
              onAdd={() => {}}
            />
          )}
        </>
      )}
    </div>
  );
};

export default SearchResult;
