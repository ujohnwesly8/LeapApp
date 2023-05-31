/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity, TextInput, Image} from 'react-native';
import React from 'react';
import useFilterScreen from './useFilterScreen';
import Colors from '../../constants/Colors';
import styles from './filterStyles';

const FilterScreen = () => {
  const {
    FilterData,
    minimumPrice,
    maximumPrice,
    setMinimumPrice,
    setMaximumPrice,
    filteredProducts,
    SetSize,
    size,
  } = useFilterScreen();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.subContainer}>
        <TextInput
          style={styles.textInput}
          value={minimumPrice}
          onChangeText={text => setMinimumPrice(text)}
          placeholder="Enter Minimum Price"
        />
        <TextInput
          style={styles.textInput}
          value={maximumPrice}
          onChangeText={text => setMaximumPrice(text)}
          placeholder="Enter Maximum Price"
        />
        <TextInput
          value={size}
          onChangeText={text => SetSize(text)}
          style={styles.textInput}
          placeholder="Enter Size"
        />
      </View>
      <View style={{width: '50%', height: 200}}>
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <View
              style={styles.productsContainer}
              key={`${product.id}-${index}`}>
              {product.imageUrl && product.imageUrl.length > 0 && (
                <Image
                  source={{uri: product.imageUrl[0]}}
                  style={styles.productImage}
                />
              )}
              <View>
                <Text>Product Name: {product.name}</Text>
                <Text>Brand: {product.brand}</Text>
                <Text>Price: {product.price}</Text>
              </View>
              {/* Add more product information you want to display */}
            </View>
          ))
        ) : (
          <Text>No products found.</Text>
        )}
      </View>
      <TouchableOpacity
        style={{
          width: 150,
          height: 40,
          borderRadius: 8,
          backgroundColor: Colors.buttonColor,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={FilterData}>
        <Text style={{color: Colors.white}}>FilterScreen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FilterScreen;
