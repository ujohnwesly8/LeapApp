/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TouchableOpacity, View, FlatList} from 'react-native';
// import {FlatList} from 'react-native-gesture-handler';
import {OwnerAddressCustomHook} from './Useowneraddress';
import style from './Owneraddressstyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomModal from '../../components/atoms/CustomModel/CustomModel';
import Lottie from 'lottie-react-native';
import Colors from '../../constants/Colors';
import useCart from '../Cart/useCart';
import Styles from '../../constants/themeColors';
import HeadingText from '../../components/atoms/HeadingText/HeadingTest';
const Owneraddresspage = () => {
  const {
    handleOwnerAddAddress,
    handleDeleteAddress,
    goBackButton,
    closeModal,
    showModal,
    addressList,
    handleEditItems,
    isLoading,
  } = OwnerAddressCustomHook();
  const {colorScheme} = useCart();
  const renderAddressItem = ({item, index}) => {
    return (
      <View
        style={[
          style.card,
          colorScheme === 'dark' ? Styles.cardColor : Styles.main,
        ]}>
        <View>
          <Text
            style={[
              style.city,
              colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
            ]}>
            Address :
          </Text>
          <View style={style.AdresstextContainer}>
            <Text
              style={[
                style.input,
                colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
              ]}>
              {item.addressLine1},{item.addressLine2},{item.postalCode},
              {item.city},{item.state},{item.country}
            </Text>
          </View>

          {/* <Text
            style={[
              style.input,
              colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
            ]}>
            {'State: ' + item.state}
          </Text>
          <Text
            style={[
              style.input,
              colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
            ]}>
            {'Postal Code: ' + item.postalCode}
          </Text>
          <Text
            style={[
              style.input,
              colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
            ]}>
            {'City : ' + item.city}
          </Text>
          <Text
            style={[
              style.stateName,
              colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
            ]}>
            {'Country: ' + item.country}
          </Text> */}
        </View>
        <View>
          <TouchableOpacity
            // style={style.deleteBtn}
            onPress={() => {
              handleEditItems(item);
            }}>
            <MaterialIcons
              name="edit"
              size={25}
              color={colorScheme === 'dark' ? Colors.white : Colors.black}
            />
          </TouchableOpacity>
          <TouchableOpacity
            // style={style.deleteBtn}
            onPress={() => {
              handleDeleteAddress(item.id);
            }}>
            <MaterialIcons
              name="delete"
              size={25}
              color={'#FF726F'}
              style={style.deleteBtnText}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View
      style={[
        style.maincontainer,
        colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
      ]}>
      <HeadingText message="Address" />
      {isLoading ? (
        <View>
          <Lottie
            source={require('../../../assets/addressloadingstatetwo.json')}
            autoPlay
            style={{
              height: 250,
              width: 250,
              alignSelf: 'center',
              // marginTop: '50%',
              justifyContent: 'center',
            }}
          />
        </View>
      ) : (
        <>
          <TouchableOpacity
            style={style.btnaddaddressContainer}
            onPress={handleOwnerAddAddress}>
            <Text style={style.btnaddText}>Add Address</Text>
          </TouchableOpacity>
          {addressList.length === 0 ? (
            <View style={style.noAddressContainer1}>
              <View style={style.titleTextContainer1}>
                <Lottie
                  autoPlay
                  style={style.imageS1}
                  source={require('../../../assets/location.json')}
                />
              </View>
              <View style={style.textContainer1}>
                <Text style={style.noAddressText1}>SAVE YOUR ADDRESS NOW</Text>
              </View>
            </View>
          ) : (
            <View style={{marginBottom: 10}}>
              <FlatList
                data={addressList}
                renderItem={renderAddressItem}
                keyExtractor={item => item.id.toString()}
              />
            </View>
          )}
          <CustomModal
            showModal={showModal}
            onClose={closeModal}
            message="Address Deleted!"
          />
        </>
      )}
    </View>
  );
};
export default Owneraddresspage;
