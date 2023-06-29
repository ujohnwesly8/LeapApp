import React, {useContext, useState} from 'react';
import {View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Ownerstyles from '../../screens/Additems/Additemsstyle';
import Useadditems from '../../screens/Additems/useAdditems';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
import Styles from '../../constants/themeColors';

import styles from '../atoms/DropDownComponent/Dropdownstyles';
type GenderDropdownProps = {
  onSelectGender: (selectedGender: string) => void;
  onChange: (selectedGender: string) => void;
  value: any;
};
const DropdownComponent: React.FC<GenderDropdownProps> = ({
  onChange,
  value,
}) => {
  const {categoriesData} = Useadditems();
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
          style={[styles.dropdown]}
          placeholderStyle={[styles.placeholderStyle]}
          selectedTextStyle={[
            styles.selectedTextStyle,
            colorScheme === 'dark' ? Styles.InputText : Styles.blackText,
          ]}
          inputSearchStyle={[
            styles.inputSearchStyle,
            colorScheme === 'dark' ? Styles.cardColor : Styles.main,
          ]}
          iconStyle={styles.iconStyle}
          itemTextStyle={styles.itemTextStyle}
          selectedItemTextStyle={styles.selectedItemTextStyle}
          itemContainerStyle={[
            styles.itemContainerStyle,
            colorScheme === 'dark' ? Styles.cardColor : Styles.main,
          ]} // Add this line
          selectedItemContainerStyle={[
            styles.selectedItemContainerStyle,
            colorScheme === 'dark' ? Styles.cardColor : Styles.main,
          ]}
          data={categoriesData}
          search
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Gender' : '...'}
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
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
