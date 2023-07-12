import {renderHook, act, waitFor} from '@testing-library/react-native';
import {useNavigation} from '@react-navigation/native';
import useAddress from '../../../src/screens/Owneraddaddress/useAddress';
import ApiService from '../../../src/network/network';
import {url} from '../../../src/constants/Apis';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

jest.mock('../../../src/redux/actions/actions', () => ({
  removeAddress: jest.fn(),
}));

jest.mock('../../../src/network/network', () => ({
  get: jest.fn(),
}));

describe('useAddress', () => {
  const navigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
    addListener: jest.fn(),
  };

  beforeEach(() => {
    useNavigation.mockReturnValue(navigation);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call navigation.navigate with correct arguments when editing an address', () => {
    const {result} = renderHook(() => useAddress());
    const item = {id: 1, city: 'New York'};

    act(() => {
      result.current.handleEditItems(item);
    });

    expect(navigation.navigate).toHaveBeenCalledWith('EditAddress', {
      address: item,
    });
  });

  test('should call navigation.navigate when adding an address', () => {
    const {result} = renderHook(() => useAddress());

    act(() => {
      result.current.handleOwnerAddAddress();
    });

    expect(navigation.navigate).toHaveBeenCalledWith('Owneraddaddress');
  });

  test('should call navigation.goBack when go back button is pressed', () => {
    const {result} = renderHook(() => useAddress());

    act(() => {
      result.current.goBackButton();
    });

    expect(navigation.goBack).toHaveBeenCalled();
  });

  test('should fetch data successfully', async () => {
    const fakeAddress = {
      id: 1,
      city: 'Bangalore',
      state: 'Karnataka',
      country: 'India',
      postalCode: '500064',
      addressLine1: 'NS PG',
      addressLine2: '6Th Block',
    };
    ApiService.get.mockResolvedValue(fakeAddress);

    const {result} = renderHook(() => useAddress());

    await waitFor(() => {
      return !result.current.isLoading;
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.addressList).toEqual(fakeAddress);
    expect(result.current.city).toBe(fakeAddress.city);
    expect(result.current.state).toBe(fakeAddress.state);
    expect(result.current.postalCode).toBe(fakeAddress.postalCode);
    expect(result.current.addressLine1).toBe(fakeAddress.addressLine1);
    expect(result.current.addressLine2).toBe(fakeAddress.addressLine2);
  });

  test('should open and close modal', () => {
    const {result} = renderHook(() => useAddress());

    act(() => {
      result.current.openModal();
    });

    expect(result.current.showModal).toBe(true);

    act(() => {
      result.current.closeModal();
    });

    expect(result.current.showModal).toBe(false);
  });

  test('should call dispatch and open modal when deleting an address', () => {
    const dispatch = jest.fn();
    const removeAddressAction = {type: 'REMOVE_ADDRESS'};
    jest
      .spyOn(require('../../../src/redux/actions/actions'), 'removeAddress')
      .mockReturnValue(removeAddressAction);
    jest.spyOn(require('react-redux'), 'useDispatch').mockReturnValue(dispatch);

    const {result} = renderHook(() => useAddress());

    const deleteId = 1;

    act(() => {
      result.current.handleDeleteAddress(deleteId);
    });

    expect(dispatch).toHaveBeenCalledWith(removeAddressAction);
    expect(result.current.showModal).toBe(true);
  });

  test('should fetch data when component is focused', async () => {
    const fakeAddress = {
      id: 1,
      city: 'Bangalore',
      state: 'Karnataka',
      country: 'India',
      postalCode: '500064',
      addressLine1: 'NS PG',
      addressLine2: '6Th Block',
    };
    ApiService.get.mockResolvedValue(fakeAddress);

    const {result} = renderHook(() => useAddress());

    act(() => {
      // Simulate focus event
      result.current.isFocused = true;
      result.current.fetchData(); // Call the fetchData function manually
    });

    await waitFor(() => {
      return !result.current.isLoading;
    });

    expect(ApiService.get).toHaveBeenCalledWith(`${url}/address/listAddress`);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.addressList).toEqual(fakeAddress);
    expect(result.current.city).toBe(fakeAddress.city);
    expect(result.current.state).toBe(fakeAddress.state);
    expect(result.current.postalCode).toBe(fakeAddress.postalCode);
    expect(result.current.addressLine1).toBe(fakeAddress.addressLine1);
    expect(result.current.addressLine2).toBe(fakeAddress.addressLine2);
  });
});
