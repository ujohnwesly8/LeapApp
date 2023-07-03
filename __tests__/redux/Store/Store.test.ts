import thunk from 'redux-thunk';
import {applyMiddleware} from 'redux';
import {createStore, RootReducers} from '../../../src/redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

describe('Store', () => {
  beforeEach(() => {
    // Clear AsyncStorage before each test
    AsyncStorage.clear();
  });

  let store;

  beforeEach(() => {
    store = createStore(RootReducers, applyMiddleware(thunk));
  });

  it('should create the store with the correct reducers', () => {
    const state = store.getState();
    expect(state).toHaveProperty('Reducers');
    expect(state).toHaveProperty('products');
    expect(state).toHaveProperty('AddressReducers');
    expect(state).toHaveProperty('ItemsReducer');
    expect(state).toHaveProperty('SizeReducer');
    expect(state).toHaveProperty('GenderReducer');
    expect(state).toHaveProperty('Rolereducer');
    expect(state).toHaveProperty('CartReducer');
    expect(state).toHaveProperty('WishlistReducer');
    expect(state).toHaveProperty('UserProducts');
    expect(state).toHaveProperty('WishlistProducts');
    expect(state).toHaveProperty('CartProducts');
    expect(state).toHaveProperty('OrderProducts');
    expect(state).toHaveProperty('editItem');
  });

  it('should have the thunk middleware applied', () => {
    const middleware = store.dispatch;
    expect(middleware).toEqual(expect.any(Function));
  });
});
