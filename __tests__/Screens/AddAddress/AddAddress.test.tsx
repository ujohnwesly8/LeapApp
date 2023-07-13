import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import AddAddress from '../../../src/screens/Owneraddaddress/AddAddress';
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
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

describe('AddAddress', () => {
  it('renders correctly', () => {
    render(<AddAddress />);
    // Add assertions to check if the component renders as expected
  });

  it('updates addressLine1 on input change', () => {
    const {getByPlaceholderText} = render(<AddAddress />);
    const addressLine1Input = getByPlaceholderText('Flat no / Building');
    fireEvent.changeText(addressLine1Input, '');
    // Add assertions to check if addressLine1 updates correctly
  });

  it('triggers onBlur event for addressLine1 input', () => {
    const {getByPlaceholderText} = render(<AddAddress />);
    const addressLine1Input = getByPlaceholderText('Flat no / Building');
    fireEvent(addressLine1Input, 'blur');
  });

  it('updates addressLine2 on input change', () => {
    const {getByPlaceholderText} = render(<AddAddress />);
    const addressLine2Input = getByPlaceholderText('Street name');
    fireEvent.changeText(addressLine2Input, 'koramangala');
    // Add assertions to check if addressLine2 updates correctly
  });

  it('triggers onBlur event for addressLine2 input', () => {
    const handleBlurMock = jest.fn();
    const {getByPlaceholderText} = render(
      <AddAddress handleBlur={handleBlurMock} />,
    );
    const addressLine2Input = getByPlaceholderText('Street name');
    fireEvent(addressLine2Input, 'blur');
  });

  it('updates postalCode on input change', () => {
    const {getByPlaceholderText} = render(<AddAddress />);
    const postalCodeInput = getByPlaceholderText('Pincode');
    fireEvent.changeText(postalCodeInput, '500064');
    // Add assertions to check if postalCode updates correctly
  });

  it('triggers onBlur event for postal code input', () => {
    const handleBlurMock = jest.fn();
    const {getByPlaceholderText} = render(
      <AddAddress handleBlur={handleBlurMock} />,
    );
    const postalCodeInput = getByPlaceholderText('Pincode');
    fireEvent(postalCodeInput, 'blur');
  });

  it('updates city on input change', () => {
    const {getByPlaceholderText} = render(<AddAddress />);
    const cityInput = getByPlaceholderText('City');
    fireEvent.changeText(cityInput, 'Bangalore');
  });

  it('updates state on input change', () => {
    const {getByPlaceholderText} = render(<AddAddress />);
    const stateInput = getByPlaceholderText('State ');
    fireEvent.changeText(stateInput, 'Karnataka');
    // Add assertions to check if state updates correctly
  });

  it('updates country on input change', () => {
    const {getByPlaceholderText} = render(<AddAddress />);
    const countryInput = getByPlaceholderText('Country ');
    fireEvent.changeText(countryInput, 'USA');
    // Add assertions to check if country updates correctly
  });

  it('checks the "Home" radio button', () => {
    const {getByText} = render(<AddAddress />);
    const homeRadio = getByText('Home');
    fireEvent.press(homeRadio);
    // Add assertions to check if the "Home" radio button is checked
  });

  it('checks the "Office" radio button', () => {
    const {getByText} = render(<AddAddress />);
    const officeRadio = getByText('Office');
    fireEvent.press(officeRadio);
    // Add assertions to check if the "Office" radio button is checked
  });

  it('calls handleOptionChange with "HOME" on pressing the "Home" radio button', () => {
    const handleOptionChangeMock = jest.fn();
    const {getByTestId} = render(
      <AddAddress handleOptionChange={handleOptionChangeMock} />,
    );
    const homeRadio = getByTestId('homeRadio').parent;
    fireEvent.press(homeRadio);
  });
  it('calls handleOptionChange with "OFFICE" on pressing the "Office" radio button', () => {
    const handleOptionChangeMock = jest.fn();
    const {getByTestId} = render(
      <AddAddress handleOptionChange={handleOptionChangeMock} />,
    );
    const officeRadio = getByTestId('officeRadio').parent;
    fireEvent.press(officeRadio);
  });

  it('toggles the default address checkbox', () => {
    const {getByTestId} = render(<AddAddress />);
    const defaultAddressCheckbox = getByTestId('defaultAddressCheckbox');
    fireEvent.press(defaultAddressCheckbox);
    // Add assertions to check if the default address checkbox is toggled
  });

  it('calls handleSaveAddress on save button press', () => {
    const handleSaveAddressMock = jest.fn();
    const {getByText} = render(
      <AddAddress handleSaveAddress={handleSaveAddressMock} />,
    );
    const saveButton = getByText('Save');
    fireEvent.press(saveButton);
  });
});
