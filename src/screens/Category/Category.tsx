import React, {useContext} from 'react';
import {Text, View, TouchableOpacity, Image, FlatList} from 'react-native';

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

  const {colorScheme, getContainerStyle, getTextColor} =
    useContext(ColorSchemeContext);
  const {categories, loading} = useCategory();

  const renderItem = ({item}: {item: CategoryItem}) => (
    <TouchableOpacity
      testID={`category-${item.id}`}
      style={[style.MainView, getContainerStyle()]}
      onPress={() => navigation.navigate('Subcategory', {categoryId: item.id})}>
      <View
        style={[
          style.categoryBox,
          colorScheme === 'dark' ? Styles.cardColor : Styles.main,
        ]}>
        <View style={style.imageContainer}>
          <Image
            testID={`category-image-${item.id}`}
            source={{uri: item.imageUrl}}
            style={style.categoryImage}
          />
        </View>
        <View>
          <Text
            testID="category-text-1"
            style={[style.categoryText, getTextColor()]}>
            {item.categoryName}
          </Text>
        </View>
        <View style={style.iconView}>
          <Icon
            name="arrow-forward-ios"
            size={20}
            style={[style.productforwardios, getTextColor()]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View testID="main-view" style={[style.maincontainer, getContainerStyle()]}>
      <Text style={[style.CategoryText, getTextColor()]}>Categories</Text>

      {loading ? (
        <View style={style.loaderContainer} testID="loading-animation">
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
          testID="category-flatlist"
        />
      )}
    </View>
  );
};

export default Category;
