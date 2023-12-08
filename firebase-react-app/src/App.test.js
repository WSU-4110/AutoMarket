import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';
import { auth } from './firebase';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import App from "./SignInPage";
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import MainBuyersPage from './MainBuyersPage';

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


test("renders login form", () => {
  render(<App />);
  expect(screen.getByText(/Login/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  expect(screen.getByText(/Logout/i)).toBeInTheDocument();
});

test("logs in successfully", async () => {
  render(<App />);

  // Mock the signInWithEmailAndPassword function
  jest.spyOn(global, "signInWithEmailAndPassword").mockResolvedValueOnce();

  userEvent.type(screen.getByLabelText(/Email/i), "test@example.com");
  userEvent.type(screen.getByLabelText(/Password/i), "password");
  fireEvent.click(screen.getByText(/Login/i));

  await waitFor(() => {
    expect(screen.getByText(/Successfully logged in!/i)).toBeInTheDocument();
  });
});

test("handles login error", async () => {
  render(<App />);

  // Mock the signInWithEmailAndPassword function to throw an error
  jest
    .spyOn(global, "signInWithEmailAndPassword")
    .mockRejectedValueOnce(new Error("Invalid credentials"));

  userEvent.type(screen.getByLabelText(/Email/i), "test@example.com");
  userEvent.type(screen.getByLabelText(/Password/i), "password");
  fireEvent.click(screen.getByText(/Login/i));

  await waitFor(() => {
    expect(
      screen.getByText(/Login Error: Invalid credentials/i)
    ).toBeInTheDocument();
  });
});

test("logs out successfully", async () => {
  render(<App />);

  // Mock the signOut function
  jest.spyOn(global, "signOut").mockResolvedValueOnce();

  fireEvent.click(screen.getByText(/Logout/i));

  await waitFor(() => {
    expect(screen.getByText(/Successfully logged out!/i)).toBeInTheDocument();
  });
});

test("handles logout error", async () => {
  render(<App />);

  // Mock the signOut function to throw an error
  jest
    .spyOn(global, "signOut")
    .mockRejectedValueOnce(new Error("Logout failed"));

  fireEvent.click(screen.getByText(/Logout/i));

  await waitFor(() => {
    expect(
      screen.getByText(/Logout Error: Logout failed/i)
    ).toBeInTheDocument();
  });
});

test("displays user info when logged in", async () => {
  render(<App />);

  // Mock the onAuthStateChanged function to simulate a logged-in user
  act(() => {
    global.onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  });

  expect(screen.getByText(/Logged in as:/i)).toBeInTheDocument();
  expect(screen.getByText(/Logout/i)).toBeInTheDocument();
});

test("does not display user info when logged out", async () => {
  render(<App />);

  // Mock the onAuthStateChanged function to simulate a logged-out user
  act(() => {
    global.onAuthStateChanged(auth, (user) => {
      setCurrentUser(null);
    });
  });

  expect(screen.queryByText(/Logged in as:/i)).not.toBeInTheDocument();
  expect(screen.getByText(/Logout/i)).toBeInTheDocument();

describe('MainBuyersPage Component', () => {
    // Test 1: Renders and displays initial item name
    test('renders and displays initial item name', () => {
      render(<MainBuyersPage />);
      expect(screen.getByText('Example Item')).toBeInTheDocument();
    });
  });
  // Test 2: Check initial price and stock
    test('displays the correct initial price and stock', () => {
      render(<MainBuyersPage />);
      expect(screen.getByText('Price: $99.99')).toBeInTheDocument();
      expect(screen.getByText('In Stock: 10')).toBeInTheDocument();
    });
  
    // Test 3: Handle purchase when quantity is less than stock
    test('handles purchase correctly for valid quantity', () => {
      render(<MainBuyersPage />);
      fireEvent.change(screen.getByLabelText('Quantity:'), { target: { value: 5 } });
      fireEvent.click(screen.getByText('Purchase'));
      expect(screen.getByText('You have successfully purchased 5 item(s) of Example Item.')).toBeInTheDocument();
      expect(screen.getByText('In Stock: 5')).toBeInTheDocument(); // Checks if stock updated
    });
  
    // Test 4: Handle purchase when quantity is more than stock
    test('displays error message when quantity exceeds stock', () => {
      render(<MainBuyersPage />);
      fireEvent.change(screen.getByLabelText('Quantity:'), { target: { value: 15 } });
      fireEvent.click(screen.getByText('Purchase'));
      expect(screen.getByText('Not enough stock for your purchase amount.')).toBeInTheDocument();
    });
  
    // Test 5: Check input field restrictions
    test('quantity input field restricts input correctly', () => {
      render(<MainBuyersPage />);
      const quantityInput = screen.getByLabelText('Quantity:');
      fireEvent.change(quantityInput, { target: { value: 0 } });
      expect(quantityInput.value).toBe('1'); // Should correct to minimum 1
      fireEvent.change(quantityInput, { target: { value: 20 } });
      expect(quantityInput.value).toBe('10'); // Should correct to maximum stock
    });
  
    // Test 6: Updating the quantity through the input field
    test('updates the quantity state when changing the value in the input field', () => {
      render(<MainBuyersPage />);
      const quantityInput = screen.getByLabelText('Quantity:');
      fireEvent.change(quantityInput, { target: { value: 3 } });
      expect(quantityInput.value).toBe('3'); // Check if the input reflects the new quantity
    });
  
});
});
