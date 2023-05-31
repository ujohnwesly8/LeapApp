import {useState} from 'react';
import {
  AnalyticsUrl,
  categoriyPiechart,
  exportPdf,
  getdashboard,
  pieChartUrl,
  url,
} from '../../constants/Apis';
import ApiService from '../../network/network';
import notifee, {AndroidColor, AndroidImportance} from '@notifee/react-native';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';
const useAnalytics = () => {
  const [Data, setData] = useState('');
  const [orderData, setOrderdata] = useState([]);
  const [piechart, setPiechart] = useState([]);
  const [CategoriesPiechart, setCategoriesData] = useState([]);
  const [loading, setisLoading] = useState(false);
  const handleAnalytics = async () => {
    setisLoading(true);
    try {
      const result = await ApiService.get(AnalyticsUrl);
      console.log('result', result);
      setData(result);
      setisLoading(false);
    } catch (error) {
      console.log(error);
      setisLoading(true);
    }
  };
  const handleOrders = async () => {
    const results = await ApiService.get(getdashboard);
    console.log('dashboardorders', results);
    setOrderdata(results);
  };
  const HandlePiechart = async () => {
    const resultData = await ApiService.get(pieChartUrl);
    console.log('pie Chart is ', resultData);
    setPiechart(resultData);
  };

  console.log('data of sunday', piechart);
  const CategoriePieData = async () => {
    try {
      const results = await ApiService.get(categoriyPiechart);
      console.log('Categories Pie Chart ', results);
      setCategoriesData(results);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleAnalytics,
    Data,
    handleOrders,
    orderData,
    loading,
    HandlePiechart,
    piechart,
    CategoriePieData,
    CategoriesPiechart,
  };
};

export default useAnalytics;
