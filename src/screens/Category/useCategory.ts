import {useState, useEffect} from 'react';

import ApiService from '../../network/network';

export const useCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategoriesData = async () => {
    try {
      const response = await ApiService.get('/category/list');
      setCategories(response);
      setLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    fetchCategoriesData();
  }, []);

  return {
    categories,
    loading,
    fetchCategoriesData,
  };
};
