import axios from 'axios';
import {API} from './config';
import SharedPreference from './SharedPreference';
import store from '@app/store';

const axiosRequest = axios.create({
  baseURL: API.BASE_URL,
});

//All response from axios
axiosRequest.interceptors.response.use(
  response => {
    console.log('Response=======>', response.data);
    return response.data;
  },
  error => {
    console.log('Error=======>', error?.response?.status, error.response);
    console.log(error);
    if (error?.response) {
      if (error.response?.status === 401) {
        store.dispatch({type: 'USER_LOGOUT'});
      } else {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
    }
    return Promise.reject(error);
  },
);

// All request from axios
axiosRequest.interceptors.request.use(
  async config => {
    const token = await SharedPreference.getItem('@token', '');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Config==', config);
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default axiosRequest;
