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
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = React.createRef();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
    });
    emailRef.current?.focus();
    return () => unsubscribe();
  }, []);

  const login = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      setMessage("");
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      setMessage("Successfully logged in!");
      setLoginEmail("");
      setLoginPassword("");
    } catch (error) {
      setMessage(`Login Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      setMessage("");
      await signOut(auth);
      setMessage("Successfully logged out!");
    } catch (error) {
      setMessage(`Logout Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="signin-container">
        <form className="signin-form" onSubmit={login}>
          <h2>Login</h2>
          <div className="input-container">
            <label>Email:</label>
            <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="Enter your email" ref={emailRef} required />
          </div>
          <div className="input-container">
            <label>Password:</label>
            <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="Enter your password" required />
          </div>
          <button className="signin-btn" type="submit" disabled={isLoading}>Login</button>
        </form>

        <div className="logout-section">
          <h2>Logout</h2>

          {currentUser && (
            <span className="user-info">
              Logged in as: {currentUser?.email}
            </span>
          )}
          <button className="signin-btn" onClick={logout} disabled={isLoading}>Logout</button>
        </div>

        {message && <div className="message">{message}</div>}
      </div>
    </>
  );
}

export default App;
