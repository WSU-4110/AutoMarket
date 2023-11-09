import React, { useState, useEffect } from 'react';
import Header from "./../../Header";
import { auth } from './../../firebase'; 
import SellersPage from './../SellersPage/SellersPage';
import './ProfilePage.css';

const Profile = () => {
  const [user, setUser] = useState(auth.currentUser);
  const [showSellers, setShowSellers] = useState(false); // State to toggle view

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    }; 
  }, []);

  const handleSignOut = () => {
    auth.signOut();
  };

  if (showSellers)
   {
    return <SellersPage />;
  }

  return (
    <div>
      <Header /> 
      <h2>User Profile</h2>
      <p>Email: {user ? user.email : 'No user signed in'}</p>
      <button onClick={handleSignOut}>Sign Out</button>
      <button onClick={() => setShowSellers(true)}>Go to Sellers Page</button> {/* Button to switch to SellersPage */}
    </div>
  );
};

export default Profile;

