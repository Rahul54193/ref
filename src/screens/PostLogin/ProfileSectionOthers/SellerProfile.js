import {
  Alert,
  FlatList,
  Image,
  Keyboard,
  Linking,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Avatar, Divider, List} from 'react-native-paper';
import {
  CustomIcon,
  CustomInput,
  CustomText,
  Custombutton,
  Spacer,
  SubmitButton,
} from '@app/components';
import {AssestsConst, FontsConst} from '@app/assets/assets';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {FONTS, IMAGES, SPACING} from '@app/resources';
import {AirbnbRating, Rating} from 'react-native-ratings';
import {AboutRow, GetAboutRow, PostFollowVisitor, getAboutRow} from './common';
import ClearableSearch from '@app/screens/atoms/ClearableSearch';
import PageTitle from '@app/screens/atoms/PageTitle';
import {EmptyList} from '../ChatScreen/commn';
import ProductCard from '@app/screens/atoms/ProductCard';
import {RoutesName} from '@app/helper/strings';
import {addEllipsis, showAlert} from '@app/helper/commonFunction';
import useDebounce from '@app/hooks/useDebounce';
import branch from 'react-native-branch';
import Banner from './EditProfile/common/Banner';
import moment from 'moment';
import fonts from '@app/resources/fonts';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {FONT_SIZE_11, FONT_SIZE_14} from '@app/resources/typography';
import {useDispatch, useSelector} from 'react-redux';
import {LoginAlertCheck} from '.';

