import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {url} from '../../constants/Apis';
import ApiService from '../../network/network';

export const fetchWishlistProducts = createAsyncThunk(
  'fetchWishlistProducts',
  async () => {
    const res = await ApiService.get(`${url}/wishlist/list`);
    return res;
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
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchWishlistProducts.pending, (state, _action) => {
      state.isLoader = true;
    });
    builder.addCase(fetchWishlistProducts.fulfilled, (state, action) => {
      state.isLoader = false;
      state.data = action.payload;
    });
    builder.addCase(fetchWishlistProducts.rejected, (state, _action) => {
      state.isLoader = false;
      state.isError = true;
    });
  },
});
export default WishlistSlice.reducer;
