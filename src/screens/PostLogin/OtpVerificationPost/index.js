import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {BackHeader, Container, Spacer, SubmitButton} from '@app/components';
import OTPTextView from 'react-native-otp-textinput';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '@app/helper/responsiveSize';
import {COLORS, SPACING} from '@app/resources';
import {connect} from 'react-redux';
import {
  ResendOtpAction,
  UpdateMobileNumberAction,
  ValidateOtpAction,
} from '@app/store/authSlice';
import {showAlert} from '@app/helper/commonFunction';
import NavigationService from '@app/navigations/NavigationService';
import {RoutesName} from '@app/helper/strings';
import {TouchableWithoutFeedback} from 'react-native';

const OtpVerificationPost = props => {
  const [timer, setTimer] = useState(59);
  const {resendOtp, authReducer, validateOtp, UpdateMobileNumber} = props;
  const input = useRef(null);
  const [otpInput, setOtpInput] = useState('');
  const handleCellTextChange = async (text, i) => {
    console.log(text, 'dfghjhgfghjhgh====');
  };
  const ParamsData = {
    email: props?.route?.params?.email,
    mobile: props?.route?.params?.mobile,
  };
  const DataSend = {...ParamsData, otp: otpInput};
  console.log('Datasend========', DataSend);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (timer > 0) setTimer(timer - 1);
    }, 1000);
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [timer]);
  const onResendCode = () => {
    try {
      resendOtp(ParamsData).then(res => {
        console.log('At Opt Screen', res?.payload);

        if (res?.type.includes('fulfilled')) {
          showAlert({
            title: 'Success',
            message: res?.payload?.message ?? 'Success!',
          });
          setOtpInput('');
          setTimer(59);
        }
        if (res?.type.includes('rejected')) {
          setButtonDisabled(false);
          showAlert({
            title: 'Error',
            message: res?.payload?.message ?? 'Internal server error!',
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const SendData = () => {
    try {
      validateOtp(DataSend).then(res => {
        console.log('Send Data', res);

        if (res?.type?.includes('fulfilled')) {
          console.log('OTP Validated');
          UpdateMobileNumber({mobile: props?.route?.params?.mobile}).then(
            res => {
              if (res?.type.includes('fulfilled')) {
                console.log('Number Updated');

                showAlert({
                  title: 'Success',
                  message: res?.payload?.message ?? 'Success!',
                  actions: [
                    {
                      text: 'ok',
                      style: 'default',
                      onPress: () => {
                        NavigationService.navigate(
                          RoutesName.ACCOUNT_SETTING_SCREEN,
                        );
                        // Code to run when the "Confirm" button is pressed
                      },
                    },
                  ],
                });
              }
              if (res?.type.includes('rejected')) {
                showAlert({
                  title: 'Error',
                  message: res?.payload?.message ?? 'Internal server error!',
                });
              }
            },
          );
        }
        if (res?.type.includes('rejected')) {
          showAlert({
            title: 'Error',
            message: res?.payload?.message ?? 'Internal server error!',
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
    console.log('NewSend====', DataSend);
  };
  console.log(otpInput, 'ghjkljh');

  const firstThreeDigits = props?.route?.params?.mobile.substring(0, 3);
  const lastTwoDigits = props?.route?.params?.mobile.substring(9);
  const maskedMiddleDigits = '******';
  const maskedPhoneNumber = `${firstThreeDigits}${maskedMiddleDigits}${lastTwoDigits}`;

  console.log('ShowNumber', maskedPhoneNumber);
  return (
    <Container useSafeAreaView={true}>
      <BackHeader />
      <KeyboardAvoidingView
        style={{flex: 1, margin: moderateScale(SPACING.SCALE_16)}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{flex: 1}}>
            <View style={{flex: 0.8}}>
              <Text style={styles.headerStyle}>
                {`Enter the 4-digit code sent to you at ${maskedPhoneNumber} `}
              </Text>
              <Spacer height={moderateScale(30)} />
              <OTPTextView
                handleTextChange={setOtpInput}
                textInputStyle={styles.textInputContainer}
                handleCellTextChange={handleCellTextChange}
                keyboardType="numeric"
                autoFocus={true}
                inputCellLength={1}
                inputCount={4}
                tintColor={COLORS.APPGREEN}
              />
            </View>
            <View
              style={{
                flex: 0.2,
                justifyContent: 'flex-end',
                marginBottom: moderateScaleVertical(10),
              }}>
              <View style={{}}>
                {timer > 0 ? (
                  <Text style={styles.descStyle}>
                    <Text style={{color: 'black'}}>Resend OTP in</Text> {timer}
                  </Text>
                ) : (
                  <Pressable onPress={onResendCode}>
                    <Text style={styles.descStyle}>Resend</Text>
                  </Pressable>
                )}
              </View>

              {otpInput.length == 4 ? (
                <SubmitButton lable="Verify" onPress={SendData} />
              ) : (
                <SubmitButton lable="Verify" onPress={SendData} disabled />
              )}
              <Spacer height={20} />
            </View>
          </View>
        </TouchableWithoutFeedback>
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
  resendOtp: params => dispatch(ResendOtpAction(params)),
  validateOtp: params => dispatch(ValidateOtpAction(params)),
  UpdateMobileNumber: params => dispatch(UpdateMobileNumberAction(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OtpVerificationPost);

const styles = StyleSheet.create({
  headerStyle: {
    fontSize: textScale(24),
    fontWeight: '500',
    //fontFamily:'',
  },
  descStyle: {
    fontSize: textScale(16),
    //  fontFamily: fontFamily.regular,
    color: 'blue',
    marginTop: moderateScaleVertical(8),
    // marginBottom: moderateScaleVertical(52),
  },
  textInputContainer: {
    //  backgroundColor: 'grey',
    borderWidth: 2,
    borderBottomWidth: 2,
  },
  resendCodeStyle: {
    fontSize: textScale(14),
    //fontFamily: fontFamily.regular,
    marginTop: moderateScaleVertical(8),
    marginBottom: moderateScaleVertical(16),
  },
});
