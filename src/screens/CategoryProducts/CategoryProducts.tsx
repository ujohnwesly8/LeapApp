import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Lottie from 'lottie-react-native';
import style from './categoryStyles';
import useCategoryProducts from './useCategoryProducts';
import HeadingText from '../../components/atoms/HeadingText/HeadingTest';
import Styles from '../../constants/themeColors';
import {ColorSchemeContext} from '../../../ColorSchemeContext';

type RootStackParamList = {
  CategoryProducts: {subcategoryId: number};
  UProductDetails: {product: any};
  ProfileScreen: {screen: any};
};

const CategoryProducts = ({route}: any) => {
  const {subcategoryId} = route.params;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {subcategories, wishlistList, colorScheme, toggleWishlist} =
    useCategoryProducts(subcategoryId);
  const {getTextColor, getTextInputStyle} = useContext(ColorSchemeContext);
  return (
    <ScrollView
      style={[
        style.maincontainer,
        colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
      ]}>
      <HeadingText message={'Products'} />
      <View style={style.direction}>
        {subcategories && subcategories.length === 0 ? (
          <View>
            <Lottie
              style={style.lottieS}
              source={require('../../../assets/productsEmpty.json')}
              autoPlay
            />
            <Text style={[style.loadtextStyle, getTextColor()]}>
              Products are not Available Right Now
            </Text>
          </View>
        ) : (
          <View style={style.outerView}>
            <View style={style.viewS}>
              {subcategories.map(
                (item: {
                  id: number;
                  imageUrl: string[];
                  name: string;
                  price: number;
                }) => (
                  <TouchableOpacity
                    style={style.size}
                    key={item.id.toString()}
                    onPress={() =>
                      navigation.navigate('UProductDetails', {
                        product: item,
                      })
                    }>
                    <View style={[style.container, getTextInputStyle()]}>
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
                          <Text style={[style.name, getTextColor()]}>
                            {item.name}
                          </Text>
                        </View>
                        <View style={style.textContainer}>
                          <Text style={style.price}>{'₹' + item.price}</Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        style={style.wishlistButton}
                        onPress={() => toggleWishlist(item.id)}>
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
