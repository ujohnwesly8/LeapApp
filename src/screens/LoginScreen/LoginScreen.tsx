/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Useformik from './Useloginscreen';
import {useNavigation} from '@react-navigation/native';
import styles from './LoginStyle';
import Colors from '../../constants/Colors';
// import Style from '../Profile/profilestyles';
import Lottie from 'lottie-react-native';
import useCart from '../Cart/useCart';
import Styles from '../../constants/themeColors';
import CustomModal from '../../components/atoms/CustomModel/CustomModel';
export default function LoginScreen() {
  const navigation = useNavigation();
  const {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    handleBlur,
    formik,
    closeModal,
    showModal,
    passwordError,
    handleLogin,
  } = Useformik();
  const {colorScheme} = useCart();
  return (
    <View
      style={[
        styles.mainContainer,
        colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
      ]}>
      <Lottie
        style={styles.image}
        source={require('../../../assets/loginlottie.json')}
        autoPlay
      />
      <View>
        <Text
          style={[
            styles.TitleText,
            colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
          ]}>
          SignIn
        </Text>
      </View>
      <View>
        <TextInput
          style={[
            styles.textinput,
            colorScheme === 'dark' ? Styles.cardColor : Styles.main,
            colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
          ]}
          placeholder="Email Address"
          placeholderTextColor={
            colorScheme === 'dark' ? Colors.Textinput : Colors.black
          }
          value={email}
          autoCapitalize="none"
          onChangeText={handleEmailChange}
          onBlur={() => handleBlur('email')}
        />
        {formik.touched.email && formik.errors.email && (
          <Text style={styles.errorText}>{formik.errors.email} </Text>
        )}
        <View>
          <TextInput
            style={[
              styles.textinput,
              colorScheme === 'dark' ? Styles.cardColor : Styles.main,
              colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
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
            <Text style={styles.errorText}>{formik.errors.password} </Text>
          )}
        </View>
        {passwordError.length > 0 && <Text>{passwordError}</Text>}
      </View>
      <View style={styles.touchablebtnContainer}>
        <TouchableOpacity
          disabled={!formik.isValid}
          style={[
            styles.touchablebtn,
            {
              backgroundColor: formik.isValid ? Colors.buttonColor : '#A7D8DE',
            },
          ]}
          onPress={handleLogin}>
          <Text style={styles.touchableText}>Sign in</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.otp}>
        <Text
          style={[
            styles.otptext,
            colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
          ]}>
          Continue with{' '}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('OtpScreen')}>
          <Text style={styles.Otptext}>OTP</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sign}>
        <Text
          style={[
            styles.signuptext,
            colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
          ]}>
          Don't have an account?{' '}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
          <Text style={styles.Signuptext}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <CustomModal
        showModal={showModal}
        onClose={closeModal}
        message="Invalid Credentials!"
      />
    </View>
  );
}
