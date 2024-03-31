import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {BackHeader, Container, CustomText, Spacer} from '@app/components';
import EditSellerProfile from './EditSellerProfile';
import EditNormalProfile from './EditNormalProfile';
import {FontsConst} from '@app/assets/assets';
import {connect} from 'react-redux';
import {updateProfileAction} from '@app/store/authSlice';

const EditProfile = props => {
  const {
    authReducer,
    route,
    navigation,
    profileSectionReducer,
    getProfileAbout,
    getProfileListing,
  } = props;
  const {userId, isSeller} = route.params;

  useEffect(() => {
    // getProfileAbout({userId: userId});
    // getProfileListing({userId: userId});
  }, []);
  const onSubmit = () => {};
  return (
    <Container loading={false} useSafeAreaView={true}>
      {isSeller ? (
        <EditSellerProfile {...props} />
      ) : (
        <EditNormalProfile {...props} />
      )}
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    authReducer: state?.authReducer,
    profileSectionReducer: state?.profileSectionReducer,
  };
};

const mapDispatchToProps = dispatch => ({
  // getProfileDetails: params => dispatch(profileAboutAction(params)),
  // onUpdateProfile: params => dispatch(sellerProductListingAction(params)),
  onUpdateProfile: params => dispatch(updateProfileAction(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

const styles = StyleSheet.create({});
