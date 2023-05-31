import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import axios from 'axios';
import {url} from '../../constants/Apis';

export const fetchWishlistProducts = createAsyncThunk(
  'fetchWishlistProducts',
  async () => {
    const token = await AsyncStorage.getItem('token');
    console.log('yokes', token);
    const res = await axios.get(`${url}/wishlist/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  },
);

const WishlistSlice = createSlice({
  name: 'WishlistProducts',
  initialState: {
    data: null,
    // sda: [],
    isLoader: false,
    isError: false,
  },
  extraReducers: builder => {
    builder.addCase(fetchWishlistProducts.pending, (state, action) => {
      state.isLoader = true;
    });
    builder.addCase(fetchWishlistProducts.fulfilled, (state, action) => {
      state.isLoader = false;
      state.data = action.payload;
    });
    builder.addCase(fetchWishlistProducts.rejected, (state, action) => {
      state.isLoader = false;
      state.isError = true;
    });
  },
  reducers: undefined,
});
export default WishlistSlice.reducer;
