import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import Profile from '../../../src/screens/Profile/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from '../../../src/redux/store';
import useProfile from '../../../src/screens/Profile/useProfile';
import style from '../../../src/screens/Profile/profileStyles';
import {StyleSheet} from 'react-native';
import {ColorSchemeContext} from '../../../ColorSchemeContext';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

jest.mock('../../../src/screens/Profile/useProfile', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({isloading: true}),
  handleRemoveProfilePic: jest.fn(),
}));
describe('Profile', () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });

  test('navigates to edit profile page when "Edit Profile" button is pressed', () => {
    const navigationMock = {navigate: jest.fn()};
    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Profile navigation={navigationMock} />
        </NavigationContainer>
      </Provider>,
    );

    fireEvent.press(getByText('Edit Profile'));

    expect(navigationMock.navigate).toHaveBeenCalledWith('Ownereditprofile');
  });

  test('navigates to Address page when "Address" button is pressed', () => {
    const navigationMock = {navigate: jest.fn()};
    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Profile navigation={navigationMock} />
        </NavigationContainer>
      </Provider>,
    );

    fireEvent.press(getByText('Address'));

    expect(navigationMock.navigate).toHaveBeenCalledWith('Owneraddresspage');
  });

  test('navigates to my orders page when "My Orders" button is pressed', () => {
    const navigationMock = {navigate: jest.fn()};
    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Profile navigation={navigationMock} />
        </NavigationContainer>
      </Provider>,
    );

    fireEvent.press(getByText('My orders'));

    expect(navigationMock.navigate).toHaveBeenCalledWith('MyOrder');
  });

  test('navigates to sign out  page when "Sign out" button is pressed', () => {
    const navigationMock = {navigate: jest.fn()};
    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Profile navigation={navigationMock} />
        </NavigationContainer>
      </Provider>,
    );

    fireEvent.press(getByText('Sign out'));
  });

  test('renders the Avatar component with correct size and source', () => {
    useProfile.mockReturnValueOnce({
      isLoading: false,
      profilePic: 'https://example.com/profile.jpg',
    });

    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Profile navigation={{}} />
        </NavigationContainer>
      </Provider>,
    );

    const avatarContainer = getByTestId('avatar-container');
    const avatarImage = getByTestId('avatar-image');

    expect(avatarContainer).toBeDefined();

    expect(avatarImage.props.source).toEqual({
      uri: 'https://example.com/profile.jpg',
    });
  });

  test('returns loading indicator when isloading is true', () => {
    const navigationMock = {
      navigate: jest.fn(),
    };

    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Profile navigation={navigationMock} />
        </NavigationContainer>
      </Provider>,
    );

    const activityIndicator = getByTestId('activity-indicator');
    expect(activityIndicator).toBeDefined();
  });

  //---
  test('calls handleRemoveProfilePic when "Remove" button is pressed', () => {
    const handleRemoveProfilePicMock = jest.fn();
    useProfile.mockReturnValueOnce({
      isLoading: false,
      handleRemoveProfilePic: handleRemoveProfilePicMock, // Providing the mock function
    });

    const {getByText} = render(
      <Provider store={store}>
        <Profile navigation={{}} />
      </Provider>,
    );

    fireEvent.press(getByText('Remove'));

    expect(handleRemoveProfilePicMock).toHaveBeenCalled();
  });

  //----
  it('should have the correct styles', () => {
    const expectedStyles = StyleSheet.create({
      btnfield: {
        alignItems: 'center',
        flexDirection: 'row',
        width: 300,
        height: 59,
        marginTop: 30,
        backgroundColor: '#3E54AC',
        borderRadius: 13,
      },
      btntext: {
        position: 'absolute',
        left: 120,
        top: 15,
        height: 29,
        width: 104,
        fontWeight: 'bold',
        fontFamily: 'Poppins',
        fontSize: 20,
        color: 'white',
      },
      profileImg: {
        height: 100,
        width: 100,
        borderRadius: 50,
        borderColor: 'red',
        shadowColor: '#3E54AC',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        marginTop: 80,
      },
      profileStyle: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ECF2FF',
        alignItems: 'center',
      },
      profileText: {
        textAlign: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        color: '#3E54AC',
        fontFamily: 'poppins',
        fontSize: 22,
        padding: 16,
      },
      profileFields: {
        height: 300,
      },
      editprofile: {
        backgroundColor: '#FFFFFF',
        color: 'white',
      },
      whiteBtn: {
        alignItems: 'center',
        textAlign: 'center',
        width: 300,
        height: 59,
        backgroundColor: 'white',
        borderRadius: 13,
        flexDirection: 'row',
        marginBottom: 15,
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      btnPText: {
        position: 'absolute',
        left: 100,
        top: 15,
        height: 29,
        width: 200,
        fontWeight: 'bold',
        fontFamily: 'Poppins',
        fontSize: 20,
        color: '#3E54AC',
        alignItems: 'center',
      },
      AddressbtnPText: {
        position: 'absolute',
        left: 110,
        top: 15,
        height: 29,
        width: 200,
        fontWeight: 'bold',
        fontFamily: 'Poppins',
        fontSize: 20,
        color: '#3E54AC',
        alignItems: 'center',
      },
      imageContainer: {
        zIndex: 1,
      },
      buttonContainer: {
        marginTop: 15,
        zIndex: 2,
      },
    });

    expect(expectedStyles).toEqual(style);
  });
  test('calls pickImage when "Upload" button is pressed', () => {
    const pickImageMock = jest.fn();
    useProfile.mockReturnValueOnce({
      isLoading: false,
      pickImage: pickImageMock, // Providing the mock function
    });

    const {getByText} = render(
      <Provider store={store}>
        <Profile navigation={{}} />
      </Provider>,
    );

    fireEvent.press(getByText('Upload'));

    expect(pickImageMock).toHaveBeenCalled();
  });

  //-----------
});
