// /* eslint-disable react/self-closing-comp */
// /* eslint-disable react-native/no-inline-styles */
// import {
//   Image,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
//   TextInput,
//   RefreshControl,
//   FlatList,
// } from 'react-native';
// import React, {useState} from 'react';
// import Carousal from './Carousal';
// import {
//   postProductToAPI,
//   postProductToCartAPI,
// } from '../../redux/actions/actions';

// import style from './homeStyles';
// import Icon from 'react-native-vector-icons/AntDesign';
// import Lottie from 'lottie-react-native';
// import {useDispatch, useSelector} from 'react-redux';
// import useHome from './useHome';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import Colors from '../../constants/Colors';
// import CustomModal from '../../components/atoms/CustomModel/CustomModel';
// import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
// type Props = {
//   route: {name: string};
//   navigation: any;
// };
// const Homescreen = ({navigation}: Props) => {
//   const dispatch = useDispatch();

//   const UserProducts = useHome();
//   const {
//     refreshing,
//     onRefresh,
//     removefromWishlist,
//     searchQuery,
//     searchProducts,
//     setSearchQuery,
//     loading,
//     // recommendations,
//   } = useHome();
//   const allProducts = useSelector(state => state.UserProducts.data);
//   const [showModal, setShowModal] = useState(false);
//   const [wishlistList, setWishlistList] = useState([]);

//   // console.log(allProducts);
//   // const handleHeartClick = item => {
//   //   dispatch(postProductToAPI(item));
//   //   console.log('success');
//   // };
//   const openModal = () => {
//     setShowModal(true);
//   };
//   const closeModal = () => {
//     setShowModal(false);
//   };

//   if (!UserProducts) {
//     return (
//       <View
//         style={{
//           alignItems: 'center',
//           justifyContent: 'center',
//           height: '100%',
//         }}>
//         <Lottie
//           source={require('../../../assets/loading.json')}
//           autoPlay
//           style={{
//             height: 200,
//             width: 200,
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}
//         />
//         <Text>The Items are Loading...</Text>
//       </View>
//     );
//   }

//   console.log('indranil', allProducts);

//   return (
//     <SafeAreaView
//       style={{flex: 1, backgroundColor: '#ECF2FF', overflow: 'scroll'}}>
//       {loading ? (
//         <SkeletonPlaceholder>
//           <View
//             style={{
//               backgroundColor: Colors.main,
//               height: 900,
//               width: 400,
//             }}>
//             <Text
//               style={{
//                 marginLeft: 26,
//                 marginTop: 10,
//                 fontWeight: '900',
//                 fontFamily: 'poppins',
//                 fontSize: 15,
//                 color: '#3E54AC',
//               }}></Text>

