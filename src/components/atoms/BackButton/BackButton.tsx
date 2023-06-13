import {View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import style from './backButtonstyles';
import {useNavigation} from '@react-navigation/native';

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <View style={style.headerS}>
      <View style={style.backButtonContainer}>
        <View style={style.redCircle}>
          <Icon
            style={style.viewStyle}
            name="arrow-back-ios"
            size={16}
            color="#000000"
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </View>
  );
};

export default BackButton;
