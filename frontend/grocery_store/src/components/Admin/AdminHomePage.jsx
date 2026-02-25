import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axiosInstance from '../../utils/axiosInstance';

const AdminHome = () => {
  const [summary, setSummary] = useState({
    products: 0,
    customers: 0,
    orders: 0,
  });

  // Fetch dashboard summary counts
  const fetchCounts = async () => {
    try {
      const [productsRes, customersRes, ordersRes] = await Promise.all([
        axiosInstance.get('/admin/products?page=1'),
        axiosInstance.get('/users?page=1'),
        axiosInstance.get('/orders?page=1'),
      ]);

      setSummary({
        products: productsRes.data.meta.totalItem || 0,
        customers: customersRes.data.meta.totalItems || 0,
        orders: ordersRes.data.meta.totalItems || 0,
      });
    } catch (err) {
      console.error("Failed to fetch dashboard summary:", err);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <SummaryCard title="Products" count={summary.products} />
        <SummaryCard title="Customers" count={summary.customers} />
        <SummaryCard title="Orders" count={summary.orders} />
      </div>
    </div>
  );
};

function SummaryCard({ title, count, href }) {
  const CardContent = (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200">
      <h2 className="text-xl font-semibold text-gray-700 mb-2">{title}</h2>
      <p className="text-3xl font-bold text-green-500">{count}</p>
    </div>
  );

  return href ? (
    <Link to={href}>
      {CardContent}
    </Link>
  ) : (
    CardContent
  );
}

export default AdminHome;
