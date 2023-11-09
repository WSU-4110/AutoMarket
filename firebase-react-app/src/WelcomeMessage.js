import React from "react";
import "./components/welcomeMessage.css";
import videocar from "./images/videocar.mp4";

const WelcomeMessage = () => {
  return (
    <div className="welcome-message">
      <video src={videocar} autoPlay loop muted />
      <div className="overlay"></div>
      <div className="contentstuff">
        <h1 className="h1stuff">Welcome to AutoMarket</h1>
        <p className="pstuff">
          your go-to destination for all things AutoMarket!
        </p>
      </div>
    </div>
  );
};

export default WelcomeMessage;
