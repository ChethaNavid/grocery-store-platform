import React from 'react'
import { useState, useEffect, useContext } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import CustomerTable from '../DataTable/CustomerTable';
import AddEditProduct from '../AddEditProduct';
import ConfirmModal from '../ConfrimModal';
import ToastMessage from '../../ToastMessage/ToastMessage';
import { AdminPageContext } from '../../../context/AdminPageContext';
import { useSearchParams } from 'react-router-dom';

const Customer = () => {

    const { setConfig } = useContext(AdminPageContext);
    const [allUser, setAllUser] = useState([]);
    const [meta, setMeta] = useState({ page:1, totalPage: 1 });
    const [searchParams, setSearchParams] = useSearchParams({
      page: 1,
      limit: 10,
    });
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('add'); // or 'edit'
    const [selectedUser, setSelectedUser] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [isSearch, setIsSearch] = useState(false);
    const [filteredCategory, setFilteredCategory] = useState("");

    // const handleFilterCategory = (category) => {
    //     setFilteredCategory(category);
    //     const newParams = {
    //         page: 1,
    //         limit: 10,
    //     };

    //     if (category) {
    //         newParams.category = category;
    //     }

    //     searchParams(newParams);
    // };

    // const products = allProduct.filter(product =>
    //     filteredCategory === "" ||
    //     (product.Category?.name?.toLowerCase() === filteredCategory.toLowerCase())
    // );


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

    // Get Users
    const getUsers = async () => {
      const page = searchParams.get("page") || 1;
      const limit = searchParams.get("limit") || 10;

      try {
        const response = await axiosInstance.get(`/users?page=${page}&limit=${limit}`);
        if(response.data.users) {
          setAllUser(response.data.users);
          setMeta(response.data.meta);
        }
      } catch (error) {
        console.error(error);
      }
    }

    // Search Product
    const searchUser = async (query) => {
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
      getUsers();
    }

    // Open Add Modal
    const handleAddUser = () => {
      setSelectedUser(null);
      setModalMode('add');
      setShowModal(true);
    };

    // Open Edit Modal
    const handleEditUser = (user) => {
      setSelectedUser(user);
      setModalMode('edit');
      setShowModal(true);
    };

    // Submit Handler for Add/Edit
    const handleSubmit = async (formData) => {
      try {
        if (modalMode === 'add') {
            await axiosInstance.post('/create-account', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            showToastMessage("User Added Successfully", "success");
        } else if (modalMode === 'edit' && selectedProduct?.id) {
            await axiosInstance.put(`/admin/edit-product/${selectedProduct.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            showToastMessage("User Updated Successfully", "success");
        }

        setShowModal(false);
        getUsers();
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
      setConfig({
        showAddButton: true,
        addButtonLabel: 'Add Customer',
        handleAdd: handleAddUser,
        onSearch: searchUser,
        handleClearSearch: handleClearSearch,
      });
      getUsers();
    }, [searchParams]);

    return (
      <div>
        <div>
            <CustomerTable
                users={allUser}
                onEdit={(product) => handleEditProduct(product)}
                onDelete={(product) => {
                    setUserToDelete(product);
                    setShowConfirmModal(true);
                }}
            />

            <div className="mt-6 flex justify-between">
                <span className="text-gray-500 font-medium">
                    Page {meta.page} / {meta.totalPage}
                </span>
                <div className='flex gap-4'>
                   <button
                        disabled={meta.page <= 1}
                        onClick={() =>
                            setSearchParams({ page: Number(meta.page) - 1, limit: 10 })
                        }
                        className="text-gray-500 hover:text-black rounded-md border border-gray-300 py-1 px-3 hover:bg-gray-200 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <button
                        disabled={meta.page >= meta.totalPage}
                        onClick={() =>
                            setSearchParams({ page: Number(meta.page) + 1, limit: 10 })
                        }
                        className="text-gray-500 hover:text-black rounded-md border border-gray-300 py-1 px-3 hover:bg-gray-200 disabled:opacity-50"
                    >
                        Next
                    </button> 
                </div>
            </div>
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
  )
}

export default Customer