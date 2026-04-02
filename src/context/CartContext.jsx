import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Tạo một cái kho rỗng
const CartContext = createContext();

// 2. Tạo một cái móc (hook) để các component khác dễ dàng lấy đồ trong kho ra dùng
export const useCart = () => useContext(CartContext);

// 3. Tạo Nhà cung cấp (Provider) để bao bọc toàn bộ App
export const CartProvider = ({ children }) => {
  // Khởi tạo giỏ hàng từ localStorage
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('aurelia_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Tự động lưu bản mới nhất vào localStorage mỗi khi giỏ hàng đổi
  useEffect(() => {
    localStorage.setItem('aurelia_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Tính TỔNG SỐ LƯỢNG
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return; 
    setCartItems(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  // HÀM Quét sạch giỏ hàng (Xóa về mảng rỗng)
  const clearCart = () => {
    setCartItems([]);
  };

  // Nhớ phải có chữ "clearCart" ở trong cái value={...} này thì CheckoutPage mới gọi được!
  return (
    <CartContext.Provider value={{ cartItems, cartCount, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};