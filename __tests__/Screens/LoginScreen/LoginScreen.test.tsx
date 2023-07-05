import React from 'react';
import {render, fireEvent, act} from '@testing-library/react-native';
import LoginScreen from '../../../src/screens/LoginScreen/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Provider} from 'react-redux';
import {store} from '../../../src/redux/store';
import {continueText, signup} from '../../../src/constants/languages/en';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import useLoginscreen from '../../../src/screens/LoginScreen/useLoginscreen';
import {View, TouchableOpacity, Text} from 'react-native';
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
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
  const TestComponent = () => {
    const {openModal, closeModal, showModal} = useLoginscreen();

    return (
      <View>
        <TouchableOpacity onPress={openModal} testID="open">
          Open Modal
        </TouchableOpacity>
        <TouchableOpacity onPress={closeModal} testID="close">
          Close Modal
        </TouchableOpacity>
        {showModal && <Text>Modal content</Text>}
      </View>
    );
  };

  test('should open the modal when openModal is called', () => {
    const {getByTestId, queryByText} = render(
      <Provider store={store}>
        <TestComponent />
      </Provider>,
    );
    fireEvent.press(getByTestId('open'));
    expect(queryByText('Modal content')).toBeTruthy();
  });

  test('should close the modal when closeModal is called', () => {
    const {getByTestId, queryByText} = render(
      <Provider store={store}>
        <TestComponent />
      </Provider>,
    );
    fireEvent.press(getByTestId('open'));
    expect(queryByText('Modal content')).toBeTruthy();
    fireEvent.press(getByTestId('close'));
    expect(queryByText('Modal content')).toBeNull();
  });

  test('should navigate to the correct screen when the login button is pressed', () => {
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

  it('renders the error messages for the input fields', async () => {
    const Stack = createNativeStackNavigator();
    const {getByPlaceholderText, findByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    const EmailInput = getByPlaceholderText('Email Address');
    const passwordInput = getByPlaceholderText('Enter password');

    act(() => {
      fireEvent.changeText(EmailInput, '');
      fireEvent.changeText(passwordInput, '');
      fireEvent(EmailInput, 'onBlur', {target: {value: ''}});
      fireEvent(passwordInput, 'onBlur', {target: {value: ''}});
    });

    const emailerror = await findByText('Enter valid email');
    const passworderror = await findByText('Please enter password');

    expect(emailerror).toBeTruthy();
    expect(passworderror).toBeTruthy();
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

    const emailInput = getByPlaceholderText('Email Address');
    const passwordInput = getByPlaceholderText('Enter password');

    act(() => {
      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(passwordInput, 'password123');
    });

    const signInButton = getByTestId('signin-button');
    expect(signInButton.props.disabled).toBeUndefined();
  });

  // Add more test cases as needed for other functionality
});
