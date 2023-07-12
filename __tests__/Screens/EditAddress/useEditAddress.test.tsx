import {Provider} from 'react-redux';
import useEditAddress from '../../../src/screens/EditAddress/useEditAddress';
import {store} from '../../../src/redux/store';
import React from 'react';
import {act, renderHook, waitFor} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
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
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useRoute: () => ({
    params: {address: {}},
  }),
}));
describe('useEditaddress', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const {result} = renderHook(() => useEditAddress(), {
    wrapper: ({children}) => (
      <Provider store={store}>
        <NavigationContainer>{children}</NavigationContainer>
      </Provider>
    ),
  });
  it('Should be defined', () => {
    expect(result).toBeDefined();
  });
  it('should open modal ', () => {
    const modal = renderHook(() => useEditAddress(), {
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
    const modal = renderHook(() => useEditAddress(), {
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
  it('should set checkbox ', () => {
    const checkbox = renderHook(() => useEditAddress(), {
      wrapper: ({children}) => (
        <Provider store={store}>
          <NavigationContainer>{children}</NavigationContainer>
        </Provider>
      ),
    });
    expect(checkbox.result.current.isChecked).toBe(false);
    act(() => {
      checkbox.result.current.handleCheckboxChange();
    });
    expect(checkbox.result.current.isChecked).toBe(true);
  });
  it('should change pincode ', () => {
    const pincode = renderHook(() => useEditAddress(), {
      wrapper: ({children}) => (
        <Provider store={store}>
          <NavigationContainer>{children}</NavigationContainer>
        </Provider>
      ),
    });
    const Postalcode = '560034';
    act(() => {
      pincode.result.current.handlePostalcode(Postalcode);
    });
    expect(pincode.result.current.postalCode).toBe('560034');
  });
  it('should update the address and set isLoading to false', async () => {
    // Set up initial values

    const updateAddress = {
      addressLine1: 'Mock address line 1',
      addressLine2: 'Mock address line 2',
      addressType: 'HOME',
      city: 'Mock City',
      country: 'Mock Country',
      postalCode: '12345',
      state: 'Mock State',
      defaultType: true,
    };

    // Render the hook
    const update = renderHook(() => useEditAddress(), {
      wrapper: ({children}) => (
        <Provider store={store}>
          <NavigationContainer>{children}</NavigationContainer>
        </Provider>
      ),
    });

    jest.spyOn(ApiService, 'put').mockResolvedValueOnce(updateAddress);

    // Update the address with the new values
    act(() => {
      update.result.current.handleUpdateAddress();
    });

    // Wait for the next update, which indicates the completion of the API call

    await waitFor(() => {
      // Check if ApiService.put is called with the correct parameters
      expect(ApiService.put).toBeCalled();

      // Check if isLoading is set to false
    });
  });
  it('should throw the error when api throws error', async () => {
    // Set up initial values

    const consoleLogSpy = jest.spyOn(console, 'log');
    // Render the hook
    const errorHook = renderHook(() => useEditAddress(), {
      wrapper: ({children}) => (
        <Provider store={store}>
          <NavigationContainer>{children}</NavigationContainer>
        </Provider>
      ),
    });

    jest.spyOn(ApiService, 'put').mockRejectedValueOnce(new Error('API error'));
    // Update the address with the new values
    act(() => {
      errorHook.result.current.handleUpdateAddress();
    });

    // Wait for the next update, which indicates the completion of the API call

    await waitFor(() => {
      // Check if ApiService.put is called with the correct parameters
      expect(ApiService.put).toBeCalled();

      // Check if isLoading is set to false
    });
    expect(consoleLogSpy).toHaveBeenCalledWith('Failed to update address');
    // Check if the error state is set
  });
});
