import React, { useState, useEffect } from 'react';
import './SellersPage.css';

function SellersPage() {
  const [partId, setPartId] = useState("");
  const [partName, setPartName] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [fits, setFits] = useState("");
  const [message, setMessage] = useState("");

  const submitForm = async () => {
    try {
      // Here you can handle form submission, for instance sending the data to your backend
      // For now, we're just showcasing a successful submission message
      setMessage("Form submitted successfully!");
      
      setPartId("");
      setPartName("");
      setCategory("");
      setSubcategory("");
      setFits("");
      
    } catch (error) {
      setMessage(`Submission Error: ${error.message}`);
    }
  };

  return (
    <div className="sellers-container">

      <div className="sellers-form">
        <h2>Sellers</h2>

        <div className="input-container">
          <label>Part ID:</label>
          <input type="text" value={partId} onChange={(e) => setPartId(e.target.value)} placeholder="Enter part ID" />
        </div>
        
        <div className="input-container">
          <label>Part Name:</label>
          <input type="text" value={partName} onChange={(e) => setPartName(e.target.value)} placeholder="Enter part name" />
        </div>

        <div className="input-container">
          <label>Category:</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Enter category" />
        </div>

        <div className="input-container">
          <label>Subcategory:</label>
          <input type="text" value={subcategory} onChange={(e) => setSubcategory(e.target.value)} placeholder="Enter subcategory" />
        </div>

        <div className="input-container">
          <label>Fits:</label>
          <input type="text" value={fits} onChange={(e) => setFits(e.target.value)} placeholder="Enter fits details" />
        </div>

        <button className="submit-btn" onClick={submitForm}>Submit</button>
      </div>

      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default SellersPage;
