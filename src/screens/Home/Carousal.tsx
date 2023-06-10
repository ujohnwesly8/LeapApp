import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import styles from './homeStyles';
import {url} from '../../constants/Apis';
import ApiService from '../../network/network';

import {ColorSchemeContext} from '../../../ColorSchemeContext';
import Styles from '../../constants/themeColors';
import {StackNavigationProp} from '@react-navigation/stack';
type RootStackParamList = {
  Subcategory: {categoryId: number};
};

const Carousal = () => {
  const [subcategories, setSubcategories] = useState<
    {id: number; imageUrl: string; categoryName: string}[]
  >([]);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const {colorScheme} = useContext(ColorSchemeContext);
  useEffect(() => {
    async function fetchSubcategories() {
      ApiService.get(`${url}/category/list`)
        .then(Categoriesdata => {
          setSubcategories(Categoriesdata);
          console.log('john', Categoriesdata);
        })
        .catch(error => {
          console.error('error is', error);
        });
    }
    fetchSubcategories();
  }, []); // Add the dependency 'url' to the dependency array

  return (
    <View style={styles.corousalContainer}>
      <ScrollView
        pagingEnabled
        horizontal
        snapToInterval={SCREEN_WIDTH}
        showsHorizontalScrollIndicator={false}
        style={styles.corousalScroll}>
        {subcategories.length > 0 ? (
          subcategories.map(subcategory => (
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
          ))
        ) : (
          <Text>No subcategories found.</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Carousal;
