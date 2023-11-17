import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';
import { auth } from './firebase';

jest.mock('./firebase', () => 
({
  auth: {
    onAuthStateChanged: jest.fn(),
    signOut: jest.fn(),
  },
}));

const mockAuthStateChanged = (user) => 
{
  auth.onAuthStateChanged.mockImplementationOnce(callback => 
    {
    callback(user);
    return () => {}; 
  });
};

const MockHeader = () => 
(
  <Router>
    <Header />
  </Router>
);

describe('Header Component', () => 
{
  test('shows sign-in button when not logged in', () => 
  {
    mockAuthStateChanged(null);
    render(<MockHeader />);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  test('shows sign-up button when not logged in', () => 
  {
    mockAuthStateChanged(null);
    render(<MockHeader />);
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  test('shows user dropdown when logged in', () => 
  {
    const testUser = { email: 'testing@gmail.com' };
    mockAuthStateChanged(testUser);

    render(<MockHeader />);

    expect(screen.getByText(`Hello, ${testUser.email}`)).toBeInTheDocument();
  });

  test('dropdown toggle functionality', () => 
  {
    const testUser = { email: 'testing@gmail.com' };
    mockAuthStateChanged(testUser);

    render(<MockHeader />);

    fireEvent.click(screen.getByText(`Hello, ${testUser.email}`));
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });

  test('sign out functionality', async () => 
  {
    const testUser = { email: 'testing@gmail.com' };
    mockAuthStateChanged(testUser);
    auth.signOut.mockResolvedValueOnce();

    render(<MockHeader />);
    fireEvent.click(screen.getByText(`Hello, ${testUser.email}`));
    fireEvent.click(screen.getByText('Sign Out'));

    expect(auth.signOut).toHaveBeenCalled();
  });

  test('navigates to home when the AutoMarket logo is clicked', () => 
  {
    mockAuthStateChanged(null);
    render(<MockHeader />);
  
    fireEvent.click(screen.getByAltText('logo'));
  });
});
