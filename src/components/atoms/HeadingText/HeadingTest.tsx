/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, useColorScheme} from 'react-native';
import React, {useContext} from 'react';
import BackButton from '../BackButton/BackButton';
import useCart from '../../../screens/Cart/useCart';
import Styles from '../../../constants/themeColors';
import {ColorSchemeContext} from '../../../../ColorSchemeContext';

const HeadingText = ({message}) => {
  const {colorScheme} = useContext(ColorSchemeContext);
  return (
    <>
      <View style={{position: 'absolute', zIndex: 1}}>
        <BackButton />
      </View>
      <View
        style={[
          {
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor: '#000',
            height: 90,
            width: '100%',
          },
          // colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
        ]}>
        <Text
          style={[
            styles.textStyle,
            colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
          ]}>
          {message}
        </Text>
      </View>
    </>
  );
};

export default HeadingText;

const styles = StyleSheet.create({
  textStyle: {
    // color: 'black',
    fontSize: 24,
    // marginLeft: '27%',
    // justifyContent: 'center',
    marginBottom: 10,
    // marginTop: 20,
    // fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
});
