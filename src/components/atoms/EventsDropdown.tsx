import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Ownerstyles from '../../screens/Additems/Additemsstyle';
import Colors from '../../constants/Colors';
import Useadditems from '../../screens/Additems/Useadditems';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
import Styles from '../../constants/themeColors';

const DropdownComponent = ({value, onChange, genderId}) => {
  // const [categoriesData, setCategoriesData] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const {subEventCategoriesData} = Useadditems();
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
          placeholderStyle={[
            styles.placeholderStyle,
            colorScheme === 'dark' ? Styles.InputText : Styles.blackText,
          ]}
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
          data={subEventCategoriesData}
          search
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Event' : '...'}
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
    </View>
  );
};

export default DropdownComponent;
const styles = StyleSheet.create({
  dropdownContainer: {
    height: 56,
    width: '110%',
    backgroundColor: '#FFFFFF',
    marginTop: 15,
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
    fontFamily: 'Poppins-Medium',
    color: 'gray',
    marginLeft: 15,
  },
  selectedTextStyle: {
    fontSize: 18,
    // fontWeight: '400',
    fontFamily: 'Poppins-Medium',
    color: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  iconStyle: {
    width: 25,
    height: 25,
    marginRight: 15,
    // color: Colors.iconscolor,
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
    fontSize: 16,
    fontWeight: '500',
    color: Colors.iconscolor,
  },
  itemContainerStyle: {
    backgroundColor: Colors.white,
    borderRadius: 10, // Add this line
  },
  selectedItemContainerStyle: {
    backgroundColor: '#3E54AC',
    borderRadius: 8,
  },
});
