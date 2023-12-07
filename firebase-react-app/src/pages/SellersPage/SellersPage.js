import React, { useState } from 'react';
import './SellersPage.css';
import Header from "./../../Header";
import { writePartData } from './../../firebase';
import { v4 as uuidv4 } from 'uuid'; 

function SellersPage() {
  const [partData, setPartData] = useState({
    partName: "",
    category: "",
    subcategory: "",
    fits: "",
    price: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPartData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const submitForm = async () => {
    try {
      const { partName, category, subcategory, fits, price } = partData;
      if (!partName || !category || !subcategory || !fits || !price) {
        throw new Error("All fields are required.");
      }

      const partId = uuidv4();
      console.log("Submitting:", partData);
      await writePartData(partId, partName, category, subcategory, fits, price);

      setMessage("Form submitted successfully!");
      setPartData({ partName: "", category: "", subcategory: "", fits: "", price: "" });
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

          {Object.entries(partData).map(([key, value]) => (
            <div className="input-container" key={key}>
              <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleChange}
                placeholder={`Enter ${key}`}
              />
            </div>
          ))}

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
