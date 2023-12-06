import React, { useContext } from 'react';
import { SearchContext } from './SearchContext';
import NoPhotoAvailable from '../../images/NoPhotoAvailable.jpg';
import Header from "./../../Header";

const SearchResults = () => {
  const { searchResults } = useContext(SearchContext);

  const handleAddToCart = (partId) => {
    // Logic to handle adding the part to the cart
    console.log("Added to cart:", partId);
  };

  return (
    <div className="buyers-container">
      <Header />
      <h1>Search Results</h1>
      <div className="parts-list">
        {searchResults.length > 0 ? (
          searchResults.map(part => (
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
                <button onClick={() => handleAddToCart(part.id)} className="add-to-cart-btn">
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
