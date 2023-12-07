import React, { useState, useEffect } from 'react';
import { readPartsData } from './../../firebase';
import './BuyersPage.css';
import Header from './../../Header';
import Footer from "./../../Footer";
import NoPhotoAvailable from '../../images/NoPhotoAvailable.jpg';
import { useCart } from '../CartPage/CartContext';

function MainBuyersPage() {
  const [parts, setParts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    readPartsData((fetchedParts) => {
      setParts(fetchedParts);
      setIsLoading(false);
    });
  }, []);

  const handleAddToCart = (part) => {
    console.log("Added to cart:", part);
    addToCart(part);
  };
  

  return (
    <div className="buyers-container">
      <Header />
      <h1>Available Parts</h1>
      {isLoading ? (
        <p>Loading parts...</p>
      ) : (
        <div className="parts-list">
          {parts.length > 0 ? (
            parts.map(part => (
              <div key={part.id} className="part-item">
                <h2>{part.partName}</h2>
                <img 
                  src={part.imageUrl || NoPhotoAvailable}
                  alt={part.partName} 
                  className="part-image"
                />
                <div className="part-details">
                  <p>Category: {part.category}</p>
                  <p>Fits: {part.fits}</p>
                  <p>Price: ${part.price}</p>
                  <button onClick={() => handleAddToCart(part)} className="add-to-cart-btn">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No parts available at the moment.</p>
          )}
        </div>
      )}
        <Footer />
    </div>
  );
}

export default MainBuyersPage;
