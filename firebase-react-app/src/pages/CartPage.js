import React from 'react';

function CartTitle() {
  return <h1 className="underline-heading">Shopping Cart</h1>;
}
export { CartTitle };


// CartItem.js
import React from 'react';

function CartItem({ itemName, imageSrc, partNumber }) {
  return (
    <div>
      <h2>{itemName}</h2>
      <img src={imageSrc} alt={itemName} />
      <i>Part Number: {partNumber}</i>
    </div>
  );
}

export { CartItem };


// CartPage.js
import React from 'react';
import './CartPage.css';
import CartTitle from './CartTitle';
import CartItem from './CartItem';

function CartPage() {
  return (
    <div className="signup-container">
      <div className="signup-form">
        <CartTitle />
        <br />
        <br />
        <h2>My Cart</h2>
        <br />
        <br />
        <CartItem
          itemName="Break Pads"
          imageSrc="homeBreakPadsImage.jpg"
          partNumber="12345"
        />
        <CartItem
          itemName="Head Light"
          imageSrc="homeHeadlightImage.jpg"
          partNumber="67890"
        />
        <CartItem
          itemName="Spark Plug"
          imageSrc="homeSparkImage.jpg"
          partNumber="54321"
        />
      </div>
    </div>
  );
}

export default CartPage;
