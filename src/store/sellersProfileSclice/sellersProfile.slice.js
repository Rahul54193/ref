import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { apiAction } from './actions';
import { LoadingStatus } from '../../helper/strings';
import { CoinHistoryAction, sellerProductListingAction } from "../sellersProfileSclice/sellersProfile.action"

// =============================== Redux : Test Slice ==================================

const SLICE_FEATURE_KEY = 'sellersProfile';

// Create entity adapter
const entityAdapter = createEntityAdapter();

// Define Initial State
const initialState = entityAdapter.getInitialState({
  sellerProductListingActionLoadingStatus: LoadingStatus.NOT_LOADED,
  sellerProductListingAction: [],
  sellerProductListingActionError: null,
  CoinHistoryActionLoadingStatus: LoadingStatus.NOT_LOADED,
  CoinHistoryAction: [],
  CoinHistoryActionError: null,
});

/**
 * Slice for all reducres
 */
const sellerSlice = createSlice({
  name: SLICE_FEATURE_KEY,
  initialState: initialState,
  reducers: {
    resetSliceState: (state, action) => {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: builder => {
    builder

      //product Details
      .addCase(sellerProductListingAction.pending, state => {
        state.sellerProductListingActionLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(sellerProductListingAction.fulfilled, (state, action) => {
        state.sellerProductListingActionLoadingStatus = LoadingStatus.LOADED;
        state.sellerProductListingAction = action.payload;
      })
      .addCase(sellerProductListingAction.rejected, (state, action) => {
        state.sellerProductListingAction = LoadingStatus.FAILED;
        state.sellerProductListingActionError = action.payload;
      })
      //Coin History
      .addCase(CoinHistoryAction.pending, state => {
        state.CoinHistoryActionLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(CoinHistoryAction.fulfilled, (state, action) => {
        state.CoinHistoryActionLoadingStatus = LoadingStatus.LOADED;
        state.CoinHistoryAction = action.payload;
      })
      .addCase(CoinHistoryAction.rejected, (state, action) => {
        state.CoinHistoryActionLoadingStatus = LoadingStatus.FAILED;
        state.CoinHistoryActionError = action.payload;
      });
  },
});

/*
 * Export reducer for store configuration.
 */

export const { resetSliceState } = sellerSlice.actions;

export const sellersProfileReducer = sellerSlice.reducer;
