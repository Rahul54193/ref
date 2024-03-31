/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {IMAGES, SPACING} from '@app/resources';
import store from '@app/store';
// import {logoutAction} from '@app/store/authSlice/auth.slice';
import {RoutesName} from '@app/helper/strings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Alert,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import {SharedPreference} from '@app/helper';
import {useDispatch, useSelector} from 'react-redux';
import {logoutAction, userProfile} from '@app/store/authSlice';
import {useEffect, useState} from 'react';
import {BackHeader, Container, CustomIcon, Spacer} from '@app/components';
import {Avatar} from 'react-native-paper';
import {AssestsConst} from '@app/assets/assets';
import NavigationService from '@app/navigations/NavigationService';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {useIsFocused} from '@react-navigation/native';
import {addEllipsis} from '@app/helper/commonFunction';

const MyProfileScreen = props => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const isFocused = useIsFocused();

  const profileData = useSelector(
    state => state.authReducer?.userProfileDetails,
  );
  const dispatch = useDispatch();

  const logout = async () => {
    // await AsyncStorage.setItem('Token', '');
    // SharedPreference.multiRemove([
    //   SharedPreference.keys.IS_AUTHENTICATE,
    //   SharedPreference.keys.TOKEN,
    // ]);
    dispatch(logoutAction());
  };

  const handleLogout = () => {
    setIsLoggingOut(true);
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => setIsLoggingOut(false),
        },
        {text: 'Logout', style: 'destructive', onPress: () => performLogout()},
      ],
      {cancelable: false},
    );
  };
  console.log('profileData============>>>>>>>>>>>>>>', props);
  const performLogout = () => {
    logout();
    // Your logout logic goes here
    // For example: call an API to clear user session, navigate to login screen, etc.
    setIsLoggingOut(false);
    // Add your logout logic here
  };
  useEffect(() => {
    if (isFocused) {
      dispatch(userProfile({userId: profileData?.id}));
    }
  }, [isFocused]);

  return (
    <Container useSafeAreaView={Platform.OS === 'ios' ? true : false}>
      <ScrollView
        style={{flexGrow: 1, paddingBottom: 10}}
        showsVerticalScrollIndicator={false}>
        {/* <BackHeader /> */}
        <Pressable
          style={{
            backgroundColor: '#F6F6F6',
            paddingLeft: SPACING.SCALE_20,
            paddingTop: SPACING.SCALE_20,
          }}
          onPress={() => {
            if(props?.route?.params?.tab == "history")
            {
              NavigationService.navigate(RoutesName.EXPLORE_TAB)
            }
            else
            {NavigationService.goBack();}
          }}>
          <CustomIcon
            name={'arrowleft'}
            origin={ICON_TYPE.ANT_ICON}
            color={'black'}
            size={SPACING.SCALE_25}
          />
        </Pressable>

        <View
          style={{
            width: '100%',
            // height: SPACING.SCALE_145,
            backgroundColor: '#F6F6F6',
            //backgroundColor: 'blue',
            //marginLeft: 15,
            //alignItems: 'center',
            justifyContent: 'space-between',
            // backgroundColor: 'red',
          }}>
          <View style={styles.ProfilePicture}>
            {/* <Pressable
              onPress={() => {
                NavigationService.navigate(RoutesName.PROFILE_SECTION_SCREEN, {
                  userId: profileData.id,
                });
              }}> */}
            <View style={{flexDirection: 'row', marginTop: 20, marginLeft: 18}}>
              <View
                style={
                  {
                    // backgroundColor: 'green',
                    //marginLeft: SPACING.SCALE_10,
                    // marginTop: SPACING.SCALE_25,
                  }
                }>
                {/* <Image source={IMAGES.UserProfile1} style={styles.ImageStyle} /> */}
                {profileData?.image ? (
                  <Avatar.Image
                    size={SPACING.SCALE_90}
                    source={{
                      uri: profileData?.image,
                    }}
                  />
                ) : (
                  <Avatar.Image
                    size={SPACING.SCALE_90}
                    source={AssestsConst.AVATAR}
                  />
                )}
              </View>
              {/* </Pressable> */}
              <Spacer width={SPACING.SCALE_20} />

              {/* Parallel To Image Section  */}

              <View
                style={
                  {
                    // backgroundColor: 'yellow',
                    // marginRight: SPACING.SCALE_10,
                    // marginTop: SPACING.SCALE_25,
                  }
                }>
                <View style={styles.NameBadgeStyle}>
                  {profileData?.user_id_tag ? (
                    <Text style={styles.NameStyle}>
                      {`@${addEllipsis(profileData?.user_id_tag, 15)}`}
                    </Text>
                  ) : (
                    <Text style={styles.NameStyle}>
                      {`@${addEllipsis(profileData?.name, 15)}`}
                    </Text>
                  )}
                  <Spacer width={SPACING.SCALE_8} />
                  {profileData?.user_id_tag?.length < 12 && (
                    <View style={styles.BadgeStyle}>
                      {profileData?.premium_user === 'yes' ? (
                        <Text>
                          {' '}
                          {<Image source={IMAGES.ProfileBadge} />} Premium
                          Dealer
                        </Text>
                      ) : null}
                    </View>
                  )}
                </View>
                {/* <Spacer height={SPACING.SCALE_90} /> */}
                {profileData?.name.length > 12 && (
                  <View style={styles.BadgeStyle}>
                    {profileData?.premium_user === 'yes' ? (
                      <Text>
                        {' '}
                        {<Image source={IMAGES.ProfileBadge} />} Premium Dealer
                      </Text>
                    ) : null}
                  </View>
                )}
                <View style={styles.NameBadgeLineStyle} />
                {/* Verification Line Start */}

                <View>
                  <View style={styles.VerificationViewStyle}>
                    <Image
                      source={IMAGES.check}
                      style={{alignSelf: 'center'}}
                    />
                    <Text style={styles.VerificationStyle}>
                      {' '}
                      Email Verified
                    </Text>
                  </View>
                  <View style={styles.VerificationViewStyle}>
                    <Image
                      source={IMAGES.cross}
                      style={{alignSelf: 'center'}}
                    />
                    <Text style={styles.VerificationStyle}>
                      {' '}
                      SingPass verification Pending
                    </Text>
                  </View>
                </View>
                {/* Verification Line End */}
                <Spacer height={SPACING.SCALE_30} />
              </View>
            </View>

            {/* Parallel to Image section End  */}
          </View>
        </View>
        {/* <Pressable
          style={{position: 'absolute', top: 20, left: 20}}
          onPress={() => {
            NavigationService.goBack();
          }}>
          <CustomIcon
            name={'arrowleft'}
            origin={ICON_TYPE.ANT_ICON}
            color={'black'}
            size={SPACING.SCALE_25}
          />
        </Pressable> */}
        {profileData?.role === 'user' ? (
          <View style={{height: SPACING.SCALE_20}}></View>
        ) : (
          <View style={{}}>
            <Text style={styles.TextStyle1}>
              You have {<Image source={IMAGES.coin} />}{' '}
              {profileData?.coins ? profileData?.coins : '0'} coins with you now
            </Text>
          </View>
        )}
        <View
          style={{
            // backgroundColor: 'green',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Spacer height={SPACING.SCALE_20} />
          {/* Pages for Navigate */}

          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                props.navigation.navigate(RoutesName.MY_FAVOURITES);
              }}>
              <View style={styles.NavigationView}>
                <View style={styles.NavigationViewInner}>
                  <Image source={IMAGES.Favorite} />
                  <Text
                    style={{
                      fontFamily: 'OpenSans-SemiBold',
                      marginLeft: SPACING.SCALE_26,
                      fontSize: SPACING.SCALE_14,
                      color: '#000000',
                      // backgroundColor: 'red'
                    }}>
                    My Favourite
                  </Text>
                </View>
                <View style={styles.NavigationImageStyle}>
                  <Image resizeMode="contain" source={IMAGES.Arrow} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.LineView} />

          {profileData?.role === 'user' ? null : (
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  // Alert.alert('Pressed');
                  props.navigation.navigate(RoutesName.INTERESTLIST_SCREEN);
                }}>
                <View style={styles.NavigationView}>
                  <View style={[styles.NavigationViewInner]}>
                    <Image source={IMAGES.userPic} />
                    <Text style={styles.NavigationText}>Interest List</Text>
                  </View>
                  <View style={styles.NavigationImageStyle}>
                    <Image resizeMode="contain" source={IMAGES.Arrow} />
                  </View>
                </View>
              </TouchableOpacity>

              <View style={styles.LineView} />

              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  // Alert.alert('Pressed');
                  props.navigation.navigate('Coin History');
                }}>
                <View style={styles.NavigationView}>
                  <View style={styles.NavigationViewInner}>
                    <Image source={IMAGES.Dollar} />
                    <Text style={styles.NavigationText}>Coin History</Text>
                  </View>
                  <View style={styles.NavigationImageStyle}>
                    <Image resizeMode="contain" source={IMAGES.Arrow} />
                  </View>
                </View>
              </TouchableOpacity>

              <View style={styles.LineView} />
            </View>
          )}

          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                NavigationService.navigate(RoutesName.ACCOUNT_SETTING_SCREEN, {
                  userId: profileData.id,
                });
              }}>
              <View style={styles.NavigationView}>
                <View style={styles.NavigationViewInner}>
                  <Image source={IMAGES.settings} />
                  <Text style={styles.NavigationText}>Account Settings </Text>
                </View>
                <View style={styles.NavigationImageStyle}>
                  <Image resizeMode="contain" source={IMAGES.Arrow} />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.LineView} />

          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                NavigationService.navigate(RoutesName.About_Page, {});
              }}>
              <View style={styles.NavigationView}>
                <View style={styles.NavigationViewInner}>
                  <Image source={IMAGES.about} />
                  <Text style={styles.NavigationText}>About us</Text>
                </View>
                <View style={styles.NavigationImageStyle}>
                  <Image resizeMode="contain" source={IMAGES.Arrow} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.LineView} />

          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                NavigationService.navigate(RoutesName.PRODUCT_HISTORY, {
                  userId: profileData?.id,
                });
              }}>
              <View style={styles.NavigationView}>
                <View style={styles.NavigationViewInner}>
                  <CustomIcon
                    origin={ICON_TYPE.MATERIAL_ICONS}
                    name={'history'}
                    color={'black'}
                    size={27}
                  />
                  <Text
                    style={{
                      fontFamily: 'OpenSans-SemiBold',
                      marginLeft: SPACING.SCALE_20,
                      fontSize: SPACING.SCALE_14,
                      color: '#000000',
                      // backgroundColor: 'red',
                      left: SPACING.SCALE__3,
                    }}>
                    Product History
                  </Text>
                </View>
                <View style={styles.NavigationImageStyle}>
                  <Image resizeMode="contain" source={IMAGES.Arrow} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.LineView} />

          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                NavigationService.navigate(RoutesName.PRICE_ALERT_LISTING);
              }}>
              <View style={styles.NavigationView}>
                <View style={styles.NavigationViewInner}>
                  <CustomIcon
                    origin={ICON_TYPE.ICONICONS}
                    name={'list-circle-outline'}
                    color={'black'}
                    size={27}
                  />
                  <Text
                    style={{
                      fontFamily: 'OpenSans-SemiBold',
                      marginLeft: SPACING.SCALE_20,
                      fontSize: SPACING.SCALE_14,
                      color: '#000000',
                      // backgroundColor: 'red',
                      left: SPACING.SCALE__3,
                    }}>
                    Price Alert Listing
                  </Text>
                </View>
                <View style={styles.NavigationImageStyle}>
                  <Image resizeMode="contain" source={IMAGES.Arrow} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.LineView} />
        </View>
        <View>
          <TouchableOpacity onPress={handleLogout}>
            <View style={styles.VerificationViewStyle1}>
              <View style={styles.NavigationImageStyle}>
                <Image source={IMAGES.logout} style />
              </View>
              <Text
                style={{
                  fontFamily: 'OpenSans-SemiBold',
                  marginLeft: SPACING.SCALE_20,
                  fontSize: SPACING.SCALE_14,
                  color: '#000000',
                  // backgroundColor: 'red',
                  left: SPACING.SCALE_3,
                }}>
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* <Button title="logout"  /> */}
        <Spacer height={50} />
      </ScrollView>
    </Container>
  );
};

export default MyProfileScreen;