const SellerProfile = props => {
  // console.log(props, '---sdasfadfafasf-->>>');
  const {
    route,
    navigation,
    profileSectionReducer,
    isSelf,
    onChangeProductStatus,
    getProfileListing,
    onWishlistClick,
    onClickFollow,
    exploreProductReducer,
  } = props;
  const [activeTab, setActiveTab] = useState('Listings');
  const [search, setSearch] = useState('');
  const userDetail = profileSectionReducer?.profileAbout;
  const [isFilter, setIsFilter] = useState(false);
  const query = useDebounce(search);
  const dispatch = useDispatch();
  const buoRef = useRef();
  const authReducer = useSelector(state => state.authReducer);
  const [NewList, setNewList] = useState([]);
  // console.log(
  //   route?.params?.userId,
  //   'user details ===============>>>>>>>>>>>>',
  // );

  // console.log(
  //   '>>>>>>>>>>>!!!@@@',
  //   props?.profileSectionReducer?.sellerProductListing,
  // );

  const currentDate = moment(new Date()).format('DD-MM-YYYY');
  const announcementDate = moment(
    userDetail?.additional_info?.announcement_end,
  ).format('DD-MM-YYYY');

  const announcemnetVisble = announcementDate >= currentDate;

  useEffect(() => {
    const activeItems =
      props?.profileSectionReducer?.sellerProductListing.filter(
        item => item.status === 'active',
      );

    // Set 'newList' after filtering is complete.
    setNewList(activeItems);
  }, [props?.profileSectionReducer?.sellerProductListing]);

  console.log('ASDSADSADFSDFA33333333333', userDetail?.user_id_tag);

  useEffect(() => {
    if (!userDetail.id == 0) {
      getProfileListing({userId: route?.params?.userId, keyword: query});
      return () => {
        if (buoRef.current) {
          console.log('buo release');
          buoRef.current?.release();
        }
      };
    }
  }, [query]);

  console.log(
    'USEr Details ========1234>',
    userDetail?.additional_info?.announcement_end,
  );
  const BrandList = props?.exploreProductReducer?.brandList;

  console.log('ProductList ========>', props?.route?.params);

  const onSharePerson = async () => {
    let linkProperties = {
      feature: 'share',
      channel: 'RNApp',
      campaign: `User ID - ${userDetail.id}`,
    };
    let shareOptions = {
      messageHeader: 'Visit my profile',
      messageBody: 'Visit my profile for more details.',
    };
    let controlParams = {
      $desktop_url: 'https://www.sgwatchinsider.com/',
    };

    buoRef.current = await branch.createBranchUniversalObject(
      `user/${userDetail.id}`,
      {
        title: 'Product Title',
        contentDescription: 'Product Description',
        canonicalUrl: '',
        contentMetadata: {
          customMetadata: {
            userID: `${userDetail.id}`,
          },
        },
      },
    );
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
  const validationSchema = Yup.object({
    min_price: Yup.number()
      .nullable()
      .typeError('Please enter a valid number.'),
    max_price: Yup.number()
      .nullable()
      .typeError('Please enter a valid number.'),
  });
  const initialState = {
    min_price: null,
    max_price: null,
    brands: null,
  };
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
    initialValues: initialState,
    validationSchema: validationSchema,
    onSubmit: async (val, {setErrors}) => {
      console.log('val', val);
      try {
        Keyboard.dismiss();
        const obj = {};
        (values.brands ?? []).forEach((element, index) => {
          obj[`brand_id[${index}]`] = element;
        });
        const props = {
          userId: userDetail.id,
          min_price: values.min_price,
          max_price: values.max_price,
          ...obj,
        };
        console.log('hhhh', props);

        getProfileListing(props).then(res => {
          console.log(res, 'response from get profile listing');
          setIsFilter(false);
        });
      } catch (error) {
        setErrors({serverError: err.message});
      }
    },
  });

  const getFilter = () => {
    return (
      <Modal
        animationType="slide"
        transparent
        onDismiss={() => setIsFilter(!isFilter)}
        visible={isFilter}>
        <View style={{flex: 1, backgroundColor: '#00000030'}}>
          <Pressable
            onPress={() => {
              setIsFilter(!isFilter);
            }}
            style={{height: '30%'}}>
            <View />
          </Pressable>
          <View
            style={{
              borderRadius: 10,
              backgroundColor: 'white',
              height: '70%',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 20,
              }}>
              <Text
                style={{
                  fontFamily: FONTS.Cabin_SemiBold,
                  fontSize: 20,
                  color: '#000000',
                }}>
                Filter
              </Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <View style={{justifyContent: 'center', width: '45%'}}>
                <CustomInput
                  title="Min Price"
                  placeholder="Min Price"
                  value={values.min_price}
                  // leftIconAffix ={<TextInput}
                  keyboardType="email-address"
                  onChangeText={handleChange('min_price')}
                  error={errors?.min_price && touched?.min_price}
                  errorText={errors?.min_price}
                  leftIconAffix={<TextInput.Affix text="$" />}
                  onBlur={handleBlur('min_price')}
                />
              </View>
              <Spacer width={10} />
              <View style={{justifyContent: 'center', width: '45%'}}>
                <CustomInput
                  title="Max Price"
                  placeholder="Max Price"
                  keyboardType="email-address"
                  returnKeyType="next"
                  onChangeText={handleChange('max_price')}
                  value={values.max_price}
                  onBlur={handleBlur('max_price')}
                  error={errors?.max_price && touched?.max_price}
                  errorText={errors?.max_price}
                  leftIconAffix={<TextInput.Affix text="$" />}
                />
              </View>
            </View>
            <ScrollView>
              <View>
                <List.Accordion
                  titleStyle={{
                    color: '#636363',
                  }}
                  title="Brands"
                  id="1">
                  {BrandList.map(item => {
                    //  console.log('itemABC', item);
                    return (
                      // <Text>{item.name}</Text>
                      <List.Item
                        key={'key - ' + item?.id}
                        title={item?.name}
                        onPress={() => {
                          let arr = values.brands ?? [];
                          if (!arr.includes(item.id)) {
                            arr.push(item.id);
                          } else {
                            arr.splice(arr.indexOf(item.id), 1);
                          }
                          setFieldValue('brands', arr);
                        }}
                        left={props => (
                          <List.Icon
                            {...props}
                            icon={() => (
                              <CustomIcon
                                origin={ICON_TYPE.MATERIAL_ICONS}
                                name={
                                  (values.brands ?? []).includes(item.id)
                                    ? 'check-box'
                                    : 'check-box-outline-blank'
                                }
                                color={
                                  (values.brands ?? []).includes(item.id)
                                    ? '#00958C'
                                    : '#868686'
                                }
                                size={20}
                              />
                            )}
                          />
                        )}
                      />
                    );
                  })}
                </List.Accordion>
              </View>
            </ScrollView>
            <View>
              <SubmitButton lable="Apply" onPress={handleSubmit} />
            </View>
            <Spacer width={10} />
          </View>
        </View>
      </Modal>
    );
  };

  const getListings = () => {
    const renderItem = ({item, index}) => {
      console.log('%%%%%%%%%%%%%%%%KKKKKKKK', item);
      return (
        <ProductCard
          key={index}
          item={item}
          isActionButton={true}
          onSoldClick={() => {
            onChangeProductStatus({
              product_id: item.id,
              product_status: 'sold_out',
            }).then(res => {
              if (res?.type.includes('fulfilled')) {
                getProfileListing({userId: userDetail.id});
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
          onReservedClick={() => {
            onChangeProductStatus({
              product_id: item.id,
              product_status: 'reserved',
            }).then(res => {
              if (res?.type.includes('fulfilled')) {
                getProfileListing({userId: userDetail.id});
                showAlert({
                  title: 'Success !',
                  message: 'Product status changed as reserved.',
                });
              } else if (res?.type.includes('rejected')) {
                showAlert({
                  title: 'Server error !',
                });
              }
            });
          }}
          onDeleteClick={() => {
            onChangeProductStatus({
              product_id: item.id,
              product_status: 'deleted',
            }).then(res => {
              if (res?.type.includes('fulfilled')) {
                getProfileListing({userId: userDetail.id});
                showAlert({
                  title: 'Success !',
                  message: 'Product status changed as deleted.',
                });
              } else if (res?.type.includes('rejected')) {
                showAlert({
                  title: 'Server error !',
                });
              }
            });
          }}
        />
      );
    };
    return (
      <View
        style={{
          width: '100%',
          paddingHorizontal: 20,
        }}>
        <ClearableSearch search={search} setSearch={setSearch} />
        <View
          style={{
            flexDirection: 'row',
            // backgroundColor: 'red',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{maxWidth: SPACING.SCALE_300}}>
            <PageTitle
              titleStyle={{fontSize: SPACING.SCALE_17}}
              title={`Watches Posted by ${addEllipsis(userDetail?.name, 15)}`}
            />
          </View>
          {getFilter()}
          <Pressable
            onPress={() => {
              // setIsFilter(true);
              // getFilter();
              setIsFilter(!isFilter);
            }}>
            <CustomIcon
              origin={ICON_TYPE.FEATHER_ICONS}
              name={'filter'}
              color={'#000'}
              style={{marginHorizontal: 20}}
            />
          </Pressable>
        </View>

        <FlatList
          scrollEnabled={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 40,
          }}
          data={NewList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={{
            flex: 1,
            justifyContent: 'flex-start',
            // paddingHorizontal: 10,
            paddingBottom: 10,
          }}
          onEndReachedThreshold={0.3}
          // onEndReached={onLoadMore}
          ListEmptyComponent={EmptyList}
        />
      </View>
    );
  };
  const getAbout = () => {
    return (
      <View
        style={{
          width: '100%',
        }}>
        <Spacer />
        <PostFollowVisitor
          post={userDetail?.total_posts}
          follow={userDetail?.total_followers}
          visitor={userDetail?.visit_count}
        />
        {!isSelf ? (
          <View style={styles.button_container}>
            <View
              style={{
                width: '80%',
              }}>
              <SubmitButton
                lable={userDetail?.isFollowed ? 'Unfollow' : '+ Follow'}
                onPress={onClickFollow}
              />
            </View>
            <Pressable style={styles.sharebutton} onPress={onSharePerson}>
              <CustomIcon
                origin={ICON_TYPE.FEATHER_ICONS}
                name={'share-2'}
                color={'black'}
                size={30}
              />
            </Pressable>
          </View>
        ) : null}
        <GetAboutRow value={`${userDetail?.bio ?? '-'}`} />
        <Divider style={styles.divider} />
        <Spacer height={20} />
        <AboutRow
          title={'Location'}
          value={`${userDetail?.additional_info?.location ?? '-'}`}
        />
        <AboutRow
          title={'Opening Hours'}
          value={
            <View>
              {userDetail?.additional_info?.opening_hours?.map(
                (item, index) => {
                  return (
                    item.isEnable === 'true' && (
                      <CustomText>
                        {item?.lable} - {item?.text}
                      </CustomText>
                    )
                  );
                },
              ) ?? <CustomText>{'-'}</CustomText>}
            </View>
          }
        />
        <AboutRow title={'Contact'} value={`${userDetail?.mobile ?? '-'}`} />
        <Pressable
          onPress={() =>
            Linking.openURL(
              `${`https://`}${userDetail?.additional_info?.website}`,
            )
          }>
          <AboutRow
            title={'Website'}
            value={
              <View style={{maxWidth: SPACING.SCALE_210}}>
                <CustomText style={{color: 'blue', fontSize: SPACING.SCALE_13}}>
                  {`${userDetail?.additional_info?.website ?? '-'}`}
                </CustomText>
              </View>
            }
          />
        </Pressable>

        <AboutRow
          title={'Socials'}
          value={
            <View>
              {userDetail?.additional_info?.social_media?.map((item, index) => {
                return item?.value ? (
                  <Pressable
                    style={{maxWidth: SPACING.SCALE_210}}
                    onPress={() =>
                      Linking.openURL(`${`https://`}${item?.value}`)
                    }>
                    <CustomText
                      style={{
                        color: 'blue',
                        numberOfLines: 3,
                        fontSize: SPACING.SCALE_13,
                      }}>
                      {item?.value}
                    </CustomText>
                  </Pressable>
                ) : (
                  '-'
                );
              }) ?? <CustomText>{'-'}</CustomText>}
            </View>
          }
        />
        <AboutRow
          title={'Payment Mode'}
          value={`${
            userDetail?.additional_info?.payment_method
              ?.filter((item, index) => item.isEnable === 'true')
              ?.map((item, index) => item?.type)
              ?.join(',') ?? '-'
          }`}
        />
        <AboutRow
          title={'Joined since'}
          value={`${
            moment(userDetail?.created_at).format('DD MMMM YYYY') ?? '-'
          }`}
        />
      </View>
    );
  };
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 30,
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: 150,
            width: '100%',
          }}>
          <Image
            source={
              userDetail?.cover_image
                ? {uri: userDetail?.cover_image}
                : IMAGES.coverSellerProfile
            }
            resizeMode="cover"
            style={{
              height: 150,
              width: '100%',
            }}
          />
        </View>
        <View style={styles.profile_container}>
          <Avatar.Image
            source={
              userDetail?.image ? {uri: userDetail?.image} : AssestsConst.AVATAR
            }
            size={100}
          />
        </View>
        <Spacer height={50} />
        <CustomText
          style={{
            fontFamily: FontsConst.Cabin_Bold,
            color: '#000000',
            fontSize: 20,
            alignSelf: 'center',
            paddingHorizontal: 20,
            marginVertical: SPACING.SCALE_5,
          }}>
          {/* {`@${userDetail?.user_id_tag}`} */}
          {userDetail?.name}
        </CustomText>
        {userDetail?.user_id_tag ? (
          <CustomText
            style={{
              // fontFamily: FontsConst.Cabin_Bold,
              color: '#000000',
              fontSize: 16,
              alignSelf: 'center',
              paddingHorizontal: 20,
              marginBottom: SPACING.SCALE_5,
            }}>
            {`@${userDetail?.user_id_tag}`}
            {/* {userDetail?.name} */}
          </CustomText>
        ) : (
          <CustomText
            style={{
              fontFamily: FontsConst.Cabin_Bold,
              color: '#000000',
              fontSize: 20,
              alignSelf: 'center',
              paddingHorizontal: 20,
              marginVertical: SPACING.SCALE_10,
            }}>
            {/* {`@${userDetail?.user_id_tag}`} */}
            {userDetail?.name}
          </CustomText>
        )}
        {userDetail?.premium_user === 'yes' ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={IMAGES.ProfileBadge}
              style={{marginTop: 5, marginRight: 5}}
            />
            <CustomText
              style={{
                fontFamily: FontsConst.Cabin_SemiBold,
                color: '#737373',
                fontSize: 16,
              }}>
              Premium Seller
            </CustomText>
          </View>
        ) : null}
        <Pressable
          onPress={() => {
            if (authReducer?.userProfileDetails?.email === 'swi@swi.com') {
              LoginAlertCheck(dispatch);
            } else {
              navigation?.navigate(RoutesName.REVIEW_RATING_SCREEN, {
                userID: route?.params?.userId,
                //UserIdTag: route?.params?.user_id_tag,
                UserIdTag: userDetail?.user_id_tag,
              });
            }
          }}
          style={styles.ratingcontainer}>
          {/* <AirbnbRating
            count={5}
            showRating={false}
            defaultRating={userDetail?.averageRating}
            isDisabled
            size={15}
            style={{ marginHorizontal: 10 }}
            ratingContainerStyle={{ marginHorizontal: 10 }}
            starContainerStyle={{
              paddingVertical: 10,
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}
          /> */}
          <Rating
            type="star"
            ratingCount={5}
            startingValue={userDetail?.averageRating}
            imageSize={16}
            readonly
            style={{
              marginRight: 6,
            }}
          />
          <CustomText style={styles.reviewText}>
            {userDetail?.count} reviews
          </CustomText>
        </Pressable>
        <View style={styles.varify_container}>
          <CustomText style={styles.verified_text}>Verified :</CustomText>
          {userDetail?.social_id ? (
            <Image source={IMAGES.singpass} style={styles.verifiedImage} />
          ) : null}
          {userDetail?.email ? (
            <Image source={IMAGES.gmail} style={styles.verifiedImage} />
          ) : null}

          {userDetail?.facebook_id ? (
            <Image source={IMAGES.facebook} style={styles.verifiedImage} />
          ) : null}
        </View>
      </View>
      <Spacer height={20} />
      {announcemnetVisble == true ? (
        <Banner bannerData={userDetail?.additional_info?.post_adds ?? []} />
      ) : null}
      <Spacer height={10} />
      {console.log('hsbdahbhjsba', announcemnetVisble)}
      {userDetail?.additional_info?.announcement &&
        announcemnetVisble == true && (
          <View
            style={{
              // height: SPACING.SCALE_124,
              // width: SPACING.SCALE_370,
              backgroundColor: '#4C6AFD',
              marginHorizontal: SPACING.SCALE_20,
              borderRadius: SPACING.SCALE_5,
              marginVertical: SPACING.SCALE_3,
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: '95%',
                borderWidth: SPACING.SCALE_1,
                borderColor: 'white',
                alignSelf: 'center',
                borderRadius: SPACING.SCALE_5,
                borderStyle: 'dashed',
                marginVertical: SPACING.SCALE_8,
              }}>
              <View
                style={{
                  alignSelf: 'center',
                  marginVertical: SPACING.SCALE_15,
                  maxWidth: '85%',
                  // backgroundColor: 'red',
                }}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: FONT_SIZE_14,
                    fontFamily: FONTS.Cabin_SemiBold,
                    textAlign: 'center',
                    // maxWidth: '80%',
                  }}>
                  {userDetail?.additional_info?.announcement}
                </Text>
              </View>
              <View
                style={{
                  width: SPACING.SCALE_150,
                  height: SPACING.SCALE_28,
                  backgroundColor: '#FFFFFF',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  marginBottom: SPACING.SCALE_20,
                }}>
                <Text
                  style={{
                    fontSize: FONT_SIZE_11,
                    fontFamily: FONTS.Cabin_SemiBold,
                    color: '#8B8B8B',
                    textAlign: 'center',
                    marginVertical: 5,
                  }}>
                  Valid Till :{' '}
                  {moment(userDetail?.additional_info?.announcement_end).format(
                    'DD-MM-YYYY',
                  )}
                </Text>
              </View>
            </View>
          </View>
        )}
      {/* <View
        style={{
          justifyContent: 'center',
          alignSelf: 'center',
          marginHorizontal: 20,
        }}>
        <CustomText
          style={{
            color: 'black',
            fontFamily: FONTS.OpenSans_SemiBold,
            fontSize: 16,
          }}
          children={userDetail?.additional_info?.announcement}
        />
      </View> */}
      <Spacer height={20} />
      <View style={styles.tabcontainer}>
        <Pressable
          onPress={() => setActiveTab('Listings')}
          style={styles.getTab(activeTab === 'Listings')}>
          <CustomText style={styles.getTabText(activeTab === 'Listings')}>
            Listings
          </CustomText>
        </Pressable>
        <Pressable
          onPress={() => setActiveTab('About')}
          style={styles.getTab(activeTab === 'About')}>
          <CustomText style={styles.getTabText(activeTab === 'About')}>
            About
          </CustomText>
        </Pressable>
      </View>
      <View
        style={{
          backgroundColor: 'white',
        }}>
        {activeTab === 'Listings' ? getListings() : getAbout()}
      </View>
    </ScrollView>
  );
};

export default SellerProfile;

const styles = StyleSheet.create({
  verifiedImage: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
  },
  profile_container: {
    position: 'absolute',
    top: 100,
    backgroundColor: '#fff',
    height: 104,
    width: 104,
    borderRadius: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  getTab: activeTab => {
    return {
      flex: 1,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomColor: activeTab ? '#00958C' : '#868686',
      borderBottomWidth: activeTab ? 3 : 1,
      paddingBottom: 10,
    };
  },
  getTabText: activeTab => {
    return {
      color: activeTab ? '#00958C' : '#868686',
      fontSize: 17,
      fontFamily: activeTab
        ? FontsConst.OpenSans_Bold
        : FontsConst.OpenSans_Regular,
    };
  },
  tabcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    marginHorizontal: 20,
  },
  ratingcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    width: '80%',
  },
  reviewText: {
    fontFamily: FontsConst.OpenSans_SemiBold,
    color: '#454545',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  verified_text: {
    fontFamily: FontsConst.Cabin_Bold,
    color: '#737373',
    fontSize: 14,
  },
  varify_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sharebutton: {
    width: '20%',
    height: 50,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  divider: {
    width: '90%',
    alignSelf: 'center',
    height: 2,
  },
});
