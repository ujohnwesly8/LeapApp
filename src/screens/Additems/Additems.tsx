/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
// import {ScrollView} from 'react-native-gesture-handler';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ownerstyles from './Additemsstyle';
// import {ScrollView} from 'react-native-gesture-handler';
import GenderDropdown from '../../components/atoms/GenderDropdown';
import EventsDropdown from '../../components/atoms/EventsDropdown';
import TypeDropdown from '../../components/atoms/TypeDropdown';
import OutfitDropdown from '../../components/atoms/OutfitDropdown';
import Useadditems from './Useadditems';
import Colors from '../../constants/Colors';
import Styles from '../LoginScreen/LoginStyle';
import styles from '../../constants/themeColors';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import BackButton from '../../components/atoms/BackButton/BackButton';
import HeadingText from '../../components/atoms/HeadingText/HeadingTest';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
const Additems = () => {
  const {
    name,
    description,
    setGender,
    setEventType,
    setOutfitType,
    setItemType,
    handleGenderChange,
    handleEventTypeChange,
    handleOutfitChange,
    handleItemTypeChange,
    handleNameChange,
    isLoading,
    handleDescriptionChange,
    handleBlur,
    formik,
  } = Useadditems();
  const {colorScheme} = useContext(ColorSchemeContext);
  // const {formik} = AddItemsformik();
  return (
    <ScrollView
      style={{
        backgroundColor: colorScheme === 'dark' ? 'black' : Colors.white,
      }}>
      {isLoading ? (
        <>
          <SkeletonPlaceholder
            backgroundColor={colorScheme === 'dark' ? '#373737' : Colors.gray}>
            {/* <View style={Ownerstyles.Scrollcontainer}> */}
            <View style={Ownerstyles.scroll}>
              <TextInput style={Ownerstyles.Namefield} />
              <TextInput style={Ownerstyles.Descriptionfield} />
              <TextInput style={Ownerstyles.Namefield} />
              <TextInput style={Ownerstyles.Descriptionfield} />
              <TextInput style={Ownerstyles.Namefield} />
              <TextInput style={Ownerstyles.Descriptionfield} />
              <TextInput style={Ownerstyles.Namefield} />
              <TextInput style={Ownerstyles.Descriptionfield} />
            </View>
            {/* </View> */}
          </SkeletonPlaceholder>
        </>
      ) : (
        <>
          {/* <HeadingText message="Add Products" /> */}

          <View
            style={[
              Ownerstyles.Scrollcontainer,
              colorScheme === 'dark' ? styles.blacktheme : styles.whiteTheme,
            ]}>
            <View style={Ownerstyles.scroll}>
              <Text
                style={[
                  Ownerstyles.EditText,
                  colorScheme === 'dark' ? styles.whitetext : styles.blackText,
                ]}>
                Add products
              </Text>
              <TextInput
                placeholderTextColor={Colors.gray}
                placeholder="Name"
                style={[
                  Ownerstyles.Namefield,
                  {paddingLeft: 22},
                  colorScheme === 'dark' ? styles.cardColor : styles.main,
                  colorScheme === 'dark'
                    ? styles.placeholder
                    : styles.blackText,
                ]}
                value={name}
                onChangeText={handleNameChange}
                onBlur={() => handleBlur('name')}
              />
              {formik.touched.name && formik.errors.name && (
                <Text style={Styles.errorText}>{formik.errors.name}</Text>
              )}
              <TextInput
                placeholderTextColor={Colors.gray}
                placeholder="Description"
                style={[
                  Ownerstyles.Descriptionfield,
                  {paddingLeft: 22},
                  colorScheme === 'dark' ? styles.cardColor : styles.main,
                  colorScheme === 'dark'
                    ? styles.placeholder
                    : styles.blackText,
                ]}
                multiline
                onChangeText={handleDescriptionChange}
                onBlur={() => handleBlur('description')}
                value={description}
              />
              {formik.touched.description && formik.errors.description && (
                <Text style={Styles.errorText}>
                  {formik.errors.description}
                </Text>
              )}
              <GenderDropdown
                onSelectGender={setGender}
                onChange={handleGenderChange}
              />
              {formik.touched.gender && formik.errors.gender && (
                <Text style={Styles.errorText}>{formik.errors.gender}</Text>
              )}

              <View style={{flexDirection: 'column', marginTop: -20}}>
                <TypeDropdown
                  onSelectType={setItemType}
                  onChange={handleItemTypeChange}
                />
              </View>
              <View style={{flexDirection: 'column', marginTop: -29}}>
                <EventsDropdown
                  onSelectEvent={setEventType}
                  onChange={handleEventTypeChange}
                />
                {formik.touched.eventType && formik.errors.eventType && (
                  <Text style={Styles.errorText}>
                    {formik.errors.eventType}
                  </Text>
                )}
              </View>
              <View style={{flexDirection: 'column', marginTop: -17}}>
                <OutfitDropdown
                  onSelectOutfit={setOutfitType}
                  onChange={handleOutfitChange}
                />
              </View>

              <View style={Ownerstyles.mainButton}>
                <TouchableOpacity
                  disabled={!formik.isValid}
                  style={[
                    Ownerstyles.mainTouchable,
                    {
                      backgroundColor: formik.isValid ? '#9747FF' : '#A5C9CA',
                    },
                  ]}
                  onPress={formik.handleSubmit}>
                  <Text style={Ownerstyles.touchableText}>Continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
};
export default Additems;
