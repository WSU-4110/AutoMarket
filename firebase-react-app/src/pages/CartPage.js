import React, { useState, useEffect } from 'react';
import Header from './../Header';
import './CartPage.css';
import homeBreakPadsImage from '../images/homeBreakPadsImage.jpg';
import homeHeadlightImage from '../images/homeHeadlightImage.jpg';
import homeSparkImage from '../images/homeSparkImage.jpg';

function CartPage() {
  // Define the product data with prices
  const products = [
    { name: 'Break Pads', price: 32.49 },
    { name: 'Morimoto XB LED Headlights', price: 89.99 },
    { name: 'NGK Spark Plugs', price: 9.19 },
  ];

  // State to hold the subtotal
  const [subtotal, setSubtotal] = useState(0);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });
  const [cardSubmitted, setCardSubmitted] = useState(false);
  const [showDeliveryOptions, setShowDeliveryOptions] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
  });
  // State to hold delivery fees and tax
  const [deliveryFees, setDeliveryFees] = useState(5.99); // You can set this to your desired delivery fees
  const taxRate = 0.1;
  useEffect(() => {
    const subtotalAmount = products.reduce((acc, product) => acc + product.price, 0);
    const totalWithoutTax = subtotalAmount + deliveryFees;
    const tax = totalWithoutTax * taxRate;
    const totalWithTax = totalWithoutTax + tax;
    setSubtotal(totalWithTax);
  }, [products, deliveryFees, taxRate]);
  const handleDeliverySubmit = (event) => {
    event.preventDefault();
    // Add your logic for handling delivery submission
    // For now, you can console log the delivery information
    console.log('Delivery Information:', deliveryInfo);

    // Update state to indicate that the order has been submitted
    setOrderSubmitted(true);
  };

   // Function to handle submit of the credit card form
   const handleCardSubmit = (event) => {
    event.preventDefault();
    console.log('Card Information:', cardInfo);
    setCardSubmitted(true);
    console.log('cardSubmitted:', cardSubmitted); // Add this line for debugging
  };

   // Calculate the subtotal when the component mounts or when products change
   useEffect(() => {
    const total = products.reduce((acc, product) => acc + product.price, 0);
    setSubtotal(total);
  }, [products]);

  // Use useEffect to update the showDeliveryOptions state when isCheckingOut changes
  useEffect(() => {
    if (isCheckingOut && cardSubmitted) {
      setShowDeliveryOptions(true);
    }
  }, [isCheckingOut, cardSubmitted]);

  // Function to handle checkout click
  const handleCheckoutClick = () => {
    setIsCheckingOut(true);
  };
  const handleCardInputChange = (event, field) => {
    setCardInfo({
      ...cardInfo,
      [field]: event.target.value,
    });
  };
  const handleDeliveryInputChange = (event, field) => {
    setDeliveryInfo({
      ...deliveryInfo,
      [field]: event.target.value,
    });
  };

  // Render card information form if checking out
  const renderCardForm = () => (
    <div className="card-form-container">
      <h2>Enter Card Information</h2>
      <form onSubmit={handleCardSubmit}>
        {/* Card input fields */}
        <div className="card-input">
          <label htmlFor="cardNumber">Card Number:</label>
          <input
            type="text"
            id="cardNumber"
            value={cardInfo.cardNumber}
            onChange={(e) => handleCardInputChange(e, 'cardNumber')}
            required
          />
        </div>
        <div className="card-input">
          <label htmlFor="expirationDate">Expiration Date:</label>
          <input
            type="text"
            id="expirationDate"
            value={cardInfo.expirationDate}
            onChange={(e) => handleCardInputChange(e, 'expirationDate')}
            required
          />
        </div>
        <div className="card-input">
          <label htmlFor="cvv">CVV:</label>
          <input
            type="text"
            id="cvv"
            value={cardInfo.cvv}
            onChange={(e) => handleCardInputChange(e, 'cvv')}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
  // Render delivery options form
  const renderDeliveryOptionsForm = () => (
    <div className="delivery-options-container">
      <h2>Delivery Options</h2>
      <form onSubmit={handleDeliverySubmit}>
        <div className="delivery-input">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            // Add state and onChange handler if needed
            required
          />
        </div>
        <div className="delivery-input">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            // Add state and onChange handler if needed
            required
          />
        </div>
        <div className="delivery-input">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            // Add state and onChange handler if needed
            required
          />
        </div>
        <div className="delivery-input">
          <label htmlFor="zipCode">Zip Code:</label>
          <input
            type="text"
            id="zipCode"
            // Add state and onChange handler if needed
            required
          />
        </div>
        <div className="delivery-input">
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            // Add state and onChange handler if needed
            required
          />
        </div>
        {/* Add more fields as needed */}
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
  
  
  
  return (
    <>
      <Header />
      <div className="shoppingcart-container">
        
        <div className="MyCart-container">
          <h1 title="cart-title">MY <span>CART</span></h1>
        </div>

        <br />

        <div className="product-container">
          <div className="order-summary-container">
            <h2 title="order-title">Order Summary</h2>
          </div>
          <div className="order-total-container">
            <h2 title="subtotal-title">Item(s) Subtotal:</h2>
          </div>

          <div className="product">
            <div className="product-image">
              <img
                src={homeBreakPadsImage}
                alt="Break Pads"
                width="100px"
                height="80px"
              />
            </div>
            <div className="product-details">
              <h2>Break Pads</h2>
              <p>Part Number: 12345</p>
            </div>
            <div className="product-price">
              $32.49 {/* Replace this with the actual price */}
            </div>
            <div className="remove-button-container">
              <button className="remove-button">X</button>
            </div>
          </div>

          <div className="product">
            <div className="product-image">
              <img
                src={homeHeadlightImage}
                alt="Head Light"
                width="100px"
                height="80px"
              />
            </div>
            <div className="product-details">
              <h2>Morimoto XB LED Headlights</h2>
              <p>Part Number: 67890</p>
            </div>
            <div className="product-price">
              $89.99 {/* Replace this with the actual price */}
            </div>
            <div className="remove-button-container">
              <button className="remove-button">X</button>
            </div>
          </div>

          <div className="product">
            <div className="product-image">
              <img
                src={homeSparkImage}
                alt="Spark Plug"
                width="100px"
                height="80px"
              />
            </div>
            <div className="product-details">
              <h2>NGK Spark Plugs</h2>
              <p>Part Number: 54321</p>
            </div>
            <div className="product-price">
              $9.19 {/* Replace this with the actual price */}
            </div>
            <div className="remove-button-container">
              <button className="remove-button">X</button>
            </div>
          </div>

          <div className="subtotal-box">
            <h2>SUBTOTAL</h2>
            <div className="subtotal-total">${subtotal.toFixed(2)}</div>
            <p className="small-text">Taxes and shipping calculated at checkout</p>
          </div>

          {isCheckingOut && renderCardForm()}

      {/* Show Delivery Options only if credit card info is submitted */}
      {showDeliveryOptions && (
        <div className="delivery-options">
          {renderDeliveryOptionsForm()}
        </div>
      )}

{!isCheckingOut && (
        <div className="checkout-container">
          <button className="checkout-button" onClick={handleCheckoutClick}>
            Checkout
          </button>
        </div>
      )}
        </div>
      </div>
    </>
  );
}

export default CartPage;
