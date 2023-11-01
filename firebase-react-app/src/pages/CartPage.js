import React, { useState } from 'react';
import './CartPage.css';

function CartPage() {

  return (
    <div className="shoppingcart-container">
      <div className="MyCart-form">
        </div>

      <h1 title="cart-title">MY CART</h1>
      <br></br>

      <div className="product-container"> 
        <div className="product">
          <h2>Break Pads</h2>
          <img src="homeBreakPadsImage.jpg" alt="Break Pads" />
          <i>Part Number: </i>
          <br /><br />
        </div>

        <div className="product">
          <h2>Head Light</h2>
          <img src="homeHeadlightImage.jpg" alt="Head Light" />
          <i>Part Number: </i>
          <br /><br />
        </div>

        <div className="product">
          <h2>Spark Plug</h2>
          <img src="homeSparkImage.jpg" alt="Spark Plug" />
          <i>Part Number: </i>
          <br /><br />
        </div>
      </div>
    </div>


  );
}

export default CartPage;
