// HomePage.js
import React from 'react';
import Header from './Header';
import WelcomeMessage from './WelcomeMessage';
import MainPageBody from './MainPageBody';

const HomePage = () => {
  return (
    <>
      <Header />
      <WelcomeMessage />
      <div className="content">
        <MainPageBody />
      </div>
    </>
  );
}

export default HomePage;
