import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {UserProductsUrl} from '../../constants/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchUserProducts = createAsyncThunk(
  'fetchUserProducts',
  async () => {
    // get the token from the state
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(UserProductsUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data; // throw the error to be caught by the reject handler
    }
  },
);

const UserProductSlice = createSlice({
  name: 'products',
  initialState: {
    data: null,
    isLoader: false,
    isError: false,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserProducts.pending, state => {
        state.isLoader = true;
      })
      .addCase(fetchUserProducts.fulfilled, (state, action) => {
        state.isLoader = false;
        state.data = action.payload;
      })
      .addCase(fetchUserProducts.rejected, state => {
        state.isLoader = false;
        state.isError = true;
      });
  },
  reducers: undefined,
});

export default UserProductSlice.reducer;
