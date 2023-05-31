/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useContext} from 'react';
import Profile from '../../screens/Profile/Profile';
// import Home from '../../screens/Home/Home';
import Homescreen from '../../screens/Home/Homescreen';
// import OwnerEditProfile from "../../screens/Ownereditprofile/Ownereditprofile";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CategoryIcon from 'react-native-vector-icons/AntDesign';
import HeartIcon from 'react-native-vector-icons/FontAwesome';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Wishlist from '../../screens/Wishlist/Wishlist';
import Cart from '../../screens/Cart/Cart';
import {useSelector} from 'react-redux';
import Category from '../../screens/Category/Category';
import UProductDetails from '../../screens/UProductDetails/UProductDetails';
import Subcategory from '../../screens/Subcategory/Subcategory';
import CategoryProducts from '../../screens/CategoryProducts/CategoryProducts';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import CheckoutScreen from '../../screens/CheckoutScreen/CheckoutScreen';
import SearchResultsScreen from '../../screens/SearchResultScreen/SearchResultScreen';
import Owneraddresspage from '../../screens/Owneraddaddress/Owneraddresspage';
import Owneraddaddress from '../../screens/Owneraddaddress/Owneraddaddress';
import Ownereditprofile from '../../screens/Ownereditprofile/Ownereditprofile';
import PaymentSuccessScreen from '../../screens/PaymentScreens/PaymentSuccessScreen';
import PaymentFailScreen from '../../screens/PaymentScreens/PaymentFailScreen';
import {Route, getFocusedRouteNameFromRoute} from '@react-navigation/native';
import MyOrder from '../../screens/MyOrder/MyOrder';
import EditAddress from '../../screens/EditAddress/EditAddress';
import {useIsFocused} from '@react-navigation/native';
import Colors from '../../constants/Colors';
import {View, useColorScheme} from 'react-native';
import Styles from '../../constants/themeColors';
import useCart from '../../screens/Cart/useCart';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Homescreen">
      <Stack.Screen name="Homescreen" component={Homescreen} />
      <Stack.Screen
        name="SearchResultsScreen"
        component={SearchResultsScreen}
      />
      <Stack.Screen name="UProductDetails" component={UProductDetails} />
      <Stack.Screen name="Subcategory" component={Subcategory} />
      <Stack.Screen name="CategoryProducts" component={CategoryProducts} />
    </Stack.Navigator>
  );
};

const CategoryStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Category">
      <Stack.Screen name="Category" component={Category} />
      <Stack.Screen name="Subcategory" component={Subcategory} />
      <Stack.Screen name="CategoryProducts" component={CategoryProducts} />
    </Stack.Navigator>
  );
};

const CartStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Cart">
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      {/* <Stack.Screen name="Homescreen" component={Homescreen} /> */}
      <Stack.Screen
        name="PaymentSuccessScreen"
        component={PaymentSuccessScreen}
      />
      <Stack.Screen name="Owneraddresspage" component={Owneraddresspage} />
      <Stack.Screen name="EditAddress" component={EditAddress} />
      <Stack.Screen name="Owneraddaddress" component={Owneraddaddress} />
      <Stack.Screen name="PaymentFailScreen" component={PaymentFailScreen} />
      {/* <Stack.Screen name="MyOrder" component={MyOrder} /> */}
      <Stack.Screen name="Cart" component={Cart} />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Profile">
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Ownereditprofile" component={Ownereditprofile} />
      <Stack.Screen name="Owneraddresspage" component={Owneraddresspage} />
      <Stack.Screen name="Owneraddaddress" component={Owneraddaddress} />
      <Stack.Screen name="EditAddress" component={EditAddress} />
      <Stack.Screen name="MyOrder" component={MyOrder} />
    </Stack.Navigator>
  );
};

