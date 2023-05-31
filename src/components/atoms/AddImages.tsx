/* eslint-disable react-native/no-inline-styles */
import {View, ToastAndroid, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {Avatar, Button} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddImages = () => {
  const [Pic, setPic] = React.useState('');

  const setToastMsg = (msg: string) => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  useEffect(() => {
    retrieveImageFromStorage();
  }, []);

  const retrieveImageFromStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('@selected_image');
      if (value !== null) {
        setPic(value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveImageToStorage = async value => {
    try {
      await AsyncStorage.setItem('@selected_image', value);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = () => {
    let options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        setToastMsg('Canceled image Selection');
      } else if (response.errorCode == 'permission') {
        setToastMsg('permission not satisfied');
      } else if (response.errorMessage == 'others') {
        setToastMsg(response.errorMessage);
      } else {
        setPic(response.assets[0].base64);
        saveImageToStorage(response.assets[0].base64);
      }
    });
  };

  const removeImage = async () => {
    setPic('');
    setToastMsg('image Removed');
    try {
      await AsyncStorage.removeItem('@selected_image');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <View style={styles.centerContent}>
        {Pic ? (
          <Avatar.Image
            size={100}
            source={{uri: 'data:image/png;base64,' + Pic}}
          />
        ) : (
          <Avatar.Image
            size={100}
            source={require('../../../assets/profile.jpg')}
          />
        )}
      </View>
      <View
        style={[styles.centerContent, {marginTop: 15, flexDirection: 'row'}]}>
        <Button onPress={() => uploadImage()}> Upload</Button>
        <Button onPress={() => removeImage()}> Remove</Button>
      </View>
    </View>
  );
};

export default AddImages;

const styles = StyleSheet.create({
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
});
