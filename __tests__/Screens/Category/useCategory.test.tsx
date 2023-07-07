import {renderHook, act, waitFor} from '@testing-library/react-native';
import {useCategory} from '../../../src/screens/Category/useCategory';
import ApiService from '../../../src/network/network';

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
describe('useCategory', () => {
  const category = renderHook(useCategory);

  it(' should render usehook', () => {
    expect(category).toBeTruthy();
  });
  it('Should set the loading false', async () => {
    expect(category.result.current.loading).toBe(true);
    jest.spyOn(ApiService, 'get');
    act(() => {
      category.result.current.fetchCategoriesData();
    });
    await waitFor(() => {
      expect(category.result.current.loading).toBe(true);
    });
  });
  it('should fetch categories and set loading to false', async () => {
    const responseData = ['Category 1', 'Category 2'];
    jest.spyOn(ApiService, 'get').mockResolvedValue(responseData);

    const {result} = renderHook(() => useCategory());

    expect(result.current.loading).toBe(true);
    expect(result.current.categories).toEqual([]);

    await waitFor(() => !result.current.loading);

    expect(result.current.loading).toBe(false);
    expect(result.current.categories).toEqual(responseData);
    expect(ApiService.get).toHaveBeenCalledWith('/category/list');
  });
  it('should handle error and set loading to false', async () => {
    const error = new Error('API error');
    jest.spyOn(ApiService, 'get').mockRejectedValue(error);

    const {result} = renderHook(() => useCategory());

    expect(result.current.loading).toBe(true);
    expect(result.current.categories).toEqual([]);

    await waitFor(() => !result.current.loading);

    expect(result.current.loading).toBe(true);
    expect(result.current.categories).toEqual([]);
    expect(ApiService.get).toHaveBeenCalledWith('/category/list');
  });
});
