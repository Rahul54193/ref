import {LoadingStatus} from '@app/helper/strings';

const {createEntityAdapter, createSlice} = require('@reduxjs/toolkit');
const {
  getGeneralProfile,
  updateGeneralProfile,
} = require('./GeneralProfile.action');

const SLICE_FEATURE_KEY = 'updateGeneralProfile';

const entityAdapter = createEntityAdapter();
const initialState = entityAdapter.getInitialState({
  getGeneralProfileLoadingStatus: LoadingStatus.NOT_LOADED,
  getGeneralProfile: [],
  getGeneralProfileError: null,
  updateGeneralProfileLoadingStatus: LoadingStatus.NOT_LOADED,
  updateGeneralProfile: [],
  updateGeneralProfileError: null,
});

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
      .addCase(getGeneralProfile.pending, state => {
        state.getGeneralProfileLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(getGeneralProfile.fulfilled, (state, action) => {
        (state.getGeneralProfileLoadingStatus = LoadingStatus.LOADED),
          (state.getGeneralProfile = action.payload?.data);
      })
      .addCase(getGeneralProfile.rejected, (state, action) => {
        state.getGeneralProfileLoadingStatus = LoadingStatus.FAILED;
        state.getGeneralProfileError = action.payload;
      })
      .addCase(updateGeneralProfile.pending, state => {
        state.updateGeneralProfileLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(updateGeneralProfile.fulfilled, (state, action) => {
        state.updateGeneralProfileLoadingStatus = LoadingStatus.LOADED;
        state.updateGeneralProfile = action.payload?.data;
      })
      .addCase(updateGeneralProfile.rejected, (state, action) => {
        state.updateGeneralProfile = LoadingStatus.FAILED;
        state.updateGeneralProfileError = action.payload;
      });
  },
});

export const {resetSliceState} = reduxSlice.actions;
export const generalProfileReducer = reduxSlice.reducer;
