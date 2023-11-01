import React, { useState } from 'react';
import './CartPage.css';

function CartPage() {

  return (
  <div className="shoppingcart-container">
  <div className="MyCart-form">
  </div>

  <h1 title="cart-title">MY CART</h1>
  <br />

  <div className="product-container">
    <div className="product">
      <div className="product-image">
        <img src="../images/homeBreakPadsImage.jpg" alt="Break Pads" />
      </div>
      <div className="product-details">
        <h2>Break Pads</h2>
        <p>Part Number: 12345</p>
      </div>
    </div>

    <div className="product">
      <div className="product-image">
        <img src="../images/homeHeadlightImage.jpg" alt="Head Light" />
      </div>
      <div className="product-details">
        <h2>Head Light</h2>
        <p>Part Number: 67890</p>
      </div>
    </div>

    <div className="product">
      <div className="product-image">
        <img src="../images/homeSparkImage.jpg" alt="Spark Plug" />
      </div>
      <div className="product-details">
        <h2>Spark Plug</h2>
        <p>Part Number: 54321</p>
      </div>
    </div>
  </div>
</div>

  );
}

export default CartPage;
