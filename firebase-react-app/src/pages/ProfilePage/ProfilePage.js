// React and Firebase imports
import React, { useState, useEffect } from 'react';
import { auth, db } from './../../firebase'; 
import { ref, onValue } from 'firebase/database';
import Header from "./../../Header";
import SellersPage from './../SellersPage/SellersPage';
import './ProfilePage.css';

const Profile = () => {
  const [user, setUser] = useState(auth.currentUser);
  const [userData, setUserData] = useState(null);
  const [showSellers, setShowSellers] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        fetchUserData(authUser.uid);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const fetchUserData = (userId) => {
    const userRef = ref(db, 'users/' + userId);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      setUserData(data);
    });
  };

  const handleSignOut = () => {
    auth.signOut();
  };

  if (showSellers) {
    return <SellersPage />;
  }

  return (
    <div className="profile">
      <Header />
      <div className="profilePage">
        <h1>Profile Page</h1>
        {user && (
          <div>
            <p>Name: {userData?.firstName} {userData?.lastName}</p>
            <p>Email: {user.email}</p>
            <button onClick={handleSignOut}>Sign Out</button>
            <div className="sellers-page-btn">
              <button onClick={() => setShowSellers(true)}>Go to Sellers Page</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
