import React, { useState } from 'react';
import './SellersPage.css';
import Header from "./../../Header";
import { writePartData } from './../../firebase';
import { v4 as uuidv4 } from 'uuid'; 

function SellersPage() {
  const [partName, setPartName] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [fits, setFits] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");

  const submitForm = async () => {
    try {
      if (!partName || !category || !subcategory || !fits || !price) {
        throw new Error("All fields are required.");
      }

      const partId = uuidv4();

      console.log("Submitting:", { partName, category, subcategory, fits, price });
      await writePartData(partId, partName, category, subcategory, fits, price);

      setMessage("Form submitted successfully!");
      setPartName("");
      setCategory("");
      setSubcategory("");
      setFits("");
      setPrice("");
    } catch (error) {
      console.error(error);
      setMessage(`Submission Error: ${error.message}`);
    }
  };

  return (
    <div> 
          <Header />
    <div className="sellers-container">
      <div className="sellers-form">
        <h2>Sellers</h2>

        <div className="input-container">
          <label>Part Name:</label>
          <input
            type="text"
            value={partName}
            onChange={(e) => setPartName(e.target.value)}
            placeholder="Enter part name"
          />
        </div>

        <div className="input-container">
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter category"
          />
        </div>

        <div className="input-container">
          <label>Subcategory:</label>
          <input
            type="text"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            placeholder="Enter subcategory"
          />
        </div>

        <div className="input-container">
          <label>Fits:</label>
          <input
            type="text"
            value={fits}
            onChange={(e) => setFits(e.target.value)}
            placeholder="Enter fits details"
          />
        </div>

        <div className="input-container">
          <label>Price:</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
          />
        </div>

        <button className="submit-btn" onClick={submitForm}>
          Submit
        </button>
      </div>

      {message && <div className="message">{message}</div>}
    </div>    
    </div>

  );
}

export default SellersPage;
