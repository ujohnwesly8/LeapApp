/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {StatusBar, View} from 'react-native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {store} from './src/redux/store';
import {Init} from './src/redux/actions/actions';
import OtpScreen from './src/screens/OtpScreen/OtpScreen';
import OwnerNavigation from './src/navigation/OwnerNavigation';
import SplashScreen from './src/screens/Splashscreen/Splashscreen';
import {ColorSchemeProvider} from './ColorSchemeContext';

import Lottie from 'lottie-react-native';
import SignupScreen from './src/screens/SignUp/SignupScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createSharedElementStackNavigator();
const AuthStack = () => {
  const navigation = useNavigation();
  useEffect(() => {
    checkFirstTimeUser();
  }, []);

  const checkFirstTimeUser = async () => {
    try {
      // Check if the user has already logged in
      const hasLoggedIn = await AsyncStorage.getItem('hasLoggedIn');

      // If the user has logged in before, navigate to the LoginScreen
      if (hasLoggedIn) {
        navigation.navigate('Login' as never);
      } else {
        // If it's the first time user, navigate to the SplashScreen
        navigation.navigate('SplashScreen' as never);

        // Store the flag indicating that the user has logged in
        await AsyncStorage.setItem('hasLoggedIn', 'true');
        console.log('user already logged in');
      }
    } catch (error) {
      console.error('Error checking first time user:', error);
    }
  };

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
    </Stack.Navigator>
  );
};
const RootNavigation = () => {
  const token = useSelector((state: any) => state.Reducers.authToken);
  console.log(token);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const init = async () => {
    await dispatch(Init() as any);
    setLoading(false);
  };
  useEffect(() => {
    init();
  }, []);
  useEffect(() => {
    const delay = setTimeout(init, 3000); // Add a delay of 2 seconds before initializing
    return () => clearTimeout(delay); // Clear the timeout if the component unmounts before the delay is completed
  }, []);
  if (loading === true) {
    return (
      <View
        style={{flex: 1, justifyContent: 'center', backgroundColor: 'black'}}>
        <Lottie source={require('./assets/Loginloading.json')} autoPlay loop />
      </View>
    );
  }
  return (
    <>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      {token === null ? <AuthStack /> : <OwnerNavigation />}
    </>
  );
};
const App = () => {
  return (
    <ColorSchemeProvider>
      <Provider store={store}>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </Provider>
    </ColorSchemeProvider>
  );
};
export default App;
