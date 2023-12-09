import React, { useMemo } from 'react';
import Header from './../../Header';
import './CartPage.css';
import { useCart } from './CartContext';
import NoPhotoAvailable from '../../images/NoPhotoAvailable.jpg';

function CartPage() {
  const { cartItems, removeFromCart } = useCart();

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const itemPrice = parseFloat(item.price) || 0;
      return acc + itemPrice;
    }, 0);
  }, [cartItems]);

  return (
    <>
      <Header />
      <main className="shoppingcart-container">
        <h1 title="cart-title">MY CART</h1>

        {cartItems.length > 0 ? (
          <div className="product-container">
            {cartItems.map((item, index) => (
              <article key={item.id || index} className="product">
                <div className="product-image">
                  <img
                    src={item.imageUrl || NoPhotoAvailable}
                    alt={item.partName}
                    className="cart-product-image"
                  />
                </div>
                <div className="product-details">
                  <h2>{item.partName}</h2>
                  <p>Price: ${item.price}</p>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id || index)} 
                  className="remove-button"
                  aria-label={`Remove ${item.partName} from cart`}>
                    Remove
                </button>
              </article>
            ))}
            <div className="subtotal-box">
              <h2>SUBTOTAL</h2>
              <div className="subtotal-total">
                ${subtotal.toFixed(2)}
              </div>
            </div>
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </main>
    </>
  );
}

export default CartPage;
