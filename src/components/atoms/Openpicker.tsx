import {launchImageLibrary} from 'react-native-image-picker';
import {View, Text, Button, Image} from 'react-native';
import {useState} from 'react';

export const OpenPicker = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImagePicker = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
      },
      response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          setSelectedImage(response.assets[0].base64);
        }
      },
    );
  };

  console.log(selectedImage);

  return (
    <View>
      <Button title="Open Image Picker" onPress={handleImagePicker} />
      {selectedImage ? (
        <Image
          source={{uri: 'data:image/png;base64,' + Pic}}
          style={{width: 200, height: 200}}
        />
      ) : (
        <Text>No image selected</Text>
      )}
    </View>
  );
};
export default OpenPicker;