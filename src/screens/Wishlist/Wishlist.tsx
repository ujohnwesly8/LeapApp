/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
// import CartItem from '../Cart/CartItem';
import useWishlist from './useWishlist';
import style from './wishlistStyles';
import {useSelector} from 'react-redux';
import Colors from '../../constants/Colors';
import Lottie from 'lottie-react-native';
import Styles from '../../constants/themeColors';
type Props = {
  route: {name: string};
  navigation: any;
};
const Wishlist = ({navigation}: Props) => {
  const {
    WishlistProducts,
    removefromWishlist,
    // isLoading,
  } = useWishlist();

  console.log('hey', allWishlistProducts);

  return (
    <View
      style={[
        style.maincontainer,
      ]}>
      <ScrollView>
        <Text
          style={[
            style.textStylewishlist,
          ]}>
          Wishlist
        </Text>
        <View
          style={[
            style.textConatiner,
          ]}>
        </View>
        ) : (
          <View
            style={[
              style.maincontainer,
            ]}>
            <View
              style={{
                // flex: 1,
                // flexDirection: 'row',
                // backgroundColor: '#ECF2FF',
                width: '100%',
                // flexWrap: 'wrap',
              }}>
              {/* Other code */}
              <View
                style={{
                  // marginTop: 20,
                  alignItems: 'center',
                  flexDirection: 'row',
                  // marginBottom: 100,
                  width: '100%',
                  flexWrap: 'wrap',
                  // justifyContent: 'space-between',
                }}>
                {allWishlistProducts &&
                  allWishlistProducts.map(
                    (
                      item: {
                        imageUrl: any[];
                        name:
                          | string
                          | number
                          | boolean
                          | React.ReactElement<
                              any,
                              string | React.JSXElementConstructor<any>
                            >
                          | React.ReactFragment
                          | React.ReactPortal
                          | null
                          | undefined;
                        price: string;
                        id: any;
                      },
                      index: React.Key | null | undefined,
                    ) => {
                      return (
                        <View
                          style={{
                            width: '50%',
                            // backgroundColor: Colors.green,
                            flexDirection: 'row',
                          }}
                          key={index}>
                          <View
                            style={[
                              style.container,
                            ]}>
                            <TouchableOpacity
                              // style={{width: '100%', height: '20%'}}
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
                                  ]}>
                                  {item.name}
                                </Text>
                              </View>
                              <View
                                style={[
                                  style.textContainer,
                                ]}>
                                <Text style={style.price}>
                                  {'₹' + item.price}
                                </Text>
                              </View>
                            </View>
                            <TouchableOpacity
                              style={style.wishlistButton}>
                              <Image
                                source={require('../../../assets/fillheart.png')}
                                style={{width: 24, height: 24}}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      );
                    },
                  )}
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Wishlist;
