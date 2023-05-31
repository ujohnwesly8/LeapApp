/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import styles from './paymentstylesheet';
import {View, Text} from 'react-native';
import Lottie from 'lottie-react-native';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
import Styles from '../../constants/themeColors';
const PaymentFailScreen = () => {
  const {colorScheme} = useContext(ColorSchemeContext);
  return (
    <View
      style={[
        styles.failcontainer,
        colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
      ]}>
      <View>
        <Text
          style={[
            styles.failheaderText,
            colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
          ]}>
          Payment
        </Text>
      </View>
      <View
        style={[
          styles.successContainer,
          colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
        ]}>
        <Lottie
          source={require('../../../assets/payfailed.json')}
          autoPlay
          style={[
            {height: 200, marginRight: '35%'},
            colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
          ]}
        />
        <Text
          style={[
            styles.successText,
            colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
          ]}>
          Payment Failed!{' '}
        </Text>
        <Text
          style={[
            styles.successText1,
            colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
          ]}>
          Something went wrong. Try Again.{' '}
        </Text>
      </View>
    </View>
  );
};
export default PaymentFailScreen;
