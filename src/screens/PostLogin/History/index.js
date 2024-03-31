import {View, Text, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import {BackHeader, Container, Spacer} from '@app/components';
import PageTitle from '@app/screens/atoms/PageTitle';
import {EmptyList, RenderItem} from './historyCard';
import {connect, useSelector} from 'react-redux';
import {purchaseProductListingAction} from '@app/store/ratingReviewSlice';
import {LoadingStatus, RoutesName} from '@app/helper/strings';
import NavigationService from '@app/navigations/NavigationService';

const ProductHistory = props => {
  const {getProductList, authReducer, ratingReviewReducer} = props;
  const {userProfileDetails} = useSelector(state => state.authReducer);
  const loginUserId = userProfileDetails?.id;

  useEffect(() => {
    getProductList();
  }, []);
  // const loginUserId = userProfileDetails?.
  const item = props?.ratingReviewReducer?.purchaseProductListingAction?.data;
  console.log(item, '==========================>>>>>>>>>>>>>>>>>>>>>>item');

  return (
    <Container
      useSafeAreaView={true}
      loading={
        ratingReviewReducer.purchaseProductListingAction ==
        LoadingStatus.LOADING
      }>
      <Spacer height={20} />
      <BackHeader onPress={()=>{
         if(props?.route?.params?.tab == "rateuser")
         {
           NavigationService.navigate(RoutesName.EXPLORE_TAB)
         }
         else
         {NavigationService.navigate(RoutesName.PROFILE_TAB,{tab:"history"})}
          
        
      }} />
      <PageTitle title={'Product History'} />

      <FlatList
        data={item}
        contentContainerStyle={styles.flatlist_container}
        //keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <RenderItem item={item} loginUserId={loginUserId} />
        )}
        ListEmptyComponent={EmptyList}
        // onEndReachedThreshold={0.2}
        // onEndReached={onLoadMore}
        // ListFooterComponent={FooterList}
      />
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
  getProductList: params => dispatch(purchaseProductListingAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductHistory);
