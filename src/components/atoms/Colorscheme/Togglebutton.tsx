import React, {useContext, useRef} from 'react';
import {View, Switch, StyleSheet, Animated} from 'react-native';
import {ColorSchemeContext} from '../../../../ColorSchemeContext';
const Togglebutton = () => {
  const {colorScheme, toggleColorScheme} = useContext(ColorSchemeContext);
  const switchAnim = useRef(
    new Animated.Value(colorScheme === 'dark' ? 0 : 1),
  ).current;

  const handleToggle = () => {
    toggleColorScheme();
    Animated.timing(switchAnim, {
      toValue: colorScheme === 'dark' ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const iconTranslateX = switchAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [23, -4],
  });

  return (
    <View style={styles.container} testID="toggle-container">
      {colorScheme === 'dark' ? (
        <Animated.Image
          source={require('../../../../assets/darkmoon.jpeg')}
          testID="switch-dark"
          style={[styles.icon, {transform: [{translateX: iconTranslateX}]}]}
        />
      ) : (
        <Animated.Image
          testID="switch-light"
          source={require('../../../../assets/sun.png')}
          style={[styles.Wicon, {transform: [{translateX: iconTranslateX}]}]}
        />
      )}
      <Switch
        value={colorScheme === 'dark'}
        onValueChange={() => handleToggle()}
        testID="toggle-switch"
        trackColor={{false: '#81b0ff', true: '#141E27'}}
        thumbColor={colorScheme === 'dark' ? '#141E27' : '#f5dd4b'}
        ios_backgroundColor="#3e3e3e"
        style={styles.toggle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: '78%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggle: {
    transform: [{scaleX: 1.5}, {scaleY: 1.5}],
  },
  icon: {
    height: 28,
    width: 28,
    borderRadius: 30,
    position: 'absolute',
    left: 1,
    zIndex: 1,
  },
  Wicon: {
    height: 28,
    width: 28,
    borderRadius: 30,
    position: 'absolute',
    left: -2,
    zIndex: 1,
  },
});

export default Togglebutton;
