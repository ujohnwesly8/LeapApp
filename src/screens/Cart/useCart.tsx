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
  const [rentalStartDate, setRentalStartDate] = useState(new Date());
  const [rentalEndDate, setRentalEndDate] = useState(new Date());
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

  // const itemQuantity = cartData;
  // console.log('itemQuantity is :', itemQuantity?.cartItems);

  // if (Array.isArray(itemQuantity?.cartItems)) {
  //   const quantities = itemQuantity.cartItems.map(item => item.quantity);
  //   console.log('Quantities:', quantities);
  // }
  // const [quantity, setQuantity] = useState(1);

  const [quantity, setQuantity] = useState(1);
  const [Productquantity, setProductQuantity] = useState<number[]>([]);

  // useEffect(() => {
  //   // Get the quantity from the cart data
  //   const quantities =
  //     cartData?.cartItems.map(item => parseInt(item.quantity, 10)) || [];
  //   const joinedQuantity = quantities.join(', ');
  //   console.log('Quantity:', quantities[0]);
  //   setQuantity(joinedQuantity[0]);
  // }, [cartData]);

  // console.log('Type of quantity:', typeof quantity);

  // Example usage
  console.log('Quantity:', quantity);

  // const [refreshing, setRefreshing] = useState(false);

  // const Qunatity = cartData;

  // const onRefresh = async () => {
  //   setRefreshing(true);
  //   await dispatch(fetchCartProducts());
  //   setRefreshing(false);
  // };
  // const handleUpdate = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem('token');
  //     const cartItems = cartData?.cartItems;
  //     if (!cartItems || cartItems.length === 0) {
  //       console.log('Cart is empty, cannot update');
  //       return;
  //     }
  //     const items = {
  //       cartItems: cartItems.map(item => ({
  //         productId: item.product.id,
  //         quantity: item.quantity, // Use the new quantity
  //       })),
  //     };
  //     const Newdata = items.cartItems[0];
  //     console.log('items data is', Newdata);
  //     const response = await fetch(QuantityApi, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(Newdata),
  //     });
  //     const data = await response.json();
  //     console.log('Update response:', data);
  //   } catch (error) {
  //     console.error('Update error:', error);
  //   }
  // };
  const handleUpdate = async (newQuantity, productId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      // const cartItems = cartData?.cartItems;
      // if (!cartItems || cartItems.length === 0) {
      //   console.log('Cart is empty, cannot update');
      //   return;
      // }
      // const items = {
      //   cartItems: cartItems.map(item => ({
      //     productId: item.product.id,
      //     quantity: item.quantity === newQuantity ? item.quantity : newQuantity,
      //   })),
      // };
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
  // console.log(JSON.stringify(CartProducts));
  // console.log('cart succes data', CartProducts);
  //Api call for products
  // const selectUserProducts = useSelector(state => state.UserProducts.data);
  // console.log('selectUserProducts', selectUserProducts);
  // const Productid = cartData && cartData.cartItems;
  // console.log('card data is for id:', Productid);

  // const Productid = cartData && cartData.cartItems;
  // console.log('card data is for id:', Productid);

  // if (Productid && Array.isArray(Productid)) {
  //   const productIds = Productid.map(item => item.product.id);
  //   console.log('Product IDs:', productIds);

  //   const fetchQuantityData = async () => {
  //     try {
  //       const result = await ApiService.get(`${ProductsById}/${productIds}`);
  //       console.log('result of products is:', result.quantity);
  //       setQuantity(result.quantity);
  //     } catch (error) {
  //       console.error('Error fetching quantity data:', error);
  //     }
  //   };

  //   fetchQuantityData();
  // }

  // console.log(quantity);
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
  };

  return {
    CartProducts,
    handleCheckout,
    handleRemove,
    handlePayment,
    handleUpdate,
    rentalStartDate,
    rentalEndDate,
    setRentalStartDate,
    setRentalEndDate,
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
