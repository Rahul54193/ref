import axiosRequest from '@app/helper/axiosRequest';
import {createAsyncThunk} from '@reduxjs/toolkit';

//! ======================== Redux : Async Thunk Actions ============================

/**
 * Api Action
 */
export const getAllBrandAction = createAsyncThunk(
  `addProduct/getAllBrandAction`,
  async (params, thunkAPI) => {
    try {
      const response = await axiosRequest({
        url: `/brand-list`,
        method: 'GET',
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
export const getAllProductDropdownAction = createAsyncThunk(
  `addProduct/getAllProductDropdownAction`,
  async (params, thunkAPI) => {
    try {
      const response = await axiosRequest({
        url: `/get-product-dropdown`,
        method: 'GET',
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
export const getAllProductModelAction = createAsyncThunk(
  `addProduct/getAllProductModelAction`,
  async (params, thunkAPI) => {
    try {
      const response = await axiosRequest({
        url: `/model-list/${params.id}`,
        method: 'GET',
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
export const addProductImageAction = createAsyncThunk(
  `addProduct/addProductImageAction`,
  async (params, thunkAPI) => {
    console.log(params, 'Add Image');
    try {
      const response = await axiosRequest({
        url: 'add-product-mobile',
        method: 'POST',
        data: params,
        headers: {
          'Content-Type': 'multipart/form-data',
          // Accept: 'application/json',
        },
        params: {
          step: 'first',
        },
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
export const updateProductImageAction = createAsyncThunk(
  `addProduct/updateProductImageAction`,
  async (params, thunkAPI) => {
    try {
      const response = await axiosRequest({
        url: `add-product-mobile?productID=${params?.product_id}`,
        method: 'POST',
        data: params?.Data,
        headers: {
          'Content-Type': 'multipart/form-data',
          // Accept: 'application/json',
        },
        // params: {
        //   step: 'first',
        // },
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
export const addProductDetailAction = createAsyncThunk(
  `addProduct/addProductDetailAction`,
  async (params, thunkAPI) => {
    try {
      const response = await axiosRequest({
        url: `update-product-data/${params?.product_id}`,
        method: 'POST',
        data: params,
        params: {
          step: 'second',
        },
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
export const addProductPriceAction = createAsyncThunk(
  `addProduct/addProductPriceAction`,
  async (params, thunkAPI) => {
    try {
      const response = await axiosRequest({
        url: `update-product-data/${params?.product_id}`,
        method: 'POST',
        data: params,
        headers: {
          'Content-Type': 'multipart/form-data',
          // Accept: 'application/json',
        },
        params: {
          step: 'third',
        },
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response ? error.response?.data : error?.message,
      );
    }
  },
);

//Edit Product Actions #############################################################################################

/**
 * Api Action
 */
export const getAllDataAction = createAsyncThunk(
  `addProduct/getAllDataAction`,
  async (params, thunkAPI) => {
    try {
      const response = await axiosRequest({
        url: `product-details/${params?.product_id}`,
        method: 'GET',
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response ? error.response?.data : error?.message,
      );
    }
  },
);

export const removeProductImage = createAsyncThunk(
  `addProduct/removeProductImage`,
  async (params, thunkAPI) => {
    console.log(params, 'for delete image from edit product');

    try {
      const response = await axiosRequest({
        url: `remove-product-images/${params?.product_id}/${params?.image_id}`,
        method: 'GET',
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response ? error.response?.data : error?.message,
      );
    }
  },
);
export const autoCompleteListing = createAsyncThunk(
  `addProduct/auto-fills-list`,
  async (params, thunkAPI) => {
    console.log(params, 'data for params');

    try {
      const response = await axiosRequest({
        url: `auto-fills-list`,
        method: 'GET',
        params: params,
      });
      console.log(response, 'from auto listing api');
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response ? error.response?.data : error?.message,
      );
    }
  },
);
