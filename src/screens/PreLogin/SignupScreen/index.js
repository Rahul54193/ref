/* eslint-disable react/react-in-jsx-scope */
import {
  BackHeader,
  Container,
  CustomIcon,
  CustomInput,
  CustomText,
  Spacer,
  SubmitButton,
} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {showAlert} from '@app/helper/commonFunction';
import {RoutesName} from '@app/helper/strings';
import NavigationService from '@app/navigations/NavigationService';
import {SPACING} from '@app/resources';
import LinkNavigationRow from '@app/screens/atoms/LinkNavigationRow';
import LoginHeader from '@app/screens/atoms/LoginHeader';
import TermsConditionRow from '@app/screens/atoms/TermsConditionRow';
import {userSignupAction} from '@app/store/authSlice';
import {useFormik} from 'formik';
import {useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import * as Yup from 'yup';

//Validation Schema for formik
const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required('Required*')
    .max(30, 'Name should exceed 30 character'),
  email: Yup.string()
    .required('Required*')
    .email('Please enter a valid email.'),
  password: Yup.string()
    .trim()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .max(15, ({max}) => `Password must not exceed ${max} characters`)
    .required('Required*')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*_])(?=.{8,})/,
      'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character.',
    ),
  mobile: Yup.string()
    .matches(/^[0-9]{8}$/, 'Mobile number must be exactly 8 digits.')
    .typeError("That doesn't look like a mobile number.")
    .required('Required*'),
  confirmMobile: Yup.string()
    .required('Required*')
    .oneOf([Yup.ref('mobile')], 'Mobile number does not match'),
  confirm_password: Yup.string()
    .required('Required*')
    .oneOf([Yup.ref('password')], 'Password does not match'),
});

const SignupScreen = props => {
  const {authReducer, onUserSignup} = props;
  const [isChecked, setIsChecked] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  console.log('PropsValueAt SIgnup', props?.route?.params);
  const paramsvalue = props?.route?.params;

  // Initial Values for  formik
  const initialValues = {
    name: paramsvalue ? paramsvalue?.name : '',
    email: paramsvalue ? paramsvalue?.email : '',
    password: '',
    mobile: '',
    confirmMobile: '',
    confirm_password: '',
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
    onSubmit: async (val, {setErrors, setSubmitting}) => {
      try {
        console.log('Value====>>>>', val);
        const newValue = {...val, mobile: '+65' + val.mobile};
        console.log('NewVal', newValue);
        Keyboard.dismiss();
        if (isChecked) {
          setButtonDisabled(true);
          let params = {
            name: newValue?.name,
            email: newValue?.email,
            password: newValue?.password,
            mobile: newValue?.mobile,
          };
          onUserSignup(params).then(res => {
            if (res?.type.includes('fulfilled')) {
              resetForm();
              setButtonDisabled(false);

              // showAlert({
              //   title: 'Success',
              //   message: res?.payload?.message ?? 'Success!',
              // });
              props.navigation.navigate(RoutesName.OTP_VERIFICATION, {
                email: newValue?.email,
                mobile: newValue?.mobile,
                from: 'signup',
              });
            }
            if (res?.type.includes('rejected')) {
              setButtonDisabled(false);
              showAlert({
                title: 'Error',
                message: res?.payload?.message ?? 'Internal server error!',
              });
            }
          });
        } else {
          showAlert({
            title: 'Please accept terms & conditions',
          });
        }
      } catch (err) {
        setErrors({serverError: err.message});
        setButtonDisabled(false);
      }
    },
  });
  console.log('BUtton', {buttonDisabled});
  return (
    <Container useSafeAreaView={true}>
      <BackHeader />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={Platform.OS === 'ios' && {flex: 1}}
        keyboardVerticalOffset={30}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: '20%',
            paddingBottom: 40,
          }}>
          <Container>
            <LoginHeader
              title={'Welcome!'}
              description={'Sign up with your email address'}
              descriptionStyle={{color: '#00958C'}}
            />
            <Spacer height={40} />
            <CustomInput
              placeholder="Enter name"
              returnKeyType="next"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              error={errors?.name && touched?.name}
              errorText={errors?.name}
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
              style={{}}
              placeholder="Enter mobile number"
              keyboardType="numeric"
              returnKeyType="next"
              onChangeText={handleChange('mobile')}
              onBlur={handleBlur('mobile')}
              value={values.mobile}
              error={errors?.mobile && touched?.mobile}
              errorText={errors?.mobile}
              leftIcon={
                <CustomText
                  style={{
                    // paddingRight: 10,
                    // marginLeft: 10,
                    fontSize: 15,
                    color: '#000000',
                    marginRight: 7,

                    // marginRight: SPACING.SCALE__15
                  }}>
                  +65
                </CustomText>
              }
            />
            <CustomInput
              style={{}}
              placeholder="Confirm mobile number"
              keyboardType="numeric"
              returnKeyType="next"
              onChangeText={handleChange('confirmMobile')}
              onBlur={handleBlur('confirmMobile')}
              value={values.confirmMobile}
              error={errors?.confirmMobile && touched?.confirmMobile}
              errorText={errors?.confirmMobile}
              leftIcon={
                <CustomText
                  style={{
                    // paddingRight: 10,
                    // marginLeft: 10,
                    fontSize: 15,
                    color: '#000000',
                    marginRight: 7,

                    // marginRight: SPACING.SCALE__15
                  }}>
                  +65
                </CustomText>
              }
            />

            {/* <View
              style={{
                paddingBottom: 10,

              }}>

              <TextInput
                textColor="#000000"
                placeholder="Enter mobile number"
                keyboardType="numeric"
                returnKeyType="next"
                style={{
                  fontSize: SPACING.SCALE_15, backgroundColor: 'white',
                  marginLeft: -15

                }}



                onChangeText={handleChange('mobile')}
                onBlur={handleBlur('mobile')}
                value={values.mobile}
                error={errors?.mobile && touched?.mobile}
                errorText={errors?.mobile}

                left={
                  <TextInput.Icon
                    style={{ marginLeft: 20 }}
                    icon={() => (
                      <CustomText
                        style={{
                          paddingRight: 10,
                          fontSize: SPACING.SCALE_15,
                          color: '#000000',

                          marginRight: -15

                        }}>
                        +65
                      </CustomText>
                    )}
                  />
                }
              />
              {errors.mobile && touched?.mobile ? <HelperText type="mobile" visible={errors.mobile && touched?.mobile} style={{ color: 'red' }}>
                {errors.mobile}
              </HelperText> : null}
            </View> */}
            <CustomInput
              placeholder="Set password"
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
            <CustomInput
              placeholder="Confirm password"
              onChangeText={handleChange('confirm_password')}
              onBlur={handleBlur('confirm_password')}
              value={values?.confirm_password}
              error={errors?.confirm_password && touched?.confirm_password}
              errorText={errors?.confirm_password}
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
            <TermsConditionRow
              isChecked={isChecked}
              setIsChecked={setIsChecked}
            />
            <SubmitButton
              disabled={buttonDisabled}
              loading={buttonDisabled}
              lable="Confirm"
              onPress={handleSubmit}
            />
            <Spacer height={25} />
          </Container>

          <Spacer height={25} />
          <LinkNavigationRow
            title={'Already have an account?'}
            linkTitle={'Sign In now'}
            onPress={() => {
              resetForm();
              NavigationService.navigate(RoutesName.LOGIN_OPTIONS_SCREEN);
            }}
          />
          <Spacer height={30} />
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
  onUserSignup: params => dispatch(userSignupAction(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);

const styles = StyleSheet.create({});
