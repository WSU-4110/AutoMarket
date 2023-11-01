import React, { useState } from 'react';
import './CartPage.css';

function CartPage() {

  return (
    <div className="shoppingcart-container">

      <div className="shoppingcart-form">
       
      <h2>Shopping Cart</h2>
        <br></br>
        <br></br>

        <h2>My Cart</h2>
        <br></br>
        <br></br>

        <h2>Break Pads</h2>
        <img src="homeBreakPadsImage.jpg" alt=" Break Pads"></img>
        <i>Part Number: </i>
        <br></br>
        <br></br>

        <h2>Head Light</h2>
        <img src="homeHeadlightImage.jpg" alt="Head Light"></img>
        <i>Part Number: </i>
        <br></br>
        <br></br>
    
        <h2>Spark Plug</h2>
        <img src="homeSparkImage.jpg" alt="Spark Plug"></img>
        <i>Part Number: </i>
        <br></br>
        <br></br>
      </div>

    </div>

  );
}

export default CartPage;
