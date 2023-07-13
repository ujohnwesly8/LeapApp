/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect} from 'react';
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

import useAddAddress from './useAddAddress';

import style from './AddressStyles';
import colors from '../../constants/colors';

import {ColorSchemeContext} from '../../../ColorSchemeContext';
import useLoginscreen from '../LoginScreen/useLoginscreen';
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
  const {placeholadercolor} = useLoginscreen();

  const {colorScheme, getContainerStyle, getTextColor, getTextInputStyle} =
    useContext(ColorSchemeContext);

  useEffect(() => {
    if (postalCode !== '') {
      FetchAddress();
    } else {
      console.log('Wrong Postalcode');
    }
  }, [FetchAddress, postalCode]);

  return (
    <ScrollView
      style={[
        {
          height: '100%',
        },
        getContainerStyle(),
      ]}>
      <View>
        <HeadingText message="Add Address" navigation={undefined} />
      </View>

      <View style={style.outerContainer}>
        <View style={style.innerContainer}>
          <TextInput
            placeholder="Flat no / Building"
            placeholderTextColor={placeholadercolor()}
            value={addressLine1}
            onChangeText={handleAddressLine1}
            onBlur={() => handleBlur('addressLine1')}
            style={[
              style.inputAddres,
              getTextInputStyle(),
              getTextColor(),
              {fontWeight: '400'},
            ]}
            testID="addressLine1Input"
          />
          {formik.touched.addressLine1 && formik.errors.addressLine1 && (
            <Text style={style.errorText}>{formik.errors.addressLine1}</Text>
          )}
        </View>
        <View style={style.innerContainer}>
          <TextInput
            placeholder="Street name"
            placeholderTextColor={placeholadercolor()}
            value={addressLine2}
            onChangeText={handleAddressLine2}
            onBlur={() => handleBlur('addressLine2')}
            style={[style.StreetInput, getTextInputStyle(), getTextColor()]}
            testID="addressLine2Input"
          />
          {formik.touched.addressLine2 && formik.errors.addressLine2 && (
            <Text style={style.errorText}>{formik.errors.addressLine2}</Text>
          )}
        </View>
        <View style={style.cityContainer}>
          <TextInput
            placeholder="Pincode"
            placeholderTextColor={placeholadercolor()}
            style={[style.smalltextInput, getTextInputStyle(), getTextColor()]}
            value={postalCode}
            onChangeText={handlePostalCodeChange}
            onBlur={() => handleBlur('postalCode')}
            testID="postalCodeInput"
          />

          <TextInput
            placeholder="City"
            placeholderTextColor={placeholadercolor()}
            value={city}
            editable={false}
            selectTextOnFocus={false}
            style={[style.smalltextInputs, getTextInputStyle(), getTextColor()]}
            onChangeText={text => {
              setCity(text);
            }}
            testID="cityInput"
          />
        </View>
        <TextInput
          placeholder="State "
          value={state}
          editable={false}
          placeholderTextColor={placeholadercolor()}
          style={[style.inputAddress, getTextInputStyle(), getTextColor()]}
          onChangeText={text => setStateName(text)}
          testID="stateInput"
        />
        <TextInput
          placeholder="Country "
          placeholderTextColor={placeholadercolor()}
          value={country}
          editable={false}
          selectTextOnFocus={false}
          style={[style.inputAddress, getTextInputStyle(), getTextColor()]}
          onChangeText={text => setCountry(text)}
          testID="countryInput"
        />
      </View>
      <Text style={[style.textField, getTextColor()]}>Type of address</Text>
      <View style={style.containerRadio}>
        <View style={style.optionRadio}>
          <RadioButton
            value="HOME"
            status={selectedOption === 'HOME' ? 'checked' : 'unchecked'}
            onPress={() => handleOptionChange('HOME')}
            color={colorScheme === 'dark' ? colors.white : colors.black}
            testID="homeRadio"
          />
          <Text style={[style.textRadio, getTextColor()]}>Home</Text>
        </View>
        <View style={style.optionRadio}>
          <RadioButton
            value="OFFICE"
            status={selectedOption === 'OFFICE' ? 'checked' : 'unchecked'}
            onPress={() => handleOptionChange('OFFICE')}
            color={colorScheme === 'dark' ? colors.white : colors.black}
            testID="officeRadio"
          />
          <Text style={[style.textRadio, getTextColor()]}>Office</Text>
        </View>
      </View>
      <Spinner visible={isLoading} />
      <View style={style.containerCheckbox}>
        <Text style={[style.textCheckbox, getTextColor()]}>
          Make as default address
        </Text>
        <CheckBox
          checked={isChecked}
          onPress={handleCheckboxChange}
          checkedColor={colorScheme === 'dark' ? colors.white : colors.black}
          containerStyle={style.checkboxContainer}
          size={24}
          testID="defaultAddressCheckbox"
        />
      </View>
      <TouchableOpacity
        style={style.btnfieldAddress}
        onPress={handleSaveAddress}>
        <Text style={style.btntextAddress}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddAddress;
