import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { UserContext } from './UserContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { userInfo } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const initialized = useRef(false);

  // 1) Load this user’s cart from localStorage once
  useEffect(() => {
    if (!userInfo?.id || initialized.current) return;

    const stored = localStorage.getItem(`cartItems_${userInfo.id}`);
    if (stored) setCartItems(JSON.parse(stored));

    initialized.current = true;
  }, [userInfo]);

  // 2) Whenever cart changes, save it under a user-specific key
  useEffect(() => {
    if (!userInfo?.id || !initialized.current) return;
    localStorage.setItem(`cartItems_${userInfo.id}`, JSON.stringify(cartItems));
  }, [cartItems, userInfo]);

  const addToCart = (product, quantity) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = id =>
    setCartItems(prev => prev.filter(item => item.id !== id));

  const clearCart = () => {
    setCartItems([]);
    if (userInfo?.id) {
      localStorage.removeItem(`cartItems_${userInfo.id}`);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
