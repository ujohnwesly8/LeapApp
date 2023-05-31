/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import Colors from '../../constants/Colors';
import moment from 'moment';
import useCart from '../../screens/Cart/useCart';
import Styles from '../../constants/themeColors';

const DateRangePicker = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
  const currentDay = String(currentDate.getDate()).padStart(2, '0');
  const initialDate = `${currentYear}-${currentMonth}-${currentDay}`;
  const [selectedStartDate, setSelectedStartDate] = useState(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState(endDate);
  const {colorScheme} = useCart();
  const [showPicker, setShowPicker] = useState(false);
  const [pickerType, setPickerType] = useState('');

  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
      onEndDateChange(date);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
      onStartDateChange(date);
    }
  };

  const onClearDates = () => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
  };

  const onTogglePicker = type => {
    setPickerType(type);
    setShowPicker(true);
  };

  const renderRentalDates = () => {
    if (selectedStartDate && selectedEndDate) {
      const startDateString = selectedStartDate.toString();
      const endDateString = selectedEndDate.toString();
      return (
        <Text>
          Rental Dates: {startDateString} - {endDateString}
        </Text>
      );
    } else {
      return null;
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        width: 270,
        marginLeft: 40,
        // marginTop: 12,
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity
        style={{
          backgroundColor: Colors.buttonColor,
          width: 120,
          height: 40,
          borderRadius: 60,
          // marginBottom: 10,
          // paddingHorizontal: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => onTogglePicker('START_DATE')}>
        <Text
          style={{
            color: Colors.white,
          }}>
          {selectedStartDate
            ? moment(selectedStartDate).format('MMM D, YYYY')
            : 'Select Start Date'}
        </Text>
      </TouchableOpacity>
      <Text
        style={[
          {
            fontFamily: 'Poppins-Regular',
            fontSize: 16,
            color: Colors.black,
            marginTop: 10,
          },
          colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
        ]}>
        To
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: Colors.buttonColor,
          width: 120,
          height: 40,
          borderRadius: 60,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => onTogglePicker('END_DATE')}>
        <Text
          style={{
            color: Colors.white,
          }}>
          {selectedEndDate
            ? moment(selectedEndDate).format('MMM D, YYYY')
            : 'Select End Date'}
        </Text>
      </TouchableOpacity>

      <Modal visible={showPicker} animationType="slide">
        <View style={{flex: 1}}>
          <CalendarPicker
            startFromMonday={true}
            allowRangeSelection={true}
            selectedStartDate={selectedStartDate}
            selectedEndDate={selectedEndDate}
            onDateChange={onDateChange}
            selectedDayColor={Colors.buttonColor}
            minDate={initialDate}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '90%',
              marginLeft: 20,
              marginTop: 200,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.buttonColor,
                width: 140,
                height: 40,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={onClearDates}>
              <Text
                style={{
                  color: Colors.white,
                  fontFamily: 'Poppins-Medium',
                }}>
                Clear Dates
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.buttonColor,
                width: 140,
                height: 40,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => setShowPicker(false)}>
              <Text
                style={{
                  color: Colors.white,
                  fontFamily: 'Poppins-Medium',
                }}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* {renderRentalDates()} */}
    </View>
  );
};

export default DateRangePicker;
