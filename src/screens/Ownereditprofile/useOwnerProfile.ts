import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {url} from '../../constants/Apis';
function OwnerEditProfileCustomHook() {
  const [isLoading, setIsLoading] = useState(false);
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
  const handleUpdate = async () => {
    const token = await AsyncStorage.getItem('token');
    const data = JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
    });
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
        openModal();
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error(error);
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
    handleUpdate,
    isLoading,
    openModal,
    closeModal,
    showModal,
  };
}
export default OwnerEditProfileCustomHook;
