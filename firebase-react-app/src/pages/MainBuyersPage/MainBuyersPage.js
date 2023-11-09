import React, { useState } from 'react';
import './MainBuyersPage.css';

function MainBuyersPage() {
  const [itemName, setItemName] = useState("Example Item");
  const [itemImage, setItemImage] = useState("/path/to/image.jpg"); // replace with your image path
  const [price, setPrice] = useState(99.99); // replace with your price
  const [stock, setStock] = useState(10); // replace with your stock number
  const [sellerName, setSellerName] = useState("Sellers Name"); // replace with your seller's name
  const [quantity, setQuantity] = useState(9);
  const [purchaseMessage, setPurchaseMessage] = useState("");

  const handlePurchase = () => {
    if (quantity > stock) {
      setPurchaseMessage("Not enough stock for your purchase amount.");
    } else {
      // Here you would handle the purchase, like sending data to the backend
      setStock(stock - quantity); // Update stock
      setPurchaseMessage(`You have successfully purchased ${quantity} item(s) of ${itemName}.`);
    }
  };

  return (
    <div className="buyers-container">
      <div className="item-info">
        <h2>{itemName}</h2>
        <img src={itemImage} alt={itemName} />
        <p className="price">Price: ${price.toFixed(2)}</p>
        <p className="stock">In Stock: {stock}</p>
        <p className="seller-name">Sold by: {sellerName}</p>
        <div className="purchase-form">
          <label htmlFor="quantity">Quantity:</label>
          <input 
            type="number" 
            id="quantity" 
            value={quantity} 
            min="1" 
            max={stock}
            onChange={(e) => setQuantity(Math.max(1, Math.min(stock, Number(e.target.value))))} 
            placeholder="Enter quantity" 
          />
          <button className="purchase-btn" onClick={handlePurchase}>Purchase</button>
        </div>
        {purchaseMessage && <div className="message">{purchaseMessage}</div>}
      </div>
    </div>
  );
}

export default MainBuyersPage;
