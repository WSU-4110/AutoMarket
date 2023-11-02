import React, { useState, useEffect } from 'react';
import logo from './images/AutoMarketLogo.png';
import './components/header.css';
import { Link } from 'react-router-dom';
import { auth } from './firebase'; 

const Header = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

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

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  return (
    <header className="App-header" onClick={closeDropdown}>
      <Link to="/" className="logo-link"> 
        <div className="logo">
          <img src={logo} className="App-logo" alt="logo" />
          <span className="logo-text">Auto Market</span>
        </div>
      </Link>

      <div className="search-bar">
        <input type="text" className="form-control" placeholder="Search" />
      </div>

      <div className="buttons">
        {user ? (
          <div className="dropdown" onClick={(e) => e.stopPropagation()}>
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              onClick={toggleDropdown}
            >
              Hello, {user.displayName || user.email}
            </button>
            {showDropdown && (
              <div className="dropdown-menu">
                <Link to="/profile" className="dropdown-item">
                  Profile
                </Link>
                <div className="dropdown-divider"></div>
                <span
                  className="dropdown-item signout"
                  onClick={() => {
                    auth.signOut();
                    closeDropdown();
                  }}
                >
                  Sign Out
                </span>
              </div>
            )}
          </div>
        ) : (
          <>
            <button className="btn btn-primary">
              <Link to="/signin" className="btn-link">
                Sign In
              </Link>
            </button>
            <button className="btn btn-primary">
              <Link to="/signup" className="btn-link">
                Sign Up
              </Link>
            </button>
          </>
        )}
        <button className="btn btn-primary">
          <Link to="/cart" className="btn-link">
            Cart
          </Link>
        </button>
      </div>
    </header>
  );
};

export default Header;