const MyStack = () => {
  const data = useSelector(state => state);
  const {colorScheme} = useContext(ColorSchemeContext);
  const isFocused = useIsFocused();
  console.log(data);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          display: isFocused ? 'flex' : 'none',
          width: '100%',
          height: '8%',
          backgroundColor: Colors.black,
          // marginLeft: -5,
          // backgroundColor: '#ECF2FF',
          // borderTopLeftRadius: 25,
          // borderTopRightRadius: 25,
        },
        tabBarInactiveTintColor: Colors.black,
        tabBarActiveTintColor: Colors.white,
      }}>
      <Tab.Screen
        name="UserHomescreen"
        component={HomeStack}
        options={({route}) => ({
          tabBarStyle: {
            display: getRouteName(route),
            width: '100%',
            height: '8%',
            backgroundColor:
              colorScheme === 'dark' ? Colors.black : Colors.white,
          },
          tabBarLabel: 'Home',
          // headerTintColor: '#ECF2FF',
          tabBarIcon: ({focused, color}) => {
            if (!isFocused) return null;

            let iconComponent;

            if (route.name === 'UserHomescreen') {
              iconComponent = (
                <View
                  style={[
                    {
                      backgroundColor: focused
                        ? Colors.buttonColor
                        : Colors.white,
                      borderRadius: 20,
                      height: 40,
                      width: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                    {
                      backgroundColor: focused
                        ? Colors.buttonColor
                        : colorScheme === 'dark'
                        ? Colors.black
                        : Colors.white,
                    },
                  ]}>
                  <MaterialCommunityIcons
                    style={{
                      color:
                        colorScheme === 'dark' ? Colors.white : Colors.black,
                    }}
                    name="home"
                    size={30}
                  />
                </View>
              );
            } else if (route.name === 'CategoryScreen') {
              iconComponent = (
                <CategoryIcon name="appstore1" color={color} size={25} />
              );
            } else if (route.name === 'Wishlist') {
              iconComponent = (
                <HeartIcon name="heart" color={color} size={25} />
              );
            } else if (route.name === 'CartScreen') {
              iconComponent = (
                <MaterialIcon name="shopping-cart" color={color} size={25} />
              );
            } else if (route.name === 'ProfileScreen') {
              iconComponent = (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={25}
                />
              );
            }

            return iconComponent;
          },
        })}
      />
      <Tab.Screen
        name="CategoryScreen"
        component={CategoryStack}
        options={({route}) => ({
          tabBarStyle: {
            display: getRouteName(route),
            width: '100%',
            height: '8%',
            // marginLeft: -5,
            backgroundColor:
              colorScheme === 'dark' ? Colors.black : Colors.white,
            // borderTopLeftRadius: 25,
            // borderTopRightRadius: 25,
          },
          tabBarLabel: 'Category',
          tabBarIcon: ({focused, color}) => {
            if (!isFocused) return null;

            let iconComponent;

            if (route.name === 'CategoryScreen') {
              iconComponent = (
                <View
                  style={[
                    {
                      backgroundColor: focused
                        ? Colors.buttonColor
                        : Colors.white,
                      borderRadius: 20,
                      height: 40,
                      width: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                    {
                      backgroundColor: focused
                        ? Colors.buttonColor
                        : colorScheme === 'dark'
                        ? Colors.black
                        : Colors.white,
                    },
                  ]}>
                  <CategoryIcon
                    style={{
                      color:
                        colorScheme === 'dark' ? Colors.white : Colors.black,
                    }}
                    name="appstore1"
                    color={color}
                    size={30}
                  />
                </View>
              );
            } else if (route.name === 'UserHomescreen') {
              iconComponent = (
                <MaterialCommunityIcons name="home" color={color} size={25} />
              );
            } else if (route.name === 'Wishlist') {
              iconComponent = (
                <HeartIcon name="heart" color={color} size={25} />
              );
            } else if (route.name === 'CartScreen') {
              iconComponent = (
                <MaterialIcon name="shopping-cart" color={color} size={25} />
              );
            } else if (route.name === 'ProfileScreen') {
              iconComponent = (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={25}
                />
              );
            }

            return iconComponent;
          },
        })}
      />

      <Tab.Screen
        name="Wishlist"
        component={Wishlist}
        options={({route}) => ({
          tabBarLabel: 'Wishlist',
          tabBarStyle: {
            display: getRouteName(route),
            width: '100%',
            height: '8%',
            // marginLeft: -5,
            backgroundColor:
              colorScheme === 'dark' ? Colors.black : Colors.white,
            // borderTopLeftRadius: 25,
            // borderTopRightRadius: 25,
          },
          tabBarIcon: ({focused, color}) => {
            if (!isFocused) return null;

            let iconComponent;

            if (route.name === 'Wishlist') {
              iconComponent = (
                <View
                  style={[
                    {
                      backgroundColor: focused
                        ? Colors.buttonColor
                        : Colors.white,
                      borderRadius: 20,
                      height: 40,
                      width: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                    {
                      backgroundColor: focused
                        ? Colors.buttonColor
                        : colorScheme === 'dark'
                        ? Colors.black
                        : Colors.white,
                    },
                  ]}>
                  <HeartIcon
                    style={{
                      color:
                        colorScheme === 'dark' ? Colors.white : Colors.black,
                    }}
                    name="heart"
                    color={color}
                    size={25}
                  />
                </View>
              );
            } else if (route.name === 'UserHomescreen') {
              iconComponent = (
                <MaterialCommunityIcons name="home" color={color} size={25} />
              );
            } else if (route.name === 'CartScreen') {
              iconComponent = (
                <MaterialIcon name="shopping-cart" color={color} size={25} />
              );
            } else if (route.name === 'CategoryScreen') {
              iconComponent = (
                <CategoryIcon name="appstore1" color={color} size={25} />
              );
            } else if (route.name === 'ProfileScreen') {
              iconComponent = (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={25}
                />
              );
            }

            return iconComponent;
          },
        })}
      />
      <Tab.Screen
        name="CartScreen"
        component={CartStack}
        options={({route}) => ({
          tabBarStyle: {
            display: getRouteName(route),
            width: '100%',
            height: '8%',
            // marginLeft: -5,
            backgroundColor:
              colorScheme === 'dark' ? Colors.black : Colors.white,
            // borderTopLeftRadius: 25,
            // borderTopRightRadius: 25,
          },
          tabBarLabel: 'Cart',
          tabBarIcon: ({focused, color}) => {
            if (!isFocused) return null;

            let iconComponent;

            if (route.name === 'CartScreen') {
              iconComponent = (
                <View
                  style={[
                    {
                      backgroundColor: focused
                        ? Colors.buttonColor
                        : Colors.white,
                      borderRadius: 20,
                      height: 40,
                      width: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                    {
                      backgroundColor: focused
                        ? Colors.buttonColor
                        : colorScheme === 'dark'
                        ? Colors.black
                        : Colors.white,
                    },
                  ]}>
                  <MaterialIcon
                    style={{
                      color:
                        colorScheme === 'dark' ? Colors.white : Colors.black,
                    }}
                    name="shopping-cart"
                    color={color}
                    size={30}
                  />
                </View>
              );
            } else if (route.name === 'UserHomescreen') {
              iconComponent = (
                <MaterialCommunityIcons name="home" color={color} size={25} />
              );
            } else if (route.name === 'Wishlist') {
              iconComponent = (
                <HeartIcon name="heart" color={color} size={25} />
              );
            } else if (route.name === 'CategoryScreen') {
              iconComponent = (
                <CategoryIcon name="appstore1" color={color} size={25} />
              );
            } else if (route.name === 'ProfileScreen') {
              iconComponent = (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={25}
                />
              );
            }

            return iconComponent;
          },
        })}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileStack}
        options={({route}) => ({
          tabBarLabel: 'Profile',
          tabBarStyle: {
            display: getRouteName(route),
            width: '100%',
            height: '8%',
            // marginLeft: -5,
            backgroundColor:
              colorScheme === 'dark' ? Colors.black : Colors.white,
            // borderTopLeftRadius: 25,
            // borderTopRightRadius: 25,
          },
          tabBarIcon: ({focused, color}) => {
            if (!isFocused) return null;

            let iconComponent;

            if (route.name === 'ProfileScreen') {
              iconComponent = (
                <View
                  style={[
                    {
                      backgroundColor: focused
                        ? Colors.buttonColor
                        : Colors.white,
                      borderRadius: 20,
                      height: 40,
                      width: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                    {
                      backgroundColor: focused
                        ? Colors.buttonColor
                        : colorScheme === 'dark'
                        ? Colors.black
                        : Colors.white,
                    },
                  ]}>
                  <MaterialCommunityIcons
                    name="account"
                    color={color}
                    size={30}
                    style={{
                      color:
                        colorScheme === 'dark' ? Colors.white : Colors.black,
                    }}
                  />
                </View>
              );
            } else if (route.name === 'UserHomescreen') {
              iconComponent = (
                <MaterialCommunityIcons name="home" color={color} size={25} />
              );
            } else if (route.name === 'Wishlist') {
              iconComponent = (
                <HeartIcon name="heart" color={color} size={25} />
              );
            } else if (route.name === 'CategoryScreen') {
              iconComponent = (
                <CategoryIcon name="appstore1" color={color} size={25} />
              );
            } else if (route.name === 'CartScreen') {
              iconComponent = (
                <MaterialIcon name="shopping-cart" color={color} size={25} />
              );
            }

            return iconComponent;
          },
        })}
      />
    </Tab.Navigator>
  );
};
const getRouteName = (route: Partial<Route<string>>) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  if (
    routeName?.includes('Ownereditprofile') ||
    routeName?.includes('Owneraddresspage') ||
    routeName?.includes('Owneraddaddress') ||
    routeName?.includes('PaymentSuccessScreen') ||
    routeName?.includes('PaymentFailScreen') ||
    routeName?.includes('UProductDetails') ||
    routeName?.includes('Subcategory') ||
    routeName?.includes('CategoryProducts') ||
    routeName?.includes('CheckoutScreen') ||
    routeName?.includes('MyOrder') ||
    routeName?.includes('EditAddress')
  ) {
    return 'none';
  }
  return 'flex';
};
export default MyStack;
