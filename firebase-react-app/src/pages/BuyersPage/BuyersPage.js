import React, { useState, useEffect } from 'react';
import { readPartsData } from './../../firebase';
import './BuyersPage.css';
import Header from './../../Header';
import Footer from "./../../Footer";
import NoPhotoAvailable from '../../images/NoPhotoAvailable.jpg';
import { useCart } from '../CartPage/CartContext';
import PartItem from './PartItem'; // Assuming you create a new component

// Custom hook for fetching parts
const useFetchParts = () => {
  const [parts, setParts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    readPartsData((fetchedParts) => {
      setParts(fetchedParts);
      setIsLoading(false);
    }).catch(error => {
      setError(error);
      setIsLoading(false);
    });
  }, []);

  return { parts, isLoading, error };
};

function MainBuyersPage() {
  const { parts, isLoading, error } = useFetchParts();
  const { addToCart } = useCart();

  const handleAddToCart = (part) => {
    console.log("Added to cart:", part);
    addToCart(part);
  };

  if (isLoading) return <p>Loading parts...</p>;
  if (error) return <p>Error loading parts: {error.message}</p>;

  return (
    <div className="buyers-container">
      <Header />
      <h1>Available Parts</h1>
      <div className="parts-list">
        {parts.length > 0 ? (
          parts.map(part => (
            <PartItem key={part.id} part={part} onAddToCart={handleAddToCart} />
          ))
        ) : (
          <p>No parts available at the moment.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default MainBuyersPage;
