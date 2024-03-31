import axiosRequest from '@app/helper/axiosRequest';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const wishlistAction = createAsyncThunk(
  'wishlist/wishlistAction',
  async (params, thunkAPI) => {
    try {
      const result = await axiosRequest({
        url: `/get-wishlist`,
        method: 'GET',
        params: params,
      });
      console.log(result, 'asdfghjklkjhgfdsdfghjklkjhgfdfghjk');
      return result;
    } catch (error) {
      console.log(error, 'ksuhdfdfk=========>>>>>');
      return thunkAPI.rejectWithValue(
        error.response ? error.response?.data : error.data,
      );
    }
  },
);
export const InterestListAction = createAsyncThunk(
  'wishlist/InterestListAction',
  async (params, thunkAPI) => {
    try {
      const result = await axiosRequest({
        url: `/get-interest-list?type=${params?.type}&search=${params?.search}`,
        method: 'GET',
        params: params,
      });
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response?.data : error.data,
      );
    }
  },
);

export const sendNotificationnterestListAction = createAsyncThunk(
  'wishlist/sendNotificationnterestListAction',
  async (params, thunkAPI) => {
    try {
      const result = await axiosRequest({
        url: `/send-interest-notification/${params?.id}`,
        method: 'GET',
      });
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response?.data : error.data,
      );
    }
  },
);
export const DeleteInterestAction = createAsyncThunk(
  'wishlist/DeleteInterestAction',
  async (params, thunkAPI) => {
    try {
      const result = await axiosRequest({
        url: `/delete-interest-list/${params?.id}`,
        method: 'GET',
      });
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response?.data : error.data,
      );
    }
  },
);
