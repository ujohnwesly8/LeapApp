import {View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import style from './backButtonstyles';

type Props = {
  navigation: any;
};

const BackButton = ({navigation}: Props) => {
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
            testID="back-button"
          />
        </View>
      </View>
    </View>
  );
};

export default BackButton;
