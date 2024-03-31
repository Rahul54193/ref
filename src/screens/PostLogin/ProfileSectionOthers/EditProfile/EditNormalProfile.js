import {
  Keyboard,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import ProfilePicture from './common/ProfilePicture';
import ImageContainer from '@app/screens/PreLogin/PendingProfileScreen/ImageContainer';
import { useFormik } from 'formik';
import { showAlert } from '@app/helper/commonFunction';
import * as Yup from 'yup';
import {
  BackHeader,
  CustomInput,
  CustomText,
  KeyboardAwareView,
  Spacer,
  SubmitButton,
} from '@app/components';
import { HelperText, TextInput } from 'react-native-paper';
import { FontsConst } from '@app/assets/assets';
import { LoadingStatus } from '@app/helper/strings';

//Validation Schema for formik
const validationSchema = Yup.object({
  email: Yup.string()
    .required('Email is required.')
    .email('Please enter a valid email.'),
  name: Yup.string()
    .required('Name is required.')
    .max(30, 'Name cannot exceed more than 30 characters.'),
  // phone: Yup.string()
  //   .required('Phone number is required.')
  //   .matches(/^[0-9]{8,14}$/, 'Enter valid phone number.'),
});

const EditNormalProfile = props => {
  const { navigation, profileSectionReducer, authReducer, onUpdateProfile } =
    props;
  const userDetail = profileSectionReducer?.profileAbout;
  // Initial Values for  formik
  const initialValues = {
    email: userDetail?.email ?? '',
    name: userDetail?.name ?? '',
    // phone: userDetail?.mobile ?? '',
    about: userDetail?.bio ?? '',
    image: '',
    path: userDetail?.image ?? '',
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
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (val, { setErrors }) => {
      try {
        Keyboard.dismiss();

        if (!values.path) {
          showAlert({
            title: 'Please upload profile picture.',
          });
          return;
        } else {
          const formData = new FormData();
          if (values.image) {
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
          // formData.append('mobile', values.phone);
          formData.append('bio', values.about);
          console.log('Test====', formData, val);

          onUpdateProfile(formData).then(res => {
            if (res?.type.includes('fulfilled')) {
              showAlert({
                title: 'Success',
                message: 'Updated succesfully.',
              });
              // resetForm();
              navigation?.goBack();
            }
            if (res?.type.includes('rejected')) {
              showAlert({
                title: 'Error',
                message: res?.payload?.message ?? 'Internal server error!',
              });
            }
          });
        }
      } catch (err) {
        console.log('Error', err);
        setErrors({ serverError: err.message });
      }
    },
  });

  return (
    <>
      <BackHeader
        rightComponent={
          <Pressable style={styles.button} onPress={handleSubmit}>
            <CustomText
              style={{
                color: '#00958C',
                fontFamily: FontsConst.Cabin_Bold,
                fontSize: 16,
              }}>
              Done
            </CustomText>
          </Pressable>
        }
      />
      <Spacer />
      <KeyboardAwareView>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 40,
          }}>
          <ImageContainer handleChange={setFieldValue} value={values.path} />
          <View
            style={{
              paddingHorizontal: 20,
            }}>
            {/* Form */}
            <CustomInput
              label="Name "
              placeholder="Enter full name"
              keyboardType="email-address"
              returnKeyType="next"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              error={errors?.name && touched?.name}
              errorText={errors?.name}
            />
            <CustomInput
              label="Email"
              placeholder="Enter email address"
              keyboardType="email-address"
              returnKeyType="next"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
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
                      <CustomText style={styles.countryCode}>+65</CustomText>
                    )}
                  />
                }
              />
              <HelperText type="error" visible={errors.phone && touched?.phone}>
                {errors.phone}
              </HelperText>
            </View> */}
            <Spacer height={10} />
            <View style={{}}>
              <CustomInput
                label="About (Max 1000 words)"
                placeholder="Enter about"
                keyboardType="email-address"
                onChangeText={handleChange('about')}
                onBlur={handleBlur('about')}
                value={values.about}
                multiline={true}
                maxLength={1000}
                style={{
                  paddingBottom: 10,
                }}
              />
              <View style={{ position: 'absolute', bottom: 30, right: 5 }}>
                <CustomText
                  style={{
                    color: '#00958C',
                  }}>
                  {values.about.length}/1000
                </CustomText>
              </View>
            </View>

            <SubmitButton
              disabled={
                authReducer.updateProfileLoadingStatus === LoadingStatus.LOADING
              }
              loading={
                authReducer.updateProfileLoadingStatus === LoadingStatus.LOADING
              }
              buttonStyle={styles.submit}
              lable="Save Changes"
              onPress={handleSubmit}
            />
            <Spacer height={30} />
            <Pressable
              onPress={() => {
                navigation?.goBack();
              }}>
              <CustomText style={styles.notNow}>
                Not now, I’ll do it later{' '}
              </CustomText>
            </Pressable>
          </View>
          <Spacer height={50} />
        </ScrollView>
      </KeyboardAwareView>
    </>
  );
};

export default EditNormalProfile;

const styles = StyleSheet.create({
  notNow: {
    alignSelf: 'center',
    color: '#00958C',
    textDecorationLine: 'underline',
  },
  submit: {
    width: '60%',
    alignSelf: 'center',
  },

  countryCode: {
    paddingRight: 10,
    fontSize: 15,
    color: '#000000',
  },
});
