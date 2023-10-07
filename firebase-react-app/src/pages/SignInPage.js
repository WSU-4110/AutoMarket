import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'; 
import { auth } from './../firebase';
import './SignInPage.css';

function App() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const register = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      setCurrentUser(userCredential.user);
      setMessage("Successfully registered!");

      setRegisterEmail("");
      setRegisterPassword("");
      
    } catch (error) {
      setMessage(`Registration Error: ${error.message}`);
    }
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      setMessage("Successfully logged in!");

      setLoginEmail("");
      setLoginPassword("");
      
    } catch (error) {
      setMessage(`Login Error: ${error.message}`);
    }
  };

  const logout = async() => {
    try {
      await signOut(auth);
      setMessage("Successfully logged out!");
    } catch (error) {
      setMessage(`Logout Error: ${error.message}`);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-form">
        <h2>Register</h2>
        <div className="input-container">
          <label>Email:</label>
          <input type="email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} placeholder="Enter your email for registration" />
        </div>

        <div className="input-container">
          <label>Password:</label>
          <input type="password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} placeholder="Enter your password for registration" />
        </div>
        <button className="signin-btn" onClick={register}>Register</button>
      </div>

      <div className="signin-form">
        <h2>Login</h2>
        <div className="input-container">
          <label>Email:</label>
          <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="Enter your email" />
        </div>
        <div className="input-container">
          <label>Password:</label>
          <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="Enter your password" />
        </div>
        <button className="signin-btn" onClick={login}>Login</button>
      </div>

      <div className="logout-section">
        <h2>Logout</h2>
        {currentUser && (
          <span className="user-info">
            Logged in as: {currentUser?.email}
          </span>
        )}
        <button className="signin-btn" onClick={logout}>Logout</button>
      </div>

      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default App;
