import renderer from 'react-test-renderer';
import React from 'react';
import sparkImage from './images/homeSparkImage.jpg';
import headLightImage from './images/homeHeadlightImage.jpg';
import breakPadImage from './images/homeBreakPadsImage.jpg';


import { Card } from "./Card.jsx";
import MainPageBody from './MainPageBody';

jest.mock('./images/homeSparkImage.jpg');
jest.mock('./images/homeHeadlightImage.jpg');
jest.mock('./images/homeBreakPadsImage.jpg');
jest.mock('./components/mainPageBody.css');
jest.mock('./components/pictureArea.css');
jest.mock("./Card.jsx");

const renderTree = tree => renderer.create(tree);
describe('<MainPageBody>', () => {
  it('should render component', () => {
    expect(renderTree(<MainPageBody 
    />).toJSON()).toMatchSnapshot();
  });
  
});