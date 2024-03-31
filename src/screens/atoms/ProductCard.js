import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Platform,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {Avatar, Button, Card, Divider, Menu} from 'react-native-paper';
import {CustomIcon, CustomText, Spacer, SubmitButton} from '@app/components';
import {AssestsConst, FontsConst} from '@app/assets/assets';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {COLORS, IMAGES, SPACING} from '@app/resources';
import {
  addEllipsis,
  formatTimestamp,
  getTimeDifferenceString,
  showAlert,
} from '@app/helper/commonFunction';
import NavigationService from '@app/navigations/NavigationService';
import {RoutesName} from '@app/helper/strings';
import {useDispatch, useSelector} from 'react-redux';
import {addWishListAction} from '@app/store/exploreProductSlice';
import {LoginAlertCheck} from '../PostLogin/ProductDetails';
import FastImage from 'react-native-fast-image';

const {width} = Dimensions.get('screen');
const ProductCard = ({
  item,
  onSoldClick,
  onReservedClick,
  onDeleteClick,
  callBack,
  isActionButton = false,
  toShowUserDetail = true,
  isCrossButton = false,
  onPress,
}) => {
  const [visible, setVisible] = useState(false);
  const [inWishlist, setInWishlist] = useState(item?.isInWishlist);
  const dispatch = useDispatch();
  const authReducer = useSelector(state => state.authReducer);
  const isSelf = authReducer?.userProfileDetails?.id === item?.user_id ?? false;
  // const price = Math.round();
  function formatNumber(number) {
    // const formattedNumber = number?.toLocaleString('en-US', {
    //   minimumFractionDigits: 2,
    //   maximumFractionDigits: 2,
    // });

    // return formattedNumber?.replace(/\.00$/, '');
    const [integerPart, decimalPart] = number.split('.');
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const formattedDecimal = decimalPart == 0 ? '': `.${decimalPart.slice(0, 2)}`;
    const formattedNumber = `${formattedInteger}${formattedDecimal}`;
    return formattedNumber;
  }
  // console.log('**************', item);

  // On wishlist click
  const onWishlistClick = () => {
    dispatch(
      addWishListAction({
        product_id: item.id,
      }),
    ).then(res => {
      if (res?.type.includes('fulfilled')) {
        setInWishlist(!inWishlist);
      }
    });
  };
  //console.log(item, '<<<<----');

  return (
    <Card style={[styles.card_container]}>
      <Pressable
        onPress={() => {
          NavigationService.navigate(RoutesName.PRODUCT_DETAILS, {
            product_id: item?.id,
          });
        }}>
        {item?.thumb_image != '' ? (
          // <Image
          //   resizeMode="contain"
          //   style={styles.cover_style}
          //   source={{uri: item?.thumb_image}}
          //   defaultSource={IMAGES.loading}
          //   //loadingIndicatorSource={<ActivityIndicator />}
          // />
          <FastImage
            style={styles.cover_style}
            defaultSource={IMAGES.loading}
            source={{
              uri: item?.thumb_image,
              //headers: { Authorization: 'someAuthToken' },
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        ) : (
          <Image
            resizeMode="contain"
            style={{height: 160, width: width / 2 - 50}}
            source={IMAGES.noImage}
          />
        )}

        {item?.boosts_boost_start || item?.boost_id ? (
          <View
            style={{
              position: 'absolute',
              flexDirection: 'row',
              backgroundColor: '#01958C',
              borderRadius: SPACING.SCALE_5,
              top:SPACING.SCALE_5,
              left:SPACING.SCALE_5
            }}>
            <CustomIcon
              style={{
                alignSelf: 'center',
                // marginLeft: SPACING.SCALE_10,
                //marginRight: 5,
                marginTop: SPACING.SCALE_2,
                padding: SPACING.SCALE_3,
                marginLeft: SPACING.SCALE_2,
              }}
              origin={ICON_TYPE.ICONICONS}
              name={'flash-outline'}
              color={'#F0F2FA'}
              size={SPACING.SCALE_20}
            />
            <Text
              style={{
                color: '#F0F2FA',
                fontSize: SPACING.SCALE_12,
                alignSelf: 'center',
                marginRight: SPACING.SCALE_5,
                marginBottom: SPACING.SCALE_1,
              }}>
              Boosted
            </Text>
          </View>
        ) : null}
      </Pressable>
      {/* {item.product_status ? } */}
      {item?.product_status == 'reserved' ? (
        <View
          style={{
            height: SPACING.SCALE_20,
            backgroundColor: COLORS.APPGREEN,
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontFamily: 'OpenSans-SemiBold'}}>
            Reserved
          </Text>
        </View>
      ) : item.product_status == 'available' ? (
        <View
          style={{
            height: SPACING.SCALE_20,
            // backgroundColor: 'red',
            alignItems: 'center',
          }}></View>
      ) : item.product_status == 'sold_out' ? (
        <View
          style={{
            height: SPACING.SCALE_20,
            backgroundColor: 'red',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white', fontFamily: 'OpenSans-SemiBold'}}>
            Sold
          </Text>
        </View>
      ) : (
        <View
          style={{
            height: SPACING.SCALE_20,
            backgroundColor: 'red',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontFamily: 'OpenSans-SemiBold'}}>
            abc
          </Text>
        </View>
      )}
      <Card.Content>
        <CustomText
          numberOfLines={1}
          style={{
            ...styles.title,
            color: item?.title === 'Draft Product' ? '#a1979f' : '#000000',
          }}>
          {item?.title}
        </CustomText>
        <View style={styles.price_container}>
          <CustomText style={styles.price}>
            {'S$'} {formatNumber(item?.price)}
          </CustomText>
          {/* <View style={styles.seprator} /> */}
        </View>
        <CustomText numberOfLines={1} style={styles.category}>
          {item?.watch_condition === 'pre_owned' ? 'Pre Owned' : 'Brand New'}
        </CustomText>
      </Card.Content>
      <Card.Content>
        {isSelf && isActionButton ? null : (
          <View>
            {toShowUserDetail && (
              <Pressable
                onPress={() => {
                  NavigationService.navigate(
                    RoutesName.PORFILE_SECTION_SCREEN_OTHERS,
                    {
                      userId: item?.user_id,
                    },
                  );
                }}>
                <View style={styles.user_image}>
                  <Avatar.Image
                    size={SPACING.SCALE_18}
                    source={
                      item?.user?.image && item?.user?.image !== ''
                        ? {uri: item?.user?.image}
                        : AssestsConst.AVATAR
                    }
                  />
                  <Spacer width={5} />
                  <View style={{}}>
                    {item?.user?.user_id_tag ? (
                      <CustomText style={styles.name}>
                        {item?.user?.user_id_tag?.length > 13
                          ? `${addEllipsis(item?.user?.user_id_tag, 13)}`
                          : `${item?.user?.user_id_tag}`}
                      </CustomText>
                    ) : (
                      <CustomText style={styles.name}>
                        {item?.user?.name?.length > 13
                          ? `${addEllipsis(item?.user?.name, 13)}`
                          : `${item?.user?.name}`}
                      </CustomText>
                    )}
                  </View>
                </View>
              </Pressable>
            )}
          </View>
        )}
        <CustomText style={styles.duration}>
          Posted {getTimeDifferenceString(item?.created_at)}
        </CustomText>
        <Spacer height={13} />
      </Card.Content>
      {isSelf && isActionButton ? (
        <Pressable
          disabled={
            item?.status === 'draft' ||
            item?.product_status == 'sold_out' ||
            item?.product_status == 'reserved'
          }
          style={{
            ...styles.boostButton,
            borderWidth:
              item?.status === 'draft' ||
              item?.product_status == 'sold_out' ||
              item?.product_status == 'reserved'
                ? 0
                : 1,
            backgroundColor:
              item?.status === 'draft' ||
              item?.product_status == 'sold_out' ||
              item?.product_status == 'reserved'
                ? '#e5dfe3'
                : 'white',
            // marginTop: item?.status === 'draft' ? SPACING.SCALE_20 : 0,
          }}
          onPress={() => {
            NavigationService.navigate(RoutesName.BOOST_PRODUCT_INTRODUCTION, {
              product_id: item?.id,
            });
          }}>
          <CustomText
            style={{
              color:
                item?.status === 'draft' ||
                item?.product_status == 'sold_out' ||
                item?.product_status == 'reserved'
                  ? '#a1979f'
                  : '#000',
            }}>
            Boost Product
          </CustomText>
        </Pressable>
      ) : (
        <Spacer />
      )}
      {isActionButton ? (
        <View style={styles.bookmark}>
          {isSelf ? (
            <Menu
              style={{
                backgroundColor: '#fff',
              }}
              visible={visible}
              onDismiss={() => setVisible(false)}
              anchor={
                <Pressable
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 6,
                    height: 25,
                    width: 15,
                    backgroundColor: 'white',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                  }}
                  onPress={() => setVisible(true)}>
                  <CustomIcon
                    size={15}
                    color={'#000000'}
                    origin={ICON_TYPE.ENTYPO}
                    name="dots-three-vertical"
                  />
                </Pressable>
              }>
              {item?.product_status == 'available' && (
                <>
                  <Menu.Item
                    onPress={() => {
                      NavigationService.navigate(RoutesName.EDIT_PRODUCT, {
                        product_id: item?.id,
                      });
                      setVisible(false);
                    }}
                    title="Edit Details"
                  />
                  <Divider />
                </>
              )}
              {item?.status !== 'draft' && (
                <Menu.Item
                  onPress={
                    onSoldClick
                      ? () => {
                          setVisible(false);
                          showAlert({
                            title: 'Mark as sold this product!',
                            actions: [
                              {
                                text: 'Cancel',
                                style: 'cancel',
                              },
                              {
                                text: 'Proceed',
                                onPress: () => {
                                  onSoldClick();
                                },
                              },
                            ],
                          });
                        }
                      : null
                  }
                  title="Mark as sold"
                />
              )}
              <Divider />
              {item?.status !== 'draft' && (
                <Menu.Item
                  onPress={
                    onReservedClick
                      ? () => {
                          setVisible(false);
                          showAlert({
                            title: 'Mark as reserved this product!',
                            actions: [
                              {
                                text: 'Cancel',
                                style: 'cancel',
                              },
                              {
                                text: 'Proceed',
                                onPress: () => {
                                  onReservedClick();
                                },
                              },
                            ],
                          });
                        }
                      : null
                  }
                  title="Mark as Reserved"
                />
              )}
              <Divider />
              <Menu.Item
                onPress={
                  onDeleteClick
                    ? () => {
                        setVisible(false);
                        showAlert({
                          title: 'Mark as delete this product!',
                          actions: [
                            {
                              text: 'Cancel',
                              style: 'cancel',
                            },
                            {
                              text: 'Proceed',
                              onPress: () => {
                                onDeleteClick();
                              },
                            },
                          ],
                        });
                      }
                    : null
                }
                title="Delete"
              />
            </Menu>
          ) : (
            <Pressable
              onPress={
                onWishlistClick
                  ? () => {
                      if (
                        authReducer?.userProfileDetails?.email === 'swi@swi.com'
                      ) {
                        LoginAlertCheck(dispatch);
                      } else {
                        setInWishlist(!inWishlist);
                        onWishlistClick();
                      }
                    }
                  : null
              }>
              <CustomIcon
                size={30}
                color={inWishlist ? '#00958C' : '#000000'}
                origin={ICON_TYPE.MATERIAL_ICONS}
                name={inWishlist ? 'bookmark' : 'bookmark-outline'}
              />
            </Pressable>
          )}
        </View>
      ) : null}
      {isCrossButton ? (
        <Pressable style={styles.bookmarks} onPress={onPress}>
          <CustomIcon
            size={15}
            color={'black'}
            origin={ICON_TYPE.MATERIAL_ICONS}
            name="close"
          />
        </Pressable>
      ) : null}
    </Card>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card_container: {
    flex: 0.5,
    backgroundColor: '#F6F6F6',
    //backgroundColor: 'red',
    elevation: 1,
    //marginTop: 6,
    //marginVertical: 10,
    //marginHorizontal: 10,
    margin: 6,
    width: width / 2 - 20,
  },
  cover_style: {
    height: SPACING.SCALE_160,
    backgroundColor: '#fff',
    // backgroundColor: 'red',
    // width: 100,
  },
  title: {
    fontSize: SPACING.SCALE_15,
    fontFamily: FontsConst.Cabin_Bold,
    marginTop: Platform.OS === 'ios' ? 0 : SPACING.SCALE__5,
  },
  price_container: {
    flexDirection: 'row',
    alignItems: 'center',
    //justifyContent: 'space-between',
    paddingVertical: 5,
    flex: 1,
  },
  price: {
    color: '#00958C',
    fontSize: SPACING.SCALE_17,
    fontFamily: FontsConst.Cabin_Bold,
  },
  seprator: {
    height: SPACING.SCALE_3,
    width: SPACING.SCALE_3,
    borderRadius: width / 2,
    backgroundColor: '#00958C',
    marginHorizontal: SPACING.SCALE_5,
  },
  category: {
    color: '#00958C',
    fontSize: SPACING.SCALE_16,
    fontFamily: FontsConst.Cabin_Regular,
    flex: 1,
    //fontWeight: 'bold',
  },
  user_image: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.SCALE_5,
  },
  name: {
    fontSize: SPACING.SCALE_15,
    fontFamily: FontsConst.OpenSans_SemiBold,
    color: '#454545',
  },
  duration: {
    fontSize: SPACING.SCALE_10,
    fontFamily: FontsConst.OpenSans_Regular,
    color: '#868686',
  },
  bookmark: {
    top: SPACING.SCALE_7,
    right: SPACING.SCALE_7,
    position: 'absolute',
    height: SPACING.SCALE_30,
    width: SPACING.SCALE_30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boostButton: {
    height: SPACING.SCALE_35,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: SPACING.SCALE_1,
    borderRadius: SPACING.SCALE_10,
    marginVertical: SPACING.SCALE_10,
    marginHorizontal: SPACING.SCALE_10,
  },
  bookmarks: {
    top: 5,
    right: 5,
    position: 'absolute',
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
