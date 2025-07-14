import React, { useContext, useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { CartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { MdDelete } from 'react-icons/md';
import { FaTrashAlt } from 'react-icons/fa';
import { FaCcVisa, FaPaypal, FaMoneyCheckAlt } from 'react-icons/fa';
import axiosInstance from '../../utils/axiosInstance';

const Payment = () => {
  const { cartItems } = useContext(CartContext);
  const { removeFromCart } = useContext(CartContext);
  const { userInfo } = useContext(UserContext);
  const [selectedMethod, setSelectedMethod] = useState('card');

  const methods = [
    { id: 'card', label: 'Credit/Debit Card', icon: <FaCcVisa className="text-gray-700" /> },
    { id: 'paypal', label: 'PayPal', icon: <FaPaypal className="text-blue-600" /> },
    { id: 'offline', label: 'Pay Offline', icon: <FaMoneyCheckAlt className="text-gray-600" /> }
  ];

  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 0
  );
  const delivery = 1.99;
  const total = subtotal + delivery;
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.quantity, 0
  )

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    phoneNumber: '',
    address: ''
  });

  useEffect(() => {
    if (userInfo) {
        setFormData({
            email: userInfo.email || '',
            username: userInfo.username || '',
            phoneNumber: userInfo.phoneNumber || '',
            address: userInfo.address || ''
        });
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onClose = () => {
    navigate("/");
  };

  const handlePlaceOrder = async () => {
    try {
      const response = await axiosInstance.post("/create-order", {
        totalAmount: totalAmount,
        totalPrice: total,
        userId: userInfo.id
      })
      if(response.data && response.data.order) {
        const order = response.data.order;
        
        await Promise.all(cartItems.map((item) => {
          axiosInstance.post("/create-order-detail", {
            orderId: order.id,
            productId: item.id,
            quantity: item.quantity,
            pricePerUnit: item.price
          })
        }))

        await axiosInstance.post("/create-payment", {
          orderId: order.id,
          method: selectedMethod,
          amount: total
        })
        navigate("/success-order");
      }
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <div>
      {/* Header */}
      <div className='flex justify-between items-center my-4 ml-4 mr-8'>
        <h1 className='text-2xl font-semibold'>Checkout</h1>
        <MdClose onClick={onClose} className="text-gray-500 hover:text-black cursor-pointer" size={20} />
      </div>

      {/* Order Summary */}
      {cartItems.length === 0 ? (
        <div className='flex items-center justify-center h-[60vh]'>
          <p className="text-xl text-gray-500">Your cart is empty.</p>
        </div>
      ) : (
        <div className='flex justify-end '>
          <div className='flex-1 p-4'>
            <h2 className='text-lg font-semibold mb-4'>Order Summary</h2>
              {cartItems.map(item => (
                <div key={item.id} className='flex justify-between items-center border border-gray-300 rounded-lg py-2 mb-4'>
                  <div className="flex space-x-4 items-center ml-4">
                    <img src={item.imageUrl} alt={item.name} className="w-20 h-20 rounded" />
                    <div>
                      <p className='text-sm font-semibold'>{item.name}</p>
                      <p className='text-xs text-slate-600'>Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className='flex mr-4'>
                    <p className="text-sm font-semibold mr-4">${(item.price * item.quantity).toFixed(2)}</p>
                    <MdDelete 
                      className='text-red-500 hover:text-red-700 cursor-pointer' 
                      size={18}
                      onClick={() => removeFromCart(item.id)}
                    />
                  </div>
                </div>
              ))}
            
            <div className='space-y-2 border-t border-gray-300 py-4'>
                <div className='flex justify-between items-center'>
                    <p className='text-slate-500'>Subtotal</p>
                    <p className='text-slate-500'>${subtotal.toFixed(2)}</p>
                </div>
                <div className='flex justify-between items-center'>
                    <p className='text-slate-500'>Local Delivery</p>
                    <p className='text-slate-500'>${delivery.toFixed(2)}</p>
                </div>
            </div>

            <div className='space-y-2 border-t border-gray-300 py-4'>
                <div className='flex justify-between items-center'>
                    <p className='font-bold text-lg'>Total</p>
                    <p className='font-bold text-lg'>${total.toFixed(2)}</p>
                </div>
            </div>

            <h2 className='font-semibold text-lg'>Payment Method</h2>
            <div className="space-y-3 mt-4">
              {methods.map(method => (
                <label
                  key={method.id}
                  htmlFor={method.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition
                    ${selectedMethod === method.id
                      ? 'bg-blue-50 border-blue-500'
                      : 'border-gray-300 bg-white hover:border-blue-400'}`}
                >
                  <input
                    type="radio"
                    id={method.id}
                    name="paymentMethod"
                    value={method.id}
                    checked={selectedMethod === method.id}
                    onChange={() => setSelectedMethod(method.id)}
                    className="form-radio accent-blue-600"
                  />
                  {method.icon}
                  <span className="text-sm font-medium">{method.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/*Payment Information*/}
          <div className='flex-1 px-8 py-6 space-y-4 mr-8'>
            <h2 className='font-semibold text-lg'>Customer Information</h2>
            <div>
                <label className="block text-sm font-medium mb-1" htmlFor="name">Email Address</label>
                <input
                    id="email"
                    name="email"
                    type="text"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="w-full px-3 py-3 text-sm border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1" htmlFor="name">Username</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    className="w-full px-3 py-3 text-sm border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1" htmlFor="name">Phone Number</label>
                <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    placeholder="Enter your phone number"
                    className="w-full px-3 py-3 text-sm border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                />
            </div>

            <h2 className='font-semibold text-lg border-t border-gray-300 pt-4'>Card Information</h2>
            <div className='space-y-4'>
              <div>
                <label htmlFor='cardName' className='block text-sm font-medium text-gray-700 mb-1'>Name on Card</label>
                <input 
                  type="text"
                  id='cardName'
                  name='cardName'
                  placeholder='Soy Chanratana'
                  className='w-full border p-3 text-sm rounded-lg focus:outline-none focus:ring focus:border-blue-500'
                />
              </div>

              <div>
                <label htmlFor='cardNumber' className='block text-sm font-medium text-gray-700 mb-1'>Card Number</label>
                <input 
                  type="text"
                  id='cardNumber'
                  name='cardNumber'
                  placeholder='1234 5678 9012 3456'
                  className='w-full border p-3 text-sm rounded-lg focus:outline-none focus:ring focus:border-blue-500'
                />
              </div>

              <div className='flex gap-3'>
                <div className='flex-1'>
                  <label htmlFor='expiry' className='block text-sm font-medium text-gray-700 mb-1'>Expiry Date</label>
                  <input 
                    type="text"
                    id='expiry'
                    name='expiry'
                    placeholder='MM/YY'
                    className='w-full border p-3 text-sm rounded-lg focus:outline-none focus:ring focus:border-blue-500'
                  />
                </div>
                <div className='flex-1'>
                  <label htmlFor='cvv' className='block text-sm font-medium text-gray-700 mb-1'>CVV</label>
                  <input 
                    type="text"
                    id='cvv'
                    name='cvv'
                    placeholder='123'
                    className='w-full border p-3 text-sm rounded-lg focus:outline-none focus:ring focus:border-blue-500'
                  />
                </div>
              </div>

              <hr className="border-t border-gray-200" />

              <button className='block mx-auto p-3 primary-btn' onClick={handlePlaceOrder}>Place Order</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
