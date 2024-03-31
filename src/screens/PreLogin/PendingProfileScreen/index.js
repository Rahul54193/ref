/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Container,
  CustomIcon,
  CustomInput,
  CustomText,
  KeyboardAwareView,
  Spacer,
  SubmitButton,
} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {Avatar, HelperText, TextInput} from 'react-native-paper';
import ImageContainer from './ImageContainer';

import {connect} from 'react-redux';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {showAlert} from '@app/helper/commonFunction';
import {checkIdTag, updateProfileAction} from '@app/store/authSlice';
import {COLORS} from '@app/resources';
import {LoadingStatus} from '@app/helper/strings';
import useDebounce from '@app/hooks/useDebounce';

//Validation Schema for formik
const validationSchema = Yup.object({
  email: Yup.string()
    .required('Email is required.')
    .email('Please enter a valid email.'),
  name: Yup.string()
    .required('Name is required.')
    .max(30, 'Name cannot exceed more than 30 characters.'),
  userId: Yup.string()
    .required('User id is required.')
    .max(10, 'User id cannot exceed more than 10 characters.')
    .matches(/^[ A-Za-z0-9_]*$/, 'Please enter valid user id'),
});

const PendingProfileScreen = props => {
  const [userId, setUserId] = useState('');
  const {authReducer, onUpdateProfile, checkIdTag} = props;
  console.log('AuthReducer===', authReducer);

  // Initial Values for  formik
  const initialValues = {
    email: authReducer?.userProfileDetails?.email ?? '',
    name: authReducer?.userProfileDetails?.name ?? '',
    phone: authReducer?.userProfileDetails?.mobile ?? '',
    about: authReducer?.userProfileDetails?.bio ?? '',
    image: '',
    path: authReducer?.userProfileDetails?.image ?? '',
    serverError: '',
    userId: authReducer?.userProfileDetails?.user_id_tag ?? '',
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
    enableReinitialize: true,
    validationSchema: validationSchema,

    onSubmit: async (val, {setErrors}) => {
      try {
        Keyboard.dismiss();

        if (!values.path) {
          showAlert({
            title: 'Please upload profile picture.',
          });
          return;
        } else {
          const formData = new FormData();
          if (values?.image) {
            const d = values.image?.path?.split('/');
            const name = d[d.length - 1];
            formData.append('image', {
              name: name ?? 'Image' + 'index' + '.jpg',
              type: values.image?.mime,
              uri:
                Platform.OS === 'ios'
                  ? values.image?.path.replace('file://', '')
                  : values.image?.path,
            });
          }
          formData.append('name', values.name);
          formData.append('email', values.email);
          formData.append('mobile', values.phone);
          formData.append('bio', values.about);
          formData.append('userIdTag', values.userId);
          console.log('Test====', formData);
          // const params = {
          //   name: values.name,
          //   email: values.email,
          //   mobile: values.phone,
          // };
          onUpdateProfile(formData).then(res => {
            console.log(res, '-----response from update from ---');
            if (res?.type.includes('fulfilled')) {
              // showAlert({
              //   title: 'Success',
              //   message: 'Login succesfully.',
              // });
              resetForm();
            }
            if (res?.type.includes('rejected')) {
              showAlert({
                title: 'Error',
                message: res?.payload?.errors ?? 'Internal server error!',
              });
            }
          });
        }
      } catch (err) {
        console.log('Error', err);
        setErrors({serverError: err.message});
      }
    },
  });
  const query = useDebounce(userId, 1000);
  console.log(query, 'queryfrom');
  useEffect(() => {
    if (query.length > 1) {
      var params = {
        userIdTag: query,
      };
      checkIdTag(params);
    }
  }, [query]);
  return (
    <Container useSafeAreaView={true}>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          //backgroundColor: 'red',
        }}
        behavior={Platform.OS == 'ios' ? 'padding' : null}
        enabled
        //keyboardVerticalOffset={100}
      >
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flexGrow: 1,
            paddingVertical: 50,
            paddingHorizontal: 25,
          }}>
          <ImageContainer handleChange={setFieldValue} value={values.path} />
          <View
            style={{
              paddingTop: 50,
            }}>
            <CustomInput
              label="User id"
              placeholder="Enter user id"
              keyboardType="email-address"
              returnKeyType="next"
              onChangeText={handleChange('userId')}
              onBlur={handleBlur('userId')}
              value={values.userId}
              error={errors?.userId && touched?.userId}
              errorText={errors?.userId}
            />
            {/* {userId.length > 16 && (
              <>
                <Text style={{color: '#b93931'}}>
                  User id should not be more than 15 character.
                </Text>
              </>
            )} */}

            {/* {authReducer?.checkUserIdLoadingStatus === LoadingStatus.LOADING &&
            userId.length < 16 ? (
              <ActivityIndicator />
            ) : (
              userId.length > 0 &&
              userId.length < 16 && (
                <>
                  {authReducer?.checkUserId?.message?.length > 0 && (
                    <Text
                      style={{
                        color: authReducer?.checkUserId?.message?.includes(
                          'already exist',
                        )
                          ? '#b93931'
                          : 'green',
                      }}>
                      {authReducer?.checkUserId?.message}
                    </Text>
                  )}
                </>
              )
            )} */}
            <Spacer height={20} />

            <CustomInput
              label="Name"
              placeholder="Enter name"
              keyboardType="email-address"
              returnKeyType="next"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              error={errors?.name && touched?.name}
              errorText={errors?.name}
            />
            <CustomInput
              label="About (Max 1000 words)"
              placeholder="Enter about"
              keyboardType="email-address"
              returnKeyType="next"
              onChangeText={handleChange('about')}
              onBlur={handleBlur('about')}
              value={values.about}
              error={errors?.about && touched?.about}
              errorText={errors?.about}
              multiline={true}
              maxLength={1000}
            />
            <Spacer height={10} />
            <View style={{flexDirection: 'row'}}>
              <CustomText style={{color: 'black', fontSize: 18}}>
                Personal Information
              </CustomText>
              <Text style={{color: 'red'}}>*</Text>
              <Text
                style={{fontSize: 12, marginVertical: 5, marginHorizontal: 5}}>
                (Will not show publicly)
              </Text>
            </View>

            <Spacer height={20} />

            <CustomInput
              label="Email"
              placeholder="Enter email address"
              keyboardType="email-address"
              returnKeyType="next"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              error={errors?.email && touched?.email}
              errorText={errors?.email}
              editable={false}
              disabled={true}
            />
            <Spacer height={20} />

            <CustomInput
              label="Phone Number"
              placeholder="Enter Phone number"
              keyboardType="numeric"
              returnKeyType="next"
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
              editable={false}
              disabled={true}
            />

            {/* <View
              style={{
                paddingBottom: 10,
                width: '100%',
              }}>
              <Text style={{}}>Phone Number</Text>
              <TextInput
                textColor="#000000"
                placeholder="Enter phone number"
                keyboardType="phone-pad"
                returnKeyType="next"
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
                //maxLength={12}
                error={errors?.phone && touched?.phone}
                errorText={errors?.phone}
                style={{
                  backgroundColor: '#fff',
                  paddingHorizontal: 0,
                }}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <CustomText
                        style={{
                          paddingRight: 10,
                          fontSize: 15,
                          color: '#000000',
                        }}>
                        +65
                      </CustomText>
                    )}
                  />
                }
              />
              <HelperText type="error" visible={errors.phone && touched?.phone}>
                {errors.phone}
              </HelperText>
            </View> */}

            <SubmitButton
              loading={
                authReducer.updateProfileLoadingStatus === LoadingStatus.LOADING
              }
              disabled={
                authReducer.updateProfileLoadingStatus === LoadingStatus.LOADING
              }
              lable="Save Changes"
              onPress={() => {
                handleSubmit();
              }}
            />
          </View>
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
  onUpdateProfile: params => dispatch(updateProfileAction(params)),
  checkIdTag: params => dispatch(checkIdTag(params)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PendingProfileScreen);

const styles = StyleSheet.create({});
