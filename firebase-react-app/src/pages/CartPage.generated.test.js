import renderer from 'react-test-renderer';
import Header from "./../Header";
import React, { useState } from 'react';

import homeBreakPadsImage from "../images/homeBreakPadsImage.jpg"
import homeHeadlightImage from "../images/homeHeadlightImage.jpg"
import homeSparkImage from "../images/homeSparkImage.jpg"
import CartPage from "./CartPage";

jest.mock("./../Header");
jest.mock('./CartPage.css');
jest.mock("../images/homeBreakPadsImage.jpg");
jest.mock("../images/homeHeadlightImage.jpg");
jest.mock("../images/homeSparkImage.jpg");

const renderTree = tree => renderer.create(tree);
describe('<CartPage>', () => {
  it('should render component', () => {
    expect(renderTree(<CartPage 
    />).toJSON()).toMatchSnapshot();
  });
  
});