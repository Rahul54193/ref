import {View, Text, KeyboardAvoidingView, Alert} from 'react-native';
import React, {useState} from 'react';
import {
  BackHeader,
  Container,
  CustomInput,
  CustomText,
  Spacer,
  SubmitButton,
} from '@app/components';
import {SPACING} from '@app/resources';
import fonts from '@app/resources/fonts';
import PageTitle from '@app/screens/atoms/PageTitle';
import {StyleSheet} from 'react-native';
import {FontsConst} from '@app/assets/assets';
import CustomIcon, {ICON_TYPE} from '@app/components/CustomIcon';
import {ScrollView} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {HelperText, TextInput} from 'react-native-paper';
import {RoutesName} from '@app/helper/strings';
import {connect, useSelector} from 'react-redux';
import {ResendOtpAction, UpdateMobileNumberAction} from '@app/store/authSlice';
import {showAlert} from '@app/helper/commonFunction';

const ChangeMobileNumber = props => {
  const [name, setName] = useState('');
  // console.log("Props====", props)

  const initialValues = {
    Number: '',
  };
  const {authReducer, UpdateMobileNumber, resendOtp} = props;

  const validationSchema = Yup.object({
    Number: Yup.string()
      .matches(/^[0-9]{8}$/, 'Mobile number must be exactly 8 digits.')
      .typeError("That doesn't look like a mobile number.")
      .required('Required*'),
  });
  const profileData = useSelector(
    state => state.authReducer?.userProfileDetails,
  );
  console.log('User Mobile NUmber', profileData?.mobile);

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
    onSubmit: async (val, {setErrors}) => {
      console.log('Console value', '+65' + val.Number);
      const NewNumber = '+65' + val.Number;
      const newEmail = profileData?.email;
      const ParamsData = {email: newEmail, mobile: NewNumber};

      console.log('User Mobile NUmber', profileData?.mobile);
      if ('+65' + val.Number == profileData?.mobile) {
        showAlert({
          title: 'Message',
          message: 'This number is already linked with an existing account.',
        });
      } else {
        resendOtp(ParamsData).then(res => {
          if (res?.type.includes('fulfilled')) {
            props.navigation.navigate(RoutesName.OTP_VERIFICATIONN, {
              email: newEmail,
              mobile: NewNumber,
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
      }
    },
  });

  return (
    <Container useSafeAreaView={true}>
      <BackHeader />
      {/* Header Compoenent */}
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 20,
          // backgroundColor: 'red',
          marginHorizontal: 10,
        }}>
        <Text
          style={{
            fontFamily: 'OpenSans-SemiBold',
            fontSize: SPACING.SCALE_20,
            color: 'black',
          }}>
          Change Mobile Number
        </Text>
        <Spacer />
      </View>

      {/* Body of the page  */}

      {/* <View style={{ flex: 1, }}>

                <Text>Name</Text>
                <View style={{ alignItems: 'center' }}>
                    <TextInput
                        value={name}
                        style={{ borderBottomColor: 'black', maxWidth: SPACING.SCALE_200 }}
                        onChangeText={(value) => {
                            setName(value)

                        }} />
                </View>

            </View> */}

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
            paddingBottom: 150,
            paddingHorizontal: '20%',
          }}>
          <Container>
            <Spacer height={40} />
            {/* <CustomInput
                            

                            leftIcon={
                                <TextInput.Icon
                                    icon={() => (
                                        <Text
                                            style={{
                                                paddingRight: 10,
                                                fontSize: 15,
                                                color: '#000000',
                                            }}>
                                            +65
                                        </Text>
                                    )}
                                />
                            }
                        /> */}
            {/* <TextInput
                            placeholder="Type..."

                            keyboardType="numeric"
                            returnKeyType="next"
                            style={{ fontSize: SPACING.SCALE_25, }}



                            onChangeText={handleChange('Number')}
                            onBlur={handleBlur('Number')}
                            value={values.Number}
                            error={errors?.Number && touched?.Number}
                            errorText={errors?.Number}


                        /> */}

            <View
              style={{
                paddingBottom: 10,
              }}>
              <Text style={{fontSize: SPACING.SCALE_16}}>Mobile Number</Text>
              <TextInput
                textColor="#000000"
                placeholder="Enter mobile number"
                keyboardType="numeric"
                returnKeyType="next"
                style={{
                  fontSize: SPACING.SCALE_15,
                  backgroundColor: 'white',

                  //width: '80%',
                }}
                onChangeText={handleChange('Number')}
                onBlur={handleBlur('Number')}
                value={values?.Number}
                error={errors?.Number && touched?.Number}
                errorText={errors?.Number}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <CustomText
                        style={{
                          paddingRight: 2,
                          fontSize: SPACING.SCALE_15,
                          color: '#000000',
                        }}>
                        +65
                      </CustomText>
                    )}
                  />
                }
              />
              <HelperText
                type="Number"
                visible={errors.Number && touched?.Number}
                style={{color: 'red', paddingLeft: 0}}>
                {errors.Number}
              </HelperText>
            </View>

            <Spacer height={50} />
            <SubmitButton lable="Verify" onPress={handleSubmit} />
            <Spacer height={25} />
          </Container>
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
  UpdateMobileNumber: params => dispatch(UpdateMobileNumberAction(params)),
  resendOtp: params => dispatch(ResendOtpAction(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeMobileNumber);

const styles = StyleSheet.create({
  description: {
    fontFamily: FontsConst.OpenSans_Regular,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 16,
  },
});
