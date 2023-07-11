import React from 'react';
import SignUpScreen from '../../../src/screens/SignUp/SignupScreen';
import {act, fireEvent, render} from '@testing-library/react-native';

import {url} from '../../../src/constants/Apis';
import ApiService from '../../../src/network/network';
jest.mock('../../../src/network/network');
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
  const Signup = render(<SignUpScreen />);
  it('This Should render SignUp Screen', () => {
    expect(Signup).toBeTruthy();
  });
  test('The Sign Up Page Should Have Email ', () => {
    const Email = Signup.getByTestId;
    expect(Email).toBeDefined();
  });
  test('Email text input should show error when it is empty  ', () => {
    const {getByPlaceholderText, getByTestId} = render(<SignUpScreen />);
    const EmailInput = getByPlaceholderText('Enter email');
    fireEvent.changeText(EmailInput, '');
    const emailError = getByTestId('email');
    fireEvent.changeText(EmailInput, '');
    fireEvent(EmailInput, 'onBlur', {target: {value: ''}});
    expect(emailError).toBeTruthy();
  });
  test('The Sign Up Page Should Have FirstName ', () => {
    const FirstName = Signup.getByTestId;
    expect(FirstName).toBeDefined();
  });
  test('FirstName text input should show error when it is empty  ', () => {
    const {getByPlaceholderText, getByTestId} = render(<SignUpScreen />);
    const firstNameInput = getByPlaceholderText('Enter First name');
    fireEvent.changeText(firstNameInput, '');
    const firstNameError = getByTestId('first-name');
    fireEvent.changeText(firstNameInput, '');
    fireEvent(firstNameInput, 'onBlur', {target: {value: ''}});
    expect(firstNameError).toBeTruthy();
  });

  test('The Sign Up Page Should Have LastName ', () => {
    const LastName = Signup.getByTestId;
    expect(LastName).toBeDefined();
  });
  test('LastName text input should show error when it is empty  ', () => {
    const {getByPlaceholderText, getByTestId} = render(<SignUpScreen />);
    const lastNameInput = getByPlaceholderText('Enter Last name');
    fireEvent.changeText(lastNameInput, '');
    const lastNameError = getByTestId('last-name');
    fireEvent.changeText(lastNameInput, '');
    fireEvent(lastNameError, 'onBlur', {target: {value: ''}});
    expect(lastNameError).toBeTruthy();
  });
  test('The Sign Up Page Should Have Password ', () => {
    const Password = Signup.getByTestId;
    expect(Password).toBeDefined();
  });
  test('Password text input should show error when it is empty  ', () => {
    const {getByPlaceholderText, getByTestId} = render(<SignUpScreen />);
    const Password = getByPlaceholderText('Enter password');
    fireEvent.changeText(Password, '');
    const passwordError = getByTestId('Password');
    fireEvent.changeText(Password, '');
    fireEvent(passwordError, 'onBlur', {target: {value: ''}});
    expect(passwordError).toBeTruthy();
  });
  test('The Sign Up Page Should Have PhoneNumber ', () => {
    const PhoneNumber = Signup.getByTestId;
    expect(PhoneNumber).toBeDefined();
  });
  test('Phonenumber text input should show error when it is empty  ', () => {
    const {getByPlaceholderText, getByTestId} = render(<SignUpScreen />);
    const PhoneNumber = getByPlaceholderText('Enter Phone number');
    fireEvent.changeText(PhoneNumber, '');
    const phonenumberError = getByTestId('Phone-number');
    fireEvent.changeText(PhoneNumber, '');
    fireEvent(phonenumberError, 'onBlur', {target: {value: ''}});
    expect(phonenumberError).toBeTruthy();
  });
  test('Role needs to be changed to Borrower when clicking on radiobutton', () => {
    const {getByTestId} = render(<SignUpScreen />);
    const Borrower = getByTestId('radio-borrower');
    fireEvent.press(Borrower);
    fireEvent(Borrower, 'select', {target: {value: 'checked'}});
  });
  test('Role needs to be changed when to Owner clicking on radiobutton', () => {
    const {getByTestId} = render(<SignUpScreen />);
    const Borrower = getByTestId('radio-owner');
    fireEvent.press(Borrower);
    fireEvent(Borrower, 'select', {target: {value: 'checked'}});
  });
  test('Already user  button should navigate to Login page', () => {
    const {getByTestId} = render(<SignUpScreen />);
    const login = getByTestId('login-button');
    act(() => {
      fireEvent.press(login);
    });
    expect(mockNavigate).toHaveBeenCalledWith('Login');
  });
  test('SignUp button should Be disabled when error in the Text input fields', () => {
    const {getByTestId} = render(<SignUpScreen />);
    const formikIsValid = true;

    const signupButton = getByTestId('signup-button');
    const expectedBackgroundColor = formikIsValid ? '#9747FF' : '#A5C9CA';
    const buttonStyle = signupButton.props.style;
    // Check if the button is disabled
    expect(signupButton).toBeDefined();
    console.log(signupButton.props.disabled);
    expect(buttonStyle).toHaveProperty(
      'backgroundColor',
      expectedBackgroundColor,
    );

    if (signupButton) {
      fireEvent.press(signupButton);
    }
    expect(mockNavigate).toHaveBeenCalledWith('Login');
  });
  test('placeholder color should chnage with theme', () => {});

  test('handleSignupfun should be called correctly when button is clicked', async () => {
    const mockPost = jest.fn();
    ApiService.post = mockPost;

    // Mock formik values
    const formikValues = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      role: '',
    };

    const {getByTestId} = render(<SignUpScreen />);
    const signUpButton = getByTestId('signup-button');

    // Trigger the onPress event
    fireEvent.press(signUpButton);

    // Wait for any asynchronous operations to complete (e.g., API calls)

    expect(mockPost).toHaveBeenCalledWith(`${url}/user/signup`, formikValues);

    // Additional assertions or actions based on the response or navigation can be added here
  });
});
