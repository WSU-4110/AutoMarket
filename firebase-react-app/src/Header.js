import React, { useState, useEffect, useContext } from 'react';
import Headroom from "react-headroom";
import { Link } from "react-router-dom";
import { auth } from './firebase';
import { SearchContext } from './pages/SearchResults/SearchContext';
import { searchPartsByName } from './firebase'; 
import logo from "./images/AutoMarketLogo.png";
import { useNavigate } from 'react-router-dom'; 
import "./components/header.css";
const Header = () => 
{
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { setSearchResults } = useContext(SearchContext);
  const navigate = useNavigate();


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


  const handleSearch = () => {
    searchPartsByName(searchQuery, (results) => 
    {
      setSearchResults(results);
      navigate('/searchresults'); 
    });
  };

  return (
    <Headroom>
      <header className="App-header" onClick={closeDropdown}>
        <Link to="/" className="logo-link">
          <div className="logo">
            <img src={logo} className="App-logo" alt="logo" />
            <span className="logo-text">Auto Market</span>
          </div>
        </Link>

        <div className="search-bar">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="buttons">
          {user ? (
            <div className="dropdown" onClick={(e) => e.stopPropagation()}>
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                onClick={toggleDropdown}
              >
               {user.displayName || user.email} 
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
    </Headroom>
  );
};

export default Header;
