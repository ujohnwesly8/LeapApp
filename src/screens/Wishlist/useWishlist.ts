import {useEffect, useState, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchWishlistProducts} from '../../redux/slice/wishlistSlice';
import {removeFromWishlist} from '../../redux/actions/actions';
import {url} from '../../constants/Apis';
import {Alert} from 'react-native';
const useWishlist = () => {
  const navigation = useNavigation();
  const {colorScheme} = useContext(ColorSchemeContext);
  const [refreshing, setRefreshing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const removefromWishlist = async (productId: any) => {
    const token = await AsyncStorage.getItem('token');
    console.log('chiranjeevi', productId);
    fetch(`${url}/wishlist/remove?productId=${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(_data => {
        dispatch(removeFromWishlist(productId));
        openModal();
      })
      .catch(error => {
        const errorMessage = `Error removing item from Wishlist: ${error.message}`;
        Alert.alert(errorMessage);
      });
  };
  const dispatch = useDispatch();
  const WishlistProducts = useSelector(
    (state: {WishlistProducts: {data: null[]}}) => state.WishlistProducts.data,
  );
  console.log(JSON.stringify(WishlistProducts));
  console.log('wishlist succes');
  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchWishlistProducts() as any);
    setRefreshing(false);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      return dispatch(fetchWishlistProducts() as any);
    });
    return unsubscribe;
  }, [dispatch, navigation]);
  useEffect(() => {
    dispatch(fetchWishlistProducts() as any);
  }, [dispatch]);
  useEffect(() => {
    if (!showModal) {
      dispatch(fetchWishlistProducts() as any);
    }
  }, [dispatch, showModal]);
  return {
    WishlistProducts,
    removefromWishlist,
    refreshing,
    onRefresh,
    closeModal,
    showModal,
    openModal,
    colorScheme,
  };
};
export default useWishlist;
