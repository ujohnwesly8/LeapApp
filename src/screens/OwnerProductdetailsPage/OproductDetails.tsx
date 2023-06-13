import React from 'react';
import {StatusBar, Text, View, ImageBackground, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../OwnerProductdetailsPage/oProductDetailsStyle';
import useOProductDetails from './useOProductDetails';
import Styles from '../../constants/themeColors';

type Props = {
  route: {params: {product: any}};
  navigation: any;
};

const OproductDetails = ({route, navigation}: Props) => {
  const {product, colorScheme, goBack} = useOProductDetails({
    route,
    navigation,
  });

  return (
    <View
      style={[
        styles.container,
        colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
      ]}>
      <StatusBar translucent backgroundColor={'rgba(0,0,0,0)'} />
      <View style={styles.dheader}>
        <Icon name="arrow-back-ios" size={28} color="black" onPress={goBack} />
      </View>
      <ScrollView horizontal={true}>
        <View style={{flexDirection: 'row'}}>
          {product.imageUrl.map((item: any, index: any) => (
            <ImageBackground
              key={index}
              style={styles.imgBack}
              source={{uri: item}}></ImageBackground>
          ))}
        </View>
      </ScrollView>
      <View
        style={[
          styles.detailsContainer,
          colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
          {marginTop: -50},
        ]}>
        <Text
          style={[
            styles.startext,
            colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
          ]}>
          {product.name}
        </Text>
        <View style={styles.titleText}>
          <Text
            style={[
              styles.headingtext,
              colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
            ]}>
            Price
          </Text>
        </View>
        <Text style={styles.detailsdescription}>₹ {product.price}</Text>
        <View style={styles.titleText}>
          <Text
            style={[
              styles.headingtext,
              colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
            ]}>
            Description
          </Text>
        </View>
        <Text style={styles.detailsdescription}>{product.description}</Text>
      </View>
    </View>
  );
};

export default OproductDetails;
