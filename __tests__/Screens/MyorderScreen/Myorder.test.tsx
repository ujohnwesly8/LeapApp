import {Provider} from 'react-redux';
import MyOrder, {OrderDetailsModal} from '../../../src/screens/MyOrder/MyOrder';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import {store} from '../../../src/redux/store';
import React from 'react';
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

describe('My Order Screen', () => {
  const result = render(
    <Provider store={store}>
      <MyOrder />
    </Provider>,
  );

  it('Should render My order screen', async () => {
    expect(result).toBeTruthy();
  });

  it('should render empty screen when OrderProducts is empty', async () => {
    const mockOrderProducts = []; // Empty array for OrderProducts

    jest.spyOn(ApiService, 'get').mockResolvedValue(mockOrderProducts);

    const {queryByTestId} = render(
      <Provider store={store}>
        <MyOrder />
      </Provider>,
    );

    await waitFor(() => {
      const emptyOrdersMessage = queryByTestId('order-empty'); // Replace with the expected content of the empty orders message
      expect(emptyOrdersMessage).toBeTruthy();
    });
  });
  it('should render orders in the Order screen', async () => {
    const mockOrderProducts = [
      {
        id: 1,
        orderItems: [
          {id: 1, createdDate: '2023-07-10', status: 'Completed'},
          {id: 2, createdDate: '2023-07-11', status: 'Pending'},
        ],
      },
    ];

    jest.spyOn(ApiService, 'get').mockResolvedValue(mockOrderProducts);

    const {getByText} = render(
      <Provider store={store}>
        <MyOrder />
      </Provider>,
    );

    await waitFor(() => {
      const orderItem = getByText('Order Id: 1');
      expect(orderItem).toBeTruthy();
    });
  });
  it('should render modals in the Order screen', async () => {
    const mockOrderProducts = [
      {
        id: 1,
        orderItems: [
          {id: 1, createdDate: '2023-07-10', status: 'Completed'},
          {id: 2, createdDate: '2023-07-11', status: 'Pending'},
        ],
      },
    ];

    jest.spyOn(ApiService, 'get').mockResolvedValue(mockOrderProducts);

    const {getByTestId} = render(
      <Provider store={store}>
        <MyOrder />
      </Provider>,
    );
    await waitFor(() => {
      mockOrderProducts.forEach(product => {
        const productName = getByTestId(`order-${product.id}`);
        expect(productName).toBeDefined();
      });
    });
    const OpenModal = getByTestId('order-1');
    fireEvent.press(OpenModal);
  });
  it('should render modal in the Order screen', async () => {
    const mockOrderProducts = [
      {
        id: 1,
        orderItems: [
          {id: 1, createdDate: '2023-07-10', status: 'Completed'},
          {id: 2, createdDate: '2023-07-11', status: 'Pending'},
        ],
      },
    ];

    jest.spyOn(ApiService, 'get').mockResolvedValue(mockOrderProducts);

    const {getByTestId} = render(
      <Provider store={store}>
        <MyOrder />
      </Provider>,
    );
    await waitFor(() => {
      mockOrderProducts.forEach(order => {
        order.orderItems.forEach(product => {
          const productName = getByTestId(`Order-${order.id}-${product.id}`);
          expect(productName).toBeDefined();
        });
      });
    });

    const OpenModal = getByTestId('Order-1-1');
    fireEvent.press(OpenModal);
  });
});
describe('OrderDetailsModal', () => {
  const onClose = jest.fn();
  const order = {
    id: 1,
    orderItems: [
      {id: 1, name: 'Item 1'},
      {id: 2, name: 'Item 2'},
    ],
  };
  it('Should render the order modal ', () => {
    const result = render(
      <OrderDetailsModal onClose={onClose} visible={true} order={order} />,
    );
    expect(result).toBeTruthy();
  });
});
