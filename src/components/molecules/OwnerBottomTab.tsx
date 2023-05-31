import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Colors from '../../constants/Colors';
import Icons, {icons} from '../atoms/Icons';

const tabIcons = [
  {
    ico1: 'home',
    ico2: 'home-outline',
    type: icons.Ionicons,
    routeName: 'OwnerHome',
  },
  {
    ico1: 'plussquare',
    ico2: 'plussquareo',
    type: icons.AntDesign,
    routeName: 'Additems',
  },
  {
    ico1: 'user',
    ico2: 'user-o',
    type: icons.FontAwesome,
    routeName: 'OwnerProfileStack',
  },
];

const OwnerBottomTab = ({navigation}) => {
  const [focused, setFocused] = useState('OwnerHome');

  const navigate = useCallback(
    (routeName: string) => {
      console.log('navigation:', navigation);
      console.log('routeName', routeName);
      if (routeName !== '') {
        navigation.navigate(routeName);
      }
    },
    [navigation],
  );

  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      setFocused('OwnerHome');
    });
    return () => subscribe;
  }, [navigation]);

  return (
    <>
      <View
        style={{
          height: 72,
          width: 390,
          backgroundColor: Colors.white,
          flexDirection: 'row',
          justifyContent: 'space-around',
          borderRadius: 15,
          elevation: 40,
        }}>
        {tabIcons.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setFocused(item.ico1);
              navigate(item.routeName);
            }}
            style={index === 3 || styles.contain}>
            <Icons
              icon={item.type}
              name={focused === item.ico1 ? item.ico1 : item.ico2}
              color={index === 3 || Colors.iconscolor}
              size={index === 3 || 36}
            />
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

export default OwnerBottomTab;

const styles = StyleSheet.create({
  contain: {
    elevation: 10,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
    marginTop: 20,
    // backgroundColor: 'Red',
  },
});
