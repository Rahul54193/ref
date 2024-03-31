import {View, Text, Alert, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BackHeader, Container, Spacer} from '@app/components';
import PageTitle from '@app/screens/atoms/PageTitle';
import {EmptyList} from './common';
import {FlatList} from 'react-native';
import {connect, useSelector} from 'react-redux';
import {PriceAlertListingAction} from '@app/store/ratingReviewSlice';
import {Pressable} from 'react-native';
import {ActivityIndicator, Avatar} from 'react-native-paper';
import {FontsConst} from '@app/assets/assets';
import {CustomIcon, CustomText, Custombutton} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {RoutesName} from '@app/helper/strings';
import NavigationService from '@app/navigations/NavigationService';
import {COLORS, SPACING} from '@app/resources';
import exploreProductReducer, {
  removePriceAlert,
} from '@app/store/exploreProductSlice';
import {showAlert} from '@app/helper/commonFunction';
import {width} from '@app/helper/responsiveSize';

const PriceAlertListing = props => {
  const {
    getPriceAlertListing,
    authReducer,
    ratingReviewReducer,
    removePriceAlert,
    exploreProduct,
  } = props;
  const exploreState = useSelector(
    state => state.exploreProductReducer.removePriceAlertLoadingStatus,
  );
  console.log('exploreStatw', exploreState);
  const [selectedItems, setSelectedItems] = useState('');

  useEffect(() => {
    getPriceAlertListing();
  }, []);
  const item = props?.ratingReviewReducer?.PriceAlertListingAction?.data;
  console.log(
    props?.exploreProduct?.removePriceAlertLoadingStatus,
    '==========================>>>>>>>>>>>>>>>>>>>>>>item',
  );

  const RenderItem = ({item, index}) => {
    console.log('itemRender==', item);

    const onRowClick = () => {
      NavigationService.navigate(RoutesName.PRODUCT_DETAILS, {
        product_id: item?.product_id,
      });
      //
    };
    const image = item?.product[0]?.thumb_image;
    const title = item?.product[0]?.title;
    const bracelate = item?.product[0]?.bracelet_acc_name;
    const dial = item?.product[0]?.dial_name;
    
    const watchCondition =
      item?.condition == 'pre_owned' ? 'Pre Owned' : 'Brand New';
    const brand = item?.product[0]?.brand?.name;
    const model = item?.product[0]?.model?.name;
    const max_price = item?.max_price;
    const isSelected = index == selectedItems ? true : false;
    return (
      <Pressable onPress={onRowClick} style={styles.product}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // backgroundColor: 'red',
            maxWidth: width * 0.95,
           
          }}>
          <Avatar.Image size={30} source={{uri: image}} />
          <Spacer width={10} />
         <View style={{flexDirection:'row',maxWidth:width*0.3 }}>
         <CustomText style={styles.brandtext}>{brand}</CustomText>
         <Text>  </Text>
          <View style={{}}>
          <CustomText style={styles.brandtext}>{model}</CustomText>
          </View>
          <Text>  </Text>
          <CustomText style={styles.brandtext}>{dial}</CustomText>
         </View>
        </View>
        <CustomText style={styles.branddescriptiontext}>{bracelate}</CustomText>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}>
          <View style={styles.price_row}>
            <CustomText style={styles.price}>S${max_price}</CustomText>
            <View style={styles.circle} />
            <CustomText style={styles.condition}>{watchCondition}</CustomText>
          </View>
          {/* <Custombutton
                            title={'Get Started'}
                            width={'20%'}
                            fontSize={SPACING.SCALE_20}
                            onPress={() => {
                                // if (props?.route?.params?.product_id) {
                                //     props?.navigation?.navigate(
                                //         isCoins ? RoutesName.BOOST_NOW : RoutesName.BOOST_PURCHASE_COIN,
                                //         {
                                //             product_id: props?.route?.params?.product_id,
                                //         },
                                //     );
                                // }
                            }}
                        /> */}
          {exploreState == 'loading' && isSelected == true ? (
            <ActivityIndicator />
          ) : (
            <Pressable
              onPress={() => {
                setSelectedItems(index);
               

                showAlert({
                  title: `Are you sure want to Unsubscribe? `,
                  // message: `Sdfghjk`,
                  actions: [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                      // onPress: () => {
                       
                      // },
                    },
                    {
                      text: 'Confirm',
                      onPress: () => {
                        if (item?.product_id) {
                          removePriceAlert(item?.product_id).then(res => {
                            console.log('COnosleLogRes', res);
                            if (res?.type?.includes('fulfilled')) {
                              // alert('dfghj')
                              getPriceAlertListing();
                            } else {
                              showAlert({
                                title: 'Error',
                                message: 'Somthing went wrong',
                              });
                            }
                          });
                        }
                      },
                    },
                  ],
                });
              }}
              style={{
                height: SPACING.SCALE_30,
                width: SPACING.SCALE_100,
                borderRadius: SPACING.SCALE_10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLORS.APPGREEN,
              }}>
              <Text
                style={{
                  fontFamily: 'OpenSans-SemiBold',
                  color: 'white',
                  fontSize: SPACING.SCALE_12,
                }}>
                UnSubscribe
              </Text>
            </Pressable>
          )}
        </View>
      </Pressable>
    );
  };
  return (
    <Container useSafeAreaView={true}>
      <Spacer height={20} />
      <BackHeader />
      <PageTitle title={'Price Alert List'} />

      <FlatList
        data={item}
        contentContainerStyle={styles.flatlist_container}
        //keyExtractor={(item, index) => index.toString()}
        renderItem={RenderItem}
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
    exploreProduct: state?.exploreProductReducer,
  };
};
const mapDispatchToProps = dispatch => ({
  getPriceAlertListing: params => dispatch(PriceAlertListingAction()),
  removePriceAlert: params => dispatch(removePriceAlert(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PriceAlertListing);

const styles = StyleSheet.create({
  seprator: {
    borderWidth: 0.5,
    borderColor: '#00000020',
    paddingHorizontal: 10,
  },
  empty_container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: SPACING.SCALE_200,
  },

  product: {
    width: '100%',
    backgroundColor: '#F4F4F4',
    borderRadius: SPACING.SCALE_10,
    paddingVertical: SPACING.SCALE_10,
    paddingHorizontal: SPACING.SCALE_20,
    marginBottom: SPACING.SCALE_10,
  },
  avatar: {
    height: SPACING.SCALE_40,
    width: SPACING.SCALE_40,
    borderRadius: SPACING.SCALE_10,
    backgroundColor: '#D9D9D9',
  },
  brandtext: {
    color: '#000000',
    fontFamily: FontsConst.Cabin_Bold,
    fontSize: SPACING.SCALE_15,
    maxWidth:width*0.83,
    // backgroundColor:'green'
  },
  branddescriptiontext: {
    color: '#717171',
    fontFamily: FontsConst.OpenSans_Regular,
    fontSize: SPACING.SCALE_10,
  },
  price_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    color: '#00958C',
    fontFamily: FontsConst.Cabin_Bold,
    fontSize: SPACING.SCALE_15,
  },
  condition: {
    color: '#00958C',
    fontFamily: FontsConst.Cabin_Regular,
    fontSize: SPACING.SCALE_12,
  },
  circle: {
    height: SPACING.SCALE_4,
    width: SPACING.SCALE_4,
    borderRadius: SPACING.SCALE_2,
    backgroundColor: '#00958C',
    marginHorizontal: SPACING.SCALE_2,
  },
});
