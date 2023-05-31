import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {url as baseUrl} from '../../constants/Apis';
import axios from 'axios';
import {addsize} from '../../redux/actions/actions';
import {SetStateAction, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFormik} from 'formik';
import {launchImageLibrary} from 'react-native-image-picker';
const OwnerImage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const name = useSelector(state => state.ItemsReducer.Name);
  const description = useSelector(state => state.ItemsReducer.Description);
  const categoryIds = useSelector(state => state.ItemsReducer.CategoryId);
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    navigation.navigate('Home', {screen: 'OwnerHome'});
    setShowModal(false);
  };
  const subcategoryIds = useSelector(
    state => state.ItemsReducer.subcategoryIds,
  );
  console.log(categoryIds);
  console.log(subcategoryIds);
  const size = useSelector(state => state.SizeReducer.selected);
  // const {selectedImage, setSelectedImage} = useImagepicker();
  const [selectedsize, setSelectedsize] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const getImageUrl = async () => {
    const url = await AsyncStorage.getItem('url');
    setUrl(url);
    console.log('Retrieved URL:', url);
  };
  useEffect(() => {
    getImageUrl();
  }, []);
  const AdditemsvalidationSchema = Yup.object().shape({
    size: Yup.string().required('Size is required'),
    price: Yup.number()
      .required('Price is required')
      .min(100, 'Price must be greater than 100'),
    quantity: Yup.number()
      .required('Quantity is required')
      .min(1, 'Quantity must be greater than zero'),
  });
  const handleSizeTypeChange = (selectedSize: SetStateAction<string>) => {
    setSelectedsize(selectedSize);
    formik.setFieldValue('size', selectedSize);
  };
  const handlePriceChange = (value: any) => {
    setPrice(value);
    formik.setFieldValue('price', value);
  };
  const handleSelectedImage = (image: any) => {
    setSelectedImage(image);
    formik.setFieldValue('image', image.url);
  };
  const handleQuantityChange = (value: any) => {
    setQuantity(value);
    formik.setFieldValue('quantity', value);
  };
  const handleBlur = (field: string) => {
    formik.setFieldTouched(field);
  };
  const onHandleOwnerItems = () => {
    navigation.goBack();
  };
  const postData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log('john bhai', token);
      console.log('url in the post', imageUrls);
      const posturls = imageUrls;
      console.log('posturls', posturls);
      const data = {
        brand: 'adiddas',
        categoryIds: categoryIds,
        color: 'black',
        name: name,
        description: description,
        id: 0,
        imageUrl: imageUrls, // Use the imageUrls state
        material: 'fibre',
        price: price,
        totalQuantity: quantity,
        size: selectedsize,
        subcategoryIds: subcategoryIds,
      };
      const response = await axios({
        method: 'post',
        url: `${baseUrl}/product/add`,
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('added', response.data);
      dispatch(addsize(selectedsize));
      openModal();
      // navigation.navigate('Home', {screen: 'OwnerHome'});
      // navigation.navigate('OwnerHomestack', {screen: 'OwnerHome'});
    } catch (error) {
      console.log(error);
      // Alert.alert('Failed to add item');
    }
  };

  const [selectedImage, setSelectedImage] = useState('');

  const [imageUris, setImageUris] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const handleremove = () => {
    setSelectedImage('');
  };
  const handleRemoveImage = index => {
    setImageUrls(prevUrls => prevUrls.filter((_url, i) => i !== index));
    setIsLoading(false);
  };

  useEffect(() => {
    const getImageUrls = async () => {
      const url = await AsyncStorage.getItem('url');
      if (url) {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const imageUrls = Array.from({length: 10}, (_, index) => {
          return `${url}/file${index + 1}`;
        });
        imageUrls(imageUris);
      }
    };
    getImageUrls();
  }, [imageUris]);
  const pickImages = () => {
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
          setIsLoading(true);
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
              setImageUrls(prevUrls => [...prevUrls, ...res.urls]);
              setIsLoading(false);
              console.log(imageUrls);
            } else {
              const res = await result.json();
              console.log('Upload failed');
              console.log(res);
              console.log(token);
              setIsLoading(true);
            }
          } catch (error) {
            console.error(error);
          }
        }
      },
    );
  };

  console.log(name, size);
  const formik = useFormik({
    initialValues: {
      size: '',
      price: '',
      image: '',
      quantity: '',
    },
    validationSchema: AdditemsvalidationSchema,
    onSubmit: postData,
  });
  return {
    onHandleOwnerItems,
    postData,
    handleRemoveImage,
    handleSelectedImage,
    handleSizeTypeChange,
    imageUrls,
    setImageUris,
    selectedsize,
    setSelectedsize,
    setPrice,
    setQuantity,
    selectedImage,
    handleremove,
    formik,
    handlePriceChange,
    handleQuantityChange,
    handleBlur,
    pickImages,
    imageUris,
    closeModal,
    showModal,
    openModal,
    isLoading,
  };
};
export default OwnerImage;
