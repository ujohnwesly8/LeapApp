import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import LoginScreen from '../../../src/screens/LoginScreen/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
describe('LoginScreen', () => {
  beforeEach(() => {
    // Clear AsyncStorage before each test
    AsyncStorage.clear();
  });
  test('renders correctly', () => {
    const {getByPlaceholderText, getByText} = render(<LoginScreen />);

    // Verify that required elements are rendered
    const emailInput = getByPlaceholderText('Email Address');
    const passwordInput = getByPlaceholderText('Enter password');
    const signInButton = getByText('Sign In');
    const continueText = getByText('Continue');
    const signUpText = getByText('Sign Up');

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(signInButton).toBeTruthy();
    expect(continueText).toBeTruthy();
    expect(signUpText).toBeTruthy();
  });

  test('input fields should be editable', () => {
    const {getByPlaceholderText} = render(<LoginScreen />);

    // Edit email input
    const emailInput = getByPlaceholderText('Email Address');
    fireEvent.changeText(emailInput, 'test@example.com');
    expect(emailInput.props.value).toBe('test@example.com');

    // Edit password input
    const passwordInput = getByPlaceholderText('Enter password');
    fireEvent.changeText(passwordInput, 'password123');
    expect(passwordInput.props.value).toBe('password123');
  });

  test('sign in button should be disabled when inputs are empty', () => {
    const {getByText} = render(<LoginScreen />);

    const signInButton = getByText('Sign In');
    expect(signInButton.props.disabled).toBe(true);
  });

  test('sign in button should be enabled when inputs are valid', () => {
    const {getByText, getByPlaceholderText} = render(<LoginScreen />);

    // Enter valid email and password
    const emailInput = getByPlaceholderText('Email Address');
    const passwordInput = getByPlaceholderText('Enter password');
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    const signInButton = getByText('Sign In');
    expect(signInButton.props.disabled).toBe(false);
  });

  // Add more test cases as needed for other functionality
});
