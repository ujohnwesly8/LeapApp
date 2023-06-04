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
  const [totalQuantity, settotalQuantities] = useState(0);
  const [updatedQuantity, setupdatedquantity] = useState(0);
  const [disabledQuantity, setdisabledQuantity] = useState(0);
  const isFocused = useIsFocused();
  const [refreshData, setRefreshData] = useState(false);

  const handleDisableProduct = (item: number) => {
    setIsModalVisible(true);
    setProductQuantity(item.availableQuantities);
    settotalQuantities(item.totalQuantity);
    setSelectedProductId(item.id);
    setdisabledQuantity(item.disabledQuantities);
    console.log('the disabled quantities is :', item.disabledQuantities);
    console.log('item id is ', item.id);
    console.log('item is  :', item);
    console.log('disabled Quantity : ', disabledQuantity);
  };
  const incrementQuantity = id => {
    let maxQuantity = productQuantity; // Maximum quantity available by default

    if (productQuantity < disabledQuantity && disabledQuantity !== 0) {
      maxQuantity = disabledQuantity; // If no available quantity, set maximum as disabled quantity
    }

    if (updatedQuantity >= maxQuantity) {
      setIsPlusDisabled(true);
    } else {
      setupdatedquantity(updatedQuantity + 1);
    }
  };
  const handleRefresh = () => {
    setRefreshData(false);
  };

  // const incrementQuantity = id => {
  //   setupdatedquantity(updatedQuantity + 1);
  // };

  const decrementQuantity = id => {
    if (updatedQuantity > 1) {
      setupdatedquantity(updatedQuantity - 1);
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
  useEffect(() => {
    if (refreshData) {
      dispatch(fetchProducts());
      setRefreshData(false);
    }
  }, [refreshData, dispatch]);
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

  const handleDisablebutton = async (id, disableQuantity) => {
    console.log('item id', id);
    console.log('product Quantity is', disableQuantity);

    try {
      if (disableQuantity <= productQuantity) {
        const response = await ApiService.get(
          `https://537d-106-51-70-135.ngrok-free.app/api/v1/product/disableProduct?productId=${id}&quantity=${disableQuantity}`,
        );
        console.log('product disable', response);
        setOutofstock(true);
        setRefreshData(true); // Set refreshData to true
      } else {
        console.log('Invalid disable quantity');
        // Handle invalid disable quantity error
      }
    } catch (error) {
      console.log('product enable Error', error);
      // setIsLoading(true);
    }

    setIsModalVisible(false);
  };

  const handleEnablebutton = async (id, enableQuantity, disabledQuantity) => {
    console.log('item id', id);
    try {
      if (enableQuantity <= disabledQuantity) {
        const response = await ApiService.get(
          `https://537d-106-51-70-135.ngrok-free.app/api/v1/product/enableProduct?productId=${id}&quantity=${enableQuantity}`,
        );
        console.log('product Enable', response);
        setOutofstock(true);
        setRefreshData(prevRefreshData => !prevRefreshData);
        fetchData(); // Set refreshData to true
      } else {
        console.log('Invalid enable quantity');
        // Handle invalid enable quantity error
      }
    } catch (error) {
      console.log('product disable Error', error);
      // setIsLoading(true);
    }

    setIsModalVisible(false);
  };

  console.log('refresins is done or not', refreshData);
  return {
    products,
    handleAdditems,
    handleAnalatyics,
    handleMyrentals,
    // handleDisableProduct,
    // setIsModalVisible,
    // handleDisablebutton,
    // setIsMinusDisabled,
    // setIsPlusDisabled,
    // setIsQuantity,
    // incrementQuantity,
    // decrementQuantity,
    // isModalVisible,
    // isMinusDisabled,
    // isPlusDisabled,
    // productQuantity,
    // name,
    // isLoading,
    // totalEarnings,
    // rentedItems,
    // refreshing,
    // onRefresh,
    // recentyAdded,
    // selectedProductId,
    // outofStock,
    // setOutofstock,
    // handleEnablebutton,
    // setSelectedProductId,
    // totalQuantity,
    // updatedQuantity,
    // disabledQuantity,
    // refreshData,
    // setRefreshData,
    // handleRefresh,
  };
}
export default Useownerhome;
