import React, {useContext} from 'react';
import {useSelector} from 'react-redux';
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Lottie from 'lottie-react-native';

import Colors from '../../constants/colors';
import Styles from '../../constants/themeColors';

import useWishlist from './useWishlist';
import style from './wishlistStyles';
import CustomModal from '../../components/atoms/CustomModel/CustomModel';

// import CustomModalContext from '../../../CustomModalContext';

type Props = {
  route: {name: string};
  navigation: any;
};
const Wishlist = ({navigation}: Props) => {
  //new changes
  // const {openModal} = useContext(CustomModalContext);

  // const handleRemoveFromWishlist = () => {
  //   // Remove item from wishlist logic
  //   openModal('Item removed!');
  // };

  const {
    WishlistProducts,
    removefromWishlist,
    closeModal,
    showModal,
    openModal,
    colorScheme,
  } = useWishlist();

  const {refreshing, onRefresh} = useWishlist();
  const allWishlistProducts = useSelector(
    (state: {WishlistProducts: {data: any[]}}) => state.WishlistProducts.data,
  );
  console.log('hey', allWishlistProducts);
  const isLoading = useSelector(
    (state: {WishlistProducts: {isLoader: boolean}}) =>
      state.WishlistProducts.isLoader,
  );
  console.log(isLoading);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colorScheme === 'dark' ? Colors.black : Colors.main,
        }}>
        <Lottie
          source={require('../../../assets/loading2.json')}
          autoPlay
          style={{
            height: 200,
            width: 200,
            alignSelf: 'center',
            marginTop: '50%',
            justifyContent: 'center',
          }}
        />
        <Text style={{color: Colors.white, marginLeft: '30%'}}>
          The Items are Loading...
        </Text>
      </View>
    );
  }
  if (!WishlistProducts) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colorScheme === 'dark' ? Colors.black : Colors.main,
        }}>
        <Lottie
          source={require('../../../assets/loading2.json')}
          autoPlay
          style={{
            height: 200,
            width: 200,
            alignSelf: 'center',
            marginTop: '50%',
            justifyContent: 'center',
          }}
        />
        <Text style={{color: Colors.white, marginLeft: '30%'}}>
          The Items are Loading...
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[
        style.maincontainer,
        colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
      ]}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Text
          style={[
            style.textStylewishlist,
            colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
          ]}>
          Wishlist
        </Text>
        <View
          style={[
            style.textConatiner,
            colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
          ]}>
          <Text
            style={[
              style.textStyle,
              colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
            ]}>
            My favorites ({allWishlistProducts.length})
          </Text>
        </View>
        {allWishlistProducts.length === 0 ? (
          <>
            <View
              style={[
                style.lottieStyle,
                colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
              ]}>
              <Lottie
                source={require('../../../assets/wishlistanime.json')}
                autoPlay
                style={style.lottieImage}
              />
              <Text
                style={{
                  marginBottom: 20,
                  color: Colors.iconscolor,
                  fontSize: 15,
                  fontWeight: '600',
                }}>
                Your wishlist is empty
              </Text>
            </View>
          </>
        ) : (
          <View
            style={[
              style.maincontainer,
              colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
            ]}>
            <View
              style={{
                width: '100%',
              }}>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  width: '100%',
                  flexWrap: 'wrap',
                }}>
                {allWishlistProducts &&
                  allWishlistProducts.map((item, index) => {
                    return (
                      <View
                        style={{
                          width: '50%',
                          flexDirection: 'row',
                        }}
                        key={index}>
                        <View
                          style={[
                            style.container,
                            colorScheme === 'dark'
                              ? Styles.cardColor
                              : Styles.main,
                          ]}>
                          <TouchableOpacity
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
                            <View style={style.Cartcontents}>
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
                            <View
                              style={[
                                style.textContainer,
                                colorScheme === 'dark'
                                  ? Styles.whitetext
                                  : Styles.blackText,
                              ]}>
                              <Text style={style.price}>
                                {'₹' + item.price}
                              </Text>
                            </View>
                          </View>
                          <TouchableOpacity
                            style={style.wishlistButton}
                            onPress={() => removefromWishlist(item.id)}
                            onPressIn={() => openModal()}
                            // onPressIn={() => handleRemoveFromWishlist()}
                          >
                            <Image
                              source={require('../../../assets/fillheart.png')}
                              style={{width: 24, height: 24}}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  })}
              </View>
            </View>
          </View>
        )}
      </ScrollView>
      <CustomModal
        showModal={showModal}
        onClose={closeModal}
        message="Item Removed!"
      />
    </View>
  );
};

export default Wishlist;
