import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Ownerstyles from '../../screens/OwnerHomepage/OwnerHomestyle';
import Colors from '../../constants/Colors';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import axios from 'axios';
import {object} from 'yup';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
import Styles from '../../constants/themeColors';
// import AntDesign from '@expo/vector-icons/AntDesign';
const data = [
  {label: 'XS', value: '1'},
  {label: 'S', value: '2'},
  {label: 'L', value: '3'},
  {label: 'XL', value: '4'},
  {label: 'XXL', value: '5'},
];
const Sizeselection = ({onChange}) => {
  //   const [CategoriesData, setCategoriesData] = useState([]);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const {colorScheme} = useContext(ColorSchemeContext);

  return (
    <View style={Ownerstyles.scrollView}>
      <View
        style={[
          styles.dropdownContainer,
          colorScheme === 'dark' ? Styles.cardColor : Styles.main,
        ]}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={[
            styles.selectedTextStyle,
            colorScheme === 'dark' ? Styles.InputText : Styles.blackText,
          ]}
          inputSearchStyle={styles.inputSearchStyle}
          itemTextStyle={styles.itemTextStyle}
          selectedItemTextStyle={styles.selectedItemTextStyle}
          itemContainerStyle={styles.itemContainerStyle}
          selectedItemContainerStyle={styles.selectedItemContainerStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select size' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            onChange(item.label);
            setIsFocus(false);
          }}
        />
      </View>
    </View>
  );
};
export default Sizeselection;
const styles = StyleSheet.create({
  dropdownContainer: {
    height: 56,
    width: '493%',
    backgroundColor: '#FFFFFF',
    marginTop: 3,
    elevation: 4,
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdown: {
    height: '50%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  placeholderStyle: {
    fontSize: 16,
    // fontWeight: '400',
    fontFamily: 'Poppins-SemiBold',
    color: 'gray',
    marginLeft: 15,
  },
  selectedTextStyle: {
    fontSize: 18,
    // fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    color: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  iconStyle: {
    width: 25,
    height: 25,
    marginRight: 15,
    // color: '#FFFFFF',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 18,
    // backgroundColor: Colors.white,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'black',
  },
  itemTextStyle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    padding: 10,
  },
  selectedItemTextStyle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  itemContainerStyle: {
    backgroundColor: Colors.white,
    borderRadius: 10, // Add this line
  },
  selectedItemContainerStyle: {
    backgroundColor: '#3E54AC',
    borderRadius: 10,
  },
});
