/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useContext } from "react";
import style from "../Owneraddaddress/AddressStyles";
import useAddAddress from "../Owneraddaddress/useAddAddress";
import { CheckBox } from "react-native-elements";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { RadioButton } from "react-native-paper";
import useEditaddress from "./useEditAddress";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import CustomModal from "../../components/atoms/CustomModel/CustomModel";
import HeadingText from "../../components/atoms/HeadingText/HeadingTest";
import { ColorSchemeContext } from "../../../ColorSchemeContext";
import Styles from "../../constants/themeColors";
import styles from "./editAddressStyles";
const EditAddress = () => {
  const {
    handleUpdateAddress,
    handleOptionChange,
    selectedOption,
    isChecked,
    setAddressLine1,
    setAddressLine2,
    setPostalCode,
    handleCheckboxChange,
    closeModal,
    showModal,
    setStateName,
    // isLoading,
    city,
    addressLine1,
    addressLine2,
    postalCode,
    state,
    setCity,
  } = useEditaddress();
  const { colorScheme } = useContext(ColorSchemeContext);
  const { isLoading } = useAddAddress();
  return (
    <ScrollView
      style={[
        style.headercontainer,
        colorScheme === "dark" ? Styles.blacktheme : Styles.whiteTheme,
      ]}
    >
      {isLoading ? (
        <>
          <SkeletonPlaceholder
            highlightColor="#e0e0e0"
            backgroundColor={colorScheme === "dark" ? "#373737" : "#f2f2f2"}
          >
            <View style={style.subContainer}>
              <View>
                <TextInput style={style.inputAddress} />
                <TextInput style={style.inputAddress} />
                <TextInput style={style.inputAddress} />
                <TextInput style={style.inputAddress} />
                <TextInput style={style.inputAddress} />
                <TextInput style={style.inputAddress} />
              </View>
              <View style={style.btnfieldupdateAddress}>
                <Text style={styles.btntextAddress}></Text>
              </View>
            </View>
          </SkeletonPlaceholder>
        </>
      ) : (
        <>
          <HeadingText message="Edit address" />
          <View style={styles.subContainer}>
            <Text
              style={[
                styles.textField,
                colorScheme === "dark" ? Styles.whitetext : Styles.blackText,
              ]}
            >
              Flat no / Building
            </Text>
            <View>
              <TextInput
                value={addressLine1}
                onChangeText={(text) => setAddressLine1(text)}
                style={[
                  styles.inputAddress,
                  colorScheme === "dark" ? Styles.cardColor : Styles.main,
                  colorScheme === "dark" ? Styles.InputText : Styles.blackText,
                ]}
              />
              <Text
                style={[
                  styles.textField,
                  colorScheme === "dark" ? Styles.whitetext : Styles.blackText,
                ]}
              >
                Street / Area{" "}
              </Text>
              <TextInput
                value={addressLine2}
                onChangeText={(text) => setAddressLine2(text)}
                style={[
                  styles.inputAddress,
                  colorScheme === "dark" ? Styles.cardColor : Styles.main,
                  colorScheme === "dark" ? Styles.InputText : Styles.blackText,
                ]}
              />
              <Text
                style={[
                  styles.textField,
                  colorScheme === "dark" ? Styles.whitetext : Styles.blackText,
                ]}
              >
                State
              </Text>
              <TextInput
                value={state}
                style={[
                  styles.inputAddress,
                  colorScheme === "dark" ? Styles.cardColor : Styles.main,
                  colorScheme === "dark" ? Styles.InputText : Styles.blackText,
                ]}
                onChangeText={(text) => setStateName(text)}
              />
              <View style={style.textContainer}>
                <Text
                  style={[
                    styles.textField,
                    colorScheme === "dark"
                      ? Styles.whitetext
                      : Styles.blackText,
                  ]}
                >
                  City
                </Text>
                <Text
                  style={[
                    style.textFieldpincode,
                    colorScheme === "dark"
                      ? Styles.whitetext
                      : Styles.blackText,
                  ]}
                >
                  Pincode{" "}
                </Text>
              </View>
              <View style={style.cityContainer}>
                <TextInput
                  value={city}
                  placeholder={
                    colorScheme === "dark" ? Colors.InputText : Colors.black
                  }
                  style={[
                    styles.smalltextInputs,
                    colorScheme === "dark" ? Styles.cardColor : Styles.main,
                    colorScheme === "dark"
                      ? Styles.InputText
                      : Styles.blackText,
                  ]}
                  onChangeText={(text) => {
                    setCity(text);
                  }}
                />
                <TextInput
                  style={[
                    styles.smalltextInputs,
                    colorScheme === "dark" ? Styles.cardColor : Styles.main,
                    colorScheme === "dark"
                      ? Styles.InputText
                      : Styles.blackText,
                  ]}
                  placeholder={
                    colorScheme === "dark" ? Colors.InputText : Colors.black
                  }
                  value={postalCode}
                  onChangeText={setPostalCode}
                />
              </View>
              <Text
                style={[
                  styles.texttypeField,
                  colorScheme === "dark" ? Styles.whitetext : Styles.blackText,
                ]}
              >
                Type Of Address
              </Text>
              <View style={style.containerRadio}>
                <View style={[style.optionRadio]}>
                  <RadioButton
                    value="HOME"
                    status={selectedOption === "HOME" ? "checked" : "unchecked"}
                    onPress={() => handleOptionChange("HOME")}
                    color={colorScheme === "dark" ? Colors.white : Colors.black}
                  />
                  <Text
                    style={[
                      style.textRadio,
                      colorScheme === "dark"
                        ? Styles.whitetext
                        : Styles.blackText,
                    ]}
                  >
                    Home
                  </Text>
                </View>
                <View style={style.optionRadio}>
                  <RadioButton
                    value="OFFICE"
                    status={
                      selectedOption === "OFFICE" ? "checked" : "unchecked"
                    }
                    onPress={() => handleOptionChange("OFFICE")}
                    color={colorScheme === "dark" ? Colors.white : Colors.black}
                  />
                  <Text
                    style={[
                      style.textRadio,
                      colorScheme === "dark"
                        ? Styles.whitetext
                        : Styles.blackText,
                    ]}
                  >
                    Office
                  </Text>
                </View>
              </View>
              <View style={style.containerCheckbox}>
                <Text
                  style={[
                    styles.textCheckbox,
                    colorScheme === "dark"
                      ? Styles.whitetext
                      : Styles.blackText,
                  ]}
                >
                  Make Default Address
                </Text>
                <CheckBox
                  checked={isChecked}
                  onPress={handleCheckboxChange}
                  checkedColor="#3E54AC"
                  containerStyle={style.checkboxContainer}
                  size={24}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.btnfieldupdateAddress}
              onPress={handleUpdateAddress}
            >
              <Text style={[styles.btntextAddress]}>Update Address </Text>
            </TouchableOpacity>
            <CustomModal
              showModal={showModal}
              onClose={closeModal}
              message="Address Updated!"
            />
          </View>
        </>
      )}
    </ScrollView>
  );
};
export default EditAddress;
