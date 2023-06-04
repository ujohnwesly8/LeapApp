// import React, {useState, useEffect} from 'react';
// import {View, Text, TouchableOpacity} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import style from './FilteredAnalyticsStyles';
// import BackButton from '../../components/atoms/BackButton/BackButton';
// import AnalyticsDatePicker from '../../components/atoms/AnalyticsDatePicker';
// import axios from 'axios';
// import {LineChart} from 'react-native-chart-kit';
// import {Dimensions} from 'react-native';
// import ApiService from '../../network/network';

// const FilteredAnalytics = () => {
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   const [chartData, setChartData] = useState([]);
//   const navigation = useNavigation();

//   useEffect(() => {
//     fetchData();
//   }, [startDate, endDate]);

//   const fetchData = async () => {
//     try {
//       const formattedStartDate = startDate.toISOString();
//       console.log('supriya', formattedStartDate);
//       const formattedEndDate = endDate.toISOString();
//       console.log('supriya 2', formattedEndDate);

//       const response = await ApiService.get(
//         `https://b8cf-106-51-70-135.ngrok-free.app/api/v1/order/dashboardDateSelector?startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
//       );

//       const data = response.data;
//       console.log('hey', response);

//       //chnages
//       const chartData = Object.entries(response).map(([month, rentals]) => ({
//         month,
//         rentalCost: rentals.reduce(
//           (total, rental) => total + rental.rentalCost,
//           0,
//         ),
//       }));

//       setChartData(chartData);
//       console.log('chartdata:', chartData);
//     } catch (error) {
//       console.log('Error fetching data:', error);
//     }
//   };

//   return (
//     <View>
//       <View>
//         <View style={{flexDirection: 'row'}}>
//           <BackButton />
//           <View
//             style={{
//               justifyContent: 'center',
//               alignItems: 'center',
//               marginLeft: 25,
//             }}>
//             <Text style={style.titleStyle}>Filtered analytics page</Text>
//           </View>
//         </View>

//         <View style={{marginTop: 10, marginBottom: 20, flexDirection: 'row'}}>
//           <Text style={[style.headingtext, {marginTop: 10, marginLeft: 10}]}>
//             Select date
//           </Text>

//           <AnalyticsDatePicker
//             startDate={startDate}
//             endDate={endDate}
//             onStartDateChange={setStartDate}
//             onEndDateChange={setEndDate}
//           />
//         </View>

//         <View>
//           {chartData.length > 0 ? (
//             <LineChart
//               data={{
//                 labels: chartData.map(dataPoint => dataPoint.month),
//                 datasets: [
//                   {
//                     data: chartData.map(dataPoint => dataPoint.rentalCost),
//                   },
//                 ],
//               }}
//               width={Dimensions.get('window').width - 20}
//               height={220}
//               chartConfig={{
//                 backgroundColor: '#ffffff',
//                 backgroundGradientFrom: '#ffffff',
//                 backgroundGradientTo: '#ffffff',
//                 decimalPlaces: 0,
//                 color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//                 labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//                 style: {
//                   borderRadius: 16,
//                 },
//               }}
//             />
//           ) : (
//             <Text>No data available</Text>
//           )}
//         </View>
//       </View>
//     </View>
//   );
// };

// export default FilteredAnalytics;

