// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useNavigation} from '@react-navigation/native';
// import {useEffect, useState} from 'react';
// import {profileUpload, url} from '../../constants/Apis';
// import {launchImageLibrary} from 'react-native-image-picker';
// import ApiService from '../../network/network';

// const ProfileData = () => {
//   const navigation = useNavigation();
//   const [name, setFirstName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phonenumber, setPhone] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [imageUrls, setImageUrls] = useState([]);
//   const [profilePic, setProfileImage] = useState('');
//   const [selectedImage, setSelectedImage] = useState('');
//   const [isloading, setIsloading] = useState(false);
//   const fetchProfileData = async () => {
//     const token = await AsyncStorage.getItem('token');
//     try {
//       setIsLoading(true);
//       const response = await fetch(`${url}/user/getUser`, {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       if (response.ok) {
//         const profileData = await response.json();
//         setFirstName(profileData.firstName);
//         setEmail(profileData.email);
//         setPhone(profileData.phoneNumber);
//         setProfileImage(profileData.profileImageUrl);
//         console.log('profilePic', profilePic);
//         console.log('Profile Data', profileData);
//       } else {
//         throw new Error('Failed to fetch profile name');
//       }
//     } catch (error) {
//       console.error(error);
//       // Alert.alert('Failed to fetch profile name');
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   const handleRemoveProfilePic = async () => {
//     const response = await ApiService.post(`${profileUpload}=${null}`);
//     console.log('Upload response', response);
//   };

//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//       fetchProfileData();
//     });
//     return unsubscribe;
//   }, [navigation]);

//   const pickImage = () => {
//     launchImageLibrary(
//       {
//         mediaType: 'photo',
//         selectionLimit: 10,
//       },
//       async response => {
//         if (response.didCancel) {
//           console.log('User cancelled image picker');
//         } else if (response.error) {
//           console.log('ImagePicker Error: ', response.error);
//         } else {
//           const images = response.assets.map(imagePath => ({
//             uri: imagePath.uri,
//             type: 'image/png',
//             name: 'image.png',
//           }));
//           const formData = new FormData();
//           images.forEach((file, _index) => {
//             formData.append('file', {
//               uri: file.uri,
//               type: 'image/png',
//               name: 'image.png',
//             });
//           });
//           try {
//             setIsloading(true);
//             const token = await AsyncStorage.getItem('token');
//             console.log(token);
//             const result = await fetch(`${url}/file/uploadProfileImage`, {
//               method: 'POST',
//               body: formData,
//               headers: {
//                 'Content-Type': 'multipart/form-data',
//                 Authorization: `Bearer ${token}`,
//               },
//             });
//             if (result.ok) {
//               const res = await result.json();
//               setIsloading(false);
//               console.log(res);
//               // setImageUrls(res.urls);
//               setSelectedImage(res.url);
//               console.log(imageUrls);
//               console.log('selectedImage is ', res.url);
//               console.log('selectedImage is ', res.url);
//               uploadImage(res.url); // Update this line
//             } else {
//               const res = await result.json();
//               console.log('Upload failed');
//               console.log(res);
//               console.log(token);
//             }
//           } catch (error) {
//             console.error(error);
//             setIsloading(true);
//           }
//         }
//       },
//     );
//   };

//   const uploadImage = async imageurl => {
//     console.log('selected image is ', imageurl);
//     const response = await ApiService.post(`${profileUpload}=${imageurl}`);
//     setSelectedImage(imageurl);
//     console.log('Upload response', response);
//   };
//   console.log(selectedImage);
//   console.log('profilePic', profilePic);

//   return {
//     name,
//     email,
//     phonenumber,
//     isLoading,
//     pickImage,
//     uploadImage,
//     imageUrls,
//     profilePic,
//     handleRemoveProfilePic,
//     setProfileImage,
//     selectedImage,
//     setSelectedImage,
//     isloading,
//     setIsloading,
//   };
// };

// export default ProfileData;
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {profileUpload, url} from '../../constants/Apis';
import {launchImageLibrary} from 'react-native-image-picker';
import ApiService from '../../network/network';

const ProfileData = () => {
  const navigation = useNavigation();
  const [name, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [profilePic, setProfileImage] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [isloading, setIsloading] = useState(false);
  const [showModall, setShowModall] = useState(false);
  const [showModal1, setShowModall1] = useState(false);
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
        setProfileImage(profileData.profileImageUrl);
        console.log('profilePic', profilePic);
        console.log('Profile Data', profileData);
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

  const handleRemoveProfilePic = async () => {
    const response = await ApiService.post(`${profileUpload}=${null}`);
    console.log('Upload response', response);
    openModal1();
  };
  const openModal = () => {
    setShowModall(true);
  };
  const closeModal = () => {
    setShowModall(false);
  };
  const openModal1 = () => {
    setShowModall1(true);
  };
  const closeModal1 = () => {
    setShowModall1(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchProfileData();
    });
    return unsubscribe;
  }, [navigation]);

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 10,
      },
      async response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          const images = response.assets.map(imagePath => ({
            uri: imagePath.uri,
            type: 'image/png',
            name: 'image.png',
          }));
          const formData = new FormData();
          images.forEach((file, _index) => {
            formData.append('file', {
              uri: file.uri,
              type: 'image/png',
              name: 'image.png',
            });
          });
          try {
            setIsloading(true);
            const token = await AsyncStorage.getItem('token');
            console.log(token);
            const result = await fetch(`${url}/file/uploadProfileImage`, {
              method: 'POST',
              body: formData,
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
              },
            });
            if (result.ok) {
              const res = await result.json();
              setIsloading(false);
              console.log('res is ', res);
              setSelectedImage(res.url);
              console.log('selectedImage is ', res.url);
              console.log('selectedImage is ', res.url);
              uploadImage(res.url);
              fetchProfileData();
              openModal(); // Fetch the updated profile data after uploading
            } else {
              const res = await result.json();
              console.log('Upload failed');
              console.log(res);
              console.log(token);
            }
          } catch (error) {
            console.error(error);
            setIsloading(true);
          }
        }
      },
    );
  };

  const uploadImage = async imageurl => {
    console.log('selected image is ', imageurl);
    const response = await ApiService.post(`${profileUpload}=${imageurl}`);
    setSelectedImage(imageurl);
    console.log('Upload response', response);
  };

  console.log(selectedImage);
  console.log('profilePic', profilePic);

  return {
    name,
    email,
    phonenumber,
    isLoading,
    pickImage,
    uploadImage,
    imageUrls,
    profilePic,
    handleRemoveProfilePic,
    setProfileImage,
    selectedImage,
    setSelectedImage,
    isloading,
    setIsloading,
    openModal,
    closeModal,
    showModall,
    closeModal1,
    openModal1,
    showModal1,
  };
};

export default ProfileData;
