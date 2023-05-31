/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
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
  const [refreshing, setRefreshing] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
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
 
  useEffect(() => {
    const fetchOrderData = async () => {
      setIsLoading(true);
      await dispatch(fetchOrderProducts());
      setIsLoading(false);
    };

    fetchOrderData();
  }, [dispatch]);

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
               >
                {order.orderItems.map((item: any) => (
                  <TouchableOpacity
                    key={`${order.id}-${item.id}`} // Update the key to include both order.id and item.id
                    style={style.cardTextContainer}
                  >
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
    </>
  );
};

export default MyOrder;