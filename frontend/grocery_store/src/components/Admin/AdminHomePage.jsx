import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axiosInstance from '../../utils/axiosInstance';
import NavBarAdmin from '../../components/Admin/NavBarAdmin';
import ProductCardAdmin from './ProductCardAdmin';
import CategoriesNavbarAdmin from '../../components/Admin/CategoriesNavBarAdmin';
import AddEditProduct from './AddEditProduct';
import ConfirmModal from './ConfrimModal';
import ToastMessage from '../ToastMessage/ToastMessage';

const AdminHome = () => {
  const { categoryName } = useParams();
  const [allProduct, setAllProduct] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // or 'edit'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isSearch, setIsSearch] = useState(false);

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    type:"add",
    message: "",
  });

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    })
  };

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
      type: "",
    })
  };

  // Fetch products
  const getProduct = async () => {
    try {
      const response = categoryName 
        ? await axiosInstance.get(`/category/${categoryName}`)
        : await axiosInstance.get('/admin/products');

      if (response.data?.products) {
        setAllProduct(response.data.products);
      }
    } catch (error) {
      console.log("Unexpected error occurred.");
    }
  };
  
  // Search Product
  const searchProduct = async (query) => {
    try {
      const response = await axiosInstance.get('/search-product', {
        params: { query }
      });
      if (response.data && response.data.products) {
        setAllProduct(response.data.products);
        setIsSearch(true);
      }
    } catch (error) {
      console.log("Search failed", error);
    }
  };

  // Clear Search
  const handleClearSearch = () => {
      setIsSearch(false);
      getProduct();
  }

  // Open Add Modal
  const handleAddProduct = () => {
    setSelectedProduct(null);
    setModalMode('add');
    setShowModal(true);
  };

  // Open Edit Modal
  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setModalMode('edit');
    setShowModal(true);
  };

  // Submit Handler for Add/Edit
  const handleSubmit = async (formData) => {
    try {
      if (modalMode === 'add') {
        await axiosInstance.post('/admin/add-product', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        showToastMessage("Product Added Successfully", "success");
      } else if (modalMode === 'edit' && selectedProduct?.id) {
        await axiosInstance.put(`/admin/edit-product/${selectedProduct.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        showToastMessage("Product Updated Successfully", "success");
      }

      setShowModal(false);
      getProduct();
    } catch (error) {
      console.error("Failed to save product", error);
    }
  };

  // Delete
  const handleDelete = async (data) => {
    try {
      await axiosInstance.delete(`/admin/delete-product/${data.id}`);
      showToastMessage("Product Deleted Successfully", "delete");
      getProduct();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, [categoryName]);

  return (
    <div className="pt-[150px]">
      <NavBarAdmin handleAddProduct={handleAddProduct} />
      <CategoriesNavbarAdmin onSearch={searchProduct} handleClearSearch={handleClearSearch}/>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-5 pb-8">
        {allProduct.map((item) => (
          <ProductCardAdmin
            key={item.id}
            imgURL={item.imageUrl}
            category={item.Category?.name}
            productName={item.name}
            price={`$${item.price}`}
            inStock={item.inStock}
            onEdit={() => handleEditProduct(item)}
            onDelete={() => {
              setProductToDelete(item);
              setShowConfirmModal(true);
            }}
          />
        ))}
      </div>

      {showModal && (
        <AddEditProduct
          mode={modalMode}
          product={selectedProduct}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
        />
      )}

      {showConfirmModal && productToDelete && (
        <ConfirmModal
          title="Delete Product"
          message={<>Are you sure you want to delete <strong>{productToDelete.name}</strong>?</>}
          onCancel={() => {
            setShowConfirmModal(false);
            setProductToDelete(null);
          }}
          onConfirm={() => {
            handleDelete(productToDelete);
            setShowConfirmModal(false);
            setProductToDelete(null);
          }}
        />
      )}

      <ToastMessage 
        isShown={showToastMsg.isShown}
        type={showToastMsg.type}
        message={showToastMsg.message}
        onClose={handleCloseToast}
      />

    </div>
  );
};

export default AdminHome;
