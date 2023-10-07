import React, { useState } from 'react';
import { getDatabase, ref, set } from 'firebase/database';
import './SignInPage.css'; // Importing styles

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const db = getDatabase();
    const usersRef = ref(db, 'users');  

    // Generate a unique reference for the new user data
    const newUserRef = ref(usersRef);

    await set(newUserRef, { 
      email: email,
      password: password  // IMPORTANT: Store passwords securely (hashed & salted) in production apps!
    });

    alert('User details saved to Firebase!');
    setEmail('');  
    setPassword('');
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} className="signin-form">
        <div className="input-container">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} placeholder="Enter your email" />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} placeholder="Enter your password" />
        </div>
        <button type="submit" className="signin-btn">Sign In</button>
      </form>
    </div>
  );
};

export default SignInPage;
