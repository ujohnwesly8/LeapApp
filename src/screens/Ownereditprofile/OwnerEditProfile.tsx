/* eslint-disable react-native/no-inline-styles */
import {Text, TextInput, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import style from './ownerEditProfileStyle';
import Colors from '../../constants/colors';

import useOwnerProfile from './useOwnerProfile';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import useCart from '../Cart/useCart';
import Styles from '../../constants/themeColors';
import HeadingText from '../../components/atoms/HeadingText/HeadingTest';
import CustomModal from '../../components/atoms/CustomModel/CustomModel';
export default function OwnerEditProfileCustomHook() {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    showModal,
    closeModal,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    handleUpdate,
    isLoading,
  } = useOwnerProfile();
  const {colorScheme} = useCart();
  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => {
    setIsFormValid(
      firstName.trim().length > 0 &&
        lastName.trim().length > 0 &&
        email.trim().length > 0 &&
        phoneNumber.trim().length > 0,
    );
  }, [firstName, lastName, email, phoneNumber]);
  return (
    <View
      style={[
        style.container,
        colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
      ]}>
      <View style={style.addAddressHeader}>
        <HeadingText message="Edit profile" />
      </View>
      <View>
        {isLoading ? (
          <SkeletonPlaceholder
            highlightColor="#e0e0e0"
            backgroundColor={colorScheme === 'dark' ? '#373737' : '#f2f2f2'}>
            <View>
              <TextInput style={style.input} placeholderTextColor="#999" />
              <TextInput style={style.input} />
              <TextInput style={style.input} />
              <TextInput style={style.input} />
            </View>
          </SkeletonPlaceholder>
        ) : (
          <View>
            <Text
              style={[
                style.text,
                colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
              ]}>
              First name
            </Text>
            <TextInput
              style={[
                style.input,
                colorScheme === 'dark' ? Styles.cardColor : Styles.main,
                colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
              ]}
              placeholderTextColor={Colors.white}
              value={firstName}
              onChangeText={text => setFirstName(text)}
            />
            <Text
              style={[
                style.text,
                colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
              ]}>
              Last name
            </Text>
            <TextInput
              style={[
                style.input,
                colorScheme === 'dark' ? Styles.cardColor : Styles.main,
                colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
              ]}
              value={lastName}
              onChangeText={text => setLastName(text)}
            />
            <Text
              style={[
                style.text,
                colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
              ]}>
              Email
            </Text>
            <TextInput
              style={[
                style.emailinput,
                colorScheme === 'dark' ? Styles.cardColor : Styles.InputText,
                colorScheme === 'dark' ? Styles.InputText : Styles.placeholder,
              ]}
              value={email}
              onChangeText={text => setEmail(text)}
              selectTextOnFocus={false}
              editable={false}
            />
            <Text
              style={[
                style.text,
                colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
              ]}>
              Phone number
            </Text>
            <TextInput
              style={[
                style.emailinput,
                colorScheme === 'dark' ? Styles.cardColor : Styles.InputText,
                colorScheme === 'dark' ? Styles.InputText : Styles.placeholder,
              ]}
              value={phoneNumber}
              onChangeText={text => setPhoneNumber(text)}
              editable={false}
            />
          </View>
        )}
      </View>
      <View style={style.buttons}>
        <View
          style={[
            style.btnfield,
            {
              opacity: isFormValid ? 1 : 0.5,
            },
          ]}>
          {isLoading ? (
            <SkeletonPlaceholder borderRadius={4}>
              <SkeletonPlaceholder.Item
                width={100}
                height={20}
                borderRadius={5}
              />
            </SkeletonPlaceholder>
          ) : (
            <TouchableOpacity
              onPress={handleUpdate}
              disabled={!isFormValid}
              style={{flex: 1}}>
              <Text style={style.btntext}>Update</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <CustomModal
        showModal={showModal}
        onClose={closeModal}
        message="Profile Updated!"
      />
    </View>
  );
}
