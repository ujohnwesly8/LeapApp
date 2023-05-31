import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import useSearchresults from '../../../screens/SearchResultScreen/useSearchresults';
import Colors from '../../../constants/Colors';
import {ColorSchemeContext} from '../../../../ColorSchemeContext';
import Styles from '../../../constants/themeColors';
const SubCategoryDropdown = ({value, onChange}) => {
  const {subcategoriesData} = useSearchresults();
  const [isFocus, setIsFocus] = useState(false);
  const {colorScheme} = useContext(ColorSchemeContext);
  return (
    <View
      style={[
        styles.container,
        colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
      ]}>
      <Dropdown
        style={[
          styles.dropdown,
          colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
        ]}
        placeholderStyle={styles.placeholder}
        selectedTextStyle={[
          styles.selectedText,
          colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
        ]}
        inputSearchStyle={styles.inputSearch}
        itemTextStyle={styles.itemText}
        selectedItemTextStyle={[
          styles.selectedItemText,
          colorScheme === 'dark' ? Styles.blackText : Styles.blackText,
        ]}
        itemContainerStyle={styles.itemContainer}
        selectedItemContainerStyle={styles.selectedItemContainer}
        iconColor={Colors.white}
        iconStyle={styles.icon}
        data={subcategoriesData}
        search
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select Type' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          onChange(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};
export default SubCategoryDropdown;
const styles = StyleSheet.create({
  container: {
    width: '95%',
    height: 50,
    // marginBottom: 20,
    // marginTop: 10,
    backgroundColor: Colors.buttonColor,
    borderRadius: 30,
  },
  dropdown: {
    borderRadius: 30,
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: Colors.buttonColor,
  },
  placeholder: {
    fontSize: 16,
    color: Colors.white,
    marginLeft: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  selectedText: {
    fontSize: 16,
    color: Colors.white,
    marginLeft: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  icon: {
    width: 20,
    height: 28,
    marginRight: 17,
    // backgroundColor: Colors.white,
  },
  inputSearch: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'Poppins-Regular',
  },
  itemText: {
    fontSize: 16,
    color: '#000000',
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontFamily: 'Poppins-Regular',
  },
  selectedItemText: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'Poppins-Regular',
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginVertical: 2,
  },
  selectedItemContainer: {
    backgroundColor: '#000000',
    borderRadius: 8,
    marginVertical: 2,
  },
});
