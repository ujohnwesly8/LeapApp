import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {UserProductsUrl} from '../../constants/Apis';

import ApiService from '../../network/network';

export const fetchUserProducts = createAsyncThunk(
  'fetchUserProducts',
  async () => {
    try {
      const response = await ApiService.get(UserProductsUrl);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
);

export const UserProductSlice = createSlice({
  name: 'products',
  initialState: {
    data: null,
    isLoader: false,
    isError: false,
  },
  reducers: {},
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
});

export default UserProductSlice.reducer;
