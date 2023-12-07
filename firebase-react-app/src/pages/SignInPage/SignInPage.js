import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'; 
import { auth } from './../../firebase';
import './SignInPage.css';
import Header from "./../../Header";

function App() {

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
    <>
      <Header />

      <div className="signin-container">
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
          <br></br>
        </div>

        <div className="logout-section">
          <h2>Logout</h2>  <br></br>

          {currentUser && (
            <span className="user-info">
              Logged in as: {currentUser?.email}
              <br></br> <br></br>
            </span>
          )}
          <button className="signin-btn" onClick={logout}>Logout</button>
        </div>

        {message && <div className="message">{message}</div>}
      </div>
    </>
  );
}

export default App;
