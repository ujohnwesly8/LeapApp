import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {removeAddress} from '../../redux/actions/actions';
import axios from 'axios';
import {url} from '../../constants/Apis';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiService from '../../network/network';

export const OwnerAddressCustomHook = () => {
  const [addressList, setAddress] = useState([]);
  const [city, setCity] = useState('');
  const [addressLine1, setaddressLine1] = useState('');
  const [addressLine2, setaddressLine2] = useState('');
  // const [addressType, setaddressType] = useState('');
  const [postalCode, setpostalCode] = useState('');
  const [country, setCountry] = useState('india');
  const [state, setStateName] = useState('');
  const [isFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();
  // const {FetchAddress} = OwnerAddressCustomHook();
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    fetchData();
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token);
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      const response = await axios.get(`${url}/address/listaddress`, {
        headers,
      });
      const data = await response.data;
      setIsLoading(false);
      console.log(response.data);
      setIsLoading(false);
      setAddress(data);
      setCity(data.city);
      setId(data.id);
      setStateName(data.state);
      setaddressLine1(data.addressLine1);
      setaddressLine2(data.addressLine2);
      setpostalCode(data.postalCode);
      setIsLoading(false);
      console.log(
        id,
        city,
        state,
        country,
        postalCode,
        addressLine1,
        addressLine2,
      );
    } catch (error) {
      console.log(error);
      setIsLoading(true);
    }
    // eslint-disable-next-line prettier/prettier
  };
  // Pincode Api call

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [fetchData, navigation]);

  const dispatch = useDispatch();
  const handleEditItems = item => {
    navigation.navigate('EditAddress', {address: item});
  };
  const handlePostalCodeChange = text => {
    setpostalCode(text);
    FetchAddress();
  };

  const handleOwnerAddAddress = () => {
    navigation.navigate('Owneraddaddress', addressList);
  };
  const handleDeleteAddress = (id: string) => {
    dispatch(removeAddress(id));
    openModal();
  };
  const goBackButton = () => {
    navigation.goBack();
  };
  return {
    addressList,
    handleOwnerAddAddress,
    handleDeleteAddress,
    isFocused,
    goBackButton,
    city,
    state,
    postalCode,
    addressLine1,
    addressLine2,
    setCity,
    showModal,
    setCountry,
    setaddressLine1,
    setaddressLine2,
    isLoading,
    setStateName,
    setpostalCode,
    openModal,
    closeModal,
    handleEditItems,
    // FetchAddress,
  };
};
