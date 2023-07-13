import React from 'react';
import {Avatar} from 'react-native-paper';

import {render, fireEvent} from '@testing-library/react-native';
import OwnerProfile, {
  SkeletonLoader,
} from '../../../src/screens/Ownerprofile/OwnerProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {store} from '../../../src/redux/store';
import {Provider, useDispatch} from 'react-redux';
import {Logout} from '../../../src/redux/actions/actions';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('OwnerProfile', () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });
  jest.mock('../../../src/screens/Ownerprofile/useOwnerProfile', () => ({
    __esModule: true,
    default: jest.fn().mockReturnValue({
      name: 'John Doe',
      email: 'johndoe@example.com',
      phonenumber: '1234567890',
      isLoading: false,
      pickImage: jest.fn(),
      profilePic: 'https://example.com/profile.jpg',
      handleRemoveProfilePic: jest.fn(),
      isloading: false,
    }),
  }));

  test('navigates to Owner Address page when "Address" button is pressed', () => {
    const navigationMock = {navigate: jest.fn()};
    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <OwnerProfile navigation={navigationMock} />
        </NavigationContainer>
      </Provider>,
    );

    fireEvent.press(getByText('Address'));

    expect(navigationMock.navigate).toHaveBeenCalledWith('Owneraddresspage');
  });

  test('navigates to OwnerEditProfile page when "Edit Profile" button is pressed', () => {
    const navigationMock = {navigate: jest.fn()};
    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <OwnerProfile navigation={navigationMock} />
        </NavigationContainer>
      </Provider>,
    );

    fireEvent.press(getByText('Edit Profile'));

    expect(navigationMock.navigate).toHaveBeenCalledWith('OwnerEditProfile');
  });

  test('navigates to Owneraddresspage page when "Address" button is pressed', () => {
    const navigationMock = {navigate: jest.fn()};
    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <OwnerProfile navigation={navigationMock} />
        </NavigationContainer>
      </Provider>,
    );

    fireEvent.press(getByText('Address'));

    expect(navigationMock.navigate).toHaveBeenCalledWith('Owneraddresspage');
  });

  test('navigates to Owneredititems page when "My Products" button is pressed', () => {
    const navigationMock = {navigate: jest.fn()};
    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <OwnerProfile navigation={navigationMock} />
        </NavigationContainer>
      </Provider>,
    );

    fireEvent.press(getByText('My Products'));

    expect(navigationMock.navigate).toHaveBeenCalledWith('Owneredititems');
  });

  test('renders the profile image with the correct source', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <OwnerProfile navigation={{}} />
        </NavigationContainer>
      </Provider>,
    );

    const avatarImage = getByTestId('profile-image') as Avatar.Image;

    expect(avatarImage.props.source).toEqual({
      testUri: '../../../assets/profile.jpg',
    });
  });

  //----------

  test('renders the default profile image when profilePic is not present', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <OwnerProfile navigation={undefined} />
        </NavigationContainer>
      </Provider>,
    );

    const avatarImage = getByTestId('profile-image');
    expect(avatarImage.props.source).toEqual({
      testUri: '../../../assets/profile.jpg',
    });
  });

  it('should render skeleton Loader', () => {
    const loader = render(<SkeletonLoader />);
    expect(loader).toBeDefined();
  });

  test('should render SkeletonLoader component', () => {
    const {getByTestId} = render(<SkeletonLoader />);

    const skeletonLoader = getByTestId('skeleton-loader');

    expect(skeletonLoader).toBeDefined();
  });

  test('should call dispatch with Logout action on logout button press', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <OwnerProfile navigation={{navigate: jest.fn()}} />
        </NavigationContainer>
      </Provider>,
    );

    const logoutButton = getByTestId('logout-button');
    fireEvent.press(logoutButton);

    expect(mockDispatch).toHaveBeenCalledWith(Logout());
  });

  //------------
  test('should display ActivityIndicator when isloading is true', () => {
    const {getByTestId} = render(
      //   <OwnerProfile navigation={{navigate: jest.fn()}} />,
      <Provider store={store}>
        <NavigationContainer>
          <OwnerProfile navigation={{navigate: jest.fn()}} />
        </NavigationContainer>
      </Provider>,
    );

    const activityIndicator = getByTestId('activity-indicator');
    expect(activityIndicator).toBeTruthy();
  });
  //---------------------->
  test('renders avatar image', () => {
    const {getByTestId} = render(
      <Avatar.Image size={100} source={{uri: 'profilePic'}} />,
    );
    expect(getByTestId('avatar-image')).toBeTruthy();
  });

  test('does not render avatar image when profilePic is null', () => {
    const {queryByTestId} = render(
      <Avatar.Image size={100} source={{uri: null}} />,
    );
    expect(queryByTestId('avatar-image')).toBeNull();
  });
  //--------->
  test('calls handleRemoveProfilePic when remove button is pressed', () => {
    const handleRemoveProfilePic = jest.fn();

    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <OwnerProfile handleRemoveProfilePic={handleRemoveProfilePic} />
        </NavigationContainer>
      </Provider>,
    );

    fireEvent.press(getByText('Remove'));

    expect(handleRemoveProfilePic).toHaveBeenCalled();
  });

  test('does not call handleRemoveProfilePic when remove button is not pressed', () => {
    const handleRemoveProfilePic = jest.fn();

    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <OwnerProfile handleRemoveProfilePic={handleRemoveProfilePic} />
        </NavigationContainer>
      </Provider>,
    );

    // Does not call function
    expect(handleRemoveProfilePic).not.toHaveBeenCalled();
  });
});
