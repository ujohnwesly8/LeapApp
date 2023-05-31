import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {url} from '../../constants/Apis';
function OwnerEditProfileCustomHook() {
  const [isLoading, setIsLoading] = useState(false);
  // Initialize isLoading to true
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');


  const handleReset = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhoneNumber('');
  };
  const handleUpdate = async (_navigation: any) => {
    const token = await AsyncStorage.getItem('token');
    const data = JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
    });
    console.log(data);
    try {
      const response = await fetch(`${url}/user/update`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: data,
      });
      console.log();
      if (response.ok) {
        // Alert.alert('Profile updated!');
        // navigation.navigate('OwnerProfile');
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Failed to update profile');
    }
  };
  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    handleReset,
    handleUpdate,
    isLoading,
  };
}
export default OwnerEditProfileCustomHook;
