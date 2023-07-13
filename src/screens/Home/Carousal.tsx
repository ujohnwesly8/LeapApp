import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import styles from './homeStyles';

import {ColorSchemeContext} from '../../../ColorSchemeContext';
import Styles from '../../constants/themeColors';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCategoriesdata} from '../../redux/slice/categorySlice';
type RootStackParamList = {
  Subcategory: {categoryId: number};
};

const Carousal = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const {colorScheme} = useContext(ColorSchemeContext);
  const data = useSelector(state => state.category.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesdata() as any);
  }, []); // Add the dependency 'url' to the dependency array

  return (
    <View style={styles.corousalContainer}>
      <ScrollView
        pagingEnabled
        horizontal
        snapToInterval={SCREEN_WIDTH}
        showsHorizontalScrollIndicator={false}
        style={styles.corousalScroll}>
        {data?.length > 0 ? (
          data?.map(
            (subcategory: {
              id: number;
              imageUrl: string;
              categoryName: string;
            }) => (
              <View key={subcategory.id}>
                <TouchableOpacity
                  style={styles.corosalView}
                  onPress={() =>
                    navigation.navigate('Subcategory', {
                      categoryId: subcategory.id,
                    })
                  }>
                  <Image
                    source={{uri: subcategory.imageUrl}}
                    style={styles.corousalImage}
                  />
                  <Text
                    style={[
                      styles.corousalSubname,
                      colorScheme === 'dark'
                        ? Styles.whitetext
                        : Styles.blackText,
                    ]}>
                    {subcategory.categoryName}
                  </Text>
                </TouchableOpacity>
              </View>
            ),
          )
        ) : (
          <Text>No subcategories found.</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Carousal;
