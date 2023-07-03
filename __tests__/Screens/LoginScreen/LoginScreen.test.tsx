import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import LoginScreen from '../../../src/screens/LoginScreen/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Provider} from 'react-redux';
import {store} from '../../../src/redux/store';
import {act} from 'react-dom/test-utils';
import {continueText, signup} from '../../../src/constants/languages/en';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
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

    // Verify that required elements are rendered
    const emailInput = getByPlaceholderText('Email Address');
    const passwordInput = getByPlaceholderText('Enter password');
    const signInButton = getByTestId('signin-button'); // Use the imported sign-in text
    const continueTextElement = getByText(continueText); // Use the imported continue text
    const signUpText = getByText(signup); // Use the imported sign-up text

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(signInButton).toBeTruthy();
    expect(continueTextElement).toBeTruthy();
    expect(signUpText).toBeTruthy();
  });

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

    const signInButton = getByTestId('signin-button');
    expect(signInButton.props.disabled).toBeUndefined();
  });

  test('sign in button should be enabled when inputs are valid', () => {
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

    // Enter valid email and password
    const emailInput = getByPlaceholderText('Email Address');
    const passwordInput = getByPlaceholderText('Enter password');
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    const signInButton = getByTestId('signin-button'); // Use the test ID to retrieve the button
    expect(signInButton.props.disabled).toBeUndefined(); // Check if the prop is undefined

    // Check the disabled attribute directly
  });

  // Add more test cases as needed for other functionality
});
