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
import {ColorSchemeContext} from '../../../ColorSchemeContext';
import Styles from '../../constants/themeColors';

const Carousal = () => {
  const [active, setActive] = useState(0);
  const [subcategories, setSubcategories] = useState([]);
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const {colorScheme} = useContext(ColorSchemeContext);
  useEffect(() => {
    async function fetchSubcategories() {
      try {
        const Categoriesdata = await ApiService.get(`${url}/category/list`);
        setSubcategories(Categoriesdata);
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
                      colorScheme === 'dark'
                        ? Styles.whitetext
                        : Styles.blackText,
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
const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    width: '100%',
    height: 120,
    borderRadius: 20,
    // backgroundColor: Colors.white,
  },
  subname: {
    color: Colors.black,
    fontSize: 14,
    // fontWeight: '400',
    // zIndex: 1,
    height: 100,
    marginLeft: 30,
    alignItems: 'center',
    marginTop: 10,
    // backgroundColor: Colors.black,
    fontFamily: 'Poppins-Regular',
  },
  scroll: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    // marginLeft: 20,
  },
  corosal: {
    // backgroundColor: Colors.black,
    height: '100%',
    width: '100%',
  },
  image: {
    height: 72,
    width: 72,
    // resizeMode: 'cover',
    borderRadius: 100,
    // borderWidth: 1,
    // borderColor: Colors.white,
    padding: 30,
    marginLeft: 15,
    opacity: 1,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  card: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  pagingText: {color: '#fff', margin: 3},
  pagingActiveText: {color: '#3E54AC', margin: 3},
});

export default Carousal;
