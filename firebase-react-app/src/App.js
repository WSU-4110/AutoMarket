// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import SignInPage from './pages/SignInPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} index />
          <Route path="signin" element={<SignInPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
