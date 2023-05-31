import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {url} from '../../constants/Apis';

const ProfileData = () => {
  const navigation = useNavigation();
  const [name, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchProfileData = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      setIsLoading(true);
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
        setEmail(profileData.email);
        setPhone(profileData.phoneNumber);
      } else {
        throw new Error('Failed to fetch profile name');
      }
    } catch (error) {
      console.error(error);
      // Alert.alert('Failed to fetch profile name');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchProfileData();
    });
    return unsubscribe;
  }, [navigation]);

  return {name, email, phonenumber, isLoading};
};

export default ProfileData;
