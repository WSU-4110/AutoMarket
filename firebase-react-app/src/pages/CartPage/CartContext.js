import React, { createContext, useReducer, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      // Optionally, prevent duplicates or increase quantity here
      return [...state, action.item];
    case 'REMOVE':
      return state.filter(item => item.id !== action.id);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
};

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, dispatch] = useReducer(cartReducer, []);

    const addToCart = item => dispatch({ type: 'ADD', item });
    const removeFromCart = id => dispatch({ type: 'REMOVE', id });
    const clearCart = () => dispatch({ type: 'CLEAR' });

    const contextValue = useMemo(() => ({
      cartItems,
      addToCart,
      removeFromCart,
      clearCart
    }), [cartItems]);

    return (
        <CartContext.Provider value={contextValue}>
          {children}
        </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired
};
