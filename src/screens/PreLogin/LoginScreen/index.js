/* eslint-disable react/react-in-jsx-scope */
import {
  BackHeader,
  Container,
  CustomIcon,
  CustomInput,
  Spacer,
  SubmitButton,
} from '@app/components';
import { ICON_TYPE } from '@app/components/CustomIcon';
import { showAlert } from '@app/helper/commonFunction';
import { RoutesName } from '@app/helper/strings';
import NavigationService from '@app/navigations/NavigationService';
import LinkNavigationRow from '@app/screens/atoms/LinkNavigationRow';
import LoginHeader from '@app/screens/atoms/LoginHeader';
import TermsConditionRow from '@app/screens/atoms/TermsConditionRow';
import { userSigninAction } from '@app/store/authSlice';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import {
  BackHandler,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import SharedPreference from '../../../helper/SharedPreference';
import { Text } from 'react-native';
import { HelperText } from 'react-native-paper';
import { moderateScale } from '@app/helper/responsiveSize';
import { onClearSignInError } from '@app/store/authSlice/auth.slice';

//Validation Schema for formik
const validationSchema = Yup.object({
  email: Yup.string()
    .required('Email is required.')
    .email('Please enter a valid email.'),
  password: Yup.string().required('Password is required.'),
});

const LoginScreen = props => {
  const { authReducer, onUserLogin } = props;

  const [isChecked, setIsChecked] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  // Initial Values for  formik
  const initialValues = {
    email: '',
    password: '',
    serverError: '',
  };

  // destructure formik values from formik hook
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    errors,
    resetForm,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (val, { setErrors }) => {
      try {
        Keyboard.dismiss();
        if (true) {
          setButtonDisabled(true);
          const deviceToken = await SharedPreference.getItem(
            SharedPreference.keys.DEVICE_TOKEN,
          );
          console.log('Login device token==', deviceToken);
          let params = {
            // name: val?.name,
            email: val?.email,
            password: val?.password,
            // login_type: '',
            device_token: deviceToken,
            // device_token: deviceToken ?? 'fghjkl',
            device_type: Platform.OS,
          };
          if (params.device_token != '') {
            onUserLogin(params).then(res => {
              console.log(res, 'res++++');
              if (res?.type.includes('fulfilled')) {
                console.log('LoginResponse====>>', res);
                resetForm();
                setButtonDisabled(false);

                if (res.payload?.data?.isProfileCompleted === 'no') {
                  NavigationService.navigate(RoutesName.PENDING_PROFILE_SCREEN);
                }
              }
              if (res?.type?.includes('rejected')) {
                console.log('ResponseEmail1', res.payload?.data?.email);
                setButtonDisabled(false);
                if (res?.payload?.message?.includes('User not found')) {
                  // showAlert({
                  //   title: 'Error',
                  //   message: res?.payload?.message ?? 'Internal server error!',
                  //   actions: [
                  //     {
                  //       text: 'Sign up first',
                  //       style: 'default',
                  //       onPress: () => {
                  //         NavigationService.navigate(RoutesName.SIGNUP_SCREEN);
                  //         resetForm();
                  //         // Code to run when the "Confirm" button is pressed
                  //       },
                  //     },
                  //     {
                  //       text: 'Cancel',
                  //       style: 'cancel',
                  //       onPress: () => {
                  //         // Code to run when the "Cancel" button is pressed
                  //       },
                  //     },
                  //   ],
                  // });
                } else if (
                  res?.payload?.message ==
                  'Your Mobile is not verified. OTP has been sent to registered mobile!'
                ) {
                  console.log('ResponseEmail', res.payload?.data);
                  dispatch(onClearSignInError());
                  NavigationService.navigate(RoutesName.OTP_VERIFICATION, {
                    email: res.payload?.data?.email,
                    mobile: res.payload?.data?.mobile,
                    from: 'login',
                  });
                } else {
                  // showAlert({
                  //   title: 'km',
                  //   message: res?.payload?.message ?? 'Internal server error!',
                  // });
                }
              }
            });
          }
        } else {
        }
      } catch (err) {
        setErrors({ serverError: err.message });
        setButtonDisabled(false);
      }
    },
  });
  useEffect(() => {
    dispatch(onClearSignInError());
  }, []);

  const st = useSelector(state => state.authReducer.signinError);
  //console.log(st, 'ghjklkj');
  const dispatch = useDispatch();

  useEffect(() => {
    const backAction = () => {
      // Handle the back press as per your requirements
      // For example, you can navigate to another screen or show an alert
      // Return true to prevent default behavior (exit the app)
      // Return false to allow default behavior (go back)

      // Example: Show an alert and return true to prevent default behavior
      NavigationService.navigate(RoutesName.LOGIN_OPTIONS_SCREEN)
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => {
      // Clean up the event listener when the component is unmounted
      backHandler.remove();
    };
  }, []); // Empty dependency array means this effect runs once when the component mounts







  return (
    <Container useSafeAreaView={true}>
      <BackHeader onPress={() => {
        NavigationService.navigate(RoutesName.LOGIN_OPTIONS_SCREEN)
      }} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={Platform.OS === 'ios' && { flex: 1 }}
        keyboardVerticalOffset={30}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 150,
            paddingHorizontal: '20%',
          }}>
          <Container>
            <LoginHeader
              title={'Welcome!'}
              description={'Log in to your account'}
              descriptionStyle={{ color: '#00958C' }}
            />
            <Spacer height={40} />
            {st ? (
              <View
                style={{
                  backgroundColor: '#fdd4d7',
                  borderRadius: moderateScale(8),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <CustomIcon
                  origin={ICON_TYPE.OCTICONS}
                  name={'alert'}
                  size={moderateScale(15)}
                  color={'#a22830'}
                />
                <HelperText
                  style={{ maxWidth: moderateScale(180) }}
                  type="error"
                  visible={st}>
                  {st?.message}
                </HelperText>
              </View>
            ) : null}
            <CustomInput
              placeholder="Enter email address"
              keyboardType="email-address"
              returnKeyType="next"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              error={errors?.email && touched?.email}
              errorText={errors?.email}
              leftIcon={
                <CustomIcon
                  origin={ICON_TYPE.FEATHER_ICONS}
                  name="user"
                  color={'black'}
                  size={20}
                />
              }
            />
            <CustomInput
              placeholder="Enter password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values?.password}
              error={errors?.password && touched?.password}
              errorText={errors?.password}
              secureTextEntry={true}
              leftIcon={
                <CustomIcon
                  origin={ICON_TYPE.FEATHER_ICONS}
                  name="lock"
                  color={'black'}
                  size={20}
                />
              }
            />
            <View style={{ alignSelf: 'flex-end' }}>
              <LinkNavigationRow
                title={''}
                linkTitle={'Forgot password?'}
                onPress={() => {
                  resetForm();
                  NavigationService.navigate(RoutesName.FORGOT_PASSWORD_SCREEN);
                  resetForm();
                  dispatch(onClearSignInError());
                }}
              />
            </View>
            <Spacer height={40} />
            {/* <TermsConditionRow
              isChecked={isChecked}
              setIsChecked={setIsChecked}
              onPress={() => {
                resetForm();
                NavigationService.navigate(
                  RoutesName.TERM_AND_CONDITION_SCREEN,
                );
              }}
            /> */}
            <Spacer height={50} />
            <SubmitButton
              lable="Login"
              onPress={handleSubmit}
              disabled={buttonDisabled}
              loading={buttonDisabled}
            />
            <Spacer height={25} />
          </Container>
          <LinkNavigationRow
            title={'Don’t have an account yet?'}
            linkTitle={'Sign Up'}
            onPress={() => {
              NavigationService.navigate(RoutesName.CREATE_ACCOUNT_SCREEN);
              dispatch(onClearSignInError());
            }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    authReducer: state?.authReducer,
  };
};

const mapDispatchToProps = dispatch => ({
  onUserLogin: params => dispatch(userSigninAction(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({});
