import React, { useContext, useCallback } from 'react';
import { SearchContext } from './SearchContext';
import NoPhotoAvailable from '../../images/NoPhotoAvailable.jpg';
import Header from "./../../Header";

const PartItem = ({ part, onAddToCart }) => (
  <div key={part.id} className="part-item">
    <h2>{part.partName}</h2>
    <img 
      src={part.imageUrl || NoPhotoAvailable}
      alt={part.partName} 
      loading="lazy"
      className="part-image"
    />
    <div className="part-details">
      <p>Category: {part.category}</p>
      <p>Fits: {part.fits}</p>
      <p>Price: ${part.price}</p>
      <button onClick={() => onAddToCart(part.id)} className="add-to-cart-btn" aria-label={`Add ${part.partName} to cart`}>
        Add to Cart
      </button>
    </div>
  </div>
);

const SearchResults = () => {
  const { searchResults } = useContext(SearchContext);

  const handleAddToCart = useCallback((partId) => {
    console.log("Added to cart:", partId);
    // Additional logic to handle adding the part to the cart
  }, []);

  return (
    <div className="buyers-container">
      <Header />
      <h1>Search Results</h1>
      <div className="parts-list">
        {searchResults.length > 0 ? (
          searchResults.map(part => (
            <PartItem key={part.id} part={part} onAddToCart={handleAddToCart} />
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
