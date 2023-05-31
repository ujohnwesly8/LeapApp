import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  ScrollView,
  Button,
  StyleSheet,
  Dimensions,
  Alert,
  Text,
} from 'react-native';
import ImagePicker, {launchImageLibrary} from 'react-native-image-picker';
import Mainbutton from './MainButton';
import Colors from '../../constants/Colors';
const {width} = Dimensions.get('window');
const MultipleImages = () => {
  const [imageUris, setImageUris] = useState([]);
  // const [removeImage, setRemove] = useState([]);
  // const removeImage = index => {
  //   const newImageUris = [...imageUris];
  //   newImageUris.splice(index, 1);
  //   setImageUris(newImageUris);
  //   const newRemove = [...remove, index];
  //   setRemove(newRemove);
  // };
  const handleRemoveImages = () => {
    setImageUris([]);
  };
  useEffect(() => {
    const getImageUrls = async () => {
      const url = await AsyncStorage.getItem('url');
      if (url) {
        const imageUrls = Array.from({length: 10}, (_, index) => {
          return `${url}/file${index + 1}`;
        });
        setImageUrls(imageUrls);
      }
    };
    getImageUrls();
  }, []);
  const pickImages = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 10,
      },
      async response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          const images = response.assets.map(imagePath => ({
            uri: imagePath.uri, // fix here
            type: 'image/png',
            name: 'image.png',
          }));
          const formData = new FormData();
          images.forEach((file, index) => {
            formData.append('file', {
              uri: file.uri, // fix here
              type: 'image/png',
              name: 'image.png',
            });
          });
          try {
            const token = await AsyncStorage.getItem('token');
            const result = await fetch(
              'https://fa68-103-146-217-155.ngrok-free.app/api/v1/file/upload',
              {
                method: 'POST',
                body: formData,
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${token}`,
                },
              },
            );
            if (result.ok) {
              const res = await result.json();
              console.log(res);
            } else {
              const res = await result.json();
              console.log('Upload failed');
              console.log(res);
            }
          } catch (error) {
            console.error(error);
          }
          setImageUris(images);
        }
      },
    );
  };
  return (
    <View>
      <View>
        <View style={styles.container}>
          <Button title="Open Images" onPress={pickImages} />
        </View>
        <ScrollView horizontal>
          {imageUris.map((imageUri, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image source={{uri: imageUri.uri}} style={styles.image} />
            </View>
          ))}
        </ScrollView>
        <Text style={styles.Text}>Add Images</Text>
        {/* <Mainbutton onPress={handleRemoveImages} text="Remove Images" /> */}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    justifyContent: 'center',
    marginTop: 40,
    fontWeight: 'bold',
    alignItems: 'center',
    marginLeft: 10,
    color: Colors.iconscolor,
  },
  image: {
    width,
    height: 200,
    resizeMode: 'cover',
  },
});
export default MultipleImages;
