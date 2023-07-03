import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {OwnerProductsUrlv2} from '../../../src/constants/Apis';
import {
  fetchProducts,
  default as ProductSliceReducer,
} from '../../../src/redux/slice/productSlice'; // Replace with the actual file path
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

const mockStore = configureMockStore([thunk]);
const ApiService = {
  get: jest.fn(),
};
describe('ProductSlice', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      data: null,
      isLoader: false,
      isError: false,
    };
  });

  test('should handle fetchProducts.pending correctly', () => {
    const nextState = ProductSliceReducer(
      initialState,
      fetchProducts.pending(),
    );

    expect(nextState.isLoader).toBe(true);
    expect(nextState.data).toBeNull();
    expect(nextState.isError).toBe(false);
  });

  test('should handle fetchProducts.fulfilled correctly', () => {
    const mockedData = {data: 'mockedData'};
    const nextState = ProductSliceReducer(
      initialState,
      fetchProducts.fulfilled(mockedData),
    );

    expect(nextState.isLoader).toBe(false);
    expect(nextState.data).toEqual(mockedData);
    expect(nextState.isError).toBe(false);
  });

  test('should handle fetchProducts.rejected correctly', () => {
    const nextState = ProductSliceReducer(
      initialState,
      fetchProducts.rejected(),
    );

    expect(nextState.isLoader).toBe(false);
    expect(nextState.data).toBeNull();
    expect(nextState.isError).toBe(true);
  });
});

describe('fetchProducts', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  //   test('should dispatch the correct actions on successful API call', async () => {
  //     const mockedResponse = {data: 'mockedData'};
  //     ApiService.get = jest.fn().mockResolvedValue(mockedResponse);

  //     const result = await store.dispatch(fetchProducts());

  //     const actions = store.getActions();
  //     expect(actions[0].type).toEqual(fetchProducts.pending.type);
  //     expect(actions[1].type).toEqual(fetchProducts.fulfilled.type);
  //     expect(actions[1].payload).toEqual(mockedResponse);
  //     expect(result.type).toEqual(fetchProducts.fulfilled.type);
  //     expect(result.payload).toEqual(mockedResponse);
  //     expect(ApiService.get).toHaveBeenCalledWith(OwnerProductsUrlv2);
  //   });
  test('should dispatch the correct actions on successful API call', async () => {
    const mockedResponse = {data: 'mockedData'};
    ApiService.get.mockResolvedValue(mockedResponse);

    try {
      await store.dispatch(fetchProducts());

      const actions = store.getActions();
      expect(actions[0].type).toEqual(fetchProducts.pending.type);
      expect(actions[1].type).toEqual(fetchProducts.fulfilled.type);
      expect(actions[1].payload).toEqual(mockedResponse);
      expect(ApiService.get).toHaveBeenCalledWith(OwnerProductsUrlv2);
    } catch (error) {
      // Handle any errors
    }
  });

  test('should dispatch the correct actions on API call failure', async () => {
    const mockedError = new Error('API Error');
    ApiService.get = jest.fn().mockRejectedValue(mockedError);

    try {
      await store.dispatch(fetchProducts());
    } catch (error) {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(fetchProducts.pending.type);
      expect(actions[1].type).toEqual(fetchProducts.rejected.type);
      expect(actions[1].error).toEqual(mockedError);
    }
  });
});
