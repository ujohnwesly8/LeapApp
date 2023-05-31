import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {url} from '../../constants/Apis';
import {
  addItemsData,
  addGender,
  addevent,
  addname,
  addGenderData,
  addtype,
  addoutfit,
} from '../../redux/actions/actions';
import axios from 'axios';
import {OwnerCategoryUrl} from '../../constants/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
function Useadditems() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [gender, setGender] = useState('');
  const [eventType, setEventType] = useState('');
  const [outfitType, setOutfitType] = useState('');
  const [itemType, setItemType] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const handleGenderChange = (selectedGender: React.SetStateAction<string>) => {
    setGender(selectedGender);
    dispatch(addGenderData(selectedGender));
  };
  const [categoriesData, setCategoriesData] = useState([]);
  const [subCategoriesData, setSubCategoriesData] = useState([]);
  const [subEventCategoriesData, setSubEventCategoriesData] = useState([]);
  const [subOutfitCategoriesData, setSubOutfitCategoriesData] = useState([]);
  const genderData = useSelector(state => state.GenderReducer.genderData);
  console.log(genderData);
  const handleNameChange = (value: string) => {
    setName(value);
  };
  const handleDescriptionChange = (value: string) => {
    setDescription(value);
  };
  const handleOutfitChange = (selectedOutfit: React.SetStateAction<string>) => {
    setOutfitType(selectedOutfit);
  };
  // 1st api endpoint code starts
  useEffect(() => {
    console.log(gender);

    const fetchSubCategoryData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(
          `${url}/subcategory/listbyid/${genderData}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
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
        setIsLoading(true);
      } finally {
        setIsLoading(false); // Set isLoading to false after the API call completes
      }
    };

    fetchSubCategoryData();
  }, [gender, genderData]);

  useEffect(() => {
    // console.log(gender);
    const fetchEventCategoryData = async () => {
      try {
        // setIsLoading(true);
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`${url}/subcategory/listbyid/${3}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`${url}/subcategory/listbyid/${4}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
      } finally {
        setIsLoading(false); // Set isLoading to false after the API call completes
      }
    };
    fetchCategoryData();
  }, []);
  const handleEventTypeChange = (
    selectedEventType: React.SetStateAction<string>,
  ) => {
    setEventType(selectedEventType);
  };
  const handleItemTypeChange = (
    selectedItemType: React.SetStateAction<string>,
  ) => {
    setItemType(selectedItemType);
  };
  const handleItems = async () => {
    const CategoryIds = [gender];
    const subcategoryIds = [itemType, eventType, outfitType];
    const Name = name;
    const Description = description;
    dispatch(addname(Name));
    dispatch(addtype(subcategoryIds));
    dispatch(addItemsData(Description));
    dispatch(addGender(CategoryIds));
    dispatch(addevent(subcategoryIds));
    dispatch(addoutfit(subcategoryIds));
    navigation.navigate('OwnerImage');
    console.log(Name, Description);
  };
  return {
    name,
    description,
    setGender,
    setEventType,
    setOutfitType,
    setItemType,
    handleGenderChange,
    handleEventTypeChange,
    handleOutfitChange,
    handleItemTypeChange,
    handleItems,
    setName,
    setDescription,
    setIsLoading,
    handleNameChange,
    handleDescriptionChange,
    isLoading,
    setCategoriesData,
    categoriesData,
    subCategoriesData,
    subEventCategoriesData,
    subOutfitCategoriesData,
  };
}
export default Useadditems;
