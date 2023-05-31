/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  StatusBar,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  useColorScheme,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from '../../components/atoms/DatePicker Detail';
// import {ScrollView} from 'react-native-gesture-handler';
import styles from './UProductDetailsStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {OwnerProductsById, ProductsById, url} from '../../constants/Apis';
import CustomModal from '../../components/atoms/CustomModel/CustomModel';
import Styles from '../../constants/themeColors';
import Colors from '../../constants/Colors';
import DateRangePicker from '../../components/atoms/CalanderPicker';
import CalendarPicker from 'react-native-calendar-picker';
import {useNavigation} from '@react-navigation/native';
import ApiService from '../../network/network';
import useCart from '../Cart/useCart';
import {Pagination} from 'react-native-snap-carousel';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
type Props = {
  route: {params: {product: any}};
  navigation: any;
};
export default function UDetailScreen({route, navigation}: Props) {
  const {product} = route.params;
  const [rentalStartDate, setRentalStartDate] = useState(new Date());
  const [rentalEndDate, setRentalEndDate] = useState(new Date());
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showwModal, settShowModal] = useState(false);
  const [, setIsQuantity] = useState(true);
  const [isMinusDisabled, setIsMinusDisabled] = useState(true);
  const [isPlusDisabled, setIsPlusDisabled] = useState(false);
  const [productData, setProductData] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const Quantity = product.quantity;
  const {colorScheme} = useContext(ColorSchemeContext);
  // const {fetchQuantityData} = useCart();
  // const navigation = useNavigation();
  useEffect(() => {
    console.log(colorScheme);
  });
  console.log('Product Quantity is :', Quantity);
  const handleDecrement = () => {
    setQuantity(quantity - 1);
    setIsQuantity(true);
    if (quantity === 1) {
      setIsMinusDisabled(true);
    }
    setIsPlusDisabled(false);
  };
  const handleIncrement = () => {
    setQuantity(quantity + 1);
    setIsQuantity(true);
    if (quantity === product.quantity - 1) {
      setIsPlusDisabled(true);
    }
    setIsMinusDisabled(false);
  };
  console.log(product.id);
  const ProductId = product.id;
  const productsData = async () => {
    const result = await ApiService.get(`${ProductsById}/${ProductId}`);
    console.log('result is :', result);
    setProductData(result);
  };

  const handleSubmit = async () => {
    const item = {
      productId: product.id,
      quantity: quantity,
      rentalEndDate: rentalEndDate.toISOString(),
      rentalStartDate: rentalStartDate.toISOString(),
    };
    const token = await AsyncStorage.getItem('token');
    fetch(`${url}/cart/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(item),
    })
      .then(response => {
        console.log('Success:', response);
        if (response.status === 400) {
          opennModal();
        }
        console.log(response);
        return response.json();
      })
      .then(data => {
        console.log('Data:', data);
        openModal();
      })
      .catch(error => {
        console.log(error);
        // console.error('Error:', error);
      });
  };
  const openModal = () => {
    setShowModal(true);
  };
  const opennModal = () => {
    settShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    // navigation.navigate('CartScreen');
    productsData();
    // fetchQuantityData();
  };
  const closeeModal = () => {
    settShowModal(false);
  };
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollTimerRef = useRef<number | null>(null);
  useEffect(() => {
    startScrollTimer();
    return () => {
      stopScrollTimer();
    };
  }, [activeIndex]);
  const startScrollTimer = () => {
    stopScrollTimer(); // Stop the timer if it's already running
    scrollTimerRef.current = setInterval(scrollToNextImage, 2000); // Adjust the duration as needed (in milliseconds)
  };
  const stopScrollTimer = () => {
    if (scrollTimerRef.current) {
      clearInterval(scrollTimerRef.current);
      scrollTimerRef.current = null;
    }
  };
  const scrollToNextImage = () => {
    if (scrollViewRef.current) {
      const nextIndex =
        activeIndex === product.imageUrl.length - 1 ? 0 : activeIndex + 1;
      scrollViewRef.current.scrollTo({x: nextIndex * 405, animated: true});
      // Adjust the width of the images as needed
      setActiveIndex(nextIndex);
    }
  };
  const handleScroll = () => {
    startScrollTimer();
  };

  return (
    <ScrollView
      style={{
        width: '100%',
        backgroundColor: colorScheme === 'dark' ? Colors.black : Colors.white,
      }}>
      <View
        style={[
          styles.container,
          colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
        ]}>
        <StatusBar translucent backgroundColor={'rgba(0,0,0,0)'} />
        <View style={styles.dheader}>
          <Icon
            name="arrow-back-ios"
            size={28}
            color="black"
            onPress={() => navigation.goBack()}
          />
        </View>
        <View>
          <ScrollView
            nestedScrollEnabled
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onMomentumScrollEnd={event => {
              const contentOffset = event.nativeEvent.contentOffset;
              const nextIndex = Math.round(contentOffset.x / 405);
              setActiveIndex(nextIndex);
              startScrollTimer();
            }}
            onScroll={handleScroll}>
            {product.imageUrl.map((item, index) => (
              <ImageBackground
                key={index}
                style={{
                  height: 500,
                  width: 405,
                  backgroundColor: '#3E54AC1A',
                }}
                source={{uri: item}}
              />
            ))}
          </ScrollView>
          <Text style={styles.startext}>{product.name}</Text>
          <Pagination
            dotsLength={product.imageUrl.length}
            activeDotIndex={activeIndex}
            containerStyle={styles.paginationContainer}
            dotStyle={styles.pagingActiveText}
            inactiveDotStyle={styles.pagingText}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
        </View>
        <View
          style={[
            styles.detailsContainer,
            colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
          ]}>
          <Text
            style={[
              styles.detailsPrice,
              colorScheme === 'dark' ? Styles.priceTect : Styles.priceTect,
            ]}>
            ₹{product.price}
          </Text>
          <Text
            style={[
              styles.detailsdescription,
              colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
            ]}>
            {product.description}
          </Text>
          {/* <View style={{marginTop: 10}}>
            <Text style={styles.headingtext}>Size</Text>
          </View>
          <View style={styles.productSizeBox}>
            <Text style={styles.detailsSize}>{product.size}</Text>
          </View> */}
          <View style={{marginTop: 10, marginBottom: 20, flexDirection: 'row'}}>
            <Text
              style={[
                styles.headingtext,
                {marginTop: 10},
                colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
              ]}>
              Rent
            </Text>
            <DateRangePicker
              startDate={rentalStartDate}
              endDate={rentalEndDate}
              onStartDateChange={setRentalStartDate}
              onEndDateChange={setRentalEndDate}
            />
          </View>
          <View
            style={[
              styles.size,
              colorScheme === 'dark' ? Styles.cardColor : Styles.main,
            ]}>
            <Text
              style={[
                styles.sizelabel,
                colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
              ]}>
              Size
            </Text>
            <View
              style={{
                marginTop: 3,
                // backgroundColor: Colors.buttonColor,
                width: 40,
                // height: 25,
                borderRadius: 5,
                marginLeft: '60%',
                justifyContent: 'center',
              }}>
              <Text
                style={[
                  styles.detailsSize,
                  colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
                ]}>
                {product.size}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.quantityContainer,
              colorScheme === 'dark' ? Styles.cardColor : Styles.main,
            ]}>
            <View>
              <Text
                style={[
                  styles.Quatitytext,
                  colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
                ]}>
                Quantity
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.quantityButton,
                isMinusDisabled && styles.disabledButton,
              ]}
              onPress={handleDecrement}
              disabled={quantity === 1 || isMinusDisabled}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text
              style={[
                styles.quantityText,
                colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
              ]}>
              {quantity}
            </Text>
            <TouchableOpacity
              style={[
                styles.plusquantityButton,
                isPlusDisabled && styles.disabledButton,
              ]}
              onPress={handleIncrement}
              disabled={quantity === Quantity || isPlusDisabled}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.touchablebtnContainer}>
            <TouchableOpacity
              style={styles.touchablebtn}
              onPress={handleSubmit}>
              <Text style={styles.detailsaddPrice}>
                ₹{product.price * quantity}
              </Text>
              <Text style={styles.touchableText}>Add to Bag</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <CustomModal
        showModal={showModal}
        onClose={closeModal}
        message="Item added successfully!"
      />
      <CustomModal
        showModal={showwModal}
        onClose={closeeModal}
        message="Quantity is unavailable"
      />
    </ScrollView>
  );
}
