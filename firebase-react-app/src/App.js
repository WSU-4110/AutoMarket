// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import CartPage from './pages/CartPage';
import SellersPage from './pages/SellersPage/SellersPage';
import BuyersPage from './pages/BuyersPage/BuyersPage';
import Profile from './pages/ProfilePage/ProfilePage';

function App() 
{
  return (
    <Router>
      <div className="App">
        <Routes>

          <Route path="/" element={<HomePage />} index />
          <Route path="signin" element={<SignInPage />} />
          <Route path="/" element={<HomePage />} index />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="/" element={<HomePage />} index />
          <Route path="cart" element={<CartPage />} />
          <Route path="/" element={<HomePage />} index />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="/" element={<Profile />} index />
          <Route path="sellers" element={<SellersPage />} />
          <Route path="/" element={<Profile />} index />
          <Route path="buyers" element={<BuyersPage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
