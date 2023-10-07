import React from 'react';
import './App.css';
import Header from './Header';
import WelcomeMessage from './WelcomeMessage';
import MainPageBody from './MainPageBody';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <WelcomeMessage />
        <MainPageBody />
      </div>
    </div>
  );
}

export default App;
