import React, { useState, useEffect, useContext } from 'react';
import OrderTable from '../DataTable/OrderTable';
import axiosInstance from '../../../utils/axiosInstance';
import { useSearchParams } from 'react-router-dom';
import { AdminPageContext } from '../../../context/AdminPageContext';

const Order = () => {

  const { setConfig } = useContext(AdminPageContext);
  const [allOrder, setAllOrder] = useState([]);
  const [meta, setMeta] = useState({ page:1, totalPage: 1 });
  const [searchParams, setSearchParams] = useSearchParams({
    page: 1,
  });

  // Get Orders
  const getOrders = async () => {
    const page = searchParams.get("page") || 1;

    try {
      const response = await axiosInstance.get(`/orders?page=${page}`);
      if(response.data.orders) {
        setAllOrder(response.data.orders);
        setMeta(response.data.meta);
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    setConfig({
      showAddButton: false,
      addButtonLabel: '',
    });
    getOrders();
  }, [searchParams]);

  return (
      <div>
        <div>
            <OrderTable orders={allOrder} />

            <div className="mt-6 flex justify-between">
                <span className="text-gray-500 font-medium">
                    Page {meta.page} / {meta.totalPage}
                </span>
                <div className='flex gap-4'>
                   <button
                        disabled={meta.page <= 1}
                        onClick={() =>
                            setSearchParams({ page: Number(meta.page) - 1 })
                        }
                        className="text-gray-500 hover:text-black rounded-md border border-gray-300 py-1 px-3 hover:bg-gray-200 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <button
                        disabled={meta.page >= meta.totalPage}
                        onClick={() =>
                            setSearchParams({ page: Number(meta.page) + 1 })
                        }
                        className="text-gray-500 hover:text-black rounded-md border border-gray-300 py-1 px-3 hover:bg-gray-200 disabled:opacity-50"
                    >
                        Next
                    </button> 
                </div>
            </div>
        </div>
    </div>
  )
}

export default Order