import Header from "./../Header";
import React, { useState } from 'react';
import './CartPage.css';
import homeBreakPadsImage from "../images/homeBreakPadsImage.jpg"
import homeHeadlightImage from "../images/homeHeadlightImage.jpg"
import homeSparkImage from "../images/homeSparkImage.jpg"
function CartPage() {

  return (
    <>
    <Header/>
  <div className="shoppingcart-container">
    <div className='MyCart-container'>
     <h1 title="cart-title">MY CART</h1>
    </div>

    <br></br>

  <div className="product-container">

    <div className='order-summary-container'>
      <h2 title='order-title'>Order Summary</h2>
    </div>
    <div className='order-total-container'>
      <h2 title='subtotal-title'>Item(s) Subtotal:</h2> 
    </div>

    <div className="product">
      <div className="product-image">
        <img src={homeBreakPadsImage} alt="Break Pads"
        width="100px"
        height="80px" />
      </div>
      <div className="product-details">
        <h2>Break Pads</h2>
        <p>Part Number: 12345</p>
      </div>
    </div>

    <div className="product">
      <div className="product-image">
        <img src={homeHeadlightImage} alt="Head Light" 
        width="100px"
        height="80px" />
      </div>
      <div className="product-details">
        <h2>Head Light</h2>
        <p>Part Number: 67890</p>
      </div>
    </div>

    <div className="product">
      <div className="product-image">
        <img src={homeSparkImage} alt="Spark Plug" 
        width="100px"
        height="80px" />
      </div>
      <div className="product-details">
        <h2>Spark Plug</h2>
        <p>Part Number: 54321</p>
      </div>
    </div>
  </div>
</div>
</>
  );
}

export default CartPage;