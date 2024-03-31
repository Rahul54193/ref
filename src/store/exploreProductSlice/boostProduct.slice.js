import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import {apiAction} from './actions';
import {LoadingStatus} from '../../helper/strings';
import {
  boostPlans,
  boostProduct,
  coinPlans,
  purchaseCoins,
} from './boostProduct.action';

// =============================== Redux : Test Slice ==================================

const SLICE_FEATURE_KEY = 'boostProductSlice';

// Create entity adapter
const entityAdapter = createEntityAdapter();

// Define Initial State
const initialState = entityAdapter.getInitialState({
  boostProductLoading: LoadingStatus.NOT_LOADED,
  boostProductData: {},
  boostProductError: null,
  boostPlansLoading: LoadingStatus.NOT_LOADED,
  boostPlansData: {},
  boostPlansError: null,
  coinsPlansLoading: LoadingStatus.NOT_LOADED,
  coinPlansData: {},
  coinsPlansError: null,
  purchaseCoinsLoading: LoadingStatus.NOT_LOADED,
  purchaseCoinsData: {},
  purchaseCoinsError: null,
});

/**
 * Slice for all reducres
 */
const reduxSlice = createSlice({
  name: SLICE_FEATURE_KEY,
  initialState: initialState,
  reducers: {
    resetBoostProductSliceState: (state, action) => {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(boostProduct.pending, state => {
        state.boostProductLoading = LoadingStatus.LOADING;
      })
      .addCase(boostProduct.fulfilled, (state, action) => {
        console.log(action.payload, '===>>>boostProductActionPayload');
        state.boostProductLoading = LoadingStatus.LOADED;
        state.boostProductData = action.payload;
      })
      .addCase(boostProduct.rejected, (state, action) => {
        state.boostProductLoading = LoadingStatus.FAILED;
        state.boostProductError = action.payload;
      })
      .addCase(boostPlans.pending, state => {
        state.boostPlansLoading = LoadingStatus.LOADING;
      })
      .addCase(boostPlans.fulfilled, (state, action) => {
        console.log(action.payload, '===>>>boostPlanspayload');
        state.boostPlansLoading = LoadingStatus.LOADED;
        state.boostPlansData = action.payload;
      })
      .addCase(boostPlans.rejected, (state, action) => {
        state.boostPlansLoading = LoadingStatus.FAILED;
        state.boostProductError = action.payload;
      })
      .addCase(coinPlans.pending, state => {
        state.coinsPlansLoading = LoadingStatus.LOADING;
      })
      .addCase(coinPlans.fulfilled, (state, action) => {
        console.log(action.payload, '===>>>coinsPlanspayload');
        state.coinsPlansLoading = LoadingStatus.LOADED;
        state.coinPlansData = action.payload;
      })
      .addCase(coinPlans.rejected, (state, action) => {
        state.coinsPlansLoading = LoadingStatus.FAILED;
        state.coinsPlansError = action.payload;
      })
      .addCase(purchaseCoins.pending, state => {
        state.purchaseCoinsLoading = LoadingStatus.LOADING;
      })
      .addCase(purchaseCoins.fulfilled, (state, action) => {
        console.log(action.payload, '===>>>coinsPlanspayload');
        state.purchaseCoinsLoading = LoadingStatus.LOADED;
        state.purchaseCoinsData = action.payload;
      })
      .addCase(purchaseCoins.rejected, (state, action) => {
        state.coinsPlansLoading = LoadingStatus.FAILED;
        state.purchaseCoinsError = action.payload;
      });
  },
});

/*
 * Export reducer for store configuration.
 */

export const {resetBoostProductSliceState} = reduxSlice.actions;

export const boostProductReducer = reduxSlice.reducer;
