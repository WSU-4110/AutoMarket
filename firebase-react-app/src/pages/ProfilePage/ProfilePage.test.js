import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock Firebase and related components
const mockSignOut = jest.fn();

jest.mock('./../../firebase', () => ({
  auth: {
    currentUser: { email: 'test@example.com', uid: '123' },
    onAuthStateChanged: jest.fn(callback => {
      callback({ email: 'test@example.com', uid: '123' });
      return jest.fn(); // Mock unsubscribe function
    }),
    signOut: mockSignOut,
  },
  db: {},
  ref: jest.fn(),
  onValue: jest.fn()
}));

jest.mock('./../SellersPage/SellersPage', () => () => <div>SellersPage</div>);
jest.mock('./../BuyersPage/BuyersPage', () => () => <div>BuyersPage</div>);
jest.mock('./../../Header', () => () => <header>Header</header>);

// Import the component to be tested
import Profile from './ProfilePage';

describe('Profile Component', () => {
  beforeEach(() => {
    mockSignOut.mockClear();
  });

  test('renders Profile component correctly', () => {
    const { getByText } = render(<Profile />);
    expect(getByText('Profile Page')).toBeInTheDocument();
  });

  test('shows user information when authenticated', async () => {
    const { getByText } = render(<Profile />);
    await waitFor(() => {
      expect(getByText('Email: test@example.com')).toBeInTheDocument();
    });
  });

  test('navigates to Sellers page on button click', () => {
    const { getByText, queryByText } = render(<Profile />);
    fireEvent.click(getByText('Go to Sellers Page'));
    expect(queryByText('SellersPage')).toBeInTheDocument();
  });

  test('navigates to Buyers page on button click', () => {
    const { getByText, queryByText } = render(<Profile />);
    fireEvent.click(getByText('Go to Buyers Page'));
    expect(queryByText('BuyersPage')).toBeInTheDocument();
  });

  test('calls signOut on sign out button click', () => {
    const { getByText } = render(<Profile />);
    fireEvent.click(getByText('Sign Out'));
    expect(mockSignOut).toHaveBeenCalled();
  });

  // New test
  test('initially does not show Sellers or Buyers page', () => {
    const { queryByText } = render(<Profile />);
    expect(queryByText('SellersPage')).not.toBeInTheDocument();
    expect(queryByText('BuyersPage')).not.toBeInTheDocument();
  });

  // Additional tests can be added as needed
});
