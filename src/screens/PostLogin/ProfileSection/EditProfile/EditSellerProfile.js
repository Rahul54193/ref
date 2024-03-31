import {
  BackHeader,
  CustomIcon,
  CustomInput,
  CustomText,
  DatePicker,
  KeyboardAwareView,
  Spacer,
  SubmitButton,
} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';
import moment from 'moment';
import {
  ActivityIndicator,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {HelperText, TextInput} from 'react-native-paper';
import OpeningHour, {OPENING_HOUR} from './common/OpeningHour';
import PaymentMode, {PAYMENT_MODE} from './common/PaymentMode';
import PostAds from './common/PostAds';
import ProfilePicture from './common/ProfilePicture';
import SocialMedia, {SOCIAL_LINKS} from './common/SocialMedia';
import {useFormik} from 'formik';
import {showAlert} from '@app/helper/commonFunction';
import * as Yup from 'yup';
import {FontsConst} from '@app/assets/assets';
import {LoadingStatus} from '@app/helper/strings';
import {useState} from 'react';
import {SPACING} from '@app/resources';

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
  // phone: Yup.string()
  //   .required('Phone number is required.')
  //   .matches(
  //     /^[0-9]{8}$/,
  //     'Phone number cannot exceed more than 8 characters.',
  //   ),
  location: Yup.string()
    .required('Location is required.')
    .max(100, 'Location cannot exceed more than 100 characters.'),
  // website: Yup.string().matches(
  //   /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
  //   'Enter correct url',
  // ),
});

