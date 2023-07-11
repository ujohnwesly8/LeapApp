import {renderHook, act} from '@testing-library/react-native';

import * as actions from '../../../src/redux/actions/actions';
import Useotp from '../../../src/screens/OtpScreen/useOtp';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('Useotp', () => {
  it('should cover all lines of code', () => {
    const dispatchMock = jest.fn();
    const getOTPMock = jest.spyOn(actions, 'getOTP');
    const submitOTPMock = jest.spyOn(actions, 'submitOTP');

    const useDispatchMock = jest.spyOn(require('react-redux'), 'useDispatch');
    useDispatchMock.mockReturnValue(dispatchMock);

    const {result} = renderHook(() => Useotp());

    act(() => {
      result.current.handlephoneNumberChange('1234567890');
    });

    expect(result.current.phoneNo).toBe('1234567890');

    act(() => {
      result.current.handlePasswordChange('123456');
    });

    expect(result.current.otp).toBe('123456');

    act(() => {
      result.current.GETOTP();
    });

    expect(getOTPMock).toHaveBeenCalledWith('1234567890');
    expect(result.current.showModal).toBe(true);

    act(() => {
      result.current.closeModal();
    });

    expect(result.current.showModal).toBe(false);

    act(() => {
      result.current.handleLogin();
    });

    expect(submitOTPMock).toHaveBeenCalledWith('1234567890', 123456);

    expect(dispatchMock).toHaveBeenCalledTimes(2);
  });
});
