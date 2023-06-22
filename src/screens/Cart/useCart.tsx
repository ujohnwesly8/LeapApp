/* eslint-disable quotes */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartProducts } from "../../redux/slice/cartSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { removeFromCart } from "../../redux/actions/actions";
import { QuantityApi, checkoutApi, url } from "../../constants/Apis";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ApiService from "../../network/network";
import { ColorSchemeContext } from "../../../ColorSchemeContext";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  CheckoutScreen: undefined;
  UserHomescreen: { screen: any };
  ProfileScreen: { screen: any };
};
const useCart = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [rentalStartDate, setRentalStartDate] = useState(new Date());
  const [rentalEndDate, setRentalEndDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [isplusDisable, setisButtondisable] = useState(false); // Added loading state
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { colorScheme } = useContext(ColorSchemeContext);
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(fetchCartProducts as any);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const isLoading = useSelector(
    (state: { CartProducts: { isLoader: boolean } }) =>
      state.CartProducts.isLoader
  );
  const cartData = useSelector(
    (state: { CartProducts: { data: any } }) => state.CartProducts.data
  ) || {
    cartItems: [],
  };
  const CartProducts = useSelector(
    (state: { CartProducts: { data: any } }) => state.CartProducts.data
  ) || {
    cartItems: [],
  };
  useEffect(() => {
    if (refreshing) {
      console.log("what the heck bro ");
      dispatch(fetchCartProducts() as any);
      setRefreshing(false);
    }
  }, [refreshing]);
  useEffect(() => {
    if (!showModal) {
      dispatch(fetchCartProducts() as any);
    }
  }, [showModal]);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(fetchCartProducts() as any);
    });
    return unsubscribe;
  }, [navigation, refreshing]);

  const handleUpdate = async (newQuantity: number, productId: string) => {
    try {
      const data = {
        productId: productId,
        quantity: newQuantity,
      };
      console.log("Important data is:", newQuantity, productId);
      const response = await ApiService.put(QuantityApi, data);
      console.log("Update response:", response);
      setRefreshing(true);
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const handleCheckout = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const items = cartData?.cartItems?.map(
        (item: {
          product: { price: any; id: any; name: any; quantity: any };
        }) => ({
          price: item.product.price,
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.product.quantity,
        })
      );
      const response = await fetch(checkoutApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(items),
      });
      const data = await response.json();
      navigation.navigate("CheckoutScreen");
      console.log("Checkout Session created:", data);
    } catch (error) {}
  };
  const handleRemove = async (productId: any) => {
    const token = await AsyncStorage.getItem("token");
    console.log("chiranjeevi", productId);
    fetch(`${url}/cart/delete/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((_data) => {
        dispatch(removeFromCart(productId));
        dispatch(fetchCartProducts as any);
        openModal();
      })
      .catch((error) => {
        console.error(error);
        const errorMessage = `Error removing item from cart: ${error.message}`;

        Alert.alert(errorMessage);
      });
  };

  const handleIncrement = (item: any) => {
    const productId = item.product.id;
    console.log("itemID", productId);
    const productQuantity = item.product.availableQuantities;
    console.log("Validation of product Quantity is ", productQuantity);
    if (item.quantity === productQuantity) {
      setisButtondisable(true);
    } else {
      const Quantity = item.quantity + 1;
      console.log(Quantity);
      handleUpdate(Quantity, productId);
    }
    setRefreshing((prevRefreshing) => !prevRefreshing);
    console.log("refreshing :", refreshing); // Toggle the value of refreshing
  };

  const handleDecrement = (item: any) => {
    console.log(item.quantity);
    const productId = item.product.id;
    const newQuantity = item.quantity - 1;
    console.log("itemID", productId);
    handleUpdate(newQuantity, productId);
    setisButtondisable(false);
  };

  return {
    CartProducts,
    handleCheckout,
    handleRemove,
    refreshing,
    setRefreshing,
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
  };
};
export default useCart;
