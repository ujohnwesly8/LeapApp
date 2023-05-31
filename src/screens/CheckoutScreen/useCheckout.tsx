// import {useEffect, useState} from 'react';
// import {useSelector, useDispatch} from 'react-redux';
// import {fetchCartProducts} from '../../redux/slice/cartSlice';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {ADDORDER, removeFromCart} from '../../redux/actions/actions';
// import {cartUpdate, checkoutApi, url} from '../../constants/Apis';
// import {Alert} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import RazorpayCheckout from 'react-native-razorpay';
// import axios from 'axios';
// function useCart() {
//   // const {product} = route.params;
//   const [refreshing, setRefreshing] = useState(false);
//   const [rentalStartDate, setRentalStartDate] = useState(new Date());
//   const [rentalEndDate, setRentalEndDate] = useState(new Date());
//   const navigation = useNavigation();
//   const [addressList, setAddress] = useState([]);
//   const [city, setCity] = useState('');
//   const [addressLine1, setaddressLine1] = useState('');
//   const [addressLine2, setaddressLine2] = useState('');
//   const [postalCode, setpostalCode] = useState('');
//   const [country] = useState('india');
//   const [state, setStateName] = useState('');
//   const [isFocused, setIsFocused] = useState(false);
//   const [isChecked] = useState(false);
//   const [selectedAddressIndex, setSelectedAddressIndex] = useState(-1);
//   const [setIsCheckedArray] = useState([]);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = await AsyncStorage.getItem('token');
//         console.log(token);
//         const headers = {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         };
//         const response = await axios.get(`${url}/address/listaddress`, {
//           headers,
//         });
//         const data = await response.data;
//         console.log(response.data);
//         setAddress(data);
//         setCity(data.city);
//         setStateName(data.state);
//         setaddressLine1(data.addressLine1);
//         setaddressLine2(data.addressLine2);
//         setpostalCode(data.postalCode);
//         console.log(
//           city,
//           state,
//           country,
//           postalCode,
//           // isCheckedArray,
//           isChecked,
//           addressLine1,
//           addressLine2,
//           // selectedAddress,
//           // setSelectedAddress,
//         );
//         console.log(address);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     setIsFocused(true);
//     fetchData();
//     return () => {
//       setIsFocused(false);
//     };
//   }, [
//     addressLine1,
//     addressLine2,
//     city,
//     country,
//     isChecked,
//     postalCode,
//     setIsFocused,
//     state,
//   ]);
//   const cartData = useSelector(state => state.CartProducts.data);
//   useEffect(() => {
//     dispatch(fetchCartProducts());
//   }, []);
//   // const handleCheckboxChange = (index: number) => {
//   //   const newIsCheckedArray = isCheckedArray.map((isChecked, i) => i === index);
//   //   setIsCheckedArray(newIsCheckedArray);
//   // };
//   function handleCheckboxChange(index) {
//     setSelectedAddressIndex(index);
//     const newIsCheckedArray = addressList.map((_, i) => i === index);
//     setIsCheckedArray(newIsCheckedArray);
//   }
//   const onRefresh = async () => {
//     setRefreshing(true);
//     await dispatch(fetchCartProducts());
//     setRefreshing(false);
//   };
//   const handleUpdate = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       const cartItems = cartData?.cartItems;
//       if (!cartItems || cartItems.length === 0) {
//         console.log('Cart is empty, cannot update');
//         return;
//       }
//       const items = {
//         cartItems: cartItems.map(item => ({
//           id: 0,
//           productId: item.product.id,
//           quantity: item.product.quantity,
//           rentalEndDate: rentalEndDate.toISOString(),
//           rentalStartDate: rentalStartDate.toISOString(),
//         })),
//       };
//       const response = await fetch(cartUpdate, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(items),
//       });
//       const data = await response.json();
//       console.log('Update response:', data); // log the API response for debugging
//     } catch (error) {
//       console.error('Update error:', error);
//     }
//   };
//   const handleCheckout = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       // Map the cart items to the required format
//       const items = cartData?.cartItems?.map(item => ({
//         price: item.product.price,
//         productId: item.product.id,
//         productName: item.product.name,
//         quantity: item.product.quantity,
//       }));
//       // Make the API call to create the checkout session
//       const response = await fetch(checkoutApi, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(items),
//       });
//       // Handle the response
//       const data = await response.json();
//       navigation.navigate('CheckoutScreen');
//       console.log('Checkout Session created:', data);
//     } catch (error) {
//       console.error('Error creating Checkout Session:', error);
//     }
//   };
//   const handleRemove = async (productId: any) => {
//     const token = await AsyncStorage.getItem('token');
//     console.log('chiranjeevi', productId);
//     fetch(`${url}/cart/delete/${productId}`, {
//       method: 'DELETE',
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       // .then(response => response.json())
//       .then(data => {
//         // console.log('Item removed from cart:', data);
//         dispatch(removeFromCart(productId));
//         Alert.alert('Item Removed from cart');
//       })
//       .catch(error => {
//         console.error(error);
//         const errorMessage = `Error removing item from cart: ${error.message}`;
//         // Handle the error and display a more informative error message to the user
//         Alert.alert(errorMessage);
//       });
//   };
//   const totalPrice = cartData.totalCost;
//   const handlePayment = () => {
//     const options = {
//       description: 'Payment for food items',
//       image: 'https://i.imgur.com/3g7nmJC.png',
//       currency: 'INR',
//       key: 'rzp_test_TvqBgZuxwM7H00',
//       amount: totalPrice * 100,
//       name: 'Leap',
//       prefill: {
//         email: 'example@example.com',
//         contact: '1234567890',
//         name: 'John',
//       },
//       theme: {
//         color: '#3E54AC',
//         background: '#F6F6F6',
//         'card[name]': {
//           color: '#3E54AC',
//           'font-size': '16px',
//           'font-weight': 'bold',
//           'font-family': 'Arial, sans-serif',
//         },
//         'card[number]': {
//           color: '#3E54AC',
//           'font-size': '16px',
//           'font-weight': 'bold',
//           'font-family': 'Arial, sans-serif',
//         },
//         'card[expiry]': {
//           color: '#3E54AC',
//           'font-size': '16px',
//           'font-weight': 'bold',
//           'font-family': 'Arial, sans-serif',
//         },
//         'card[cvc]': {
//           color: '#3E54AC',
//           'font-size': '16px',
//           'font-weight': 'bold',
//           'font-family': 'Arial, sans-serif',
//         },
//       },
//     };
//     RazorpayCheckout.open(options)
//       .then((paymentData: any) => {
//         // handle success
//         console.log(paymentData);
//         navigation.navigate('PaymentSuccessScreen');
//         dispatch(ADDORDER(paymentData.razorpay_payment_id));
//       })
//       .catch(error => {
//         // handle failure
//         Alert.alert('Try Again');
//         navigation.navigate('PaymentFailScreen');
//       });
//   };
//   const dispatch = useDispatch();
//   const CartProducts = useSelector(state => state.CartProducts.data);
//   console.log(JSON.stringify(CartProducts));
//   console.log('cart succes');
//   return {
//     CartProducts,
//     handleCheckout,
//     handleRemove,
//     refreshing,
//     setRefreshing,
//     onRefresh,
//     handlePayment,
//     handleUpdate,
//     rentalStartDate,
//     rentalEndDate,
//     // selectedAddress,
//     // setSelectedAddress,
//     setRentalStartDate,
//     setRentalEndDate,
//     handleCheckboxChange,
//     // setIsCheckedArray,
//     addressList,
//     selectedAddressIndex,
//     // isCheckedArray,
//     isChecked,
//     setIsCheckedArray,
//   };
// }
// export default useCart;
import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchCartProducts} from '../../redux/slice/cartSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ADDORDER, removeFromCart} from '../../redux/actions/actions';
import {cartUpdate, checkoutApi, url} from '../../constants/Apis';
import {Alert} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios';
import React from 'react';
function useCart() {
  const cartData = useSelector(state => state.CartProducts.data);
  // const handleCheckboxChange = (index: number) => {
  //   const newIsCheckedArray = isCheckedArray.map((isChecked, i) => i === index);
  //   setIsCheckedArray(newIsCheckedArray);
  // };

  const handleUpdate = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const cartItems = cartData?.cartItems;
      if (!cartItems || cartItems.length === 0) {
        console.log('Cart is empty, cannot update');
        return;
      }
      const items = {
        cartItems: cartItems.map(item => ({
          id: 0,
          productId: item.product.id,
          quantity: item.product.quantity,
          rentalEndDate: rentalEndDate.toISOString(),
          rentalStartDate: rentalStartDate.toISOString(),
        })),
      };
      const response = await fetch(cartUpdate, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(items),
      });
      const data = await response.json();
      console.log('Update response:', data); // log the API response for debugging
    } catch (error) {
      console.error('Update error:', error);
    }
  };
  const handleCheckout = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      // Map the cart items to the required format
      const items = cartData?.cartItems?.map(item => ({
        price: item.product.price,
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.product.quantity,
      }));
      // Make the API call to create the checkout session
      const response = await fetch(checkoutApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(items),
      });
      // Handle the response
      const data = await response.json();
      navigation.navigate('CheckoutScreen');
      console.log('Checkout Session created:', data);
    } catch (error) {
      console.error('Error creating Checkout Session:', error);
    }
  };
  const handleRemove = async (productId: any) => {
    const token = await AsyncStorage.getItem('token');
    console.log('chiranjeevi', productId);
    fetch(`${url}/cart/delete/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      // .then(response => response.json())
      .then(data => {
        // console.log('Item removed from cart:', data);
        dispatch(removeFromCart(productId));
        Alert.alert('Item Removed from cart');
      })
      .catch(error => {
        console.error(error);
        const errorMessage = `Error removing item from cart: ${error.message}`;
        // Handle the error and display a more informative error message to the user
        Alert.alert(errorMessage);
      });
  };
  const totalPrice = cartData.finalPrice;
  const handlePayment = () => {
    const options = {
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
        // handle success
        console.log(paymentData);
        navigation.navigate('PaymentSuccessScreen');
        dispatch(ADDORDER(paymentData.razorpay_payment_id));
      })
      .catch(error => {
        // handle failure
        Alert.alert('Try Again');
        navigation.navigate('PaymentFailScreen');
      });
  };
  const dispatch = useDispatch();
  const CartProducts = useSelector(state => state.CartProducts.data);
  console.log(JSON.stringify(CartProducts));
  console.log('cart succes');
  return {
    CartProducts,
    handleCheckout,
    handleRemove,
    handlePayment,
    handleUpdate,
    rentalStartDate,
    rentalEndDate,
    // selectedAddress,
    // setSelectedAddress,
    setRentalStartDate,
    setRentalEndDate,
    // setIsCheckedArray,
    addressList,
    selectedAddressIndex,
    setIsCheckedArray,
  };
}
export default useCart;
