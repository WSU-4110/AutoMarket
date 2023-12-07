import React from 'react';
import Header from "./../Header";
import './CartPage.css';
import homeBreakPadsImage from "../images/homeBreakPadsImage.jpg";
import homeHeadlightImage from "../images/homeHeadlightImage.jpg";
import homeSparkImage from "../images/homeSparkImage.jpg";

function CartPage() {
  // Function to render a single product
  const renderProduct = (image, title, partNumber) => (
    <div className="product">
      <div className="product-image">
        <img src={image} alt={title} width="100px" height="80px" />
      </div>
      <div className="product-details">
        <h2>{title}</h2>
        <p>Part Number: {partNumber}</p>
      </div>
    </div>
  );

  return (
    <>
      <Header/>
      <div className="shoppingcart-container">
        <div className='MyCart-container'>
          <h1 title="cart-title">MY CART</h1>
        </div>

        <div className="product-container">
          <div className='order-summary-container'>
            <h2 title='order-title'>Order Summary</h2>
          </div>
          <div className='order-total-container'>
            <h2 title='subtotal-title'>Item(s) Subtotal:</h2> 
          </div>

          {renderProduct(homeBreakPadsImage, "Break Pads", "12345")}
          {renderProduct(homeHeadlightImage, "Head Light", "67890")}
          {renderProduct(homeSparkImage, "Spark Plug", "54321")}
        </div>
      </div>
    </>
  );
}

export default CartPage;
