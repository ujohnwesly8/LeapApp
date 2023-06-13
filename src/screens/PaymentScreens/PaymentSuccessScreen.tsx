/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Lottie from 'lottie-react-native';

import usePayment from './usePayment';
import styles from './paymentstylesheet';
import Colors from '../../constants/colors';
import Styles from '../../constants/themeColors';

const PaymentSuccessScreen = () => {
  const {navigation, colorScheme} = usePayment();
  return (
    <View
      style={[
        styles.container,
        colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
      ]}>
      <View>
        <Text
          style={[
            styles.headerText,
            colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
          ]}>
          Payment
        </Text>
      </View>
      <View style={styles.successContainer}>
        <Lottie
          style={{marginTop: -70, height: 200}}
          source={require('../../../assets/paysuccess2.json')}
          autoPlay
        />
        <Text
          style={[
            styles.successText2,
            colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
          ]}>
          Payment successful!{' '}
        </Text>
        <Text
          style={[
            styles.successText3,
            colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
          ]}>
          Your Order Has Been Placed.{' '}
        </Text>
        <TouchableOpacity
          style={styles.btnfield}
          onPress={() =>
            navigation.navigate('UserHomescreen', {screen: 'Homescreen'})
          }>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={[
                styles.btntext,
                colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
              ]}>
              Continue Shopping{' '}
            </Text>
            <Icon
              name="arrow-forward-ios"
              size={20}
              color="black"
              style={{
                top: 20,
                left: 60,
                height: 29,
                width: 204,
                fontWeight: 'bold',
                fontFamily: 'Poppins',
                fontSize: 20,
                color: 'white',
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.obtnfield}
          onPress={() =>
            navigation.navigate('ProfileScreen', {screen: 'MyOrder'})
          }>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.obtntext}>Your Orders </Text>
            <Icon
              name="arrow-forward-ios"
              size={20}
              color="black"
              style={{
                top: 20,
                left: 110,
                height: 29,
                width: 204,
                fontWeight: 'bold',
                fontFamily: 'Poppins',
                fontSize: 20,
                color: Colors.buttonColor,
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default PaymentSuccessScreen;
