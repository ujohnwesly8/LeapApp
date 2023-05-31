/* eslint-disable react-native/no-inline-styles */
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import style from './CustomModelStyles';
import Colors from '../../../constants/Colors';
const CustomModal = ({showModal, onClose, message}) => {
  return (
    <Modal visible={showModal} animationType="slide" transparent>
      <View style={style.modalContainer}>
        <View style={style.modalBox}>
          <Text style={style.modalText}>{message}</Text>
          <View style={{marginTop: 15}}>
            <TouchableOpacity
              onPress={onClose}
              style={{
                backgroundColor: Colors.main,
                borderRadius: 40,
                width: 200,
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                  padding: 9,
                  borderRadius: 30,
                  textAlign: 'center',
                  fontFamily: 'Poppins-SemiBold',
                }}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default CustomModal;
