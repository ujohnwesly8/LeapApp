import {
  render,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react-native';
import React from 'react';
import FilteredAnalytics from '../../../src/screens/FilteredAnalytics/FilteredAnalytics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from '../../../src/redux/store';
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

  // Add more test cases as needed
  test('updates start date when AnalyticsDatePicker onStartDateChange is called', async () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <FilteredAnalytics />
        </NavigationContainer>
      </Provider>,
    );

    const newStartDate = new Date('2023-01-01');
    const startDatePicker = getByTestId('date-picker'); // Update the test ID here
    fireEvent(startDatePicker, 'onStartDateChange', newStartDate); // Update the event name

    await waitFor(() => {
      expect(startDatePicker.props.startDate).toEqual(newStartDate);
    });
  });

  test('fetches data when end date is changed', async () => {
    const fetchDataMock = jest.fn();
    fetchDataMock.mockResolvedValueOnce({chartData: []});

    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <FilteredAnalytics />
        </NavigationContainer>
      </Provider>,
    );

    const newEndDate = new Date('2023-02-01');
    const endDatePicker = getByTestId('date-picker'); // Update the test ID here
    fireEvent(endDatePicker, 'onEndDateChange', newEndDate); // Update the event name

    await waitFor(() => {
      expect(fetchDataMock).toHaveBeenCalledTimes(1);
    });
  });

  //---------------------->
  test('renders items for each month correctly', () => {
    const dataMock = {
      Jan: [
        {
          id: 1,
          name: 'Item 1',
        },
        {
          id: 2,
          name: 'Item 2',
        },
      ],
    };

    render(<FilteredAnalytics data={dataMock} />);

    // Find first View with 'Jan' key
    const janView = getByTestId('jan-view');

    // Find two Views inside with key from generateKey
    const generateKeyMock = jest.fn(() => 'key1');
    const itemViews = within(janView).getAllByTestId('item-view');
    expect(itemViews).toHaveLength(2);

    // Check map function was called twice
    expect(generateKeyMock).toHaveBeenCalledTimes(2);
  });
});
