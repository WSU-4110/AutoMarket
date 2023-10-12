import React from 'react';
import sparkImage from './images/homeSparkImage.jpg';
import headLightImage from './images/homeHeadlightImage.jpg';
import breakPadImage from './images/homeBreakPadsImage.jpg';
import './components/mainPageBody.css';
import './components/pictureArea.css';
import { Card } from "./Card.jsx";

const MainPageBody = () => 
{
  return (
    <div className="main-page-body">

      <p>
        Check out our hottest items 
        <br></br>
        add pictures or other things here to showcase products or information
      </p>

      <div className="col">
        <Card
          imgSrc={sparkImage}
          imgAlt="Card Image 1"
          title="Card Title"
          description="filler text filler text filler text filler text filler text filler text filler text filler text filler text "
        />

        <Card
          imgSrc={headLightImage}
          imgAlt="Card Image 1"
          title="Card Title"
          description="filler text filler text filler text filler text filler text filler text filler text filler text filler text "
        />

        <Card
          imgSrc={breakPadImage}
          imgAlt="Card Image 1"
          title="Card Title"
          description="filler text filler text filler text filler text filler text filler text filler text filler text filler text "
        />
      </div>
    </div>
  );
}
export default MainPageBody;
