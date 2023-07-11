import {act, renderHook} from '@testing-library/react-native';
import useCart from '../../../src/screens/Cart/useCart';
import {Provider} from 'react-redux';
import React from 'react';
import {store} from '../../../src/redux/store';
import ApiService from '../../../src/network/network';

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
describe('useCart', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const {result} = renderHook(() => useCart(), {
    wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
  });
  it('Should check the working of useCart hook', () => {
    expect(result).toBeDefined();
  });
  it('This should open modal', () => {
    const cart = renderHook(() => useCart(), {
      wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
    });
    act(() => {
      cart.result.current.openModal();
    });
    expect(cart.result.current.showModal).toBe(true);
  });
  it('This should close  modal', () => {
    expect(result.current.showModal).toBe(false);

    // Open the modal
    act(() => {
      result.current.closeModal();
    });

    // After opening the modal, showModal should be true
    expect(result.current.showModal).toBe(false);
  });
  it('handle increment should disable the button', () => {
    const cartDetails = renderHook(() => useCart(), {
      wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
    });
    const item = {
      product: {
        id: 10, // Provide a valid id value
        availableQuantities: 3, // Provide a valid availableQuantities value
      },
      quantity: 3, // Provide a valid quantity value
    };

    expect(cartDetails.result.current.isplusDisable).toBe(false);
    act(() => {
      cartDetails.result.current.handleIncrement(item);
    });
    expect(cartDetails.result.current.isplusDisable).toBe(true);
  });
  it('should throw an error when there is an error in API', async () => {
    const productId = 10;
    const error = new Error('Request failed with status code 403');
    jest.spyOn(ApiService, 'put').mockRejectedValueOnce(new Error('API error'));

    // Call the handleRemove function and expect it to throw an error
    await expect(result.current.handleRemove(productId)).rejects.toThrow(error);
  });
});
