import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SearchProvider } from './pages/SearchResults/SearchContext';
import { CartProvider } from './pages/CartPage/CartContext'; 
import HomePage from './HomePage';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import CartPage from './pages/CartPage/CartPage';
import SellersPage from './pages/SellersPage/SellersPage';
import BuyersPage from './pages/BuyersPage/BuyersPage';
import SearchResults from './pages/SearchResults/SearchResults';

function App() {
  return (
    <Router>
      <SearchProvider>
        <CartProvider> 
          <div className="App">
            <Routes>
              <Route path="/" element={<HomePage />} index />
              <Route path="signin" element={<SignInPage />} />
              <Route path="signup" element={<SignUpPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="sellers" element={<SellersPage />} />
              <Route path="buyers" element={<BuyersPage />} />
              <Route path="/searchresults" element={<SearchResults />} /> 
            </Routes>
          </div>
        </CartProvider>
      </SearchProvider>
    </Router>
  );
}

export default App;
