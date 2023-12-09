import React, { useState, useEffect } from 'react';
import Header from './../../Header';
import { writePartData, uploadImageAndGetURL, auth } from './../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';
import './SellersPage.css';

function SellersPage() {
  const [formData, setFormData] = useState({
    partName: "",
    category: "",
    subcategory: "",
    fits: "",
    price: "",
    imageFile: null
  });
  const [sellerName, setSellerName] = useState("Anonymous");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.displayName) {
        setSellerName(currentUser.displayName);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: files ? files[0] : value
    }));
  };

  const resetForm = () => {
    setFormData({
      partName: "",
      category: "",
      subcategory: "",
      fits: "",
      price: "",
      imageFile: null
    });
  };

  const submitForm = async () => {
    try {
      const { partName, category, subcategory, fits, price, imageFile } = formData;
      if (!partName || !category || !subcategory || !fits || !price || !imageFile) {
        throw new Error("All fields including the image are required.");
      }
      
      setIsSubmitting(true);
      const imageUrl = await uploadImageAndGetURL(imageFile);
      const partId = uuidv4();
      await writePartData(partId, partName, category, subcategory, fits, price, imageUrl, sellerName);

      setMessage("Part submitted successfully!");
      resetForm();
    } catch (error) {
      console.error("Submission Error:", error);
      setMessage(`Submission Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="sellers-container">
        <div className="sellers-form">
          <h2>Sellers</h2>
          {/* Form inputs here, use handleChange for all inputs */}
          <button className="submit-btn" onClick={submitForm} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
          {message && <div className="message">{message}</div>}
        </div>
      </div>
    </div>
  );
}

export default SellersPage;
