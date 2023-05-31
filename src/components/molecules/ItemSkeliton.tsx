import React from 'react';
import {View, StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const ItemSkeliton = () => {
  return (
    <SkeletonPlaceholder>
      <View style={styles.container}>
        <View style={styles.imageContainer} />
        <View style={styles.nameContainer} />
        <View style={styles.descriptionContainer} />
        <View style={styles.dropdownContainer} />
        <View style={styles.buttonContainer} />
      </View>
    </SkeletonPlaceholder>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  nameContainer: {
    marginTop: 20,
    width: '80%',
    height: 24,
    borderRadius: 5,
  },
  descriptionContainer: {
    marginTop: 10,
    width: '100%',
    height: 60,
    borderRadius: 5,
  },
  dropdownContainer: {
    marginTop: 10,
    width: '100%',
    height: 48,
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    height: 48,
    borderRadius: 5,
  },
});

export default ItemSkeliton;
