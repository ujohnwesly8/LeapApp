import {renderHook, act} from '@testing-library/react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Logout} from '../../../src/redux/actions/actions';

import useOwnerProfile from '../../../src/screens/Ownerprofile/useOwnerProfile';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../../../src/redux/actions/actions', () => ({
  Logout: jest.fn(),
}));

describe('useOwnerProfile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return owner profile data and submit function', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    const mockFirstName = 'John';
    const mockEmail = 'john@example.com';
    const mockPhoneNumber = '1234567890';
    const mockLastName = 'Doe';

    useSelector.mockImplementation(selectorFn =>
      selectorFn({
        rootReducer: {
          firstName: mockFirstName,
          email: mockEmail,
          phoneNumber: mockPhoneNumber,
          lastName: mockLastName,
        },
      }),
    );

    const {result} = renderHook(() => useOwnerProfile());

    expect(result.current.Name).toBe(mockFirstName);
    expect(result.current.email).toBe(mockEmail);
    expect(result.current.phoneNumber).toBe(mockPhoneNumber);
    expect(result.current.lastName).toBe(mockLastName);

    expect(result.current.submit).toBeDefined();
    expect(mockDispatch).not.toHaveBeenCalled();

    act(() => {
      result.current.submit();
    });

    expect(mockDispatch).toHaveBeenCalledWith(Logout());
  });

  test('should call useDispatch and useSelector with the correct arguments', () => {
    renderHook(() => useOwnerProfile());

    expect(useDispatch).toHaveBeenCalled();
    expect(useSelector).toHaveBeenCalledTimes(4);

    expect(useSelector.mock.calls[0][0]).toBeInstanceOf(Function);
    expect(useSelector.mock.calls[1][0]).toBeInstanceOf(Function);
    expect(useSelector.mock.calls[2][0]).toBeInstanceOf(Function);
    expect(useSelector.mock.calls[3][0]).toBeInstanceOf(Function);
  });

  test('should log owner profile data', () => {
    const mockConsoleLog = jest.spyOn(console, 'log');
    mockConsoleLog.mockImplementation(() => {});

    const mockFirstName = 'John';
    const mockEmail = 'john@example.com';
    const mockPhoneNumber = '1234567890';
    const mockLastName = 'Doe';

    useSelector.mockImplementation(selectorFn =>
      selectorFn({
        rootReducer: {
          firstName: mockFirstName,
          email: mockEmail,
          phoneNumber: mockPhoneNumber,
          lastName: mockLastName,
        },
      }),
    );

    renderHook(() => useOwnerProfile());

    expect(mockConsoleLog).toHaveBeenCalledWith('firstName :', mockFirstName);
    expect(mockConsoleLog).toHaveBeenCalledWith(
      mockEmail,
      mockPhoneNumber,
      mockLastName,
    );

    mockConsoleLog.mockRestore();
  });
});
