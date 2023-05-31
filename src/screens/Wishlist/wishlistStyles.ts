import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';
import {color} from 'react-native-elements/dist/helpers';
const style = StyleSheet.create({
  textStyle: {
    color: Colors.black,
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    // fontWeight: 'bold',
  },
  maincontainer: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    backgroundColor: Colors.main,
  },
  textConatiner: {marginLeft: 20, marginTop: 10},
  container: {
    width: '83%',
    height: 200,
    borderRadius: 8,
    // flexDirection: 'row',
    // backgroundColor: '#000',
    backgroundColor: Colors.Inputtext,
    marginLeft: 20,
    // marginRight: 20,
    // marginBottom: 10,
    margin: 10,
  },
  textStylewishlist: {
    color: Colors.black,
    fontSize: 24,
    marginLeft: '37%',
    // marginBottom: 20,
    marginTop: 10,
    fontFamily: 'Poppins-SemiBold',
  },
  imageContainer: {
    // backgroundColor: 'green',
    width: '100%',
    height: '30%',
    // borderRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  image: {
    width: '100%',
    height: 145,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    // borderBottomRightRadius: 8,
    // borderBottomLeftRadius: 8,
  },
  name: {
    fontSize: 12,
    // fontWeight: '600',
    fontFamily: 'Poppins-Medium',
    color: Colors.black,
  },
  addButton: {
    borderColor: '#3E54AC',
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    height: 18,
    width: 18,
    backgroundColor: '#fff',
  },
  price: {
    fontSize: 12,
    // fontWeight: '600',
    color: Colors.buttonColor,
    fontFamily: 'Poppins-SemiBold',
  },
});
export default style;
