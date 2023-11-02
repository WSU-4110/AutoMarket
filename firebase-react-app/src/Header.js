import React from "react";
import logo from "./images/AutoMarketLogo.png";
import "./components/header.css";
import { Link } from "react-router-dom";
import Headroom from "react-headroom";

const Header = () => {
  return (
    <Headroom>
      <header className="App-header">
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
