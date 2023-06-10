/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import Lottie from 'lottie-react-native';

import useCart from '../Cart/useCart';
import useSignup from './useSignup';
import CustomModal from '../../components/atoms/CustomModel/CustomModel';
import {login, signup} from '../../constants/languages/En';

import Styles from './Signupstyle';
import style from '../Owneraddaddress/Owneraddressstyle';
import Colors from '../../constants/Colors';
import Style from '../../constants/themeColors';

const SignUpScreen = () => {
  const {
    formik,
    handleRole,
    role,
    closeModal,
    handleLogin,
    showModal,
    handleSignupfun,
  } = useSignup();
  const {colorScheme} = useCart();
  const isDarkMode = colorScheme === 'dark';
  const containerStyle = isDarkMode ? Style.blacktheme : Style.whiteTheme;
  const textInputStyle = isDarkMode ? Style.cardColor : Style.main;
  const textColor = isDarkMode ? Style.whitetext : Style.blackText;

  return (
    <ScrollView style={[Styles.scrollContainer, containerStyle]}>
      <View style={[Styles.mainContainer, containerStyle]}>
        <Lottie
          style={Styles.image}
          source={require('../../../assets/Signup_lotte.json')}
          autoPlay
        />
        <Text style={[Styles.titleText, textColor]}>{signup}</Text>
        <View style={Styles.Container}>
          <View>
            <TextInput
              style={[Styles.textinput, textInputStyle, textColor]}
              placeholder="Enter First name"
              placeholderTextColor={
                isDarkMode ? Colors.Textinput : Colors.black
              }
              value={formik.values.firstName}
              autoCapitalize="words"
              onChangeText={formik.handleChange('firstName')}
              onBlur={formik.handleBlur('firstName')}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <Text style={Styles.errorTxt}>{formik.errors.firstName}</Text>
            )}
          </View>
          <View>
            <TextInput
              style={[Styles.textinput, textInputStyle, textColor]}
              placeholder="Enter Last name"
              placeholderTextColor={
                isDarkMode ? Colors.Textinput : Colors.black
              }
              value={formik.values.lastName}
              autoCapitalize="words"
              onChangeText={formik.handleChange('lastName')}
              onBlur={formik.handleBlur('lastName')}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <Text style={Styles.errorTxt}>{formik.errors.lastName}</Text>
            )}
          </View>
          <View>
            <TextInput
              style={[Styles.textinput, textInputStyle, textColor]}
              placeholder="Enter email"
              placeholderTextColor={
                isDarkMode ? Colors.Textinput : Colors.black
              }
              value={formik.values.email}
              autoCapitalize="none"
              onChangeText={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
            />
            {formik.touched.email && formik.errors.email && (
              <Text style={Styles.errorTxt}>{formik.errors.email}</Text>
            )}
          </View>
          <View>
            <TextInput
              style={[Styles.textinput, textInputStyle, textColor]}
              placeholder="Enter Phone number"
              placeholderTextColor={
                isDarkMode ? Colors.Textinput : Colors.black
              }
              value={formik.values.phoneNumber}
              onChangeText={formik.handleChange('phoneNumber')}
              onBlur={formik.handleBlur('phoneNumber')}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <Text style={Styles.errorTxt}>{formik.errors.phoneNumber}</Text>
            )}
          </View>
          <TextInput
            style={[Styles.textinput, textInputStyle, textColor]}
            placeholder="Enter password"
            placeholderTextColor={isDarkMode ? Colors.Textinput : Colors.black}
            value={formik.values.password}
            secureTextEntry={true}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
          />
          {formik.touched.password && formik.errors.password && (
            <Text style={Styles.errorTxt}>{formik.errors.password}</Text>
          )}
          <Text style={[Styles.cardText, textColor]}>Select Role</Text>
          <View style={style.containerRadio}>
            <View style={style.optionRadio}>
              <RadioButton
                value="BORROWER"
                status={role === 'BORROWER' ? 'checked' : 'unchecked'}
                onPress={() => handleRole('BORROWER')}
              />
              <Text style={[style.textRadio, textColor]}>Borrower</Text>
            </View>
            <View style={style.optionRadio}>
              <RadioButton
                value="OWNER"
                status={role === 'OWNER' ? 'checked' : 'unchecked'}
                onPress={() => handleRole('OWNER')}
              />
              <Text style={[style.textRadio, textColor]}>Owner</Text>
            </View>
          </View>
        </View>
        <View style={Styles.signText}>
          <TouchableOpacity
            disabled={!formik.isValid}
            style={[
              Styles.touchablebtn,
              {
                backgroundColor: formik.isValid ? '#9747FF' : '#A5C9CA',
              },
            ]}
            onPress={handleSignupfun}>
            <Text style={Styles.touchableText}>{signup}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View style={[Styles.touchablebtnContainer, {flexDirection: 'row'}]}>
            <Text style={[Styles.signuptext, textColor]}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={Styles.LoginText}>{login}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <CustomModal
        showModal={showModal}
        onClose={closeModal}
        message="Credentials already used"
      />
    </ScrollView>
  );
};

export default SignUpScreen;
