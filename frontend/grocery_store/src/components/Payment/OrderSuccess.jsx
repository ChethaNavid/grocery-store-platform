import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

export default function OrderSuccess() {
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <CheckCircle className="mx-auto mb-4 text-primary" size={64} />
        <h1 className="text-2xl font-bold mb-2">Order Successful!</h1>
        <p className="text-gray-600 mb-4">Thank you for your purchase.</p>
        <p className="text-sm text-slate-500 mb-6">Your Order is confirmed.</p>

        <div className="space-y-4">
          <button
            variant="outline" 
            onClick={() => {
                clearCart();
                navigate('/');
            }}
            className="p-3 rounded-lg bg-primary text-white outline:none hover:bg-secondary"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
