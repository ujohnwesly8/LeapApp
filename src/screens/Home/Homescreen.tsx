
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  RefreshControl,
  FlatList,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Carousal from './Carousal';
import {
  postProductToAPI,
  postProductToCartAPI,
} from '../../redux/actions/actions';

import style from './homeStyles';
import useHome from './useHome';
import {SafeAreaView} from 'react-native-safe-area-context';
import Colors from '../../constants/Colors';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import ProfileData from '../Profile/ProfileData';
import Styles from '../../constants/themeColors';
type Props = {
  route: {name: string};
  navigation: any;
};
const Homescreen = ({navigation}: Props) => {
  const dispatch = useDispatch();
  const {name} = ProfileData();
  const UserProducts = useHome();
  const {
    refreshing,
    onRefresh,
    removefromWishlist,
    searchQuery,
    searchProducts,
    setSearchQuery,
    loading,
    // recommendations,
  } = useHome();

  return (
    <SafeAreaView
      style={{
        height: '100%',
        width: '100%',
        overflow: 'scroll',
      }}>
      {loading ? (
      ) : (
        <View
          style={[
            style.mainContainer,
          ]}>
          {/* <Header title={'Leap'} /> */}
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                marginLeft: 20,
              }}></View>
          <View
            style={[
              style.searchInputContainer,
            ]}>
            <TextInput
              placeholder="Search"
              placeholderTextColor={
              }
              style={[
                {
                  // height: 10,
                  fontFamily: 'Poppins-Regular',
                  fontSize: 16,
                  width: '100%',
                  height: 45,
                  marginTop: 8,
                  paddingLeft: 10,
                  color: 'black',
                },
              ]}
              onChangeText={text => {
                setSearchQuery(text);
                // searchProducts(text);
              }}
              onSubmitEditing={() => searchProducts(searchQuery)}
            />
          </View>
          <View style={style.categoriesContainer}>
            <Text
              style={[
                style.CategoriesText,
              ]}>
              {' '}
              Categories for you
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('CategoryScreen')}>
              <Text style={style.Seetext}> See all</Text>
            </TouchableOpacity>
          </View>
          <Carousal />
          <Text
            style={[
              style.Productstext,
            ]}>
            Products for you
          </Text>
          {/* <View
            style={{
              borderBottomColor: '#3E54AC',
              borderBottomWidth: 1,
              marginHorizontal: 154,
              marginTop: 10,
            }}
          /> */}
          <SafeAreaView style={{height: '100%', flex: 1}}>
            <View style={{marginLeft: 5, height: '100%'}}>
              <FlatList
                data={allProducts}
                nestedScrollEnabled={true} //changes
                // data={searchResults.length > 0 ? searchResults : allProducts}
                keyExtractor={item => item.id}
                style={{height: '100%', width: '100%'}}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                numColumns={2}
                showsHorizontalScrollIndicator={false}
                renderItem={({item, id}) => {
                  return (
                    <View
                      style={[
                        style.container,
                      ]}>
                      <TouchableOpacity
                        key={item.id}
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
                          <TouchableOpacity
                            style={style.wishlistButton}
                            onPress={() => {
                              if (wishlistList.includes(item.id)) {
                                setWishlistList(
                                  wishlistList.filter(id => id !== item.id),
                                );
                                removefromWishlist(item.id);
                              } else {
                                setWishlistList([...wishlistList, item.id]);
                                dispatch(postProductToAPI({...item}));
                              }
                            }}>
                            {wishlistList.includes(item.id) ? (
                              // <Image
                              //   source={require('../../../assets/fillheart.png')}
                              //   style={{width: 20, height: 20}}
                              // />
                              <MaterialIcons
                                size={20}
                                color={'red'}
                                name="cards-heart"
                              />
                            ) : (
                              // <Image
                              //   source={require('../../../assets/heart.png')}
                              //   style={{width: 20, height: 20}}
                              // />
                              <MaterialIcons
                                size={20}
                                color={'white'}
                                name="cards-heart"
                              />
                            )}
                          </TouchableOpacity>
                        </View>
                      </TouchableOpacity>
                      <View style={style.cardTextContainer}>
                        {/* <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}> */}
                        <Text
                          style={[
                            style.name,
                          ]}>
                          {item.name}
                        </Text>
                        {/* </View> */}
                        <View style={style.textContainer}>
                          <Text style={style.price}>{'₹' + item.price}</Text>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          </SafeAreaView>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Homescreen;
