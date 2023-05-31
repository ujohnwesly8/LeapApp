/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useCart from './useCart';
import style from './CartItemStyles';
import Colors from '../../constants/Colors';
import Lottie from 'lottie-react-native';
import {ReactNode, useState} from 'react';
import Styles from '../../constants/themeColors';
import HeadingText from '../../components/atoms/HeadingText/HeadingTest';

type Props = {
  route: {params: {product: any}};
  navigation: any;
};
const Cart = ({navigation}: Props) => {
  // const {productData} = route.params;
  const {
    CartProducts,
    handleCheckout,
    handleRemove,
    isLoading,
  } = useCart();
  // const cartData = useSelector(state => state.CartProducts.data);
  // console.log('cartItems:', cartData);
  const cartData = useSelector(state => state.CartProducts.data) || {
    cartItems: [],
  };
  const productQuantities = cartData.cartItems.map(item => item.quantity);
  // setProductQuantity(productQuantities);

  console.log('Product Quantity is', productQuantities);

  if (!cartData) {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          backgroundColor: Colors.main,
        }}>
        <Lottie
          source={require('../../../assets/loading2.json')}
          autoPlay
          style={{
            height: 200,
            width: 200,
            alignItems: 'center',
            marginLeft: 5,
            justifyContent: 'center',
          }}
        />
        <Text style={{color: Colors.iconscolor}}>The Items are Loading...</Text>
      </View>
    );
  }
  return (
    <>
        <View>
          <ScrollView
            style={style.ScrollContainer}
          >
            {cartData?.cartItems.length === 0 ? (
              <View style={style.noAddressContainer1}>
                <View style={style.titleTextContainer1}>
                  <Lottie
                    style={style.imageS1}
                    autoPlay
                    source={require('../../../assets/emptycart.json')}
                  />
                </View>
                <View style={style.textContainer1}>
                  <Text
                    style={[
                      style.noAddressText1,
                    ]}>
                    Hey,it feels so light!
                  </Text>
                </View>
              </View>
            ) : (
              <View>
                {cartData?.cartItems?.map(
                  (
                    item: {
                      rentalEndDate: ReactNode;
                      rentalStartDate: ReactNode;
                      product: {
                        imageURL: any;
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
                        id: any;
                        size:
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
                      };
                    },
                    index: React.Key | null | undefined,
                  ) => (
                    <View
                      key={index}
                      style={[
                        style.cardContainer,
                      ]}>
                      <View style={style.imageContainer}>
                        <Image
                          source={{uri: item.imageUrl}}
                          style={style.image}
                        />
                      </View>
                      <View style={style.subContainer}>
                        <View style={style.cardTextContainer}>
                          <View style={{width: 100, height: 20}}>
                            <Text
                              style={[
                                style.productname,
                              ]}>
                              {item.product.name}
                            </Text>
                          </View>
                          <Text
                            style={[
                              style.name,
                            ]}>
                            Rent{' '}
                          </Text>
                          <Text style={style.priceText}>
                            {'₹' + item.product.price}
                          </Text>
                        </View>
                        <View style={[style.sizeContainer]}>
                          <Text
                            style={[
                              style.sizeText,
                            ]}>
                            Size
                          </Text>
                          {/* <View style={style.productSizeBox}> */}
                          <Text
                            style={[
                              style.detailsdescription,
                            ]}>
                            {item.product.size}
                          </Text>
                          {/* <View style={{flexDirection: 'row'}}>
                            <View style={style.DateContainer}>
                              <Text style={style.DateTxt}>
                                {item.rentalStartDate?.toLocaleString()}
                              </Text>
                            </View>
                            <View style={style.DateContainer}>
                              <Text style={style.DateTxt}>
                                {item.rentalEndDate?.toLocaleString()}
                              </Text>
                            </View>
                          </View> */}
                        </View>
                        <View style={style.removeAndQuantity}>
                          <TouchableOpacity
                            style={style.RemoveButton}
                            onPress={() => handleRemove(item.product.id)}>
                            <Text style={style.RemoveButtonText}>Remove</Text>
                          </TouchableOpacity>
                          {/* </View> */}
                        </View>
                      </View>
                    </View>
                  ),
                )}
              </View>
            )}
          </ScrollView>
          <View style={style.GrandtotalContainer}>
            <Text
              style={[
                style.GrandtotalText,              ]}>
              Grand Total
            </Text>
            {/* <Text>Total Amount</Text> */}
            <View style={{width: 100, height: 25}}>
              <Text
                style={[
                  style.priceTotalText,
                ]}>
                ₹ {cartData.totalCost}
              </Text>
            </View>
          </View>
        </View>
        <View>
          {cartData.cartItems.length === 0 ? (
          ) : (
          )}
        </View>
      </View>
    </>
  );
};

export default Cart;
