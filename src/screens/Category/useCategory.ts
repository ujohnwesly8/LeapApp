import {useEffect} from 'react';

import {fetchCategoriesdata} from '../../redux/slice/categorySlice';
import {useDispatch, useSelector} from 'react-redux';

export const useCategory = () => {
  const data = useSelector(state => state.category.data);
  const loading = useSelector(state => state.category.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesdata() as any);
  }, []);
  console.log('data here is', data);

  return {
    loading,
    data,
  };
};
