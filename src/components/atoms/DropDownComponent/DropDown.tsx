import React, {useContext, useState} from 'react';
import {View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {ColorSchemeContext} from '../../../../ColorSchemeContext';
import Ownerstyles from '../../../screens/Additems/Additemsstyle';
import Styles from '../../../constants/themeColors';
import styles from './dropdownStyles';

type DropdownComponentProps = {
  onSelect: (selectedValue: string) => void;
  onChange: (selectedValue: string) => void;
  value: any;
  placeholder: string;
  data: any[];
};

const DropdownComponent: React.FC<DropdownComponentProps> = ({
  onSelect,
  onChange,
  value,
  placeholder,
  data,
}) => {
  const {colorScheme} = useContext(ColorSchemeContext);
  const [isFocus, setIsFocus] = useState(false);
  console.log('data is ', data);

  return (
    <View style={Ownerstyles.scrollView}>
      <View
        style={[
          styles.dropdownContainer,
          colorScheme === 'dark' ? Styles.cardColor : Styles.main,
        ]}>
        <Dropdown
          testID="dropdown-component"
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
          data={data}
          search
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? placeholder : '...'}
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
