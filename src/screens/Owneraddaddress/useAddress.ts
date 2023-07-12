import {useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {StackNavigationProp} from '@react-navigation/stack';
import {removeAddress} from '../../redux/actions/actions';
import {url} from '../../constants/Apis';
import ApiService from '../../network/network';

type RootStackParamList = {
  EditAddress: {address: any};
  Owneraddaddress: undefined;
};
const useAddress = () => {
  const [addressList, setAddress] = useState([]);
  const [city, setCity] = useState('');
  const [addressLine1, setaddressLine1] = useState('');
  const [addressLine2, setaddressLine2] = useState('');
  const [postalCode, setpostalCode] = useState('');
  const [country, setCountry] = useState('india');
  const [state, setStateName] = useState('');
  const [isFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    fetchData();
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await ApiService.get(`${url}/address/listAddress`);
      const data = await response;
      setIsLoading(false);
      console.log(response);
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
      setIsLoading(true);
    }
  }, [id, city, state, country, postalCode, addressLine1, addressLine2]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [fetchData, navigation]);

  const dispatch = useDispatch();
  const handleEditItems = (item: any) => {
    navigation.navigate('EditAddress', {address: item});
  };
  const handleOwnerAddAddress = () => {
    navigation.navigate('Owneraddaddress');
  };
  const handleDeleteAddress = (deleteId: number) => {
    dispatch(removeAddress(deleteId) as any);
    openModal();
  };
  const goBackButton = () => {
    navigation.goBack();
  };
  return {
    addressList,
    fetchData,
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
export default useAddress;
