/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import BackButton from '../BackButton/BackButton';
import Styles from '../../../constants/themeColors';
import {ColorSchemeContext} from '../../../../ColorSchemeContext';
import {useNavigation} from '@react-navigation/native';

type HeadingTextProps = {
  message: string;
  navigation: any; // Assuming navigation is available as a prop
};

const HeadingText = ({message}: HeadingTextProps) => {
  const {colorScheme} = useContext(ColorSchemeContext);
  const navigation = useNavigation();
  return (
    <>
      <View style={{position: 'absolute', zIndex: 1}}>
        <BackButton navigation={navigation} />
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: 90,
          width: '100%',
        }}>
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
