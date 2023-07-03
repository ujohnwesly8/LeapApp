import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Provider, useDispatch} from 'react-redux';
import OtpScreen from '../../../src/screens/OtpScreen/OtpScreen';
import {store} from '../../../src/redux/store';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('OtpScreen', () => {
  it('should update phone number state when entering a phone number', () => {
    const dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);
  });

  it('should update OTP state when entering an OTP', () => {
    const dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);
  });

  it('should call getOTP action and show modal when clicking "Get" button', () => {
    const dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);

    // Mock the necessary dependencies and actions, then assert the expected behavior
  });

  it('should call submitOTP action when clicking "Sign In" button', () => {
    const dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);

    // Mock the necessary dependencies and actions, then assert the expected behavior
  });

  it('should show the modal when showModal state is true', () => {
    const dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);

    const showModalText = 'OTP Sent!!';

    expect(() => getByText(showModalText)).toThrow();

    // Trigger the state update to show the modal
  });
});
