import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './analyticStyles';
import useAnalytics from './useAnalytics';
import {LineChart} from 'react-native-chart-kit';

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

const AnalyticScreen = () => {
  const {handleData, Data} = useAnalytics();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (Data) {
      const chartData = monthNames.map(month => {
        const monthData = Data[month];
        return monthData ? monthData.totalEarnings : 0;
      });
      setChartData(chartData);
    }
  }, [Data]);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.TextContainer}>AnalyticScreen</Text>
      <TouchableOpacity onPress={handleData}>
        <Text style={styles.TextContainer}>GetData</Text>
      </TouchableOpacity>
      {chartData.length > 0 && (
        <LineChart
          data={{
            labels: monthNames,
            datasets: [
              {
                data: chartData,
              },
            ],
          }}
          width={400}
          height={300}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      )}
    </View>
  );
};

export default AnalyticScreen;
