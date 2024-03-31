import axiosRequest from '@app/helper/axiosRequest';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {err} from 'react-native-svg/lib/typescript/xml';

export const getGeneralProfile = createAsyncThunk(
  `getGeneralProfile/getGeneralProfile`,
  async (params, thunkAPI) => {
    try {
      const response = await axiosRequest({
        url: `/user-profile`,
        method: 'GET',
        // params: params,
      });
      console.log('GENERAL PROFILE DATA REDUCER', response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response ? error.response?.data : error?.method,
      );
    }
  },
);

export const updateGeneralProfile = createAsyncThunk(
  `updateGeneralProfile/updateGeneralProfile`,
  async (params, thunkAPI) => {
    console.log('REDUCER UPDATED PARAMAS++++++', params);
    try {
      const response = await axiosRequest({
        url: `/update-profile`,
        method: `POST`,
        data: params,
      });
      console.log('UPDATA GENERAL PROFILE RESPONSE REDUCER', response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response ? error.response?.data : error?.method,
      );
    }
  },
);
