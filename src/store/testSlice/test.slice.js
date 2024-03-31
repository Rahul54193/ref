import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import {apiAction} from './actions';
import {LoadingStatus} from '../../helper/strings';

// =============================== Redux : Test Slice ==================================

const SLICE_FEATURE_KEY = 'test';

// Create entity adapter
const entityAdapter = createEntityAdapter();

// Define Initial State
const initialState = entityAdapter.getInitialState({
  loginLoadingStatus: LoadingStatus.NOT_LOADED,
  userDetails: null,
  loginError: null,
});

/**
 * Slice for all reducres
 */
const reduxSlice = createSlice({
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
      .addCase(apiAction.pending, state => {
        state.loginLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(apiAction.fulfilled, (state, action) => {
        state.loginLoadingStatus = LoadingStatus.LOADED;
      })
      .addCase(apiAction.rejected, (state, action) => {
        state.loginError = LoadingStatus.FAILED;
      });
  },
});

/*
 * Export reducer for store configuration.
 */

export const {resetSliceState} = reduxSlice.actions;

export const testReducer = reduxSlice.reducer;
