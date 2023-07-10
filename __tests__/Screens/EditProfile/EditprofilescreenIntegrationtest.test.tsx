import {Provider} from 'react-redux';
import useownerprofile from '../../../src/screens/Ownereditprofile/useOwnerProfile';
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
  const {result} = renderHook(() => useownerprofile(), {
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
    const modal = renderHook(() => useownerprofile(), {
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
    const modal = renderHook(() => useownerprofile(), {
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
  it('should update the profile and set isLoading to false', async () => {
    // Set up initial values

    const updateprofile = {
      firstName: 'john',
      lastName: 'wesly',
      email: 'john@gmail.com',
      phoneNumber: '9098767299',
    };

    // Render the hook
    const update = renderHook(() => useownerprofile(), {
      wrapper: ({children}) => (
        <Provider store={store}>
          <NavigationContainer>{children}</NavigationContainer>
        </Provider>
      ),
    });

    // const putMock = jest.fn().mockResolvedValueOnce(updateprofile);
    console.log('putMock called');
    // jest.spyOn(ApiService, 'put').mockImplementation(putMock);
    jest.spyOn(ApiService, 'put').mockResolvedValueOnce(updateprofile);
    jest.spyOn(ApiService, 'get').mockResolvedValueOnce(updateprofile);
    expect(update.result.current.firstName).toBeDefined();

    // Update the address with the new values
    act(() => {
      update.result.current.setFirstName('John');
      update.result.current.setLastName('Doe');
      update.result.current.setEmail('john.doe@example.com');
      update.result.current.setPhoneNumber('1234567890');
    });
    act(() => {
      update.result.current.handleUpdate();
    });
    await waitFor(() => {
      // Check if ApiService.put is called with the correct parameters
      //   expect(ApiService.put).toBeCalledWith();

      // Check if isLoading is set to false
      expect(update.result.current.isLoading).toBe(false);

      return true; // Return a truthy value when the condition is met
    });
    expect(update.result.current.firstName).toBe('John');
  });
});
