import AsyncStorage from '@react-native-async-storage/async-storage';
import {renderHook, act, waitFor} from '@testing-library/react-native';
import {useNavigation} from '@react-navigation/native';

import useProfile from '../../../src/screens/Profile/useProfile';
import ApiService from '../../../src/network/network';
import {url, profileUpload} from '../../../src/constants/Apis';
import {launchImageLibrary} from 'react-native-image-picker/src';
import FormData from 'form-data';
jest.mock('form-data');
const mockFormData = new FormData();
mockFormData.append = jest.fn(); // Mock the append method
(global as any).FormData = jest.fn(() => mockFormData);

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

jest.mock('../../../src/network/network', () => ({
  post: jest.fn(),
}));

jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('useProfile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  //---
  jest.mock('@react-native-async-storage/async-storage');

  test('fetchProfileData should fetch profile data', async () => {
    const mockToken = 'mockToken';
    const mockProfileData = {
      firstName: 'John',
      email: 'john@example.com',
      phoneNumber: '1234567890',
      profileImageUrl: 'https://example.com/profile.jpg',
    };

    globalThis.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockProfileData),
    });

    AsyncStorage.getItem = jest.fn().mockResolvedValue(mockToken);

    useNavigation.mockReturnValue({
      addListener: jest.fn(),
    });

    const {result} = renderHook(() => useProfile());

    expect(result.current.isLoading).toBe(false);

    await act(async () => {
      await result.current.fetchProfileData();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.name).toBe(mockProfileData.firstName);
    expect(result.current.email).toBe(mockProfileData.email);
    expect(result.current.phonenumber).toBe(mockProfileData.phoneNumber);
    expect(result.current.profilePic).toBe(mockProfileData.profileImageUrl);
  });

  //------------
  test('openModal should open the modal and fetch profile data', async () => {
    const mockToken = 'mockToken';
    const mockProfileData = {
      firstName: 'John',
      email: 'john@example.com',
      phoneNumber: '1234567890',
      profileImageUrl: 'https://example.com/profile.jpg',
    };

    globalThis.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockProfileData),
    });

    AsyncStorage.getItem = jest.fn().mockResolvedValue(mockToken);

    useNavigation.mockReturnValue({
      addListener: jest.fn(),
    });

    const {result} = renderHook(() => useProfile());

    expect(result.current.showModall).toBe(false);

    await act(async () => {
      result.current.openModal();
      await waitFor(() => expect(result.current.showModall).toBe(true));
    });

    expect(result.current.showModall).toBe(true);
    expect(result.current.refreshState).toBe(false);
    expect(globalThis.fetch).toHaveBeenCalledTimes(1); // fetchProfileData should be called once
  });

  test('closeModal should close the modal', async () => {
    const {result} = renderHook(() => useProfile());

    expect(result.current.showModall).toBe(false);

    act(() => {
      result.current.openModal();
    });

    expect(result.current.showModall).toBe(true);

    act(() => {
      result.current.closeModal();
    });

    expect(result.current.showModall).toBe(false);
  });

  //-------
  test('uploadImage should upload the image and fetch profile data', async () => {
    const mockImageURL = 'https://example.com/image.jpg';
    const mockResponse = {
      url: mockImageURL,
    };

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    AsyncStorage.getItem = jest.fn().mockResolvedValue('mockToken');

    launchImageLibrary.mockImplementation((options, callback) => {
      // Simulate image selection
      const response = {
        didCancel: false,
        errorCode: undefined,
        errorMessage: undefined,
        assets: [
          {
            uri: 'image1.jpg',
            type: 'image/png',
            name: 'image.png',
          },
        ],
      };
      callback(response);
    });

    const {result} = renderHook(() => useProfile());

    await act(async () => {
      result.current.pickImage(); // Simulate picking an image
      await waitFor(() => expect(result.current.profilePic).toBe(mockImageURL));
    });

    expect(launchImageLibrary).toHaveBeenCalledWith(
      {
        mediaType: 'photo',
        selectionLimit: 10,
      },
      expect.any(Function),
    );

    expect(global.fetch).toHaveBeenCalledWith(
      `${url}/file/uploadProfileImage`,
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer mockToken',
        },
      }),
    );

    expect(mockFormData.append).toHaveBeenCalledWith('file', {
      uri: 'image1.jpg',
      type: 'image/png',
      name: 'image.png',
    });

    expect(result.current.profilePic).toBe(mockImageURL);
    expect(result.current.showModall).toBe(true);
  });

  test('refreshData should set refreshState to true', () => {
    const {result} = renderHook(() => useProfile());

    expect(result.current.refreshState).toBe(false);

    act(() => {
      result.current.refreshData();
    });

    expect(result.current.refreshState).toBe(true);
  });

  test('openModal should set showModall to true, refreshState to true, fetch profile data, and then set refreshState to false', async () => {
    const {result} = renderHook(() => useProfile());

    expect(result.current.showModall).toBe(false);
    expect(result.current.refreshState).toBe(false);

    await act(async () => {
      result.current.openModal();
      await waitFor(() => expect(result.current.refreshState).toBe(false));
    });

    expect(result.current.showModall).toBe(true);
    expect(result.current.refreshState).toBe(false);
    // Add assertions to verify the fetchProfileData function has been called
    expect(fetch).toHaveBeenCalledWith(
      `${url}/user/getUser`,
      expect.any(Object),
    );
    // Add assertions to verify the setShowModall function has been called
    expect(result.current.showModall).toBe(true);
  });

  test('closeModal should set showModall to false', () => {
    const {result} = renderHook(() => useProfile());

    act(() => {
      result.current.closeModal();
    });

    expect(result.current.showModall).toBe(false);
  });

  test('openModal1 should set showModal1 to true', () => {
    const {result} = renderHook(() => useProfile());

    expect(result.current.showModal1).toBe(false);

    act(() => {
      result.current.openModal1();
    });

    expect(result.current.showModal1).toBe(true);
  });

  test('closeModal1 should set showModal1 to false', () => {
    const {result} = renderHook(() => useProfile());

    act(() => {
      result.current.closeModal1();
    });

    expect(result.current.showModal1).toBe(false);
  });
  //---
  test('uploadImage should log an error message and set isLoading to true on error', async () => {
    const mockError = new Error('Upload failed');
    const mockResponse = {
      ok: false,
      json: jest.fn().mockResolvedValue(mockError),
    };

    global.fetch = jest.fn().mockResolvedValueOnce(mockResponse);

    AsyncStorage.getItem = jest.fn().mockResolvedValue('mockToken');

    launchImageLibrary.mockImplementation((options, callback) => {
      // Simulate image selection
      const response = {
        didCancel: false,
        errorCode: undefined,
        errorMessage: undefined,
        assets: [
          {
            uri: 'image1.jpg',
            type: 'image/png',
            name: 'image.png',
          },
        ],
      };
      callback(response);
    });

    const logSpy = jest.spyOn(console, 'log');

    const {result} = renderHook(() => useProfile());

    expect(result.current.isloading).toBe(false);

    await act(async () => {
      result.current.pickImage(); // Simulate picking an image
      await waitFor(() => expect(result.current.isloading).toBe(true));
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `${url}/file/uploadProfileImage`,
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer mockToken',
        },
      }),
    );

    expect(result.current.isloading).toBe(true);
    expect(logSpy).toHaveBeenCalledWith('Upload failed');
    expect(logSpy).toHaveBeenCalledWith(mockError);
    expect(logSpy).toHaveBeenCalledWith('mockToken');

    logSpy.mockRestore();
  });

  //---
  test('pickImage should log appropriate messages when cancelled or error occurred', async () => {
    launchImageLibrary.mockImplementation((options, callback) => {
      // Simulate image selection cancellation
      const responseCancelled = {
        didCancel: true,
        errorCode: undefined,
        errorMessage: undefined,
        assets: undefined,
      };

      // Simulate image selection error
      const responseError = {
        didCancel: false,
        errorCode: 'ERROR_CODE',
        errorMessage: 'Error occurred',
        assets: undefined,
      };

      callback(responseCancelled);
      callback(responseError);
    });

    const logSpy = jest.spyOn(console, 'log');

    const {result} = renderHook(() => useProfile());

    await act(async () => {
      result.current.pickImage();
      await waitFor(() => {
        expect(logSpy).toHaveBeenCalledWith('User cancelled image picker');
        expect(logSpy).toHaveBeenCalledWith(
          'ImagePicker Error: ',
          'Error occurred',
        );
      });
    });

    logSpy.mockRestore();
  });

  //-----------
  test('fetchProfileData should fetch profile data', async () => {
    const mockToken = 'mockToken';
    const mockProfileData = {
      firstName: 'John',
      email: 'john@example.com',
      phoneNumber: '1234567890',
      profileImageUrl: 'https://example.com/profile.jpg',
    };

    globalThis.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockProfileData),
    });

    AsyncStorage.getItem = jest.fn().mockResolvedValue(mockToken);

    useNavigation.mockReturnValue({
      addListener: jest.fn(),
    });

    const {result} = renderHook(() => useProfile());

    expect(result.current.isLoading).toBe(false);

    await act(async () => {
      await result.current.fetchProfileData();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.name).toBe(mockProfileData.firstName);
    expect(result.current.email).toBe(mockProfileData.email);
    expect(result.current.phonenumber).toBe(mockProfileData.phoneNumber);
    expect(result.current.profilePic).toBe(mockProfileData.profileImageUrl);
  });

  test('fetchProfileData should throw an error when failed to fetch profile name', async () => {
    const mockToken = 'mockToken';

    globalThis.fetch = jest
      .fn()
      .mockRejectedValueOnce(new Error('Failed to fetch profile name'));

    AsyncStorage.getItem = jest.fn().mockResolvedValue(mockToken);

    useNavigation.mockReturnValue({
      addListener: jest.fn(),
    });

    const {result} = renderHook(() => useProfile());

    expect(result.current.isLoading).toBe(false);

    await act(async () => {
      try {
        await result.current.fetchProfileData();
      } catch (error) {
        expect(error.message).toBe('Failed to fetch profile name');
      }
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.name).toBe('');
    expect(result.current.email).toBe('');
    expect(result.current.phonenumber).toBe('');
    expect(result.current.profilePic).toBe('');
  });
  //-------
  test('handleRemoveProfilePic should call ApiService.post and setProfileImage', async () => {
    const mockResponse = {
      // Provide the desired response object here
    };

    ApiService.post.mockResolvedValue(mockResponse);

    const {result} = renderHook(() => useProfile());

    // Assert initial values
    expect(result.current.profilePic).toBe('');
    expect(result.current.showModal1).toBe(false);

    // Execute the function
    await act(async () => {
      await result.current.handleRemoveProfilePic();
    });

    // Assert the function calls and state changes
    expect(ApiService.post).toHaveBeenCalledWith(
      `${profileUpload}=${null}`,
      {},
    );
    expect(result.current.profilePic).toBe('');
    expect(result.current.showModal1).toBe(true);
  });

  //----

  test('fetchProfileData should log an error and set isLoading to false on error', async () => {
    const mockToken = 'mockToken';

    globalThis.fetch = jest
      .fn()
      .mockRejectedValueOnce(new Error('Failed to fetch profile data'));

    AsyncStorage.getItem = jest.fn().mockResolvedValue(mockToken);

    useNavigation.mockReturnValue({
      addListener: jest.fn(),
    });

    const logSpy = jest.spyOn(console, 'error');

    const {result} = renderHook(() => useProfile());

    expect(result.current.isLoading).toBe(false);

    await act(async () => {
      await result.current.fetchProfileData();
    });

    expect(logSpy).toHaveBeenCalledWith(
      new Error('Failed to fetch profile data'),
    );
    expect(result.current.isLoading).toBe(false);

    logSpy.mockRestore();
  });
  //----

  test('pickImage should log an error and set isLoading to true on error', async () => {
    launchImageLibrary.mockImplementation((options, callback) => {
      // Simulate image selection error
      const responseError = {
        didCancel: false,
        errorCode: 'ERROR_CODE',
        errorMessage: 'Error occurred',
        assets: undefined,
      };

      callback(responseError);
    });

    const logSpy = jest.spyOn(console, 'error');

    const {result} = renderHook(() => useProfile());

    expect(result.current.isLoading).toBe(false);

    await act(async () => {
      result.current.pickImage(); // Simulate picking an image
      await waitFor(() => expect(result.current.isLoading).toBe(true));
    });

    expect(logSpy).toHaveBeenCalledWith(new Error('Error occurred'));
    expect(result.current.isLoading).toBe(true);

    logSpy.mockRestore();
  });

  //----------------
  test('should call fetchProfileData on focus', async () => {
    const mockFetchProfileData = jest.fn();

    AsyncStorage.getItem.mockResolvedValue('mockToken');

    const mockAddListener = jest.fn().mockImplementation((event, callback) => {
      if (event === 'focus') {
        callback();
        return {
          remove: jest.fn(), // Return a function to remove the listener
        };
      }
    });

    useNavigation.mockReturnValue({
      addListener: mockAddListener,
    });

    const {result} = renderHook(() => useProfile());

    // Mocking the implementation of fetchProfileData
    jest
      .spyOn(result.current, 'fetchProfileData')
      .mockImplementation(mockFetchProfileData);

    await act(async () => {
      result.current.navigation.addListener.mock.calls[0][1](); // Call the registered callback manually
    });

    expect(mockFetchProfileData).toHaveBeenCalledTimes(1);
  });
});