//             <View style={style.searchInputContainer}>
//               <TextInput
//                 style={{fontSize: 20, paddingLeft: 10, color: 'black'}}
//               />
//             </View>
//             <View
//               style={{
//                 marginTop: 20,
//                 height: 200,
//                 width: 400,
//                 borderRadius: 40,
//               }}></View>
//             <Text
//               style={{
//                 marginTop: 20,
//                 fontSize: 18,
//                 color: '#3E54AC',
//                 fontWeight: 'bold',
//                 alignItems: 'center',
//                 textAlign: 'center',
//                 justifyContent: 'center',
//                 fontFamily: 'poppins',
//               }}></Text>
//             <View
//               style={{
//                 borderBottomColor: '#3E54AC',
//                 borderBottomWidth: 1,
//                 marginHorizontal: 154,
//                 marginTop: 10,
//               }}
//             />
//             <View
//               style={{
//                 flex: 1,
//                 backgroundColor: Colors.main,
//                 flexWrap: 'wrap',
//               }}>
//               {/* Other code */}
//               <View style={{flexDirection: 'row'}}>
//                 <View
//                   style={{
//                     marginTop: 20,
//                     // marginLeft: 5,
//                     alignItems: 'center',
//                     flexDirection: 'row',
//                     marginBottom: 50,
//                     flexWrap: 'wrap',
//                     // justifyContent: 'space-between',
//                     backgroundColor: Colors.main,
//                   }}>
//                   <View style={style.container}>
//                     <TouchableOpacity>
//                       <View style={style.imageContainer}>
//                         <Text style={style.image}></Text>
//                       </View>
//                     </TouchableOpacity>
//                     <View
//                       style={{
//                         flexDirection: 'row',
//                         justifyContent: 'flex-end',
//                       }}>
//                       <View style={style.cardTextContainer}>
//                         <Text style={style.name}></Text>
//                       </View>
//                       <View style={style.textContainer}>
//                         <Text style={style.price}></Text>
//                         <TouchableOpacity style={style.rentButton}>
//                           <Text style={style.rentText}></Text>
//                         </TouchableOpacity>
//                       </View>
//                     </View>
//                     <TouchableOpacity
//                       style={style.wishlistButton}></TouchableOpacity>
//                   </View>
//                 </View>
//                 <View
//                   style={{
//                     marginTop: 50,
//                     // marginLeft: 5,
//                     alignItems: 'center',
//                     flexDirection: 'row',
//                     marginBottom: 50,
//                     flexWrap: 'wrap',
//                     // justifyContent: 'space-between',
//                     backgroundColor: Colors.main,
//                   }}></View>
//               </View>
//             </View>
//           </View>
//         </SkeletonPlaceholder>
//       ) : (
//         <View style={{flex: 1, backgroundColor: Colors.main}}>
//           {/* <Header title={'Leap'} /> */}
//           <Text
//             style={{
//               marginLeft: 26,
//               marginTop: 10,
//               fontWeight: '900',
//               fontFamily: 'poppins',
//               fontSize: 15,
//               color: '#3E54AC',
//             }}>
//             Leap
//           </Text>

//           <View style={style.searchInputContainer}>
//             <Icon
//               name="search1"
//               size={20}
//               style={{marginLeft: 20, color: Colors.white}}
//             />

//             <TextInput
//               placeholder="Search"
//               placeholderTextColor={Colors.white}
//               style={{
//                 fontSize: 15,
//                 // marginTop: 9,
//                 paddingLeft: 10,
//                 color: 'black',
//               }}
//               onChangeText={text => {
//                 setSearchQuery(text);
//                 // searchProducts(text);
//               }}
//               onSubmitEditing={() => searchProducts(searchQuery)}
//             />
//           </View>

//           <Carousal />
//           <Text
//             style={{
//               marginTop: 20,
//               fontSize: 18,
//               color: '#3E54AC',
//               fontWeight: 'bold',
//               alignItems: 'center',
//               textAlign: 'center',
//               justifyContent: 'center',
//               fontFamily: 'poppins',
//             }}>
//             Products For You
//           </Text>
//           <View
//             style={{
//               borderBottomColor: '#3E54AC',
//               borderBottomWidth: 1,
//               marginHorizontal: 154,
//               marginTop: 10,
//             }}
//           />
//           <SafeAreaView style={{flex: 1}}>
//             <View style={{alignItems: 'center'}}>
//               <FlatList
//                 data={allProducts}
//                 nestedScrollEnabled={true} //changes
//                 // data={searchResults.length > 0 ? searchResults : allProducts}
//                 keyExtractor={item => item.id}
//                 refreshControl={
//                   <RefreshControl
//                     refreshing={refreshing}
//                     onRefresh={onRefresh}
//                   />
//                 }
//                 numColumns={2}
//                 showsHorizontalScrollIndicator={false}
//                 renderItem={({item, id}) => {
//                   return (
//                     <View style={style.container}>
//                       <TouchableOpacity
//                         key={item.id}
//                         onPress={() =>
//                           navigation.navigate('UProductDetails', {
//                             product: item,
//                           })
//                         }>
//                         <View style={style.imageContainer}>
//                           <Image
//                             source={{uri: item.imageUrl[0]}}
//                             style={style.image}
//                           />
//                         </View>
//                       </TouchableOpacity>
//                       <View style={style.cardTextContainer}>
//                         <View
//                           style={{
//                             flexDirection: 'row',
//                             justifyContent: 'space-between',
//                           }}>
//                           <Text style={style.name}>{item.name}</Text>
//                         </View>
//                         <View style={style.textContainer}>
//                           <Text style={style.price}>{'₹' + item.price}</Text>
//                           {/* <TouchableOpacity
//                             style={style.rentButton}
//                             onPress={() => {
//                               // dispatch(addItemToCart(item));
//                               // dispatch(postProductToCartAPI({...item}));
//                             }}>
//                             <Text style={style.rentText}>Rent</Text>
//                           </TouchableOpacity> */}
//                         </View>
//                       </View>
//                       <TouchableOpacity
//                         style={style.wishlistButton}
//                         onPress={() => {
//                           if (wishlistList.includes(item.id)) {
//                             setWishlistList(
//                               wishlistList.filter(id => id !== item.id),
//                             );
//                             removefromWishlist(item.id);
//                           } else {
//                             setWishlistList([...wishlistList, item.id]);
//                             dispatch(postProductToAPI({...item}));
//                           }
//                         }}>
//                         {wishlistList.includes(item.id) ? (
//                           <Image
//                             source={require('../../../assets/fillheart.png')}
//                             style={{width: 20, height: 20}}
//                           />
//                         ) : (
//                           <Image
//                             source={require('../../../assets/heart.png')}
//                             style={{width: 20, height: 20}}
//                           />
//                         )}
//                       </TouchableOpacity>
//                     </View>
//                   );
//                 }}
//               />
//             </View>
//           </SafeAreaView>
//         </View>
//       )}
//       <CustomModal
//         showModal={showModal}
//         onClose={closeModal}
//         message="Need to set Rental dates!"
//       />
//     </SafeAreaView>
//   );
// };

