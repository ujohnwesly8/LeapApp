import React, {useState} from 'react';
import moment from 'moment';
import {View, Text, TouchableOpacity, Modal} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import Colors from '../../../constants/colors';
import styles from './datepickerStyles';

const DatePickerComponent = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  buttonStyle,
  buttonTextColor,
}) => {
  const [selectedStartDate, setSelectedStartDate] = useState(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState(endDate);
  const [showPicker, setShowPicker] = useState(false);

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

  const onTogglePicker = () => {
    setShowPicker(!showPicker);
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={buttonStyle}
        onPress={() => onTogglePicker('START_DATE')}>
        <Text style={buttonTextColor}>
          {selectedStartDate
            ? moment(selectedStartDate).format('MMM D, YYYY')
            : 'Select Start Date'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[buttonStyle]}
        onPress={() => onTogglePicker('END_DATE')}>
        <Text style={buttonTextColor}>
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
            minDate={startDate}
          />
          <View style={styles.clearButtonview}>
            <TouchableOpacity
              style={styles.calanderButtonStyle}
              onPress={onClearDates}>
              <Text style={styles.buttonText}>Clear Dates</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.calanderButtonStyle}
              onPress={onTogglePicker}>
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DatePickerComponent;
