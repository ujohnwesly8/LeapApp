import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchProducts} from '../../redux/slice/productSlice';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import Additems from '../Additems/Additems';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Recentlyadded, url} from '../../constants/Apis';
import useAnalytics from '../AnalyticsPage/useAnalytics';
import ApiService from '../../network/network';
import {Alert} from 'react-native';
function Useownerhome() {
  const {handleOrders} = useAnalytics();
  const [name, setName] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [rentedItems, setRentedItems] = useState(0);
  const [recentyAdded, setRecentlyAdded] = useState();
  const [productQuantity, setProductQuantity] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [, setIsQuantity] = useState(true);
  const [isMinusDisabled, setIsMinusDisabled] = useState(true);
  const [isPlusDisabled, setIsPlusDisabled] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [outofStock, setOutofstock] = useState(false);
  const isFocused = useIsFocused();

  const handleDisableProduct = (item: number) => {
    setProductQuantity(item.availableQuantities);
    setIsModalVisible(true);
    setSelectedProductId(item.id);
    console.log('item id is ', item.id);
    console.log('Product Quantity is :', item.availableQuantities);
  };
  const incrementQuantity = id => {
    setProductQuantity(prevQuantity => prevQuantity + 1);
  };
  const decrementQuantity = () => {
    if (productQuantity > 1) {
      setProductQuantity(prevQuantity => prevQuantity - 1);
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  const onRefresh = async () => {
    setRefreshing(true);
    dispatch(fetchProducts());
    setRefreshing(false);
  };
  const {HandlePiechart} = useAnalytics();
  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = await AsyncStorage.getItem('token');
      try {
        const response = await fetch(`${url}/order/dashboard`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const dashboardData = await response.json();
          setTotalEarnings(dashboardData.totalEarnings);
          setRentedItems(dashboardData.totalNumberOfItems);
        } else {
          throw new Error('Failed to fetch Dashboard Data');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, []);
  useEffect(() => {
    const fetchProfileData = async () => {
      const token = await AsyncStorage.getItem('token');
      try {
        const response = await fetch(`${url}/user/getUser`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setIsLoading(false);
        if (response.ok) {
          const profileData = await response.json();
          setName(profileData.firstName);
        } else {
          // throw new Error('Failed to get Owner name on Home page');
        }
      } catch (error) {
        console.error(error);
        setIsLoading(true);
      }
    };
    fetchProfileData();
  }, [refresh]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setRefresh(!refresh);
    });
    return unsubscribe;
  }, [navigation, refresh]);
  const products = useSelector(state => state.products.data);
  // console.log(JSON.stringify(products));
  const handleAdditems = () => {
    navigation.navigate(Additems);
  };
  const handleMyrentals = () => {
    navigation.navigate('MyRentals');
  };
  const handleAnalatyics = () => {
    // handleAnalatyics;
    HandlePiechart();
    navigation.navigate('DashboardDetails');
  };
  // Recently added Api call
  // useEffect(() => {
  //   const FetchRecentlyAdded = async () => {
  //     const result = await ApiService.get(Recentlyadded);
  //     setRecentlyAdded(result);
  //     console.log('result is :', result);
  //   };
  //   FetchRecentlyAdded();
  // }, []);

  const fetchRecentlyAdded = async () => {
    const result = await ApiService.get(Recentlyadded);
    setRecentlyAdded(result);
    console.log('result is:', result);
  };
  useEffect(() => {
    fetchRecentlyAdded();
  }, [isFocused]);

  return {
    products,
    handleAdditems,
    handleAnalatyics,
    handleMyrentals,
    handleDisableProduct,
    setIsModalVisible,
    setIsMinusDisabled,
    setIsPlusDisabled,
    setIsQuantity,
    incrementQuantity,
    decrementQuantity,
    isModalVisible,
    isMinusDisabled,
    isPlusDisabled,
    productQuantity,
    name,
    isLoading,
    totalEarnings,
    rentedItems,
    refreshing,
    onRefresh,
    recentyAdded,
    selectedProductId,
    outofStock,
    setOutofstock,
  };
}
export default Useownerhome;
