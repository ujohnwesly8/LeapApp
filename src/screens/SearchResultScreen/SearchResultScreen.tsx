/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import style from './searchResultStyle';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../constants/Colors';
import Lottie from 'lottie-react-native';
import useCart from '../Cart/useCart';
import Styles from '../../constants/themeColors';
import useSearchresults from './useSearchresults';
import Sizeselection from '../../components/atoms/Sizeselect';
import FilterSelectSize from '../../components/atoms/FilterSizes/FilterSizeSelect';
import PriceRangeDropdown from '../../components/atoms/PriceRange/PriceDropdown';
import SubCategoryDropdown from '../../components/atoms/SubcategoryDropdown/SubcategoryDropdown';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
const SearchResultsScreen = ({route}) => {
  const navigation = useNavigation();
  const {searchResults} = route.params;
  const goBackButton = () => {
    navigation.goBack();
  };
  // const {colorScheme} = useCart();
  const {
    FilterData,
    minimumPrice,
    setMinimumPrice,
    maximumPrice,
    setMaximumPrice,
    selectedSize,
    setSelectedSize,
    sizes,
    modalVisible,
    setModalVisible,
    handleFilterButtonPress,
    filteredProducts,
    SubcategoryData,
    handleFilterapply,
    selectedSubCategory,
    setSelectedSubCategory,
    subcategoriesData,
  } = useSearchresults();
  const {colorScheme} = useContext(ColorSchemeContext);
  const productsToShow =
    filteredProducts.length > 0 ? filteredProducts : searchResults;
  return (
    <View
      style={[
        colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
        {width: '100%', height: '100%'},
      ]}>
      <View style={style.addAddressHeader}>
        <TouchableOpacity style={style.backBtn} onPress={goBackButton}>
          <MaterialIcons color={Colors.black} size={20} name="arrow-back-ios" />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={[
              style.addAddressText,
              colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
            ]}>
            Search results
          </Text>
          <MaterialIcons
            onPress={handleFilterButtonPress}
            style={style.filter}
            size={28}
            name="filter-list-alt"
            color={colorScheme === 'dark' ? Colors.white : Colors.black}
          />
        </View>
      </View>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View
          style={[
            style.mainContainer,
            colorScheme === 'dark' ? Styles.ButtonColor : Styles.ButtonColor,
          ]}>
          <Text
            style={[
              style.headertext,
              colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
            ]}>
            Filters
          </Text>
          <View style={style.modalContainer}>
            <View style={style.sizeDropdown}>
              <Text
                style={[
                  style.filterText,
                  colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
                ]}>
                Select size
              </Text>
              <FilterSelectSize
                selectedSize={selectedSize}
                sizes={sizes}
                onSelectSize={size => setSelectedSize(size)}
              />
            </View>
            <Text
              style={[
                style.priceText,
                colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
              ]}>
              Select Price
            </Text>
            <PriceRangeDropdown
              minPrice={minimumPrice}
              maxPrice={maximumPrice}
              onSelectPriceRange={(min, max) => {
                setMinimumPrice(min);
                setMaximumPrice(max);
              }}
            />
            <Text
              style={[
                style.priceText,
                colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
              ]}>
              Select Category
            </Text>
            <SubCategoryDropdown
              value={subcategoriesData} // Pass the subCategories data here
              onChange={(selectedOption: React.SetStateAction<{}>) =>
                setSelectedSubCategory(selectedOption)
              }
            />
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={style.closetouchablecontainer}
                onPress={() => setModalVisible(false)}>
                <Text style={style.closeText}>close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  style.touchablecontainer,
                  colorScheme === 'dark'
                    ? Styles.blacktheme
                    : Styles.whiteTheme,
                ]}
                onPress={handleFilterapply}>
                <Text
                  style={[
                    style.applyText,
                    colorScheme === 'dark'
                      ? Styles.whitetext
                      : Styles.blackText,
                  ]}>
                  Apply
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {productsToShow.length > 0 ? (
        <FlatList
          data={productsToShow}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  width: '50%',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  // backgroundColor:'white',
                }}>
                <View
                  style={{
                    // alignItems: 'center',
                    width: '100%',
                  }}>
                  <View
                    style={[
                      style.container,
                      colorScheme === 'dark' ? Styles.cardColor : Styles.main,
                    ]}>
                    <TouchableOpacity
                      key={item.id}
                      style={{width: '100%'}}
                      onPress={() =>
                        navigation.navigate('UProductDetails', {
                          product: item,
                        })
                      }>
                      <View style={style.imageContainer}>
                        <Image
                          source={{uri: item.imageUrl[0]}}
                          style={style.image}
                        />
                      </View>
                    </TouchableOpacity>
                    <View style={style.cardTextContainer}>
                      <View style={{marginTop: 20}}>
                        <Text
                          style={[
                            style.name,
                            colorScheme === 'dark'
                              ? Styles.whitetext
                              : Styles.blackText,
                          ]}>
                          {item.name}
                        </Text>
                      </View>
                      <View style={style.textContainer}>
                        <Text style={style.price}>{'₹' + item.price}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
          numColumns={2}
        />
      ) : (
        <View
          style={[
            {width: '100%', height: '100%'},
            colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
          ]}>
          <View
            style={[
              {
                justifyContent: 'center',
                alignSelf: 'center',
              },
            ]}>
            <Text
              style={[
                style.titleText,
                colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
              ]}>
              Umm...No results found
            </Text>
          </View>
          <View
            style={[
              style.titleTextContainer,
              colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
            ]}>
            <Lottie
              style={[
                style.imageS,
                colorScheme === 'dark' ? Styles.blacktheme : Styles.w,
              ]}
              source={require('../../../assets/search.json')}
              autoPlay
            />
          </View>
        </View>
      )}
    </View>
  );
};
export default SearchResultsScreen;
