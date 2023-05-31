/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import style from './Myorderstyles';
import Colors from '../../constants/Colors';
import {fetchOrderProducts} from '../../redux/slice/orderSlice';
import Lottie from 'lottie-react-native';
import HeadingText from '../../components/atoms/HeadingText/HeadingTest';
import useCart from '../Cart/useCart';
import Styles from '../../constants/themeColors';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
type Props = {
  route: {name: string};
  navigation: any;
};
const MyOrder = ({navigation}: Props) => {
  const dispatch = useDispatch();
  const orderData = useSelector(state => state.OrderProducts.data);
  const OrderProducts = useSelector(state => state.OrderProducts.data);
  const [showModal, setShowModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // New state variable
  const {colorScheme} = useContext(ColorSchemeContext);
  const [isLoading, setIsLoading] = useState(true);
  const onRefresh = async () => {
    setRefreshing(true);
    dispatch(fetchOrderProducts());
    setRefreshing(false);
  };
  useEffect(() => {
    dispatch(fetchOrderProducts());
  }, [dispatch]);
  const openModal = order => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };
  useEffect(() => {
    const fetchOrderData = async () => {
      setIsLoading(true);
      await dispatch(fetchOrderProducts());
      setIsLoading(false);
    };

    fetchOrderData();
  }, [dispatch]);

  const closeModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };
  {
    console.log('isLoading is :', isLoading);
  }

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colorScheme === 'dark' ? Colors.black : Colors.main,
        }}>
        <Lottie
          source={require('../../../assets/loading2.json')}
          autoPlay
          style={{
            height: 200,
            width: 200,
            alignSelf: 'center',
            marginTop: '50%',
            justifyContent: 'center',
          }}
        />
        <Text style={{color: Colors.white, marginLeft: '30%'}}>
          The Items are Loading...
        </Text>
      </View>
    );
  }

  // if (!OrderProducts) {
  //   return (
  //     <View style={style.loadingContainer}>
  //       <Lottie
  //         source={require('../../../assets/order1.json')}
  //         autoPlay
  //         style={style.loadingAnimation}
  //       />
  //       <Text style={style.loadingText}>The Items are Loading...</Text>
  //     </View>
  //   );
  // }
  return (
    <>
      {/* <HeadingText message="Your orders" /> */}
      <ScrollView
        style={[
          style.container,
          colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
        ]}>
        <View style={style.titleContainer}>
          <TouchableOpacity
            style={style.backButton}
            onPress={() => navigation.navigate('Profile')}>
            <Icons
              // style={{marginLeft: 5}}
              name="arrow-back-ios"
              size={16}
              color="black"
              // onPress={() => navigation.goBack()}
            />
          </TouchableOpacity>
          <Text
            style={[
              style.titleText,
              colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
            ]}>
            {' '}
            My orders
          </Text>
        </View>
        <ScrollView
          style={[
            style.mainContainer,
            colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
          ]}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {OrderProducts.length === 0 ? (
            <View style={style.noAddressContainer1}>
              <View style={style.titleTextContainer1}>
                <Lottie
                  style={style.imageS1}
                  source={require('../../../assets/order2.json')}
                  autoPlay
                />
              </View>
              <View style={style.textContainer1}>
                <Text style={style.noAddressText1}>
                  Hey, it feels so light!
                </Text>
              </View>
            </View>
          ) : (
            OrderProducts.map((order: any) => (
              <TouchableOpacity
                key={order.id}
                style={[
                  style.cardContainer,
                  colorScheme === 'dark' ? Styles.cardColor : Styles.main,
                ]}
                onPress={() => openModal(order)}
                disabled={isModalOpen}>
                {order.orderItems.map((item: any) => (
                  <TouchableOpacity
                    key={`${order.id}-${item.id}`} // Update the key to include both order.id and item.id
                    style={style.cardTextContainer}
                    onPress={() => openModal(order)}
                    disabled={isModalOpen}>
                    <View style={style.orderInfoContainer}>
                      <Text
                        style={[
                          style.productName,
                          colorScheme === 'dark'
                            ? Styles.whitetext
                            : Styles.blackText,
                        ]}>
                        Order Id: {item.id}
                      </Text>
                      <View style={{flexDirection: 'row'}}>
                        <Text
                          style={[
                            style.plcedText,
                            colorScheme === 'dark'
                              ? Styles.whitetext
                              : Styles.blackText,
                          ]}>
                          Order placed at :
                        </Text>
                        <Text
                          style={[
                            style.orderDate,
                            colorScheme === 'dark'
                              ? Styles.whitetext
                              : Styles.blackText,
                          ]}>
                          {item.createdDate}
                        </Text>
                      </View>
                      <Text style={style.priceText}>{item.status}</Text>
                    </View>
                    <View>
                      <Icon
                        name="ios-arrow-forward"
                        size={20}
                        style={[
                          style.arrowIcon,
                          colorScheme === 'dark'
                            ? Styles.whitetext
                            : Styles.blackText,
                        ]}
                      />
                    </View>
                  </TouchableOpacity>
                ))}
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </ScrollView>
      <OrderDetailsModal
        order={selectedOrder}
        onClose={closeModal}
        visible={isModalOpen}
      />
    </>
  );
};
const OrderDetailsModal = ({order, onClose, visible}) => {
  const {colorScheme} = useContext(ColorSchemeContext);
  if (!visible) {
    return null;
  }

  return (
    <Modal
      visible={true}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}>
      <View
        style={[
          {backgroundColor: Colors.main},
          colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
        ]}>
        <TouchableOpacity style={style.closeButton} onPress={onClose}>
          <Text style={style.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
      <View
        style={[
          {backgroundColor: Colors.main, width: '100%', height: '120%'},
          colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
        ]}>
        <View style={style.modalContainer}>
          <ScrollView style={{flex: 1}}>
            <View style={{marginTop: 10}}>
              <Text
                style={[
                  style.totalOrderText,
                  colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
                ]}>
                Order ID: {order.id}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={[
                    style.totalOrderText,
                    colorScheme === 'dark'
                      ? Styles.whitetext
                      : Styles.blackText,
                  ]}>
                  Total Price: {'₹' + order.totalPrice}
                </Text>
              </View>
              {order.orderItems.map(item => (
                <View
                  style={[
                    {
                      flexDirection: 'row',
                      width: '90%',
                      height: 150,
                      borderRadius: 10,
                      marginBottom: 10,
                    },
                    colorScheme === 'dark' ? Styles.cardColor : Styles.main,
                  ]}
                  key={item.id}>
                  <Image source={{uri: item.imageUrl}} style={style.image} />
                  <View style={{marginTop: 10, marginLeft: 10}}>
                    <Text
                      style={[
                        style.productname,
                        colorScheme === 'dark'
                          ? Styles.priceTect
                          : Styles.blackText,
                      ]}>
                      {item.name}
                    </Text>
                    <Text
                      style={[
                        style.QuantityText,
                        colorScheme === 'dark'
                          ? Styles.whitetext
                          : Styles.blackText,
                      ]}>
                      Quantity: {item.quantity}
                    </Text>
                    <Text
                      style={[
                        style.QuantityText,
                        colorScheme === 'dark'
                          ? Styles.whitetext
                          : Styles.blackText,
                      ]}>
                      {item.rentalStartDate}
                    </Text>
                    <Text
                      style={[
                        style.QuantityText,
                        colorScheme === 'dark'
                          ? Styles.whitetext
                          : Styles.blackText,
                      ]}>
                      {item.rentalEndDate}
                    </Text>
                    <Text style={[style.orderText]}>{item.status}</Text>
                    {/* <Text style={style.productname}>Size: {item.size}</Text> */}
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
export default MyOrder;