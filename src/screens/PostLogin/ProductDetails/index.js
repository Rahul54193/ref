/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import branch, {BranchEvent} from 'react-native-branch';
import {connect, useDispatch, useSelector} from 'react-redux';
import {ModalComp} from './ModalComp';
import {
  CustomIcon,
  CustomText,
  Custombutton,
  Custombutton2,
  Loader,
  ProductViewComponent,
  Spacer,
  SubmitButton,
} from '@app/components';
import {
  FormattedNumber,
  addEllipsis,
  capitalizeFirstLetter,
  formatDateToYearMonth,
  formatTimestamp,
  showAlert,
} from '@app/helper/commonFunction';
import ImageView from 'react-native-image-viewing';

import {exploreProductDetail, productChart} from '@app/store/explore.slice';
import {COLORS, IMAGES, SPACING} from '@app/resources';
import Chartdemo from './chartdemo';
import styles from './styles';
import {LoadingStatus, RoutesName} from '@app/helper/strings';
import {
  addPriceAlert,
  addProductInterestList,
  addWishListAction,
  onAddToProductCompare,
  removePriceAlert,
} from '@app/store/exploreProductSlice';
import Video from 'react-native-video';
import {ICON_TYPE} from '@app/components/CustomIcon';
import ProductCard from '@app/screens/atoms/ProductCard';
import {FlatList} from 'react-native-gesture-handler';
import ReadMore from '@app/components/ReadMore';
import ProductImageDetail from './ProductImageDetail';
import NavigationService from '@app/navigations/NavigationService';
import {changeProductStatusAction} from '@app/store/profileSectionSlice';
import {logoutAction} from '@app/store/authSlice';
import ProductCardChecklogin from '@app/screens/atoms/ProductCardChecklogin';
import Modal from 'react-native-modal';
import {SlideOutDown} from 'react-native-reanimated';
import Slider from '@react-native-community/slider';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '@app/helper/responsiveSize';
import {wishlistAction} from '@app/store/wishlistSlice';
import DropDownWithModel from '../AddProduct1/DropDownWithModel';
import {List, RadioButton} from 'react-native-paper';
import {getAllProductDropdownAction} from '@app/store/productSlice';

const selectKey = [
  {id: 1, name: 'Last 7 Days', key: 'seven_days'},
  {id: 2, name: 'Last 30 Days', key: 'lastdays'},
  {id: 3, name: 'Last 6 Months', key: 'lastmonths'},
  {id: 4, name: 'Last 1 Year', key: 'lastyear'},
];

