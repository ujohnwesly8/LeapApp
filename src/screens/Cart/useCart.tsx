/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback, useContext, useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchCartProducts} from '../../redux/slice/cartSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ADDORDER, removeFromCart} from '../../redux/actions/actions';
import {
  OwnerProductsById,
  ProductsById,
  QuantityApi,
  cartUpdate,
  checkoutApi,
  url,
} from '../../constants/Apis';
import {Alert, useColorScheme} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import RazorpayCheckout from 'react-native-razorpay';
import ApiService from '../../network/network';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
function useCart() {
  // const {product} = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const [rentalStartDate, setRentalStartDate] = useState(new Date());
  const [rentalEndDate, setRentalEndDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  // const [quantity, setQuantity] = useState(1);
  const [isloading, setIsLoading] = useState(false);
  const [isplusDisable, setisButtondisable] = useState(false); // Added loading state
  const navigation = useNavigation();
  // const colorScheme = useColorScheme();
  const {colorScheme} = useContext(ColorSchemeContext);
  const isLoading = useSelector(state => state.CartProducts.isLoader);

  // const CartData = useSelector(state => state.CartProducts.data) || {
  //   cartItems: [],
  // };

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(fetchCartProducts());
    });
    return unsubscribe;
  }, [navigation]);
  const cartData = useSelector(state => state.CartProducts.data);
  useEffect(() => {
    dispatch(fetchCartProducts());
  }, []);

  const [quantity, setQuantity] = useState(1);
  const [Productquantity, setProductQuantity] = useState<number[]>([]);

  // Example usage
  console.log('Quantity:', quantity);

  useEffect(() => {
    if (refreshing) {
      dispatch(fetchCartProducts());
      console.log('it is refreshing');
      setRefreshing(false);
    }
  }, [dispatch, refreshing]);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);
  useEffect(() => {
    if (!showModal) {
      dispatch(fetchCartProducts());
    }
  }, [showModal]);

  const handleUpdate = async (newQuantity, productId) => {
    try {
      const token = await AsyncStorage.getItem('token');

      const data = {
        productId: productId,
        quantity: newQuantity,
      };

      console.log('Important data is :', newQuantity, productId);
      const response = await fetch(QuantityApi, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const Data = await response.json();
      console.log('Update response:', Data);
      setRefreshing(true);
    } catch (error) {
      // console.error('Update error:', error);
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
      // console.error('Error creating Checkout Session:', error);
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
        openModal();
      })
      .catch(error => {
        console.error(error);
        const errorMessage = `Error removing item from cart: ${error.message}`;
        // Handle the error and display a more informative error message to the user
        Alert.alert(errorMessage);
      });
  };

  const totalPrice = 1;

  const handlePayment = () => {
    const options = {
      description: 'Payment for food items',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_live_vjRbx3MWMGxd9i',
      amount: totalPrice * 100,
      name: 'indranil',
      prefill: {
        email: 'example@example.com',
        contact: '1234567890',
        name: 'John Doe',
      },
      theme: {color: '#F37254'},
    };
    RazorpayCheckout.open(options)
      .then(paymentData => {
        // handle success
        console.log(paymentData);
        navigation.navigate('OrderStatusScreen');
        dispatch(ADDORDER(razorpayId));
      })
      .catch(error => {
        // handle failure
        // Alert.alert('Try Again');
      });
  };

  const dispatch = useDispatch();
  const CartProducts = useSelector(state => state.CartProducts.data);
  
  const handleIncrement = useCallback(
    item => {
      const productId = item.product.id;
      console.log('itemID', productId);
      const productQuantity = item.product.availableQuantities;
      console.log('Validation of product Quantity is ', productQuantity);
      if (item.quantity === productQuantity) {
        setisButtondisable(true);
      } else {
        const Quantity = item.quantity + 1;
        console.log(Quantity);
        handleUpdate(Quantity, productId);
      }
      setRefreshing(prevRefreshing => !prevRefreshing);
      console.log('refreshing :', refreshing); // Toggle the value of refreshing
    },
    [handleUpdate],
  );

  const handleDecrement = item => {
    console.log(item.quantity);
    const productId = item.product.id;
    const newQuantity = item.quantity - 1;
    console.log('itemID', productId);
    handleUpdate(newQuantity, productId);
    setisButtondisable(false);
    // setRefreshing(true);
  };

  useEffect(() => {
    console.log('Refreshing:', refreshing);
    // setRefreshing(true);
  }, [refreshing]);

  return {
    CartProducts,
    handleCheckout,
    handleRemove,
    refreshing,
    setRefreshing,
    // onRefresh,
    handlePayment,
    handleUpdate,
    rentalStartDate,
    rentalEndDate,
    setRentalStartDate,
    setRentalEndDate,
    openModal,
    closeModal,
    showModal,
    colorScheme,
    quantity,
    setQuantity,
    handleDecrement,
    handleIncrement,
    isplusDisable,
    isLoading,
    // fetchQuantityData,
  };
}
export default useCart;
