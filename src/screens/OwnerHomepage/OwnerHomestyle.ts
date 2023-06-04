import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';
const Styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.main,
    height: '100%',
    width: '100%',
  },
  touchableContainer: {
    height: 90,
    width: 300,
    flexDirection: 'row',
    // backgroundColor: 'black',
    marginLeft: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headertxt: {
    // fontWeight: '500',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: 'black',
    marginTop: 15,
    marginLeft: 20,
  },
  Viewmore: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    height: 20,
    width: '30%',
    marginLeft: '36%',
    marginTop: -10,
    marginBottom: 20,
    borderRadius: 20,
    flexDirection: 'row',
  },
  borrowerName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 10,
    color: Colors.white,
    marginLeft: '10%',
    width: 180,
  },
  exportContainer: {
    width: '80%',
    height: 40,
    backgroundColor: Colors.buttonColor,
    borderRadius: 10,
    justifyContent: 'center',
    marginLeft: '10%',
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
  },
  txtClose: {
    color: Colors.black,
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    justifyContent: 'flex-end',
    marginLeft: '78%',
    width: '90%',
    marginTop: 20,
  },
  exportText: {
    color: Colors.white,
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  card: {
    backgroundColor: Colors.buttonColor,
    borderRadius: 10,
    padding: 20,
    margin: 10,
    height: 160,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    // fontWeight: '700',
    // marginBottom: 10,
    color: Colors.white,
    fontFamily: 'Poppins-SemiBold',
    marginLeft: '35%',
  },
  renteditems1: {
    fontSize: 14,
    marginLeft: '8%',
    // fontWeight: '600',
    fontFamily: 'Poppins-Medium',
    color: Colors.white,
    // marginBottom: 10,
  },
  modalContainer: {
    backgroundColor: Colors.buttonColor,
    marginTop: 400,
    height: 600,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 15,
    // fontWeight: '700',
    fontFamily: 'Poppins-Medium',
    marginBottom: 10,
    color: Colors.white,
    marginLeft: '24%',
    marginTop: 20,
  },
  closeButton: {
    width: '30%',
    backgroundColor: Colors.white,
    borderRadius: 30,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    height: 40,
  },
  closeButtonText: {
    color: Colors.black,
    fontFamily: 'Poppins-SemiBold',
    // marginLeft: 5,
    fontSize: 14,
    includeFontPadding: false,
  },
  noteText: {
    color: Colors.black,
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    marginTop: 20,
  },
  okButton: {
    backgroundColor: Colors.white,
    borderRadius: 40,
    width: '40%',
    height: 45,
    justifyContent: 'center',

    alignItems: 'center',
    marginTop: 60,
  },
  okButtonText: {
    color: 'black',
    fontSize: 16,
    padding: 10,
    borderRadius: 30,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  quantityContainer: {
    width: '35%',
    marginLeft: 100,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityButton: {
    width: 40,
    height: 35,
    borderRadius: 30,
    marginLeft: 25,
    marginTop: 20,
    backgroundColor: Colors.white,
  },
  quantityButtonText: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    justifyContent: 'center',
    includeFontPadding: false,
    alignSelf: 'center',
  },
  quantityText: {
    color: Colors.white,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    marginLeft: 25,
    marginTop: 30,
    height: 40,
  },
  disableButton: {
    width: '45%',
    backgroundColor: Colors.buttonColor,
    borderRadius: 5,
    marginRight: 10,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    // marginLeft: 90,
    // marginTop: -40,
  },
  enableButton: {
    width: '20%',
    backgroundColor: 'pink',
    borderRadius: 5,
    marginLeft: 90,
    marginTop: 20,
  },
  disableButtonText: {
    color: Colors.white,
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    // marginLeft: 5,
  },
  rentalitemscard: {
    flexDirection: 'row',
    marginLeft: -15,
  },
  renteditems2: {
    fontSize: 14,
    marginLeft: '35%',
    color: Colors.white,
    fontWeight: '600',
  },
  cardsrentalprices: {
    fontSize: 14,
    marginLeft: '12%',
    // marginTop: 7,
  },
  cardsTotalprices: {
    marginLeft: '44%',
    // marginTop: 10,
  },
  recentlyaddedcontainer: {
    height: 150,
    width: '100%',
    backgroundColor: 'white',
    marginBottom: 10,
  },
  recentlyaddedcard: {
    // backgroundColor: Colors.black,
    borderRadius: 10,
    // padding: 20,
    margin: 5,
    marginLeft: 15,
    marginRight: 15,
    width: 155,
    // elevation: 2,
    // width: '40%',
    // marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: -15,
  },
  recentlyaddedimage: {
    width: '159%',
    height: 150,
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: Colors.Inputtext,
  },
  recentlyaddedname: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.iconscolor,
  },
  cardText: {
    color: 'black',
    // textAlign: 'left',
    // fontWeight: '500',
    fontFamily: 'Poppins-Medium',
    height: 20,
    width: '40%',
    marginTop: 5,
    marginLeft: 10,
    fontSize: 14,
  },
  cardTextPrice: {
    color: '#9747FF',
    textAlign: 'left',
    fontFamily: 'Poppins-Medium',
    marginLeft: 10,
    marginTop: 5,
    fontSize: 14,
    // fontWeight: '700',
  },
  disabledText: {
    color: 'white',
    // textAlign: 'left',
    fontFamily: 'Poppins-Medium',
    // marginLeft: 10,
    marginTop: 5,
    marginRight: 10,
    fontSize: 12,
    // fontWeight: '700',
  },
  cardContainer: {
    width: '67%',
    height: 150,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  cardTextContainer: {
    width: '107%',
    height: 55,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  recentlyaddedprice: {
    fontSize: 16,
    textAlign: 'center',
  },
  Rentalhistory: {
    fontWeight: 'bold',
    fontSize: 20,
    backgroundColor: '#000000',
    color: Colors.iconscolor,
    marginLeft: 25,
  },
  dashcardContainer: {
    width: '50%',
    height: 150,
    // alignSelf: 'center',
    flexDirection: 'row',
    // backgroundColor: Colors.white,
  },
  dashcard: {
    backgroundColor: Colors.buttonColor,
    borderRadius: 10,
    padding: 10,
    width: '85%',
    flexDirection: 'row',
    margin: 28,
    height: 140,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 4,
  },
  Order: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 10,
    color: Colors.white,
    marginLeft: '10%',
  },
  Product: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 10,
    color: Colors.white,
    marginLeft: '10%',
    width: '80%',
  },
  price: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 10,
    color: Colors.white,
    marginLeft: '10%',
  },
  order: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 10,
    color: Colors.white,
    marginLeft: '10%',
    width: '100%',
  },
  dashboardimage: {
    width: '80%',
    height: 120,
    borderRadius: 8,
  },
});
export default Styles;
