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
  useColorScheme,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Carousal from './Carousal';
import {
  postProductToAPI,
  postProductToCartAPI,
} from '../../redux/actions/actions';

import style from './homeStyles';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Lottie from 'lottie-react-native';
import {useDispatch, useSelector} from 'react-redux';
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
  const allProducts = useSelector(state => state.UserProducts.data);
  // const [showModal, setShowModal] = useState(false);
  const [wishlistList, setWishlistList] = useState([]);

  // console.log(allProducts);
  // const handleHeartClick = item => {
  //   dispatch(postProductToAPI(item));
  //   console.log('success');
  // };
  // const openModal = () => {
  //   setShowModal(true);
  // };
  // const closeModal = () => {
  //   setShowModal(false);
  // };

  if (!UserProducts) {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}>
        <Lottie
          source={require('../../../assets/loading.json')}
          autoPlay
          style={{
            height: 200,
            width: 200,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
        <Text>The Items are Loading...</Text>
      </View>
    );
  }

  console.log('indranil', allProducts);

  return (
    <SafeAreaView
      style={{
        height: '100%',
        width: '100%',
        overflow: 'scroll',
      }}>
      {loading ? (
        <SkeletonPlaceholder
          highlightColor="#e0e0e0"
          {/* <View
              style={[
                style.mainContainer,
                colorScheme === 'dark' ? style.blacktheme : style.whiteTheme,
              ]}> */}
          <Text
            style={{
              marginLeft: 26,
              marginTop: 10,
              width: 70,
              // fontWeight: '900',
              fontFamily: 'Poppins-SemiBold',
              fontSize: 15,
            }}></Text>
          <View
            style={[
              style.searchInputContainer,
            ]}>
            <TextInput
              placeholder="Search"
              placeholderTextColor={
              }
              style={{
                // height: 10,
                borderRadius: 40,
                fontFamily: 'Poppins-Regular',
                fontSize: 16,
                width: '90%',
                height: 45,
                marginTop: 8,
                paddingLeft: 10,
                // color: 'black',
              }}
            />
          </View>
          <Text
            style={{
              marginLeft: 26,
              marginTop: 30,
              width: 300,
              height: 25,
              borderRadius: 50,
              // fontWeight: '900',
              fontFamily: 'Poppins-SemiBold',
              fontSize: 15,
            }}></Text>
          <View style={style.categoriesContainer}>
            <Text
              style={[
                style.CategoriesText,
              ]}></Text>
            <TouchableOpacity>
              <Text style={style.Seetext}></Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View>
              <TextInput style={style.img}></TextInput>
            </View>
            <View>
              <TextInput style={style.img}></TextInput>
            </View>
            <View>
              <TextInput style={style.img}></TextInput>
            </View>
            <View>
              <TextInput style={style.img}></TextInput>
            </View>
            <View>
              <TextInput style={style.img}></TextInput>
            </View>
          </View>
          <View style={[style.container, {marginTop: 70}]}>
            <TouchableOpacity>
              <View style={style.imageContainer}>
                <TextInput style={style.image}></TextInput>
                <TouchableOpacity style={style.wishlistButton}>
                  <MaterialIcons size={20} color={'red'} name="cards-heart" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            {/* <View style={style.cardTextContainer}> */}
            <Text style={style.name}></Text>
            {/* </View> */}
            {/* <View style={style.textContainer}> */}
            <Text style={style.price}></Text>
            {/* </View> */}
            {/* </View> */}
          </View>
          {/* </View> */}
        </SkeletonPlaceholder>
      ) : (
        <View
          style={[
            style.mainContainer,
          ]}>
          {/* <Header title={'Leap'} /> */}
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                marginLeft: 26,
                marginTop: 10,
                // fontWeight: '900',
                fontFamily: 'Poppins-SemiBold',
                fontSize: 15,
              }}>
              Welcome {name}
            </Text>
            <Lottie
              source={require('../../../assets/celebration.json')}
              autoPlay
              style={{height: 45, width: 50}}
            />
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                marginLeft: 20,
              }}></View>
          </View>
          <View
            style={[
              style.searchInputContainer,
            ]}>
            <Icon
              name="search1"
              size={20}
              style={{
                marginLeft: 20,
              }}
            />
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
