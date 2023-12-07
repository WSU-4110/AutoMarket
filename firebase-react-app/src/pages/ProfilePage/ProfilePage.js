// React and Firebase imports
import React, { useState, useEffect } from 'react';
import { auth, db } from './../../firebase'; 
import { ref, onValue } from 'firebase/database';
import Header from "./../../Header";
import SellersPage from './../SellersPage/SellersPage';
import BuyersPage from './../BuyersPage/BuyersPage';
import './ProfilePage.css';

const Profile = () => {
  const [user, setUser] = useState(auth.currentUser);
  const [userData, setUserData] = useState(null);
  const [activePage, setActivePage] = useState('profile');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        setUser(authUser);
        fetchUserData(authUser.uid);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = (userId) => {
    const userRef = ref(db, `users/${userId}`);
    onValue(userRef, snapshot => {
      const data = snapshot.val();
      setUserData(data);
    });
  };

  const handleSignOut = () => {
    auth.signOut().then(() => {
      setUser(null);
      setActivePage('profile');
    });
  };

  switch (activePage) {
    case 'sellers':
      return <SellersPage />;
    case 'buyers':
      return <BuyersPage />;
    default:
      return (
        <div className="profile">
          <Header />
          <div className="profilePage">
            <h1>Profile Page</h1>
            {user && (
              <div>
                <p>Name: {userData?.firstName} {userData?.lastName}</p>
                <p>Email: {user.email}</p>
                <div className="page-buttons">
                  <button onClick={() => setActivePage('sellers')}>Go to Sellers Page</button>
                  <button onClick={() => setActivePage('buyers')}>Go to Buyers Page</button> 
                </div>            
                <button onClick={handleSignOut}>Sign Out</button>
              </div>
            )}
          </div>
        </div>
      );
  }
};

export default Profile;
