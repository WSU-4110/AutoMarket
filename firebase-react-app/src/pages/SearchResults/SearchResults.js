import React, { useContext } from 'react';
import { SearchContext } from './SearchContext';
import NoPhotoAvailable from '../../images/NoPhotoAvailable.jpg';
import Header from "./../../Header";

const SearchResults = () => {
  const { searchResults } = useContext(SearchContext);

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
                src={part.imageUrl || NoPhotoAvailable}  // Change here
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
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
