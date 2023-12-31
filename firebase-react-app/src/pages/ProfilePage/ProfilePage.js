import React, { useState, useEffect } from "react";
import { auth, 
          db, 
          updateUserName, 
          updateUserPassword } from './../../firebase';
import { ref, onValue, set } from "firebase/database";
import Header from "./../../Header";
import Footer from "./../../Footer";
import SellersPage from "./../SellersPage/SellersPage";
import BuyersPage from "./../BuyersPage/BuyersPage";
import "./ProfilePage.css";

const Profile = () => 
{
  const [user, setUser] = useState(auth.currentUser);
  const [userData, setUserData] = useState(null);

  const [carMake, setCarMake] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carYear, setCarYear] = useState("");
  const [showCarDetailsForm, setShowCarDetailsForm] = useState(false);

  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [showUpdateDetailsForm, setShowUpdateDetailsForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [passwordUpdateSuccess, setPasswordUpdateSuccess] = useState("");

  const [showSellers, setShowSellers] = useState(false);
  const [showBuyers, setShowBuyers] = useState(false);

  useEffect(() => 
  {
    const unsubscribe = auth.onAuthStateChanged((authUser) => 
    {
      if (authUser) 
      {
        setUser(authUser);
        fetchUserData(authUser.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => 
    {
      if (authUser) 
      {
        setUser(authUser);
        fetchUserData(authUser.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = (userId) => 
  {
    const userRef = ref(db, "users/" + userId);
    onValue(userRef, (snapshot) => 
    {
      const data = snapshot.val();
      setUserData(data);
      if (data) {
        setCarMake(data.car?.make || "");
        setCarModel(data.car?.model || "");
        setCarYear(data.car?.year || "");

        setNewFirstName(data.firstName || "");
        setNewLastName(data.lastName || "");
      }
    });
  };

  const handleCarDetailsSubmit = async () => 
  {
    const userRef = ref(db, "users/" + user.uid);
    await set(userRef, {
      ...userData,
      car: { make: carMake, model: carModel, year: carYear },
    });
    fetchUserData(user.uid);
  };

  const handleUpdateName = async () => 
  {
    await updateUserName(user.uid, newFirstName, newLastName);
    fetchUserData(user.uid);
  };

  const handleUpdatePassword = async () => 
  {
    try {
      await updateUserPassword(newPassword);
      setPasswordUpdateSuccess("Password successfully updated.");
      setNewPassword(""); 
    } catch (error) {
      console.error("Error in updating password:", error);
      setPasswordUpdateSuccess("Password successfully updated.");
    }
  };

  const toggleCarDetailsForm = () => 
  {
    setShowCarDetailsForm(!showCarDetailsForm);
  };

  const toggleUpdateDetailsForm = () =>
  {
    setShowUpdateDetailsForm(!showUpdateDetailsForm);
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

  const capitalize = (str) => 
  {
    if (!str) return "N/A";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };


  return (
    <div className="profile">
      <Header />
      <div className="profile-content">
        <h1>
          <b>Profile Page</b>
        </h1>

        <div className="user-info">
        <h3>Your Details</h3>
        <br></br>
        <p>
          Name: {capitalize(userData?.firstName)} {capitalize(userData?.lastName)}
        </p>
        <p>Email: {user?.email || "N/A"}</p>
      </div>

        <div class="toggle-button">
          <button onClick={toggleUpdateDetailsForm}>
            {showUpdateDetailsForm
              ? "Hide User Details"
              : "Update User Details"}
          </button>
        </div>

        {showUpdateDetailsForm && (
          <div className="user-details-form">
            <input
              type="text"
              placeholder="New First Name"
              value={newFirstName}
              onChange={(e) => setNewFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="New Last Name"
              value={newLastName}
              onChange={(e) => setNewLastName(e.target.value)}
            />
            <button onClick={handleUpdateName}>Update Name</button>

            <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={handleUpdatePassword}>Update Password</button>

          {passwordUpdateSuccess && <p>{passwordUpdateSuccess}</p>}
        </div>
      )}

        <div class="toggle-button">
          <button onClick={toggleCarDetailsForm}>
            {showCarDetailsForm
              ? "Hide Car Details"
              : "Add / Update Car Details"}
          </button>
        </div>

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
            <button className="car-button" onClick={handleCarDetailsSubmit}>
              Add Car
            </button>
          </div>
        )}

        {userData?.car && (
          <div className="car-info">
            <h3>Your Car</h3>
            <br></br>
            <p>Make: {userData.car.make}</p>
            <p>Model: {userData.car.model}</p>
            <p>Year: {userData.car.year}</p>
          </div>
        )}

        <div className="profile-buttons">
          <button onClick={() => setShowSellers(true)}>
            Go to Sellers Page
          </button>
          <button onClick={() => setShowBuyers(true)}>Go to Buyers Page</button>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
