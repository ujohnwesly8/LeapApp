import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {CartGetApi} from '../../constants/Apis';
import ApiService from '../../network/network';

export const fetchCartProducts = createAsyncThunk(
  'fetchCartProducts',
  async () => {
    try {
      const response = await ApiService.get(CartGetApi);
      return response;
    } catch (error) {
      console.log('error ', error);
    }
  },
);

const CartSlice = createSlice({
  name: 'cartproducts',
  initialState: {
    data: null,
    isLoader: false,
    isError: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCartProducts.pending, state => {
        state.isLoader = true;
      })
      .addCase(fetchCartProducts.fulfilled, (state, action) => {
        state.isLoader = false;
        state.data = action.payload;
      })
      .addCase(fetchCartProducts.rejected, state => {
        state.isLoader = false;
        state.isError = true;
      });
  },
});

export default CartSlice.reducer;
