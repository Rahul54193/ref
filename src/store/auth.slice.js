import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
// import api from '../services/api';
import {Config} from '../helper/config';
import api from '../services/api';
import {fire} from 'react-native-alertbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

const initialState = {
  tokenlogin: 'false',
  signuploader: 'not loaded',
  loginloader: 'not loaded',
  profileloader: 'not loaded',
  forgetPasswordLoader: false,
  forgetData: {},
  forgetPasswordError: null,
  registrationSuccess: false,
  loginSuccess: false,
  userData: null,
  userEmail: null,
  userID: null,
  profileUserData: null,
};
// user SignUp
// -----------------------------
export const userSignup = createAsyncThunk(
  'auth/userSignup',
  async (params, thunkAPI) => {
    console.log('first', params);
    try {
      const response = await api({
        url: `${Config.API_URL}register`,
        method: 'POST',
        data: params,
      });
      // console.log('SignUp response', response);
      return response;
    } catch (error) {
      // console.log('error from user sign up', error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// user Login
// -----------------------------
export const userLogin = createAsyncThunk(
  'auth/userLogin',
  async (params, thunkAPI) => {
    // console.log('Login--->', params);
    try {
      const response = await api({
        url: `${Config.API_URL}login`,
        method: 'POST',
        data: params,
        headers: {
          Accept: 'application/json',
        },
      });
      // console.log('Login response', response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// taking Token
//------------------------------------
export const getTrustAuthorization = createAsyncThunk(
  'auth/getTrustAuthorization',
  async (_, thunkAPI) => {
    try {
      const response = await AsyncStorage.getItem('Token');
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// Forget password

export const forgetPassword = createAsyncThunk(
  'auth/forgetPassword',
  async (params, thunkAPI) => {
    console.log('forgetPasswordData', params);
    try {
      const response = await api({
        url: `${Config.API_URL}forgot-password`,
        method: 'POST',
        data: params,
      });
      console.log('forgetpassresponse', response);
      if (response.message) {
        fire({
          message: response?.message,
          actions: [
            {
              text: 'Ok',
              style: 'cancel',
            },
          ],
        });
      }
      return response;
    } catch (error) {
      fire({
        message: error?.response?.data?.message,
        actions: [
          {
            text: 'Ok',
            style: 'cancel',
          },
        ],
      });
      console.log(error?.response?.data?.message, error?.message, 'aya error');
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//Slices
//--------------------------------
const Authslice = createSlice({
  name: 'Authslice',
  initialState,
  reducers: {
    addIntotokenlogin: (state, action) => {
      return {
        ...state,
        tokenlogin: 'false',
      };
    },
    resetStatus: (state, action) => {
      return {
        ...state,
        registrationSuccess: false,
        loginSuccess: false,
      };
    },
  },

  extraReducers: builder => {
    builder
      .addCase(userSignup.pending, (state, action) => {
        state.signuploader = 'loading';
      })
      .addCase(userSignup.fulfilled, (state, action) => {
        state.userData = action.payload;
        // console.log('registration', action);
        fire({
          title: action.payload?.status == 200 ? 'Success' : 'Error',
          message: action.payload.message,
          actions: [
            {
              text: 'Ok',
              style: 'cancel',
            },
          ],
        });
      })
      .addCase(userSignup.rejected, (state, action) => {
        console.log('action--->', action);
        state.signuploader = 'not loaded';
      })
      .addCase(userLogin.pending, (state, action) => {
        state.loginloader = 'loading';
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        if (action.payload?.success) {
          state.loginSuccess = true;
          state.loginloader = 'loaded';
          AsyncStorage.setItem('Token', action.payload?.data?.token);
          // console.log('TOKEN', action.payload?.token);

          api.defaults.headers.common.Authorization = `Bearer ${action.payload?.data?.token}`;

          AsyncStorage.setItem(
            'User_id',
            JSON.stringify(action.payload.data?.id),
          );

          state.profile = action.payload?.data;
          state.tokenlogin = 'true';
        } else {
          // console.log('error response', action.payload?.message);
          state.loginloader = 'not loaded';
          fire({
            title: 'Message',
            message: action.payload.message,
            actions: [
              {
                text: 'Ok',
                style: 'cancel',
              },
            ],
          });
        }
      })
      .addCase(userLogin.rejected, (state, action) => {
        console.log('action of login--->>>', action);
        state.loginloader = 'not loaded';
        fire({
          title: 'Error',
          message: action.payload?.response?.data?.message,
          actions: [
            {
              text: 'Ok',
              style: 'cancel',
            },
          ],
        });
      })
      .addCase(getTrustAuthorization.pending, (state, action) => {
        state.loginloader = 'loading';
      })
      .addCase(getTrustAuthorization.fulfilled, (state, action) => {
        state.loginloader = 'loaded';
        if (action.payload) {
          state.tokenlogin = 'true';
        } else {
          state.tokenlogin = 'false';
        }
      })
      .addCase(getTrustAuthorization.rejected, (state, action) => {
        state.loginloader = 'not loaded';
      })
      .addCase(forgetPassword.pending, (state, action) => {
        state.forgetPasswordLoader = true;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.forgetPasswordLoader = false;
        state.forgetData = action?.payload;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.forgetPasswordLoader = false;
        state.forgetPasswordError = action?.payload;
      });
  },
});
export const AuthReducer = Authslice.reducer;
export const AuthAction = Authslice.actions;

export const getLoginToken = state => {
  return state.AuthReducer.tokenlogin;
};
export const getLoginLoader = state => {
  return state.AuthReducer.loginloader === 'loading' ? true : false;
};
export const getLoginSuccess = state => {
  return state.AuthReducer.loginSuccess;
};
