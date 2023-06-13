import React, {useState, useRef, useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Animated} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../../constants/colors';
import {ColorSchemeContext} from '../../../../ColorSchemeContext';
import Styles from '../../../constants/themeColors';
const FilterSelectSize = ({sizes, selectedSize, onSelectSize}) => {
  const [open, setOpen] = useState(false);
  const dropdownHeight = useRef(new Animated.Value(0)).current;
  const {colorScheme} = useContext(ColorSchemeContext);
  const handleToggle = () => {
    setOpen(!open);
    if (open) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };
  const openDropdown = () => {
    Animated.timing(dropdownHeight, {
      toValue: sizes.length * 40, // Adjust the height based on the number of sizes
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  const closeDropdown = () => {
    Animated.timing(dropdownHeight, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  const handleSelectSize = size => {
    onSelectSize(size);
    setOpen(false);
    closeDropdown();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
        ]}
        onPress={handleToggle}>
        <View
          style={[
            styles.buttonContainer,
            // colorScheme === 'dark' ? Styles.whiteTheme : Styles.whiteTheme,
          ]}>
          <Text
            style={[
              styles.text,
              colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
            ]}>
            {selectedSize}
          </Text>
          <Ionicons
            name={open ? 'chevron-up-outline' : 'chevron-down-outline'}
            size={20}
            color={Colors.white}
          />
        </View>
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.dropdown,
          {height: dropdownHeight, zIndex: open ? 9999 : -1}, // Set a higher zIndex when open
        ]}>
        {sizes.map(size => (
          <TouchableOpacity
            key={size}
            style={styles.option}
            onPress={() => handleSelectSize(size)}>
            <Text
              style={[
                styles.optionText,
                colorScheme === 'dark' ? Styles.blackText : Styles.blackText,
              ]}>
              {size}
            </Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </View>
  );
};
export default FilterSelectSize;
const styles = StyleSheet.create({
  container: {
    width: '95%',
    zIndex: 1, // Add zIndex to make the dropdown appear above other components
  },
  button: {
    padding: 10,
    backgroundColor: Colors.buttonColor,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: Colors.white,
    fontFamily: 'Poppins-SemiBold',
    marginRight: 260,
    fontSize: 15,
  },
  dropdown: {
    left: 0,
    right: 0,
    backgroundColor: 'white',
    overflow: 'hidden',
    borderRadius: 8,
    elevation: 4,
  },
  option: {
    padding: 8,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: Colors.black,
  },
});
