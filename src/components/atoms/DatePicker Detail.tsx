import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '../../constants/Colors';
type Props = {
  fromDate: Date;
  toDate: Date;
  onFromDateChange: (date: Date) => void;
  onToDateChange: (date: Date) => void;
};
const DatePickerNew = ({
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
}: Props) => {
  const showFromDatepicker = () => {
    setShowFromPicker(true);
  };
  const showToDatepicker = () => {
    setShowToPicker(true);
  };
  const onChangeFrom = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate || fromDate;
    setShowFromPicker(Platform.OS === 'ios');
    onFromDateChange(currentDate);
  };
  const onChangeTo = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate || toDate;
    setShowToPicker(Platform.OS === 'ios');
    onToDateChange(currentDate);
  };
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showFromDatepicker}>
        <View style={styles.dateBox}>
          <Text style={styles.dateText}>{fromDate.toLocaleDateString()}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={showToDatepicker}>
        <View style={styles.dateBox}>
          <Text style={styles.dateText}>{toDate.toLocaleDateString()}</Text>
        </View>
      </TouchableOpacity>
      {showFromPicker && (
        <View style={[styles.datePicker]}>
          <DateTimePicker
            value={fromDate}
            mode="date"
            display="date"
            onChange={onChangeFrom}
          />
        </View>
      )}
      {showToPicker && (
        <View style={[styles.datePicker]}>
          <DateTimePicker
            value={toDate}
            mode="date"
            display="date"
            onChange={onChangeTo}
          />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-around',
    marginLeft: '15%',
    // backgroundColor: Colors.Inputtext,
    // marginVertical: 15,
  },
  datePicker: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // backgroundColor: 'red',
    borderRadius: 80,
  },
  dateBox: {
    // borderColor: 'green',
    // borderColor: '#3E54AC',
    marginLeft: 20,
    borderWidth: 1,
    width: 100,
    height: 40,
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 80,
  },
  dateText: {
    fontSize: 10,
    marginTop: 7,
    marginLeft: 10,
    fontWeight: 'bold',
    color: Colors.black,
    // backgroundColor: Colors.Inputtext,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default DatePickerNew;
