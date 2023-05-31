import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';
import {CollapsedItem} from 'react-native-paper/lib/typescript/src/components/Drawer/Drawer';
const Ownerstyles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.black,
    height: '100%',
    width: 342,
  },
  Titletext: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3E54AC',
    marginTop: 40,
    marginLeft: 40,
  },
  mainButton: {
    alignItems: 'center',
    height: '50%',
    marginBottom: 40,
  },
  mainTouchable: {
    height: 59,
    width: '110%',
    backgroundColor: Colors.buttonColor,
    marginTop: 30,
    marginBottom: 30,
    borderRadius: 100,
    color: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
  },
  touchableText: {
    // margin:15,
    color: Colors.white,
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '700',
    justifyContent: 'center',
  },
  Imageitem: {
    height: 190,
    width: 190,
    marginLeft: 100,
    marginRight: 90,
  },
  scrollView: {
    height: 100,
    width: '100%',
    justifyContent: 'center',
  },
  Itemname: {
    color: '#3E54AC',
    fontSize: 18,
    fontFamily: 'poppins',
    // marginLeft: 35,
    fontWeight: '700',
    marginTop: 5,
  },
  Namefield: {
    fontSize: 16,
    color: Colors.black,
    fontFamily: 'Poppins-Medium',
    height: 56,
    width: '111%',
    elevation: 4,
    backgroundColor: Colors.white,
    marginTop: 15,
    borderRadius: 8,
  },
  scroll: {
    marginLeft: 27,
    width: '79%',
    height: 700,
    // alignItems : 'center',
  },
  scrolledit: {
    marginLeft: 27,
    width: '79%',
    height: 1080,
    // alignItems : 'center',
  },
});
export default Ownerstyles;
