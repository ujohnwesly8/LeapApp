import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import UDetailScreen from '../../../src/screens/UProductDetails/UProductDetails';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
    goBack: mockGoBack,
  }),
}));
const mockSetActiveIndex = jest.fn();
const mockStartScrollTimer = jest.fn();
jest.mock('../../../src/screens/UProductDetails/useProductdetails', () => {
  return jest.fn().mockReturnValue({
    setActiveIndex: mockSetActiveIndex,
    startScrollTimer: mockStartScrollTimer,
  });
});

describe('UDetailScreen', () => {
  const mockStore = configureStore([]);
  const store = mockStore({});

  it('Should render the Details Page correctly', () => {
    const route = {
      params: {
        product: {
          name: 'Test Product',
          price: 10,
          description: 'This is a test product',
          imageUrl: ['image1.jpg', 'image2.jpg'],
        },
      },
    };

    const {getByTestId} = render(
      <Provider store={store}>
        <UDetailScreen route={route} navigation={{goBack: mockGoBack}} />
      </Provider>,
    );

    // Simulate the button press event
    fireEvent.press(getByTestId('back-button'));

    // Check if the goBack function was called
    expect(mockGoBack).toHaveBeenCalled();
    const scrollView = getByTestId('scroll-view');

    fireEvent.scroll(scrollView, {nativeEvent: {contentOffset: {x: 405}}});

    // Check if the setActiveIndex and startScrollTimer functions were called with the expected values
    expect(mockSetActiveIndex).toHaveBeenCalledWith(1);
    expect(mockStartScrollTimer).toHaveBeenCalled();
  });
});
