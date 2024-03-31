import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Config} from '../helper/config';
// import axiosRequest from '../services/api';

import {fire} from 'react-native-alertbox';
import {LoadingStatus} from '../helper/strings';
import axiosRequest from '@app/helper/axiosRequest';

const initialState = {
  //states for explore product listing
  products: [],
  productResponse: {},

  loading: LoadingStatus.NOT_LOADED,

  isMoreProducts: false,
  // state for explore banner listing
  bannerLoading: LoadingStatus.NOT_LOADED,
  bannerList: [],
  bannerListError: null,
  // state for trendy watches products
  trendyWatchesProducts: [],
  trendyWatchesProductsLoading: LoadingStatus.NOT_LOADED,
  trendyWatchesProductsError: null,
  // state for product added in wishList
  productAddWishListLoading: LoadingStatus.NOT_LOADED,
  productAddWishListError: null,
  productAddWishListData: {},
  //state for product wish listing trendy watches
  productTrendyAddWishListLoading: LoadingStatus.NOT_LOADED,
  productTrendyAddWishListError: null,
  productTrendyAddWishListData: {},

  //state for product detail
  productDetailLoading: LoadingStatus.NOT_LOADED,
  productDetailData: {},
  productDetailError: null,
  // state to hide tab bar
  isToggledTabBar: false,
  // states for product detail
  productChartLoading: LoadingStatus.NOT_LOADED,
  productChartData: {},
  productChartError: null,
  // states for brand list
  brandsLoading: LoadingStatus.NOT_LOADED,
  brands: [],
  brandsError: null,
};

//  exploreProducts API

