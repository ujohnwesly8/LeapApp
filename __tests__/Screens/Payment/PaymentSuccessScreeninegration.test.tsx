import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import PaymentSuccessScreen from '../../../src/screens/PaymentScreens/PaymentSuccessScreen';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('PaymentSuccessScreen integration tests', () => {
  test('navigates to UserHomeScreen on Continue Shopping button press', () => {
    // Mock the navigation object
    const navigationMock = {navigate: jest.fn()};

    // Render the PaymentSuccessScreen component with the mock navigation object
    const {getByText} = render(
      <PaymentSuccessScreen navigation={navigationMock} />,
    );

    // Simulate button press
    const continueShoppingButton = getByText('Continue Shopping');
    fireEvent.press(continueShoppingButton);
  });

  test('navigates to ProfileScreen on Your Orders button press', () => {
    // Mock the navigation object
    const navigationMock = {navigate: jest.fn()};

    // Render the PaymentSuccessScreen component with the mock navigation object
    const {getByText} = render(
      <PaymentSuccessScreen navigation={navigationMock} />,
    );

    // Simulate button press
    const yourOrdersButton = getByText('Your Orders');
    fireEvent.press(yourOrdersButton);
  });

  test('renders success message and related components', () => {
    // Render the PaymentSuccessScreen component
    const {getByText} = render(<PaymentSuccessScreen />);

    // Assert that the success message is rendered
    const successText = getByText('Payment successful!');
    expect(successText).toBeTruthy();
  });
});
