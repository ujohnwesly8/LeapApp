import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  id: null,
  data: null,
  status: 'idle',
  error: null,
};

export const editItemSlice = createSlice({
  name: 'editItem',
  initialState,
  reducers: {
    fetchDataPending: state => {
      state.status = 'loading';
    },
    fetchDataSuccess: (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
      // state.id = action.payload.id;
    },
    fetchDataFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const {fetchDataPending, fetchDataSuccess, fetchDataFailure} =
  editItemSlice.actions;

export default editItemSlice.reducer;