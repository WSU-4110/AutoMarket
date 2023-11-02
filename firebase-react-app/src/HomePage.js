// HomePage.js
import React from "react";
import Header from "./Header";
import WelcomeMessage from "./WelcomeMessage";
import MainPageBody from "./MainPageBody";
import Footer from "./Footer";


const HomePage = () => {
  return (
    <>
      <Header />
      <WelcomeMessage />
      <div className="content">
        <MainPageBody />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
