import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {store} from '../../../src/redux/store';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import Wishlist from '../../../src/screens/Wishlist/Wishlist';

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
          <Wishlist
            route={{
              name: '',
            }}
            navigation={undefined}
          />
        </NavigationContainer>
      </Provider>,
    );
    expect(result).toBeTruthy();
  });
  it('should navigate to ProductDetailsPage on button press', () => {
    const items = [
      {
        id: 1,
        name: 'Product 1',
        imageUrl: 'https://example.com/product1.jpg',
      },
      {
        id: 2,
        name: 'Product 2',
        imageUrl: 'https://example.com/product2.jpg',
      },
    ];
    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Wishlist
            route={{
              name: '',
            }}
            navigation={undefined}
          />
        </NavigationContainer>
      </Provider>,
    );
    jest
      .spyOn(require('@react-navigation/native'), 'useNavigation')
      .mockReturnValue({
        navigate: mockNavigate,
      });

    // Simulate button press
    fireEvent.press(getByTestId('product-item'));

    // Check if navigate function is called with the correct arguments
    expect(mockNavigate).toHaveBeenCalledWith('ProductDetailsPage', {
      product: items[0],
    });
  });
});
