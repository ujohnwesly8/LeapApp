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
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './UProductDetailsStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {OwnerProductsById, ProductsById, url} from '../../constants/Apis';
import Styles from '../../constants/themeColors';
import Colors from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import useCart from '../Cart/useCart';
import {Pagination} from 'react-native-snap-carousel';
type Props = {
  route: {params: {product: any}};
  navigation: any;
};
export default function UDetailScreen({route, navigation}: Props) {
  const {product} = route.params;
  const [productData, setProductData] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const Quantity = product.quantity;
  // const {fetchQuantityData} = useCart();
  // const navigation = useNavigation();
  console.log('Product Quantity is :', Quantity);
  console.log(product.id);
  const ProductId = product.id;
  const productsData = async () => {
    console.log('result is :', result);
    setProductData(result);
  };

  const handleSubmit = async () => {
    const item = {
      productId: product.id,
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
        }
        console.log(response);
        return response.json();
      })
      .then(data => {
        console.log('Data:', data);
      })
      .catch(error => {
        console.log(error);
        // console.error('Error:', error);
      });
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
      }}>
      <View
        style={[
          styles.container,
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
          ]}>
          <Text
            style={[
              styles.detailsPrice,
            ]}>
            ₹{product.price}
          </Text>
          <Text
            style={[
              styles.detailsdescription,
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
              ]}>
              Rent
            </Text>
          </View>
          <View
            style={[
              styles.size,
            ]}>
            <Text
              style={[
                styles.sizelabel,
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
                ]}>
                {product.size}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.quantityContainer,
            ]}>
            <View>
              <Text
                style={[
                  styles.Quatitytext,
                ]}>
                Quantity
              </Text>
            </View>
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
    </ScrollView>
  );
}
