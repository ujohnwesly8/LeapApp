/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Image,
} from 'react-native';
import Useowneredititems from './Useowneredititems';
import Icon from 'react-native-vector-icons/MaterialIcons';
import GenderDropdown from '../../components/atoms/GenderDropdown';
import Ownerstyles from '../Additems/Additemsstyle';
import TypeDropdown from '../../components/atoms/TypeDropdown';
import EventsDropdown from '../../components/atoms/EventsDropdown';
import OutfitDropdown from '../../components/atoms/OutfitDropdown';
import Sizeselection from '../../components/atoms/Sizeselect';
import OwnerEditItemstyles from './Owneredititemsstyles';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../constants/Colors';
import Lottie from 'lottie-react-native';
import BackButton from '../../components/atoms/BackButton/BackButton';
import HeadingText from '../../components/atoms/HeadingText/HeadingTest';
import CustomModal from '../../components/atoms/CustomModel/CustomModel';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
import Styles from '../../constants/themeColors';

const App = () => {
  const {
    data,
    setGender,
    visible,
    setViisble,
    handleedit,
    setEventType,
    setOutfitType,
    setItemType,
    imageUrls,
    selectedImage,
    RemoveProducts,
    closeModal,
    showModal,
    setShowModal,
    handleRemoveImage,
    handleremove,
    name,
    pickImg,
    handleGenderChange,
    handleEventTypeChange,
    handleOutfitChange,
    handleItemTypeChange,
    setName,
    setDescription,
    handleSizeTypeChange,
    setSelectedsize,
    setPrice,
    setQuantity,
    setEditProductId,
    FetchData,
    Mapdata,
    description,
    price,
    quantity,
    isLoading,
  } = Useowneredititems();

  const [hideId, setHideId] = useState(null);

  const handleVisibleModal = () => {
    setViisble(!visible);
    setHideId(null);
  };

  const navigation = useNavigation();
  const {colorScheme} = useContext(ColorSchemeContext);

  return (
    <SafeAreaView>
      <Modal animationType="slide" visible={visible}>
        <SafeAreaView>
          <ScrollView
            style={[
              {width: '100%', height: '100%'},
              colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
            ]}>
            {/* <HeadingText message="Edit product" /> */}
            <TouchableOpacity onPressIn={() => setViisble(!visible)}>
              <Text style={OwnerEditItemstyles.closetxt}>Close</Text>
            </TouchableOpacity>
            <View
              style={[
                styles.form,
                colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
              ]}>
              <View
                style={[
                  Ownerstyles.Scrollcontainer,
                  colorScheme === 'dark'
                    ? Styles.blacktheme
                    : Styles.whiteTheme,
                ]}>
                <View style={Ownerstyles.scrolledit}>
                  <TextInput
                    placeholderTextColor={Colors.white}
                    placeholder="Name"
                    style={[
                      Ownerstyles.Namefield,
                      {paddingLeft: 22},
                      colorScheme === 'dark' ? Styles.cardColor : Styles.main,
                      colorScheme === 'dark'
                        ? Styles.whitetext
                        : Styles.blackText,
                    ]}
                    onChangeText={setName}
                    value={name}
                  />
                  <TextInput
                    placeholderTextColor={Colors.black}
                    placeholder="Description"
                    multiline
                    style={[
                      Ownerstyles.Descriptionfield,
                      {paddingLeft: 22},
                      colorScheme === 'dark' ? Styles.cardColor : Styles.main,
                      colorScheme === 'dark'
                        ? Styles.whitetext
                        : Styles.blackText,
                    ]}
                    onChangeText={setDescription}
                    multiline
                    value={description}
                  />
                  <GenderDropdown
                    onSelectGender={setGender}
                    onChange={handleGenderChange}
                  />
                  <View style={{marginTop: -18}}>
                    <TypeDropdown
                      onSelectType={setItemType}
                      onChange={handleItemTypeChange}
                    />
                  </View>
                  <View style={{marginTop: -26}}>
                    <EventsDropdown
                      onSelectEvent={setEventType}
                      onChange={handleEventTypeChange}
                    />
                  </View>
                  <View style={{marginTop: -12}}>
                    <OutfitDropdown
                      onSelectOutfit={setOutfitType}
                      onChange={handleOutfitChange}
                    />
                  </View>
                  <View style={OwnerEditItemstyles.Sizecontainer}>
                    <View style={{marginTop: -16}}>
                      <Sizeselection
                        onSelectSize={setSelectedsize}
                        onChange={handleSizeTypeChange}
                      />
                    </View>
                  </View>
                  <View style={[OwnerEditItemstyles.ImageBox]}>
                    <View style={{marginTop: -20}}>
                      {selectedImage ? (
                        <>
                          <ScrollView
                            horizontal
                            style={[OwnerEditItemstyles.imagehorizontal]}>
                            {imageUrls.map((image, index) => (
                              <Image
                                style={OwnerEditItemstyles.image}
                                source={{uri: image}}
                                key={index}
                              />
                            ))}
                          </ScrollView>
                          <View style={OwnerEditItemstyles.removeContainer}>
                            <TouchableOpacity
                              onPress={handleremove}
                              style={OwnerEditItemstyles.touchableContainer}>
                              <Text style={OwnerEditItemstyles.removeText}>
                                Remove
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </>
                      ) : (
                        <View
                          style={[
                            OwnerEditItemstyles.Addimage,
                            colorScheme === 'dark'
                              ? Styles.cardColor
                              : Styles.main,
                            colorScheme === 'dark'
                              ? Styles.cardColor
                              : Styles.main,
                          ]}>
                          <Text
                            onPress={pickImg}
                            style={[
                              OwnerEditItemstyles.imagesText,

                              colorScheme === 'dark'
                                ? Styles.whitetext
                                : Styles.blackText,
                            ]}>
                            Add Image
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                  <View>
                    <TextInput
                      style={[
                        OwnerEditItemstyles.Price,
                        {paddingLeft: 15},
                        colorScheme === 'dark' ? Styles.cardColor : Styles.main,
                        colorScheme === 'dark'
                          ? Styles.whitetext
                          : Styles.blackText,
                      ]}
                      placeholder="Set price"
                      placeholderTextColor={Colors.black}
                      keyboardType="numeric"
                      value={price.toString()}
                      onChangeText={setPrice}
                    />
                    <TextInput
                      keyboardType="numeric"
                      placeholder="Set quantity"
                      placeholderTextColor={Colors.black}
                      style={[
                        OwnerEditItemstyles.Price,
                        {paddingLeft: 15},
                        colorScheme === 'dark' ? Styles.cardColor : Styles.main,
                        colorScheme === 'dark'
                          ? Styles.whitetext
                          : Styles.blackText,
                      ]}
                      value={quantity.toString()}
                      onChangeText={setQuantity}
                    />
                  </View>
                  <View style={Ownerstyles.mainButton}>
                    <TouchableOpacity
                      style={Ownerstyles.mainTouchable}
                      onPress={handleedit}>
                      <Text style={Ownerstyles.touchableText}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
      <ScrollView
        style={[
          {width: '100%', height: '100%'},
          colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
        ]}>
        <View>
          <HeadingText message="Edit Product" />
        </View>
        {/* <View
          style={{
            flexDirection: 'row',
            width: '50%',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 20,
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              // style={{marginLeft: 5}}
              name="arrow-back-ios"
              size={16}
              color="black"
              // onPress={() => navigation.goBack()}
            /> */}
        {/* </View>
          <Text
            style={[
              styles.titleText,
              colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
            ]}>
            My Products
          </Text>
        </View> */}

        {isLoading ? (
          <View style={{height: 200, width: 400}}>
            <Lottie
              source={require('../../../assets/EditProducts.json')}
              autoPlay
            />
          </View>
        ) : (
          data.map(item => (
            <View
              style={[
                styles.mainContainer,
                colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
              ]}
              key={item.id}>
              <View style={[styles.item_course]}>
                <View style={[OwnerEditItemstyles.imagePriceContainer]}>
                  <View style={[OwnerEditItemstyles.cardImageContainer]}>
                    <Image
                      style={OwnerEditItemstyles.cardImage}
                      source={{uri: item.image}}
                    />
                  </View>
                  <View
                    style={[
                      OwnerEditItemstyles.priceContainer,
                      colorScheme === 'dark' ? Styles.cardColor : Styles.main,
                    ]}>
                    <Text
                      style={[
                        styles.txt_name,
                        colorScheme === 'dark'
                          ? Styles.whitetext
                          : Styles.blackText,
                      ]}>
                      {item.name}
                    </Text>
                    <Text style={styles.txt_item}>₹ {item.price}</Text>
                  </View>
                </View>
                <View style={OwnerEditItemstyles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      FetchData(item.id);
                      setEditProductId(item.id);
                    }}>
                    <View style={OwnerEditItemstyles.button}>
                      <Text style={styles.txt_edit}>Edit</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => RemoveProducts(item.id)}>
                    <View style={OwnerEditItemstyles.button}>
                      <Text style={styles.txt_del}>Delete</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <CustomModal
                showModal={showModal}
                onClose={closeModal}
                message="Product has been deleted!"
              />
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  form: {
    backgroundColor: Colors.main,
    // marginLeft: -10,
  },
  titleText: {fontFamily: 'Poppins-SemiBold', fontSize: 24, color: 'white'},

  txtClose: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'right',
    marginRight: 15,
    color: Colors.iconscolor,
  },
  mainContainer: {
    backgroundColor: Colors.main,
    height: 300,
  },
  text_input: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    marginTop: 10,
  },
  header_container: {
    // padding: 15,
    // backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txt_main: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  item_course: {
    marginLeft: 30,
    marginTop: 15,
    flexDirection: 'row',
  },
  txt_name: {
    fontSize: 12,
    // fontWeight: '700',
    fontFamily: 'Poppins-SemiBold',
    color: Colors.black,
  },
  txt_item: {
    fontSize: 13,
    // fontWeight: '700',
    fontFamily: 'Poppins-SemiBold',
    color: Colors.buttonColor,
  },
  txt_enabled: {
    fontSize: 14,
    marginTop: 5,
    color: 'green',
    fontWeight: 'bold',
  },
  txt_disabled: {
    fontSize: 14,
    marginTop: 5,
    color: 'green',
    fontWeight: 'bold',
  },
  txt_del: {
    fontSize: 15,
    color: Colors.white,
    // fontWeight: '500',
    fontFamily: 'Poppins-SemiBold',
  },
  txt_edit: {
    fontSize: 15,
    color: Colors.white,
    // fontWeight: '500',
    fontFamily: 'Poppins-SemiBold',
  },
  btnContainer: {
    display: 'flex',
    padding: 15,
    backgroundColor: '#000',
    marginTop: 20,
  },
  btnNewContainer: {
    padding: 10,
    backgroundColor: '#000',
  },
  textButton: {
    textAlign: 'center',
    color: '#FFF',
  },
});
