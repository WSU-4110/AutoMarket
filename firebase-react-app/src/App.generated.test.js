import renderer from 'react-test-renderer';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import CartPage from './pages/CartPage';
import SellersPage from './pages/SellersPage/SellersPage';
import Profile from './pages/ProfilePage/ProfilePage';
import App from './App';

jest.mock('react-router-dom');
jest.mock('./HomePage');
jest.mock('./pages/SignInPage/SignInPage');
jest.mock('./pages/SignUpPage/SignUpPage');
jest.mock('./pages/ProfilePage/ProfilePage');
jest.mock('./pages/CartPage');
jest.mock('./pages/SellersPage/SellersPage');
jest.mock('./pages/ProfilePage/ProfilePage');

const renderTree = tree => renderer.create(tree);
describe('<App>', () => {
  it('should render component', () => {
    expect(renderTree(<App 
    />).toJSON()).toMatchSnapshot();
  });
  
});