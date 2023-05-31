/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/react-in-jsx-scope */
import {View, TextInput, Text, TouchableOpacity, Image} from 'react-native';
import Styles from './Signupstyle';
import {ScrollView} from 'react-native-gesture-handler';
import Lottie from 'lottie-react-native';
import Usesignup from './Usesignup';
import {useNavigation} from '@react-navigation/native';
import style from '../Owneraddaddress/Owneraddressstyle';
import {RadioButton} from 'react-native-paper';
import Style from '../../constants/themeColors';
import Colors from '../../constants/Colors';
import React from 'react';
import useCart from '../Cart/useCart';
import CustomModal from '../../components/atoms/CustomModel/CustomModel';
export default function SignUpScreen() {
  const navigation = useNavigation();
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    formik,
    handleRole,
    role,
    closeModal,
    showModal,
    handleFirstNameChange,
    handlephoneNumber,
    handleLastNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleBlur,
    handleSignupfun,
  } = Usesignup();
  const {colorScheme} = useCart();
  return (
    <ScrollView
      style={[
        Styles.scrollContainer,
        colorScheme === 'dark' ? Style.blacktheme : Style.whiteTheme,
      ]}>
      <View
        style={[
          Styles.mainContainer,
          colorScheme === 'dark' ? Style.blacktheme : Style.whiteTheme,
        ]}>
        <Lottie
          style={Styles.image}
          source={require('../../../assets/Signup_lotte.json')}
          autoPlay
        />
        <Text
          style={[
            Styles.titleText,
            colorScheme === 'dark' ? Style.whitetext : Style.blackText,
          ]}>
          Signup
        </Text>
        {/* <Image
          style={Styles.image}
          source={require('../../../assets/LeapsLogo.png')}
        /> */}
        <View style={Styles.Container}>
          <View>{/* <Text style={Styles.cardText}>First name</Text> */}</View>
          <View>
            <TextInput
              style={[
                Styles.textinput,
                colorScheme === 'dark' ? Style.cardColor : Style.main,
                colorScheme === 'dark' ? Style.whitetext : Style.blackText,
              ]}
              placeholder="Enter First name"
              placeholderTextColor={
                colorScheme === 'dark' ? Colors.Textinput : Colors.black
              }
              value={firstName}
              autoCapitalize="words"
              // textColor="white"
              onChangeText={handleFirstNameChange}
              onBlur={() => handleBlur('firstName')}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <Text style={Styles.errorTxt}>{formik.errors.firstName}</Text>
            )}
          </View>
          <View>{/* <Text style={Styles.cardText}>Last name</Text> */}</View>
          <View>
            <TextInput
              style={[
                Styles.textinput,
                colorScheme === 'dark' ? Style.cardColor : Style.main,
                colorScheme === 'dark' ? Style.whitetext : Style.blackText,
              ]}
              placeholder="Enter Last name"
              placeholderTextColor={
                colorScheme === 'dark' ? Colors.Textinput : Colors.black
              }
              value={lastName}
              autoCapitalize="words"
              onChangeText={handleLastNameChange}
              onBlur={() => handleBlur('lastName')}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <Text style={Styles.errorTxt}>{formik.errors.lastName}</Text>
            )}
          </View>
          <View>{/* <Text style={Styles.cardText}>Email</Text> */}</View>
          <View>
            <TextInput
              style={[
                Styles.textinput,
                colorScheme === 'dark' ? Style.cardColor : Style.main,
                colorScheme === 'dark' ? Style.whitetext : Style.blackText,
              ]}
              placeholder="Enter email"
              placeholderTextColor={
                colorScheme === 'dark' ? Colors.Textinput : Colors.black
              }
              value={email}
              autoCapitalize="none"
              onChangeText={handleEmailChange}
              onBlur={() => handleBlur('email')}
            />
            {formik.touched.email && formik.errors.email && (
              <Text style={Styles.errorTxt}>{formik.errors.email}</Text>
            )}
          </View>
          <View>{/* <Text style={Styles.cardText}>Phone number</Text> */}</View>
          <View>
            <TextInput
              style={[
                Styles.textinput,
                colorScheme === 'dark' ? Style.cardColor : Style.main,
                colorScheme === 'dark' ? Style.whitetext : Style.blackText,
              ]}
              placeholder="Enter Phone number"
              placeholderTextColor={
                colorScheme === 'dark' ? Colors.Textinput : Colors.black
              }
              value={phoneNumber}
              // secureTextEntry={true}
              onChangeText={handlephoneNumber}
              onBlur={() => handleBlur('phoneNumber')}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <Text style={Styles.errorTxt}>{formik.errors.phoneNumber}</Text>
            )}
          </View>
          <View>{/* <Text style={Styles.cardText}>Password</Text> */}</View>
          <TextInput
            style={[
              Styles.textinput,
              colorScheme === 'dark' ? Style.cardColor : Style.main,
              colorScheme === 'dark' ? Style.whitetext : Style.blackText,
            ]}
            placeholder="Enter password"
            placeholderTextColor={
              colorScheme === 'dark' ? Colors.Textinput : Colors.black
            }
            value={password}
            secureTextEntry={true}
            onChangeText={handlePasswordChange}
            onBlur={() => handleBlur('password')}
          />
          {formik.touched.password && formik.errors.password && (
            <Text style={Styles.errorTxt}>{formik.errors.password}</Text>
          )}
          <Text
            style={[
              Styles.cardText,
              colorScheme === 'dark' ? Style.whitetext : Style.blackText,
            ]}>
            Select Role
          </Text>
          <View style={style.containerRadio}>
            <View style={style.optionRadio}>
              <RadioButton
                value="borrower"
                status={role === 'borrower' ? 'checked' : 'unchecked'}
                onPress={() => handleRole('borrower')}
              />
              <Text
                style={[
                  style.textRadio,
                  colorScheme === 'dark' ? Style.whitetext : Style.blackText,
                ]}>
                Borrower
              </Text>
            </View>
            <View style={style.optionRadio}>
              <RadioButton
                value="owner"
                status={role === 'owner' ? 'checked' : 'unchecked'}
                onPress={() => handleRole('owner')}
              />
              <Text
                style={[
                  style.textRadio,
                  colorScheme === 'dark' ? Style.whitetext : Style.blackText,
                ]}>
                Owner
              </Text>
            </View>
          </View>
        </View>
        {/* <Text style={Styles.switchText}>Owner Signup</Text> */}
        {/* <Switch
              /> */}
        {/* <View>
            </View> */}
        {/* <CheckBox
            /> */}
        <View style={Styles.signText}>
          {/* <TouchableOpacity
            onPress={handleSignupfun}
            style={Styles.touchablebtn}>
          <Text style={Styles.touchableText}>Signup</Text> */}
          <TouchableOpacity
            disabled={!formik.isValid}
            style={[
              Styles.touchablebtn,
              {
                backgroundColor: formik.isValid ? '#9747FF' : '#A5C9CA',
              },
            ]}
            onPress={handleSignupfun}>
            <Text style={Styles.touchableText}>Signup</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View style={[Styles.touchablebtnContainer, {flexDirection: 'row'}]}>
            <Text
              style={[
                Styles.signuptext,
                colorScheme === 'dark' ? Style.whitetext : Style.blackText,
              ]}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={Styles.LoginText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <CustomModal
        showModal={showModal}
        onClose={closeModal}
        message="Credentials already used"
      />
      {/* <View style={Styles.signupTextCont}> */}
      {/* </View> */}
    </ScrollView>
  );
}
