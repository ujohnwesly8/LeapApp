/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
import {useState, useEffect} from 'react';
import ApiService from '../../network/network';
import {url} from './../../constants/Apis';

const useFilteredAnalytics = () => {
  const [chartData, setChartData] = useState<
    {month: string; rentalCost: number}[]
  >([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [data, setData] = useState<{[key: string]: any[]}>({});

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const formattedStartDate = startDate.toISOString();
      const formattedEndDate = endDate.toISOString();

      const response = await ApiService.get(
        `${url}/order/dashboardDateSelector?startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
      );

      console.log('hey', response);
      setData(response);
      setIsLoading(false);

      const chartData = Object.entries(response).map(
        ([month, rentals]: [string, unknown]) => ({
          month,
          rentalCost: (rentals as {rentalCost: number}[]).reduce(
            (total, rental) => total + rental.rentalCost,
            0,
          ),
        }),
      );

      setChartData(chartData);
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log('data is :', data);
  const CryptoJS = require('crypto-js');

  const generateKey = () => {
    const randomBytes = CryptoJS.lib.WordArray.random(16);
    return randomBytes.toString();
  };

  return {
    chartData,
    data,
    isLoading,
    fetchData,
    generateKey,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
  };
};

export default useFilteredAnalytics;
