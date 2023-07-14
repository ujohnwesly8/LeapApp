import {render, waitFor, within} from '@testing-library/react-native';
import React from 'react';
import FilteredAnalytics from '../../../src/screens/FilteredAnalytics/FilteredAnalytics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from '../../../src/redux/store';
import ApiService from '../../../src/network/network';
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('FilteredAnalytics', () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });

  test('renders without errors', () => {
    render(
      <Provider store={store}>
        <NavigationContainer>
          <FilteredAnalytics />
        </NavigationContainer>
      </Provider>,
    );
  });

  test('renders loading spinner when loading', () => {
    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <FilteredAnalytics />
        </NavigationContainer>
      </Provider>,
    );

    const loadingText = getByText('Loading...');
    expect(loadingText).toBeTruthy();
  });

  test('does not display dashboard items when data object is empty', async () => {
    const data = {};

    const {queryByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <FilteredAnalytics data={data} />
        </NavigationContainer>
      </Provider>,
    );

    const janView = queryByTestId('jan-view');
    expect(janView).toBeNull();
  });
  test('displays no data message when chartData length is 0', async () => {
    const chartData = [];

    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <FilteredAnalytics chartData={chartData} />
        </NavigationContainer>
      </Provider>,
    );

    const noDataMessage = await waitFor(() => getByTestId('no-data-message'));
    expect(noDataMessage).toBeTruthy();
  });

  test('displays chart when chartData length is greater than 0', async () => {
    const chartData = [
      {month: 'January', rentalCost: 1000},
      {month: 'February', rentalCost: 2000},
    ];

    const {queryByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <FilteredAnalytics chartData={chartData} />
        </NavigationContainer>
      </Provider>,
    );

    const chartContainer = queryByTestId('line-chart');
    expect(chartContainer).toBeTruthy();
  });

  test('displays chart when chartData length is greater than 0', async () => {
    const chartData = [
      {month: 'January', rentalCost: 1000},
      {month: 'February', rentalCost: 2000},
    ];

    const {queryByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <FilteredAnalytics chartData={chartData} />
        </NavigationContainer>
      </Provider>,
    );

    const chartContainer = queryByTestId('chart-container');
    expect(chartContainer).not.toBeNull();
  });

  test('displays dashboard items when data object has items', async () => {
    const data = {
      January: [
        {
          borrowerId: '1',
          borrowerName: 'John',
          rentalCost: 100,
          name: 'Item 1',
          quantity: 2,
          borrowerPhoneNumber: '123456789',
        },
        {
          borrowerId: '2',
          borrowerName: 'Jane',
          rentalCost: 200,
          name: 'Item 2',
          quantity: 1,
          borrowerPhoneNumber: '987654321',
        },
      ],
    };
    jest.spyOn(ApiService, 'get').mockResolvedValue(data);
    const {getByTestId, queryByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <FilteredAnalytics />
        </NavigationContainer>
      </Provider>,
    );

    const janView = queryByTestId('jan-view');
    expect(janView).toBeNull();

    const dashboardItems = within(janView).queryByTestId('dashboard-item');
    expect(dashboardItems).toHaveLength(data.January.length);
  });

  test('addPrefixToYLabel formats the value correctly', () => {
    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <FilteredAnalytics />,
        </NavigationContainer>
      </Provider>,
    );
    const value = 100;

    const addPrefixToYLabel = (value: any) => `₹ ${value}`;
    const formattedValue = addPrefixToYLabel(value);

    const formattedValueElement = getByText(formattedValue);
    expect(formattedValueElement).toBeTruthy();
  });
});
