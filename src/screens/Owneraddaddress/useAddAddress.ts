import {useState, SetStateAction} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Alert} from 'react-native';

import {url} from '../../constants/Apis';
import ApiService from '../../network/network';
import {RootStackParamList} from '../Subcategory/Subcategory';
import {StackNavigationProp} from '@react-navigation/stack';

const useAddAddress = () => {
  const [city, setCity] = useState('');
  const [addressLine1, setaddressLine1] = useState('');
  const [addressLine2, setaddressLine2] = useState('');
  const [addressType, setaddressType] = useState('');
  const [postalCode, setpostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [state, setStateName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const AddressSchema = Yup.object().shape({
    addressLine1: Yup.string().required('Enter Address Line 1'),
    addressLine2: Yup.string().required('Enter Street Name'),
  });

  const FetchAddress = async () => {
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
    } finally {
      setIsLoading(false);
    }
  };

  const [selectedOption, setSelectedOption] = useState('HOME');
  const handleOptionChange = (value: SetStateAction<string>) => {
    setSelectedOption(value);
    console.log('addressType is ', selectedOption);
  };

  const handlePostalCodeChange = async (text: string) => {
    setpostalCode(text);
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
    console.log('selectedOption is', addressData);
    try {
      setIsLoading(true);
      const res = await ApiService.post(`${url}/address/add`, addressData);
      console.log(res); // log the returned data
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
    },
    validationSchema: AddressSchema,
    onSubmit: handleSaveAddress,
  });
  const handleAddressLine1 = (value: string) => {
    setaddressLine1(value);
    formik.setFieldValue('addressLine1', value);
  };
  const handleAddressLine2 = (value: string) => {
    setaddressLine2(value);
    formik.setFieldValue('addressLine2', value);
  };
  const handleBlur = (field: string) => {
    formik.setFieldTouched(field);
  };

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
export default useAddAddress;
