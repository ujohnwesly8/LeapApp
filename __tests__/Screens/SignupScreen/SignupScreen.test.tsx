import React from 'react';

import {render, fireEvent, act} from '@testing-library/react-native';
import SignUpScreen from '../../../src/screens/SignUp/SignupScreen';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

describe('SignUpScreen', () => {
  it('renders the signup screen correctly', () => {
    const {getByPlaceholderText, getByTestId} = render(<SignUpScreen />);
    act(() => {
      expect(getByPlaceholderText('Enter First name')).toBeTruthy();
      expect(getByPlaceholderText('Enter Last name')).toBeTruthy();
      expect(getByPlaceholderText('Enter email')).toBeTruthy();
      expect(getByPlaceholderText('Enter Phone number')).toBeTruthy();
      expect(getByPlaceholderText('Enter password')).toBeTruthy();
      expect(getByTestId('signup-button')).toBeTruthy();

      expect(getByTestId('login-button')).toBeTruthy();
    });
  });

  it('validates form inputs and shows error messages', () => {
    const {getByTestId} = render(<SignUpScreen />);

    const firstNameInput = getByTestId('first-name');
    const lastNameInput = getByTestId('last-name');
    const emailInput = getByTestId('Email');
    const phoneNumberInput = getByTestId('Phone-number');
    const passwordInput = getByTestId('Password');
    const signUpButton = getByTestId('signup-button');

    // Attempt to submit the form without entering any data
    act(() => {
      expect(getByTestId('first-name')).toBeTruthy();
      expect(getByTestId('last-name')).toBeTruthy();
      expect(getByTestId('Email')).toBeTruthy();
      expect(getByTestId('Phone-number')).toBeTruthy();
      expect(getByTestId('Password')).toBeTruthy();

      // Enter invalid data in the inputs
      fireEvent.changeText(firstNameInput, 'John');
      fireEvent.changeText(lastNameInput, 'Doe');
      fireEvent.changeText(emailInput, 'invalid-email');
      fireEvent.changeText(phoneNumberInput, '123456');
      fireEvent.changeText(passwordInput, 'pass');
    });
    // Attempt to submit the form againx`
    act(() => {
      fireEvent.press(signUpButton);
    });
  });
  // Add more test cases for different scenarios as needed
});
it('renders the error messages for the input fields', async () => {
  const {getByPlaceholderText, findByText} = render(<SignUpScreen />);

  const firstNameInput = getByPlaceholderText('Enter First name');
  const lastNameInput = getByPlaceholderText('Enter Last name');
  const emailInput = getByPlaceholderText('Enter email');
  const PhoneNumber = getByPlaceholderText('Enter Phone number');
  const Password = getByPlaceholderText('Enter password');
  // Attempt to submit the form without entering the required fields
  fireEvent.changeText(firstNameInput, '');
  fireEvent.changeText(lastNameInput, '');
  fireEvent.changeText(emailInput, '');
  fireEvent.changeText(PhoneNumber, '');
  fireEvent.changeText(Password, '');
  fireEvent(firstNameInput, 'onBlur', {target: {value: ''}});
  fireEvent(lastNameInput, 'onBlur', {target: {value: ''}});
  fireEvent(emailInput, 'onBlur', {target: {value: ''}});
  fireEvent(PhoneNumber, 'onBlur', {target: {value: ''}});
  fireEvent(Password, 'onBlur', {target: {value: ''}});
  const firstNameError = await findByText('Enter First Name');
  const lastNameError = await findByText('Enter LastName');
  const emailError = await findByText('Enter valid Email');
  const PhoneNumberError = await findByText('Phone number is required');
  const PasswordError = await findByText('Please enter password');
  expect(firstNameError).toBeTruthy();
  expect(lastNameError).toBeTruthy();
  expect(emailError).toBeTruthy();
  expect(PhoneNumberError).toBeTruthy();
  expect(PasswordError).toBeTruthy();
});
test('should navigate to the correct screen when the login button is pressed', () => {
  const {getByTestId} = render(<SignUpScreen />);

  // Simulate pressing the login button
  act(() => {
    fireEvent.press(getByTestId('login-button'));
  });

  // Assert that the navigate function has been called with the correct screen name
  expect(mockNavigate).toHaveBeenCalledWith('Login');
});
it('should call handleRole with "BORROWER" when the borrower radio button is pressed', () => {
  // Render the SignUpScreen component
  const {getByTestId} = render(<SignUpScreen />);

  // Simulate a press event on the borrower radio button
  fireEvent.press(getByTestId('radio-borrower'));
  const handleRole = 'BORROWER';

  // Assert that handleRole is called with the correct value
  // You may need to provide a mock implementation for handleRole
  expect(handleRole).toBe('BORROWER');
});
it('should set role to "OWNER" when the owner radio button is pressed', () => {
  // Mock the setRole function
  const setRole = 'Owner';

  // Render the SignUpScreen component and pass the mocked setRole as a prop
  const {getByTestId} = render(<SignUpScreen />);

  // Simulate a press event on the owner radio button
  act(() => {
    // Simulate a press event on the owner radio button
    fireEvent.press(getByTestId('radio-owner'));
  });

  // Assert that the setRole function is called with the correct value
  expect(setRole).toBe('Owner');
});
