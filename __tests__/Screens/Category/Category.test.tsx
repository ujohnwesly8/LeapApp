import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Category from '../../../src/screens/Category/Category';
import {NavigationContainer} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

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

//-----
// import React from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import '@testing-library/jest-native/extend-expect';
// import {
//   render,
//   fireEvent,
//   getByTestId,
//   getByText,
// } from '@testing-library/react-native';
// import 'jest-styled-components';
// import Category from '../../../src/screens/Category/Category';
// import {ColorSchemeContext} from '../../../ColorSchemeContext';

// jest.mock('@react-native-async-storage/async-storage', () => ({
//   getItem: jest.fn(),
//   setItem: jest.fn(),
//   removeItem: jest.fn(),
//   clear: jest.fn(),
// }));
// jest.mock('@react-navigation/native', () => {
//   const actualNavigation = jest.requireActual('@react-navigation/native');
//   return {
//     ...actualNavigation,
//     useNavigation: () => ({
//       navigate: jest.fn(),
//     }),
//   };
// });

// describe('Category', () => {
//   const mockCategories = [
//     {
//       id: 1,
//       categoryName: 'Category 1',
//       imageUrl: 'https://example.com/image1.png',
//     },
//     {
//       id: 2,
//       categoryName: 'Category 2',
//       imageUrl: 'https://example.com/image2.png',
//     },
//   ];

//   // const mockLoading = false;

//   jest.mock('../../../src/screens/Category/useCategory', () => ({
//     useCategory: jest.fn(() => ({
//       categories: mockCategories,
//       loading: mockLoading,
//     })),
//   }));

//   it('renders categories heading', () => {
//     const {getByText} = render(<Category />);
//     expect(getByText('Categories')).toBeDefined();
//   });

//   it('displays loading animation when loading is true', () => {
//     const mockLoading = true;

//     const {getByTestId} = render(<Category />);
//     const loadingAnimation = getByTestId('loading-animation');

//     expect(loadingAnimation).toBeDefined();
//   });

//   it('applies whiteTheme style when colorScheme is "light"', () => {
//     const {getByTestId} = render(<Category />);
//     const mainView = getByTestId('main-view');

//     expect(mainView).toHaveStyle({
//       backgroundColor: '#fff',
//     });
//   });

//   it('uses item id as the keyExtractor', () => {
//     const {queryByTestId} = render(<Category />);
//     const flatList = queryByTestId('category-flatlist');

//     expect(flatList).toBeDefined();
//   });

//   it('displays loading animation when loading is true', () => {
//     const mockLoading = true;

//     const {getByTestId} = render(<Category />);
//     const loadingAnimation = getByTestId('loading-animation');

//     expect(loadingAnimation).toBeDefined();
//   });
//   //---

//   it('navigates to Subcategory screen with the correct categoryId', () => {
//     const mockCategoryId = 2;
//     const mockNavigation = {
//       navigate: jest.fn(),
//     };

//     const mockCategoryItem = {
//       id: mockCategoryId,
//       categoryName: 'Test Category',
//       imageUrl: 'https://example.com/image.png',
//     };

//     const {getByTestId} = render(
//       <Category categories={[mockCategoryItem]} navigation={mockNavigation} />,
//     );

//     const categoryItem = getByTestId(`category-${mockCategoryId}`);

//     fireEvent.press(categoryItem);

//     expect(mockNavigation.navigate).toHaveBeenCalledWith('Subcategory', {
//       categoryId: mockCategoryId,
//     });
//   });
// });
