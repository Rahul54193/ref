import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Config} from '../helper/config';

const api = axios.create({baseURL: Config.API_URL});

// Add a request interceptor
api.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('Token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    console.log('API ERROR::', error);
    const statusCode = error.response ? error.response.status : null;

    switch (statusCode) {
      case 500:
        console.log('500');
        break;
      case 422:
        console.log('422');
        break;
      case 401:
        console.log('401');
        break;
      case 403:
        console.log('403');
        break;
      case 404:
        console.log('404');
        break;
      default:
        break;
    }
    return Promise.reject(error);
  },
);

export default api;
