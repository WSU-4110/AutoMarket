import React, { useState, useEffect } from 'react';
import Header from "./../../Header";
import { auth } from './../../firebase'; 
import './ProfilePage.css';

const Profile = () => {
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); 
  }, []);

  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <div>
      <Header /> 
      <h2>User Profile</h2>
      <p>Email: {user ? user.email : 'No user signed in'}</p>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default Profile;