export const exploreProductListing = createAsyncThunk(
  'explore/Products',
  async (
    {
      page = 1,
      keyWord = '',
      latitude = 0,
      longitude = 0,
      distance = 0,
      sortby = '',
      dir = '',
      min_price = 0,
      max_price = 9900000,
      brands = [6, 4],
      watch_condition = '',
    },
    thunkAPI,
  ) => {
    console.log(
      'Keys for explore poduct  ',

      'page--',
      page,
      'keyWord',
      keyWord,
      'latitude',
      latitude,
      'longitude',
      longitude,
      'distance',
      distance,
      'sortby',
      sortby,
      'dir',
      dir,
      'minPrice',
      min_price,
      'maxPrice',
      max_price,
      'watchCondition',
      watch_condition,
    );
    try {
      const response = await axiosRequest({
        url: `${Config.API_URL}products-list`,
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        params: {
          min_price: min_price,
          page: page,
          keyWord: keyWord,
          latitude: latitude,
          longitude: longitude,
          distance: distance,
          sortby: sortby,
          dir: dir,
          brands: brands,
          max_price: max_price,
          watch_condition: watch_condition,
        },
      });
      console.log('Explore Product Listing', response.data.data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
// Explore banner api
export const exploreBannerListing = createAsyncThunk(
  'explore/BannerList',
  async (_, thunkAPI) => {
    try {
      const response = await axiosRequest({
        url: 'banner-list',
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
      // console.log('Explore Banner Listing', response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
// Explore trendy products api
export const exploreTrendyWatchesListing = createAsyncThunk(
  'explore/TrendyWatchesListing',
  async (_, thunkAPI) => {
    try {
      const response = await axiosRequest({
        url: 'products-list-top',
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
      // console.log('TrendyWatchesListing', response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// product addition in wishlist
export const addWishlist = createAsyncThunk(
  'explore/addWishlist',
  async ({product_id, index}, thunkAPI) => {
    try {
      const response = await axiosRequest({
        url: `add-wishlist/${product_id}`,
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      });
      // console.log('product added in wishlist', response);
      return {response, index};
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// trendy product adding in wishlisting

export const addTrendyWishlist = createAsyncThunk(
  'explore/addTrendyWishlist',
  async ({product_id, index}, thunkAPI) => {
    try {
      const response = await axiosRequest({
        url: `add-wishlist/${product_id}`,
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      });
      // console.log('product added in wishlist', response);
      return {response, index};
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// Product detail api call
export const exploreProductDetail = createAsyncThunk(
  'explore/ProductDetail',
  async ({product_id}, thunkAPI) => {
    console.log('page----======>> ', product_id);
    try {
      const response = await axiosRequest({
        url: `product-details/${product_id}`,
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
      console.log('Explore Product detail', response);
      return response;
    } catch (error) {
      console.log('Errro1', error.response);

      return thunkAPI.rejectWithValue(error);
    }
  },
);

// API for chart
export const productChart = createAsyncThunk(
  'explore/productChart',
  async (params, thunkAPI) => {
    console.log('params====>>', params);
    try {
      const response = await axiosRequest({
        url: 'products-chart',
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        params: params,
      });
      return response;
    } catch (error) {
      console.log('Errro1', error.response);
      return thunkAPI.rejectWithValue(error);
    }
  },
);
// API FOR BRAND LISTING
export const brandListing = createAsyncThunk(
  'explore/brandListing',
  async (_, thunkAPI) => {
    try {
      const response = await axiosRequest({
        url: 'brand-list',
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
      console.log('brand Listing', response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
const exploreSlice = createSlice({
  name: 'exploreSlice',
  initialState,
  reducers: {
    toggleTabBar: (state, action) => {
      state.isToggledTabBar = action.payload;
    },
    clearProductsState: state => {
      console.log('asdfghjksdfghjasdfghjkdfghsdfghfgh');
      state.products = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(exploreProductListing.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(exploreProductListing.fulfilled, (state, action) => {
        state.loading = false;
        console.log('ACTION PAYLOAD ====>>>>', action.payload);
        state.productResponse = action?.payload;

        state.products = [...state.products, ...action?.payload?.data?.data];
        // console.log('state.products', state.products);
      })
      .addCase(exploreProductListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload;
      })
      .addCase(exploreBannerListing.pending, state => {
        state.bannerLoading = true;
      })
      .addCase(exploreBannerListing.fulfilled, (state, action) => {
        state.bannerLoading = false;
        // console.log(action.payload, 'sdnns');
        state.bannerList = action?.payload;
      })
      .addCase(exploreBannerListing.rejected, (state, action) => {
        state.bannerLoading = false;
        state.bannerListError = action?.payload;
      })
      .addCase(exploreTrendyWatchesListing.pending, state => {
        state.trendyWatchesProductsLoading = true;
      })
      .addCase(exploreTrendyWatchesListing.fulfilled, (state, action) => {
        state.trendyWatchesProductsLoading = false;
        // console.log(action.payload, 'Trendy watches');
        state.trendyWatchesProducts = action?.payload;
      })
      .addCase(exploreTrendyWatchesListing.rejected, (state, action) => {
        state.trendyWatchesProductsLoading = false;
        state.trendyWatchesProductsError = action?.payload;
      })
      .addCase(addWishlist.pending, state => {
        state.productAddWishListLoading = true;
      })
      .addCase(addWishlist.fulfilled, (state, action) => {
        state.productAddWishListLoading = false;
        console.log(action?.payload?.response, 'fhkdskfhdksjhfjkshkjhsk');
        state.productAddWishListData = action?.payload?.response;
        if (state.products[action.payload.index].isInWishlist == true) {
          state.products[action.payload.index].isInWishlist = false;
        } else {
          state.products[action.payload.index].isInWishlist = true;
        }

        fire({
          message: action.payload.response.message,
          actions: [
            {
              text: 'Ok',
              style: 'cancel',
            },
          ],
        });
      })
      .addCase(addWishlist.rejected, (state, action) => {
        state.productAddWishListLoading = false;
        state.productAddWishListError = action?.payload;
      })
      .addCase(addTrendyWishlist.pending, state => {
        state.productTrendyAddWishListLoading = true;
      })
      .addCase(addTrendyWishlist.fulfilled, (state, action) => {
        state.productTrendyAddWishListLoading = false;
        console.log(action?.payload?.response, 'fhkdskfhdksjhfjkshkjhsk');
        state.productTrendyAddWishListData = action?.payload?.response;
        if (
          state.trendyWatchesProducts?.data[action.payload.index]
            .isInWishlist == true
        ) {
          state.trendyWatchesProducts.data[
            action.payload.index
          ].isInWishlist = false;
        } else {
          state.trendyWatchesProducts.data[
            action.payload.index
          ].isInWishlist = true;
        }

        fire({
          message: action.payload.response.message,
          actions: [
            {
              text: 'Ok',
              style: 'cancel',
            },
          ],
        });
      })
      .addCase(addTrendyWishlist.rejected, (state, action) => {
        state.productTrendyAddWishListLoading = false;
        state.productTrendyAddWishListError = action?.payload;
      })
      .addCase(exploreProductDetail.pending, state => {
        state.productDetailLoading = true;
      })
      .addCase(exploreProductDetail.fulfilled, (state, action) => {
        state.productDetailLoading = false;
        console.log(action.payload, 'mmmmmmmm');
        state.productDetailData = action?.payload;
        console.log(state.productDetailData, 'gggg');
      })
      .addCase(exploreProductDetail.rejected, (state, action) => {
        state.productDetailLoading = false;
        state.productDetailError = action?.payload;
      })
      .addCase(productChart.pending, state => {
        state.productChartLoading = true;
      })
      .addCase(productChart.fulfilled, (state, action) => {
        state.productChartLoading = false;
        console.log(action.payload, '======lll');
        state.productChartData = action?.payload;
      })
      .addCase(productChart.rejected, (state, action) => {
        state.productChartLoading = false;
        state.productChartError = action?.payload;
      })
      .addCase(brandListing.pending, state => {
        state.brandsLoading = true;
      })
      .addCase(brandListing.fulfilled, (state, action) => {
        state.brandsLoading = false;
        console.log(action.payload, '======lll');
        state.brands = action?.payload?.data;
      })
      .addCase(brandListing.rejected, (state, action) => {
        state.brandsLoading = false;
        state.brandsError = action?.payload;
      });
  },
});
export const {toggleTabBar, clearProductsState} = exploreSlice.actions;
export const {actions: exploreActions, reducer: exploreReducer} = exploreSlice;
export default exploreSlice.reducer;
