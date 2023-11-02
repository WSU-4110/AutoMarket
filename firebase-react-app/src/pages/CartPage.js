import React from 'react';
import './CartPage.css';
import Header from "./../Header";

function CartPage() {
  return (
    <>
      <Header />

      <div className="signup-container">
        <div className="signup-form">
          <h1 className="underline-heading">Shopping Cart</h1>
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
    </>
  );
}

export default CartPage;
