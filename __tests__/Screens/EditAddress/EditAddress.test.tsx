import React from 'react';
import EditAddress, {
  SkeletonLoader,
} from '../../../src/screens/EditAddress/EditAddress';
import {fireEvent, render} from '@testing-library/react-native';
import {store} from '../../../src/redux/store';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

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
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useRoute: () => ({
    params: {address: {}},
  }),
}));
describe('EditAddress Screen', () => {
  it('should render EditAddress Page', () => {
    const result = render(
      <Provider store={store}>
        <NavigationContainer>
          <EditAddress />
        </NavigationContainer>
      </Provider>,
    );
    expect(result).toBeTruthy();
  });
  it('should render skeleton Loader', () => {
    const loader = render(<SkeletonLoader />);
    expect(loader).toBeDefined();
  });
  it('Should display the Text inputs', () => {
    const {getByTestId, getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <EditAddress />
        </NavigationContainer>
      </Provider>,
    );
    const editAddressHeading = getByText('Edit address');
    const addressLine1Input = getByTestId('Flat');
    const addressLine2Input = getByTestId('Street');
    const stateInput = getByTestId('State');
    const cityInput = getByTestId('City');
    const pincodeInput = getByTestId('Pincode');
    fireEvent.changeText(addressLine1Input, 'New address line 1');
    fireEvent.changeText(addressLine2Input, 'New address line 2');
    fireEvent.changeText(stateInput, 'New state');
    fireEvent.changeText(cityInput, 'New city');
    fireEvent.changeText(pincodeInput, 'New pincode');

    // Assert that the elements are rendered correctly
    expect(editAddressHeading).toBeTruthy();
    expect(addressLine1Input).toBeTruthy();
    expect(addressLine2Input).toBeTruthy();
    expect(stateInput).toBeTruthy();
    expect(cityInput).toBeTruthy();
    expect(pincodeInput).toBeTruthy();
  });
  it('should change the radioButton', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <EditAddress />
        </NavigationContainer>
      </Provider>,
    );
    const RadioButton = getByTestId('Radio-Office');
    fireEvent.press(RadioButton);
  });
  it('should change the HomeradioButton', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <EditAddress />
        </NavigationContainer>
      </Provider>,
    );
    const RadioButton = getByTestId('Radio-Home');
    fireEvent.press(RadioButton);
  });
});
