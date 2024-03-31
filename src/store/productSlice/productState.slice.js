import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';

import {LoadingStatus} from '../../helper/strings';

// =============================== Redux : productState Slice ==================================

const SLICE_FEATURE_KEY = 'productState';

// Create entity adapter
const entityAdapter = createEntityAdapter();

// Define Initial State
const initialState = entityAdapter.getInitialState({
  loginLoadingStatus: LoadingStatus.NOT_LOADED,
  productImage: [],
  productCameraImage: [],
  productDetails: {
    brand_id: '',
    model_id: '',
    watch_condition: 'brand_new',
    title: '',
    no_certain: 'no', //yes or no
    dated: '',
    accessories: '',
    description: '',
    gender_type: 'Male',
    dial: '',
    dial_markers: '',
    case_size: '',
    movement: '',
    case_materials: '',
    bracelet: '',
    clasp: '',
    factory_gem_set: 'No',
    factory_gem: [],
    custom_gem_set: null,
    custom_gem: [],
    location: '',
    latitude: '',
    longitude: '',
    productID: '',
    new_brand: false,
    new_model: false,
  },
  productPrice: '',
});

/**
 * Slice for all reducres
 */
const reduxSlice = createSlice({
  name: SLICE_FEATURE_KEY,
  initialState: initialState,
  reducers: {
    resetProductState: (state, action) => {
      return {
        ...initialState,
      };
    },
    updateProductDetails: (state, action) => {
      const updatedDetails = {
        ...state.productDetails,
        [action.payload?.key]: action.payload?.value,
      };
      state.productDetails = updatedDetails;
    },
    updateMultipleProductDetails: (state, action) => {
      console.log(action.payload, 'running----<<<<<<^^^^');
      const updatedDetails = {
        ...state.productDetails,
        ...action.payload, // Use the entire payload object to update multiple properties
      };
      state.productDetails = updatedDetails;
    },
    updateProductPrice: (state, action) => {
      state.productPrice = action.payload;
    },
    updateProductImage: (state, action) => {
      console.log(action.payload, '--->>>><<<<<<');
      state.productImage = [...state.productImage, ...action.payload];
    },
    onDeleteProductImage: (state, action) => {
      console.log(action.payload, 'payload coming ');
      if (action.payload.image.path) {
        state.productImage = state.productImage.filter(
          item => item.image.path !== action.payload.image.path,
        );
      } else {
        state.productImage = state.productImage.filter(
          item => item.image.uri !== action.payload.image.uri,
        );
      }

      // state.productImage = state.productImage.filter(
      //   item => item.timestamp !== action.payload,
      // );
    },
    onDeleteCameraProductImage: (state, action) => {
      state.productCameraImage = state.productCameraImage.filter(
        item => item.path !== action.payload,
      );
    },
    updateProductImageFromCamera: (state, action) => {
      console.log(action.payload, '---->>>>>');
      state.productCameraImage = [...state.productCameraImage, action.payload];
    },
  },
});

/*
 * Export reducer for store configuration.
 */

export const {
  resetProductState,
  updateProductDetails,
  updateProductPrice,
  updateProductImage,
  onDeleteProductImage,
  updateProductImageFromCamera,
  onDeleteCameraProductImage,
  updateMultipleProductDetails,
} = reduxSlice.actions;

export const productStateReducer = reduxSlice.reducer;
