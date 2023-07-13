import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Category from '../../../src/screens/Category/Category';
import {NavigationContainer, useNavigation} from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock('../../../src/screens/Category/useCategory', () => ({
  useCategory: jest.fn(() => ({
    categories: [
      {
        id: 1,
        categoryName: 'Category 1',
        imageUrl: 'https://example.com/image1.jpg',
      },
      {
        id: 2,
        categoryName: 'Category 2',
        imageUrl: 'https://example.com/image2.jpg',
      },
    ],
    loading: false,
  })),
}));

describe('Category', () => {
  it('renders categories', () => {
    const {getByText} = render(
      <NavigationContainer>
        <Category />
      </NavigationContainer>,
    );
    const category = render(
      <NavigationContainer>
        <Category />
      </NavigationContainer>,
    );
    expect(category).toBeTruthy();
    expect(getByText('Category 1')).toBeDefined();
    expect(getByText('Category 2')).toBeDefined();
  });

  it('navigates to the Subcategory screen when a category is pressed', () => {
    const navigateMock = jest.fn();
    useNavigation.mockReturnValue({navigate: navigateMock});

    const {getByText} = render(
      <NavigationContainer>
        <Category />
      </NavigationContainer>,
    );

    fireEvent.press(getByText('Category 1'));

    expect(navigateMock).toHaveBeenCalledWith('Subcategory', {categoryId: 1});
  });
});
