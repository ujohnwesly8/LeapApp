import React, {useEffect, useState} from 'react';
import {
  act,
  fireEvent,
  render,
  renderHook,
} from '@testing-library/react-native';
import OwnerEditProfile, {
  SkeletonLoader,
} from '../../../src/screens/Ownereditprofile/OwnerEditProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Provider} from 'react-redux';
import {store} from '../../../src/redux/store';
import {NavigationContainer} from '@react-navigation/native';
jest.mock(
  '../../../src/screens/Ownereditprofile/useOwnerProfile',
  () => () => ({
    firstName: 'John',
    setFirstName: jest.fn(),
    lastName: 'Doe',
    setLastName: jest.fn(),
    email: 'john.doe@example.com',
    showModal: false,
    closeModal: jest.fn(),
    setEmail: jest.fn(),
    phoneNumber: '1234567890',
    setPhoneNumber: jest.fn(),
    handleUpdate: jest.fn(),
    isLoading: false,
  }),
);
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

describe('OwnerEditProfile', () => {
  beforeEach(() => {
    // Clear AsyncStorage before each test
    AsyncStorage.clear();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('should render the Edit Profile page correctly', () => {
    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <OwnerEditProfile />
        </NavigationContainer>
      </Provider>,
    );
    expect(getByText('Edit profile')).toBeTruthy();
  });
  it('should render skeleton Loader', () => {
    const loader = render(<SkeletonLoader />);
    expect(loader).toBeDefined();
  });
  test('should set isFormValid to true when all fields have non-empty values', () => {
    // Render the hook and initialize the state variables
    const {result} = renderHook(() => {
      const [firstName, setFirstName] = useState('');
      const [lastName, setLastName] = useState('');
      const [email, setEmail] = useState('');
      const [phoneNumber, setPhoneNumber] = useState('');
      const [isFormValid, setIsFormValid] = useState(false);

      useEffect(() => {
        setIsFormValid(
          firstName.trim().length > 0 &&
            lastName.trim().length > 0 &&
            email.trim().length > 0 &&
            phoneNumber.trim().length > 0,
        );
      }, [firstName, lastName, email, phoneNumber]);

      return {
        firstName,
        setFirstName,
        lastName,
        setLastName,
        email,
        setEmail,
        phoneNumber,
        setPhoneNumber,
        isFormValid,
      };
    });

    // Assert that the initial isFormValid value is false
    expect(result.current.isFormValid).toBe(false);

    // Update the values of firstName, lastName, email, and phoneNumber
    act(() => {
      result.current.setFirstName('Jane');
      result.current.setLastName('Smith');
      result.current.setEmail('jane@example.com');
      result.current.setPhoneNumber('9876543210');
    });

    // Assert that isFormValid has been updated to true
    expect(result.current.isFormValid).toBe(true);
  });
  it('Should display the Text inputs', () => {
    const {getByTestId, getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <OwnerEditProfile />
        </NavigationContainer>
      </Provider>,
    );
    const editAddressHeading = getByText('Edit profile');
    const firstname = getByTestId('firstname');
    const lastname = getByTestId('lastName');
    const email = getByTestId('email');
    const phonenumber = getByTestId('phoneNumber');
    fireEvent.changeText(firstname, 'John');
    fireEvent.changeText(lastname, 'wesly');
    fireEvent.changeText(email, 'john@gmail.com');
    fireEvent.changeText(phonenumber, '1629203872');

    // Assert that the elements are rendered correctly
    expect(editAddressHeading).toBeTruthy();
    expect(firstname).toBeTruthy();
    expect(lastname).toBeTruthy();
    expect(email).toBeTruthy();
    expect(phonenumber).toBeTruthy();
  });
});
