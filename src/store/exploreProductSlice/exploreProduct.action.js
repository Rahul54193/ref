import axiosRequest from '@app/helper/axiosRequest';
import {createAsyncThunk} from '@reduxjs/toolkit';

//! ======================== Redux : Async Thunk Actions ============================

/**
 * Api Action
 */
export const freshFindsAction = createAsyncThunk(
  'exploreProduct/freshFindsAction',
  async (params, thunkAPI) => {
    try {
      const response = await axiosRequest({
        url: '/products-list-fresh',
        method: 'GET',
        params: params,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response ? error.response?.data : error?.message,
      );
    }
  },
);

/**
 * Api Action
 */
export const freshFindsSearchingAction = createAsyncThunk(
  'exploreProduct/freshFindsSearchingAction',
  async (params, thunkAPI) => {
    try {
      const response = await axiosRequest({
        url: '/products-list-fresh',
        method: 'GET',
        params: params,
      });
      console.log('FREASH FINDS SEARCHING');
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response ? error.response?.data : error?.message,
      );
    }
  },
);

/**
 * Api Action
 */
export const getBannerAction = createAsyncThunk(
  'exploreProduct/getBannerAction',
  async (params, thunkAPI) => {
    try {
      const response = await axiosRequest({
        url: '/banner-list',
        method: 'GET',
        params: params,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response ? error.response?.data : error?.message,
      );
    }
  },
);

/**
 * Api Action
 */
export const getTrendyWatchAction = createAsyncThunk(
  'exploreProduct/getTrendyWatchAction',
  async (params, thunkAPI) => {
    try {
      const response = await axiosRequest({
        url: '/products-list-top',
        method: 'GET',
        params: params,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response ? error.response?.data : error?.message,
      );
    }
  },
);

/**
 * Api Action
 */
export const getProductDetailsAction = createAsyncThunk(
  'exploreProduct/getProductDetailsAction',
  async (params, thunkAPI) => {
    try {
      const response = await axiosRequest({
        url: `/product-details/${params?.product_id}`,
        method: 'GET',
        params: params,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response ? error.response?.data : error?.message,
      );
    }
  },
);

/**
 * Api Action
 */
export const getProductChartAction = createAsyncThunk(
  'exploreProduct/getProductChartAction',
  async (params, thunkAPI) => {
    try {
      const response = await axiosRequest({
        url: '/products-chart',
        method: 'GET',
        params: params,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response ? error.response?.data : error?.message,
      );
    }
  },
);

/**
 * Api Action
 */
export const getBrandListingAction = createAsyncThunk(
  'exploreProduct/getBrandListingAction',
  async (params, thunkAPI) => {
    try {
      const response = await axiosRequest({
        url: '/brand-list',
        method: 'GET',
        params: params,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response ? error.response?.data : error?.message,
      );
    }
  },
);

/**
 * Api Action
 */
export const getTopNotchWatchAction = createAsyncThunk(
  'exploreProduct/getTopNotchWatchAction',
  async (params, thunkAPI) => {
    try {
      const response = await axiosRequest({
        url: '/products-list',
        method: 'GET',
        params: params,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response ? error.response?.data : error?.message,
      );
    }
  },
);

/**
 * Api Action
 */
export const getTopNotchWatchSearchingAction = createAsyncThunk(
  'exploreProduct/getTopNotchWatchSearchingAction',
  async (params, thunkAPI) => {
    console.log('dfghjkdfgh888jklkllll', params);

    try {
      const response = await axiosRequest({
        url: '/products-list',
        method: 'GET',
        params: params,
      });
      console.log('=======>>>>>>', response);
      return response;
    } catch (error) {
      console.log('sdfghjk', error);
      return thunkAPI.rejectWithValue(
        error?.response ? error.response?.data : error?.message,
      );
    }
  },
);

/**
 * Api Action
 */
export const addWishListAction = createAsyncThunk(
  'exploreProduct/addWishListAction',
  async (params, thunkAPI) => {
    try {
      const response = await axiosRequest({
        url: `add-wishlist/${params?.product_id}`,
        method: 'POST',
        // params: params,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response ? error.response?.data : error?.message,
      );
    }
  },
);
export const productInsights = createAsyncThunk(
  'exploreProduct/productInsights',
  async (params, thunkAPI) => {
    console.log(params, 'params for product insights ');
    try {
      const response = await axiosRequest({
        url: `insights-info/${params?.productId}`,
        method: 'GET',
        params: {duration: params?.value},
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response ? error.response?.data : error?.message,
      );
    }
  },
);
export const addPriceAlert = createAsyncThunk(
  'exploreProduct/addPriceAlert',
  async (params, thunkAPI) => {
    console.log(params, 'params for price alert ');
    try {
      const response = await axiosRequest({
        url: `add-price-alert/${params.id}?maxPrice=${params?.maxPrice}`,
        method: 'GET',
        params: params,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response ? error.response?.data : error?.message,
      );
    }
  },
);
export const removePriceAlert = createAsyncThunk(
  'exploreProduct/removePriceAlert',
  async (params, thunkAPI) => {
    console.log(params, 'params for price alert ');
    try {
      const response = await axiosRequest({
        url: `remove-price-alert/${params}`,
        method: 'GET',
        //params: params,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response ? error.response?.data : error?.message,
      );
    }
  },
);
export const addProductInterestList = createAsyncThunk(
  'exploreProduct/addProductInterestList',
  async (params, thunkAPI) => {
    console.log(params, 'params for add to interest list  ');
    try {
      const response = await axiosRequest({
        url: `add-product-interest-list/${params}`,
        method: 'GET',
        //params: params,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response ? error.response?.data : error?.message,
      );
    }
  },
);
export const searchHistoryList = createAsyncThunk(
  'exploreProduct/searchHistoryList',
  async (params, thunkAPI) => {
    console.log(params, 'params for add to interest list  ');
    try {
      const response = await axiosRequest({
        url: '/search-history-list',
        method: 'GET',
        params: params,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response ? error.response?.data : error?.message,
      );
    }
  },
);
export const searchHistory = createAsyncThunk(
  'exploreProduct/searchHistory',
  async (params, thunkAPI) => {
    //console.log(params, '===============-------------@@@@@@@@@@@');
    //debugger;
    try {
      const response = await axiosRequest({
        url: 'search-history',
        method: 'POST',
        params: params,
        //body: params,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response ? error.response?.data : error?.message,
      );
    }
  },
);
export const searchHistoryDelete = createAsyncThunk(
  'exploreProduct/searchHistoryDelete',
  async (params, thunkAPI) => {
    //console.log(params, '===============-------------@@@@@@@@@@@');
    //debugger;
    try {
      const response = await axiosRequest({
        url: `search-history-delete`,
        method: 'DELETE',
        params: params,
        //body: params,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response ? error.response?.data : error?.message,
      );
    }
  },
);
export const productSearch = createAsyncThunk(
  'exploreProduct/productSearch',
  async (params, thunkAPI) => {
    console.log(params, '===============-------------@@@@@@@@@@@');
    //debugger;
    try {
      const response = await axiosRequest({
        url: `product-search?keyWord=${params?.query1}`,
        method: 'GET',
        params: params,
        //body: params,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response ? error.response?.data : error?.message,
      );
    }
  },
);
