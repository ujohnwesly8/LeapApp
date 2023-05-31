import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {url} from '../../constants/Apis';
import ApiService from '../../network/network';
import Colors from '../../constants/Colors';
import Styles from '../../constants/themeColors';

const Carousal = () => {
  const [active, setActive] = useState(0);
  const [subcategories, setSubcategories] = useState([]);
  const SCREEN_WIDTH = Dimensions.get('window').width;
  useEffect(() => {
    async function fetchSubcategories() {
      try {
        console.log('john', Categoriesdata);
      } catch (error) {
        console.error('error is ', error.message);
      }
    }
    fetchSubcategories();
  }, []);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView
        pagingEnabled
        horizontal
        snapToInterval={SCREEN_WIDTH}
        // onScroll={change}
        showsHorizontalScrollIndicator={false}
        style={styles.scroll}>
        {subcategories &&
          subcategories.map(subcategory => (
            <View key={subcategory.id}>
              <View>
                <TouchableOpacity
                  style={styles.corosal}
                  onPress={() =>
                    navigation.navigate('Subcategory', {
                      categoryId: subcategory.id,
                    })
                  }>
                  <Image
                    source={{uri: subcategory.imageUrl}}
                    style={styles.image}
                  />
                  <Text
                    style={[
                      styles.subname,
                    ]}>
                    {subcategory.categoryName}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default Carousal;
