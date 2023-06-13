/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback, useEffect, useRef, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProductsById, url} from '../../constants/Apis';
import ApiService from '../../network/network';
import {useDispatch} from 'react-redux';
import {fetchCartProducts} from '../../redux/slice/cartSlice';
import {ScrollView} from 'react-native';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';

const useProductdetails = (product: {id: any; imageUrl: string | any[]}) => {
  const [rentalStartDate, setRentalStartDate] = useState(new Date());
  const [rentalEndDate, setRentalEndDate] = useState(new Date());
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showwModal, settShowModal] = useState(false);
  const [isMinusDisabled, setIsMinusDisabled] = useState(true);
  const [isPlusDisabled, setIsPlusDisabled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollTimerRef = useRef<number | null>(null);

  const handleDecrement = () => {
    setQuantity(quantity - 1);
    setIsMinusDisabled(true);
    setIsPlusDisabled(false);
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    setIsMinusDisabled(false);
    setIsPlusDisabled(true);
  };

  const handleSubmit = async () => {
    const item = {
      productId: product.id,
      quantity: quantity,
      rentalEndDate: rentalEndDate.toISOString(),
      rentalStartDate: rentalStartDate.toISOString(),
    };
    const token = await AsyncStorage.getItem('token');
    fetch(`${url}/cart/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(item),
    })
      .then(response => {
        console.log('Success:', response);
        if (response.status === 400) {
          opennModal();
        }
        console.log(response);
        return response.json();
      })
      .then(data => {
        console.log('Data:', data);
        openModal();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const openModal = () => {
    setShowModal(true);
  };

  const opennModal = () => {
    settShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    dispatch(fetchCartProducts());
    productsData();
  };

  const closeeModal = () => {
    settShowModal(false);
  };

  useEffect(() => {
    productsData();
  }, []);

  const productsData = async () => {
    const result = await ApiService.get(`${ProductsById}/${product.id}`);
    console.log('result is :', result);
    // setProductData(result);
  };
  const scrollToNextImage = useCallback(() => {
    if (scrollViewRef.current) {
      const nextIndex =
        activeIndex === product.imageUrl.length - 1 ? 0 : activeIndex + 1;
      scrollViewRef.current.scrollTo({x: nextIndex * 405, animated: true});
      setActiveIndex(nextIndex);
    }
  }, [activeIndex, product.imageUrl]);

  const startScrollTimer = useCallback(() => {
    stopScrollTimer();
    scrollTimerRef.current = setInterval(scrollToNextImage, 2000);
  }, [scrollToNextImage]);

  useEffect(() => {
    startScrollTimer();
    return () => {
      stopScrollTimer();
    };
  }, [activeIndex, startScrollTimer]);

  const stopScrollTimer = () => {
    if (scrollTimerRef.current) {
      clearInterval(scrollTimerRef.current);
      scrollTimerRef.current = null;
    }
  };

  const handleScroll = () => {
    startScrollTimer();
  };

  return {
    rentalStartDate,
    setRentalStartDate,
    rentalEndDate,
    setRentalEndDate,
    quantity,
    setQuantity,
    showModal,
    setShowModal,
    showwModal,
    settShowModal,
    isMinusDisabled,
    setIsMinusDisabled,
    isPlusDisabled,
    setIsPlusDisabled,
    handleDecrement,
    handleIncrement,
    handleSubmit,
    closeModal,
    closeeModal,
    scrollTimerRef,
    scrollToNextImage,
    scrollViewRef,
    setActiveIndex,
    activeIndex,
    startScrollTimer,
    stopScrollTimer,
    handleScroll,
  };
};

export default useProductdetails;
