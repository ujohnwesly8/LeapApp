import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Address from '../../../src/screens/Owneraddaddress/Address';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const mockNavigation = {
    navigate: mockNavigate,
    addListener: jest.fn(),
  };
  return {
    useNavigation: () => mockNavigation,
  };
});

// Mock the useAddress hook
jest.mock('../../../src/screens/Owneraddaddress/useAddress', () => ({
  __esModule: true,
  default: () => ({
    handleOwnerAddAddress: jest.fn(),
    handleDeleteAddress: jest.fn(),
    closeModal: jest.fn(),
    showModal: false,
    addressList: [
      {
        id: 1,
        addressLine1: '123 Main Street',
        addressLine2: 'Apt 4B',
        postalCode: '12345',
        city: 'New York',
        state: 'NY',
        country: 'USA',
      },
    ],
    handleEditItems: jest.fn(),
    isLoading: false,
  }),
}));

describe('Address component', () => {
  test('renders address list correctly', () => {
    const {getByText} = render(<Address />);
    const addressHeading = getByText('Address');
    expect(addressHeading).toBeTruthy();
  });

  test('calls handleEditItems when edit button is pressed', () => {
    const {getByTestId} = render(<Address />);
    fireEvent.press(getByTestId('edit-button-1'));
    // Add your assertions here
  });

  test('calls handleDeleteAddress when delete button is pressed', () => {
    const {getByTestId} = render(<Address />);
    fireEvent.press(getByTestId('delete-button-1'));
    // Add your assertions here
  });
});
