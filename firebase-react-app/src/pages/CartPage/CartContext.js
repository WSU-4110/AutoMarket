import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext({
  cartItems: [],
  addToCart: () => {}
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
  
    const addToCart = (item) => {
      setCartItems(prevItems => [...prevItems, item]);
    };
  
    const removeFromCart = (index) => {
      setCartItems(prevItems => prevItems.filter((_, idx) => idx !== index));
    };
  

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
          {children}
        </CartContext.Provider>
  );
};
