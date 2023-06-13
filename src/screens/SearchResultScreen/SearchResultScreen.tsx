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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Lottie from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import style from './searchResultStyles';
import useSearchresults from './useSearchResults';
import FilterSelectSize from '../../components/atoms/FilterSizes/FilterSizeSelect';
import PriceRangeDropdown from '../../components/atoms/PriceRange/PriceDropdown';
import SubCategoryDropdown from '../../components/atoms/SubcategoryDropdown/SubcategoryDropdown';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
import Colors from '../../constants/colors';
import Styles from '../../constants/themeColors';

type RootStackParamList = {
  UProductDetails: {product: number};
};

const SearchResultsScreen = ({route}: {route: any}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {searchResults} = route.params;
  const goBackButton = () => {
    navigation.goBack();
  };

  const {
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

    handleFilterapply,

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
        style.outerStyle,
      ]}>
      <View style={style.addAddressHeader}>
        <TouchableOpacity style={style.backBtn} onPress={goBackButton}>
          <MaterialIcons color={Colors.black} size={20} name="arrow-back-ios" />
        </TouchableOpacity>
        <View style={style.viewStyle1}>
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
                onSelectSize={(size: any) => setSelectedSize(size)}
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
              onSelectPriceRange={(min: string, max: string) => {
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
              value={subcategoriesData}
              onChange={(selectedOption: React.SetStateAction<{}>) =>
                setSelectedSubCategory(selectedOption)
              }
            />
            <View style={style.btnStyle}>
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
              <View style={style.cardView}>
                <View style={style.innerCard}>
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
                      <View style={style.marginStyle}>
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
            style.noResultsView,
            colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
          ]}>
          <View style={style.innerView2}>
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
                colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
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
