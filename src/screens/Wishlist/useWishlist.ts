import {useContext, useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchWishlistProducts} from '../../redux/slice/wishlistSlice';
import {removeFromWishlist} from '../../redux/actions/actions';
import {url} from '../../constants/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert, useColorScheme} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
function useWishlist() {
  const navigation = useNavigation();
  const {colorScheme} = useContext(ColorSchemeContext);
  const [isLoading, setIsLoading] = useState(true);
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
      .then(data => {
        dispatch(removeFromWishlist(productId));
        openModal();
      })
      .catch(error => {
        console.error(error);
        const errorMessage = `Error removing item from Wishlist: ${error.message}`;
        Alert.alert(errorMessage);
      });
  };
  const dispatch = useDispatch();
  const WishlistProducts = useSelector(state => state.WishlistProducts.data);
  console.log(JSON.stringify(WishlistProducts));
  // const length = WishlistProducts.length();
  console.log('wishlist succes');
  const onRefresh = async () => {
    await dispatch(fetchWishlistProducts());
  };
  useEffect(() => {
    dispatch(fetchWishlistProducts());
  }, [dispatch]);
  return {
    WishlistProducts,
    removefromWishlist,
    onRefresh,
    colorScheme,
    isLoading,
  };
}
export default useWishlist;
