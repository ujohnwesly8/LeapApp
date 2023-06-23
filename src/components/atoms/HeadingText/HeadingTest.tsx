/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import BackButton from '../BackButton/BackButton';
import Styles from '../../../constants/themeColors';
import {ColorSchemeContext} from '../../../../ColorSchemeContext';

interface HeadingTextProps {
  message: string;
}

const HeadingText = ({message}: HeadingTextProps) => {
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
            height: 90,
            width: '100%',
          },
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
    fontSize: 24,
    marginBottom: 10,
    fontFamily: 'Poppins-Bold',
  },
});
