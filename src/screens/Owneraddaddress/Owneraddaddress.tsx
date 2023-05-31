import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import style from './Owneraddressstyle';
import {OwnerAddAddressCustomHook} from './Useowneraddaddress';
import {CheckBox} from 'react-native-elements';
import Colors from '../../constants/Colors';
import {RadioButton} from 'react-native-paper';
import BackButton from '../../components/atoms/BackButton/BackButton';
import HeadingText from '../../components/atoms/HeadingText/HeadingTest';
import useCart from '../Cart/useCart';
import Styles from '../../constants/themeColors';
import Spinner from 'react-native-loading-spinner-overlay';
// import {ScrollView} from 'react-native-gesture-handler';

const Owneraddaddress = () => {
  const navigation = useNavigation();
  const {
    setStateName,
    setCity,
    setaddressLine1,
    setaddressLine2,
    setpostalCode,
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
    setIsLoading,
    showLoader,
    formik,
    handleAddressLine1,
    handleAddressLine2,
    handleBlur,
    // setShowLoader,
  } = OwnerAddAddressCustomHook(navigation);

  const {colorScheme} = useCart();
  // const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (postalCode !== '') {
      // setShowLoader(true);
      FetchAddress();
      // setIsLoading(true);
    } else {
      // setIsLoading(false);
    }
  }, [FetchAddress, postalCode]);

  return (
    <ScrollView
      style={{
        backgroundColor: colorScheme === 'dark' ? Colors.black : Colors.main,
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
              colorScheme === 'dark' ? Colors.Inputtext : Styles.blackText
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
              colorScheme === 'dark' ? Colors.Inputtext : Styles.blackText
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
              colorScheme === 'dark' ? Colors.Inputtext : Styles.blackText
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
          {/* {formik.touched.postalCode && formik.errors.postalCode && (
                <Text style={style.errorText}>{formik.errors.postalCode}</Text>
              )} */}
          {/* </View> */}
          {/* <View style={{width: 250}}> */}
          <TextInput
            placeholder="City"
            placeholderTextColor={
              colorScheme === 'dark' ? Colors.Inputtext : Styles.blackText
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
            colorScheme === 'dark' ? Colors.Inputtext : Styles.blackText
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
            colorScheme === 'dark' ? Colors.Inputtext : Styles.blackText
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
            value="Home"
            status={selectedOption === 'Home' ? 'checked' : 'unchecked'}
            onPress={() => handleOptionChange('Home')}
            color={colorScheme === 'dark' ? Colors.white : Colors.black}
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
            value="Office"
            status={selectedOption === 'Office' ? 'checked' : 'unchecked'}
            onPress={() => handleOptionChange('Office')}
            color={colorScheme === 'dark' ? Colors.white : Colors.black}
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
          checkedColor={colorScheme === 'dark' ? Colors.white : Colors.black}
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

export default Owneraddaddress;
