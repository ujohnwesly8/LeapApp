import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {OrderGetApi, url} from '../../constants/Apis';

export const fetchOrderProducts = createAsyncThunk(
  'fetchOrderProducts',
  async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log('hello token', token);
      const response = await fetch(`${url}/order/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log('order of cladc', data);
      return data;
    } catch (error) {
      throw error.response.data;
    }
  },
);

const orderSlice = createSlice({
  name: 'orderproducts',
  initialState: {
    data: null,
    isLoader: false,
    isError: false,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchOrderProducts.pending, state => {
        state.isLoader = true;
      })
      .addCase(fetchOrderProducts.fulfilled, (state, action) => {
        state.isLoader = false;
        state.data = action.payload;
      })
      .addCase(fetchOrderProducts.rejected, state => {
        state.isLoader = false;
        state.isError = true;
      });
  },
  reducers: undefined,
});

export default orderSlice.reducer;
