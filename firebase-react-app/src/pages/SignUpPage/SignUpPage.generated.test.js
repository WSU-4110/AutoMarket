import renderer from 'react-test-renderer';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../../firebase';

import Header from "./../../Header";
import SignUpPage from './SignUpPage';

jest.mock('firebase/auth');
jest.mock('./../../firebase');
jest.mock('./SignUpPage.css');
jest.mock("./../../Header");

const renderTree = tree => renderer.create(tree);
describe('<SignUpPage>', () => {
  it('should render component', () => {
    expect(renderTree(<SignUpPage 
    />).toJSON()).toMatchSnapshot();
  });
  
});