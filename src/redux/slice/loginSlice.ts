import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {url} from '../../constants/Apis';

export const postLogin = createAsyncThunk(
  'postLogin',
  async (credentials: {email: string; password: string}) => {
    try {
      const response = await axios.post(`${url}/login`, credentials);
      await AsyncStorage.setItem('token', response.headers.access_token);
      return response.data;
    } catch (error) {
      console.log('error ', error);
      throw error;
    }
  },
);

const loginThunk = createSlice({
  name: 'loginData',
  initialState: {
    data: {
      authToken: null,
      isAuthenticated: false,
    },
    isLoader: false,
    isError: false,
  },
  reducers: {
    setLoginData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(postLogin.pending, state => {
        state.isLoader = true;
      })
      .addCase(postLogin.fulfilled, (state, action) => {
        state.isLoader = false;
        state.data = {
          ...state,
          authToken: action.payload,
          isAuthenticated: true,
        };
        console.log('Response data:', action.payload);
      })
      .addCase(postLogin.rejected, state => {
        state.isLoader = false;
        state.isError = true;
      });
  },
});

export const {setLoginData} = loginThunk.actions;
export default loginThunk.reducer;
