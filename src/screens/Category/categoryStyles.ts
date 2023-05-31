import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';
const style = StyleSheet.create({
  categoryBox: {
    // justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 64,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 8,
    marginLeft: 20,
    marginTop: 10,
    elevation: 5,
  },
  CategoryText: {
    color: Colors.black,
    marginTop: 20,
    fontFamily: 'Poppins-Bold',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 24,
    marginLeft: 140,
  },
  imageContainer: {
    marginLeft: 20,
  },
  MainView: {
    width: '90%',
    backgroundColor: '#F0F0F0',
  },
  categoryImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
    alignSelf: 'center',
  },
  categoryText: {
    color: Colors.black,
    width: '100%',
    // justifyContent: 'space-evenly',
    fontSize: 20,
    // marginRight: 100,
    padding: 20,
    fontFamily: 'Poppins-Medium',
    alignSelf: 'center',
  },
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
    // backgroundColor: '#F0F0F0',
  },
  loaderContainer: {
    flex: 1,
    height: 200,
    width: 200,
    marginLeft: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 145,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
});
export default style;
