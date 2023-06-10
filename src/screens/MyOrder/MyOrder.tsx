import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import React, {useContext} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Lottie from 'lottie-react-native';
import style from './myOrderStyles';
import useMyOrder from './useMyOrder';
import Styles from '../../constants/themeColors';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
import Colors from '../../constants/Colors';

type Props = {
  route: {name: string};
  navigation: any;
};

type OrderDetailsModalProps = {
  order: any;
  onClose: () => void;
  visible: boolean;
};

const MyOrder = ({navigation}: Props) => {
  const {
    orderData,
    OrderProducts,
    showModal,
    refreshing,
    selectedOrder,
    isModalOpen,
    isLoading,
    onRefresh,
    openModal,
    closeModal,
  } = useMyOrder();
  const {colorScheme} = useContext(ColorSchemeContext);

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

  return (
    <>
      <ScrollView
        style={[
          style.container,
          colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
        ]}>
        <View style={style.titleContainer}>
          <TouchableOpacity
            style={style.backButton}
            onPress={() => navigation.navigate('Profile')}>
            <Icons name="arrow-back-ios" size={16} color="black" />
          </TouchableOpacity>
          <Text
            style={[
              style.titleText,
              colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
            ]}>
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
                    key={`${order.id}-${item.id}`}
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

const OrderDetailsModal = ({
  order,
  onClose,
  visible,
}: OrderDetailsModalProps) => {
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
          style.viewStyle,
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
              {order.orderItems.map((item: any) => (
                <View
                  style={[
                    style.viewS,
                    colorScheme === 'dark' ? Styles.cardColor : Styles.main,
                  ]}
                  key={item.id}>
                  <Image source={{uri: item.imageUrl}} style={style.image} />
                  <View style={style.marginM}>
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
