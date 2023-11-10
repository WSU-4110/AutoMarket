import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, writeUserData } from './../../firebase'; 
import './SignUpPage.css';
import Header from "./../../Header";

function SignUpPage() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const register = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      // Get the unique user ID from the authentication process
      const userId = userCredential.user.uid;

      // Save additional user data in Firebase Realtime Database
      writeUserData(userId, registerEmail, firstName, lastName, phoneNumber, registerPassword);

      // Clear the form fields
      setRegisterEmail("");
      setRegisterPassword("");
      setFirstName("");
      setLastName("");
      setPhoneNumber("");

      // Set a success message
      setMessage("Successfully registered!");

    } catch (error) {
      setMessage(`Registration Error: ${error.message}`);
    }
  };

  return (
    <>
      <Header />
      <div className="signup-container">
        <div className="signup-form">
          <h2>Register</h2>
          <div className="input-container">
            <label>First Name:</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter your first name" />
          </div>
          <div className="input-container">
            <label>Last Name:</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter your last name" />
          </div>
          <div className="input-container">
            <label>Phone Number:</label>
            <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Enter your phone number" />
          </div>
          <div className="input-container">
            <label>Email:</label>
            <input type="email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} placeholder="Enter your email for registration" />
          </div>
          <div className="input-container">
            <label>Password:</label>
            <input type="password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} placeholder="Enter your password for registration" />
          </div>
          <button className="signup-btn" onClick={register}>Register</button>
          {message && <div className="message">{message}</div>}
        </div>
      </div>
    </>
  );
}

export default SignUpPage;

