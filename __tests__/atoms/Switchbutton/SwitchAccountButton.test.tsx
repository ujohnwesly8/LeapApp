import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SwitchAccountButton from '../../../src/components/atoms/SwtichAccountButton';
import {Store, AnyAction} from 'redux';
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));
jest.mock('axios');
jest.mock('@react-native-async-storage/async-storage');

const mockStore = configureStore([]);

describe('SwitchAccountButton', () => {
  let store: Store<unknown, AnyAction>;

  beforeEach(() => {
    store = mockStore({
      Rolereducer: {
        role: 'OWNER',
      },
    });

    jest.clearAllMocks(); // Reset mocked functions before each test
  });

  it('should render the component', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <SwitchAccountButton />
      </Provider>,
    );

    expect(getByTestId('switch-account-button')).toBeTruthy();
  });

  it('should toggle the options when the button is pressed', () => {
    const {getByTestId, queryByTestId} = render(
      <Provider store={store}>
        <SwitchAccountButton />
      </Provider>,
    );

    fireEvent.press(getByTestId('switch-account-button'));

    expect(queryByTestId('account-type-borrower')).toBeTruthy();

    fireEvent.press(getByTestId('switch-account-button'));

    expect(queryByTestId('account-type-borrower')).toBeFalsy();
  });

  it('should handle option press', async () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <SwitchAccountButton />
      </Provider>,
    );

    axios.post.mockResolvedValueOnce({
      status: 200,
      headers: {
        access_token: 'newToken',
      },
    });

    await fireEvent.press(getByTestId('switch-account-button'));
    await fireEvent.press(getByTestId('account-type-borrower'));

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('token');
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('token', 'newToken');
    expect(store.getActions()).toEqual([{type: 'SET_ROLE', role: 'BORROWER'}]);
  });
  it('should handle option press for OWNER', async () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <SwitchAccountButton />
      </Provider>,
    );

    axios.post.mockResolvedValueOnce({
      status: 200,
      headers: {
        access_token: 'newToken',
      },
    });

    await fireEvent.press(getByTestId('switch-account-button'));
    await fireEvent.press(getByTestId('account-type-owner'));

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('token');
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('token', 'newToken');
    expect(store.getActions()).toEqual([{type: 'SET_ROLE', role: 'OWNER'}]);
  });

  it('should handle option press error', async () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <SwitchAccountButton />
      </Provider>,
    );

    axios.post.mockRejectedValueOnce(new Error('Request failed'));

    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(jest.fn());

    await fireEvent.press(getByTestId('switch-account-button'));
    await fireEvent.press(getByTestId('account-type-borrower'));

    expect(AsyncStorage.removeItem).not.toHaveBeenCalled();
    expect(AsyncStorage.setItem).not.toHaveBeenCalled();
    expect(store.getActions()).toEqual([]);

    expect(consoleLogSpy).toHaveBeenCalledWith('Request failed');

    consoleLogSpy.mockRestore(); // Restore the original console.log implementation
  });
});
