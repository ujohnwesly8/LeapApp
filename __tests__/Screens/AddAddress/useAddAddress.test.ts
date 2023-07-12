import {renderHook, act} from '@testing-library/react-native';
import useAddAddress from '../../../src/screens/Owneraddaddress/useAddAddress';
import ApiService from '../../../src/network/network';
import {Alert} from 'react-native';
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));
const mockNav = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNav,
    }),
  };
});
describe('useAddAddress', () => {
  it('should update address data and call handleSaveAddress', () => {
    const {result} = renderHook(() => useAddAddress());

    act(() => {
      result.current.handleAddressLine1('123 Main Street');
      result.current.handleAddressLine2('Apt 4B');
      result.current.handleOptionChange('HOME');
      result.current.setCity('New York');
      result.current.setpostalCode('12345');
      result.current.setCountry('United States');
      result.current.setStateName('New York');
      result.current.handleCheckboxChange();
      result.current.handleSaveAddress();
    });

    // Assert the updated address data
    expect(result.current.addressLine1).toBe('123 Main Street');
    expect(result.current.addressLine2).toBe('Apt 4B');
    expect(result.current.city).toBe('New York');
    expect(result.current.postalCode).toBe('12345');
    expect(result.current.country).toBe('United States');
    expect(result.current.state).toBe('New York');
    expect(result.current.isChecked).toBe(true);

    // Add assertions for handleSaveAddress being called with the correct arguments
  });

  it('should update postalCode and call FetchAddress', async () => {
    const {result} = renderHook(() => useAddAddress());

    act(() => {
      result.current.handlePostalCodeChange('123456');
    });

    // Assert the updated postalCode
    expect(result.current.postalCode).toBe('123456');

    // Add assertions for FetchAddress being called and updating the necessary data
  });

  it('should set isChecked to true when handleCheckboxChange is called', () => {
    const {result} = renderHook(() => useAddAddress());

    act(() => {
      result.current.handleCheckboxChange();
    });

    expect(result.current.isChecked).toBe(true);
  });

  it('should set isChecked to false when handleCheckboxChange is called twice', () => {
    const {result} = renderHook(() => useAddAddress());

    act(() => {
      result.current.handleCheckboxChange();
      result.current.handleCheckboxChange();
    });
  });

  it('should update selectedOption when handleOptionChange is called', () => {
    const {result} = renderHook(() => useAddAddress());

    act(() => {
      result.current.handleOptionChange('WORK');
    });

    expect(result.current.selectedOption).toBe('WORK');
  });

  it('should update addressLine1 and addressLine2 when handleAddressLine1 and handleAddressLine2 are called', () => {
    const {result} = renderHook(() => useAddAddress());

    act(() => {
      result.current.handleAddressLine1('123 Main Street');
      result.current.handleAddressLine2('Apt 4B');
    });

    expect(result.current.addressLine1).toBe('123 Main Street');
    expect(result.current.addressLine2).toBe('Apt 4B');
  });
  it('should fetch address data successfully in FetchAddress', async () => {
    const {result} = renderHook(() => useAddAddress());

    // Mock the ApiService.get function
    ApiService.get = jest.fn().mockResolvedValueOnce([
      {
        PostOffice: [
          {
            Country: 'United States',
            District: 'New York',
            State: 'New York',
          },
        ],
      },
    ]);

    act(() => {
      result.current.setpostalCode('123456');
      result.current.FetchAddress();
    });
  });
  it('should handle error during API request in handleSaveAddress', async () => {
    const {result} = renderHook(() => useAddAddress());

    // Mock the ApiService.post function to throw an error
    ApiService.post = jest.fn().mockRejectedValueOnce(new Error('API Error'));

    act(() => {
      result.current.handleAddressLine1('123 Main Street');
      result.current.handleAddressLine2('Apt 4B');
      result.current.handleSaveAddress();
    });

    // Assert that the error is handled gracefully (e.g., show an error message)
  });

  it('should set the field touched when handleBlur is called', () => {
    const {result} = renderHook(() => useAddAddress());

    act(() => {
      result.current.handleBlur('addressLine1');
    });

    expect(result.current.formik.touched.addressLine1).toBe(true);
  });
  it('should show validation errors when handleSaveAddress is called with invalid address data', () => {
    const {result} = renderHook(() => useAddAddress());

    act(() => {
      result.current.handleSaveAddress();
    });
  });

  it('should handle invalid postalCode and display an alert', async () => {
    const {result} = renderHook(() => useAddAddress());

    const mockApiServiceGet = jest.spyOn(ApiService, 'get');
    const mockAlert = jest.spyOn(Alert, 'alert');
    mockApiServiceGet.mockRejectedValueOnce(new Error('Invalid Pincode'));

    act(() => {
      result.current.handlePostalCodeChange('1234567');
    });

    // Assert that the ApiService.get function is called with the expected URL
    expect(mockApiServiceGet).toHaveBeenCalledWith(
      'https://api.postalpincode.in/pincode/',
    );
    act(() => {
      result.current.FetchAddress();
    });

    // Assert that the alert is displayed
    expect(mockAlert).toHaveBeenCalledWith('Enter a valid pincode');

    // Assert that the necessary state values are updated correctly
    expect(result.current.isLoading).toBe(false);
    expect(result.current.country).toBe('');
    expect(result.current.city).toBe('');
    expect(result.current.state).toBe('');
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle empty state for PostOffice', async () => {
    const {result} = renderHook(() => useAddAddress());

    const mockApiServiceGet = jest.spyOn(ApiService, 'get');
    const mockAlert = jest.spyOn(Alert, 'alert');

    // Mock the ApiService.get function to resolve with empty data for PostOffice
    mockApiServiceGet.mockResolvedValueOnce([
      {
        PostOffice: [],
        Country: [],
        District: [],
        State: [],
      },
    ]);

    act(() => {
      result.current.FetchAddress();
    });

    // Assert that the ApiService.get function is called with the expected URL
    expect(mockApiServiceGet).toHaveBeenCalledWith(
      'https://api.postalpincode.in/pincode/',
    );

    // Assert that the alert is displayed
    expect(mockAlert).toHaveBeenCalledWith('Enter valid Pincode');

    // Assert that the necessary state values are updated correctly
    expect(result.current.isLoading).toBe(false);
    expect(result.current.postalCode).toBe('');
    expect(result.current.country).toBe('');
    expect(result.current.city).toBe('');
    expect(result.current.state).toBe('');
  });

  it('should make API request and navigate when handleSaveAddress is called with valid address data', async () => {
    const {result} = renderHook(() => useAddAddress());

    // Mock the ApiService.post function
    ApiService.post = jest.fn().mockResolvedValueOnce({});

    act(() => {
      result.current.handleAddressLine1('123 Main Street');
      result.current.handleAddressLine2('Apt 4B');
      result.current.handleSaveAddress();
    });
  });
});
