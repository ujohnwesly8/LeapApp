import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import Profile from '../../../src/screens/Profile/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from '../../../src/redux/store';
import useProfile from '../../../src/screens/Profile/useProfile';
import {Logout} from '../../../src/redux/actions/actions';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

jest.mock('../../../src/screens/Profile/useProfile', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({isLoading: true}),
}));
describe('Profile', () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });

  test('navigates to edit profile page when "Edit Profile" button is pressed', () => {
    const navigationMock = {navigate: jest.fn()};
    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Profile navigation={navigationMock} />
        </NavigationContainer>
      </Provider>,
    );

    fireEvent.press(getByText('Edit Profile'));

    expect(navigationMock.navigate).toHaveBeenCalledWith('Ownereditprofile');
  });

  test('navigates to Address page when "Address" button is pressed', () => {
    const navigationMock = {navigate: jest.fn()};
    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Profile navigation={navigationMock} />
        </NavigationContainer>
      </Provider>,
    );

    fireEvent.press(getByText('Address'));

    expect(navigationMock.navigate).toHaveBeenCalledWith('Owneraddresspage');
  });

  test('navigates to my orders page when "My Orders" button is pressed', () => {
    const navigationMock = {navigate: jest.fn()};
    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Profile navigation={navigationMock} />
        </NavigationContainer>
      </Provider>,
    );

    fireEvent.press(getByText('My orders'));

    expect(navigationMock.navigate).toHaveBeenCalledWith('MyOrder');
  });

  test('navigates to sign out  page when "Sign out" button is pressed', () => {
    const navigationMock = {navigate: jest.fn()};
    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Profile navigation={navigationMock} />
        </NavigationContainer>
      </Provider>,
    );

    fireEvent.press(getByText('Sign out'));
  });

  test('renders the ActivityIndicator component when isLoading is true', async () => {
    const {findByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Profile navigation={{}} />
        </NavigationContainer>
      </Provider>,
    );

    const activityIndicator = await findByTestId('activity-indicator');

    expect(activityIndicator).toBeDefined();
  });
});
