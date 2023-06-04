/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import {
  VictoryChart,
  VictoryBar,
  VictoryPie,
  VictoryLabel,
  VictoryAxis,
} from 'victory-native';
import {PieChart, LineChart} from 'react-native-chart-kit';
import {Picker} from '@react-native-picker/picker';
import Colors from '../../constants/Colors';
import useAnalytics from '../AnalyticsPage/useAnalytics';
import style from '../OwnerHomepage/OwnerHomestyle';
import BackButton from '../../components/atoms/BackButton/BackButton';
import Lottie from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Icons from 'react-native-vector-icons/MaterialIcons';
import HeadingText from '../../components/atoms/HeadingText/HeadingTest';
import AnalyticsDropdown from '../../components/atoms/AnalyticsDropdown/AnalyticsDropdown';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
import Styles from '../../constants/themeColors';

import {useNavigation} from '@react-navigation/native';
import FilteredAnalytics from '../FilteredAnalytics/FilteredAnalytics';
const monthNames = [
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

const DashboardDetails = () => {
  const navigation = useNavigation();
  const {
    handleAnalytics,
    Data,
    handleOrders,
    orderData,
    loading,
    piechart,
    HandlePiechart,
    handleExportpdf,
    CategoriePieData,
    DashboardYearly,
  } = useAnalytics();
  const {colorScheme} = useContext(ColorSchemeContext);
  const [showModel, setShowModel] = useState(false);
  const [selectedBarIndex, setSelectedBarIndex] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  // const [yearlyData, setYearlyData] = useState({});
  // const handleYearSelect = year => {
  //   setSelectedYear(year);
  //   const yearlyData = DashboardYearly[year] || {};
  //   setYearlyData(yearlyData);
  // };
  // const availableYears = Object.keys(DashboardYearly);

  // Get the available years
  // const availableYears = Object.keys(DashboardYearly);

  const [monthtitle, setmonthtitle] = useState(
    monthNames[new Date().getMonth()],
  );
  const [selectedData, setSelectedData] = useState('quantity'); // Selected data for the bar graph
  const [lineChartData, setLineChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });

  const handleDataSelect = data => {
    setSelectedData(data);
  };
  console.log('orderData:', orderData);
  const handleVisibleModal = () => {
    setShowModel(!showModel);
  };

  const handleTotalOrdersClick = () => {
    setShowModel(true);
  };

  useEffect(() => {
    handleAnalytics();
    HandlePiechart();
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentMonthFormatted = `${currentDate.getFullYear()}-${(
      currentMonth + 1
    )
      .toString()
      .padStart(2, '0')}`;
    setSelectedMonth(currentMonthFormatted);

    const filteredOrderData = {};
    Object.keys(orderData).forEach(month => {
      if (month === currentMonthFormatted) {
        filteredOrderData[month] = orderData[month];
      }
    });
    handleOrders(filteredOrderData);

    const selectedBarIndex = rentalData.findIndex(
      data => data.month === monthNames[currentMonth],
    );
    setSelectedBarIndex(selectedBarIndex);
  }, []);

  const rentalData = monthNames.map(month => ({
    month: month,
    totalEarnings: 0,
    totalNumberOfItems: 0,
  }));

  Object.keys(Data).forEach(key => {
    const monthData = Data[key];
    const month = new Date(key).getMonth();
    rentalData[month] = {
      month: monthNames[month],
      totalEarnings: monthData.totalEarnings,
      totalNumberOfItems: monthData.totalNumberOfItems,
      orders: monthData.orders,
    };
  });

  const handleBarClick = (event, barData) => {
    const selectedMonth = barData.datum.month;
    const selectedMonthIndex = monthNames.indexOf(selectedMonth) + 1;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const formattedMonth = selectedMonthIndex.toString().padStart(2, '0');
    const formattedDate = `${currentYear}-${formattedMonth}`;
    const selectedMonthFormatted = formattedDate;
    setmonthtitle(selectedMonth);
    const selectedData = rentalData.find(data => data.month === selectedMonth);
    const selectedBarIndex = rentalData.findIndex(
      data => data.month === selectedMonth,
    );
    setSelectedMonth(selectedMonthFormatted);
    setSelectedBarIndex(selectedBarIndex);
    const {size, rentalPrice} = barData;
    const filteredOrderData = {};
    Object.keys(orderData).forEach(month => {
      if (month === selectedMonthFormatted) {
        filteredOrderData[month] = orderData[month];
      }
    });
    handleOrders(filteredOrderData);
  };
  const currentYear = new Date().getFullYear();
  const availableYears = Array.from(
    {length: 10},
    (_, index) => currentYear + index,
  );

  // const getBarColor = ({datum, index}) => {
  //   return selectedBarIndex === index ? Colors.buttonColor : 'grey';
  // };
  const getBarColor = ({datum, index}) => {
    const selectedValue =
      selectedData === 'quantity' ? 'totalNumberOfItems' : 'totalEarnings';
    return selectedBarIndex === index ? Colors.buttonColor : 'grey';
  };

  // const pieChartData =
  //   piechart && piechart[selectedMonth] ? piechart[selectedMonth] : {};
  const pieChartData =
    piechart && piechart[selectedMonth] ? piechart[selectedMonth] : {};

  // const getRandomColor = () => {
  //   const letters = '0123456789ABCDEF';
  //   let color = '#';
  //   for (let i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // };
  const chartColors = [
    '#594AB5',
    '#E28B5E',
    '#7CB9E8',
    '#B5E8A1',
    '#F1C5D4',
    '#F5D96C',
    '#B6A2D3',
    '#7F8FA6',
    '#E8DAEF',
    '#D2B4DE',
  ];

  // Transform the data for the pie chart
  const transformedData = Object.entries(pieChartData).map(
    ([subcategory, {totalOrders}], index) => ({
      name: subcategory,
      value: totalOrders,
      color: chartColors[index % chartColors.length],
      // Generate a random color for each data point
    }),
  );

  console.log(transformedData);

  // const transformedData = Object.entries(pieChartData).map(
  //   ([subcategory, {totalOrders}]) => ({
  //     x: subcategory,
  //     y: totalOrders,
  //   }),
  // );
  console.log('pieChartData is ', pieChartData);

  return (
    <View style={[{flex: 1, backgroundColor: Colors.white}]}>
      {loading ? (
        <View>
          <Lottie
            source={require('../../../assets/analyticstwo.json')}
            autoPlay
            style={[
              {
                height: 300,
                width: 300,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 20,
                marginTop: 100,
              },
            ]}
          />
        </View>
      ) : (
        <ScrollView style={{backgroundColor: '#ECF2FF', flex: 1}}>
          <>
            {/* <HeadingText message={'Analytics'} /> */}
            <View style={{flexDirection: 'row'}}>
              <BackButton />
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 25,
                  marginTop: 20,
                  marginLeft: 70,
                  alignSelf: 'center',
                }}>
                Analytics
              </Text>
            </View>
            <View
              style={{
                width: '90%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 17,
                  marginTop: 23,
                  marginLeft: 50,
                  // alignSelf: 'center',
                }}>
                {monthtitle}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <AnalyticsDropdown onSelect={handleDataSelect} />
                <Picker
                  selectedValue={selectedYear}
                  onValueChange={itemValue => setSelectedYear(itemValue)}
                  style={{height: 20, width: 100}}>
                  {/* <Picker.Item label="Select Year" value={null} /> */}
                  {availableYears.map(year => (
                    <Picker.Item
                      key={year}
                      label={year.toString()}
                      value={year}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            <View style={{marginLeft: 10}}>
              <VictoryChart width={Dimensions.get('window').width} height={300}>
                <VictoryAxis
                  tickFormat={monthNames}
                  style={{
                    axis: {stroke: 'black'},
                    axisLabel: {fontSize: 14, padding: 30},
                    tickLabels: {fontSize: 12, padding: 5},
                  }}
                  label="Month"
                />
                <VictoryAxis
                  dependentAxis
                  tickFormat={value =>
                    selectedData === 'quantity'
                      ? `${value}`
                      : `${value / 1000}k`
                  }
                  style={{
                    axis: {stroke: 'black'},
                    axisLabel: {fontSize: 14, padding: 30},
                    tickLabels: {fontSize: 12, padding: 5},
                  }}
                  label={
                    selectedData === 'quantity' ? 'Quantity' : 'Rental Amount'
                  }
                />
                <VictoryBar
                  data={rentalData}
                  x="month"
                  y={
                    selectedData === 'quantity'
                      ? 'totalNumberOfItems'
                      : 'totalEarnings'
                  }
                  barWidth={23}
                  style={{
                    data: {
                      fill: getBarColor,
                    },
                  }}
                  labels={({datum}) =>
                    selectedData === 'quantity'
                      ? `${datum.totalNumberOfItems}`
                      : `${Math.round(datum.totalEarnings / 1000)}k`
                  }
                  events={[
                    {
                      target: 'data',
                      eventHandlers: {
                        onPress: handleBarClick,
                      },
                    },
                  ]}
                />
              </VictoryChart>
            </View>
            {selectedBarIndex !== null && (
              <>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('FilteredAnalytics')}>
                    <View
                      style={{
                        width: 131,
                        height: 96,
                        marginLeft: 38,
                        marginTop: 30,
                        borderRadius: 20,
                        backgroundColor: 'white',
                        elevation: 4,
                      }}>
                      <Text
                        style={{
                          color: 'black',
                          fontFamily: 'Poppins-SemiBold',
                          fontSize: 12,
                          justifyContent: 'center',
                          alignSelf: 'center',
                          marginTop: 20,
                        }}>
                        ₹ {rentalData[selectedBarIndex].totalEarnings}
                      </Text>
                      <Text
                        style={{
                          color: 'black',
                          fontFamily: 'Poppins-SemiBold',
                          fontSize: 12,
                          alignSelf: 'center',
                          marginTop: 20,
                        }}>
                        Total Earnings
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleTotalOrdersClick}
                    style={{
                      width: 131,
                      height: 96,
                      marginLeft: 38,
                      marginTop: 30,
                      borderRadius: 20,
                      backgroundColor: 'white',
                      elevation: 4,
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        fontFamily: 'Poppins-SemiBold',
                        fontSize: 12,
                        justifyContent: 'center',
                        alignSelf: 'center',
                        marginTop: 20,
                      }}>
                      {rentalData[selectedBarIndex].totalNumberOfItems}
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        fontFamily: 'Poppins-SemiBold',
                        fontSize: 12,
                        alignSelf: 'center',
                        marginTop: 20,
                      }}>
                      Total Orders
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* <View
                  style={{
                    // flex: 1,
                    height: '100%',
                    width: '100%',
                    // backgroundColor: Colors.black,
                    // justifyContent: 'center',
                    // alignItems: 'center',
                  }}> */}
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      color: Colors.black,
                      fontFamily: 'Poppins-Medium',
                      fontSize: 20,
                      marginBottom: 10,
                      marginTop: 30,
                    }}>
                    Sub-categories
                  </Text>
                  <View
                    style={{
                      elevation: 4,
                      shadowColor: 'white',
                      shadowOffset: {width: 0, height: 2},
                      shadowOpacity: 0.2,
                      shadowRadius: 4,
                    }}>
                    <PieChart
                      data={transformedData}
                      width={Dimensions.get('window').width}
                      height={210}
                      chartConfig={{
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        // Decrease the font size here
                      }}
                      accessor="value"
                      backgroundColor="transparent"
                      absolute
                    />
                  </View>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Medium',
                      color: 'black',
                      fontSize: 20,
                      marginTop: 20,
                    }}>
                    {' '}
                    Rental Earnings{' '}
                  </Text>
                  <LineChart
                    data={{
                      labels: rentalData.map(data => data.month),
                      datasets: [
                        {
                          data: rentalData.map(data => data.totalEarnings),
                        },
                      ],
                    }}
                    width={Dimensions.get('window').width}
                    height={220}
                    style={{
                      marginLeft: -10,
                      marginTop: 20,
                    }}
                    withHorizontalLabels={true}
                    chartConfig={{
                      backgroundGradientFrom: 'rgba(255, 255, 255, 0)', // Transparent background start color
                      backgroundGradientTo: 'rgba(255, 255, 255, 0)', // Transparent background end color
                      decimalPlaces: 0,
                      color: (opacity = 1) => `rgba(89, 74, 181, ${opacity})`,
                    }}
                    fromZero
                    yAxisInterval={10}
                  />
                </View>
                <View>
                  <TouchableOpacity
                    style={style.exportContainer}
                    onPress={handleExportpdf}>
                    <Text style={style.exportText}>Export</Text>
                    <Icon
                      name="export"
                      size={15}
                      color={Colors.white}
                      style={{marginLeft: 10}}
                    />
                  </TouchableOpacity>
                </View>
                {/* </View> */}
                <View
                  style={{
                    marginTop: 20,
                    height: '100%',
                    width: '100%',
                  }}>
                  {orderData &&
                  Object.keys(orderData).length > 0 &&
                  orderData[selectedMonth] ? (
                    <Modal visible={showModel}>
                      <TouchableOpacity onPress={handleVisibleModal}>
                        <Text style={style.txtClose}>Close</Text>
                      </TouchableOpacity>
                      <ScrollView
                        style={{
                          backgroundColor: Colors.white,
                          width: '100%',
                          height: '100%',
                        }}>
                        {orderData[selectedMonth].map((order, index) => (
                          <View
                            key={`${order.id}-${index}`}
                            style={style.dashcard}>
                            <View style={style.dashcardContainer}>
                              <Image
                                source={{uri: order.imageUrl}}
                                style={style.dashboardimage}
                              />
                              <View
                                key={order.id}
                                style={{
                                  marginTop: 0,
                                  width: 200,
                                  height: 40,
                                  // backgroundColor: Colors.white,
                                }}>
                                <Text style={style.Order}>
                                  Order ID: {order.borrowerId}
                                </Text>
                                {/* <Text>Rented by</Text> */}
                                <Text style={style.borrowerName}>
                                  {order.borrowerName}
                                </Text>
                                {/* <Text style={style.Product}></Text> */}
                                <Text style={style.price}>
                                  ₹ {order.rentalCost}
                                </Text>
                                <Text style={style.order}> {order.name}</Text>
                                <Text style={style.order}>
                                  {' '}
                                  {order.borrowerPhoneNumber}
                                </Text>
                              </View>
                            </View>
                          </View>
                        ))}
                      </ScrollView>
                    </Modal>
                  ) : (
                    <Text style={{color: 'black'}}>
                      No orders found for the selected month
                    </Text>
                  )}
                </View>
              </>
            )}
          </>
        </ScrollView>
      )}
    </View>
  );
};

export default DashboardDetails;
