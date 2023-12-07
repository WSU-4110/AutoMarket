import React, { useState, useEffect } from 'react';
import Header from './../../Header';
import './CartPage.css';
import { useCart } from './CartContext';
import NoPhotoAvailable from '../../images/NoPhotoAvailable.jpg';


function CartPage() {
  const { cartItems, removeFromCart } = useCart();
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => {
      const itemPrice = parseFloat(item.price) || 0; 
      return acc + itemPrice;
    }, 0);
    setSubtotal(total);
  }, [cartItems]);
  

  return (
    <>
      <Header />
      <div className="shoppingcart-container">
        <h1 title="cart-title">MY CART</h1>

        <div className="product-container">
          {cartItems.map((item, index) => (
            <div key={index} className="product">
              <div className="product-image">
                <img
                  src={item.imageUrl || NoPhotoAvailable}
                  alt={item.partName}
                  width="100px"
                  height="80px"
                />
              </div>
              <div className="product-details">
                <h2>{item.partName}</h2>
                <p>Price: ${item.price}</p>
              </div>
              <button onClick={() => removeFromCart(index)} className="remove-button">Remove</button>
            </div>
          ))}
          <div className="subtotal-box">
            <h2>SUBTOTAL</h2>
            <div className="subtotal-total">
              ${typeof subtotal === 'number' ? subtotal.toFixed(2) : '0.00'}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPage;
