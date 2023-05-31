import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {url} from '../../constants/Apis';
function OwnerEditProfileCustomHook() {
  const [isLoading, setIsLoading] = useState(false);
  // Initialize isLoading to true
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('token');
      try {
        const response = await fetch(`${url}/user/getUser`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const profileData = await response.json();
          setFirstName(profileData.firstName);
          setLastName(profileData.lastName);
          setEmail(profileData.email);
          setPhoneNumber(profileData.phoneNumber);
        } else {
          setIsLoading(true);
          throw new Error('Failed to fetch profile data');
        }
      } catch (error) {
        setIsLoading(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfileData();
  }, []);
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
        openModal();
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
    openModal,
    closeModal,
    showModal,
  };
}
export default OwnerEditProfileCustomHook;
