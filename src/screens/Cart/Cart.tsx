/* eslint-disable react-native/no-inline-styles */

import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {ReactNode} from 'react';
import Lottie from 'lottie-react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import useCart from './useCart';
import CustomModal from '../../components/atoms/CustomModel/CustomModel';

import Styles from '../../constants/themeColors';
import style from './CartItemStyles';
import Colors from '../../constants/colors';
import DatePickerComponent from '../../components/atoms/DatePickerComponent/DatepickerComponent';

const Cart = () => {
  const {
    CartProducts,
    handleCheckout,
    handleRemove,
    setRentalStartDate,
    setRentalEndDate,
    closeModal,
    showModal,
    colorScheme,
    handleDecrement,
    handleIncrement,
    isplusDisable,
  } = useCart();

  const cartData = useSelector(
    (state: {CartProducts: {data: any}}) => state.CartProducts.data,
  ) || {
    cartItems: [],
  };

  const productQuantities = cartData.cartItems.map(
    (item: {quantity: any}) => item.quantity,
  );

  if (CartProducts && CartProducts.cartItems) {
    console.log('Product Quantity:');
    CartProducts.cartItems.forEach((item: {id: any; quantity: any}) => {
      console.log(`- Quantity for item with ID ${item.id}: ${item.quantity}`);
    });
  } else {
    console.log('CartProducts is null or undefined.');
  }

  console.log('Product Quantity is', productQuantities);

  if (!cartData) {
    return (
      <View style={style.lottiecontainer}>
        <Lottie
          source={require('../../../assets/loading2.json')}
          autoPlay
          style={style.lottie}
        />
        <Text style={{color: Colors.iconscolor}}>The Items are Loading...</Text>
      </View>
    );
  }
  return (
    <>
      <View
        style={[
          style.mainContainer,
          colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
        ]}>
        <Text
          style={[
            style.MainTitleText,
            colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
          ]}>
          Cart
        </Text>
        <View
          style={[
            style.titleContainer,
            colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
          ]}>
          <Text
            style={[
              style.titleText,
              colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
            ]}>
            Cart products ({cartData.cartItems.length}){' '}
          </Text>
        </View>
        <View>
          <ScrollView style={style.ScrollContainer}>
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
                      colorScheme === 'dark'
                        ? Styles.whitetext
                        : Styles.blackText,
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
                      imageUrl: string;
                      quantity: number;
                      product: {
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
                        colorScheme === 'dark' ? Styles.cardColor : Styles.main,
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
                                colorScheme === 'dark'
                                  ? Styles.whitetext
                                  : Styles.blackText,
                              ]}>
                              {item.product.name}
                            </Text>
                          </View>
                          <Text
                            style={[
                              style.name,
                              colorScheme === 'dark'
                                ? Styles.whitetext
                                : Styles.blackText,
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
                              colorScheme === 'dark'
                                ? Styles.whitetext
                                : Styles.blackText,
                            ]}>
                            Size
                          </Text>
                          <Text
                            style={[
                              style.detailsdescription,
                              colorScheme === 'dark'
                                ? Styles.whitetext
                                : Styles.blackText,
                            ]}>
                            {item.product.size}
                          </Text>
                          <DatePickerComponent
                            startDate={item.rentalStartDate?.toLocaleString()}
                            endDate={item.rentalEndDate?.toLocaleString()}
                            onStartDateChange={setRentalStartDate}
                            onEndDateChange={setRentalEndDate}
                            buttonStyle={style.datepickerStyle}
                            buttonTextColor={style.datepickerTextstyle}
                          />
                        </View>
                        <View style={style.removeAndQuantity}>
                          <TouchableOpacity
                            style={style.RemoveButton}
                            onPress={() => handleRemove(item.product.id)}>
                            <Text style={style.RemoveButtonText}>Remove</Text>
                          </TouchableOpacity>
                          <View style={style.quantityContainer}>
                            <TouchableOpacity
                              onPress={() => handleDecrement(item)}
                              style={style.quantityButton}>
                              <Icon name="minus" color={'white'} size={10} />
                            </TouchableOpacity>

                            <View>
                              <Text
                                style={[
                                  style.quantityTxt,
                                  colorScheme === 'dark'
                                    ? Styles.whitetext
                                    : Styles.blackText,
                                ]}>
                                {item.quantity}
                              </Text>
                            </View>
                            {/* </View> */}
                            <TouchableOpacity
                              onPress={() => handleIncrement(item)}
                              disabled={isplusDisable}
                              style={[
                                style.quantityButton,
                                isplusDisable && style.disabled,
                              ]}>
                              <Icon name="plus" color={'white'} size={10} />
                            </TouchableOpacity>
                          </View>
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
                style.GrandtotalText,
                colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
              ]}>
              Grand Total
            </Text>
            <View style={{width: 100, height: 25}}>
              <Text
                style={[
                  style.priceTotalText,
                  colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
                ]}>
                ₹ {cartData.totalCost}
              </Text>
            </View>
          </View>
        </View>
        <View>
          {cartData.cartItems.length === 0 ? (
            <TouchableOpacity
              style={[style.PaymentButton, style.Disabled]}
              disabled={true}>
              <Text style={style.PaymentButtonText}>Checkout</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={style.PaymentButton}
              onPress={handleCheckout}
              disabled={false}>
              <Text style={style.PaymentButtonText}>Checkout</Text>
            </TouchableOpacity>
          )}
        </View>
        <CustomModal
          showModal={showModal}
          onClose={closeModal}
          message="Item Remove From cart!"
        />
      </View>
    </>
  );
};

export default Cart;
