import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

// Mock AsyncStorage module
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

// Import the rest of the modules
import CartSliceReducer, {
  fetchCartProducts,
} from '../../../src/redux/slice/cartSlice';
import ApiService from '../../../src/network/network';

describe('CartSlice', () => {
  describe('fetchCartProducts', () => {
    const mockResponse = [
      {id: 1, name: 'Product 1'},
      {id: 2, name: 'Product 2'},
    ];

    beforeEach(() => {
      ApiService.get = jest.fn().mockResolvedValue(mockResponse);
    });

    it('should fetch cart products successfully and update state', async () => {
      const initialState = {
        data: null,
        isLoader: false,
        isError: false,
      };

      const action = fetchCartProducts();
      const dispatch = jest.fn();
      const response = await action(dispatch);

      expect(ApiService.get).toHaveBeenCalledTimes(1);

      const updatedState = CartSliceReducer(
        initialState,
        fetchCartProducts.fulfilled(response),
      );

      expect(updatedState.isLoader).toBe(false);
      expect(updatedState.data).toEqual(response);
    });

    it('should handle API call failure and set error state', async () => {
      const initialState = {
        data: null,
        isLoader: false,
        isError: false,
      };

      const mockError = new Error('API Error');
      ApiService.get = jest.fn().mockRejectedValue(mockError);

      const action = fetchCartProducts();
      const dispatch = jest.fn();
      await action(dispatch);

      expect(ApiService.get).toHaveBeenCalledTimes(1);

      const updatedState = CartSliceReducer(
        initialState,
        fetchCartProducts.rejected(),
      );

      expect(updatedState.isLoader).toBe(false);
      expect(updatedState.isError).toBe(true);
    });
  });
});
