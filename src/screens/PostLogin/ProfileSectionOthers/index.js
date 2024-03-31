import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useId, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import { BackHeader, Container, CustomIcon, Spacer } from '@app/components';
import SellerProfile from './SellerProfile';
import NormalProfile from './NormalProfile';
import { ICON_TYPE } from '@app/components/CustomIcon';
import { LoadingStatus, RoutesName } from '@app/helper/strings';
import {
  changeProductStatusAction,
  onFollowClickAction,
  profileAboutAction,
  sellerProductListingAction,
} from '@app/store/profileSectionSlice';
import {
  addWishListAction,
  getBrandListingAction,
} from '@app/store/exploreProductSlice';
import { useIsFocused } from '@react-navigation/native';
import { showAlert } from '@app/helper/commonFunction';
import branch from 'react-native-branch';
import { userProfile } from '@app/store/authSlice';

const ProfileSection = props => {
  const {
    authReducer,
    route,
    navigation,
    profileSectionReducer,
    getProfileAbout,
    getProfileListing,
    followClickAction,
    getBrandList,
    exploreProductReducer,
    userProfile,
  } = props;
  const isFocused = useIsFocused();
  console.log(route, '---->>ddghfjgjg');

  const userid = authReducer?.userProfileDetails?.id;
  const isOwn =
    userid === route?.params?.userId;
  const dispatch = useDispatch();

  const userId = route.params?.userId;
  // ? route.params?.userId
  // : authReducer?.userProfileDetails?.id;
  console.log('userId ==========================>>>>>', userId);
  console.log('Auth reducer==========>>>>>>>>>>>>', props);
  const isSelf = userId === authReducer?.userProfileDetails?.id ?? false;
  const isSeller =
    profileSectionReducer?.profileAbout?.role === 'seller' ? true : false;

  const useDetail = profileSectionReducer?.profileAbout;
  const buoRef = useRef();
  useEffect(() => {
    if (isFocused) {
      getProfileAbout({ userId: userId });
      getProfileListing({ userId: userId });
    }
    return () => {
      if (buoRef.current) {
        console.log('buo release');
        buoRef.current?.release();
      }
    };
  }, [isFocused]);

  useEffect(() => {
    userProfile();
  }, []);

  const onClickFollow = () => {
    if (
      authReducer?.userProfileDetails?.email === 'swi@swi.com'
    ) {
      LoginAlertCheck(dispatch);
    } else {
      followClickAction({
        user_id: userId,
        followed_visited_by: authReducer?.userProfileDetails?.id,
        type: 'follow',
      }).then(res => {
        if (res?.type.includes('fulfilled')) {
          getProfileAbout({ userId: userId });
          showAlert({
            title: 'Success',
            message: res?.payload?.message,
          });
        }
        if (res?.type.includes('rejected')) {
          showAlert({
            title: 'Error',
            message: res?.payload?.message ?? 'Internal server error!',
          });
        }
      });

    }

  };

  const onSharePerson = async () => {

    let linkProperties = {
      feature: 'share',
      channel: 'RNApp',
      campaign: `User ID - ${useDetail.id}`,
    };
    let shareOptions = {
      messageHeader: 'Visit my profile',
      messageBody: 'Visit my profile for more details.',
    };
    let controlParams = {
      $desktop_url: 'https://www.sgwatchinsider.com/',
    };

    buoRef.current = await branch.createBranchUniversalObject(
      `user/${useDetail.id}`,
      {
        title: 'Product Title',
        contentDescription: 'Product Description',
        canonicalUrl: '',
        contentMetadata: {
          customMetadata: {
            userID: `${useDetail.id}`,
          },
        },
      },
    );
    let { url } = await buoRef.current?.generateShortUrl(
      linkProperties,
      controlParams,
    );
    console.log('url', url);
    let { channel, completed, error } = await buoRef.current?.showShareSheet(
      shareOptions,
      linkProperties,
      controlParams,
    );
    console.log('test', { channel, completed, error });
  };

  return (
    <Container
      useSafeAreaView={true}
      loading={
        profileSectionReducer?.profileAboutLoadingStatus ===
        LoadingStatus.LOADING &&
        profileSectionReducer?.sellerProductListingLoadingStatus ===
        LoadingStatus.LOADING
      }>
      <BackHeader
        rightComponent={
          <View style={{ alignSelf: 'flex-end' }}>
            {isOwn ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={{ flexDirection: 'row' }}>
                  <Pressable
                    style={styles.button}
                    onPress={() => {
                      if (
                        authReducer?.userProfileDetails?.email === 'swi@swi.com'
                      ) {
                        LoginAlertCheck(dispatch);
                      } else {
                        navigation?.navigate(RoutesName.PROFILE_TAB);
                      }

                    }}>
                    <CustomIcon
                      origin={ICON_TYPE.MATERIAL_COMMUNITY}
                      name={'account-settings-outline'}
                      color={'black'}
                      size={30}
                    />
                  </Pressable>

                  <Pressable
                    style={styles.button}
                    onPress={() => {
                      if (
                        authReducer?.userProfileDetails?.email === 'swi@swi.com'
                      ) {
                        LoginAlertCheck(dispatch);
                      } else {
                        navigation?.navigate(RoutesName.EDIT_PROFILE_SECTION_SCREEN, {
                          userId: userId,
                          isSeller: isSeller,
                        });
                      }

                    }}>
                    <CustomIcon
                      origin={ICON_TYPE.OCTICONS}
                      name={'pencil'}
                      color={'black'}
                      size={25}
                    />
                  </Pressable>
                </View>
                {/* <Pressable
                style={styles.button}
                onPress={() => {
                  navigation?.navigate(RoutesName.PROFILE_QR_SCREEN, {
                    userDetail: useDetail,
                  });
                }}>
                <CustomIcon
                  origin={ICON_TYPE.MATERIAL_COMMUNITY}
                  name={'qrcode-scan'}
                  color={'black'}
                  size={30}
                />
              </Pressable> */}
              </View>
            ) : isSeller ? null : (
              <Pressable style={styles.button} onPress={() => onSharePerson()}>
                <CustomIcon
                  origin={ICON_TYPE.FEATHER_ICONS}
                  name={'share-2'}
                  color={'black'}
                  size={30}
                />
              </Pressable>
            )}
          </View>

        }
      />


      <Spacer />
      {isSeller ? (
        <SellerProfile
          isSelf={isSelf}
          onClickFollow={onClickFollow}
          {...props}
        />
      ) : (
        <NormalProfile isSelf={isSelf} {...props} />
      )}
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    authReducer: state?.authReducer,
    profileSectionReducer: state?.profileSectionReducer,
    exploreProductReducer: state?.exploreProductReducer,
  };
};

const mapDispatchToProps = dispatch => ({
  //   getBannerList: params => dispatch(getBannerAction(params)),
  getProfileAbout: params => dispatch(profileAboutAction(params)),
  getProfileListing: params => dispatch(sellerProductListingAction(params)),
  onChangeProductStatus: params => dispatch(changeProductStatusAction(params)),
  onWishlistClick: params => dispatch(addWishListAction(params)),
  followClickAction: params => dispatch(onFollowClickAction(params)),
  getBrandList: params => dispatch(getBrandListingAction(params)),
  userProfile: params => dispatch(userProfile()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSection);

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 50,
    justifyContent: 'center',
  },
});
// function to check is user logged in or not
export function LoginAlertCheck(dispatch) {
  showAlert({
    title: 'Alert',
    message: 'Please log in to use the app.',
    actions: [
      {
        text: 'Log in',
        style: 'default',
        onPress: () => {
          dispatch(logoutAction());
          // Code to run when the "Confirm" button is pressed
        },
      },
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: () => { },
      },
    ],
  });
}
