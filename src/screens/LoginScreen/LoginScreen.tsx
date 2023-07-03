/* eslint-disable react-native/no-inline-styles */
// External libraries/packages
import React, {useContext} from 'react';
import {View, TextInput, Text, TouchableOpacity} from 'react-native';
import Lottie from 'lottie-react-native';

// Custom components and modules
import useLoginscreen from './useLoginscreen';
import CustomModal from '../../components/atoms/CustomModel/CustomModel';
import {
  Donthavetext,
  continueText,
  otp,
  signin,
  signup,
} from '../../constants/languages/en';
import {ColorSchemeContext} from '../../../ColorSchemeContext';

// Styles and assets
import styles from './loginStyle';
import Colors from '../../constants/colors';
import Styles from '../../constants/themeColors';

const LoginScreen = () => {
  const {
    formik,
    closeModal,
    showModal,
    handleLogin,
    handleOtpScreen,
    handleSignUp,
  } = useLoginscreen();
  const {colorScheme, getContainerStyle, getTextInputStyle, getTextColor} =
    useContext(ColorSchemeContext);
  return (
    <View style={[styles.mainContainer, getContainerStyle()]}>
      <Lottie
        style={styles.image}
        source={require('../../../assets/loginlottie.json')}
        autoPlay
      />
      <View>
        <Text style={[styles.TitleText, getTextColor()]}>{signin}</Text>
      </View>
      <View>
        <TextInput
          style={[styles.textinput, getTextInputStyle(), getTextColor()]}
          placeholder="Email Address"
          placeholderTextColor={
            colorScheme === 'dark' ? Colors.Textinput : Colors.black
          }
          value={formik.values.email}
          autoCapitalize="none"
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
        />
        {formik.touched.email && formik.errors.email && (
          <Text style={styles.errorText}>{formik.errors.email} </Text>
        )}
        <View>
          <TextInput
            style={[styles.textinput, getTextInputStyle(), getTextColor()]}
            placeholder="Enter password"
            placeholderTextColor={
              colorScheme === 'dark' ? Colors.Textinput : Colors.black
            }
            value={formik.values.password}
            secureTextEntry={true}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
          />
          {formik.touched.password && formik.errors.password && (
            <Text style={styles.errorText}>{formik.errors.password}</Text>
          )}
        </View>
      </View>
      <View style={styles.touchablebtnContainer}>
        <TouchableOpacity
          testID="signin-button"
          disabled={!formik.isValid || !formik.dirty}
          style={[
            styles.touchablebtn,
            {
              backgroundColor: formik.isValid ? Colors.buttonColor : '#A7D8DE',
            },
          ]}
          onPress={handleLogin}>
          <Text style={styles.touchableText}>{signin}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.otp}>
        <Text style={[styles.otptext, getTextColor()]}>{continueText}</Text>
        <TouchableOpacity onPress={handleOtpScreen}>
          <Text style={styles.Otptext}>{otp}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sign}>
        <Text
          style={[
            styles.signuptext,
            colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
          ]}>
          {Donthavetext}
        </Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.Signuptext}>{signup}</Text>
        </TouchableOpacity>
      </View>
      <CustomModal
        showModal={showModal}
        onClose={closeModal}
        message="Invalid Credentials!"
      />
    </View>
  );
};
export default LoginScreen;
