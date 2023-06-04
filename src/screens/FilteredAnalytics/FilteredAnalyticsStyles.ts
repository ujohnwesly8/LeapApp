import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
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

  exportText: {
    color: Colors.white,
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },

  titleStyle:{
            color: 'black',
            fontSize: 24,
            fontWeight: 'bold',
            margin: 15,
          },


    headingtext: {
    fontSize: 16,
    
    // fontWeight: '400',
    fontFamily: 'Poppins-Redular',
    color: Colors.black,
    // width: '80%',
  },

   dashcard: {
    backgroundColor: Colors.buttonColor,
    borderRadius: 10,
    padding: 10,
    width: '85%',
    // flexDirection: 'row',
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



   dashcardContainer: {
    width: '50%',
    height: 150,
    // alignSelf: 'center',
    flexDirection: 'row',
    // backgroundColor: Colors.white,
  },


   dashboardimage: {
    width: '70%',
    height: 120,
    borderRadius: 8,
  },



   cardStyle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 10,
    width:'100%',
    color: Colors.white,
    marginLeft: '10%',
  },


   textContainer1: {
    alignItems: 'center',
  },
  noAddressText1: {
    // fontWeight: '500',
    fontFamily:'Poppins-Bold',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
    color: 'black',
  },
    noAddressText2: {
    // fontWeight: '500',
    fontFamily:'Poppins-Bold',
    fontSize: 20,
    marginTop: 3,
    marginBottom: 10,
    color: 'black',
  },
    overlay: {
    height: 163,
    width: '150%',
    // backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: Colors.white,
    borderRadius: 15,
    justifyContent: 'center',
    elevation: 4,
    alignItems: 'center',
  },
  axisLabel:{
   
    // backgroundColor:'blue',
    marginLeft:150,
  },
    axisLabel1:{
    color:'black',
  
    fontSize:10,
    height:120,
    width:30,
    // marginLeft:20,
  }
});
export default styles;
