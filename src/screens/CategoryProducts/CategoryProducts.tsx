/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useContext} from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Lottie from 'lottie-react-native';
import Colors from '../../constants/colors';
import useCart from '../Cart/useCart';
import Styles from '../../constants/themeColors';
import HeadingText from '../../components/atoms/HeadingText/HeadingTest';
import {ColorSchemeContext} from '../../../ColorSchemeContext';

type RootStackParamList = {
  CategoryProducts: {subcategoryId: number};
  UProductDetails: {product: any};
  ProfileScreen: {screen: any};
};

const CategoryProducts = ({route}: any) => {
  const dispatch = useDispatch();
  const {subcategoryId} = route.params;
  const [subcategories, setSubcategories] = useState([]);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [wishlistList, setWishlistList] = useState<number[]>([]);

  const {colorScheme} = useContext(ColorSchemeContext);

  useEffect(() => {
    const fetchSubcategories = async () => {
      const token = await AsyncStorage.getItem('token'); // replace with your actual token

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${url}/product/listBySubcategoryId/${subcategoryId}`,
        config,
      );
      const subcategoriesData = response.data;
      setSubcategories(subcategoriesData);
    };

    fetchSubcategories();
  }, [subcategoryId]);

  return (
    <ScrollView
      style={[
        style.maincontainer,
        colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
      ]}>
      <HeadingText message={'Products'} />
      <View style={{flex: 1}}>
        {subcategories.length === 0 ? (
          <View>
            <Lottie
              style={{height: 400, width: '100%', marginLeft: 15}}
              source={require('../../../assets/productsEmpty.json')}
              autoPlay
            />
            <Text
              style={[
                style.loadtextStyle,
                colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
              ]}>
              Products are not Available Right Now
            </Text>
          </View>
        ) : (
          <View
            style={{
              width: '100%',
            }}>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                width: '100%',
                flexWrap: 'wrap',
              }}>
              {subcategories &&
                Array.isArray(subcategories) &&
                subcategories.length > 0 &&
                subcategories.map(
                  (
                    item: {
                      id: number;
                      imageUrl: string[];
                      name: string;
                      price: number;
                    },
                    index: number,
                  ) => (
                    <TouchableOpacity
                      style={{width: '50%'}}
                      key={`${item.id.toString()}-${index}`}
                      onPress={() =>
                        navigation.navigate('CategoryProducts', {
                          subcategoryId: item.id,
                        })
                      }>
                      <View
                        style={[
                          style.container,
                          colorScheme === 'dark'
                            ? Styles.cardColor
                            : Styles.main,
                        ]}>
                        <TouchableOpacity
                          key={item.id}
                          onPress={() =>
                            navigation.navigate('UProductDetails', {
                              product: item,
                            })
                          }>
                          <View style={style.imageContainer}>
                            <Image
                              source={{uri: item.imageUrl[0]}}
                              style={style.image}
                            />
                          </View>
                        </TouchableOpacity>
                        <View style={style.cardTextContainer}>
                          <View style={style.Cartcontents}>
                            <Text
                              style={[
                                style.name,
                                colorScheme === 'dark'
                                  ? Styles.whitetext
                                  : Styles.blackText,
                              ]}>
                              {item.name}
                            </Text>
                          </View>

                          <View style={style.textContainer}>
                            <Text style={style.price}>{'₹' + item.price}</Text>
                          </View>
                        </View>

                        <TouchableOpacity
                          style={style.wishlistButton}
                          onPress={() => {
                            if (wishlistList.includes(item.id)) {
                              setWishlistList(
                                wishlistList.filter(id => id !== item.id),
                              );
                            } else {
                              setWishlistList([...wishlistList, item.id]);
                              dispatch(postProductToAPI({...item}) as any);
                            }
                          }}>
                          {wishlistList.includes(item.id) ? (
                            <MaterialIcons
                              size={20}
                              color={'red'}
                              name="cards-heart"
                            />
                          ) : (
                            <MaterialIcons
                              size={20}
                              color={'white'}
                              name="cards-heart"
                            />
                          )}
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  ),
                )}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default CategoryProducts;