import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import style from './FilteredAnalyticsStyles';
import BackButton from '../../components/atoms/BackButton/BackButton';
import AnalyticsDatePicker from '../../components/atoms/AnalyticsDatePicker';
import {LineChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';
import useFilteredAnalytics from './useFilteredAnalytics';
import Spinner from 'react-native-loading-spinner-overlay';

import Lottie from 'lottie-react-native';

const FilteredAnalytics = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const navigation = useNavigation();

  const {chartData, data, isLoading, fetchData} = useFilteredAnalytics(
    startDate,
    endDate,
  );
  const handleEndDateChange = date => {
    setEndDate(date);
    fetchData(); // Fetch data when end date is changed
  };

  const getAbbreviatedMonth = month => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return months[month - 1];
  };

  const addPrefixToYLabel = value => `₹ ${value}`;

  return (
    <ScrollView>
      <View
      // style={{backgroundColor: '#ECF2FF'}}
      >
        <View>
          <View style={{flexDirection: 'row'}}>
            <BackButton />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 40,
              }}>
              <Text style={style.titleStyle}>Product Analytics</Text>
            </View>
          </View>

          <View style={{marginTop: 10, marginBottom: 20, flexDirection: 'row'}}>
            <Text style={[style.headingtext, {marginTop: 10, marginLeft: 10}]}>
              Select date
            </Text>

            <AnalyticsDatePicker
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={handleEndDateChange}
            />
          </View>

          <View>
            {isLoading ? (
              <Spinner
                visible={isLoading}
                textContent={'Loading...'}
                textStyle={{color: '#FFF'}}
              />
            ) : chartData.length > 0 ? (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '10%',
                    justifyContent: 'space-between',
                   
                    // marginLeft: 100,
                  }}>
                  {/* <View
                    style={{
                      height: 120,
                      transform: [{rotate: '270deg'}],
                     
                    }}>
                    <Text style={style.axisLabel1}>Earnings</Text>
                  </View> */}
                  <View  style={{marginLeft:20}}>
                    <LineChart
                      data={{
                        labels: chartData.map(dataPoint => {
                          const date = new Date(dataPoint.month);
                          return date.toLocaleString('en-US', {month: 'short'});
                        }),

                        datasets: [
                          {
                            data: chartData.map(
                              dataPoint => dataPoint.rentalCost,
                            ),
                          },
                        ],
                      }}
                      width={Dimensions.get('window').width - 20}
                      height={220}
                      chartConfig={{
                        backgroundColor: '#ffffff',
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientTo: '#ffffff',
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) =>
                          `rgba(0, 0, 0, ${opacity})`,
                        style: {
                          borderRadius: 16,
                        },
                      }}
                      formatYLabel={addPrefixToYLabel}
                    />
                  </View>
                </View>

                <View style={{marginLeft: 20, marginBottom: 10, marginTop: 5}}>
                  <Text style={style.axisLabel}>Month</Text>
                </View>
              </>
            ) : (
              <View>
                <View style={{height: 300, width: 400}}>
                  <Lottie
                    source={require('../../../assets/ownerHome.json')}
                    autoPlay
                  />
                </View>
                <View style={style.textContainer1}>
                  <Text style={[style.noAddressText1]}>
                    There is no data available in the
                  </Text>
                  <Text style={[style.noAddressText2]}>
                    selected date range!
                  </Text>
                </View>
              </View>
            )}
          </View>
          {console.log('data is ', data)}

          {Object.keys(data).length > 0 ? (
            Object.entries(data).map(([month, items]) => (
              <View key={month}>
                {items.map((item, index) => (
                  <View key={index}>
                    <View style={style.dashcard}>
                      <View style={style.dashcardContainer}>
                        <Image
                          source={{uri: item.imageUrl}}
                          style={style.dashboardimage}
                        />

                        <View style={{flexDirection: 'column', marginLeft: 5}}>
                          <Text style={style.cardStyle}>
                            Order ID: {item.borrowerId}
                          </Text>

                          <Text style={style.cardStyle}>
                            {item.borrowerName}
                          </Text>
                          <Text style={style.cardStyle}>
                            ₹ {item.rentalCost}
                          </Text>
                          <Text style={style.cardStyle}> {item.name}</Text>

                          <Text style={style.cardStyle}>
                            Quantity: {item.quantity}
                          </Text>

                          <Text style={style.cardStyle}>
                            Phone number: {item.borrowerPhoneNumber}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            ))
          ) : (
            <View>{/* <Text>Loading data...</Text> */}</View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default FilteredAnalytics;
