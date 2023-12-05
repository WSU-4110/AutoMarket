import React, { useState } from 'react';
import Header from './../../Header';
import { writePartData, uploadImageAndGetURL } from './../../firebase';
import { v4 as uuidv4 } from 'uuid';
import './SellersPage.css';

function SellersPage() {
  const [partName, setPartName] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [fits, setFits] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");

  const submitForm = async () => {
    try {
      if (!partName || !category || !subcategory || !fits || !price || !imageFile) {
        throw new Error("All fields including the image are required.");
      }

      const imageUrl = await uploadImageAndGetURL(imageFile);
      const partId = uuidv4();
      await writePartData(partId, partName, category, subcategory, fits, price, imageUrl);

      setMessage("Part submitted successfully!");
      setPartName("");
      setCategory("");
      setSubcategory("");
      setFits("");
      setPrice("");
      setImageFile(null);
    } catch (error) {
      console.error("Submission Error:", error);
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

        <div className="input-container">
        <label>Image:</label>
        <input
          type="file"
          onChange={(e) => setImageFile(e.target.files[0])}
          accept="image/*"
        />
      </div>

        <button className="submit-btn" onClick={submitForm}>
          Submit
        </button>

        {message && <div className="message">{message}</div>}  
      </div>

      {message && <div className="message">{message}</div>}
    </div>    
    </div>

  );
}

export default SellersPage;
