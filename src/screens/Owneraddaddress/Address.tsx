/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Lottie from 'lottie-react-native';

import HeadingText from '../../components/atoms/HeadingText/HeadingTest';
import CustomModal from '../../components/atoms/CustomModel/CustomModel';

import useAddress from './useAddress';

import Colors from '../../constants/colors';
import style from './AddressStyles';
import {ColorSchemeContext} from '../../../ColorSchemeContext';

const Address = () => {
  const {
    handleOwnerAddAddress,
    handleDeleteAddress,
    closeModal,
    showModal,
    addressList,
    handleEditItems,
    isLoading,
  } = useAddress();
  const {colorScheme, getTextInputStyle, getTextColor, getContainerStyle} =
    useContext(ColorSchemeContext);
  const renderAddressItem = ({item}: {item: any; index: number}) => {
    return (
      <View style={[style.card, getTextInputStyle()]}>
        <View>
          <Text style={[style.city, getTextColor()]}>Address:</Text>
          <View style={style.AdresstextContainer}>
            <Text style={[style.input, getTextColor()]}>
              {item.addressLine1}, {item.addressLine2}, {item.postalCode},{' '}
              {item.city}, {item.state}, {item.country}
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            testID={`edit-button-${item.id}`}
            onPress={() => handleEditItems(item)}>
            <MaterialIcons
              name="edit"
              size={25}
              color={colorScheme === 'dark' ? Colors.white : Colors.black}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDeleteAddress(item.id)}
            testID={`delete-button-${item.id}`}>
            <MaterialIcons
              name="delete"
              size={25}
              color="#FF726F"
              style={style.deleteBtnText}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={[style.maincontainer, getContainerStyle()]}>
      <HeadingText message="Address" navigation={undefined} />
      {isLoading ? (
        <View>
          <Lottie
            source={require('../../../assets/addressloadingstatetwo.json')}
            autoPlay
            style={{
              height: 250,
              width: 250,
              alignSelf: 'center',
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
                testID="address-list"
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

export default Address;
