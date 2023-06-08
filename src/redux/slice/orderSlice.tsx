import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {url} from '../../constants/Apis';
import ApiService from '../../network/network';

export const fetchOrderProducts = createAsyncThunk(
  'fetchOrderProducts',
  async () => {
    try {
      const response = await ApiService.get(`${url}/order/list`);
      const data = await response;
      console.log('order of cladc', data);
      return data;
    } catch (error) {
      console.log(error);
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
