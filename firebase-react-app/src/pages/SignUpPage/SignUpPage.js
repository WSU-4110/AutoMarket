import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth'; 
import { auth } from './../../firebase';
import './SignUpPage.css';
import Header from "./../../Header"; // Assuming Header is in this location relative to SignUpPage

function SignUpPage() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [message, setMessage] = useState("");

  const register = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      setMessage("Successfully registered!");

      setRegisterEmail("");
      setRegisterPassword("");
      
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
