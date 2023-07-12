import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {url} from '../../constants/Apis';

export interface LoginState {
  data: {
    authToken: string | null;
    isAuthenticated: boolean;
  } | null;
  isLoader: boolean;
  isError: boolean;
}

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
    data: null,
    isLoader: false,
    isError: false,
    error: null,
  } as LoginState,
  reducers: {
    setLoginData: (
      state,
      action: PayloadAction<{
        authToken: string | null;
        isAuthenticated: boolean;
      }>,
    ) => {
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
        state.data = action.payload;
      })
      .addCase(postLogin.rejected, state => {
        state.isLoader = false;
        state.isError = true;
      });
  },
});

export const {setLoginData} = loginThunk.actions;
export default loginThunk.reducer;
