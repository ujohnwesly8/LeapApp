/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import styles from './OwnerHomestyle';
import {Text} from 'react-native';
// import {ScrollView} from 'react-native-gesture-handler';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Colors from '../../constants/colors';
import Donut from '../../components/atoms/DonutChart';
import Lottie from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useAnalytics from '../AnalyticsPage/useAnalytics';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
import Styles from '../../constants/themeColors';
import useOwnerHome from './useOwnerHome';
type Props = {
  route: {name: string};
  navigation: any;
};
const OwnerHome = ({navigation}: Props) => {
  const {
    products,
    name,
    isLoading,
    totalEarnings,
    rentedItems,
    refreshing,
    onRefresh,
    handleAnalatyics,
    recentyAdded,
  } = useOwnerHome();
  const {handleOrders, CategoriePieData, Dashboardyeardata} = useAnalytics();
  const {colorScheme} = useContext(ColorSchemeContext);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [rentedItemsPercentage, setRentedItemsPercentage] =
    useState(rentedItems);
  const [totalEarningsPercentage, setTotalEarningsPercentage] =
    useState(totalEarnings);
  useEffect(() => {
    setRentedItemsPercentage(rentedItems);
    setTotalEarningsPercentage(totalEarnings);
  }, [rentedItems, totalEarnings]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Trigger auto-refresh when navigating to this screen
      setRefreshTrigger(prev => !prev);
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <ScrollView
      style={[
        styles.mainContainer,
        colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
      ]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View>
        <Text
          style={[
            styles.headertxt,
            colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
          ]}>
          Welcome {name}
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Dashboard</Text>
        <View style={styles.rentalitemscard}>
          <Text style={styles.renteditems1}>Rented Items</Text>
          <Text style={styles.renteditems2}>Total Earnings</Text>
        </View>
        <View style={styles.rentalitemscard}>
          {/* <Text style={styles.cardsrentalprices}>{rentedItems}</Text>
          <Text style={styles.cardsTotalprices}>₹{totalEarnings}</Text> */}
          <View style={styles.cardsrentalprices}>
            <Donut
              percentage={rentedItemsPercentage}
              color={Colors.white}
              delay={1000}
              max={200}
              refreshTrigger={refreshTrigger}
              textcolor={Colors.buttonColor}
            />
          </View>
          <View style={styles.cardsTotalprices}>
            <Donut
              percentage={totalEarningsPercentage}
              color={Colors.white}
              delay={1000}
              max={1000000}
              refreshTrigger={refreshTrigger}
              textcolor={Colors.buttonColor}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            handleAnalatyics();
            handleOrders();
            CategoriePieData();
            Dashboardyeardata();
          }}
          style={styles.Viewmore}>
          <Text
            style={{
              color: Colors.white,
              fontSize: 10,
              // marginTop: 3,
              fontFamily: 'Poppins-Medium',
              marginLeft: 20,
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            View More
          </Text>
          <Icon
            name="arrow-forward-ios"
            size={10}
            color="white"
            style={{marginTop: 5}}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Text
          style={[
            styles.headertxt,
            colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
          ]}>
          Recently Added
        </Text>
      </View>
      {isLoading ? (
        <SkeletonPlaceholder
          backgroundColor={colorScheme === 'dark' ? '#373737' : Colors.white}>
          <>
            <ScrollView style={styles.mainContainer}>
              <View></View>
              <TouchableOpacity style={styles.recentlyaddedcard}>
                <View style={styles.cardContainer}>
                  <Text style={styles.recentlyaddedimage}></Text>
                </View>
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTextPrice}></Text>
                  <Text style={styles.cardTextPrice}></Text>
                </View>
              </TouchableOpacity>
              <View>
                {/* Other code */}
                <View
                  style={{
                    marginTop: 20,
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginBottom: 100,
                    width: '100%',
                    flexWrap: 'wrap',
                    backgroundColor: Colors.Inputtext,
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity style={styles.recentlyaddedcard}>
                    <View style={styles.cardContainer}>
                      <Text style={styles.recentlyaddedimage}></Text>
                    </View>
                    <View style={styles.cardTextContainer}>
                      <Text style={styles.cardTextPrice}></Text>
                      <Text style={styles.cardTextPrice}></Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </>
        </SkeletonPlaceholder>
      ) : (
        <>
          {recentyAdded && recentyAdded.length === 0 ? (
            <View style={{height: 200, width: 400}}>
              <Lottie
                source={require('../../../assets/ownerHome.json')}
                autoPlay
              />
            </View>
          ) : (
            <View>
              <FlatList
                data={recentyAdded}
                keyExtractor={item => item.id.toString()}
                horizontal={true}
                renderItem={({item}) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.recentlyaddedcard}
                    onPress={() =>
                      navigation.navigate('OproductDetails', {product: item})
                    }>
                    <View
                      style={[
                        styles.cardContainer,
                        colorScheme === 'dark' ? Styles.cardColor : Styles.main,
                      ]}>
                      <Image
                        source={{uri: item.imageUrl[0]}}
                        style={styles.recentlyaddedimage}
                      />
                    </View>
                    <View
                      style={[
                        styles.cardTextContainer,
                        colorScheme === 'dark' ? Styles.cardColor : Styles.main,
                      ]}>
                      <View
                        style={{
                          width: '100%',
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                        }}>
                        <Text
                          style={[
                            styles.cardText,
                            colorScheme === 'dark'
                              ? Styles.whitetext
                              : Styles.blackText,
                          ]}>
                          {item.name}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={styles.cardTextPrice}>₹ {item.price}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
          <View>
            <Text
              style={[
                styles.headertxt,
                colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
              ]}>
              Rental History
            </Text>
          </View>
          {products && products.length === 0 ? (
            <View style={{height: 200, width: 400}}>
              <Lottie
                source={require('../../../assets/ownerHome.json')}
                autoPlay
              />
            </View>
          ) : (
            <View
              style={[
                {flex: 1, backgroundColor: Colors.main, flexWrap: 'wrap'},
                colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
              ]}>
              {/* Other code */}
              <View
                style={{
                  marginTop: 20,
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginBottom: 100,
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}>
                {products &&
                  products.map(
                    (
                      item: {
                        id: {toString: () => any};
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
                        price:
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
                      },
                      index: any,
                    ) => (
                      <TouchableOpacity
                        key={`${item.id.toString()}-${index}`}
                        style={styles.recentlyaddedcard}
                        onPress={() =>
                          navigation.navigate('OproductDetails', {
                            product: item,
                          })
                        }>
                        <View style={styles.cardContainer}>
                          <Image
                            source={{uri: item.imageUrl[0]}}
                            style={styles.recentlyaddedimage}
                          />
                        </View>
                        <View
                          style={[
                            styles.cardTextContainer,
                            colorScheme === 'dark'
                              ? Styles.cardColor
                              : Styles.main,
                          ]}>
                          <Text
                            style={[
                              styles.cardText,
                              colorScheme === 'dark'
                                ? Styles.whitetext
                                : Styles.blackText,
                            ]}>
                            {item.name}
                          </Text>
                          <Text style={styles.cardTextPrice}>
                            ₹ {item.price}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ),
                  )}
              </View>
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
};
export default OwnerHome;