const ProductDetails = props => {
  const [FieldValue, setFieldValue] = useState(0);
  // for comma separated
  function formatNumberWithCommas(number) {
    // let numberString = number.toString();

    // const parts = numberString.split('.');

    // parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // if (parts.length > 1 && parseInt(parts[1]) !== 0) {
    //   parts[1] = parts[1].slice(0, 2);
    //   numberString = parts.join('.');
    // } else {
    //   numberString = parts[0];
    // }

    // return numberString;
    const numStr = number.toString();

    // Split the number into the integer and decimal parts
    const [integerPart, decimalPart] = numStr.split('.');

    // Add commas to the integer part
    const formattedInteger = parseInt(integerPart, 10).toLocaleString();

    // Include up to the second position after the decimal point
    const formattedNumber = `${formattedInteger}.${
      decimalPart ? decimalPart.slice(0, 2) : ''
    }`;

    return formattedNumber;
  }

  const [fullImageModalVisible, setfullImageModalVisible] = useState(false);
  const {
    onAddToProductCompare,
    addToCompareReducer,
    authReducer,
    onChangeProductStatus,
    addPriceAlert,
    exploreProduct,
    removePriceAlert,
    addProductInterestList,
    addWishListAction,
    productChartData,
    productReducer,
    getWishList,
    getAllProductDropdown,
  } = props;
  console.log(addToCompareReducer?.productCompareList, '======>>>>');
  console.log(authReducer?.userProfileDetails?.email, 'asdfjk====');
  const [isChartDropDown, setIsChartDropDown] = useState(false);
  const [selectFilteredValue, setSelectFilteredValue] = useState({
    id: 1,
    name: 'Last 7 Days',
    key: 'seven_days',
  });
  const [selectedVideo, setSelectedVideo] = useState({
    visible: false,
    uri: null,
  });
  const [videoLoading, setVideoLoading] = useState(true);
  const [isVideoPause, setIsVideoPause] = useState(false);

  const videoRef = useRef();

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const buoRef = useRef();

  const {
    productDetailLoading,
    productDetailData,
    productDetailError,
    removePriceAlertLoadingStatus,
  } = useSelector(state => state?.exploreReducer);
  console.log(productDetailData, 'sgrgedrgerProductDetail loading');
  console.log(exploreProduct, 'explore product =========>>>>>>>');
  console.log('==============>>>>', productChartData);

  const isSelf =
    authReducer?.userProfileDetails?.id === productDetailData?.data?.user_id
      ? true
      : false;
  console.log(isSelf, 'isself');
  const [selectedValue, setSelectedValue] = useState(null);

  const handlePress = value => {
    setSelectedValue(value);
  };
  console.log(
    props?.route?.params,
    'productDetailData?.data?.alert===============',
  );
  const [watchCondition, setWatchCondition] = useState('');
  const [accessoriesState, setAccessoriesState] = useState('');
  useEffect(() => {
    if (props.route?.params?.product_id) {
      dispatch(
        exploreProductDetail({
          product_id: props?.route?.params?.product_id,
        }),
      );
    }
    return () => {
      if (buoRef.current) {
        console.log('buo release');
        buoRef.current?.release();
      }
    };
  }, [props?.route?.params?.product_id]);

  useEffect(() => {
    if (props?.route?.params?.product_id) {
      dispatch(
        productChart({
          product_id: props?.route?.params?.product_id,
          duration: selectFilteredValue?.key ?? 'sevendays',
        }),
      );
    }
  }, [selectFilteredValue, props?.route?.params?.product_id]);

  useEffect(() => {
    getAllProductDropdown();

    return () => {
      getWishList();
    };
  }, []);
  console.log(
    'Accerios Data',
    productReducer?.getAllProductDropdown?.ACCESSORIES,
  );
  console.log(productDetailData?.data?.price, 'product Price data ');
  const productPriceData = productDetailData?.data?.price;
  const newObject = {
    maxPrice: formatNumberWithCommas(FieldValue),
    accessories: selectedValue ?? '',
    condition: watchCondition ?? '',
  };
  console.log('New Object ', {
    ...newObject,
    id: productDetailData?.data?.id,
  });
  // const integerPriceValue = Math.round(productPriceData);
  // const formattedNumber = integerPriceValue.toLocaleString();

  const Max_Value = productDetailData?.data?.max_price;
  console.log('Product max price ==>>', productDetailData?.data?.max_price);

  // uncomment code to enable share option with deep linking
  const onShareClick = async () => {
    let linkProperties = {
      feature: 'share',
      channel: 'RNApp',
      campaign: `Product ID - ${props?.route?.params?.product_id}`,
    };
    let shareOptions = {
      messageHeader: 'Check this out',
      messageBody: 'No really, check this out!',
    };
    let controlParams = {
      $desktop_url: 'https://www.google.com',
    };
    let eventParams = {
      ptest: 'hello',
    };
    buoRef.current = await branch.createBranchUniversalObject(
      `product/${props?.route?.params?.product_id}`,
      {
        title: 'Product Title',
        contentDescription: 'Product Description',
        canonicalUrl: '',
        contentMetadata: {
          customMetadata: {
            productID: `${props?.route?.params?.product_id}`,
          },
        },
      },
    );
    let event = new BranchEvent(
      BranchEvent.ViewItem,
      [buoRef.current],
      eventParams,
    );
    event.logEvent();
    let {url} = await buoRef.current?.generateShortUrl(
      linkProperties,
      controlParams,
    );
    console.log('url', url);
    let {channel, completed, error} = await buoRef.current?.showShareSheet(
      shareOptions,
      linkProperties,
      controlParams,
    );
    console.log('test', {channel, completed, error});
  };
  const [isModalVisible, setIsModalVisible] = useState(false);

  const closeModal = () => {
    setIsModalVisible(false);
  };

  // const ModalComponent = () => {

  //   <View style={{ height: 100, width: 100, backgroundColor: "red" }} >
  //     {/* <Button title="Show modal" onPress={toggleModal} /> */}

  //     <Modal isVisible={true}>
  //       <View style={{ flex: 1 }} >
  //         <Text>Hello!</Text>
  //         <Text>Hello!</Text>
  //         <Text>Hello!</Text>
  //         <Text>Hello!</Text>
  //         <Text>Hello!</Text>
  //         <Text>Hello!</Text>

  //         <Pressable style={{ height: 50, width: 50, borderWidth: 1 }} onPress={toggleModal} >
  //           <Text>Hide Modal</Text>
  //         </Pressable>
  //       </View>
  //     </Modal>
  //   </View>

  // }
  const [factoryModal, setFactoryModal] = useState(false);
  const [customModal, setCustomModal] = useState(false);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      {productDetailLoading === false ? (
        <View style={{flex: 1}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              // paddingBottom: 20,
            }}>
            {
              //header
            }
            <View style={styles.headerStyle}>
              <TouchableOpacity
                onPress={() => {
                  if (props?.route?.params?.name == 'posted') {
                    NavigationService.navigate(
                      RoutesName.PROFILE_SECTION_SCREEN,
                    );
                  } else {
                    NavigationService.goBack();
                  }
                }}>
                <Image
                  style={{
                    height: SPACING.SCALE_24,
                    width: SPACING.SCALE_24,
                    resizeMode: 'cover',
                  }}
                  source={IMAGES.BACKARROW}
                />
              </TouchableOpacity>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {addToCompareReducer?.productCompareList.length > 0 &&
                !isSelf ? (
                  <Pressable
                    onPress={() => {
                      navigation.navigate(RoutesName.ITEM_COMPARISON);
                    }}>
                    <View style={{marginRight: SPACING.SCALE_8}}>
                      <CustomIcon
                        size={SPACING.SCALE_30}
                        style={{marginRight: 10}}
                        color={'#000000'}
                        origin={ICON_TYPE.MATERIAL_COMMUNITY}
                        name={'compare'}
                      />
                      <View
                        style={{
                          height: SPACING.SCALE_20,
                          width: SPACING.SCALE_20,
                          borderRadius: SPACING.SCALE_10,
                          backgroundColor: 'black',
                          position: 'absolute',
                          top: SPACING.SCALE__2,
                          right: SPACING.SCALE__2,
                          justifyContent: 'center',
                          alignSelf: 'center',
                        }}>
                        <Text
                          style={{
                            color: COLORS.BLACK,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            // marginLeft: ,
                            // alignSelf: 'center',
                            color: 'white',

                            // fontSize: 24,
                          }}>
                          {addToCompareReducer?.productCompareList?.length}
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                ) : null}

                <TouchableOpacity
                  onPress={() => {
                    if (
                      authReducer?.userProfileDetails?.email === 'swi@swi.com'
                    ) {
                      LoginAlertCheck(dispatch);
                    } else {
                      onShareClick();
                    }
                  }}>
                  <Image
                    style={{
                      marginRight: 16,
                      height: SPACING.SCALE_24,
                      width: SPACING.SCALE_24,
                    }}
                    source={IMAGES.share}
                  />
                </TouchableOpacity>
                {!isSelf && (
                  <>
                    {exploreProduct.addWishListLoadingStatus ===
                    LoadingStatus.LOADING ? (
                      <ActivityIndicator />
                    ) : (
                      <TouchableOpacity
                        onPress={async () => {
                          if (
                            authReducer?.userProfileDetails?.email ===
                            'swi@swi.com'
                          ) {
                            LoginAlertCheck(dispatch);
                          } else {
                            try {
                              if (productDetailData?.data?.id) {
                                const res = await addWishListAction({
                                  product_id: productDetailData?.data?.id,
                                });

                                if (
                                  res?.payload?.message ===
                                  'Product added to wishlist'
                                ) {
                                  showAlert({
                                    title: 'Success',
                                    message: 'Product added to favourite',
                                  });

                                  if (props.route?.params?.product_id) {
                                    dispatch(
                                      exploreProductDetail({
                                        product_id:
                                          props?.route?.params?.product_id,
                                      }),
                                    );
                                  }
                                } else if (
                                  res?.payload?.message ===
                                  'Item removed from wishlist'
                                ) {
                                  showAlert({
                                    title: 'Success',
                                    message: res?.payload?.message,
                                  });
                                }
                                if (props.route?.params?.product_id) {
                                  dispatch(
                                    exploreProductDetail({
                                      product_id:
                                        props?.route?.params?.product_id,
                                    }),
                                  );
                                }
                              } else {
                                showAlert({
                                  title: 'Error',
                                  message: 'Something went wrong.',
                                });
                              }
                            } catch (error) {
                              console.error('Error:', error);
                              showAlert({
                                title: 'Error',
                                message:
                                  'An error occurred while adding to the interest list.',
                              });
                            }
                          }
                        }}>
                        <CustomIcon
                          size={30}
                          color={'#000000'}
                          origin={ICON_TYPE.MATERIAL_ICONS}
                          name={
                            productDetailData?.data?.isInWishlist
                              ? 'bookmark'
                              : 'bookmark-outline'
                          }
                        />
                      </TouchableOpacity>
                    )}
                  </>
                )}
              </View>
            </View>
            <ProductImageDetail
              data={productDetailData?.data}
              onVideoClick={e => {
                console.log('e==', e);
                setSelectedVideo({
                  visible: true,
                  uri: e?.uri,
                });
                videoRef.current?.presentFullscreenPlayer();
              }}
            />
            {/* MOdel, Brand, Price, condition */}

            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 5,
                justifyContent: 'space-between',
                // backgroundColor: 'red'
              }}>
              <Text
                style={{
                  fontFamily: 'Cabin-Bold',
                  fontSize: 18,
                  marginBottom: 3,
                  color: '#000000',
                  textAlign: 'center',
                  width: '90%',
                }}>
                {/* {productDetailData?.data?.gender_type}'s Watch with{' '}
                {productDetailData?.data?.bracelet} Strap */}
                {productDetailData?.data?.title}
              </Text>
              <Text
                style={{
                  fontFamily: 'OpenSans-SemiBold',
                  fontSize: 15,
                  // color: COLORS.greyTextColor,
                  color: '#454545',
                  marginBottom: 3,
                }}>
                {productDetailData?.data?.brand_custom == null
                  ? productDetailData?.data?.brand?.name
                  : productDetailData?.data?.brand_custom}{' '}
                - Model{' '}
                {productDetailData?.data?.model_custom == null
                  ? productDetailData?.data?.model?.name
                  : productDetailData?.data?.model_custom}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  fontSize: 13,
                }}>
                <Text
                  style={{
                    fontFamily: 'Cabin-Bold',
                    color: '#00958C',
                    fontSize: 22,
                  }}>
                  S${FormattedNumber(productPriceData)}
                </Text>
                <View
                  style={{
                    height: 4,
                    width: 4,
                    borderRadius: 2,
                    marginHorizontal: 5,
                    backgroundColor: '#00958C',
                  }}
                />
                <Text
                  style={{
                    fontFamily: 'Cabin-Regular',
                    color: '#00958C',
                    fontSize: 16,
                  }}>
                  {productDetailData?.data?.watch_condition}
                </Text>
              </View>
            </View>

            {/* Availability */}

            <View
              style={{
                backgroundColor: '#F0F2FA',
                //backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'center',
                height: 40,
                width: '100%',
                marginVertical: 5,
              }}>
              <Text
                style={{
                  fontFamily: 'OpenSans-SemiBold',
                  color: '#454545',
                  fontSize: 15,
                }}>
                {capitalizeFirstLetter(productDetailData?.data?.product_status)}
              </Text>
            </View>
            {productDetailData?.data?.product_status !== 'available' &&
              !isSelf && (
                <SubmitButton
                  disabled={productDetailData?.data?.interest_lists === true}
                  onPress={() => {
                    if (
                      authReducer?.userProfileDetails?.email === 'swi@swi.com'
                    ) {
                      LoginAlertCheck(dispatch);
                    } else {
                      if (productDetailData?.data?.id) {
                        addProductInterestList(
                          productDetailData?.data?.id,
                        ).then(res => {
                          if (
                            res?.payload?.message ===
                            'Interest List added successfully.'
                          ) {
                            showAlert({
                              title: 'Success',
                              message: res?.payload?.message,
                            });
                            if (props.route?.params?.product_id) {
                              dispatch(
                                exploreProductDetail({
                                  product_id: props?.route?.params?.product_id,
                                }),
                              );
                            }
                          } else {
                            showAlert({
                              title: 'Error',
                              message: 'Somthing went wrong.',
                            });
                          }
                        });
                      }
                    }
                  }}
                  buttonStyle={{width: '85%', alignSelf: 'center'}}
                  lable="I'm interested in this product"
                />
              )}

            {/* Seller Details */}

            <TouchableOpacity
              onPress={() => {
                if (authReducer?.userProfileDetails?.email === 'swi@swi.com') {
                  LoginAlertCheck(dispatch);
                } else {
                  NavigationService.navigate(
                    RoutesName.PORFILE_SECTION_SCREEN_OTHERS,
                    {
                      userId: productDetailData?.data?.user_id,
                    },
                  );
                }
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  //alignItems: 'center',
                  justifyContent: 'space-evenly',
                  marginVertical: SPACING.SCALE_5,
                  marginHorizontal: SPACING.SCALE_13,
                  // backgroundColor: 'red',
                  //maxWidth:SPACING.SCALE_00
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    //alignItems: 'center',
                    justifyContent: 'space-evenly',
                    marginVertical: SPACING.SCALE_5,
                    marginHorizontal: SPACING.SCALE_13,
                    // backgroundColor: 'red',
                    //maxWidth:SPACING.SCALE_00
                  }}>
                  <View style={{marginTop: SPACING.SCALE_3}}>
                    {productDetailData?.data?.user?.image ? (
                      <Image
                        source={{uri: productDetailData?.data?.user?.image}}
                        style={{
                          height: 45,
                          width: 45,
                          borderRadius: 45 / 2,
                          marginLeft: 10,
                        }}
                      />
                    ) : (
                      <Image
                        source={IMAGES.userProfile}
                        style={{height: 45, width: 45, borderRadius: 45 / 2}}
                      />
                    )}
                  </View>

                  <View
                    style={{
                      width: SPACING.SCALE_285,
                      //backgroundColor: 'green',
                      marginLeft: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignContent: 'center',
                        justifyContent: 'space-between',
                        // backgroundColor: 'blue',
                        maxWidth: SPACING.SCALE_285,
                      }}>
                      <View
                        style={{
                          maxWidth: SPACING.SCALE_100,
                          // backgroundColor: 'red',
                          //marginLeft: 10,
                        }}>
                        {productDetailData?.data?.user?.user_id_tag ? (
                          <Text
                            style={{
                              fontFamily: 'OpenSans-SemiBold',
                              fontSize: 15,
                              marginLeft: 16,
                              color: '#454545',
                            }}>
                            {productDetailData?.data?.user?.user_id_tag
                              ?.length > 8
                              ? `@${addEllipsis(
                                  productDetailData?.data?.user?.user_id_tag,
                                  8,
                                )}`
                              : `@${productDetailData?.data?.user?.user_id_tag}`}
                          </Text>
                        ) : (
                          <Text
                            style={{
                              fontFamily: 'OpenSans-SemiBold',
                              fontSize: 15,
                              marginLeft: 16,
                              color: '#454545',
                            }}>
                            {productDetailData?.data?.user?.name?.length > 8
                              ? `@${addEllipsis(
                                  productDetailData?.data?.user?.name,
                                  8,
                                )}`
                              : `@${productDetailData?.data?.user?.name}`}
                          </Text>
                        )}
                      </View>
                      <Text
                        style={{
                          fontFamily: 'OpenSans-Regular',
                          fontSize: 12,
                          margin: 5,
                          color: '#868686',
                        }}>
                        {formatTimestamp(productDetailData?.data?.created_at)}
                      </Text>
                    </View>
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      />
                      <View
                        style={{
                          flexDirection: 'row',
                          // alignItems: 'center',
                          // justifyContent: 'center',
                          //marginTop: 6,
                        }}>
                        {productDetailData?.data?.location ? (
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginLeft: SPACING.SCALE_10,
                            }}>
                            <View
                              style={{alignSelf: 'flex-start', marginTop: 5}}>
                              <Image
                                style={{
                                  height: 18,
                                  width: 14.5,
                                  marginRight: 6,
                                }}
                                source={IMAGES.locationIcon}
                              />
                            </View>
                            <View style={{maxWidth: 250}}>
                              <Text
                                style={{
                                  fontFamily: 'OpenSans-SemiBold',
                                  fontSize: 15,
                                  color: '#454545',
                                }}>
                                {productDetailData?.data?.location}
                              </Text>
                            </View>
                          </View>
                        ) : (
                          <Text>No address</Text>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                height: 1,
                width: '90%',
                backgroundColor: 'gray',
                marginTop: 15,
                alignSelf: 'center',
              }}
            />

            {/* Specifications */}
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                // backgroundColor: 'red',
                paddingHorizontal: 20,
                marginTop: 20,
              }}>
              {productDetailData?.data?.accessories && (
                <View
                  style={{
                    ...styles.SpecifiactionView,
                    marginTop: 3,
                    //backgroundColor: 'red',
                  }}>
                  <Text style={styles.SpecifiactionText1}>Accessories</Text>
                  <Text style={styles.SpecifiactionText2}>
                    {productDetailData?.data?.accessories}
                  </Text>
                </View>
              )}
              {productDetailData?.data?.dial && (
                <View style={styles.SpecifiactionView}>
                  <Text style={styles.SpecifiactionText1}>Dial</Text>
                  <Text style={styles.SpecifiactionText2}>
                    {productDetailData?.data?.dial}
                  </Text>
                </View>
              )}
              {productDetailData?.data?.dial_markers && (
                <View style={styles.SpecifiactionView}>
                  <Text style={styles.SpecifiactionText1}>Dial Markers</Text>
                  <Text style={styles.SpecifiactionText2}>
                    {productDetailData?.data?.dial_markers}
                  </Text>
                </View>
              )}
              {productDetailData?.data?.case_size && (
                <View style={styles.SpecifiactionView}>
                  <Text style={styles.SpecifiactionText1}>Case Size </Text>
                  <Text style={styles.SpecifiactionText2}>
                    {productDetailData?.data?.case_size}
                  </Text>
                </View>
              )}
              {productDetailData?.data?.movement && (
                <View style={styles.SpecifiactionView}>
                  <Text style={styles.SpecifiactionText1}>Movement</Text>
                  <Text style={styles.SpecifiactionText2}>
                    {productDetailData?.data?.movement}
                  </Text>
                </View>
              )}
              {productDetailData?.data?.dated && (
                <View style={styles.SpecifiactionView}>
                  <Text style={styles.SpecifiactionText1}>Dated </Text>
                  <Text style={styles.SpecifiactionText2}>
                    {productDetailData?.data?.no_certain === 'yes'
                      ? 'No certain'
                      : formatDateToYearMonth(productDetailData?.data?.dated)}
                  </Text>
                </View>
              )}
              {/* ///////////////////////////////////// */}
              {productDetailData?.data?.case_ma_name && (
                <View style={styles.SpecifiactionView}>
                  <Text style={styles.SpecifiactionText1}>Case Material</Text>
                  <Text style={styles.SpecifiactionText2}>
                    {productDetailData?.data?.case_ma_name}
                  </Text>
                </View>
              )}
              {productDetailData?.data?.bracelet_acc_name && (
                <View style={styles.SpecifiactionView}>
                  <Text style={styles.SpecifiactionText1}>Strap/Bracelet</Text>
                  <Text style={styles.SpecifiactionText2}>
                    {productDetailData?.data?.bracelet_acc_name}
                  </Text>
                </View>
              )}
              {productDetailData?.data?.clasp_acc_name && (
                <View style={styles.SpecifiactionView}>
                  <Text style={styles.SpecifiactionText1}>Clasp</Text>
                  <Text style={styles.SpecifiactionText2}>
                    {productDetailData?.data?.clasp_acc_name}
                  </Text>
                </View>
              )}
              {/* Factory Gem Set Details  */}
              {productDetailData?.data?.factory_gem_set_data.length > 0 && (
                <List.Accordion title="Factory gem set">
                  {productDetailData?.data?.factory_gem_set_data.map(item => {
                    console.log('345fdsdfvs', item);
                    return (
                      <View style={styles.SpecifiactionView}>
                        <Text style={styles.SpecifiactionText1}>
                          {item?.gem_position}
                        </Text>
                        <Text style={styles.SpecifiactionText2}>
                          {item?.value}
                        </Text>
                      </View>
                    );
                  })}
                </List.Accordion>
              )}

              {productDetailData?.data?.custom_gem_set_data.length > 0 && (
                <List.Accordion title="Custom">
                  {productDetailData?.data?.custom_gem_set_data.map(item => {
                    console.log('ghdsvaghvf347834y8374', item);
                    return (
                      <View style={styles.SpecifiactionView}>
                        <Text style={styles.SpecifiactionText1}>
                          {item?.gem_position}
                        </Text>
                        <Text style={styles.SpecifiactionText2}>
                          {item?.value}
                        </Text>
                      </View>
                    );
                  })}
                </List.Accordion>
              )}

              {/* Custom Gem set Details   */}
            </View>

            {/* ReadMore Text */}

            {productDetailData?.data?.description?.length >= 1 && (
              <View
                style={{
                  alignSelf: 'center',
                  width: '90%',
                  marginTop: 30,
                  // backgroundColor: 'red',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'OpenSans-SemiBold',
                    flex: 1,
                    fontSize: 15,
                  }}>
                  Description
                </Text>
                <Spacer />
                <ReadMore
                  style={{
                    color: '#000000',
                    fontFamily: 'OpenSans-Regular',
                    fontSize: 16,
                  }}
                  content={productDetailData?.data?.description}
                />
              </View>
            )}

            <View
              style={{
                //flex: 1,
                height: 1,
                width: '90%',
                backgroundColor: 'gray',
                marginTop: 15,
                alignSelf: 'center',
              }}
            />

            {/* Price Chart */}

            {productDetailData?.data?.brand?.name === 'Rolex ' ||
            productDetailData?.data?.brand?.name === 'Audemars ' ||
            productDetailData?.data?.brand?.name === 'Piguet ' ||
            productDetailData?.data?.brand?.name === 'Patek Philippe ' ? (
              <View
                style={{
                  marginTop: 25,
                  position: 'relative',
                  //backgroundColor: 'red',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 16,
                    zIndex: 1,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'OpenSans-Bold',
                      fontSize: SPACING.SCALE_13,
                      color: '#454545',
                    }}>
                    Price Chart
                  </Text>
                  <TouchableOpacity
                    onPress={() => setIsChartDropDown(!isChartDropDown)}
                    activeOpacity={0.7}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'OpenSans-Regular',
                        fontSize: SPACING.SCALE_13,
                        color: '#868686',
                        fontWeight: '600',
                        marginBottom: SPACING.SCALE_10,
                      }}>
                      {selectFilteredValue?.name}{' '}
                    </Text>
                    <Image
                      source={IMAGES.blackDropIcon}
                      resizeMode={'contain'}
                      style={{
                        height: SPACING.SCALE_10,
                        width: SPACING.SCALE_10,
                        marginTop: SPACING.SCALE_1,
                        marginBottom: SPACING.SCALE_10,
                      }}
                    />
                  </TouchableOpacity>
                  {isChartDropDown ? (
                    <View
                      style={{
                        position: 'absolute',
                        zIndex: 3,
                        right: SPACING.SCALE_7,
                        backgroundColor: '#F0F2FA',
                        top: SPACING.SCALE_24,
                        borderBottomLeftRadius: SPACING.SCALE_8,
                        borderBottomRightRadius: SPACING.SCALE_8,
                        borderTopLeftRadius: SPACING.SCALE_8,
                        borderWidth: SPACING.SCALE_2,
                        borderColor: COLORS.themeColor,
                      }}>
                      {selectKey?.map((item, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              setSelectFilteredValue(item);
                              setIsChartDropDown(false);
                            }}
                            activeOpacity={0.7}
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                marginHorizontal: SPACING.SCALE_15,
                                marginVertical: SPACING.SCALE_10,
                                fontSize: SPACING.SCALE_13,
                              }}>
                              {item?.name}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  ) : null}
                </View>
                <View>
                  <Chartdemo />
                </View>
              </View>
            ) : null}
            <Spacer height={isSelf ? 20 : 0} />
            {/* horizontal watcehs */}
            {isSelf ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: '100%',
                }}>
                <View
                  style={{
                    width: '44%',
                  }}>
                  <SubmitButton
                    disabled={
                      productDetailData?.data?.product_status === 'sold out'
                    }
                    onPress={() => {
                      onChangeProductStatus({
                        product_id: productDetailData?.data?.id,
                        product_status: 'sold_out',
                      }).then(res => {
                        if (res?.type.includes('fulfilled')) {
                          if (props.route?.params?.product_id) {
                            dispatch(
                              exploreProductDetail({
                                product_id: props?.route?.params?.product_id,
                              }),
                            );
                          }
                          showAlert({
                            title: 'Success !',
                            message: 'Product status changed as sold.',
                          });
                        } else if (res?.type.includes('rejected')) {
                          showAlert({
                            title: 'Server error !',
                          });
                        }
                      });
                    }}
                    lable="Mark as sold"
                  />
                </View>
                <Spacer width={'2%'} />
                <View
                  style={{
                    width: '44%',
                  }}>
                  <SubmitButton
                    onPress={() => {
                      if (productDetailData?.data?.id) {
                        props.navigation.navigate(RoutesName.VIEW_INSIGHTS, {
                          productId: productDetailData?.data?.id,
                        });
                      }
                    }}
                    type="outlined"
                    lable="View Insights"
                  />
                </View>
              </View>
            ) : (
              <View>
                <View
                  style={{
                    marginTop: SPACING.SCALE_25,
                    zIndex: -2,
                    // backgroundColor: 'red',
                  }}>
                  <Text
                    style={{
                      marginLeft: SPACING.SCALE_20,
                      fontSize: SPACING.SCALE_20,
                      color: COLORS.BLACK,
                      fontWeight: 'bold',
                    }}>
                    Suggested watches for you
                  </Text>
                  <Spacer height={SPACING.SCALE_13} />

                  {productDetailData?.data?.suggested_data?.length != 0 ? (
                    <View style={{marginLeft: SPACING.SCALE_14}}>
                      <FlatList
                        data={productDetailData?.data?.suggested_data}
                        horizontal={true}
                        renderItem={({item, index}) => {
                          console.log('Product_item======>>>>>>', item);
                          return <ProductCardChecklogin item={item} />;
                        }}
                      />
                    </View>
                  ) : (
                    // <ProductViewComponent
                    //   data={productDetailData?.data?.suggested_data}
                    // />
                    <View
                      style={{alignItems: 'center', justifyContent: 'center'}}>
                      <Text>No Suggested watches</Text>
                    </View>
                  )}
                </View>

                {/* make an offer and chat button */}
                {/* <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 20,
                    marginHorizontal: 20,
                    justifyContent: 'space-evenly',
                    backgroundColor: 'red',
                  }}>
                  <Custombutton
                    onPress={() => {
                      if (
                        authReducer?.userProfileDetails?.email === 'swi@swi.com'
                      ) {
                        LoginAlertCheck(dispatch);
                      } else {
                        NavigationService.navigate(
                          RoutesName.CHAT_DETAIL_SCREEN,
                          {
                            chat_item: {
                              product_id: productDetailData?.data?.id,
                              user_id: productDetailData?.data?.user?.id,
                              sender_id: authReducer?.userProfileDetails?.id,
                              id: 0,
                              user_image: productDetailData?.data?.user?.image,
                              user_name:
                                productDetailData?.data?.user?.user_id_tag,
                            },
                            isOffer: true,
                          },
                        );
                      }
                    }}
                    title="Make Offer"
                    height={SPACING.SCALE_50}
                    width={SPACING.SCALE_160}
                  />
                  <Custombutton2
                    onPress={() => {
                      if (
                        authReducer?.userProfileDetails?.email === 'swi@swi.com'
                      ) {
                        LoginAlertCheck(dispatch);
                      } else {
                        NavigationService.navigate(
                          RoutesName.CHAT_DETAIL_SCREEN,
                          {
                            chat_item: {
                              product_id: productDetailData?.data?.id,
                              user_id: productDetailData?.data?.user?.id,
                              sender_id: authReducer?.userProfileDetails?.id,
                              id: 0,
                              user_image: productDetailData?.data?.user?.image,
                              user_name:
                                productDetailData?.data?.user?.user_id_tag,
                            },
                          },
                        );
                      }
                    }}
                    title="Chat"
                    //marginTop={50}
                    height={SPACING.SCALE_50}
                    width={SPACING.SCALE_160}
                    // marginHorizontal={20}
                    // onPress={() => {
                    // // Alert.alert('Chat');
                    // }}
                  />
                </View> */}

                {/* Compare PriceAlert */}

                <View
                  style={{
                    flexDirection: 'row',
                    //justifyContent: 'space-evenly',
                    marginTop: 20,
                    marginBottom: 20,
                    //backgroundColor: 'green',
                    width: '90%',
                    alignSelf: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      //backgroundColor: 'red',
                      width: '50.3%',
                      alignItems: 'center',
                    }}>
                    {console.log(
                      'Test===',
                      addToCompareReducer?.productCompareList?.some(
                        item => item.id == props?.route?.params?.product_id,
                      ),
                    )}
                    {!addToCompareReducer?.productCompareList?.some(
                      item => item.id == props?.route?.params?.product_id,
                    ) ? (
                      <>
                        <Image source={IMAGES.CompareImage} />
                        <TouchableOpacity
                          onPress={() => {
                            if (
                              authReducer?.userProfileDetails?.email ===
                              'swi@swi.com'
                            ) {
                              LoginAlertCheck(dispatch);
                            } else {
                              if (
                                addToCompareReducer?.productCompareList
                                  ?.length >= 4
                              ) {
                                showAlert({
                                  title: 'Alert',
                                  message:
                                    'You can not add more than four products.',
                                });
                                navigation.navigate(
                                  RoutesName.ITEM_COMPARISON,
                                  {
                                    product_id:
                                      props?.route?.params?.product_id,
                                  },
                                );
                              } else {
                                if (
                                  props?.route?.params?.product_id &&
                                  productDetailData?.data
                                ) {
                                  if (
                                    addToCompareReducer?.productCompareList
                                      .length >= 1
                                  ) {
                                    onAddToProductCompare(
                                      productDetailData?.data,
                                    );
                                    navigation.navigate(
                                      RoutesName.ITEM_COMPARISON,
                                      {
                                        product_id:
                                          props?.route?.params?.product_id,
                                      },
                                    );
                                  } else {
                                    onAddToProductCompare(
                                      productDetailData?.data,
                                    );
                                    showAlert({
                                      title: 'Alert',
                                      message: 'Add more products to compare.',
                                    });
                                  }
                                }
                              }
                            }
                          }}>
                          <Text
                            style={{
                              marginLeft: 0,
                              fontSize: 20,
                              fontFamily: 'Cabin-SemiBold',
                              color: '#868686',
                            }}>
                            Compare
                          </Text>
                        </TouchableOpacity>
                      </>
                    ) : (
                      <Text style={{color: 'green'}}>
                        Product Added{'\n'} in compare list
                      </Text>
                    )}
                  </View>
                  <View
                    style={{
                      height: 40,
                      width: 1,
                      backgroundColor: 'gray',
                      flexShrink: 1,
                    }}
                  />
                  <View
                    style={{
                      width: '48%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {authReducer?.userProfileDetails?.email ===
                    'swi@swi.com' ? (
                      <Pressable
                        onPress={() => {
                          LoginAlertCheck(dispatch);
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Cabin-SemiBold',
                            color: COLORS.HYPERLINK,
                            fontSize: 20,
                          }}>
                          Price Alert
                        </Text>
                      </Pressable>
                    ) : (
                      <Pressable
                        onPress={() => {
                          // Alert.alert("Price");
                          setIsModalVisible(true);
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Cabin-SemiBold',
                            color: COLORS.HYPERLINK,
                            fontSize: 20,
                          }}>
                          Price Alert
                        </Text>
                      </Pressable>
                    )}

                    {/* <ModalComp
                    visible={isModalVisible}
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                    onBackdropPress={() => setIsModalVisible(false)}
                  >
                    <View style={{
                      backgroundColor: "white",

                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                      padding: 16
                    }}>
                    </View>
                  </ModalComp> */}

                    <Modal
                      animationOut={SlideOutDown}
                      visible={isModalVisible}
                      onRequestClose={closeModal}
                      style={{justifyContent: 'flex-end', margin: 0}}>
                      <Pressable
                        style={{flex: 1, backgroundColor: '#00000030'}}
                        onPress={closeModal}>
                        <View />
                      </Pressable>

                      <View
                        style={{
                          // height: '45%',
                          backgroundColor: '#ffffff',
                          borderRadius: 10,
                          bottom: 0,

                          // backgroundColor: 'red'
                        }}>
                        {/* <TouchableWithoutFeedback onPress={closeModal}> */}
                        <TouchableWithoutFeedback>
                          <View
                            style={{
                              backgroundColor: 'white',
                              borderRadius: 10,
                            }}>
                            <View>
                              <View
                                style={{
                                  marginTop: SPACING.SCALE_20,
                                  marginHorizontal: SPACING.SCALE_10,
                                }}>
                                <Pressable onPress={closeModal}>
                                  <CustomIcon
                                    origin={ICON_TYPE.ENTYPO}
                                    name={'cross'}
                                    color={'black'}
                                    size={SPACING.SCALE_30}
                                  />
                                </Pressable>
                                {/* <View style={{ height: 2, width: '100%', backgroundColor: '#00000030' }} /> */}

                                <Text
                                  style={{
                                    fontFamily: 'OpenSans-Regular',
                                    color: 'black',
                                    fontSize: SPACING.SCALE_30,
                                    marginBottom: SPACING.SCALE_10,
                                    marginVertical: SPACING.SCALE_10,
                                    alignSelf: 'center',
                                  }}>
                                  Set Price Alert
                                </Text>
                                {console.log(
                                  '=============hsdbjahb',
                                  productDetailData?.data,
                                )}

                                {productDetailData?.data?.alert === true ? (
                                  <View style={{justifyContent: 'flex-start'}}>
                                    <Text
                                      style={{
                                        fontFamily: 'OpenSans-Regular',
                                        color: 'black',
                                        fontSize: SPACING.SCALE_14,
                                        textAlign: 'left',
                                        marginTop: SPACING.SCALE_10,
                                      }}>
                                      You will be notified when price of this
                                      product is equal to or less than {'\n'}
                                      <Text
                                        style={{
                                          fontFamily: 'OpenSans-Regular',
                                          color: COLORS.HYPERLINK,
                                          fontSize: SPACING.SCALE_26,
                                        }}>
                                        {' S$ '}
                                        {formatNumberWithCommas(Max_Value)}
                                      </Text>
                                    </Text>
                                  </View>
                                ) : (
                                  <View style={{justifyContent: 'flex-start'}}>
                                    <View>
                                      <>
                                        <CustomText
                                          style={{
                                            color: '#7C7C7C',
                                            fontFamily: 'OpenSans-SemiBold',
                                            fontSize: SPACING.SCALE_16,
                                            color: 'black',
                                          }}>
                                          Watch Condition
                                        </CustomText>
                                        <Spacer height={10} />
                                        <View
                                          style={{
                                            flexDirection: 'row',
                                            // left: 0,
                                            // backgroundColor: 'red',
                                          }}>
                                          <SubmitButton
                                            lable="Brand New"
                                            mode={
                                              watchCondition === 'brand_new'
                                                ? 'contained'
                                                : 'outlined'
                                            }
                                            buttonColor={
                                              watchCondition === 'brand_new'
                                                ? '#00958C'
                                                : 'transparent'
                                            }
                                            onPress={() =>
                                              setWatchCondition('brand_new')
                                            }
                                            textColor={
                                              watchCondition === 'brand_new'
                                                ? 'white'
                                                : '#00958C'
                                            }
                                            buttonStyle={{
                                              borderRadius: 50,
                                              height: 40,
                                              borderColor:
                                                watchCondition === 'brand_new'
                                                  ? 'white'
                                                  : '#00958C',
                                            }}
                                          />
                                          <Spacer width={SPACING.SCALE_14} />
                                          <SubmitButton
                                            onPress={() =>
                                              setWatchCondition('pre_owned')
                                            }
                                            lable="Pre-Owned"
                                            mode={
                                              watchCondition === 'pre_owned'
                                                ? 'contained'
                                                : 'outlined'
                                            }
                                            buttonColor={
                                              watchCondition === 'pre_owned'
                                                ? '#00958C'
                                                : 'transparent'
                                            }
                                            textColor={
                                              watchCondition === 'pre_owned'
                                                ? 'white'
                                                : '#00958C'
                                            }
                                            buttonStyle={{
                                              borderRadius: 50,
                                              height: 40,
                                              borderColor:
                                                watchCondition === 'pre_owned'
                                                  ? 'white'
                                                  : '#00958C',
                                            }}
                                          />
                                        </View>
                                      </>
                                      <Spacer height={30} />
                                    </View>
                                    <View style={{}}>
                                      <List.AccordionGroup>
                                        <List.Accordion
                                          titleStyle={{
                                            color: '#7C7C7C',
                                            fontFamily: 'OpenSans-SemiBold',
                                            fontSize: SPACING.SCALE_16,
                                            color: 'black',
                                          }}
                                          title="Accesseries"
                                          id="1">
                                          <View>
                                            {productReducer?.getAllProductDropdown?.ACCESSORIES?.map(
                                              (option, index) => {
                                                return (
                                                  <View
                                                    key={index}
                                                    style={{
                                                      flexDirection: 'row',
                                                      alignItems: 'center',
                                                    }}>
                                                    <RadioButton
                                                      value={option.name}
                                                      status={
                                                        selectedValue ===
                                                        option.id
                                                          ? 'checked'
                                                          : 'unchecked'
                                                      }
                                                      onPress={() =>
                                                        handlePress(option.id)
                                                      }
                                                    />
                                                    <TouchableOpacity
                                                      onPress={() =>
                                                        handlePress(option.id)
                                                      }>
                                                      <Text
                                                        style={{
                                                          maxWidth: width * 0.9,
                                                          fontFamily:
                                                            'OpenSans-Regular',
                                                          color: 'black',
                                                          fontSize:
                                                            SPACING.SCALE_14,
                                                        }}>
                                                        {option.name}
                                                      </Text>
                                                    </TouchableOpacity>
                                                  </View>
                                                );
                                              },
                                            )}
                                          </View>
                                        </List.Accordion>
                                      </List.AccordionGroup>
                                    </View>
                                    <View>
                                      <Text
                                        style={{
                                          color: '#7C7C7C',
                                          fontFamily: 'OpenSans-SemiBold',
                                          fontSize: SPACING.SCALE_16,
                                          color: 'black',
                                        }}>
                                        Price
                                      </Text>
                                      <Text
                                        style={{
                                          fontFamily: 'OpenSans-Regular',
                                          color: 'black',
                                          fontSize: SPACING.SCALE_14,
                                          textAlign: 'left',
                                          marginTop: SPACING.SCALE_10,
                                        }}>
                                        Notify me, when price of this product is
                                        equal to or less than{' '}
                                        <Text
                                          style={{
                                            fontFamily: 'OpenSans-Regular',
                                            color: COLORS.HYPERLINK,
                                            fontSize: SPACING.SCALE_26,
                                          }}>
                                          {'S$'}
                                          {formatNumberWithCommas(FieldValue)}
                                        </Text>
                                      </Text>
                                    </View>
                                  </View>
                                )}

                                <Spacer height={50} />

                                {productDetailData?.data?.alert ===
                                true ? null : (
                                  <Slider
                                    style={{marginBottom: 20}}
                                    minimumValue={0}
                                    maximumValue={Number(productPriceData)}
                                    minimumTrackTintColor={'#000'}
                                    maximumTrackTintColor="#000000"
                                    // step={1}

                                    value={FieldValue}
                                    onValueChange={val => {
                                      // const integerValue = Math.round(val);
                                      setFieldValue(val);
                                      // console.log(integerValue, 'ggkdlm');
                                    }}
                                  />
                                )}

                                <View>
                                  {productDetailData?.data?.alert === true ? (
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginBottom: SPACING.SCALE_30,
                                      }}>
                                      <Pressable
                                        style={{
                                          height: 50,
                                          width: 150,
                                          backgroundColor: 'black',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          borderRadius: 30,
                                        }}
                                        onPress={closeModal}>
                                        <Text
                                          style={{
                                            color: 'white',
                                            fontSize: 16,
                                            fontFamily: 'OpenSans-Semibold',
                                          }}>
                                          Cancel
                                        </Text>
                                      </Pressable>
                                      <Pressable
                                        style={{
                                          height: 50,
                                          width: 150,
                                          backgroundColor: COLORS.HYPERLINK,
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          borderRadius: 30,
                                        }}
                                        onPress={() => {
                                          if (productDetailData?.data?.id) {
                                            removePriceAlert(
                                              productDetailData?.data?.id,
                                            ).then(res => {
                                              if (
                                                res?.payload?.message ===
                                                'Price Alert for Product removed'
                                              ) {
                                                showAlert({
                                                  title: 'Success',
                                                  message:
                                                    res?.payload?.message,
                                                });
                                                setIsModalVisible(false);
                                                setFieldValue(0);
                                                if (
                                                  props.route?.params
                                                    ?.product_id
                                                ) {
                                                  dispatch(
                                                    exploreProductDetail({
                                                      product_id:
                                                        props.route.params
                                                          .product_id,
                                                    }),
                                                  );
                                                }
                                              } else {
                                                showAlert({
                                                  title: 'Error',
                                                  message:
                                                    'Somthing went wrong',
                                                });
                                                setIsModalVisible(false);
                                              }
                                            });
                                          }
                                        }}>
                                        <Text
                                          style={{
                                            color: 'white',
                                            fontSize: 16,
                                            fontFamily: 'OpenSans-Semibold',
                                          }}>
                                          UnSubscribe
                                        </Text>
                                      </Pressable>
                                    </View>
                                  ) : (
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginBottom: SPACING.SCALE_30,
                                        // backgroundColor: 'red'
                                      }}>
                                      <Pressable
                                        style={{
                                          height: 50,
                                          width: 150,
                                          backgroundColor: 'black',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          borderRadius: 30,
                                        }}
                                        onPress={closeModal}>
                                        <Text
                                          style={{
                                            color: 'white',
                                            fontSize: 16,
                                            fontFamily: 'OpenSans-Semibold',
                                          }}>
                                          Cancel
                                        </Text>
                                      </Pressable>
                                      <Pressable
                                        style={{
                                          height: 50,
                                          width: 150,
                                          backgroundColor: COLORS.HYPERLINK,
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          borderRadius: 30,
                                        }}
                                        onPress={() => {
                                          if (
                                            authReducer?.userProfileDetails
                                              ?.email === 'swi@swi.com'
                                          ) {
                                            LoginAlertCheck(dispatch);
                                          } else {
                                            if (productDetailData?.data?.id) {
                                              addPriceAlert({
                                                ...newObject,
                                                id: productDetailData?.data?.id,
                                              }).then(res => {
                                                if (
                                                  res?.payload?.message ===
                                                  'Price Alert for Product created'
                                                ) {
                                                  showAlert({
                                                    title: 'Success',
                                                    message:
                                                      res?.payload?.message,
                                                  });
                                                  setIsModalVisible(false);
                                                  if (
                                                    props.route?.params
                                                      ?.product_id
                                                  ) {
                                                    dispatch(
                                                      exploreProductDetail({
                                                        product_id:
                                                          props.route.params
                                                            .product_id,
                                                      }),
                                                    );
                                                  }
                                                } else {
                                                  showAlert({
                                                    title: 'Error',
                                                    message:
                                                      'Somthing went wrong!',
                                                  });
                                                  setIsModalVisible(false);
                                                }
                                              });
                                            }
                                          }
                                        }}>
                                        <Text
                                          style={{
                                            color: 'white',
                                            fontSize: 16,
                                            fontFamily: 'OpenSans-Semibold',
                                          }}>
                                          Confirm
                                        </Text>
                                      </Pressable>
                                    </View>
                                  )}
                                </View>
                              </View>
                            </View>
                          </View>
                        </TouchableWithoutFeedback>
                      </View>
                    </Modal>
                    {/* <TouchableOpacity
                    onPress={() => {


                      if (
                        authReducer?.userProfileDetails?.email ===
                        'swi@swi.com'
                      ) {
                        LoginAlertCheck(dispatch);
                      } else {

                        ModalComponent()
                        // if (productDetailData?.data?.id) {
                        //   addPriceAlert(productDetailData?.data?.id).then(
                        //     res => {
                        //       if (
                        //         res?.payload?.message ===
                        //         'Price Alert for Product created'
                        //       ) {
                        //         showAlert({
                        //           title: 'Success',
                        //           message: res?.payload?.message,
                        //         });
                        //         if (props.route?.params?.product_id) {
                        //           dispatch(
                        //             exploreProductDetail({
                        //               product_id:
                        //                 props.route.params.product_id,
                        //             }),
                        //           );
                        //         }
                        //       } else {
                        //         showAlert({
                        //           title: 'Error',
                        //           message: 'Somthing went wrong!',
                        //         });
                        //       }
                        //     },
                        //   );
                        // }
                      }
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Cabin-SemiBold',
                        color: COLORS.HYPERLINK,
                      }}>
                      Price Alert
                    </Text>
                  </TouchableOpacity> */}
                  </View>
                </View>
              </View>
            )}

            {/* {selectedVideo.visible && (
            <Modal
              style={{
                flex: 1,
                backgroundColor: '#000000',
                paddingBottom: 20,
              }}
              visible={selectedVideo.visible}
              presentationStyle="fullScreen"
              onRequestClose={() => {
                setVideoLoading(true);
                setIsVideoPause(false);
                setSelectedVideo({
                  visible: false,
                  uri: '',
                });
              }}
              supportedOrientations={['portrait']}
              hardwareAccelerated>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#000000',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    padding: 20,
                    flexDirection: 'row-reverse',
                  }}>
                  <Pressable
                    onPress={() => {
                      setVideoLoading(true);
                      setIsVideoPause(false);
                      setSelectedVideo({
                        visible: false,
                        uri: '',
                      });
                    }}>
                    <CustomIcon
                      name={'close'}
                      origin={ICON_TYPE.MATERIAL_ICONS}
                      size={25}
                      color={'#fff'}
                    />
                  </Pressable>
                </View>
                <Pressable
                  style={{ flex: 1 }}
                  onPress={() => {
                    setIsVideoPause(!isVideoPause);
                  }}>
                  <Video
                    ref={videoRef}
                    source={{ uri: selectedVideo.uri }} // Replace with your video URL
                    style={{ flex: 1 }}
                    controls
                    paused={isVideoPause}
                    resizeMode="contain"
                    onLoad={() => {
                      setVideoLoading(false);
                    }}
                  />
                </Pressable>
                {videoLoading && (
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      position: 'absolute',
                      alignSelf: 'center',
                    }}>
                    <ActivityIndicator size={30} color={'#fff'} />
                  </View>
                )}
                {isVideoPause && (
                  <Pressable
                    onPress={() => {
                      setIsVideoPause(!isVideoPause);
                    }}
                    style={{
                      height: 50,
                      width: 50,
                      position: 'absolute',
                      alignSelf: 'center',
                    }}>
                    <CustomIcon
                      name={'pause'}
                      origin={ICON_TYPE.MATERIAL_ICONS}
                      size={40}
                    />
                  </Pressable>
                )}
              </View>
            </Modal>
          )} */}
          </ScrollView>
          {isSelf ? null : (
            <View
              style={{
                flexDirection: 'row',
                marginVertical: moderateScaleVertical(10),
                // marginHorizontal: moderateScale(10),
                justifyContent: 'space-evenly',
                //  backgroundColor: 'red',
              }}>
              <Custombutton
                onPress={() => {
                  if (
                    authReducer?.userProfileDetails?.email === 'swi@swi.com'
                  ) {
                    LoginAlertCheck(dispatch);
                  } else {
                    NavigationService.navigate(RoutesName.CHAT_DETAIL_SCREEN, {
                      chat_item: {
                        product_id: productDetailData?.data?.id,
                        user_id: productDetailData?.data?.user?.id,
                        sender_id: authReducer?.userProfileDetails?.id,
                        id: 0,
                        user_image: productDetailData?.data?.user?.image,
                        user_name: productDetailData?.data?.user?.user_id_tag,
                      },
                      isOffer: true,
                    });
                  }
                }}
                title="Make Offer"
                height={SPACING.SCALE_50}
                width={SPACING.SCALE_160}
              />
              <Custombutton2
                onPress={() => {
                  if (
                    authReducer?.userProfileDetails?.email === 'swi@swi.com'
                  ) {
                    LoginAlertCheck(dispatch);
                  } else {
                    NavigationService.navigate(RoutesName.CHAT_DETAIL_SCREEN, {
                      chat_item: {
                        product_id: productDetailData?.data?.id,
                        user_id: productDetailData?.data?.user?.id,
                        sender_id: authReducer?.userProfileDetails?.id,
                        id: 0,
                        user_image: productDetailData?.data?.user?.image,
                        user_name: productDetailData?.data?.user?.user_id_tag,
                      },
                    });
                  }
                }}
                title="Chat"
                //marginTop={50}
                height={SPACING.SCALE_50}
                width={SPACING.SCALE_160}
                // marginHorizontal={20}
                // onPress={() => {
                // // Alert.alert('Chat');
                // }}
              />
            </View>
          )}
        </View>
      ) : (
        <Loader size={20} />
      )}
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    authReducer: state?.authReducer,
    addToCompareReducer: state?.addToCompareReducer,
    exploreProduct: state?.exploreProductReducer,
    productReducer: state?.productReducer,
  };
};

const mapDispatchToProps = dispatch => ({
  onAddToProductCompare: params => dispatch(onAddToProductCompare(params)),
  onChangeProductStatus: params => dispatch(changeProductStatusAction(params)),
  addPriceAlert: params => dispatch(addPriceAlert(params)),
  removePriceAlert: params => dispatch(removePriceAlert(params)),
  addProductInterestList: params => dispatch(addProductInterestList(params)),
  addWishListAction: params => dispatch(addWishListAction(params)),
  getWishList: params => dispatch(wishlistAction()),
  getAllProductDropdown: params => dispatch(getAllProductDropdownAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
// function to check is user logged in or not
export function LoginAlertCheck(dispatch) {
  showAlert({
    title: 'Alert',
    message: 'Please log in to use the app.',
    actions: [
      {
        text: 'Log in',
        style: 'default',
        onPress: () => {
          dispatch(logoutAction());
          // Code to run when the "Confirm" button is pressed
        },
      },
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: () => {},
      },
    ],
  });
}
