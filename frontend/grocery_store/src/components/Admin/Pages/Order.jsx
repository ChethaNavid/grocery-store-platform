import React from 'react'
import OrderTable from '../DataTable/OrderTable';
import axiosInstance from '../../../utils/axiosInstance';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import ToastMessage from '../../ToastMessage/ToastMessage';
import { AdminPageContext } from '../../../context/AdminPageContext';

const Order = () => {

  const { setConfig } = useContext(AdminPageContext);
  const [allOrder, setAllOrder] = useState([]);
  const [meta, setMeta] = useState({ page:1, totalPage: 1 });
  const [isSearch, setIsSearch] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams({
    page: 1,
    limit: 10,
  });

  // Get Orders
  const getOrders = async () => {
    const page = searchParams.get("page") || 1;
    const limit = searchParams.get("limit") || 10;

    try {
      const response = await axiosInstance.get(`/orders?page=${page}&limit=${limit}`);
      if(response.data.orders) {
        setAllOrder(response.data.orders);
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
    getOrders();
  }
  
  useEffect(() => {
    setConfig({
      showAddButton: false,
      addButtonLabel: '',
      onSearch: searchUser,
      handleClearSearch: handleClearSearch,
    });
    getOrders();
  }, [searchParams]);

  return (
      <div>
        <div>
            <OrderTable
              orders={allOrder}
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

        {/* {showModal && (
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
        )} */}

        {/* <ToastMessage 
            isShown={showToastMsg.isShown}
            type={showToastMsg.type}
            message={showToastMsg.message}
            onClose={handleCloseToast}
        /> */}
    </div>
  )
}

export default Order