const EditSellerProfile = props => {
  const {navigation, profileSectionReducer, authReducer, onUpdateProfile} =
    props;
  const userDetail = profileSectionReducer?.profileAbout;
  console.log('userDetail', userDetail);
  console.log(authReducer, '+++++___****');
  const [onDeleteImage, setOnDeleteImage] = useState([]);
  // Initial Values for  formik
  const initialValues = {
    email: userDetail?.email ?? '',
    name: userDetail?.name ?? '',
    phone: userDetail?.mobile ?? '',
    about: userDetail?.bio ?? '',
    location: userDetail?.additional_info?.location ?? '',
    openingHours: userDetail?.additional_info?.opening_hours ?? OPENING_HOUR,
    website: userDetail?.additional_info?.website ?? '',
    socialLinks: userDetail?.additional_info?.social_media ?? SOCIAL_LINKS,
    paymentMode: userDetail?.additional_info?.payment_method ?? PAYMENT_MODE,
    announcement: userDetail?.additional_info?.announcement ?? '',
    announcementEnd: userDetail?.additional_info?.announcement_end ?? '',
    postAdsImage: [],
    postAdsImagePath: userDetail?.additional_info?.post_adds ?? [],
    profileImage: '',
    profileImagePath: userDetail?.image ?? '',
    coverImage: '',
    coverImagePath: userDetail?.cover_image ?? '',
    serverError: '',
    userId: userDetail?.user_id_tag ?? '',
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

        const formData = new FormData();
        if (val?.profileImage) {
          formData.append('image', val?.profileImage);
        }
        if (val?.coverImage) {
          formData.append('cover_image', values?.coverImage);
        }
        if (onDeleteImage.length) {
          console.log('==============>fgtygu67t87', onDeleteImage);
          onDeleteImage.forEach((item, index) => {
            formData.append(`remove_files[${index}]`, item);
          });
        }
        if (val?.postAdsImage?.length) {
          val.postAdsImage.forEach((item, index) => {
            formData.append(`post_adds[${index}]`, item);
          });
          //
        }
        if (val.openingHours.length) {
          const newArr = val.openingHours?.map(elem => {
            return Object.assign(
              {},
              {
                ...elem,
                isEnable:
                  elem?.openTime && elem.isEnable == 'true' ? 'true' : 'false',
              },
            );
          });
          newArr.forEach((item, index) => {
            for (let key in item) {
              formData.append(
                `opening_hours[${index}][${key}]`,
                item[key] ? item[key] : '',
              );
            }
          });
        }
        if (val.socialLinks.length) {
          val.socialLinks.forEach((item, index) => {
            if (item.value) {
              for (let key in item) {
                formData.append(`social_media[${index}][${key}]`, item[key]);
              }
            }
          });
        }
        if (val.paymentMode.length) {
          val.paymentMode.forEach((item, index) => {
            for (let key in item) {
              formData.append(
                `payment_method[${index}][${key}]`,
                item[key] ? item[key] : '',
              );
            }
          });
        }
        formData.append('name', val.name);
        formData.append('email', val.email);
        formData.append('mobile', userDetail?.mobile ?? '');
        formData.append('bio', val.about);
        formData.append('location', val.location);
        formData.append('website', val.website);
        formData.append('announcement', val.announcement);
        formData.append('announcement_end', val.announcementEnd);
        formData.append('userIdTag', val?.userId);
        console.log(formData, 'formData');

        onUpdateProfile(formData).then(res => {
          if (res?.type.includes('fulfilled')) {
            showAlert({
              title: 'Success',
              message: 'Updated successfully.',
            });
            navigation?.goBack();
          }
          if (res?.type.includes('rejected')) {
            showAlert({
              title: 'Error',
              message: res?.payload?.message ?? 'Internal server error!',
            });
          }
        });
      } catch (err) {
        console.log('Error====<<', err);
        setErrors({serverError: err.message});
      }
    },
  });
  console.log('===========', values.postAdsImagePath);
  console.log('===========+++', values.postAdsImage);

  return (
    <>
      <BackHeader
        rightComponent={
          <>
            {authReducer?.updateProfileLoadingStatus ===
            LoadingStatus.LOADING ? (
              <ActivityIndicator />
            ) : (
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
            )}
          </>
        }
      />
      <Spacer />
      <KeyboardAwareView>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 40,
          }}>
          <ProfilePicture
            profilePath={values.profileImagePath}
            coverPath={values.coverImagePath}
            setProfileValue={val => {
              setFieldValue('profileImage', val?.image);
              setFieldValue('profileImagePath', val?.path);
            }}
            setCoverValue={val => {
              setFieldValue('coverImage', val?.image);
              setFieldValue('coverImagePath', val?.path);
            }}
          />
          <View>
            <SubmitButton
              lable="Retrieve My Info"
              buttonStyle={styles.retrievInfo}
            />
          </View>
          <Spacer />
          <View
            style={{
              paddingHorizontal: 20,
            }}>
            {/* Form */}
            <CustomInput
              label="Seller’s Name "
              placeholder="Enter full name"
              keyboardType="email-address"
              returnKeyType="next"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values?.name}
              error={errors?.name && touched?.name}
              errorText={errors?.name}
            />
            <CustomInput
              label="User id"
              placeholder="Enter user id"
              keyboardType="email-address"
              returnKeyType="next"
              onChangeText={handleChange('userId')}
              onBlur={handleBlur('userId')}
              value={values?.userId}
              error={errors?.userId && touched?.userId}
              errorText={errors?.userId}
            />
            <CustomInput
              label="Email"
              placeholder="Enter email address"
              keyboardType="email-address"
              returnKeyType="next"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values?.email}
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
                value={values?.phone}
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
              />
              <View style={{position: 'absolute', bottom: 30, right: 5}}>
                <CustomText
                  style={{
                    color: '#00958C',
                  }}>
                  {values.about.length}/1000
                </CustomText>
              </View>
            </View>

            <CustomInput
              label="Location"
              placeholder="Enter shop location"
              keyboardType="email-address"
              returnKeyType="next"
              onChangeText={handleChange('location')}
              onBlur={handleBlur('location')}
              value={values?.location}
              error={errors?.location && touched?.location}
              errorText={errors?.location}
              maxLength={100}
            />
            <OpeningHour
              openingHours={values.openingHours}
              setOpeningHours={val => {
                setFieldValue('openingHours', val);
              }}
            />
            <CustomInput
              label="Website"
              placeholder="Enter website"
              keyboardType="default"
              returnKeyType="next"
              onChangeText={handleChange('website')}
              onBlur={handleBlur('website')}
              value={values?.website}
              error={errors?.website && touched?.website}
              errorText={errors?.website}
            />
            <SocialMedia
              socialLinks={values.socialLinks}
              setSocialLinks={val => {
                setFieldValue('socialLinks', val);
              }}
            />
            <PaymentMode
              paymentMode={values.paymentMode}
              setPaymentMode={val => {
                setFieldValue('paymentMode', val);
              }}
            />
            <PostAds
              postAdsImage={values.postAdsImage}
              postAdsImagePath={values.postAdsImagePath}
              setPostAds={val => {
                setFieldValue('postAdsImage', val?.image);
                setFieldValue('postAdsImagePath', val?.path);
              }}
              setOnDeleteImage={setOnDeleteImage}
              onDeleteImage={onDeleteImage}
            />
            <View>
              <CustomInput
                label="Announcements"
                placeholder="Enter announcements"
                keyboardType="default"
                returnKeyType="next"
                onChangeText={handleChange('announcement')}
                onBlur={handleBlur('announcement')}
                value={values?.announcement}
                multiline={true}
                maxLength={1000}
              />
              <View
                style={{
                  position: 'absolute',
                  bottom: 30,
                  right: 5,
                  marginTop: SPACING.SCALE_5,
                }}>
                <CustomText
                  style={{
                    color: '#00958C',
                  }}>
                  {values.announcement.length}/1000
                </CustomText>
              </View>
            </View>
            <View
              style={{
                paddingBottom: 10,
                width: '100%',
              }}>
              <Text style={{}}>Announcement ends on</Text>
              <DatePicker
                minimumDate={new Date()}
                Value={new Date()}
                children={
                  <View style={styles.datePickerContainer}>
                    <CustomText>
                      {values.announcementEnd
                        ? moment(values.announcementEnd).format('DD MMM YYYY')
                        : 'DD MMM YYYY'}
                    </CustomText>

                    <CustomIcon
                      name={'calendar'}
                      origin={ICON_TYPE.FEATHER_ICONS}
                      style={styles.calenderIcon}
                      size={20}
                    />
                  </View>
                }
                onChangeDate={d => {
                  setFieldValue('announcementEnd', moment(d).format());
                }}
              />
            </View>
            <SubmitButton
              disabled={
                authReducer?.updateProfileLoadingStatus ===
                LoadingStatus.LOADING
              }
              loading={
                authReducer?.updateProfileLoadingStatus ===
                LoadingStatus.LOADING
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

export default EditSellerProfile;

const styles = StyleSheet.create({
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.7,
    marginRight: 20,
    borderBottomColor: 'grey',
    paddingVertical: 10,
    width: '100%',
  },
  notNow: {
    alignSelf: 'center',
    color: '#00958C',
    textDecorationLine: 'underline',
  },
  submit: {
    width: '60%',
    alignSelf: 'center',
  },
  retrievInfo: {
    width: '50%',
    alignSelf: 'center',
    backgroundColor: '#EE0404',
  },
  countryCode: {
    paddingRight: 10,
    fontSize: 15,
    color: '#000000',
  },
  calenderIcon: {
    paddingRight: 10,
    marginBottom: 5,
    color: '#000000',
  },
});
