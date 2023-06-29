import React, {useContext, useState} from 'react';
import {View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

import {ColorSchemeContext} from '../../../ColorSchemeContext';
import Styles from '../../constants/themeColors';
import styles from '../atoms/DropDownComponent/Dropdownstyles';
const data = [
  {label: 'XS', value: '1'},
  {label: 'S', value: '2'},
  {label: 'L', value: '3'},
  {label: 'XL', value: '4'},
  {label: 'XXL', value: '5'},
];
const Sizeselection = ({onSelectSize, onChange}) => {
  const [value, _setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const {colorScheme} = useContext(ColorSchemeContext);

  return (
    <View>
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
