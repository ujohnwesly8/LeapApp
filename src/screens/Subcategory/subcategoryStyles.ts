import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';
const style = StyleSheet.create({
  textStyle: {
    color: Colors.black,
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    // fontWeight: '700',
    marginTop: 20,
    marginLeft: 30,
  },
  productforwardios: {
    marginLeft: 120,
    // justifyContent:'flex-end',
    // flexDirection:'row',
    color: 'black',
  },
  backBtn: {
    marginTop: 10,
    marginLeft: 25,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 100,
    width: '9%',
    height: 35,
    flexDirection: 'row',
  },
  maincontainer: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.main,
  },
  loaderContainer: {
    flex: 1,
    height: 200,
    width: 200,
    marginLeft: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryBox: {
    // justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: 64,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 8,
    marginLeft: 20,
    marginTop: 10,
    elevation: 5,
  },
  imageContainer: {
    marginLeft: 20,
  },
  MainView: {
    width: '90%',
    backgroundColor: 'black',
  },
  categoryImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
    alignSelf: 'center',
  },
  categoryText: {
    color: 'black',
    width: '100%',
    // justifyContent: 'space-evenly',
    fontSize: 20,
    // marginRight: 100,
    padding: 15,
    fontFamily: 'Poppins-Medium',
    alignSelf: 'center',
  },
});
export default style;
