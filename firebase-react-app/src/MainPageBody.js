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
          title="NGK Spark Plugs"
          description="NGK U-groove performance spark plugs produce a larger spark for more power at high RPMs. Improves throttle response and fuel economy, less fouling. Purified alumina insulator prevents arcing. Machine rolled threads protect heads."
        />

        <Card
          imgSrc={headLightImage}
          imgAlt="Card Image 1"
          title="Morimoto XB LED Headlights"
          description="Morimoto XB LED Headlights for your Toyota 4Runner Upgrade your outdated halogen headlights and step into the future with unparalleled performance and style. These headlights boast a cutting-edge design with triple kuria-optic projectors, delivering 33% more light output for low beam mode and 100% more in high beam mode, ensuring maximum visibility and safety."
        />

        <Card
          imgSrc={breakPadImage}
          imgAlt="Card Image 1"
          title="Card Title"
          description="Get reliable, everyday performance for regular driving needs from Duralast brake pads, designed to meet your vehicle’s original equipment for form, fit, and function. Available only at AutoZone, Duralast Brake Pads use platform-specific, semi-metallic friction materials tailored to your vehicle. Replace rotors and hardware when replacing brake pads for better stopping power and less noise."
        />
      </div>
    </div>
  );
}
export default MainPageBody;
