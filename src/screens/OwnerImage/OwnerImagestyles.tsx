import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';
const OwnerImagestyles = StyleSheet.create({
  imagehorizontal: {
    height: -10,
    width: 300,
  },
  form: {
    marginLeft: 10,
  },
  imagetxt: {
    color: Colors.black,
    marginTop: 120,
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
  },
  touchableContainer: {
    height: 40,
    width: 100,
    marginLeft: 115,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.buttonColor,
  },
  removeContainer: {
    alignItems: 'center',
  },
  Icon: {
    color: Colors.iconscolor,
    fontSize: 20,
    marginTop: 23,
  },
  TitleText: {
    fontSize: 18,
    color: Colors.iconscolor,
    fontWeight: '700',
    marginTop: 20,
  },
  ImageContainer: {
    // height: '15%',
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  image: {
    height: 200,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 10,
    marginLeft: 65,
  },
  removeIconContainer: {
    position: 'absolute', // Position the remove icon container
    right: 5, // Adjust the right position as needed
    top: 50,
    zIndex: 1,
  },
  Addimage: {
    height: 163,
    width: '150%',
    // backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: Colors.white,
    borderRadius: 15,
    justifyContent: 'center',
    elevation: 4,
    alignItems: 'center',
  },
  ImageBox: {
    marginTop: 20,
    marginLeft: 15,
    width: '60%',
    height: '90%',
  },
  AddIcon: {
    alignItems: 'center',
    color: Colors.iconscolor,
    fontSize: 20,
    marginTop: 40,
    justifyContent: 'center',
  },
  imagesText: {
    fontSize: 20,
    color: Colors.black,
    // fontWeight: '500',
    fontFamily: 'Poppins-SemiBold',
  },
  Scroll: {
    height: 788,
    // backgroundColor: Colors.main,
    backgroundColor: Colors.main,
  },
  Sizecontainer: {
    marginTop: 20,
    height: '7%',
    width: '30%',
    marginLeft: 2,
  },
  Sizetext: {
    // width: '40%',
    // height: '40%',
    // padding: 1,
    fontSize: 18,
    color: Colors.iconscolor,
    fontWeight: '700',
  },
  addImagesText: {
    fontSize: 18,
    color: Colors.iconscolor,
    fontWeight: '700',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  mainTouchable: {
    height: 48,
    width: 250,
    backgroundColor: '#3E54AC',
    marginTop: 30,
    borderRadius: 13,
    color: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: -30,
  },
});
export default OwnerImagestyles;