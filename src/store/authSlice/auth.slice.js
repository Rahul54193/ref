import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';

import {
  forgotPasswordAction,
  logoutAction,
  stayLoginAction,
  updateProfileAction,
  userProfile,
  userSigninAction,
  userSignupAction,
  changePasswordAction,
  getNotificationPermission,
  updateNotificationPermission,
  NotificationListing,
  UpdateNotificationStatus,
  NotificationCount,
  checkIdTag,
  NotificationCountUpdateAction,
  ResendOtpAction,
  ValidateOtpAction,
  UpdateMobileNumberAction,
} from './auth.actions';
import {LoadingStatus, RoutesName} from '@app/helper/strings';
import NavigationService from '@app/navigations/NavigationService';

// =============================== Redux : Auth Slice ==================================

const SLICE_FEATURE_KEY = 'auth';

// Create entity adapter
const entityAdapter = createEntityAdapter();

// Define Initial State
const initialState = entityAdapter.getInitialState({
  isAuthenticate: false,

  stayLoadingStatus: LoadingStatus.NOT_LOADED,
  stayError: null,

  signupLoadingStatus: LoadingStatus.NOT_LOADED,
  signupError: null,

  signinLoadingStatus: LoadingStatus.NOT_LOADED,
  signinError: null,
  userDetails: null,

  forgotPasswordLoadingStatus: LoadingStatus.NOT_LOADED,
  forgotPasswordError: null,

  changePasswordLoadingStatus: LoadingStatus.NOT_LOADED,
  changePasswordError: null,

  logoutLoadingStatus: LoadingStatus.NOT_LOADED,
  logoutError: null,

  userProfileLoadingStatus: LoadingStatus.NOT_LOADED,
  userProfileError: null,
  userProfileDetails: null,

  updateProfileLoadingStatus: LoadingStatus.NOT_LOADED,
  updateProfileError: null,

  // Notification Permission
  getNotificationPermissionLoadingStatus: LoadingStatus.NOT_LOADED,
  getNotificationDetails: null,
  getNotificationError: null,

  updateNotificationPermissionLoadingStatus: LoadingStatus.NOT_LOADED,
  updateNotificationDetails: null,
  updateNotificationError: null,

  //Notification Listing

  NotificationListingLoadingStatus: LoadingStatus.NOT_LOADED,
  NotificationListingError: null,
  NotificationListing: [],
  //Notification Status Update

  UpdateNotificationStatusLoadingStatus: LoadingStatus.NOT_LOADED,
  UpdateNotificationStatusError: null,
  UpdateNotificationStatus: [],
  //Notification count update

  NotificationCountUpdateActionStatusLoadingStatus: LoadingStatus.NOT_LOADED,
  NotificationCountUpdateActionStatusError: null,
  NotificationCountUpdateActionStatus: [],

  // Notification Count
  NotificationCountLoadingStatus: LoadingStatus.NOT_LOADED,
  NotificationCountStatus: [],
  NotificationCountError: null,

  // Resend Otp
  ResendOtpActionLoadingStatus: LoadingStatus.NOT_LOADED,
  ResendOtpActionStatus: [],
  ResendOtpActionError: null,
  // Resend Otp
  ValidateOtpActionLoadingStatus: LoadingStatus.NOT_LOADED,
  ValidateOtpActionStatus: [],
  ValidateOtpActionError: null,
  // Resend Otp
  UpdateMobileNumberActionLoadingStatus: LoadingStatus.NOT_LOADED,
  UpdateMobileNumberActionStatus: [],
  UpdateMobileNumberActionError: null,

  // check user id
  checkUserId: {},
  checkUserIdLoadingStatus: LoadingStatus.NOT_LOADED,
  checkUserIdError: null,
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
    onClearSignInError: (state, action) => {
      state.signinError = null;
    },
  },
  extraReducers: builder => {
    builder
      // Stay Login Action
      .addCase(stayLoginAction.fulfilled, (state, action) => {
        if (action.payload === 'true') {
          state.isAuthenticate = true;
        } else {
          state.isAuthenticate = false;
        }
      })
      // SignUp Action
      .addCase(userSignupAction.pending, (state, action) => {
        state.signupLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(userSignupAction.fulfilled, (state, action) => {
        state.signupLoadingStatus = LoadingStatus.LOADED;
        // state.userProfileDetails = action.payload?.data;
      })
      .addCase(userSignupAction.rejected, (state, action) => {
        state.signupLoadingStatus = LoadingStatus.FAILED;
        state.signupError = action.payload;
      })
      // Signin Action
      .addCase(userSigninAction.pending, (state, action) => {
        state.signinLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(userSigninAction.fulfilled, (state, action) => {
        state.signinError = null;
        console.log(action.payload, 'log in response');
        state.signinLoadingStatus = LoadingStatus.LOADED;
        if (action.payload?.data?.isProfileCompleted === 'no') {
          state.userProfileDetails = action.payload.data;
          state.isAuthenticate = false;
        } else {
          state.userProfileDetails = action.payload.data;
          state.isAuthenticate = true;
        }
      })
      .addCase(userSigninAction.rejected, (state, action) => {
        state.signinLoadingStatus = LoadingStatus.FAILED;
        state.signinError = action.payload;
      })
      // Forgot password Action
      .addCase(forgotPasswordAction.pending, (state, action) => {
        state.forgotPasswordLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(forgotPasswordAction.fulfilled, (state, action) => {
        state.forgotPasswordLoadingStatus = LoadingStatus.LOADED;
      })
      .addCase(forgotPasswordAction.rejected, (state, action) => {
        state.forgotPasswordLoadingStatus = LoadingStatus.FAILED;
        state.forgotPasswordError = action.payload;
      })
      // Change password Action
      .addCase(changePasswordAction.pending, (state, action) => {
        state.changePasswordLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(changePasswordAction.fulfilled, (state, action) => {
        state.changePasswordLoadingStatus = LoadingStatus.LOADED;
      })
      .addCase(changePasswordAction.rejected, (state, action) => {
        state.changePasswordLoadingStatus = LoadingStatus.FAILED;
        state.changePasswordError = action.payload;
      })
      // logout  Action
      .addCase(logoutAction.pending, (state, action) => {
        state.logoutLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(logoutAction.fulfilled, (state, action) => {
        state.logoutLoadingStatus = LoadingStatus.LOADED;
        state.isAuthenticate = false;
      })
      .addCase(logoutAction.rejected, (state, action) => {
        state.logoutLoadingStatus = LoadingStatus.FAILED;
        state.logoutError = action.payload;
      })
      .addCase(userProfile.pending, (state, action) => {
        state.userProfileLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(userProfile.fulfilled, (state, action) => {
        console.log(action.payload, 'response from user profile ');
        state.userProfileLoadingStatus = LoadingStatus.LOADED;
        state.userProfileDetails = action.payload?.data;
      })
      .addCase(userProfile.rejected, (state, action) => {
        state.userProfileLoadingStatus = LoadingStatus.FAILED;
        state.userProfileError = action.payload;
      })
      .addCase(updateProfileAction.pending, (state, action) => {
        state.updateProfileLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(updateProfileAction.fulfilled, (state, action) => {
        console.log(action.payload.data, 'fjkjfhksdfkdsklfdlksflsml');
        state.updateProfileLoadingStatus = LoadingStatus.LOADED;
        state.userProfileDetails = action.payload.data;
        state.isAuthenticate = true;
      })
      .addCase(updateProfileAction.rejected, (state, action) => {
        state.updateProfileLoadingStatus = LoadingStatus.FAILED;
        state.updateProfileError = action.payload;
      })
      .addCase(getNotificationPermission.pending, (state, action) => {
        state.getNotificationPermissionLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(getNotificationPermission.fulfilled, (state, action) => {
        state.getNotificationPermissionLoadingStatus = LoadingStatus.LOADED;
        state.getNotificationDetails = action.payload.data;
      })
      .addCase(getNotificationPermission.rejected, (state, action) => {
        state.getNotificationPermissionLoadingStatus = LoadingStatus.FAILED;
        state.getNotificationError = LoadingStatus.FAILED;
        state.getNotificationError = action.payload;
      })
      .addCase(updateNotificationPermission.pending, (state, action) => {
        state.updateProfileLoadingStatus == LoadingStatus.LOADING;
      })
      .addCase(updateNotificationPermission.fulfilled, (state, action) => {
        state.updateNotificationPermissionLoadingStatus = LoadingStatus.LOADED;
        state.updateNotificationDetails = action.payload.data;
      })
      .addCase(updateNotificationPermission.rejected, (state, action) => {
        state.updateNotificationPermissionLoadingStatus = LoadingStatus.FAILED;
        state.updateNotificationError = LoadingStatus.FAILED;
        state.updateNotificationError = action.payload;
      })
      // Notification Listing Action
      .addCase(NotificationListing.pending, (state, action) => {
        state.NotificationListingLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(NotificationListing.fulfilled, (state, action) => {
        state.NotificationListingLoadingStatus = LoadingStatus.LOADED;
        state.NotificationListing = action.payload;
      })
      .addCase(NotificationListing.rejected, (state, action) => {
        state.NotificationListingLoadingStatus = LoadingStatus.FAILED;
        state.NotificationListingError = action.payload;
      })
      // Notification Listing Action
      .addCase(UpdateNotificationStatus.pending, (state, action) => {
        state.UpdateNotificationStatusLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(UpdateNotificationStatus.fulfilled, (state, action) => {
        state.UpdateNotificationStatusLoadingStatus = LoadingStatus.LOADED;
        state.UpdateNotificationStatus = action.payload;
      })
      .addCase(UpdateNotificationStatus.rejected, (state, action) => {
        state.UpdateNotificationStatusLoadingStatus = LoadingStatus.FAILED;
        state.UpdateNotificationStatusError = action.payload;
      })

      // Notification Count

      .addCase(NotificationCount.pending, (state, action) => {
        state.NotificationCountLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(NotificationCount.fulfilled, (state, action) => {
        state.NotificationCountLoadingStatus = LoadingStatus.LOADED;
        state.NotificationCountStatus = action.payload.data;
      })
      .addCase(NotificationCount.rejected, (state, action) => {
        state.NotificationCountLoadingStatus = LoadingStatus.FAILED;
        state.NotificationCountError = action.payload;
      })

      // Notification Count update

      .addCase(NotificationCountUpdateAction.pending, (state, action) => {
        state.NotificationCountUpdateActionStatusLoadingStatus =
          LoadingStatus.LOADING;
      })
      .addCase(NotificationCountUpdateAction.fulfilled, (state, action) => {
        state.NotificationCountUpdateActionStatusLoadingStatus =
          LoadingStatus.LOADED;
        state.NotificationCountUpdateActionStatus = action.payload.data;
      })
      .addCase(NotificationCountUpdateAction.rejected, (state, action) => {
        state.NotificationCountUpdateActionStatusLoadingStatus =
          LoadingStatus.FAILED;
        state.UpdateNotificationStatusError = action.payload;
      })

      // Resend Otp

      .addCase(ResendOtpAction.pending, (state, action) => {
        state.ResendOtpActionLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(ResendOtpAction.fulfilled, (state, action) => {
        state.ResendOtpActionLoadingStatus = LoadingStatus.LOADED;
      })
      .addCase(ResendOtpAction.rejected, (state, action) => {
        state.ResendOtpActionLoadingStatus = LoadingStatus.FAILED;
        state.ResendOtpActionError = action.payload;
      })

      // Validate Otp

      .addCase(ValidateOtpAction.pending, (state, action) => {
        state.ValidateOtpActionLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(ValidateOtpAction.fulfilled, (state, action) => {
        state.ValidateOtpActionLoadingStatus = LoadingStatus.LOADED;
      })
      .addCase(ValidateOtpAction.rejected, (state, action) => {
        state.ValidateOtpActionLoadingStatus = LoadingStatus.FAILED;
        state.ValidateOtpActionError = action.payload;
      })

      // Update Mobile Number

      .addCase(UpdateMobileNumberAction.pending, (state, action) => {
        state.UpdateMobileNumberActionLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(UpdateMobileNumberAction.fulfilled, (state, action) => {
        state.UpdateMobileNumberActionLoadingStatus = LoadingStatus.LOADED;
      })
      .addCase(UpdateMobileNumberAction.rejected, (state, action) => {
        state.UpdateMobileNumberActionLoadingStatus = LoadingStatus.FAILED;
        state.UpdateMobileNumberActionError = action.payload;
      })

      // check user id

      .addCase(checkIdTag.pending, (state, action) => {
        state.checkUserIdLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(checkIdTag.fulfilled, (state, action) => {
        state.checkUserIdLoadingStatus = LoadingStatus.LOADED;
        console.log(action.payload, '=================...........');
        state.checkUserId = action.payload;
      })
      .addCase(checkIdTag.rejected, (state, action) => {
        state.checkUserIdLoadingStatus = LoadingStatus.FAILED;
        state.checkUserIdError = action.payload;
      });
  },
});

/*
 * Export reducer for store configuration.
 */

export const {resetSliceState, onClearSignInError} = reduxSlice.actions;

export const authReducer = reduxSlice.reducer;
