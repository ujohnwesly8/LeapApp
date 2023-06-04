// import axios from 'axios';
// import {url} from '../constants/Apis';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const instance = axios.create({
//   baseURL: url,
//   timeout: 15000,
// });

// const ApiService = {
//   get: async url => {
//     const token = await AsyncStorage.getItem('token');
//     const response = await instance.get(url, {
//       headers: {Authorization: `Bearer ${token}`},
//     });
//     return response.data;
//   },
//   post: async (url, body) => {
//     const token = await AsyncStorage.getItem('token');
//     const response = await instance.post(url, body, {
//       headers: {Authorization: `Bearer ${token}`},
//     });
//     return response.data;
//   },
// };

// export default ApiService;
import axios from 'axios';
import {url} from '../constants/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
  baseURL: url,
  timeout: 15000,
});

instance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

const ApiService = {
  get: async url => {
    const response = await instance.get(url);
    return response.data;
  },
  post: async (url, body) => {
    const response = await instance.post(url, body);
    return response.data;
  },
};

export default ApiService;

// hey guys
