import React from 'react';
import {render, fireEvent, act, screen} from '@testing-library/react-native';
import LoginScreen from '../../../src/screens/LoginScreen/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Provider, useDispatch} from 'react-redux';
import {store} from '../../../src/redux/store';
import {continueText, signup} from '../../../src/constants/languages/en';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {Login} from '../../../src/redux/actions/actions'; // Import the Login action
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// Mock the dispatch function
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

// Mock the Login action
jest.mock('../../../src/redux/actions/actions', () => ({
  Login: jest.fn(),
}));

const mockNav = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNav,
    }),
  };
});

describe('LoginScreen', () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });

  //TestCase 1
  test('should navigate to the correct screen when the continue with otp is pressed', () => {
    const Stack = createNativeStackNavigator();

    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    const Otpbutton = getByTestId('Otpscreen-button');
    fireEvent.press(Otpbutton);

    expect(mockNav).toHaveBeenCalledWith('OtpScreen');
  });
  //TestCase 2
  test('should navigate to the correct screen when the Signup  Text is pressed', () => {
    const Stack = createNativeStackNavigator();

    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    const Otpbutton = getByTestId('Signup-Button');
    fireEvent.press(Otpbutton);

    expect(mockNav).toHaveBeenCalledWith('SignupScreen');
  });
  //TestCase 3
  test('renders correctly', () => {
    const Stack = createNativeStackNavigator();
    const {getByPlaceholderText, getByText, getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    const emailInput = getByPlaceholderText('Email Address');
    const passwordInput = getByPlaceholderText('Enter password');
    const signInButton = getByTestId('signin-button');
    const continueTextElement = getByText(continueText);
    const signUpText = getByText(signup);

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(signInButton).toBeTruthy();
    expect(continueTextElement).toBeTruthy();
    expect(signUpText).toBeTruthy();
  });
  //TestCase 4
  test('input fields should be editable', () => {
    const Stack = createNativeStackNavigator();
    const {getByPlaceholderText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    const emailInput = getByPlaceholderText('Email Address');
    const passwordInput = getByPlaceholderText('Enter password');

    act(() => {
      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(passwordInput, 'password123');
    });

    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('password123');
  });
  //TestCase 5
  it('sign in button should be disabled when inputs are empty', async () => {
    const Stack = createNativeStackNavigator();
    const {findByTestId, getByPlaceholderText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    const emailInput = getByPlaceholderText('Email Address');
    const passwordInput = getByPlaceholderText('Enter password');

    fireEvent.changeText(emailInput, '');
    fireEvent.changeText(passwordInput, '');

    const signInButton = await findByTestId('signin-button');
    const buttonStyle = signInButton.props.style;
    expect(buttonStyle.backgroundColor).toBe('#A7D8DE');
  });

  //TestCase 6
  test('sign in button should be enabled when inputs are valid', async () => {
    const Stack = createNativeStackNavigator();
    const {getByPlaceholderText, findByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    const emailInput = getByPlaceholderText('Email Address');
    const passwordInput = getByPlaceholderText('Enter password');

    act(() => {
      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(passwordInput, 'password123');
    });

    const signInButton = await findByTestId('signin-button');
    expect(signInButton.props.disabled).toBeUndefined();
  });
  it('should call handleLogin and dispatch the Login action when inputs are valid', () => {
    // Mock the dispatch function
    const mockDispatch = jest.fn();

    // Mock the useDispatch hook to return the mockDispatch function
    useDispatch.mockReturnValue(mockDispatch);

    const Stack = createNativeStackNavigator();
    const {getByPlaceholderText, getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    const emailInput = getByPlaceholderText('Email Address');
    const passwordInput = getByPlaceholderText('Enter password');
    const signInButton = getByTestId('signin-button');

    // Set valid values for the input fields
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'Password123');

    // Simulate button press
    fireEvent.press(signInButton);

    // Verify that handleLogin was called
    expect(mockDispatch).toHaveBeenCalledWith(
      Login('test@example.com', 'Password123'),
    );
  });
  test('should console error when login fails', async () => {
    const mockedDispatch = jest.fn();
    useDispatch.mockReturnValue(mockedDispatch);

    const Stack = createNativeStackNavigator();
    const spyConsoleLog = jest.spyOn(console, 'log');

    const {getByPlaceholderText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    // Mock form input values
    const emailInput = getByPlaceholderText('Email Address');
    const passwordInput = getByPlaceholderText('Enter password');
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'Password123');

    // Mock an error being thrown when dispatch is called
    const mockError = new Error('Login failed');
    mockedDispatch.mockRejectedValue(mockError);

    // Simulate a login attempt
    await act(async () => {
      fireEvent.press(screen.getByTestId('signin-button'));
    });

    // Verify that the error is logged to the console
    expect(spyConsoleLog).toHaveBeenCalledWith('error in login');
  });
});
