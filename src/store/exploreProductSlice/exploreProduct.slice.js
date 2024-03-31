import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';

import {LoadingStatus} from '@app/helper/strings';
import {
  addPriceAlert,
  addProductInterestList,
  addWishListAction,
  freshFindsAction,
  freshFindsSearchingAction,
  getBannerAction,
  getBrandListingAction,
  getProductChartAction,
  getProductDetailsAction,
  getTopNotchWatchAction,
  getTopNotchWatchSearchingAction,
  getTrendyWatchAction,
  productInsights,
  productSearch,
  removePriceAlert,
  searchHistory,
  searchHistoryDelete,
  searchHistoryList,
} from './exploreProduct.action';
import {mergeArrays} from '@app/helper/commonFunction';

// =============================== Redux : Test Slice ==================================

const SLICE_FEATURE_KEY = 'exploreProduct';

// Create entity adapter
const entityAdapter = createEntityAdapter();

// Define Initial State
const initialState = entityAdapter.getInitialState({
  freshFindLoadingStatus: LoadingStatus.NOT_LOADED,
  freshFinds: [],
  freshFindsError: null,

  freshFindSearchingLoadingStatus: LoadingStatus.NOT_LOADED,
  freshFindsSearching: [],
  freshFindsSearchingError: null,

  bannerListLoadingStatus: LoadingStatus.NOT_LOADED,
  bannerList: [],
  bannerListError: null,

  trendyWatchesLoadingStatus: LoadingStatus.NOT_LOADED,
  trendyWatches: [],
  trendyWatchesError: null,

  topNotchWatchLoadingStatus: LoadingStatus.NOT_LOADED,
  topNotchWatchCurrentPage: null,
  topNotchWatch: [],
  isLoadMore: false,
  topNotchWatchError: null,

  topNotchWatchSearchingLoadingStatus: LoadingStatus.NOT_LOADED,
  topNotchWatchSearching: [],
  topNotchWatchSearchingLoadMore: false,
  topNotchWatchSearchingCurrentPage: null,
  topNotchWatchSearchingTotalResult: null,

  topNotchWatchSearchingError: null,

  productDetailsLoadingStatus: LoadingStatus.NOT_LOADED,
  productDetails: null,
  productDetailsError: null,

  productChartLoadingStatus: LoadingStatus.NOT_LOADED,
  productChart: null,
  productChartError: null,

  brandListLoadingStatus: LoadingStatus.NOT_LOADED,
  brandList: [],
  brandListError: null,

  addWishListLoadingStatus: LoadingStatus.NOT_LOADED,
  addWishListError: null,

  productInsightsInfoLoadingStatus: LoadingStatus.NOT_LOADED,
  productInsightsInfo: [],
  productInsightsInfoError: null,

  priceAlertLoadingStatus: LoadingStatus.NOT_LOADED,
  priceAlert: {},
  priceAlertError: null,

  removePriceAlertLoadingStatus: LoadingStatus.NOT_LOADED,
  removePriceAlert: {},
  removePriceAlertError: null,

  addProductInterestListLoadingStatus: LoadingStatus.NOT_LOADED,
  addProductInterestList: {},
  addProductInterestListError: null,

  searchHistoryListLoadingStatus: LoadingStatus.NOT_LOADED,
  searchHistoryList: {},
  searchHistoryListError: null,

  searchHistory: {},
  searchHistoryLoadingStatus: LoadingStatus.NOT_LOADED,
  searchHistoryError: null,

  searchHistoryDelete: {},
  searchHistoryDeleteLoadingStatus: LoadingStatus.NOT_LOADED,
  searchHistoryDeleteError: null,

  productSearch: {},
  productSearchLoadingStatus: LoadingStatus.NOT_LOADED,
  productSearchError: null,
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
    resetserachstate: (state, action) => {
      return {
        ...state,
        topNotchWatchSearching: null,
        topNotchWatchSearchingLoadMore: false,
        topNotchWatchSearchingCurrentPage: null,
      };
    },
    resetfreshFindsState: (state, action) => {
      return {
        ...state,
        freshFindsSearching: [],
      };
    },
    topNotchWatchResetState: (state, action) => {
      return {
        ...state,
        topNotchWatch: null,
      };
    },
  },
  extraReducers: builder => {
    builder
      // Fresh Find
      .addCase(freshFindsAction.pending, state => {
        state.freshFindLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(freshFindsAction.fulfilled, (state, action) => {
        state.freshFindLoadingStatus = LoadingStatus.LOADED;
        state.freshFinds = action.payload?.data;
      })
      .addCase(freshFindsAction.rejected, (state, action) => {
        state.freshFindLoadingStatus = LoadingStatus.FAILED;
        state.freshFindsError = action.payload;
      })
      // Banner List
      .addCase(getBannerAction.pending, state => {
        state.bannerListLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(getBannerAction.fulfilled, (state, action) => {
        state.bannerListLoadingStatus = LoadingStatus.LOADED;
        state.bannerList = action.payload?.data;
      })
      .addCase(getBannerAction.rejected, (state, action) => {
        state.bannerListLoadingStatus = LoadingStatus.FAILED;
        state.bannerListError = action.payload;
      })
      // Trendy Watch
      .addCase(getTrendyWatchAction.pending, state => {
        state.trendyWatchesLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(getTrendyWatchAction.fulfilled, (state, action) => {
        state.trendyWatchesLoadingStatus = LoadingStatus.LOADED;
        state.trendyWatches = action.payload?.data;
      })
      .addCase(getTrendyWatchAction.rejected, (state, action) => {
        state.trendyWatchesLoadingStatus = LoadingStatus.FAILED;
        state.trendyWatchesError = action.payload;
      })
      // Top Notch Watch
      .addCase(getTopNotchWatchAction.pending, state => {
        state.topNotchWatchLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(getTopNotchWatchAction.fulfilled, (state, action) => {
        state.topNotchWatchLoadingStatus = LoadingStatus.LOADED;
        state.topNotchWatchCurrentPage = action?.payload?.data?.current_page;
        state.topNotchWatch = mergeArrays(
          state.topNotchWatch,
          action.payload?.data?.data,
        );
        if (
          action.payload?.data?.current_page < action.payload?.data?.last_page
        ) {
          state.isLoadMore = true;
        } else {
          state.isLoadMore = false;
        }
      })
      .addCase(getTopNotchWatchAction.rejected, (state, action) => {
        state.topNotchWatchLoadingStatus = LoadingStatus.FAILED;
        state.topNotchWatchError = action.payload;
      })
      // Product details
      .addCase(getProductDetailsAction.pending, state => {
        state.productDetailsLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(getProductDetailsAction.fulfilled, (state, action) => {
        state.productDetailsLoadingStatus = LoadingStatus.LOADED;
        state.productDetails = action.payload?.data;
      })
      .addCase(getProductDetailsAction.rejected, (state, action) => {
        state.productDetailsLoadingStatus = LoadingStatus.FAILED;
        state.productDetailsError = action.payload;
      })

      // product chart
      .addCase(getProductChartAction.pending, state => {
        state.productChartLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(getProductChartAction.fulfilled, (state, action) => {
        state.productChartLoadingStatus = LoadingStatus.LOADED;
        state.productChart = action.payload?.data;
      })
      .addCase(getProductChartAction.rejected, (state, action) => {
        state.productChartLoadingStatus = LoadingStatus.FAILED;
        state.productChartError = action.payload;
      })

      // Add wishlist
      .addCase(addWishListAction.pending, state => {
        state.addWishListLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(addWishListAction.fulfilled, (state, action) => {
        state.addWishListLoadingStatus = LoadingStatus.LOADED;
      })
      .addCase(addWishListAction.rejected, (state, action) => {
        state.addWishListLoadingStatus = LoadingStatus.FAILED;
        state.addWishListError = action.payload;
      })
      // Brand List
      .addCase(getBrandListingAction.pending, state => {
        state.brandListLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(getBrandListingAction.fulfilled, (state, action) => {
        state.brandListLoadingStatus = LoadingStatus.LOADED;
        state.brandList = action.payload?.data;
      })
      .addCase(getBrandListingAction.rejected, (state, action) => {
        state.brandListLoadingStatus = LoadingStatus.FAILED;
        state.brandListError = action.payload;
      })
      .addCase(getTopNotchWatchSearchingAction.pending, state => {
        state.topNotchWatchSearchingLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(getTopNotchWatchSearchingAction.fulfilled, (state, action) => {
        state.topNotchWatchSearchingLoadingStatus = LoadingStatus.LOADED;
        state.topNotchWatchSearchingCurrentPage =
          action?.payload?.data?.current_page;
        state.topNotchWatchSearching = mergeArrays(
          state.topNotchWatchSearching,
          action?.payload?.data?.data,
        );
        if (
          action.payload?.data?.current_page < action.payload?.data?.last_page
        ) {
          state.topNotchWatchSearchingLoadMore = true;
        } else {
          state.topNotchWatchSearchingLoadMore = false;
        }

        state.topNotchWatchSearchingTotalResult = action?.payload?.data?.total;
      })
      .addCase(getTopNotchWatchSearchingAction.rejected, (state, action) => {
        state.topNotchWatchSearchingError = LoadingStatus.FAILED;
        state.topNotchWatchError = action.payload;
      })
      .addCase(freshFindsSearchingAction.pending, state => {
        state.freshFindSearchingLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(freshFindsSearchingAction.fulfilled, (state, action) => {
        (state.freshFindSearchingLoadingStatus = LoadingStatus.LOADED),
          console.log(action.payload.data, '^^^^^^^^^^^^^^^^^^^^^^^^^^^');
        state.freshFindsSearching = action.payload.data;
      })
      .addCase(freshFindsSearchingAction.rejected, (state, action) => {
        state.freshFindSearchingLoadingStatus = LoadingStatus.FAILED;
        state.freshFindsSearchingError = action.payload;
      })
      .addCase(productInsights.pending, state => {
        state.productInsightsInfoLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(productInsights.fulfilled, (state, action) => {
        (state.productInsightsInfoLoadingStatus = LoadingStatus.LOADED),
          (state.productInsightsInfo = action.payload.data);
      })
      .addCase(productInsights.rejected, (state, action) => {
        state.productInsightsInfoLoadingStatus = LoadingStatus.FAILED;
        state.productInsightsInfoError = action.payload;
      })
      .addCase(addPriceAlert.pending, state => {
        state.priceAlertLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(addPriceAlert.fulfilled, (state, action) => {
        (state.priceAlertLoadingStatus = LoadingStatus.LOADED),
          (state.priceAlert = action.payload.data);
      })
      .addCase(addPriceAlert.rejected, (state, action) => {
        state.priceAlertLoadingStatus = LoadingStatus.FAILED;
        state.priceAlertError = action.payload;
      })
      .addCase(removePriceAlert.pending, state => {
        state.removePriceAlertLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(removePriceAlert.fulfilled, (state, action) => {
        (state.removePriceAlertLoadingStatus = LoadingStatus.LOADED),
          (state.removePriceAlert = action.payload.data);
      })
      .addCase(removePriceAlert.rejected, (state, action) => {
        state.removePriceAlertLoadingStatus = LoadingStatus.FAILED;
        state.removePriceAlertError = action.payload;
      })
      .addCase(addProductInterestList.pending, state => {
        state.addProductInterestListLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(addProductInterestList.fulfilled, (state, action) => {
        (state.addProductInterestListLoadingStatus = LoadingStatus.LOADED),
          (state.addProductInterestList = action.payload.data);
      })
      .addCase(addProductInterestList.rejected, (state, action) => {
        state.addProductInterestListLoadingStatus = LoadingStatus.FAILED;
        state.addProductInterestListError = action.payload;
      })
      .addCase(searchHistoryList.pending, state => {
        state.searchHistoryListLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(searchHistoryList.fulfilled, (state, action) => {
        (state.searchHistoryListLoadingStatus = LoadingStatus.LOADED),
          (state.searchHistoryList = action.payload.data);
      })
      .addCase(searchHistoryList.rejected, (state, action) => {
        state.searchHistoryListLoadingStatus = LoadingStatus.FAILED;
        state.searchHistoryListError = action.payload;
      })
      .addCase(searchHistory.pending, state => {
        state.searchHistoryLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(searchHistory.fulfilled, (state, action) => {
        (state.searchHistoryLoadingStatus = LoadingStatus.LOADED),
          (state.searchHistory = action.payload.data);
      })
      .addCase(searchHistory.rejected, (state, action) => {
        state.searchHistoryLoadingStatus = LoadingStatus.FAILED;
        state.searchHistoryError = action.payload;
      })
      .addCase(searchHistoryDelete.pending, state => {
        state.searchHistoryDeleteLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(searchHistoryDelete.fulfilled, (state, action) => {
        (state.searchHistoryDeleteLoadingStatus = LoadingStatus.LOADED),
          (state.searchHistoryDelete = action.payload.data);
      })
      .addCase(searchHistoryDelete.rejected, (state, action) => {
        state.searchHistoryDeleteLoadingStatus = LoadingStatus.FAILED;
        state.searchHistoryError = action.payload;
      })
      .addCase(productSearch.pending, state => {
        state.productSearchLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(productSearch.fulfilled, (state, action) => {
        (state.productSearchLoadingStatus = LoadingStatus.LOADED),
          (state.productSearch = action.payload);
      })
      .addCase(productSearch.rejected, (state, action) => {
        state.productSearchLoadingStatus = LoadingStatus.FAILED;
        state.productSearchError = action.payload;
      });
  },
});

/*
 * Export reducer for store configuration.
 */

export const {
  resetSliceState,
  resetserachstate,
  resetfreshFindsState,
  topNotchWatchResetState,
} = reduxSlice.actions;

export const exploreProductReducer = reduxSlice.reducer;
