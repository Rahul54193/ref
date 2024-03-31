import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import {apiAction} from './actions';
import {LoadingStatus} from '../../helper/strings';

// =============================== Redux : Test Slice ==================================

const SLICE_FEATURE_KEY = 'addToCompare';

// Create entity adapter
const entityAdapter = createEntityAdapter();

// Define Initial State
const initialState = entityAdapter.getInitialState({
  productCompareList: [],
});

/**
 * Slice for all reducres
 */
const reduxSlice = createSlice({
  name: SLICE_FEATURE_KEY,
  initialState: initialState,
  reducers: {
    resetAddToProductSliceState: (state, action) => {
      return {
        ...initialState,
      };
    },
    onAddToProductCompare: (state, action) => {
      console.log('Action PAyload', action.payload);

      const temp = [
        ...state.productCompareList
          .filter(item => item?.id != action.payload?.id)
          .concat(action.payload),
      ];
      console.log('temp===', temp);
      state.productCompareList = temp;
    },
    onhandleRemoveProduct: (state, action) => {
      console.log('actionpayloadRemove product', action.payload);
      state.productCompareList = state.productCompareList.filter(
        item => item.id !== action.payload,
      );
    },
  },
});

/*
 * Export reducer for store configuration.
 */

export const {
  resetAddToProductSliceState,
  onAddToProductCompare,
  onhandleRemoveProduct,
} = reduxSlice.actions;

export const addToCompareReducer = reduxSlice.reducer;
