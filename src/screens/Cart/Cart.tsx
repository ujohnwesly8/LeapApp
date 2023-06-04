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
import CustomModal from '../../components/atoms/CustomModel/CustomModel';
import Lottie from 'lottie-react-native';
import {ReactNode, useState} from 'react';
import Styles from '../../constants/themeColors';
import DateRangePicker from '../../components/atoms/CalanderPicker';
import DatePicker from '../../components/atoms/DatePicker Detail';
import CardDatePiker from '../../components/atoms/DatePicker';
import CalendarPicker from 'react-native-calendar-picker';
import HeadingText from '../../components/atoms/HeadingText/HeadingTest';
import React from 'react';

type Props = {
  route: {params: {product: any}};
  navigation: any;
};
const Cart = ({navigation}: Props) => {
  // const {productData} = route.params;
  const {
    CartProducts,
    handleCheckout,
    handlecartstate,
    colorScheme,
    handleRemove,
    refreshing,
    onRefresh,
    closeModal,
    showModal,
    iscartVisible,
    setRentalStartDate,
    setRentalEndDate,
    rentalEndDate,
    rentalStartDate,
    quantity,
    handleDecrement,
    handleIncrement,
    setProductQuantity,
    isLoading,
    isplusDisable,
  } = useCart();
  // const cartData = useSelector(state => state.CartProducts.data);
  // console.log('cartItems:', cartData);
  const cartData = useSelector(state => state.CartProducts.data) || {
    cartItems: [],
  };
  const productQuantities = cartData.cartItems.map(item => item.quantity);
  // setProductQuantity(productQuantities);

  const Quantity = productQuantities;
  if (CartProducts && CartProducts.cartItems) {
    console.log('Product Quantity:');
    CartProducts.cartItems.forEach(item => {
      console.log(`- Quantity for item with ID ${item.id}: ${item.quantity}`);
    });
  } else {
    console.log('CartProducts is null or undefined.');
  }

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
          <ScrollView
            style={style.ScrollContainer}
            // refreshControl={
            //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            // }
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
                          {/* <View style={style.productSizeBox}> */}
                          <Text
                            style={[
                              style.detailsdescription,
                              colorScheme === 'dark'
                                ? Styles.whitetext
                                : Styles.blackText,
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
                          <CardDatePiker
                            startDate={item.rentalStartDate?.toLocaleString()}
                            endDate={item.rentalEndDate?.toLocaleString()}
                            onStartDateChange={setRentalStartDate}
                            onEndDateChange={setRentalEndDate}
                          />
                        </View>
                        <View style={style.removeAndQuantity}>
                          {/* <View style={style.RemoveContainer}> */}
                          {console.log(isplusDisable)}
                          <TouchableOpacity
                            style={style.RemoveButton}
                            onPress={() => handleRemove(item.product.id)}>
                            <Text style={style.RemoveButtonText}>Remove</Text>
                          </TouchableOpacity>
                          {/* </View> */}
                          <View style={style.quantityContainer}>
                            <TouchableOpacity
                              onPress={() => handleDecrement(item)}
                              style={style.quantityButton}>
                              {/* <View> */}
                              <Icon name="minus" color={'white'} size={10} />
                              {/* </View> */}
                            </TouchableOpacity>
                            {/* <View> */}
                            {/* {console.log('Quantity is ', Quantity)} */}
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
                            {/* </View> */}
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
            {/* <Text>Total Amount</Text> */}
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
              style={[style.PaymentButton, !iscartVisible && style.Disabled]}
              onPress={handlecartstate}
              disabled={true}>
              <Text style={style.PaymentButtonText}>Checkout</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[style.PaymentButton, iscartVisible && style.Disabled]}
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
