import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../services/api'; // assuming you have an API utility file
import {Config} from '../helper/config';

const initialState = {
  freshFindsProducts: [],
  freshFindsProductsLoading: false,
  freshFindsProductserror: null,
};

export const fetchFreshFinds = createAsyncThunk(
  'explore/fetchFreshFinds',
  async (params, thunkAPI) => {
    console.log(params, 'hnhnhnnhn');
    try {
      const response = await api({
        url: `${Config.API_URL}products-list-fresh`,
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        params: params,
      });
      console.log('Fresh finds', response);
      return response;
    } catch (error) {
      console.log('error--->>>', error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const freshFindsSlice = createSlice({
  name: 'freshFinds',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchFreshFinds.pending, state => {
        state.freshFindsProductsLoading = 'loading';
        state.freshFindsProductserror = null;
      })
      .addCase(fetchFreshFinds.fulfilled, (state, action) => {
        state.freshFindsProductsLoading = 'loaded';
        state.freshFindsProducts = action?.payload?.data;
      })
      .addCase(fetchFreshFinds.rejected, (state, action) => {
        state.freshFindsProductsLoading = 'error';
        state.freshFindsProductserror = action.payload;
      });
  },
});

export const freshFindsActions = freshFindsSlice.actions;
export const freshFindsReducer = freshFindsSlice.reducer;

export const getFreshFindLoading = state => {
  return state.freshFindsReducer.freshFindsProductsLoading === 'loading'
    ? true
    : false;
};

export const getFreshFindsData = state => {
  return state.freshFindsReducer.freshFindsProducts;
};
