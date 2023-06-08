/* eslint-disable react-native/no-inline-styles */
// External libraries/packages
import React from 'react';
import {View, TextInput, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Lottie from 'lottie-react-native';

// Styles and assets
import styles from './LoginStyle';
import Colors from '../../constants/Colors';
import Styles from '../../constants/themeColors';

// Custom components and modules
import useCart from '../Cart/useCart';
import useLoginscreen from './useLoginscreen';
import CustomModal from '../../components/atoms/CustomModel/CustomModel';
import {StackNavigationProp} from '@react-navigation/stack';
type RootStackParamList = {
  OtpScreen: undefined;
  SignupScreen: undefined;
};
export default function LoginScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {formik, closeModal, showModal, handleLogin} = useLoginscreen();
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
            style={[
              styles.textinput,
              colorScheme === 'dark' ? Styles.cardColor : Styles.main,
              colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
            ]}
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
            <Text style={styles.errorText}>{formik.errors.password} </Text>
          )}
        </View>
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
