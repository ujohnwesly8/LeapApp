import {act, renderHook, waitFor} from '@testing-library/react-native';
import useSignup from '../../../src/screens/SignUp/useSignup';
import React from 'react';
import Colors from '../../../src/constants/colors';
import ApiService from '../../../src/network/network';
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));
describe('Signup Hook ', () => {
  const {result} = renderHook(useSignup);
  it('This should open custom modal', () => {
    expect(result.current.showModal).toBe(false);
    act(() => {
      result.current.openModal();
    });
    expect(result.current.showModal).toBe(true);
  });

  it('This should close modal', () => {
    act(() => {
      result.current.closeModal();
    });
    expect(result.current.showModal).toBe(true);
  });
  it('this should check the color of placeholder text', () => {
    const mockContextValue = {
      colorScheme: 'dark',
    };

    // Use the mock context value in the test
    jest.spyOn(React, 'useContext').mockReturnValueOnce(mockContextValue);

    // Get the color of the placeholder text
    const placeholderColor = result.current.PlaceholderColor();

    // Check if the color matches the expected color for the dark color scheme
    if (mockContextValue.colorScheme === 'dark') {
      expect(placeholderColor).toBe(Colors.Textinput);
    } else {
      expect(placeholderColor).toBe(Colors.black);
    }
  });
});

describe('Signup Hook', () => {
  it('should return modal when there is an error in API', async () => {
    const {result} = renderHook(useSignup);

    // Mock the API call to throw an error
    jest
      .spyOn(ApiService, 'post')
      .mockRejectedValueOnce(new Error('API error'));

    // Call the handleSignupfun function
    act(() => {
      result.current.handleSignupfun();
    });

    // Wait for the asynchronous operation to complete
    await waitFor(() => {
      expect(result.current.showModal).toBe(true);
    });
  });
});
