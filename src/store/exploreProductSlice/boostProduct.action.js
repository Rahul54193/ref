import axiosRequest from '@app/helper/axiosRequest';
import {createAsyncThunk} from '@reduxjs/toolkit';

//! ======================== Redux : Async Thunk Actions ============================

/**
 * Api Action
 */
export const boostProduct = createAsyncThunk(
  'boostProduct/now',
  async (params, thunkAPI) => {
    console.log('boostNowProduct----->>>Params', params);

    try {
      const result = await axiosRequest({
        url: '/boost-product',
        method: 'POST',
        params: params,
      });
      console.log('boostNowProduct', result);
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response?.data : error.data,
      );
    }
  },
);
export const boostPlans = createAsyncThunk(
  'boostProduct/boostPlans',
  async thunkAPI => {
    //console.log('boostPlasn----->>>Params', params);

    try {
      const result = await axiosRequest({
        url: '/boost-plans',
        method: 'GET',
        // params: params,
      });
      console.log('boostPlans result ==>>>', result);
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response?.data : error.data,
      );
    }
  },
);
export const coinPlans = createAsyncThunk(
  'boostProduct/coinPlans',
  async thunkAPI => {
    //console.log('boostPlasn----->>>Params', params);

    try {
      const result = await axiosRequest({
        url: '/coins-plans',
        method: 'GET',
        // params: params,
      });
      console.log('coins plans result ==>>>', result);
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response?.data : error.data,
      );
    }
  },
);
export const purchaseCoins = createAsyncThunk(
  'boostProduct/purchasecoins',
  async ({planid, transactionId}, thunkAPI) => {
    console.log('purchaseCoins----->>>Params', planid);

    try {
      const result = await axiosRequest({
        url: `/purchase-coins?planid=${planid}&transactionId=${transactionId}`,
        method: 'POST',
        //planid: planid,
      });
      console.log('purchaseCoins----->>>result==>>>', result);
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response?.data : error.data,
      );
    }
  },
);
