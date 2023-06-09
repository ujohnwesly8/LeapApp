/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchCartProducts} from '../../redux/slice/cartSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ADDORDER} from '../../redux/actions/actions';
import {url} from '../../constants/Apis';
import {Alert} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  CheckoutScreen: undefined;
  PaymentSuccessScreen: undefined;
  PaymentFailScreen: undefined;
};
const useChectout = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [rentalStartDate, setRentalStartDate] = useState(new Date());
  const [rentalEndDate, setRentalEndDate] = useState(new Date());
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [addressList, setAddress] = useState([]);
  const [_city, setCity] = useState('');
  const [_addressLine1, setaddressLine1] = useState('');
  const [_addressLine2, setaddressLine2] = useState('');
  const [_postalCode, setpostalCode] = useState('');
  const [_country] = useState('india');
  const [_State, setStateName] = useState('');
  const [isChecked, setIschecked] = useState(true);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(-1);
  const [isCheckedArray, setIsCheckedArray] = useState<boolean[]>([]);
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          console.log(token);
          const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          };
          const response = await axios.get(`${url}/address/listAddress`, {
            headers,
          });
          const data = await response.data;
          console.log(response.data);
          setAddress(data);
          setCity(data.city);
          setStateName(data.state);
          setaddressLine1(data.addressLine1);
          setaddressLine2(data.addressLine2);
          setpostalCode(data.postalCode);

          console.log(addressList);
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }, []),
  );
  const cartData = useSelector(
    (state: {CartProducts: {data: any}}) => state.CartProducts.data,
  ) || {
    cartItems: [],
  };
  useEffect(() => {
    dispatch(fetchCartProducts() as any);
  }, [dispatch]);

  const handleCheckboxChange = (index: any) => {
    setSelectedAddressIndex(index);
    const newIsCheckedArray = addressList.map((_, i) => i === index);
    setIsCheckedArray(newIsCheckedArray);
    setIschecked(false);
  };
  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchCartProducts() as any);
    setRefreshing(false);
  };

  const totalPrice = cartData.finalPrice;
  const handlePayment = () => {
    const options = {
      order_id: '',
      description: 'Payment for food items',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_TvqBgZuxwM7H00',
      amount: totalPrice * 100,
      name: 'Leap',
      prefill: {
        email: 'example@example.com',
        contact: '1234567890',
        name: 'John',
      },
      theme: {
        color: '#3E54AC',
        background: '#F6F6F6',
        'card[name]': {
          color: '#3E54AC',
          'font-size': '16px',
          'font-weight': 'bold',
          'font-family': 'Arial, sans-serif',
        },
        'card[number]': {
          color: '#3E54AC',
          'font-size': '16px',
          'font-weight': 'bold',
          'font-family': 'Arial, sans-serif',
        },
        'card[expiry]': {
          color: '#3E54AC',
          'font-size': '16px',
          'font-weight': 'bold',
          'font-family': 'Arial, sans-serif',
        },
        'card[cvc]': {
          color: '#3E54AC',
          'font-size': '16px',
          'font-weight': 'bold',
          'font-family': 'Arial, sans-serif',
        },
      },
    };
    RazorpayCheckout.open(options)
      .then((paymentData: any) => {
        console.log(paymentData);
        navigation.navigate('PaymentSuccessScreen');
        dispatch(ADDORDER(paymentData.razorpay_payment_id) as any);
      })
      .catch(_error => {
        Alert.alert('Try Again');
        navigation.navigate('PaymentFailScreen');
      });
  };

  return {
    refreshing,
    setRefreshing,
    onRefresh,
    handlePayment,

    rentalStartDate,
    rentalEndDate,
    setRentalStartDate,
    setRentalEndDate,
    handleCheckboxChange,
    addressList,
    selectedAddressIndex,
    isCheckedArray,
    isChecked,
    setIsCheckedArray,
  };
};
export default useChectout;
