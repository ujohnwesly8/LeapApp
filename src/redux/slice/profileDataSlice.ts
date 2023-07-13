import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import ApiService from '../../network/network';
import {profileDataUrl} from '../../constants/apiRoutes';

interface ProfileData {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  profileImageUrl: string;
  role: string;
}
interface ProfileDataState {
  data: ProfileData;
  isLoader: boolean;
  isError: boolean;
  error: null | string | unknown;
}
const initialState: ProfileDataState = {
  data: {
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    profileImageUrl: '',
    role: '',
  },
  isLoader: false,
  isError: false,
  error: null,
};

export const getProfileData = createAsyncThunk('getProfileData', async () => {
  try {
    const response = await ApiService.get(profileDataUrl);
    console.log(response);
    return response;
  } catch (error) {
    console.log('error ', error);

    return error;
  }
});

const profileThunk = createSlice({
  name: 'profileData',
  initialState,
  reducers: {
    setProfiledata: (state, action) => {
      state.data = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getProfileData.pending, state => {
        state.isLoader = true;
      })
      .addCase(getProfileData.fulfilled, (state, action) => {
        state.isLoader = false;
        state.data = action.payload;
      })
      .addCase(getProfileData.rejected, (state, action) => {
        state.isLoader = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});
export const {setProfiledata, setError} = profileThunk.actions;
export default profileThunk.reducer;