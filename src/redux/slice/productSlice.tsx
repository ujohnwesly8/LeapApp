import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {OwnerProductsUrlv2, UserProductsUrl} from '../../constants/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiService from '../../network/network';
export const fetchProducts = createAsyncThunk('fetchProducts', async () => {
  // get the token from the state
  try {
    // const token = await AsyncStorage.getItem('token');
    const products = await ApiService.get(OwnerProductsUrlv2);
    return products;
    // const response = await axios.get(OwnerProductsUrl, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
    // return response.data;
  } catch (error) {
    throw error.response.data; // throw the error to be caught by the reject handler
  }
});

const ProductSlice = createSlice({
  name: 'products',
  initialState: {
    data: null,
    isLoader: false,
    isError: false,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.isLoader = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoader = false;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, state => {
        state.isLoader = false;
        state.isError = true;
      });
  },
  reducers: undefined,
});

export default ProductSlice.reducer;
