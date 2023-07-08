import {
  act,
  fireEvent,
  render,
  renderHook,
} from '@testing-library/react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useSearchresults from '../../../src/screens/SearchResultScreen/useSearchResults';
import ApiService from '../../../src/network/network';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import SearchResultsScreen from '../../../src/screens/SearchResultScreen/SearchResultScreen';
import {useNavigation} from '@react-navigation/native';
jest.mock('../../../src/network/network', () => ({
  get: jest.fn(),
}));
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({goBack: jest.fn()})),
}));
describe('SearchResultScreen', () => {
  beforeEach(() => {
    // Clear AsyncStorage before each test
    AsyncStorage.clear();
  });
  let apiGetMock: jest.SpyInstance<Promise<any>, [url: string], any>;
  let getSpy: jest.SpyInstance<Promise<any>, [url: string], any>;

  beforeEach(() => {
    apiGetMock = jest.spyOn(ApiService, 'get');
    getSpy = apiGetMock.mockResolvedValue([]);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('renders SearchResultsScreen without errors', () => {
    render(<SearchResultsScreen route={{params: {searchResults: []}}} />);
  });

  test('renders FlatList with the correct number of items', () => {
    const searchResults = [
      {
        id: 1,
        name: 'Product 1',
        price: 10,
        imageUrl: ['https://example.com/image1.jpg'],
      },
      {
        id: 2,
        name: 'Product 2',
        price: 20,
        imageUrl: ['https://example.com/image2.jpg'],
      },
      {
        id: 3,
        name: 'Product 3',
        price: 30,
        imageUrl: ['https://example.com/image3.jpg'],
      },
    ];

    const {getByTestId, getAllByTestId} = render(
      <SearchResultsScreen route={{params: {searchResults}}} />,
    );

    const flatList = getByTestId('flat-list');
    expect(flatList.props.data.length).toBe(searchResults.length);

    const renderedItems = getAllByTestId('item-touchable');
    expect(renderedItems.length).toBe(searchResults.length);
  });

  test('renders no results message when search results are empty', () => {
    const {getByText} = render(
      <SearchResultsScreen route={{params: {searchResults: []}}} />,
    );

    const noResultsText = getByText('Umm...No results found');
    expect(noResultsText).toBeTruthy();
  });

  it('should set filtered products on successful filterData', async () => {
    const filteredProducts = [{id: 1, name: 'Product 1'}];
    getSpy.mockResolvedValue(filteredProducts);

    const {result} = renderHook(() => useSearchresults());

    await act(async () => {
      result.current.filterData();
    });

    expect(result.current.filteredProducts).toEqual(filteredProducts);
  });

  it('should set filtered products to an empty array on filterData error', async () => {
    getSpy.mockRejectedValue(new Error('API Error'));

    const {result} = renderHook(() => useSearchresults());

    await act(async () => {
      result.current.filterData();
    });

    expect(result.current.filteredProducts).toEqual([]);
  });

  it('should update selectedSubCategory when setSelectedSubCategory is called', () => {
    const {result} = renderHook(() => useSearchresults());

    act(() => {
      result.current.setSelectedSubCategory({value: 1, label: 'Subcategory 1'});
    });

    expect(result.current.selectedSubCategory).toEqual({
      value: 1,
      label: 'Subcategory 1',
    });
  });
  it('should render the correct number of items in FlatList', () => {
    const productsToShow = [
      {
        id: 1,
        name: 'Product 1',
        imageUrl: ['https://example.com/image1.jpg'],
        price: 10,
      },
      {
        id: 2,
        name: 'Product 2',
        imageUrl: ['https://example.com/image2.jpg'],
        price: 20,
      },
      {
        id: 3,
        name: 'Product 3',
        imageUrl: ['https://example.com/image3.jpg'],
        price: 30,
      },
    ];

    const {getAllByTestId} = render(
      <FlatList
        data={productsToShow}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View testID="item-name">
            <Text>{item.name}</Text>
          </View>
        )}
        numColumns={2}
      />,
    );

    const renderedItems = getAllByTestId('item-name');
    expect(renderedItems.length).toBe(productsToShow.length);
  });

  it('should navigate to product details when item is pressed', () => {
    const productsToShow = [
      {
        id: 1,
        name: 'Product 1',
        imageUrl: ['https://example.com/image1.jpg'],
        price: 10,
      },
    ];

    const navigateMock = jest.fn();

    const {getByTestId} = render(
      <FlatList
        data={productsToShow}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigateMock(item.id)}
            testID="item-touchable">
            <View>
              <Text>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        numColumns={2}
      />,
    );

    const itemTouchable = getByTestId('item-touchable');
    fireEvent.press(itemTouchable);

    expect(navigateMock).toHaveBeenCalledWith(1);
  });
  test('calls navigation.goBack when go back button is pressed', () => {
    const goBackMock = jest.fn();
    useNavigation.mockReturnValue({goBack: goBackMock});

    const {getByTestId} = render(
      <SearchResultsScreen route={{params: {searchResults: []}}} />,
    );
    const backButton = getByTestId('back-button');

    fireEvent.press(backButton);

    expect(goBackMock).toHaveBeenCalled();
  });
  test('calls navigation.navigate with correct parameters when item is pressed', () => {
    const navigateMock = jest.fn();
    useNavigation.mockReturnValue({navigate: navigateMock});

    const searchResults = [
      {
        id: 1,
        name: 'Product 1',
        price: 10,
        imageUrl: ['https://example.com/image1.jpg'],
      },
      {
        id: 2,
        name: 'Product 2',
        price: 20,
        imageUrl: ['https://example.com/image2.jpg'],
      },
      {
        id: 3,
        name: 'Product 3',
        price: 30,
        imageUrl: ['https://example.com/image3.jpg'],
      },
    ];

    const {getAllByTestId} = render(
      <SearchResultsScreen route={{params: {searchResults}}} />,
    );

    const itemTouchables = getAllByTestId('item-touchable');
    itemTouchables.forEach((itemTouchable, index) => {
      fireEvent.press(itemTouchable);

      expect(navigateMock).toHaveBeenCalledWith('UProductDetails', {
        product: searchResults[index],
      });
    });
  });
  it('should render the filtered products correctly', () => {
    const searchResults = [
      {id: 1, name: 'Product 1', price: 10, imageUrl: ['image1.jpg']},
      {id: 2, name: 'Product 2', price: 20, imageUrl: ['image2.jpg']},
    ];
    const filteredProducts = [
      {id: 1, name: 'Product 1', price: 10, imageUrl: ['image1.jpg']},
    ];

    const {getByText, getByTestId} = render(
      <SearchResultsScreen route={{params: {searchResults}}} />,
    );

    const filterButton = getByTestId('filter-apply-button');
    fireEvent.press(filterButton);

    // Simulate selecting filters
    // ...

    const applyButton = getByTestId('Apply');
    fireEvent.press(applyButton);

    expect(getByText('Product 1')).toBeTruthy();
  });
});
