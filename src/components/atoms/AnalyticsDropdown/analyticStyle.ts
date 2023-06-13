import {StyleSheet} from 'react-native';
import Colors from '../../../constants/colors';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.buttonColor,
    // position: 'absolute',
    width: 140,
    height: 37,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 50,
    marginTop: 20,
    borderRadius: 10,
    elevation: 4,
    flexDirection: 'row',
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    // marginTop: 10,
  },
  dropdownConatiner: {
    backgroundColor: Colors.white,
    width: 140,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 50,
    elevation: 4,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
export default styles;
