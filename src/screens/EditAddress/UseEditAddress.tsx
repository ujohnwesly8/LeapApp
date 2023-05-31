import {View, Text, Alert} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {url} from '../../constants/Apis';
export const useEditaddress = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {address} = route.params;
  const [city, setCity] = useState(address.city);
  const [state, setStateName] = useState(address.state);
  const [addressid] = useState(address.id);
  const [addressLine1, setAddressLine1] = useState(address.addressLine1);
  const [addressLine2, setAddressLine2] = useState(address.addressLine2);
  const [postalCode, setPostalCode] = useState(address.postalCode);
  const [country, setCountry] = useState(address.country);
  const [selectedOption, setSelectedOption] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const handleOptionChange = value => {
    setSelectedOption(value);
  };
  const handlePostalcode = value => {
    setPostalCode(value);
    console.log(value);
  };
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const handleUpdateAddress = async () => {
    try {
      openModal();
      const token = await AsyncStorage.getItem('token');
      const updateaddress = {
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        addressType: selectedOption,
        city: city,
        country: country,
        postalCode: postalCode,
        state: state,
        defaultType: isChecked,
      };
      const response = await fetch(`${url}/address/update/${addressid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateaddress),
      });
      if (response.ok) {
        setIsLoading(false);
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert('Failed to update address');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    handleUpdateAddress,
    handlePostalcode,
    selectedOption,
    setCity,
    isChecked,
    city,
    addressLine1,
    setStateName,
    closeModal,
    openModal,
    setShowModal,
    showModal,
    postalCode,
    setPostalCode,
    addressLine2,
    handleOptionChange,
    handleCheckboxChange,
    state,
    setAddressLine1,
    setAddressLine2,
    isLoading,
  };
};
