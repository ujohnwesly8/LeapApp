/* eslint-disable react-native/no-inline-styles */

import React, {useContext} from 'react';
import {
  StatusBar,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomModal from '../../components/atoms/CustomModel/CustomModel';
import {Pagination} from 'react-native-snap-carousel';

import {ColorSchemeContext} from '../../../ColorSchemeContext';
import useProductdetails from './useProductdetails';
import DatePickerComponent from '../../components/atoms/DatePickerComponent/DatepickerComponent';

import styles from './UProductDetailsStyle';
type Props = {
  route: {params: {product: any}};
  navigation: any;
};
const UDetailScreen = ({route, navigation}: Props) => {
  const {product} = route.params;
  const {getContainerStyle, getTextInputStyle, getTextColor} =
    useContext(ColorSchemeContext);
  const {
    rentalStartDate,
    setRentalStartDate,
    rentalEndDate,
    setRentalEndDate,
    quantity,
    showModal,
    showwModal,
    isMinusDisabled,
    isPlusDisabled,
    handleDecrement,
    handleIncrement,
    handleSubmit,
    closeModal,
    closeeModal,
    scrollViewRef,
    setActiveIndex,
    activeIndex,
    startScrollTimer,
    handleScroll,
  } = useProductdetails(product);
  const Quantity = product.quantity;
  return (
    <ScrollView
      style={[
        {
          width: '100%',
        },
        getContainerStyle(),
      ]}>
      <View style={[styles.container, getContainerStyle()]}>
        <StatusBar translucent backgroundColor={'rgba(0,0,0,0)'} />
        <View style={styles.dheader}>
          <Icon
            name="arrow-back-ios"
            size={28}
            color="black"
            testID="back-button"
            onPress={() => navigation.goBack()}
          />
        </View>
        <View>
          <ScrollView
            nestedScrollEnabled
            ref={scrollViewRef}
            horizontal
            testID="scroll-view"
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
            {product.imageUrl.map((item: any) => (
              <ImageBackground
                key={item}
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
        <View style={[styles.detailsContainer, getTextColor()]}>
          <Text style={[styles.detailsPrice]}>₹{product.price}</Text>
          <Text style={[styles.detailsdescription, getTextColor()]}>
            {product.description}
          </Text>
          <View style={{marginTop: 10, marginBottom: 20, flexDirection: 'row'}}>
            <Text style={[styles.headingtext, {marginTop: 10}, getTextColor()]}>
              Rent
            </Text>
            <DatePickerComponent
              startDate={rentalStartDate}
              endDate={rentalEndDate}
              onStartDateChange={setRentalStartDate}
              onEndDateChange={setRentalEndDate}
              buttonStyle={styles.datePickerstyles}
              buttonTextColor={styles.datepickerTextcolor}
            />
          </View>
          <View style={[styles.size, getTextInputStyle()]}>
            <Text style={[styles.sizelabel, getTextInputStyle()]}>Size</Text>
            <View style={styles.descriptionContainer}>
              <Text style={[styles.detailsSize, getTextColor()]}>
                {product.size}
              </Text>
            </View>
          </View>
          <View style={[styles.quantityContainer, getTextInputStyle()]}>
            <View>
              <Text style={[styles.Quatitytext, getTextColor()]}>Quantity</Text>
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
            <Text style={[styles.quantityText, getTextColor()]}>
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
        message="Product already added"
      />
    </ScrollView>
  );
};
export default UDetailScreen;
