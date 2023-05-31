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

  const handleExportpdf = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${url}/order/exportPdf`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Response:', response);
      console.log('Response status:', response.status);
      console.log(
        'Response content type:',
        response.headers.get('content-type'),
      );
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result.replace(/^data:.+;base64,/, '');
        const filePath = `${RNFetchBlob.fs.dirs.DownloadDir}/file.pdf`;
        await RNFetchBlob.fs.writeFile(filePath, base64String, 'base64');
        console.log('File downloaded successfully:', filePath);
        // Push notification
        const channelId = await notifee.createChannel({
          id: 'pdf_download_channel1',
          name: 'PDF Download Channel1',
          sound: 'default',
          importance: AndroidImportance.HIGH,
          lights: true,
          lightColor: AndroidColor.RED,
        });
        await notifee.displayNotification({
          title: 'Leaps',
          body: 'PDF file downloaded successfully.',
          android: {
            channelId,
            largeIcon: require('../../../assets/Leaps-1.png'),
            lights: [AndroidColor.RED, 300, 600],
            progress: {
              max: 10,
              current: 10,
            },
          },
        });
      };
      reader.onerror = error => {
        console.log('Error reading file:', error);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.log('Error downloading file:', error);
    }
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
    handleExportpdf,
    CategoriePieData,
    CategoriesPiechart,
  };
};

export default useAnalytics;
