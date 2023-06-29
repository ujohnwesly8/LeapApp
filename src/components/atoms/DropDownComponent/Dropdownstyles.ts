import Colors from '../../../constants/colors';
import {StyleSheet} from 'react-native';

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
    fontFamily: 'Poppins-Medium',
    color: 'gray',
    marginLeft: 15,
  },
  selectedTextStyle: {
    fontSize: 18,
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
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 18,
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
    borderRadius: 10,
  },
  selectedItemContainerStyle: {
    backgroundColor: '#3E54AC',
    borderRadius: 8,
  },
});
export default styles;
