// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import Cart from './pages/Cart';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} index />
          <Route path="signin" element={<SignInPage />} />
          <Route path="/" element={<HomePage />} index />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="/" element={<HomePage />} index />
          <Route path="cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;