import {
  BackHeader,
  Container,
  CustomIcon,
  CustomInput,
  CustomText,
  KeyboardAwareView,
  Spacer,
  SubmitButton,
} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {showAlert} from '@app/helper/commonFunction';
import {LoadingStatus, RoutesName} from '@app/helper/strings';
import NavigationService from '@app/navigations/NavigationService';
import {COLORS, IMAGES} from '@app/resources';
import LoginHeader from '@app/screens/atoms/LoginHeader';
import {changePasswordAction} from '@app/store/authSlice';
import {
  RateUserAction,
  purchaseProductListingAction,
  ratingReviewAction,
  singleUserRatingDetailsAction,
} from '@app/store/ratingReviewSlice';
import {useFormik} from 'formik';
import React, {useEffect, useState} from 'react';
import {Image, Pressable, Text, TextInput, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {AirbnbRating, Rating} from 'react-native-ratings';
import {connect} from 'react-redux';
import * as Yup from 'yup';

const RateUser = props => {
  const {getReview, ratingReviewReducer, postData, getCurrentReview} = props;

  const product_id = props?.route?.params?.product_id;

  const item = props?.route?.params?.userData;
  console.log('UserIdAtRateandReview', props?.route?.params);
  const userid = item?.id;
  useEffect(() => {
    getReview({type: 'user', user_id: item?.id, filter: ''});
    getCurrentReview({product_id: product_id, user_id: item?.id});
  }, []);

  const [description, setDescription] = useState('');
  const data = props?.ratingReviewReducer?.ratingReviewAction?.data;

  const [rating, setRating] = useState(0);
  const RatingValue =
    props?.ratingReviewReducer?.singleUserRatingDetailsAction?.data;
  const descriptionValue = RatingValue?.description?.replace(/\n\s*\n/g, '\n');
  console.log(descriptionValue, '======DescriptionValue');
  const [validation, setValidation] = useState(false);
  const handleRating = rating => {
    // Handle the selected rating here
    setRating(rating);
    setValidation(false);
  };

  return (
    <Container
      useSafeAreaView={true}
      loading={
        ratingReviewReducer.singleUserRatingDetailsActionLoadingStatus ==
        LoadingStatus.LOADING
      }>
      <BackHeader />

      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <LoginHeader title={'Rate and Review'} />
      </View>
      <KeyboardAwareView style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 40,
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              alignItems: 'center',
              marginTop: 1,
            }}>
            <Image
              source={{uri: item?.image}}
              style={{
                width: 90,
                height: 90,
                borderRadius: 45,
              }}
            />
            <Text
              style={{
                fontSize: 24,
                fontFamily: 'OpenSans-Bold',
                color: '#000000',
                marginTop: 12,
              }}>
              {item?.name}
            </Text>
            <Text
              style={{
                fontSize: 16,
                // fontFamily: 'OpenSans-Bold',
                color: '#000000',
                // marginTop: 12,
              }}>
              {'@'} {item?.user_id_tag}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 15,
              }}>
              {/* <Rating
              type="star"
              ratingCount={5}
              startingValue={data?.average}
              imageSize={16}
              readonly
            /> */}
              <AirbnbRating
                count={5}
                showRating={false}
                defaultRating={data?.average}
                isDisabled
                size={15}
                style={{marginHorizontal: 10}}
                ratingContainerStyle={{marginHorizontal: 10}}
                starContainerStyle={{
                  paddingVertical: 10,
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}
              />

              <Text
                style={{
                  fontSize: 13,
                  fontFamily: 'OpenSans-SemiBold',
                  color: '#454545',
                  marginLeft: 5,
                }}>
                {data?.count} reviews
              </Text>
            </View>
          </View>

          <View
            style={{
              // // alignContent: 'center',
              justifyContent: 'center',
              alignContent: 'center',
              marginHorizontal: 50,
            }}>
            <Text
              style={{
                fontFamily: 'OpenSans-SemiBold',
                fontSize: 20,
                color: 'black',
                marginVertical: 20,
                textAlign: 'center',
              }}>
              Your Response
            </Text>
            <View style={{marginBottom: 20}}>
              <AirbnbRating
                count={5}
                reviews={['Terrible', 'Bad', 'OK', 'Good', 'Excellent']}
                defaultRating={RatingValue?.id ? RatingValue?.rating : 0}
                isDisabled={RatingValue?.rating ? true : false}
                size={30}
                onFinishRating={handleRating}
                showRating={false}
              />

              {validation == true ? (
                <View>
                  <Text
                    style={{
                      fontFamily: 'OpenSans-Regular',
                      fontSize: 16,
                      color: 'red',
                      textAlign: 'center',
                      marginTop: 3,
                    }}>
                    Please rate this product
                  </Text>
                </View>
              ) : null}
            </View>

            <View
              style={{
                position: 'relative',
                marginBottom: 20,
              }}>
              <CustomText
                style={{
                  color: '#000000',
                  fontFamily: 'OpenSans-SemiBold',
                  fontSize: 18,
                }}>
                Description
              </CustomText>

              {RatingValue?.id ? (
                <Text>{descriptionValue}</Text>
              ) : (
                <TextInput
                  style={{
                    backgroundColor: '#fff',
                    minWidth: '45%',
                    textAlignVertical: 'top',
                    paddingBottom: 10,
                    paddingHorizontal: 0,
                    borderBottomEndRadius: 1,
                    paddingBottom: 20,
                    height: 150,
                    borderColor: COLORS.APPGREEN,
                    //  borderBottomWidth: RatingValue?.id ? null : 0.5,
                    borderBottomWidth: 0.5,
                  }}
                  fontSize={16}
                  fontFamily={'OpenSans-Regular'}
                  maxLength={500}
                  multiline={true}
                  numberOfLines={5}
                  value={description}
                  //  editable={RatingValue?.description ? false : true}
                  placeholder="Enter description..."
                  onChangeText={val => {
                    setDescription(val);
                  }}
                />
              )}

              {RatingValue?.id ? null : (
                <View
                  style={{
                    position: 'absolute',
                    bottom: 5,
                    right: 5,
                    //   paddingTop:5
                  }}>
                  <CustomText style={{color: '#00958C'}}>
                    {description.length}/500
                  </CustomText>
                </View>
              )}
            </View>

            {/* <SubmitButton loading={authReducer.changePasswordLoadingStatus === LoadingStatus.LOADING} disabled={authReducer.changePasswordLoadingStatus === LoadingStatus.LOADING} lable="Change" onPress={handleSubmit} /> */}
            {RatingValue?.id ? null : (
              <Pressable
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  height: 50,
                  borderRadius: 20,
                  backgroundColor: 'black',
                }}
                onPress={() => {
                  if (rating == 0 || rating == null) {
                    setValidation(true);
                  } else {
                    postData({
                      user_id: userid,
                      rating: rating,
                      description: description,
                      product_id: product_id,
                    }).then(res => {
                      if (res?.type.includes('fulfilled')) {
                        showAlert({
                          title: 'success',
                          message:
                            res?.payload?.message ??
                            ' Rate Posted Successfully!',
                        });
                        NavigationService.navigate(RoutesName.PRODUCT_HISTORY,{tab:'rateuser'});
                      }
                      if (res?.type.includes('rejected')) {
                        // setButtonDisabled(false);
                        showAlert({
                          title: 'Error',
                          message:
                            res?.payload?.message ?? 'Internal server error!',
                        });
                      }
                    });
                  }
                }}>
                <Text
                  style={{
                    fontFamily: 'OpenSans-SemiBold',
                    color: 'white',
                    fontSize: 20,
                  }}>
                  Rate Now
                </Text>
              </Pressable>
            )}
          </View>
          <Spacer />
        </ScrollView>
      </KeyboardAwareView>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    authReducer: state.authReducer,
    ratingReviewReducer: state.ratingReviewReducer,
  };
};
const mapDispatchToProps = dispatch => ({
  postData: params => dispatch(RateUserAction(params)),
  getReview: params => dispatch(ratingReviewAction(params)),
  getCurrentReview: params => dispatch(singleUserRatingDetailsAction(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RateUser);
