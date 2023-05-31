/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  useColorScheme,
} from 'react-native';
import Lottie from 'lottie-react-native';
import MaterialIcon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import style from './categoryStyles';
import axios from 'axios';
import {url} from '../../constants/Apis';
import Colors from '../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Styles from '../../constants/themeColors';
import HeadingText from '../../components/atoms/HeadingText/HeadingTest';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const {colorScheme} = useContext(ColorSchemeContext);
  useEffect(() => {
    axios
      .get(`${url}/category/list`)
      .then(response => {
        console.log('====================================');
        console.log(response.data);
        console.log('====================================');
        setCategories(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const renderItem = ({item}) => (
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
        <View
          style={{
            width: '90%',
            position: 'absolute',
            marginLeft: '50%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
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
      {/* </View> */}
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
      {/* <TouchableOpacity
        style={style.backBtn}
        onPress={() => {
          navigation.goBack();
        }}>
        <MaterialIcon
          name="md-chevron-back"
          color={Colors.black}
          size={26}
          style={{alignSelf: 'center'}}
        />
      </TouchableOpacity>
      <Text
        style={[
          style.textStyle,
          colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
        ]}>
        Shop by categories
      </Text> */}
      {loading ? (
        <View style={style.loaderContainer}>
          <Lottie source={require('../../../assets/loading2.json')} autoPlay />
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
