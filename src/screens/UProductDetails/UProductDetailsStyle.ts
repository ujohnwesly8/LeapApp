import {StyleSheet} from 'react-native';
import Colors from '../../constants/colors';
const styles = StyleSheet.create({
  productSizeBox: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#3E54AC',
    borderRadius: 10,
    backgroundColor: Colors.iconscolor,
    width: 50, // set a width that works for your layout
    height: 30, // set a height that works for your layout
    justifyContent: 'center', // vertically center the text
    alignItems: 'center', // horizontally center the text
  },
  disabledButton: {
    opacity: 0.5,
    backgroundColor: 'gray',
  },
  detailsdescription: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 15,
    // fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    color: Colors.black,
  },
  size: {
    height: 50,
    width: '100%',
    // backgroundColor: Colors.buttonColor,
    flexDirection: 'row',
    borderRadius: 50,
  },
  detailsPrice: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 16,
    // fontWeight: '700',
    fontFamily: 'Poppins-SemiBold',
    color: Colors.buttonColor,
  },
  detailsaddPrice: {
    // marginTop: 20,
    // marginLeft: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: '700',
    color: Colors.white,
  },
  detailsSize: {
    // marginTop: 20,
    // alignSelf: 'center',
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    width: '100%',
    fontFamily: 'Poppins-Medium',
    // fontWeight: 'bold',
    color: Colors.black,
  },
  buttonQuantity: {
    backgroundColor: '#fff',
    paddingHorizontal: 2,
    paddingVertical: 2,
    height: 28,
    width: 28,
    borderRadius: 5,
    borderColor: '#3E54AC',
    borderWidth: 1,
    // top: 55,
    // left: -190,
  },
  paginationContainer: {
    marginTop: -24,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  pagingText: {
    width: 10,
    height: 10,
    borderRadius: 4,
    marginHorizontal: 1,
    backgroundColor: 'gray',
  },
  pagingActiveText: {
    width: 10,
    height: 10,
    borderRadius: 4,
    marginHorizontal: 8,
    backgroundColor: Colors.buttonColor,
  },
  buttonTextDecrement: {
    fontSize: 12,
    fontWeight: 'bold',
    top: 2,
    left: 9,
  },
  buttonTextIncrement: {
    fontSize: 12,
    fontWeight: 'bold',
    top: 2,
    left: 9,
  },
  quantityText: {
    fontSize: 14,
    marginHorizontal: 10,
    // fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
    color: Colors.black,
    // top: 55,
    // left: -190,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    flex: 1,
    marginRight: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.13)',
    // borderWidth: 1,
    borderRadius: 50,
    // borderColor: 'gray',
    paddingHorizontal: 10,
    height: 50,
  },
  quantityButton: {
    backgroundColor: Colors.buttonColor,
    borderRadius: 15,
    marginLeft: '45%',
    padding: 5,
    height: 30,
    width: 30,
  },
  plusquantityButton: {
    backgroundColor: Colors.buttonColor,
    borderRadius: 15,
    // marginLeft: '30%',
    padding: 5,
    height: 30,
    width: 30,
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  container: {
    // zIndex: 0,
    // backgroundColor: '#ECF2FF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // marginTop: 50,
    // backgroundColor: 'white',
    width: '100%',
    height: '100%',
    // height: 800,
  },
  btnfield: {
    position: 'relative',
    width: 330,
    height: 59,
    left: 26,
    top: 650,
    backgroundColor: '#3E54AC',
    borderRadius: 8,
  },
  dbtnfield: {
    position: 'absolute',
    width: 330,
    height: 59,
    left: 26,
    top: 370,
    backgroundColor: '#3E54AC',
    borderRadius: 8,
    elevation: 10,
  },
  btntext: {
    position: 'absolute',
    left: 120,
    top: 15,
    height: 29,
    width: 104,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    fontSize: 20,
    color: 'white',
  },
  dheader: {
    marginTop: -30,
    top: 90,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 1,
    marginLeft: 5,
  },
  detailsContainer: {
    zIndex: 1,
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    flex: 1,
    height: '100%',
  },
  iconContainer: {
    height: 60,
    width: 60,
    position: 'absolute',
    top: -30,
    backgroundColor: 'white',
    borderRadius: 30,
    right: 20,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headTxt: {
    width: 276,
    top: 265,
    left: 95,
    fontSize: 64,
    fontFamily: 'Poppins-Redular',
    fontWeight: 'bold',
    color: '#3E54AC',
  },
  headphoto: {
    width: 186,
    height: 173,
    left: 95,
    top: 288,
  },
  headingtext: {
    fontSize: 16,
    marginLeft: 10,
    // fontWeight: '400',
    fontFamily: 'Poppins-Redular',
    color: Colors.black,
    // width: '80%',
  },
  Quatitytext: {
    fontSize: 16,
    // marginLeft: 10,
    // fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    color: Colors.black,
    // width: '80%',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 0.7,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity and color as desired
    padding: 10,
  },
  startext: {
    marginTop: -125,
    color: Colors.white,
    fontFamily: 'Poppins-Bold',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // shadowRadius: 90,
    // shadowOpacity: 0.9,
    marginLeft: 10,
    // fontWeight: '700',
    zIndex: 1,
    fontSize: 35,
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Shadow color
    textShadowOffset: {width: -1, height: 1}, // Shadow offset
    textShadowRadius: 5, // Shadow blur radius
  },
  title: {
    fontFamily: '800',
    fontSize: 28,
    marginBottom: 10,
    color: '#493d8a',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  sizelabel: {
    // marginTop: 10,
    alignSelf: 'center',
    marginLeft: 10,
    fontSize: 16,
    color: Colors.black,
    fontFamily: 'Poppins-Regular',
  },
  sizebutton: {
    width: 60,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(62, 84, 172, 0.65)',
    borderRadius: 3,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizebuttontext: {
    textAlign: 'center',
  },
  description: {
    fontWeight: '300',
    color: '#62656b',
    textAlign: 'center',
    paddingHorizontal: 64,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  dateText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#3E54AC',
  },
  datePicker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 9,
  },
  dateInput: {
    fontSize: 16,
  },
  categoriesslidescontainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    marginTop: 20,
    width: 350,
    height: 100,
    margin: 10,
    marginLeft: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: '110%',
  },
  cardImagetextView: {
    position: 'absolute',
    top: '90%',
    left: '55%',
    transform: [{translateX: -50}, {translateY: -50}],
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardtext: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'poppins',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    paddingLeft: 45,
    paddingRight: 20,
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 1,
    borderColor: '#3E54AC',
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingLeft: 100,
    color: '#3E54AC',
  },
  searchIcon: {
    position: 'absolute',
    top: 12.5,
    left: 35,
    zIndex: 1,
    opacity: 0.5,
  },

  touchableText: {
    // margin:15,
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
    marginLeft: '50%',
    justifyContent: 'center',
  },
  touchablebtn: {
    height: 59,
    width: '100%',
    backgroundColor: Colors.buttonColor,
    flexDirection: 'row',
    // margin: 15,
    // marginTop: 20,
    borderRadius: 50,
    color: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchablebtnContainer: {
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
    // alignItems:"center",
  },

  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});

export default styles;
