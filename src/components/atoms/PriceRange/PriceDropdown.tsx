import React, {useState, useRef, useContext} from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon component from the library
import Colors from '../../../constants/colors';
import {ColorSchemeContext} from '../../../../ColorSchemeContext';
import Styles from '../../../constants/themeColors';
import styles from './priceRangestyles';
const options = [
  {label: '₹0 - ₹100', min: 0, max: 100},
  {label: '₹100 - ₹1000', min: 100, max: 1000},
  {label: '₹1000 - ₹2000', min: 1000, max: 2000},
  {label: '₹2000 - ₹3000', min: 2000, max: 3000},
];
type PriceRange = {
  label: string;
  min: number;
  max: number;
};

type PriceRangeProps = {
  minPrice: number;
  maxPrice: number;
  onSelectPriceRange: (min: number, max: number) => void;
};

const PriceRangeDropdown = ({
  minPrice,
  maxPrice,
  onSelectPriceRange,
}: PriceRangeProps) => {
  const [open, setOpen] = useState(false);
  const {colorScheme} = useContext(ColorSchemeContext);
  const [selectedOption, setSelectedOption] = useState<PriceRange | null>(null);

  const dropdownHeight = useRef(new Animated.Value(0)).current;
  const handleDropdownToggle = () => {
    setOpen(!open);
    if (!open) {
      openDropdown();
    } else {
      closeDropdown();
    }
  };
  const openDropdown = () => {
    Animated.timing(dropdownHeight, {
      toValue: options.length * 40, // Adjust the height as per your requirement
      duration: 200,
      useNativeDriver: false,
    }).start();
  };
  const closeDropdown = () => {
    Animated.timing(dropdownHeight, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };
  const handleSelectOption = (option: any) => {
    setSelectedOption(option);
    onSelectPriceRange(option.min, option.max);
    setOpen(false); // Adjust the delay as needed to allow time for the selection animation
    closeDropdown();
  };
  return (
    <View
      style={[
        styles.container,
        // colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
      ]}>
      <TouchableOpacity
        style={[
          styles.button,
          colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
        ]}
        onPress={handleDropdownToggle}>
        <Text
          style={[
            styles.buttonText,
            colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
          ]}>
          {selectedOption
            ? selectedOption.label
            : `₹${minPrice} - ₹${maxPrice}`}
        </Text>
        <Icon
          name={open ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={Colors.white}
        />
      </TouchableOpacity>
      <Animated.View style={[styles.dropdown, {height: dropdownHeight}]}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.option}
            onPress={() => handleSelectOption(option)}>
            <Text style={styles.optionText}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </View>
  );
};

export default PriceRangeDropdown;
