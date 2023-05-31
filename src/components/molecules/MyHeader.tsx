import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Badge, Surface, Title} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../constants/Colors';

interface AppHeaderProps {
  style?: any;
  menu?: boolean;
  back?: boolean;
  onPressBack?: () => void;
  title?: string;
  right?: string;
  onRightPress?: () => void;
  optionalBtn?: string;
  optionalBtnPress?: () => void;
  rightComponent?: React.ReactNode;
  headerBg?: string;
  iconColor?: string;
  titleAlight?: 'auto' | 'left' | 'center' | 'right' | 'justify' | undefined;
  optionalBadge?: string;
}

const IconSize = 24;

const AppHeader: React.FC<AppHeaderProps> = ({
  style,
  menu,
  back,
  onPressBack,
  title,
  right,
  onRightPress,
  optionalBtn,
  optionalBtnPress,
  rightComponent,
  headerBg = 'white',
  iconColor = 'black',
  titleAlight,
  optionalBadge,
}) => {
  const LeftView = () => (
    <View style={styles.view}>
      {menu && (
        <TouchableOpacity onPress={() => {}}>
          <Feather name="menu" size={IconSize} color={iconColor} />
        </TouchableOpacity>
      )}
      {back && (
        <TouchableOpacity onPress={onPressBack}>
          <Feather name="arrow-left" size={IconSize} color={iconColor} />
        </TouchableOpacity>
      )}
    </View>
  );
  const TitleView = () => (
    <View style={styles.titleView}>
      <Title style={{textAlign: titleAlight}}>{title}</Title>
    </View>
  );
  return (
    <Surface style={[styles.header, {backgroundColor: '#ECF2FF'}]}>
      <LeftView />
      <TitleView />
    </Surface>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  header: {
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  view: {
    marginHorizontal: 16,
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleView: {
    flex: 1,
    marginLeft: 20,
  },
  rightView: {
    justifyContent: 'flex-end',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
});
