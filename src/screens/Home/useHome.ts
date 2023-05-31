/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchUserProducts} from '../../redux/slice/userProductSlice';
import {url} from '../../constants/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {removeFromWishlist} from '../../redux/actions/actions';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ApiService from '../../network/network';
function useHome() {
  const [refreshing, setRefreshing] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [Data, setData] = useState([]);
  const [oldData, setOldDate] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const searchProducts = async (query: any) => {
    try {
      const data = await ApiService.get(`${url}/product/search?query=${query}`);
      // const data = await response.json();
      navigation.navigate('SearchResultsScreen', {searchResults: data});
      setData(data);
      setOldDate(data);
      setSearchQuery('');
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    dispatch(fetchUserProducts());
    // setLoading(false);
  }, []);
  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchUserProducts());
    setRefreshing(false);
  };
  const removefromWishlist = async (productId: any) => {
    const token = await AsyncStorage.getItem('token');
    console.log('chiranjeevi', productId);
    fetch(`${url}/wishlist/removebyid?productId=${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        // console.log('Item removed from cart:', data);
        dispatch(removeFromWishlist(productId));
        // Alert.alert('Item Removed from Wishlist');
        openModal();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const dispatch = useDispatch();
  const WishlistProducts = useSelector(state => state.WishlistProducts.data);
  const loading = useSelector(state => state.UserProducts.isLoader);
  console.log(JSON.stringify(WishlistProducts));
  return {
    WishlistProducts,
    onRefresh,
    refreshing,
    removefromWishlist,
    searchQuery,
    searchResults,
    setSearchResults,
    searchProducts,
    setSearchQuery,
    loading,
    openModal,
    closeModal,
    showModal,
  };
}
export default useHome;
