import React, { useState, useEffect } from "react";
import { auth, db, updateUserName, updateUserPassword } from './../../firebase';
import { ref, onValue, set } from "firebase/database";
import Header from "./../../Header";
import Footer from "./../../Footer";
import SellersPage from "./../SellersPage/SellersPage";
import BuyersPage from "./../BuyersPage/BuyersPage";
import "./ProfilePage.css";

const Profile = () => {
  // ... existing states

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        fetchUserData(authUser.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  // ... existing functions

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const capitalize = (str) => {
    if (!str) return "N/A";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // ... existing JSX code with improvements:

  return (
    <div className="profile">
      <Header />
      {/* ... existing JSX code */}
      <input
        type="text"
        placeholder="New First Name"
        value={newFirstName}
        onChange={handleInputChange(setNewFirstName)}
        aria-label="New First Name"
      />
      {/* ... similar changes for other inputs and buttons */}
    </div>
  );
};

export default Profile;
