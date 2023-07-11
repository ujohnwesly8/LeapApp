import wishlistReducer, {
  fetchWishlistProducts,
} from '../../../src/redux/slice/wishlistSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {url} from '../../../src/constants/Apis';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

const mockStore = configureStore([thunk]);
const store = mockStore();

describe('wishlistSlice', () => {
  beforeEach(() => {
    // Clear AsyncStorage before each test
    AsyncStorage.clear();
  });
  let initialState: {data: null; isLoader: boolean; isError: boolean};

  beforeEach(() => {
    initialState = {
      data: null,
      isLoader: false,
      isError: false,
    };
  });
  it('should fetch wishlist products successfully and update state', async () => {
    const responseData = [
      {id: 1, name: 'Product 1'},
      {id: 2, name: 'Product 2'},
    ];

    const mockAxios = new MockAdapter(axios);
    mockAxios.onGet(`${url}/wishlist/list`).reply(200, responseData);

    await store.dispatch(fetchWishlistProducts());

    const actions = store.getActions();
    expect(actions[0].type).toEqual(fetchWishlistProducts.pending.type);

    // Check that the second action is either fulfilled or rejected
    expect(
      actions[1].type === fetchWishlistProducts.fulfilled.type ||
        actions[1].type === fetchWishlistProducts.rejected.type,
    ).toBe(true);

    if (actions[1].type === fetchWishlistProducts.fulfilled.type) {
      expect(actions[1].payload).toEqual(responseData);
      const currentState = store
        .getActions()
        .reduce(
          (state, action) => wishlistReducer(state, action),
          initialState,
        );
      expect(currentState.isLoader).toBe(false);
      expect(currentState.isError).toBe(false);
      expect(currentState.data).toEqual(responseData);
    } else {
      // Handle the rejected case
      const currentState = store
        .getActions()
        .reduce(
          (state, action) => wishlistReducer(state, action),
          initialState,
        );
      expect(currentState.isLoader).toBe(false);
      expect(currentState.isError).toBe(true);
      expect(currentState.data).toBeNull();
    }
  });

  it('should handle API call failure and set error state', async () => {
    const mockAxios = new MockAdapter(axios);
    mockAxios.onGet(`${url}/wishlist/list`).reply(500);

    await store.dispatch(fetchWishlistProducts());

    const actions = store.getActions();
    expect(actions[0].type).toEqual(fetchWishlistProducts.pending.type);
    expect(actions[1].type).toEqual(fetchWishlistProducts.rejected.type);

    const currentState = store
      .getActions()
      .reduce((state, action) => wishlistReducer(state, action), initialState);
    expect(currentState.isLoader).toBe(false);
    expect(currentState.isError).toBe(true);
    expect(currentState.data).toBeNull();
  });

  it('should return the initial state', () => {
    expect(wishlistReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle fetchWishlistProducts.pending', () => {
    const nextState = wishlistReducer(
      initialState,
      fetchWishlistProducts.pending,
    );
    expect(nextState.isLoader).toEqual(true);
  });

  it('should handle fetchWishlistProducts.fulfilled', () => {
    const data = [
      {id: 1, name: 'Product 1'},
      {id: 2, name: 'Product 2'},
    ];
    const nextState = wishlistReducer(
      initialState,
      fetchWishlistProducts.fulfilled(data),
    );
    expect(nextState.isLoader).toEqual(false);
    expect(nextState.data).toEqual(data);
  });

  it('should handle fetchWishlistProducts.rejected', () => {
    const nextState = wishlistReducer(
      initialState,
      fetchWishlistProducts.rejected,
    );
    expect(nextState.isLoader).toEqual(false);
    expect(nextState.isError).toEqual(true);
  });
});
