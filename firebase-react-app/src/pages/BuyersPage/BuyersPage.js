import React, { useState, useEffect } from 'react';
import { readPartsData } from './../../firebase'; 
import './BuyersPage.css';
import Header from "./../../Header";
import NoPhotoAvailable from '../../images/NoPhotoAvailable.jpg';

function MainBuyersPage() {
  const [parts, setParts] = useState([]);

  useEffect(() => {
    readPartsData((fetchedParts) => {
      setParts(fetchedParts);
    });
  }, []);

  return (
    <div className="buyers-container">
            <Header />
      <h1>Available Parts</h1>
      <div className="parts-list">
        {parts.length > 0 ? (
          parts.map(part => (
            <div key={part.id} className="part-item">
              <h2>{part.partName}</h2>
              <img 
                src={part.imagePath || NoPhotoAvailable} 
                alt={part.partName} 
                className="part-image"
              />
              <div className="part-details">
                <p>Category: {part.category}</p>
                <p>Fits: {part.fits}</p>
                <p>Price: ${part.price}</p>
                <p>Sold by: {part.sellerName}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No parts available at the moment.</p>
        )}
      </div>
    </div>
  );
}

export default MainBuyersPage;
