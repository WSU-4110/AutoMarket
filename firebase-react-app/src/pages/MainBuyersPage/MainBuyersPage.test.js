import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import MainBuyersPage from './MainBuyersPage';

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
  
    // Additional tests can be added here

