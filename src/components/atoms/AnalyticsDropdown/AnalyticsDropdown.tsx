/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
// import Colors from '../../../constants/Colors';
import styles from './analyticStyle';
import Icons from 'react-native-vector-icons/MaterialIcons';

const AnalyticsDropdown = ({onSelect}) => {
  const [selectedValue, setSelectedValue] = useState('Quantity');
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = value => {
    setSelectedValue(value);
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.mainContainer}
        onPress={() => setIsOpen(!isOpen)}>
        {/* <Text style={{color: 'black'}}>Select Data:</Text> */}
        <Text style={styles.buttonText}>{selectedValue}</Text>
        <Icons style={{marginLeft: 5}} size={20} name="keyboard-arrow-down" />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdownConatiner}>
          <TouchableOpacity onPress={() => handleSelect('quantity')}>
            <Text
              style={[
                {color: selectedValue === 'quantity' ? 'blue' : 'black'},
                {marginBottom: 10},
              ]}>
              Quantity
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSelect('Earnings')}>
            <Text
              style={{color: selectedValue === 'Earnings' ? 'blue' : 'black'}}>
              Earnings
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default AnalyticsDropdown;
