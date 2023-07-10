import React from 'react';
import {render} from '@testing-library/react-native';
import {Provider, useSelector} from 'react-redux';
import Wishlist from '../../../src/screens/Wishlist/Wishlist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {store} from '../../../src/redux/store';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

describe('Wishlist', () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });

  beforeEach(() => {
    useSelector.mockReturnValue({
      WishlistProducts: {
        data: [
          {id: 1, name: 'Product 1', imageUrl: ['image1.jpg'], price: 10},
          {id: 2, name: 'Product 2', imageUrl: ['image2.jpg'], price: 20},
        ],
        isLoader: false,
      },
    });
  });

  it('should render the Wishlist page correctly', () => {
    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Wishlist navigation={jest.fn()} route={{name: ''}} />
        </NavigationContainer>
      </Provider>,
    );

    // Add your assertions to check if the Wishlist page renders correctly
    expect(getByText('Wishlist')).toBeTruthy();
    // ... add more assertions based on your component's structure
  });
});
