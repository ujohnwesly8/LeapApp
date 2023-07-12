import React from 'react';
import {
  act,
  fireEvent,
  render,
  renderHook,
  waitFor,
} from '@testing-library/react-native';
import {store} from '../../../src/redux/store';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import Wishlist from '../../../src/screens/Wishlist/Wishlist';
import useWishlist from '../../../src/screens/Wishlist/useWishlist';
import ApiService from '../../../src/network/network';
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => {
    return {
      navigate: mockNavigate,
      addListener: jest.fn(),
    };
  },
}));

describe('Wishlist Screen', () => {
  it('should render Wishlist Page', () => {
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
  it('should open modal ', () => {
    const modal = renderHook(() => useWishlist(), {
      wrapper: ({children}) => (
        <Provider store={store}>
          <NavigationContainer>{children}</NavigationContainer>
        </Provider>
      ),
    });
    expect(modal.result.current.showModal).toBe(false);
    act(() => {
      modal.result.current.openModal();
    });
    expect(modal.result.current.showModal).toBe(true);
  });
  it('should close modal ', () => {
    const modal = renderHook(() => useWishlist(), {
      wrapper: ({children}) => (
        <Provider store={store}>
          <NavigationContainer>{children}</NavigationContainer>
        </Provider>
      ),
    });
    expect(modal.result.current.showModal).toBe(false);
    act(() => {
      modal.result.current.closeModal();
    });
    expect(modal.result.current.showModal).toBe(false);
  });
  it('should delete product whenever heart icon pressed', async () => {
    const mockResponse = {data: {success: true}};
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
    jest.spyOn(ApiService, 'get').mockResolvedValue(items);
    const {getByText, getByTestId} = render(
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
    jest.spyOn(ApiService, 'delete').mockResolvedValue(mockResponse);
    await waitFor(() => {
      items.forEach(product => {
        const productName = getByText(product.name);
        expect(productName).toBeDefined();
      });
    });
    const removeButton = getByTestId('heart-1');
    fireEvent.press(removeButton);
  });
  it('should navigate to ProductDetails screen on item press', async () => {
    const products = [
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
    const mockNavigation = {
      navigate: mockNavigate,
    };

    const {getByTestId, getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Wishlist
            route={{
              name: '',
            }}
            navigation={mockNavigation}
          />
        </NavigationContainer>
      </Provider>,
    );
    await waitFor(() => {
      products.forEach(product => {
        const productName = getByText(product.name);
        expect(productName).toBeDefined();
      });
    });
    // Find the product item and simulate a press event
    fireEvent.press(getByTestId('productdetails-1'));

    // Check if navigate function is called with the correct arguments
    expect(mockNavigate).toHaveBeenCalledWith('UProductDetails', {
      product: products[0],
    });
  });
  it('should fetch wishlist products on focus', async () => {
    const mockDispatch = jest.fn();

    const mockAddListener = jest.fn((event, callback) => {
      if (event === 'focus') {
        callback();
      }
    });

    const mockNavigation = {
      addListener: mockAddListener,
    };

    jest.spyOn(store, 'dispatch').mockImplementation(mockDispatch);

    render(
      <Provider store={store}>
        <NavigationContainer>
          <Wishlist
            navigation={mockNavigation}
            route={{
              name: '',
            }}
          />
        </NavigationContainer>
      </Provider>,
    );

    // Wait for the dispatch to be called
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
    });
  });
  it('onRefresh dispatches action', async () => {
    let mockDispatchMock = jest.fn();

    jest.mock('react-redux', () => ({
      useDispatch: () => mockDispatchMock,
    }));
    const {result}: {result: any} = renderHook(() => useWishlist(), {
      wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
    });
    expect(result.current.refreshing).toBe(false);
    act(async () => {
      await result.current.onRefresh();
    });
    expect(result.current.refreshing).toBe(true);
  });
  it('renders loading view when wishlist is not available', async () => {
    const products = [
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
    jest.spyOn(ApiService, 'get').mockResolvedValue(!products);

    const {queryAllByTestId, queryByText} = render(
      <Provider store={store}>
        <Wishlist
          route={{
            name: '',
          }}
          navigation={undefined}
        />
      </Provider>,
    );
    const loadingView = queryAllByTestId('loading-view');
    expect(loadingView).toBeDefined();
    const loadingText = await queryByText('The Items are Loading...');
    expect(loadingText).toBeDefined();
  });
});
