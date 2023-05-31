/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import Colors from '../../constants/Colors';
import moment from 'moment';

const CardDatePiker = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  const [selectedStartDate, setSelectedStartDate] = useState(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState(endDate);

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
        width: 170,
        marginLeft: 4,
        // marginTop: 5,
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity
        style={{
          backgroundColor: '#D9D9D9',
          width: 75,
          height: 25,
          borderRadius: 8,
          marginLeft: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => onTogglePicker('START_DATE')}>
        <Text
          style={{
            color: Colors.black,
            fontSize: 10,
          }}>
          {selectedStartDate
            ? moment(selectedStartDate).format('MMM D, YYYY')
            : 'Select Start Date'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: '#D9D9D9',
          width: 75,
          height: 25,

          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => onTogglePicker('END_DATE')}>
        <Text
          style={{
            fontSize: 10,
            color: Colors.black,
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
            selectedDayColor={Colors.buttonColor}
            selectedStartDate={selectedStartDate}
            selectedEndDate={selectedEndDate}
            onDateChange={onDateChange}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '80%',
              marginLeft: 40,
              marginTop: 350,
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

export default CardDatePiker;
