/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React from 'react';
import style from '../Ownerprofile/OwnerProfilestyle';
import SwitchAccountButton from '../../components/atoms/SwtichAccountButton';
import AddImages from '../../components/atoms/AddImages';
import ProfileData from './ProfileData';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import {Logout} from '../../redux/actions/actions';
import useCart from '../Cart/useCart';
import Styles from '../../constants/themeColors';
import Colors from '../../constants/Colors';
import ToggleButton from 'react-native-paper/lib/typescript/src/components/ToggleButton/ToggleButton';
import Togglebutton from '../../components/atoms/Colorscheme/Togglebutton';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {TextInput} from 'react-native-gesture-handler';
import {Avatar} from 'react-native-paper';
import CustomModal from '../../components/atoms/CustomModel/CustomModel';

type Props = {
  navigation: any;
};
const Profile = ({navigation}: Props) => {
  const {
    name,
    email,
    phonenumber,
    isLoading,
    pickImage,
    uploadImage,
    profilePic,
    selectedImage,
    setSelectedImage,
    showModall,
    closeModal,
    showModal1,
    closeModal1,
    isloading,
    handleRemoveProfilePic,
    setProfileImage,
    refreshData,
    refreshState,
  } = ProfileData();
  const {colorScheme} = useCart();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(Logout());
  };
  return (
    <View
      style={[
        style.profileStyle,
        colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
      ]}>
      <ScrollView
        style={{width: '100%', height: '100%'}}
        refreshControl={
          <RefreshControl refreshing={refreshState} onRefresh={refreshData} />
        }>
        {console.log('refreshinggggg ', profilePic)}
        <View style={style.buttonContainer}>
          <View style={{zIndex: 1}}>
            <SwitchAccountButton />
            <Togglebutton />
          </View>
          <View style={style.imageContainer}>
            {/* <AddImages /> */}
            <View
              style={{
                width: 130,
                height: 150,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {isloading ? ( // Display loading indicator while uploading
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
          {/* <View style={{flexDirection: 'row', marginLeft: '80%'}}> */}
          {/* <Text
              style={[
                {fontFamily: 'Poppins-Medium', fontSize: 16},
                colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
              ]}>
              {colorScheme}
            </Text> */}
          {/* </View> */}
        </View>
        {/* <Togglebutton /> */}
        <View style={style.uploadButtoncontainer}>
          <TouchableOpacity style={style.uploadButton} onPress={pickImage}>
            <Text style={style.uploadText}>Upload</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.removeButton}
            onPress={() => {
              handleRemoveProfilePic();
              // setProfileImage(null);
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

        {/* </View> */}
        <View style={style.profileFields}>
          <TouchableOpacity
            style={[
              style.whiteBtn,
              colorScheme === 'dark' ? Styles.cardColor : Styles.main,
            ]}
            onPress={() => navigation.navigate('Ownereditprofile')}>
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
                colorScheme === 'dark' ? Styles.InputText : Styles.blackText,
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
            onPress={() => navigation.navigate('MyOrder')}>
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
              My orders
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

      <View style={{marginTop: 10}} />
      <CustomModal
        showModal={showModall}
        onClose={closeModal}
        message="Profile image uploaded successfully!"
      />
      <CustomModal
        showModal={showModal1}
        onClose={closeModal1}
        message="Profile image removed !"
      />
    </View>
  );
};

export default Profile;
