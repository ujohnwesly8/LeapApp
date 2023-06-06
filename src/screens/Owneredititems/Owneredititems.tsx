/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState, useEffect} from 'react';
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
  RefreshControl,
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
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Colors from '../../constants/Colors';
import Lottie from 'lottie-react-native';
import BackButton from '../../components/atoms/BackButton/BackButton';
import HeadingText from '../../components/atoms/HeadingText/HeadingTest';
import CustomModal from '../../components/atoms/CustomModel/CustomModel';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
import Styles from '../../constants/themeColors';
import Useownerhome from '../OwnerHomepage/Useownerhome';
import styles from '../OwnerHomepage/OwnerHomestyle';

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
    fetchData,
    productQuantity,
    isModalVisible,
    // recentyAdded,
    selectedProductId,
    setSelectedProductId,
    handleEnablebutton,
    setIsMinusDisabled,
    setIsModalVisible,
    handleDisablebutton,
    handleDisableProduct,
    incrementQuantity,
    decrementQuantity,
    disabledQuantity,
    totalQuantity,
    updatedQuantity,
    refreshData,
    setRefreshData,
    handleRefresh,
  } = Useowneredititems();

  const [hideId, setHideId] = useState(null);

  const handleVisibleModal = () => {
    setViisble(!visible);
    setHideId(null);
  };
  useEffect(() => {
    if (!isModalVisible) {
      setRefreshData(false);
    }
  }, [isModalVisible]);

  console.log('Refreshhhhhh:', refreshData);

  // const handleManageModal = () => {
  //   console.log('refreshData is ', refreshData);
  //   setIsModalVisible(!isModalVisible);
  //   setRefreshData(true);
  // };
  const navigation = useNavigation();
  const {colorScheme} = useContext(ColorSchemeContext);

  return (
    <SafeAreaView>
      <Modal
        animationType="slide"
        visible={visible}
        onRequestClose={handleVisibleModal}>
        {console.log('Refreshinf is happpening :', refreshData)}
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
        ]}
        refreshControl={
          <RefreshControl
            refreshing={refreshData}
            onRefresh={handleRefresh}
            colors={['#0000ff']} // Customize the color of the refresh indicator
          />
        }>
        <View>
          <HeadingText message="My Products" />
        </View>
        {isLoading ? (
          <View style={{height: 200, width: 400}}>
            <Lottie
              source={require('../../../assets/EditProducts.json')}
              autoPlay
            />
          </View>
        ) : (
          data.map(item => (
            <>
              <View
                style={[
                  Style.mainContainer,
                  colorScheme === 'dark'
                    ? Styles.blacktheme
                    : Styles.whiteTheme,
                ]}
                key={item.id}>
                <View style={[Style.item_course]}>
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
                      <View>
                        <View>
                          <Text
                            style={[
                              Style.txt_name,
                              colorScheme === 'dark'
                                ? Styles.whitetext
                                : Styles.blackText,
                            ]}>
                            {item.name}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          // width: '50%',
                          // backgroundColor: 'white',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={Style.txt_item}>₹ {item.price}</Text>
                        <Text
                          style={{
                            color: 'white',
                            fontFamily: 'Poppins-Regular',
                            fontSize: 12,
                          }}>
                          {' '}
                          Available: {item.availableQuantities}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={OwnerEditItemstyles.buttonContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        FetchData(item.id);
                        setEditProductId(item.id);
                        setViisble(true);
                      }}>
                      <View style={OwnerEditItemstyles.button}>
                        <Text style={Style.txt_edit}>Edit</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        // FetchData(item.id);
                        // setEditProductId(item.id);
                        setSelectedProductId(item.id);
                        handleDisableProduct(item);
                      }}>
                      <View style={OwnerEditItemstyles.button}>
                        <Text style={Style.txt_edit}>Manage</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => RemoveProducts(item.id)}>
                      <View style={OwnerEditItemstyles.button}>
                        <Text style={Style.txt_del}>Delete</Text>
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
              <View>
                <Modal
                  animationType="slide"
                  visible={isModalVisible}
                  onRequestClose={() => setIsModalVisible(false)}
                  transparent={true}>
                  <View style={styles.modalContainer}>
                    <View style={{alignItems: 'flex-end', marginRight: 20}}>
                      <TouchableOpacity
                        onPress={() => setIsModalVisible(false)}
                        style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Close</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{alignItems: 'center', marginTop: 10}}>
                      <Text
                        style={{
                          fontFamily: 'Poppins-SemiBold',
                          fontSize: 20,
                          color: Colors.white,
                        }}>
                        Quantities
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '90%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginLeft: 20,
                      }}>
                      <Text style={styles.modalText}>Total</Text>
                      <Text style={styles.modalText}>Available</Text>
                      <Text style={styles.modalText}>Disabled</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '80%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        // backgroundColor: 'white',
                        marginLeft: 25,
                      }}>
                      <Text style={OwnerEditItemstyles.modalQuantityText}>
                        {totalQuantity}
                      </Text>
                      <Text style={OwnerEditItemstyles.modalQuantityText}>
                        {productQuantity}
                      </Text>
                      <Text style={OwnerEditItemstyles.modalQuantityText}>
                        {disabledQuantity}
                      </Text>
                    </View>
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity
                        onPress={() => decrementQuantity(selectedProductId)}
                        style={styles.quantityButton}>
                        <Text style={styles.quantityButtonText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>{updatedQuantity}</Text>
                      <TouchableOpacity
                        onPress={() => incrementQuantity(selectedProductId)}
                        style={styles.quantityButton}>
                        <Text style={styles.quantityButtonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{marginTop: 30, alignItems: 'center'}}>
                      <Text
                        style={{
                          color: Colors.white,
                          fontFamily: 'Poppins-Medium',
                        }}>
                        {' '}
                        Note : you can only enable disabled products
                      </Text>
                    </View>
                    <View
                      style={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                        width: '80%',
                        marginLeft: 40,
                        // marginTop: 20,
                      }}>
                      <TouchableOpacity
                        onPress={() =>
                          handleDisablebutton(
                            selectedProductId,
                            updatedQuantity,
                          )
                        }
                        style={styles.okButton}>
                        <Text
                          style={{
                            color: 'black',
                            fontFamily: 'Poppins-SemiBold',
                            fontSize: 16,
                            includeFontPadding: false,
                          }}>
                          Disable
                        </Text>
                        {/* Render disable button content */}
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          handleEnablebutton(
                            selectedProductId,
                            updatedQuantity,
                            disabledQuantity,
                          )
                        }
                        style={styles.okButton}>
                        <Text
                          style={{
                            color: 'black',
                            fontFamily: 'Poppins-SemiBold',
                            fontSize: 16,
                            includeFontPadding: false,
                          }}>
                          Enable
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </View>
            </>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

const Style = StyleSheet.create({
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
    // marginTop: 15,
    flexDirection: 'row',
  },
  txt_name: {
    fontSize: 12,
    width: 120,
    height: 22,
    // fontWeight: '700',
    fontFamily: 'Poppins-SemiBold',
    color: Colors.black,
    // backgroundColor: 'white',
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
