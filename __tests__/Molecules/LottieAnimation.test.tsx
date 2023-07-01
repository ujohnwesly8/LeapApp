import React from 'react';
import {render} from '@testing-library/react-native';
import LottieAnimation from '../../src/components/molecules/LottieAnimation/LottieAnimation';

describe('LottieAnimation', () => {
  const source = require('../../assets/address.json'); // Replace with the actual animation source
  const style = {width: 200, height: 200}; // Replace with the desired style

  it('renders the LottieAnimation component', () => {
    render(<LottieAnimation source={source} style={style} />);
    // Add your assertion here to verify the component renders correctly
  });

  it('renders the Lottie component with the correct source', () => {
    const {getByTestId} = render(
      <LottieAnimation source={source} style={style} />,
    );
    const lottieComponent = getByTestId('lottie-component');
    // Add your assertion here to verify the Lottie component has the correct source
  });

  it('renders the Lottie component with the correct style', () => {
    const {getByTestId} = render(
      <LottieAnimation source={source} style={style} />,
    );
    const lottieComponent = getByTestId('lottie-component');
    // Add your assertion here to verify the Lottie component has the correct style
  });

  it('renders the Lottie component with autoplay enabled', () => {
    const {getByTestId} = render(
      <LottieAnimation source={source} style={style} />,
    );
    const lottieComponent = getByTestId('lottie-component');
    // Add your assertion here to verify the Lottie component has autoplay enabled
  });
});
