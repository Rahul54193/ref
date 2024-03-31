/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {
  BackHeader,
  Container,
  CustomText,
  Spacer,
  SubmitButton,
} from '@app/components';
import SocialLoginButton from '@app/components/SocialLogin';
import { SharedPreference } from '@app/helper';
import { showAlert } from '@app/helper/commonFunction';
import { Config } from '@app/helper/config';
import { LoadingStatus, RoutesName } from '@app/helper/strings';
import NavigationService from '@app/navigations/NavigationService';
import { IMAGES, SPACING } from '@app/resources';
import LinkNavigationRow from '@app/screens/atoms/LinkNavigationRow';
import LoginHeader from '@app/screens/atoms/LoginHeader';
import Seprator from '@app/screens/atoms/Seprator';
import { userSigninAction, userSignupAction } from '@app/store/authSlice';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Platform, Pressable, View } from 'react-native';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk-next';
import { connect } from 'react-redux';

const CreateAccountScreen = props => {
  const { authReducer, onUserSignup, onUserLogin } = props;
  const [buttonDisabled, setButtonDisabled] = useState(false);

  //  Configure google client id
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: Config.GOOGLE_CLIENT_ID,
    });
  }, []);

  //! Function for apple login
  const _onAppleSignup = async () => {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // Note: it appears putting FULL_NAME first is important, see issue #293
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });
    console.log('authres---->>>', appleAuthRequestResponse);
    const { email, email_verified, is_private_email, sub } = jwt_decode(
      appleAuthRequestResponse.identityToken,
    );

    if (email && appleAuthRequestResponse.user) {
      const deviceToken = await SharedPreference.getItem(
        SharedPreference.keys.DEVICE_TOKEN,
        '',
      );
      console.log(' Apple Login device token==', deviceToken);
      const params = {
        email: appleAuthRequestResponse?.email,
        name: appleAuthRequestResponse?.givenName,
        login_type: 'apple',
        device_token: deviceToken ?? 'fcmToken',
        device_type: Platform.OS,
        //name:durgesh
        //social_id:sdasdasd
      };
      NavigationService.navigate(RoutesName.SIGNUP_SCREEN, params)
      // onUserLogin(params).then(res => {
      //   if (res?.type.includes('fulfilled')) {
      //     if (res.payload?.data?.isProfileCompleted === 'no') {
      //       NavigationService.navigate(RoutesName.PENDING_PROFILE_SCREEN);
      //     }
      //   }
      //   if (res?.type.includes('rejected')) {
      //     showAlert({
      //       title: 'Error',
      //       message: res?.payload?.message ?? 'Internal server error!',
      //     });
      //   }
      // });
    }

    // get current authentication state for user
    // // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    // const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

    // // use credentialState response to ensure the user is authenticated
    // if (credentialState === appleAuth.State.AUTHORIZED) {
    //   // user is authenticated
    // }
  };

  //! Function for facebook login
  const _onFacebookSignUp = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      async function (result) {
        // console.log("ResultFacebookAccounnt", result);
        if (result.isCancelled) {

          console.log('SignUp Cancelled', result);
        } else {
          let token = await AccessToken.getCurrentAccessToken();
          if (token) {
            const PROFILE_REQUEST_PARAMS = {
              fields: {
                string: 'id, name,  email',
              },
            };
            const profileRequest = new GraphRequest(
              '/me',
              { token, parameters: PROFILE_REQUEST_PARAMS },
              async (error, result) => {
                if (error) {
                  console.log('login info has error: ' + error);
                } else {
                  const deviceToken = await SharedPreference.getItem(
                    SharedPreference.keys.DEVICE_TOKEN,
                    '',
                  );
                  console.log(' Apple Login device token==', deviceToken);
                  let params = {
                    email: result?.email,
                    device_type: Platform.OS,
                    device_token: deviceToken ?? 'fcmToken',
                    login_type: 'facebook',
                    name: result?.name,
                    facebook_id: result?.id,
                  };
                  onUserLogin(params).then(res => {
                    if (res?.type.includes('fulfilled')) {
                      if (res.payload?.data?.isProfileCompleted === 'no') {
                        NavigationService.navigate(
                          RoutesName.PENDING_PROFILE_SCREEN,
                        );
                      }
                    }
                    if (res?.type.includes('rejected')) {
                      showAlert({
                        title: 'Error',
                        message:
                          res?.payload?.message ?? 'Internal server error!',
                      });
                    }
                  });
                }
              },
            );
            new GraphRequestManager().addRequest(profileRequest).start();
          }
          console.log('You have Registered In Successfully');
        }
      },
      function (error) {
        alert('Login failed with error: ' + error);
      },
    );
  };

  //! Function for google login
  const _onGoogleSignup = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      console.log('Google Auth Value', userInfo?.user);
      if (userInfo) {
        const deviceToken = await SharedPreference.getItem(
          SharedPreference.keys.DEVICE_TOKEN,
          '',
        );
        console.log(' Apple Login device token==', deviceToken);
        let params = {
          email: userInfo?.user?.email,
          device_type: Platform.OS,
          device_token: deviceToken ?? 'fcmToken',
          login_type: 'google',
          name: userInfo?.user?.name,
          google_id: userInfo?.user?.id,
        };
        NavigationService.navigate(RoutesName.SIGNUP_SCREEN, params);
      }
    } catch (error) {
      //  console.log('error', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      } else {
      }
    }
  };
  return (
    <Container
      useSafeAreaView={true}
      loading={authReducer?.signinLoadingStatus === LoadingStatus.LOADING}>
      <BackHeader />
      <View
        style={{
          paddingHorizontal: '15%',
          alignSelf: 'center',
          justifyContent: 'center',
          flex: 1,
          marginTop: SPACING.SCALE__30,
          // backgroundColor: 'red',
        }}>
        <View
          style={{
            flex: 1,
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <LoginHeader
            title={'Hello there!'}
            description={'Create your account'}
            descriptionStyle={{ color: '#00958C' }}
          />
          <Spacer height={30} />
          <View>
            <SubmitButton
              lable="Sign up via Email"
              onPress={() => {
                NavigationService.navigate(RoutesName.SIGNUP_SCREEN);
              }}
            />
            {/* <SubmitButton
              lable="Sign up via Singpass"
              onPress={() => {
                // NavigationService.navigate(RoutesName.LOGIN_SCREEN);
              }}
            /> */}
          </View>
          <Seprator />
          <View>
            {Platform.OS === 'ios' && (
              // <SubmitButton
              //   type="outlined"
              //   lable="Sign up with Apple ID"
              //   onPress={_onAppleSignup}
              // />

              <SocialLoginButton
                iconImage={IMAGES.applelogo}
                socialName="Continue with Apple"
                onPress={_onAppleSignup}
              />
            )}

            {/* <SubmitButton
              type="outlined"
              lable="Sign up with Google"
              onPress={_onGoogleSignup}
            /> */}
            <SocialLoginButton
              iconImage={IMAGES.google}
              socialName="Continue with Google"
              onPress={_onGoogleSignup}
            />

            {/* <SubmitButton
              type="outlined"
              lable="Sign up with Facebook"
              onPress={_onFacebookSignUp}
            /> */}

            <SocialLoginButton
              iconImage={IMAGES.facebook2}
              socialName="Continue with Facebook"
              onPress={_onFacebookSignUp}
            />
          </View>
        </View>
        <LinkNavigationRow
          title={'Already have an account?'}
          linkTitle={'Sign In now'}
          onPress={() =>
            NavigationService.navigate(RoutesName.LOGIN_OPTIONS_SCREEN)
          }
        />
        <Spacer height={30} />
      </View>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    authReducer: state?.authReducer,
  };
};

const mapDispatchToProps = dispatch => ({
  onUserSignup: params => dispatch(userSignupAction(params)),
  onUserLogin: params => dispatch(userSigninAction(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateAccountScreen);
