import {renderHook} from '@testing-library/react-native';

import useOProductDetails from '../../../src/screens/OwnerProductdetailsPage/useOProductDetails';
import React from 'react';

describe('useOProductDetails', () => {
  const product = {};
  const route = {params: {product}};
  const navigation = {goBack: jest.fn()};
  const colorScheme = 'light';

  test('should return the correct values', () => {
    const mockContext = {colorScheme};
    jest.spyOn(React, 'useContext').mockReturnValue(mockContext);

    const {result} = renderHook(() => useOProductDetails({route, navigation}));

    expect(result.current.product).toBe(product);
    expect(result.current.colorScheme).toBe(colorScheme);
    expect(result.current.goBack).toBeInstanceOf(Function);
  });

  test('goBack should call navigation.goBack', () => {
    const mockContext = {colorScheme};
    jest.spyOn(React, 'useContext').mockReturnValue(mockContext);

    const {result} = renderHook(() => useOProductDetails({route, navigation}));

    result.current.goBack();

    expect(navigation.goBack).toHaveBeenCalled();
  });
});