// export default Homescreen;
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
import CustomModal from '../../components/atoms/CustomModel/CustomModel';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import ProfileData from '../Profile/ProfileData';
import Styles from '../../constants/themeColors';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
import Togglebutton from '../../components/atoms/Colorscheme/Togglebutton';
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
    closeModal,
    showModal,
    // recommendations,
  } = useHome();
  const allProducts = useSelector(state => state.UserProducts.data);
  // const [showModal, setShowModal] = useState(false);
  const [wishlistList, setWishlistList] = useState([]);
  // const colorScheme = useColorScheme();
  const {colorScheme} = useContext(ColorSchemeContext);
  useEffect(() => {
    console.log(colorScheme);
  });

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
        backgroundColor: colorScheme === 'dark' ? Colors.black : Colors.main,
        overflow: 'scroll',
      }}>
      {loading ? (
        <SkeletonPlaceholder
          highlightColor="#e0e0e0"
          backgroundColor={colorScheme === 'dark' ? '#373737' : '#f2f2f2'}>
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
              color: colorScheme === 'dark' ? Colors.white : Colors.black,
            }}></Text>
          <View
            style={[
              style.searchInputContainer,
              colorScheme === 'dark' ? style.cardColor : Styles.main,
            ]}>
            <TextInput
              placeholder="Search"
              placeholderTextColor={
                colorScheme === 'dark' ? Colors.white : Colors.black
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
              color: colorScheme === 'dark' ? Colors.white : Colors.black,
            }}></Text>
          <View style={style.categoriesContainer}>
            <Text
              style={[
                style.CategoriesText,
                colorScheme === 'dark' ? style.whitetext : style.blackText,
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
            colorScheme === 'dark' ? style.blacktheme : style.whiteTheme,
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
                color: colorScheme === 'dark' ? Colors.white : Colors.black,
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
              colorScheme === 'dark' ? style.cardColor : Styles.main,
            ]}>
            <Icon
              name="search1"
              size={20}
              style={{
                marginLeft: 20,
                color: colorScheme === 'dark' ? Colors.white : Colors.black,
              }}
            />
            <TextInput
              placeholder="Search"
              placeholderTextColor={
                colorScheme === 'dark' ? Colors.white : Colors.black
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
                colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
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
                colorScheme === 'dark' ? style.whitetext : style.blackText,
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
              colorScheme === 'dark' ? style.whitetext : style.blackText,
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
                        colorScheme === 'dark' ? style.cardColor : Styles.main,
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
                            colorScheme === 'dark'
                              ? style.whitetext
                              : style.blackText,
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
      <CustomModal
        showModal={showModal}
        onClose={closeModal}
        message="Item Removed from Wishlist!!"
      />
    </SafeAreaView>
  );
};

export default Homescreen;
