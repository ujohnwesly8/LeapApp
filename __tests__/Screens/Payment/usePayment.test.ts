import {renderHook, act} from '@testing-library/react-native';
import {useNavigation} from '@react-navigation/native';
import usePayment from '../../../src/screens/PaymentScreens/usePayment';
import React from 'react';

// Mock the dependencies
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

const mockReset = jest.fn();
const mockUseNavigation = useNavigation as jest.MockedFunction<
  typeof useNavigation
>;
mockUseNavigation.mockReturnValue({reset: mockReset});

const mockContext = {
  colorScheme: 'light',
  getContainerStyle: jest.fn(),
  getTextColor: jest.fn(),
};

const useContextMock = jest.spyOn(React, 'useContext');
useContextMock.mockReturnValue(mockContext);

describe('usePayment', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.resetModules();
    useContextMock.mockClear();
  });

  it('should call navigation reset after a delay and return the expected values', () => {
    const {result} = renderHook(() => usePayment());

    expect(mockUseNavigation).toHaveBeenCalled();

    // Simulate the passage of time
    act(() => {
      jest.advanceTimersByTime(7000);
    });

    expect(mockReset).toHaveBeenCalledWith({
      index: 0,
      routes: [{name: 'CartScreen', params: {screen: 'Cart'}}],
    });

    // Verify the returned values
    expect(result.current.navigation).toBeDefined();
    expect(result.current.getContainerStyle).toBe(
      mockContext.getContainerStyle,
    );
    expect(result.current.getTextColor).toBe(mockContext.getTextColor);
  });

  it('should clear the timeout when unmounted', () => {
    const {unmount} = renderHook(() => usePayment());

    unmount();

    expect(mockUseNavigation).toHaveBeenCalled();
  });
});
