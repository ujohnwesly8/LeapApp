import React, {useContext} from 'react';
import {View, Switch, StyleSheet} from 'react-native';
import {ColorSchemeContext} from '../../../../ColorSchemeContext';

const Togglebutton = () => {
  const {colorScheme, toggleColorScheme} = useContext(ColorSchemeContext);

  const handleToggle = () => {
    toggleColorScheme();
  };

  return (
    <View style={styles.container}>
      <Switch
        value={colorScheme === 'dark'}
        onValueChange={handleToggle}
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={colorScheme === 'dark' ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // alignItems: 'flex-end',
    // width: 100,
    // height: 100,
    marginRight: 10,
    // marginBottom: 20,
    // backgroundColor: 'black',
  },
});

export default Togglebutton;
