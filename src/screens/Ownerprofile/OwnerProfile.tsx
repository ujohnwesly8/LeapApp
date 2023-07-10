/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import {Logout} from '../../redux/actions/actions';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Avatar} from 'react-native-paper';

import style from './ownerProfileStyle';
import ProfileData from '../Profile/useProfile';
import SwitchAccountButton from '../../components/atoms/SwtichAccountButton';

import {ColorSchemeContext} from '../../../ColorSchemeContext';

type Props = {
  navigation: any;
};
export const SkeletonLoader = () => {
  const {colorScheme} = useContext(ColorSchemeContext);
  return (
    <View testID="skeleton-loader">
      <SkeletonPlaceholder
        highlightColor="#e0e0e0"
        backgroundColor={colorScheme === 'dark' ? '#373737' : '#f2f2f2'}>
        <View
        //  testID="skeleton-loader"
        >
          <TextInput style={style.card} placeholderTextColor="#999" />
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};
const OwnerProfile = ({navigation}: Props) => {
  const {getContainerStyle, getTextInputStyle, getPlaceholderTextColor} =
    useContext(ColorSchemeContext);
  const {
    name,
    email,
    phonenumber,
    isLoading,
    pickImage,
    profilePic,
    handleRemoveProfilePic,
    isloading,
  } = ProfileData();
  const renderProfileImage = () => {
    if (isloading) {
      return (
        <View testID="activity-indicator">
          <ActivityIndicator size="large" color="gray" />
        </View>
      );
    } else if (profilePic) {
      return <Avatar.Image size={100} source={{uri: profilePic}} />;
    } else {
      return (
        <View testID="avatar-container">
          <Avatar.Image
            testID="profile-image"
            size={100}
            source={require('../../../assets/profile.jpg')}
          />
        </View>
      );
    }
  };
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(Logout() as any);
  };
  return (
    <View style={[style.profileStyle, getContainerStyle()]}>
      <ScrollView style={{width: '100%', height: '100%'}}>
        <View style={style.buttonContainer}>
          <SwitchAccountButton />
        </View>
        <View style={style.imageContainer}>
          <View style={style.viewS}>{renderProfileImage()}</View>
        </View>
        <View style={style.uploadButtoncontainer}>
          <TouchableOpacity style={style.uploadButton} onPress={pickImage}>
            <Text style={style.uploadText}>Upload</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.removeButton}
            onPress={() => {
              handleRemoveProfilePic();
            }}>
            <Text style={style.uploadText}>Remove</Text>
          </TouchableOpacity>
        </View>
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <View style={[style.card, getTextInputStyle()]}>
            <Text style={[style.profileText, getPlaceholderTextColor()]}>
              {name}
            </Text>
            <Text style={[style.profileText1, getPlaceholderTextColor()]}>
              {email}
            </Text>
            <Text style={[style.profileText1, getPlaceholderTextColor()]}>
              {phonenumber}
            </Text>
          </View>
        )}

        <View style={style.profileFields}>
          <TouchableOpacity
            style={[style.whiteBtn, getTextInputStyle()]}
            onPress={() => navigation.navigate('OwnerEditProfile')}>
            <Icons
              name="account"
              size={30}
              style={[style.editprofileicon, getPlaceholderTextColor()]}
            />
            <Text style={[style.btnPText, getPlaceholderTextColor()]}>
              Edit Profile
            </Text>
            <Icon
              name="arrow-forward-ios"
              size={20}
              style={[style.forwardios, getPlaceholderTextColor()]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[style.whiteBtn, getTextInputStyle()]}
            onPress={() => navigation.navigate('Owneraddresspage')}>
            <Icon
              name="location-pin"
              size={30}
              style={[style.addressicon, getPlaceholderTextColor()]}
            />
            <Text style={[style.AddressbtnPText, getPlaceholderTextColor()]}>
              Address
            </Text>
            <Icon
              name="arrow-forward-ios"
              size={20}
              style={[style.addressforwardios, getPlaceholderTextColor()]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[style.whiteBtn, getTextInputStyle()]}
            onPress={() => navigation.navigate('Owneredititems')}>
            <Icons
              name="basket-check"
              size={30}
              style={[style.producticon, getPlaceholderTextColor()]}
            />
            <Text style={[style.btnPText, getPlaceholderTextColor()]}>
              My Products
            </Text>
            <Icon
              name="arrow-forward-ios"
              size={20}
              style={[style.productforwardios, getPlaceholderTextColor()]}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={handleLogout} testID="logout-button">
            <Text style={style.btntext}>Sign out </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={style.outerView} />
    </View>
  );
};

export default OwnerProfile;
