import { AxiosRequest } from '@app/helper';
import { createAsyncThunk } from '@reduxjs/toolkit';

//! ======================== Redux : Async Thunk Actions ============================

/**
 * Api Action
 */
export const sellerProductListingAction = createAsyncThunk(
  'profileSection/sellerProductListingAction',
  async (params, thunkAPI) => {
    console.log(params, "Seller getProfileListing params=================================")
    try {
      const result = await AxiosRequest({
        url: `/seller-products/${params.userId}`,
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

/**
 * Api Action
 */
export const profileAboutAction = createAsyncThunk(
  'profileSection/profileAboutAction',
  async (params, thunkAPI) => {
    try {
      console.log("Profile section Params===========", params)
      const result = await AxiosRequest({
        url: `/user-profile`,
        method: 'GET',
        params: params, //userId
      });
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response?.data : error.data,
      );
    }
  },
);

export const coinHistoryAction = createAsyncThunk(
  'profileSection/coinHistoryAction',
  async (params, thunkAPI) => {
    try {
      const result = await AxiosRequest({
        url: `/coins-history`,
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

export const changeProductStatusAction = createAsyncThunk(
  'profileSection/changeProductStatusAction',
  async (params, thunkAPI) => {
    try {
      const result = await AxiosRequest({
        url: `product-status/${params?.product_id}`,
        method: 'GET',
        params: { product_status: params?.product_status },
      });
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response?.data : error.data,
      );
    }
  },
);

export const onFollowClickAction = createAsyncThunk(
  'profileSection/onFollowClickAction',
  async (params, thunkAPI) => {
    console.log('PARAMS+++', params);
    try {
      const result = await AxiosRequest({
        url: `follow-visit/${params?.user_id}`,
        method: 'POST',
        data: params,
      });
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response?.data : error.data,
      );
    }
  },
);
export const UserSearchAction = createAsyncThunk(
  'profileSection/UserSearchAction',
  async (params, thunkAPI) => {
    console.log('PARAMS+++', params);
    try {
      const result = await AxiosRequest({
        url: `user-search?keyWord=${params}`,
        method: 'GET',
        // data: params,
      });
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response?.data : error.data,
      );
    }
  },
);
export const onUserSearchListAction = createAsyncThunk(
  'profileSection/onUserSearchListAction',
  async (params, thunkAPI) => {
    console.log('PARAMS+++', params);
    try {
      const result = await AxiosRequest({
        url: `search-history-list?keyword=${params.keyword}&type= ${params.type}`,
        method: 'GET',
        // data: params,
      });
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response?.data : error.data,
      );
    }
  },
);
export const onUserSearchDeleteAction = createAsyncThunk(
  'profileSection/onUserSearchDeleteAction',
  async (params, thunkAPI) => {
    console.log('PARAMS+++', params);
    try {
      const result = await AxiosRequest({
        url: `search-history-delete?deleteKey=${params.deleteKey}&type=${params.type}`,
        method: 'DELETE',
        // data: params,
      });
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response?.data : error.data,
      );
    }
  },
);
export const onUserSearchAction = createAsyncThunk(
  'profileSection/onUserSearchAction',
  async (params, thunkAPI) => {
    console.log('PARAMS+++', params);
    try {
      const result = await AxiosRequest({
        url: `search-history`,
        method: 'POST',
        data: params,
      });
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response?.data : error.data,
      );
    }
  },
);
