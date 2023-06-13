import React from 'react';
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
import useCart from '../Cart/useCart';
import Styles from '../../constants/themeColors';

type Props = {
  navigation: any;
};
const OwnerProfile = ({navigation}: Props) => {
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
  const {colorScheme} = useCart();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(Logout() as any);
  };
  return (
    <View
      style={[
        style.profileStyle,
        colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
      ]}>
      <ScrollView style={{width: '100%', height: '100%'}}>
        <View style={style.buttonContainer}>
          <SwitchAccountButton />
        </View>
        <View style={style.imageContainer}>
          <View style={style.viewS}>
            {isloading ? (
              <ActivityIndicator size="large" color="gray" />
            ) : profilePic ? (
              <Avatar.Image size={100} source={{uri: profilePic}} />
            ) : (
              <Avatar.Image
                size={100}
                source={require('../../../assets/profile.jpg')}
              />
            )}
          </View>
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
          <SkeletonPlaceholder
            highlightColor="#e0e0e0"
            backgroundColor={colorScheme === 'dark' ? '#373737' : '#f2f2f2'}>
            <View>
              <TextInput style={style.card} placeholderTextColor="#999" />
            </View>
          </SkeletonPlaceholder>
        ) : (
          <View
            style={[
              style.card,
              colorScheme === 'dark' ? Styles.cardColor : Styles.main,
            ]}>
            <Text
              style={[
                style.profileText,
                colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
              ]}>
              {name}
            </Text>
            <Text
              style={[
                style.profileText1,
                colorScheme === 'dark' ? Styles.InputText : Styles.main,
              ]}>
              {email}
            </Text>
            <Text
              style={[
                style.profileText1,
                colorScheme === 'dark' ? Styles.InputText : Styles.main,
              ]}>
              {phonenumber}
            </Text>
          </View>
        )}

        <View style={style.profileFields}>
          <TouchableOpacity
            style={[
              style.whiteBtn,
              colorScheme === 'dark' ? Styles.cardColor : Styles.main,
            ]}
            onPress={() => navigation.navigate('OwnerEditProfile')}>
            <Icons
              name="account"
              size={30}
              style={[
                style.editprofileicon,
                colorScheme === 'dark' ? Styles.InputText : Styles.blackText,
              ]}
            />
            <Text
              style={[
                style.btnPText,
                colorScheme === 'dark' ? Styles.InputText : Styles.blackText,
              ]}>
              Edit Profile
            </Text>
            <Icon
              name="arrow-forward-ios"
              size={20}
              style={[
                style.forwardios,
                colorScheme === 'dark' ? Styles.InputText : Styles.blackText,
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              style.whiteBtn,
              colorScheme === 'dark' ? Styles.cardColor : Styles.main,
            ]}
            onPress={() => navigation.navigate('Owneraddresspage')}>
            <Icon
              name="location-pin"
              size={30}
              style={[
                style.addressicon,
                colorScheme === 'dark' ? Styles.InputText : Styles.blackText,
              ]}
            />
            <Text
              style={[
                style.AddressbtnPText,
                colorScheme === 'dark' ? Styles.InputText : Styles.main,
              ]}>
              Address
            </Text>
            <Icon
              name="arrow-forward-ios"
              size={20}
              style={[
                style.addressforwardios,
                colorScheme === 'dark' ? Styles.InputText : Styles.blackText,
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              style.whiteBtn,
              colorScheme === 'dark' ? Styles.cardColor : Styles.main,
            ]}
            onPress={() => navigation.navigate('Owneredititems')}>
            <Icons
              name="basket-check"
              size={30}
              style={[
                style.producticon,
                colorScheme === 'dark' ? Styles.InputText : Styles.blackText,
              ]}
            />
            <Text
              style={[
                style.btnPText,
                colorScheme === 'dark' ? Styles.InputText : Styles.blackText,
              ]}>
              My Products
            </Text>
            <Icon
              name="arrow-forward-ios"
              size={20}
              style={[
                style.productforwardios,
                colorScheme === 'dark' ? Styles.InputText : Styles.blackText,
              ]}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={style.btntext}>Sign out </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={style.outerView} />
    </View>
  );
};

export default OwnerProfile;
