import {SetStateAction, useState} from 'react';
import {NavigationProp} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {url} from '../../constants/Apis';
import ApiService from '../../network/network';
import {Alert} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
export const OwnerAddAddressCustomHook = (
  navigation: NavigationProp<ReactNavigation.RootParamList>,
) => {
  const [city, setCity] = useState('');
  const [addressLine1, setaddressLine1] = useState('');
  const [addressLine2, setaddressLine2] = useState('');
  const [addressType, setaddressType] = useState('');
  const [postalCode, setpostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [state, setStateName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const AddressSchema = Yup.object().shape({
    addressLine1: Yup.string().required('Enter Address Line 1'),
    addressLine2: Yup.string().required('Enter Street Name'),
    // postalCode: Yup.string()
    //   .required('Enter valid Pincode')
    //   .matches(/^\d{6}$/, 'Pincode must be 6 digits'),
  });

  const FetchAddress = async () => {
    // setIsLoading(true);
    try {
      const result = await ApiService.get(
        `https://api.postalpincode.in/pincode/${postalCode}`,
      );
      const data = result[0]?.PostOffice || [];
      setIsLoading(false);
      console.log(data[0]);
      setCountry(data[0]?.Country || '');
      setCity(data[0]?.District || '');
      setStateName(data[0]?.State || '');
      console.log(city, country, state);
    } catch (error) {
      console.error(error);
      Alert.alert('Enter valid Pincode');
      // Handle error here (e.g., display an error message)
    } finally {
      setIsLoading(false);
    }
  };

  const [selectedOption, setSelectedOption] = useState('home');
  const handleOptionChange = (value: SetStateAction<string>) => {
    setSelectedOption(value);
    console.log(addressType);
  };

  const handlePostalCodeChange = async text => {
    setpostalCode(text);
    // formik.handleChange('postalCode')(text);
    if (text.length > 6) {
      Alert.alert('Enter a valid pincode');
    } else if (text.length === 6) {
      setIsLoading(true);
      await FetchAddress();
      setIsLoading(false);
    }
  };

  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSaveAddress = async () => {
    setIsLoading(true);
    const addressData = {
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      addressType: selectedOption,
      city: city,
      country: country,
      postalCode: postalCode,
      state: state,
      defaultType: isChecked,
    };
    const token = await AsyncStorage.getItem('token');
    try {
      const res = await fetch(`${url}/address/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(addressData),
      });
      const data = await res.json();
      console.log(data); // log the returned data
      if (!res.ok) {
        throw new Error('Failed to save address');
      }
      navigation.goBack();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const formik = useFormik({
    initialValues: {
      addressLine1: '',
      addressLine2: '',
      // email: '',
      // password: '',
      // phoneNumber: '',
    },
    validationSchema: AddressSchema,
    onSubmit: handleSaveAddress,
  });
  const handleAddressLine1 = value => {
    setaddressLine1(value);
    formik.setFieldValue('addressLine1', value);
  };
  const handleAddressLine2 = value => {
    setaddressLine2(value);
    formik.setFieldValue('addressLine2', value);
  };
  const handleBlur = (field: string) => {
    formik.setFieldTouched(field);
  };
  // const handlePincodechange = value => {
  //   setpostalCode(value);
  // };

  return {
    city,
    postalCode,
    state,
    country,
    addressLine1,
    addressLine2,
    setaddressType,
    setStateName,
    addressType,
    setCity,
    setpostalCode,
    setCountry,
    setaddressLine1,
    setaddressLine2,
    handleSaveAddress,
    handleCheckboxChange,
    handleOptionChange,
    selectedOption,
    isChecked,
    handlePostalCodeChange,
    handleAddressLine1,
    FetchAddress,
    isLoading,
    showLoader,
    setShowLoader,
    setIsLoading,
    handleBlur,
    formik,
    handleAddressLine2,
  };
};
