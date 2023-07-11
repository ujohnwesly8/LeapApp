import {act, renderHook} from '@testing-library/react-native';

import useMyOrder from '../../../src/screens/MyOrder/useMyOrder';
import {Provider} from 'react-redux';
import {store} from '../../../src/redux/store';
import React from 'react';

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
describe('useMyoreder', () => {
  it('Should render the use hook', () => {
    const {result} = renderHook(() => useMyOrder(), {
      wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
    });
    expect(result).toBeTruthy();
  });
  it('Should close the modal when closed', () => {
    const {result} = renderHook(() => useMyOrder(), {
      wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
    });
    const modal = result.current.isModalOpen;
    expect(modal).toBe(false);
    act(() => {
      result.current.closeModal();
    });
    expect(result.current.isModalOpen).toBe(false);
  });
  it('Should refresh when on refresh is called', () => {
    const update = renderHook(() => useMyOrder(), {
      wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
    });
    const isRefresh = update.result.current.refreshing;
    expect(isRefresh).toBe(false);
    act(() => {
      update.result.current.onRefresh();
    });
    expect(update.result.current.refreshing).toBe(false);
  });
  it('Should navigate to Profile whne back button is pressed ', () => {
    const update = renderHook(() => useMyOrder(), {
      wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
    });

    act(() => {
      update.result.current.handleProfile();
    });
    expect(mockNavigate).toHaveBeenCalledWith('Profile');
  });
});
