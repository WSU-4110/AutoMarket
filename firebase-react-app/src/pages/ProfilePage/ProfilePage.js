import React, { useState, useEffect } from 'react';
import Header from "./../../Header";
import { auth } from './../../firebase'; 
import SellersPage from './../SellersPage/SellersPage';
import './ProfilePage.css';

const Profile = () => {
  const [user, setUser] = useState(auth.currentUser);
  const [showSellers, setShowSellers] = useState(false); 

  useEffect(() => 
  {
    const unsubscribe = auth.onAuthStateChanged((authUser) => 
    {
      if (authUser) 
      {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () =>
    {
      unsubscribe();
    }; 
  }, []);

  const handleSignOut = () =>
  {
    auth.signOut();
  };

  if (showSellers)
  {
    return <SellersPage />;
  }

  return (
    <div classname="profile-container">
      <Header /> 
      <h2>User Profile Page</h2>
      <p>Email: {user ? user.email : 'No user currently signed in'}</p>

        <div className="sign-out-btn">
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
        <div className="sellers-page-btn">
          <button onClick={() => setShowSellers(true)}>Go to Sellers Page</button> {/* Button to switch to SellersPage */}
        </div>
        
        <div class="container bootstrap snippets bootdey">
    <h1 class="text-primary">Edit Profile</h1>
      <hr/>
	      <div class="row">
          <div class="col-md-3">
            <div class="text-center">
              <img src="https://bootdey.com/img/Content/avatar/avatar7.png" class="avatar img-circle img-thumbnail" alt="avatar"/>
              <h6>Upload a different photo...</h6>
              
              <input type="file" class="form-control"/>
            </div>
          </div>
         </div>
        </div>
        <div class="col-md-9 personal-info">
        <div class="alert alert-info alert-dismissable">
          <a class="panel-close close" data-dismiss="alert">×</a> 
          <i class="fa fa-coffee"></i>
          This is an <strong>.alert</strong>. Use this to show important messages to the user.
        </div>
        <h3>Personal info</h3>
        
        <form class="form-horizontal" role="form">
          <div class="form-group">
            <label class="col-lg-3 control-label">First name:</label>
            <div class="col-lg-8">
              <input class="form-control" type="text" value="dey-dey"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">Last name:</label>
            <div class="col-lg-8">
              <input class="form-control" type="text" value="bootdey"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">Company:</label>
            <div class="col-lg-8">
              <input class="form-control" type="text" value=""/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">Email:</label>
            <div class="col-lg-8">
              <input class="form-control" type="text" value="janesemail@gmail.com"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">Time Zone:</label>
            <div class="col-lg-8">
              <div class="ui-select">
                <select id="user_time_zone" class="form-control">
                  <option value="Hawaii">(GMT-10:00) Hawaii</option>
                  <option value="Alaska">(GMT-09:00) Alaska</option>
                  <option value="Pacific Time (US &amp; Canada)">(GMT-08:00) Pacific Time (US &amp; Canada)</option>
                  <option value="Arizona">(GMT-07:00) Arizona</option>
                  <option value="Mountain Time (US &amp; Canada)">(GMT-07:00) Mountain Time (US &amp; Canada)</option>
                  <option value="Central Time (US &amp; Canada)" selected="selected">(GMT-06:00) Central Time (US &amp; Canada)</option>
                  <option value="Eastern Time (US &amp; Canada)">(GMT-05:00) Eastern Time (US &amp; Canada)</option>
                  <option value="Indiana (East)">(GMT-05:00) Indiana (East)</option>
                </select>
              </div>
            </div>
          </div>
        </form>
        </div>
    </div>
  );
};

export default Profile;

