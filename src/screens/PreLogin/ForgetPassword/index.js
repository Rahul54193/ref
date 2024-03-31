import {
  BackHeader,
  Container,
  CustomIcon,
  CustomInput,
  Spacer,
  SubmitButton,
} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {showAlert} from '@app/helper/commonFunction';
import {RoutesName} from '@app/helper/strings';
import NavigationService from '@app/navigations/NavigationService';
import LinkNavigationRow from '@app/screens/atoms/LinkNavigationRow';
import LoginHeader from '@app/screens/atoms/LoginHeader';
import {forgotPasswordAction} from '@app/store/authSlice';
import {useFormik} from 'formik';
import {useState} from 'react';
import {Keyboard, ScrollView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import * as Yup from 'yup';

//Validation Schema for formik
const validationSchema = Yup.object({
  email: Yup.string()
    .required('Email is required.')
    .email('Please enter a valid email.'),
});

const ForgetPassword = props => {
  const {authReducer, onForgotPassword} = props;
  const [buttonDisabled, setButtonDisabled] = useState(false);

  // Initial Values for  formik
  const initialValues = {
    email: '',
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
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (val, {setErrors}) => {
      Keyboard.dismiss();
      try {
        setButtonDisabled(true);
        let params = {
          email: val?.email,
        };
        onForgotPassword(params).then(res => {
          if (res?.type.includes('fulfilled')) {
            resetForm();
            setButtonDisabled(false);
            showAlert({
              title: 'Success',
              message: res?.payload?.message ?? 'Success!',
              actions: [
                {
                  text: 'ok',
                  style: 'default',
                  onPress: () => {
                    props.navigation.navigate(RoutesName.LOGIN_SCREEN);
                    // Code to run when the "Confirm" button is pressed
                  },
                },
              ],
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
      } catch (err) {
        setErrors({serverError: err.message});
        setButtonDisabled(false);
      }
    },
  });

  return (
    <Container useSafeAreaView={true}>
      <BackHeader />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 40,
          paddingHorizontal: 40,
        }}>
        <Container>
          <LoginHeader
            title={'Forgot Password'}
            description={'Enter email address for the link'}
            descriptionStyle={{color: '#00958C'}}
          />
          <Spacer height={40} />
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
          <Spacer height={50} />
          <SubmitButton
            lable="Send Link"
            onPress={handleSubmit}
            loading={buttonDisabled}
            disabled={buttonDisabled}
          />
          <Spacer height={10} />
          <LinkNavigationRow
            title={''}
            linkTitle={'Resend Link'}
            onPress={
              () => {}
              // NavigationService.navigate(RoutesName.CREATE_ACCOUNT_SCREEN)
            }
          />
        </Container>
      </ScrollView>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    authReducer: state?.authReducer,
  };
};

const mapDispatchToProps = dispatch => ({
  onForgotPassword: params => dispatch(forgotPasswordAction(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);

const styles = StyleSheet.create({});
