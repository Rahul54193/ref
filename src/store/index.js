import {combineReducers, configureStore} from '@reduxjs/toolkit';
// import {AuthReducer} from './auth.slice';
import SharedPreference from '../helper/SharedPreference';
import authReducer from './authSlice';
import exploreProductReducer, {
  addToCompareReducer,
} from './exploreProductSlice';
import exploreReducer from './explore.slice';
import {productReducer, productStateReducer} from './productSlice';
import sellersProfileReducer from './sellersProfileSclice';
import wishlistReducer from './wishlistSlice';
import chatReducer from './chatSlice';
import generalProfileReducer from './GeneralProfile';
import profileSectionReducer from './profileSectionSlice';
import ratingReviewReducer from './ratingReviewSlice';
import {boostProductReducer} from './exploreProductSlice/boostProduct.slice';

const combinedReducer = combineReducers({
  authReducer,
  exploreProductReducer,
  productReducer,
  productStateReducer,
  exploreReducer,
  profileSectionReducer,

  addToCompareReducer,
  sellersProfileReducer,
  wishlistReducer,
  chatReducer,
  ratingReviewReducer,
  boostProductReducer,

  generalProfileReducer,
});

const rootReducers = (state, action) => {
  if (action?.type === 'USER_LOGOUT') {
    console.log('401 Unauth');
    // SharedPreference.clearAllData();
    SharedPreference.multiRemove([
      SharedPreference.keys.IS_AUTHENTICATE,
      SharedPreference.keys.TOKEN,
    ]);

    state = undefined;
  }

  return combinedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducers,
  //code for serialization
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
