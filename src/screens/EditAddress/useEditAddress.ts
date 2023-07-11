import React, {useContext, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

import ApiService from '../../network/network';
import colors from '../../constants/colors';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
const useEditAddress = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const address = (route.params as any)?.address;
  const [city, setCity] = useState(address.city);
  const [state, setStateName] = useState(address.state);
  const [addressid] = useState(address.id);
  const [addressLine1, setAddressLine1] = useState(address.addressLine1);
  const [addressLine2, setAddressLine2] = useState(address.addressLine2);
  const [postalCode, setPostalCode] = useState(address.postalCode);
  const [country, _setCountry] = useState(address.country);
  const [selectedOption, setSelectedOption] = useState('Home');
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const {colorScheme} = useContext(ColorSchemeContext);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    navigation.goBack();
  };
  const handleOptionChange = (value: React.SetStateAction<string>) => {
    setSelectedOption(value);
  };
  const handlePostalcode = (value: React.SetStateAction<string>) => {
    setPostalCode(value);
    console.log(value);
  };
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const handleUpdateAddress = async () => {
    try {
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
      const response = await ApiService.put(
        `/address/update/${addressid}`,
        updateaddress,
      );
      console.log(response);
      if (response) {
        setIsLoading(false);
        openModal();
      }
    } catch (error) {
      console.log('Failed to update address');
    } finally {
      setIsLoading(false);
    }
  };
  const PlaceholderColor = () => {
    return colorScheme === 'dark' ? colors.Textinput : colors.black;
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
    PlaceholderColor,
  };
};
export default useEditAddress;
