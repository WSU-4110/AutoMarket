import React from 'react';
import sparkImage from './images/homeSparkImage.jpg';
import headLightImage from './images/homeHeadlightImage.jpg';
import breakPadImage from './images/homeBreakPadsImage.jpg';
import './components/mainPageBody.css';


const MainPageBody = () => {
  return (
    <div className="main-page-body">
      <p>
        Check out our hottest items 
        <br></br>
        add pictures or other things here to showcase products or information
      </p>
      <div className="picture-area">
        <div className="image-row">
          <img src={sparkImage} alt="homeSparkImage" className="product-image" />
          <img src={headLightImage} alt="headLightImage" className="product-image" />
          <img src={breakPadImage} alt="breakPadImage" className="product-image" />
        </div>
      </div>
    </div>
  );
}

export default MainPageBody;
