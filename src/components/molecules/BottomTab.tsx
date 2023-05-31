import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../../constants/Colors';
import Icons, {icons} from '../atoms/Icons';

const tabIcons = [
  {
    ico1: 'home',
    ico2: 'home-outline',
    type: icons.Ionicons,
    routeName: 'main',
  },
  {
    ico1: 'list-sharp',
    ico2: 'list-outline',
    type: icons.Ionicons,
    routeName: '',
  },
  {
    ico1: 'heart-sharp',
    ico2: 'heart-outline',
    type: icons.Ionicons,
    routeName: '',
  },
  {
    ico1: 'chatbox-ellipses',
    ico2: 'chatbox-ellipses-outline',
    type: icons.Ionicons,
    routeName: '',
  },
  {ico1: 'user', ico2: 'user-o', type: icons.FontAwesome, routeName: 'Profile'},
];

const BottomTab = ({navigation}) => {
  const [focused, setFocused] = useState('home');

  const navigate = (routeName: string) =>
    routeName !== '' ? navigation.navigate(routeName) : null;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setFocused('home');
    });
    return () => unsubscribe;
  }, [navigation]);
  return (
    <>
      <View style={styles.mainView}>
        {tabIcons.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setFocused(item.ico1);
              navigate(item.routeName);
            }}
            style={index === 5 || styles.contain}>
            <Icons
              style={{marginTop: 15}}
              icon={item.type}
              name={focused === item.ico1 ? item.ico1 : item.ico2}
              color={index === 5 || Colors.iconscolor}
              size={index === 5 || 36}
            />
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  contain: {
    elevation: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  mainView: {
    flexDirection: 'row',
    width: 400,
    height: 72,
    backgroundColor: '#ECF2FF',
    borderRadius: 25,
    elevation: 10,
  },
});
