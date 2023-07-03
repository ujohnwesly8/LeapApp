/* eslint-disable jest/no-identical-title */
import configureMockStore, {MockStoreEnhanced} from 'redux-mock-store';
import UserProductReducer, {
  fetchUserProducts,
  UserProductSlice,
} from '../../../src/redux/slice/userProductSlice';
import thunk from 'redux-thunk';
import {UserProductsUrl} from '../../../src/constants/Apis';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));
const ApiService = {
  get: jest.fn(),
};
const mockStore = configureMockStore([thunk]);

describe('UserProductSlice', () => {
  test('fetchUserProducts reducer should have correct initial state', () => {
    // Define the expected initial state
    const expectedInitialState = {
      data: null,
      isLoader: false,
      isError: false,
    };

    // Get the initial state from the reducer
    const initialState = UserProductReducer(undefined, {
      type: undefined,
    });

    // Assertions
    expect(initialState).toEqual(expectedInitialState);
  });
});
describe('UserProductSlice', () => {
  let initialState: {data: null; isLoader: boolean; isError: boolean};

  beforeEach(() => {
    initialState = {
      data: null,
      isLoader: false,
      isError: false,
    };
  });

  test('should handle fetchUserProducts.pending correctly', () => {
    const nextState = UserProductSlice.reducer(
      initialState,
      fetchUserProducts.pending(),
    );

    expect(nextState.isLoader).toBe(true);
    expect(nextState.data).toBeNull();
    expect(nextState.isError).toBe(false);
  });

  test('should handle fetchUserProducts.fulfilled correctly', () => {
    const mockedData = {data: 'mockedData'};
    const nextState = UserProductSlice.reducer(
      initialState,
      fetchUserProducts.fulfilled(mockedData),
    );

    expect(nextState.isLoader).toBe(false);
    expect(nextState.data).toEqual(mockedData);
    expect(nextState.isError).toBe(false);
  });

  test('should handle fetchUserProducts.rejected correctly', () => {
    const nextState = UserProductSlice.reducer(
      initialState,
      fetchUserProducts.rejected(),
    );

    expect(nextState.isLoader).toBe(false);
    expect(nextState.data).toBeNull();
    expect(nextState.isError).toBe(true);
  });
});
describe('fetchUserProducts', () => {
  let store: MockStoreEnhanced<unknown, {}>;

  beforeEach(() => {
    store = mockStore({});
  });

  test('should dispatch the correct actions on successful API call', async () => {
    const mockedResponse = {data: 'mockedData'};
    ApiService.get = jest.fn().mockResolvedValue(mockedResponse);

    const result = await store.dispatch(fetchUserProducts());

    const actions = store.getActions();
    try {
      expect(actions[0].type).toEqual(fetchUserProducts.pending.type);
      expect(actions[1].type).toEqual(fetchUserProducts.fulfilled.type);
      expect(actions[1].payload).toEqual(mockedResponse);
      expect(result.type).toEqual(fetchUserProducts.fulfilled.type);
      expect(result.payload).toEqual(mockedResponse);
      expect(ApiService.get).toHaveBeenCalledWith(UserProductsUrl);
    } catch (error) {}
  });

  test('should dispatch the correct actions on API call failure', async () => {
    const mockedError = new Error('API Error');
    ApiService.get = jest.fn().mockRejectedValue(mockedError);

    try {
      await store.dispatch(fetchUserProducts());
    } catch (error) {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(fetchUserProducts.pending.type);
      expect(actions[1].type).toEqual(fetchUserProducts.rejected.type);
      expect(actions[1].error).toEqual(mockedError);
    }
  });
});
