// import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
// import React, {useState} from 'react';
// import Colors from '../../../constants/Colors';

// const PriceRangeDropdown = ({minPrice, maxPrice, onSelectPriceRange}) => {
//   const [open, setOpen] = React.useState(false);

//   const handleToggle = () => {
//     setOpen(!open);
//   };

//   const handleSelectPriceRange = (min, max) => {
//     onSelectPriceRange(min, max);
//     setOpen(false);
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.button} onPress={handleToggle}>
//         <Text>{`${minPrice} - ${maxPrice}`}</Text>
//       </TouchableOpacity>
//       {open && (
//         <View style={styles.dropdown}>
//           <TouchableOpacity
//             style={styles.option}
//             onPress={() => handleSelectPriceRange(100, 1000)}>
//             <Text>100 - 1000</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.option}
//             onPress={() => handleSelectPriceRange(1000, 2000)}>
//             <Text>1000 - 2000</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// };

// export default PriceRangeDropdown;
// const styles = StyleSheet.create({
//   container: {
//     // position: 'relative',
//     width: '85%',
//     height: '20%',
//     borderRadius: 100,
//     // backgroundColor: Colors.black,
//   },
//   Text: {color: Colors.white},
//   button: {
//     padding: 10,
//     backgroundColor: Colors.buttonColor,
//     borderRadius: 8,
//     // borderWidth: 1,
//     // borderColor: 'gray',
//   },
//   dropdown: {
//     // position: 'absolute',
//     // top: '100%',
//     // left: 0,
//     // right: 0,
//     backgroundColor: 'white',
//     // borderWidth: 1,
//     // borderColor: 'gray',
//     // zIndex: 1,
//   },
//   option: {
//     padding: 10,
//   },
// });
import React, {useState, useRef, useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon component from the library
import Colors from '../../../constants/Colors';
import {ColorSchemeContext} from '../../../../ColorSchemeContext';
import Styles from '../../../constants/themeColors';
const options = [
  {label: '₹0 - ₹100', min: 0, max: 100},
  {label: '₹100 - ₹1000', min: 100, max: 1000},
  {label: '₹1000 - ₹2000', min: 1000, max: 2000},
  {label: '₹2000 - ₹3000', min: 2000, max: 3000},
];
const PriceRangeDropdown = ({minPrice, maxPrice, onSelectPriceRange}) => {
  const [open, setOpen] = useState(false);
  const {colorScheme} = useContext(ColorSchemeContext);
  const [selectedOption, setSelectedOption] = useState(null);
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
  const handleSelectOption = option => {
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
const styles = StyleSheet.create({
  container: {
    width: '95%',
    borderRadius: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: Colors.buttonColor,
    borderRadius: 20,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  dropdown: {
    marginTop: 10,
    backgroundColor: Colors.white,
    borderRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  optionText: {
    color: Colors.black,
  },
});
export default PriceRangeDropdown;
