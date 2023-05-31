/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useContext} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import OwnerImagestyles from './OwnerImagestyles';
import Sizeselection from '../../components/atoms/Sizeselect';
// import {ScrollView, TextInput} from 'react-native-gesture-handler';
import Useownerimage from './Useownerimage';
import Styles from '../LoginScreen/LoginStyle';
import CustomModal from '../../components/atoms/CustomModel/CustomModel';
import Colors from '../../constants/Colors';
import Ownerstyles from '../Additems/Additemsstyle';
import BackButton from '../../components/atoms/BackButton/BackButton';
import HeadingText from '../../components/atoms/HeadingText/HeadingTest';
import Lottie from 'lottie-react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from '../../constants/themeColors';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
export default function Owneraddimages() {
  const {
    onHandleOwnerItems,
    // Onhandlepress,
    handleRemoveImage,
    handleSizeTypeChange,
    setSelectedsize,
    handlePriceChange,
    handleQuantityChange,
    handleBlur,
    handleremove,
    selectedImage,
    imageUrls,
    pickImages,
    closeModal,
    showModal,
    formik,
    isLoading,
  } = Useownerimage();
  const areImagesUploaded = imageUrls && imageUrls.length > 0;
  const {colorScheme} = useContext(ColorSchemeContext);
  // console.log('johnresly', imageUrls);
  return (
    <ScrollView
      style={[
        {height: '100%', backgroundColor: Colors.black},
        colorScheme === 'dark' ? styles.blacktheme : styles.whiteTheme,
      ]}>
      <View
        style={[
          OwnerImagestyles.Scroll,
          colorScheme === 'dark' ? styles.blacktheme : styles.whiteTheme,
        ]}>
        <HeadingText message="Add products" />
        <View style={[OwnerImagestyles.form]}>
          {/* <Spinner
            visible={isLoading}
            textContent={'Loading...'}
            textStyle={{color: Colors.white}}
          /> */}
          <View style={[OwnerImagestyles.ImageBox]}>
            {imageUrls && areImagesUploaded ? (
              <>
                <ScrollView
                  horizontal
                  style={[
                    OwnerImagestyles.imagehorizontal,
                    colorScheme === 'dark'
                      ? styles.blacktheme
                      : styles.whiteTheme,
                  ]}>
                  {imageUrls.map((image, index) => (
                    <View key={index} style={[OwnerImagestyles.ImageContainer]}>
                      <Image
                        style={[
                          OwnerImagestyles.image,
                          colorScheme === 'dark'
                            ? styles.cardColor
                            : styles.whiteTheme,
                        ]}
                        source={{uri: image}}
                      />
                      <TouchableOpacity
                        onPress={() => handleRemoveImage(index)}
                        style={OwnerImagestyles.removeIconContainer}>
                        <MaterialIcons
                          name="cancel"
                          size={25}
                          color={Colors.red}
                        />
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
                {areImagesUploaded && (
                  <View style={OwnerImagestyles.removeContainer}>
                    <TouchableOpacity
                      onPress={pickImages}
                      style={OwnerImagestyles.touchableContainer}>
                      <Text style={OwnerImagestyles.removeText}>Add More</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </>
            ) : (
              <>
                {isLoading ? (
                  <View style={OwnerImagestyles.overlay}>
                    <ActivityIndicator size="large" color="black" />
                  </View>
                ) : (
                  <TouchableOpacity
                    style={[
                      OwnerImagestyles.Addimage,
                      colorScheme === 'dark' ? styles.cardColor : styles.main,
                    ]}
                    onPress={pickImages}>
                    <Lottie
                      source={require('../../../assets/addimageol.json')}
                      style={OwnerImagestyles.imagesText}
                      autoPlay
                    />
                    {!isLoading && (
                      <Text
                        style={[
                          OwnerImagestyles.imagetxt,
                          colorScheme === 'dark'
                            ? styles.whitetext
                            : styles.blackText,
                        ]}>
                        Add Images{' '}
                      </Text>
                    )}
                  </TouchableOpacity>
                )}
              </>
            )}
            <View style={OwnerImagestyles.Sizecontainer}>
              <Sizeselection
                onSelectSize={setSelectedsize}
                onChange={handleSizeTypeChange}
                onBlur={() => formik.setFieldTouched('size')}
              />
            </View>
            <View style={{marginTop: 20}}>
              {formik.touched.size && formik.errors.size && (
                <Text style={Styles.errorText}>{formik.errors.size}</Text>
              )}
            </View>
            <TextInput
              style={[
                OwnerImagestyles.Price,
                {paddingLeft: 25},
                colorScheme === 'dark' ? styles.cardColor : styles.whiteTheme,
                colorScheme === 'dark' ? styles.placeholder : styles.blackText,
              ]}
              placeholder="Select price"
              placeholderTextColor="gray"
              keyboardType="numeric"
              onChangeText={handlePriceChange}
              onBlur={() => handleBlur('price')}
            />
            {formik.touched.price && formik.errors.price && (
              <Text style={Styles.errorText}>{formik.errors.price}</Text>
            )}
            <TextInput
              keyboardType="numeric"
              placeholder="Select quantity"
              placeholderTextColor="gray"
              style={[
                OwnerImagestyles.quantity,
                {paddingLeft: 25},
                colorScheme === 'dark' ? styles.cardColor : styles.whiteTheme,
                colorScheme === 'dark' ? styles.placeholder : styles.blackText,
              ]}
              onChangeText={handleQuantityChange}
              onBlur={() => handleBlur('quantity')}
            />
            {formik.touched.quantity && formik.errors.quantity && (
              <Text style={Styles.errorText}>{formik.errors.quantity}</Text>
            )}
            <View style={Styles.mainButton}>
              <TouchableOpacity
                disabled={!formik.isValid}
                onPress={formik.handleSubmit}
                style={[
                  Styles.mainTouchable,
                  {
                    backgroundColor: formik.isValid ? '#9747FF' : '#A5C9CA',
                  },
                ]}>
                <Text style={Styles.touchableText}>Add product</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <CustomModal
        showModal={showModal}
        onClose={closeModal}
        message="Product added successfully!"
      />
    </ScrollView>
  );
}
