/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {StatusBar, Text, View, ImageBackground, ScrollView} from 'react-native';
import styles from '../OwnerProductdetailsPage/OproductdetailsStyle';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Styles from '../../constants/themeColors';
import useCart from '../Cart/useCart';
import {ColorSchemeContext} from '../../../ColorSchemeContext';

type Props = {
  route: {params: {product: any}};
  navigation: any;
};

export default function OproductDetails({route, navigation}: Props) {
  const {product} = route.params;
  const {colorScheme} = useContext(ColorSchemeContext);

  return (
    <View
      style={[
        styles.container,
        colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
      ]}>
      <StatusBar translucent backgroundColor={'rgba(0,0,0,0)'} />
      <View style={styles.dheader}>
        <Icon
          name="arrow-back-ios"
          size={28}
          color="black"
          onPress={() => navigation.goBack()}
        />
      </View>
      <ScrollView horizontal={true}>
        <View style={{flexDirection: 'row'}}>
          {product.imageUrl.map((item, index) => (
            <ImageBackground
              key={index}
              style={{
                height: 500,
                width: 405,
                backgroundColor: 'green',
                marginLeft: -5,
              }}
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
        <View style={{marginTop: 20}}>
          <Text
            style={[
              styles.headingtext,
              colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
            ]}>
            Price
          </Text>
        </View>
        <Text style={styles.detailsdescription}>₹ {product.price}</Text>
        <View style={{marginTop: 20}}>
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
}
