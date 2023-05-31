/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-shadow */
import {SetStateAction, useEffect, useState} from 'react';
import axios from 'axios';
import {
  EditItemsUrl,
  OwnerCategoryUrl,
  ProductsById,
} from '../../constants/Apis';
import {url as baseUrl} from '../../constants/Apis';
import {
  addGenderData,
  addsize,
  removeproducts,
} from '../../redux/actions/actions';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';
import ApiService from '../../network/network';
import {Data} from 'victory-core';
const Useowneredititems = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [gender, setGender] = useState('');
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState('');
  const [outfitType, setOutfitType] = useState('');
  const [itemType, setItemType] = useState('');
  const [selectedsize, setSelectedsize] = useState('');
  const [editProductId, setEditProductId] = useState(null);
  const [pref, setPrefill] = useState([]);
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  // const [showModal, setShowModal] = useState(false);
  const [visible, setViisble] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  console.log('snj xkcvn', editProductId);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const [Mapdata, setMapdata] = useState('');
  const handleName = () => {
    setName(data.name);
  };
  const handleGenderChange = (selectedGender: React.SetStateAction<string>) => {
    setGender(selectedGender);
    dispatch(addGenderData(selectedGender));
    // console.log(selectedGender);
  };
  const handleSelectItem = item => {
    setSelectedItem(item);
  };
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(EditItemsUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const mappedData = response.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.imageUrl[0],
        }));
        setData(mappedData);
        console.log(name);
        console.log(response.data);
        // setName(mappedData.name);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(true);
      }
    };
    fetchData();
  }, []);
  console.log(name);
  const FetchData = async editProductId => {
    try {
      setViisble(true);
      const ProductData = await ApiService.get(
        `${ProductsById}/${editProductId}`,
      );
      console.log('ProductData', ProductData);
      setMapdata(ProductData);
      setName(ProductData.name);
      setPrice(ProductData.price);
      setQuantity(ProductData.totalQuantity);
      setDescription(ProductData.description);
      return ProductData;
    } catch (error) {
      console.log('error is :', error);
      console.log('editProductId', editProductId);
    }
  };
  const [categoriesData, setCategoriesData] = useState([]);
  const [subCategoriesData, setSubCategoriesData] = useState([]);
  const [subEventCategoriesData, setSubEventCategoriesData] = useState([]);
  const [subOutfitCategoriesData, setSubOutfitCategoriesData] = useState([]);
  const genderData = useSelector(state => state.GenderReducer.genderData);
  console.log(genderData);

  // 1st api endpoint code starts

  useEffect(() => {
    // console.log(gender);
    const fetchSubCategoryData = async () => {
      try {
        // setIsLoading(true);
        const response = await axios.get(
          `${baseUrl}/api/v1/subcategory/listbyid/${genderData}`,
        );
        // console.log(response);
        const subCategoriesArray = response.data.map(
          (category: {id: any; subcategoryName: any}) => ({
            value: category.id,
            label: category.subcategoryName,
          }),
        );
        setSubCategoriesData(subCategoriesArray);
        console.log(subCategoriesArray);
      } catch (error) {
        console.log(error);
        // setIsLoading(true);
      } finally {
        // setIsLoading(false); // Set isLoading to false after the API call completes
      }
    };
    fetchSubCategoryData();
  }, [genderData]);

  useEffect(() => {
    // console.log(gender);
    const fetchEventCategoryData = async () => {
      try {
        // setIsLoading(true);
        const response = await axios.get(
          `${baseUrl}/api/v1/subcategory/listbyid/${1}`,
        );
        // console.log(response);
        const subEventCategoriesArray = response.data.map(
          (category: {id: any; subcategoryName: any}) => ({
            value: category.id,
            label: category.subcategoryName,
          }),
        );
        setSubEventCategoriesData(subEventCategoriesArray);
        console.log(subEventCategoriesArray);
      } catch (error) {
        console.log(error);
        // setIsLoading(true);
      } finally {
        // setIsLoading(false); // Set isLoading to false after the API call completes
      }
    };
    fetchEventCategoryData();
  }, []);

  useEffect(() => {
    // console.log(gender);
    const subOutfitCategoriesData = async () => {
      try {
        // setIsLoading(true);
        const response = await axios.get(
          `${baseUrl}/api/v1/subcategory/listbyid/${2}`,
        );
        // console.log(response);
        const subOutfitCategoriesArray = response.data.map(
          (category: {id: any; subcategoryName: any}) => ({
            value: category.id,
            label: category.subcategoryName,
          }),
        );
        setSubOutfitCategoriesData(subOutfitCategoriesArray);
        console.log(subOutfitCategoriesArray);
      } catch (error) {
        console.log(error);
        // setIsLoading(true);
      } finally {
        // setIsLoading(false); // Set isLoading to false after the API call completes
      }
    };
    subOutfitCategoriesData();
  }, []);
  // 2nd api call here

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        // setIsLoading(true);
        const response = await axios.get(OwnerCategoryUrl);
        const categoriesArray = response.data.map(
          (category: {id: any; categoryName: any}) => ({
            ...category,
            value: category.id,
            label: category.categoryName,
          }),
        );
        setCategoriesData(categoriesArray);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategoryData();
  }, []);
  const getImageUrl = async () => {
    const url = await AsyncStorage.getItem('url');
    // setUrl(url);
    console.log('Retrieved URL:', url);
  };
  useEffect(() => {
    getImageUrl();
  }, []);

  const [selectedImage, setSelectedImage] = useState('');
  const [imageUris, setImageUris] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const handleImageUris = urls => {
    setImageUrls(urls);
  };
  const handleremove = () => {
    setSelectedImage('');
  };
  const handleRemoveImages = () => {
    setImageUris([]);
  };
  useEffect(() => {
    const getImageUrls = async () => {
      const url = await AsyncStorage.getItem('url');
      if (url) {
        const imageUrls = Array.from({length: 10}, (_, index) => {
          return `${url}/file${index + 1}`;
        });
        imageUrls(imageUris);
      }
    };
    getImageUrls();
  }, [imageUris]);
  const pickImg = () => {
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
          images.forEach((file, index) => {
            formData.append('file', {
              uri: file.uri,
              type: 'image/png',
              name: 'image.png',
            });
          });
          try {
            const token = await AsyncStorage.getItem('token');
            console.log(token);
            const result = await fetch(`${baseUrl}/file/upload`, {
              method: 'POST',
              body: formData,
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
              },
            });
            if (result.ok) {
              const res = await result.json();
              console.log(res);
              setImageUrls(res.urls);
              setSelectedImage(res.urls);
              console.log(imageUrls); // Update this line
            } else {
              const res = await result.json();
              console.log('Upload failed');
              console.log(res);
              console.log(token);
            }
          } catch (error) {
            console.error(error);
          }
        }
      },
    );
  };

  const handleEventTypeChange = (
    selectedEventType: React.SetStateAction<string>,
  ) => {
    setEventType(selectedEventType);
  };

  const handleOutfitChange = (selectedOutfit: React.SetStateAction<string>) => {
    setOutfitType(selectedOutfit);
  };

  const handleItemTypeChange = (
    selectedItemType: React.SetStateAction<string>,
  ) => {
    setItemType(selectedItemType);
  };
  const handleSizeTypeChange = (selectedSize: SetStateAction<string>) => {
    setSelectedsize(selectedSize);
  };
  const handleedit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const data = {
        brand: 'addidas',
        categoryIds: [gender],
        color: 'black',
        description: description,
        id: 0,
        imageUrl: imageUrls,
        material: 'fibre',
        name: name,
        price: price,
        totalQuantity: quantity,
        size: selectedsize,
        subcategoryIds: [itemType, outfitType, eventType],
      };
      console.log(data);

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(
        `${baseUrl}/product/update/${editProductId}`,
        {
          method: 'PUT',
          headers: headers,
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        console.log(response);
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('added');
      console.log(responseData);
      console.log(data);

      dispatch(addsize(selectedsize));
      // Alert.alert('Item Successfully Edited');
      navigation.navigate('OwnerProfile');
    } catch (error) {
      console.log(error);
      // Alert.alert('Failed to Edit Item');
    }
  };
  const RemoveProducts = async (productId: any) => {
    const token = await AsyncStorage.getItem('token');
    console.log('chiranjeevi', productId);
    fetch(`${baseUrl}/product/deleteProduct/${productId}`, {
      method: 'DELETE',
      // openModal();
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(data => {
        dispatch(removeproducts(productId));
        openModal();
        setTimeout(() => {
          navigation.navigate('OwnerProfile');
        }, 4000);
      })
      .catch(error => {
        console.error(error);
        const errorMessage = `Error removing item from ProductsList: ${error.message}`;
        // Alert.alert(errorMessage);
      });
  };

  const getOwnerProducts = async () => {
    try {
      setViisble(true);
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(
        `${baseUrl}/product/listByProductId/${editProductId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('prefill data', response.data);
      setPrefill(response.data);
      return response.data;
    } catch (error) {
      throw error; // throw the error to be caught by the reject handler
    }
  };

  return {
    data,
    setGender,
    name,
    handleedit,
    description,
    setEventType,
    setOutfitType,
    setItemType,
    imageUrls,
    setImageUris,
    selectedImage,
    RemoveProducts,
    closeModal,
    setShowModal,
    showModal,
    handleremove,
    handleRemoveImages,
    pickImg,
    imageUris,
    handleGenderChange,
    handleEventTypeChange,
    handleOutfitChange,
    handleItemTypeChange,
    setName,
    setDescription,
    setCategoriesData,
    categoriesData,
    subCategoriesData,
    subEventCategoriesData,
    subOutfitCategoriesData,
    handleSizeTypeChange,
    setSelectedsize,
    handleName,
    setPrice,
    price,
    visible,
    pref,
    setViisble,
    setQuantity,
    handleSelectItem,
    setEditProductId,
    selectedItem,
    getOwnerProducts,
    FetchData,
    Mapdata,
    quantity,
    openModal,
    isLoading,
    setIsLoading,
  };
};

export default Useowneredititems;
