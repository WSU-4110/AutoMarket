import renderer from 'react-test-renderer';
import React, { useState, useEffect } from 'react';
import Header from "./../../Header";
import { auth } from './../../firebase';
import SellersPage from './../SellersPage/SellersPage';

import Profile from './ProfilePage';

jest.mock("./../../Header");
jest.mock('./../../firebase');
jest.mock('./../SellersPage/SellersPage');
jest.mock('./ProfilePage.css');

const renderTree = tree => renderer.create(tree);
describe('<Profile>', () => {
  it('should render component', () => {
    expect(renderTree(<Profile 
    />).toJSON()).toMatchSnapshot();
  });
  
});