import {useState, useEffect} from 'react';
import ApiService from '../../network/network';
// import url from './../../constants/Apis';
const useFilteredAnalytics = (startDate, endDate) => {
  const [chartData, setChartData] = useState([]);
  const [data, setData] = useState([]);
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
        `https://96d9-106-51-70-135.ngrok-free.app/api/v1/order/dashboardDateSelector?startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
      );

      // const data = response.data;
      console.log('hey', response);
      setData(response);
      setIsLoading(false);
      const chartData = Object.entries(response).map(([month, rentals]) => ({
        month,
        rentalCost: rentals.reduce(
          (total, rental) => total + rental.rentalCost,
          0,
        ),
      }));

      setChartData(chartData);
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      // setIsLoading(false);
      setIsLoading(false);
    }
  };
  console.log('data is :', data);

  return {chartData, data, isLoading, fetchData};
};

export default useFilteredAnalytics;
