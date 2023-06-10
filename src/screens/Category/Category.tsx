import React, {useContext} from 'react';
import {Text, View, TouchableOpacity, Image, FlatList} from 'react-native';
import Lottie from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import style from './categoryStyles';
import {useCategory} from './useCategory';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
import Styles from '../../constants/themeColors';
import LottieAnimation from '../../components/molecules/LottieAnimation/LottieAnimation';

type RootStackParamList = {
  Subcategory: {categoryId: number};
};

interface CategoryItem {
  id: number;
  categoryName: string;
  imageUrl: string;
}

const Category = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {colorScheme} = useContext(ColorSchemeContext);
  const {categories, loading} = useCategory();

  const renderItem = ({item}: {item: CategoryItem}) => (
    <TouchableOpacity
      style={[
        style.MainView,
        colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
      ]}
      onPress={() => navigation.navigate('Subcategory', {categoryId: item.id})}>
      <View
        style={[
          style.categoryBox,
          colorScheme === 'dark' ? Styles.cardColor : Styles.main,
        ]}>
        <View style={style.imageContainer}>
          <Image source={{uri: item.imageUrl}} style={style.categoryImage} />
        </View>
        <View>
          <Text
            style={[
              style.categoryText,
              colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
            ]}>
            {item.categoryName}
          </Text>
        </View>
        <View style={style.iconView}>
          <Icon
            name="arrow-forward-ios"
            size={20}
            style={[
              style.productforwardios,
              colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
            ]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={[
        style.maincontainer,
        colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
      ]}>
      <Text
        style={[
          style.CategoryText,
          colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
        ]}>
        Categories
      </Text>

      {loading ? (
        <View style={style.loaderContainer}>
          <LottieAnimation
            source={require('../../../assets/loading2.json')}
            style={{}}
          />
        </View>
      ) : (
        <FlatList
          data={categories}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </View>
  );
};

export default Category;
