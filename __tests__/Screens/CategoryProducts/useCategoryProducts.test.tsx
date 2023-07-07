import {renderHook} from '@testing-library/react-native';

import {Provider} from 'react-redux';
import React from 'react';
import useCategoryProducts from '../../../src/screens/CategoryProducts/useCategoryProducts';
import {store} from '../../../src/redux/store';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));
describe('useSubcategory', () => {
  const subcategoryId = 25;
  const {result} = renderHook(() => useCategoryProducts(subcategoryId), {
    wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
  });
  it('Should render Category Products Hook', () => {
    // Assert the behavior of your custom hook
    expect(result).toBeTruthy();
  });
});
