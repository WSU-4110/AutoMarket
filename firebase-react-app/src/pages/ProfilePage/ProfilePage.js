import React, { useState, useEffect } from 'react';
import { auth, db } from './../../firebase'; 
import { ref, set, onValue } from 'firebase/database';
import Header from "./../../Header";
import SellersPage from './../SellersPage/SellersPage';
import BuyersPage from './../BuyersPage/BuyersPage';
import './ProfilePage.css';

const Profile = () => {
  const [user, setUser] = useState(auth.currentUser);
  const [userData, setUserData] = useState(null);

  const [carMake, setCarMake] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carYear, setCarYear] = useState('');
  const [showCarDetailsForm, setShowCarDetailsForm] = useState(false);

  const [showSellers, setShowSellers] = useState(false);
  const [showBuyers, setShowBuyers] = useState(false);

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
      if (data && data.car) {
        setCarMake(data.car.make);
        setCarModel(data.car.model);
        setCarYear(data.car.year);
      }
    });
  };

  const handleCarDetailsSubmit = async () => {
    const userRef = ref(db, 'users/' + user.uid);
    await set(userRef, { ...userData, car: { make: carMake, model: carModel, year: carYear } });
    fetchUserData(user.uid);
  };

  const toggleCarDetailsForm = () => {
    setShowCarDetailsForm(!showCarDetailsForm);
  };

  const handleSignOut = () => {
    auth.signOut();
  };

  if (showSellers) {
    return <SellersPage />;
  }
  if (showBuyers) {
    return <BuyersPage />;
  }

  return (
    <div className="profile">
      <Header />
      <div className="profile-content">
        <h1>Profile Page</h1>
        {user && (
          <div className="user-details">
            <p><strong>Name:</strong> {userData?.firstName} {userData?.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>

            <button className="toggle-button" onClick={toggleCarDetailsForm}>
              {showCarDetailsForm ? 'Hide Car Details' : 'Add/Update Car Details'}
            </button>

            {showCarDetailsForm && (
              <div className="car-details-form">
                <input 
                  type="text" 
                  placeholder="Car Make" 
                  value={carMake} 
                  onChange={(e) => setCarMake(e.target.value)} 
                />
                <input 
                  type="text" 
                  placeholder="Car Model" 
                  value={carModel} 
                  onChange={(e) => setCarModel(e.target.value)} 
                />
                <input 
                  type="text" 
                  placeholder="Car Year" 
                  value={carYear} 
                  onChange={(e) => setCarYear(e.target.value)} 
                />
                <button onClick={handleCarDetailsSubmit}>Add Car</button>
              </div>
            )}

            {userData?.car && (
              <div className="car-info">
                <h3>Your Car</h3>
                <p>Make: {userData.car.make}</p>
                <p>Model: {userData.car.model}</p>
                <p>Year: {userData.car.year}</p>
              </div>
            )}

            <div className="profile-buttons">
              <button onClick={() => setShowSellers(true)}>Go to Sellers Page</button>
              <button onClick={() => setShowBuyers(true)}>Go to Buyers Page</button>
              <button onClick={handleSignOut}>Sign Out</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
