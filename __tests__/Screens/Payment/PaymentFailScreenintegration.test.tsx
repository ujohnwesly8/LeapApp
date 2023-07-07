import React from 'react';
import {render} from '@testing-library/react-native';
import PaymentFailScreen from '../../../src/screens/PaymentScreens/PaymentFailScreen';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('PaymentFailScreen', () => {
  it('renders the fail container', () => {
    const {getByTestId} = render(<PaymentFailScreen />);
    expect(getByTestId('fail-container')).toBeTruthy();
  });

  it('renders the payment failed text', () => {
    const {getByText} = render(<PaymentFailScreen />);
    expect(getByText('Payment Failed!')).toBeTruthy();
  });

  it('renders the retry text', () => {
    const {getByText} = render(<PaymentFailScreen />);
    expect(getByText('Something went wrong. Try Again.')).toBeTruthy();
  });

  it('renders the Lottie animation', () => {
    const {getByTestId} = render(<PaymentFailScreen />);
    const animationComponent = getByTestId('lottie-animation');
    expect(animationComponent).toBeTruthy();
  });

  // Add more integration tests as needed
});
