/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {RadioButton} from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import HeadingText from '../../components/atoms/HeadingText/HeadingTest';
import useCart from '../Cart/useCart';
import useAddAddress from './useAddAddress';

import style from './AddressStyles';
import colors from '../../constants/colors';
import Styles from '../../constants/themeColors';
const AddAddress = () => {
  const {
    setStateName,
    setCity,
    addressLine2,
    FetchAddress,
    addressLine1,
    handleSaveAddress,
    handleCheckboxChange,
    handleOptionChange,
    selectedOption,
    isChecked,
    city,
    state,
    handlePostalCodeChange,
    postalCode,
    country,
    setCountry,
    isLoading,

    formik,
    handleAddressLine1,
    handleAddressLine2,
    handleBlur,
  } = useAddAddress();

  const {colorScheme} = useCart();

  useEffect(() => {
    if (postalCode !== '') {
      FetchAddress();
    } else {
      console.log('Wrong Postalcode');
    }
  }, [FetchAddress, postalCode]);

  return (
    <ScrollView
      style={{
        backgroundColor: colorScheme === 'dark' ? colors.black : colors.main,
        height: '100%',
      }}>
      <View>
        <HeadingText message="Add Address" />
      </View>
      {/* <View> */}
      <View style={style.outerContainer}>
        <View style={style.innerContainer}>
          <TextInput
            placeholder="Flat no / Building"
            placeholderTextColor={
              colorScheme === 'dark' ? colors.Textinput : colors.black
            }
            value={addressLine1}
            onChangeText={handleAddressLine1}
            onBlur={() => handleBlur('addressLine1')}
            style={[
              style.inputAddres,
              colorScheme === 'dark' ? Styles.cardColor : Styles.main,
              colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
              {fontWeight: '400'},
            ]}
          />
          {formik.touched.addressLine1 && formik.errors.addressLine1 && (
            <Text style={style.errorText}>{formik.errors.addressLine1}</Text>
          )}
        </View>
        <View style={style.innerContainer}>
          <TextInput
            placeholder="Street name"
            placeholderTextColor={
              colorScheme === 'dark' ? colors.Textinput : colors.black
            }
            value={addressLine2}
            onChangeText={handleAddressLine2}
            onBlur={() => handleBlur('addressLine2')}
            style={[
              style.StreetInput,
              colorScheme === 'dark' ? Styles.cardColor : Styles.main,
              colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
            ]}
          />
          {formik.touched.addressLine2 && formik.errors.addressLine2 && (
            <Text style={style.errorText}>{formik.errors.addressLine2}</Text>
          )}
        </View>
        <View style={style.cityContainer}>
          {/* <View style={{width: 250}}> */}
          <TextInput
            placeholder="Pincode"
            placeholderTextColor={
              colorScheme === 'dark' ? colors.Textinput : colors.black
            }
            style={[
              style.smalltextInput,
              colorScheme === 'dark' ? Styles.cardColor : Styles.main,
              colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
            ]}
            value={postalCode}
            onChangeText={handlePostalCodeChange}
            onBlur={() => handleBlur('postalCode')}
          />

          <TextInput
            placeholder="City"
            placeholderTextColor={
              colorScheme === 'dark' ? colors.Textinput : colors.black
            }
            value={city}
            editable={false}
            selectTextOnFocus={false}
            style={[
              style.smalltextInputs,
              colorScheme === 'dark' ? Styles.cardColor : Styles.main,
              colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
            ]}
            onChangeText={text => {
              setCity(text);
            }}
          />
        </View>
        <TextInput
          placeholder="State "
          value={state}
          editable={false}
          placeholderTextColor={
            colorScheme === 'dark' ? colors.Textinput : colors.black
          }
          style={[
            style.inputAddress,
            colorScheme === 'dark' ? Styles.cardColor : Styles.main,
            colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
          ]}
          onChangeText={text => setStateName(text)}
        />
        <TextInput
          placeholder="Country "
          placeholderTextColor={
            colorScheme === 'dark' ? colors.Textinput : colors.black
          }
          value={country}
          editable={false}
          selectTextOnFocus={false}
          style={[
            style.inputAddress,
            colorScheme === 'dark' ? Styles.cardColor : Styles.main,
            colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
          ]}
          onChangeText={text => setCountry(text)}
        />
      </View>
      <Text
        style={[
          style.textField,
          colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
        ]}>
        Type of address
      </Text>
      <View style={style.containerRadio}>
        <View style={style.optionRadio}>
          <RadioButton
            value="HOME"
            status={selectedOption === 'HOME' ? 'checked' : 'unchecked'}
            onPress={() => handleOptionChange('HOME')}
            color={colorScheme === 'dark' ? colors.white : colors.black}
          />
          <Text
            style={[
              style.textRadio,
              colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
            ]}>
            Home
          </Text>
        </View>
        <View style={style.optionRadio}>
          <RadioButton
            value="OFFICE"
            status={selectedOption === 'OFFICE' ? 'checked' : 'unchecked'}
            onPress={() => handleOptionChange('OFFICE')}
            color={colorScheme === 'dark' ? colors.white : colors.black}
          />
          <Text
            style={[
              style.textRadio,
              colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
            ]}>
            Office
          </Text>
        </View>
      </View>
      <Spinner visible={isLoading} />
      <View style={style.containerCheckbox}>
        <Text
          style={[
            style.textCheckbox,
            colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
          ]}>
          Make as default address
        </Text>
        <CheckBox
          checked={isChecked}
          onPress={handleCheckboxChange}
          checkedColor={colorScheme === 'dark' ? colors.white : colors.black}
          containerStyle={style.checkboxContainer}
          size={24}
        />
      </View>
      {/* </View> */}
      <TouchableOpacity
        style={style.btnfieldAddress}
        // disabled={!formik.isValid}
        onPress={handleSaveAddress}>
        <Text style={style.btntextAddress}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddAddress;
