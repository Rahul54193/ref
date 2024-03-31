/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
import {Container, CustomIcon, CustomText, Spacer} from '@app/components';
import ProductCard from '@app/screens/atoms/ProductCard';
import SearchHeader from '@app/screens/atoms/SearchHeader';
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
  SectionList,
  RefreshControl,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import Banner from './Banner';
import TrendyWatch from './TrendyWatch';
import {connect, useDispatch} from 'react-redux';
import {
  addWishListAction,
  freshFindsAction,
  getBannerAction,
  getBrandListingAction,
  getTopNotchWatchAction,
  getTrendyWatchAction,
  productSearch,
  searchHistory,
  searchHistoryDelete,
  searchHistoryList,
} from '@app/store/exploreProductSlice';
import {useEffect, useRef, useState} from 'react';
import {LoadingStatus, RoutesName} from '@app/helper/strings';
import useDebounce from '@app/hooks/useDebounce';
import Filter from './Filter';
import useLocation from '@app/hooks/useLocation';
import SearchBarComponent from '@app/components/SearchBarComponent';
import NotificationIndicator from '@app/components/NotificationIndicator';
import {COLORS, IMAGES, SPACING} from '@app/resources';
import {AssestsConst} from '@app/assets/assets';
import {mergeArrays, showAlert} from '@app/helper/commonFunction';
import {
  NotificationCount,
  NotificationCountUpdateAction,
  userProfile,
} from '@app/store/authSlice';
import {Searchbar} from 'react-native-paper';
import useKeyboardVisible from '@app/hooks/useKeyboardVisible';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {setSourceMapRange} from 'typescript';
import {LoginAlertCheck} from '../ProductDetails';

const ExploreScreen = props => {
  const {
    exploreProduct,
    onFreshFinds,
    getBannerList,
    getTrendyWatch,
    getTopNotchWatch,
    onAddWishList,
    getAllBrands,
    getNotificationCount,
    searchHistoryList,
    searchHistory,
    searchHistoryDelete,
    productSearch,
    authReducer,
    userProfile,
    updateNotificationCount,
  } = props;
  const dispatch = useDispatch();
  console.log(authReducer?.userProfileDetails?.email, 'authreducer data');
  const notifyCount = props?.authReducer?.NotificationCountStatus;
  console.log(notifyCount, 'props====>');
  const [searchQuery, onChangeSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [serachToggle, setSearchToggle] = useState(false);
  // for serachin in this page
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [filterActive, setFilterActive] = useState(false);
  const [filterDataForNextPage, setFilterDataForNextPage] = useState(null);
  const [nextPageFilter, setNextPageFilter] = useState(1);

  console.log(
    '===============> Search History',
    props?.exploreProduct?.searchHistoryList,
  );

  const onFocusSearch = () => {
    setIsSearchFocused(true);
  };

  const onBlurSearch = () => {
    setIsSearchFocused(false);
  };

  const [searchQueryNew, setSearchQueryNew] = useState('');

  const onChangeSearchNew = query => {
    //console.log(query);
    setSearchQueryNew(query);
  };
  const isKeyboardVisible = useKeyboardVisible();
  ////==========================

  const [page, setPage] = useState(
    props?.exploreProduct?.topNotchWatchCurrentPage,
  );
  const [topNotchWatch, setTopNotchWatch] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const filterRef = useRef(false);

  const query = useDebounce(searchQuery, 1000);
  const query1 = useDebounce(searchQueryNew, 1000);
  console.log(query1, 'll');

  useEffect(() => {
    getBannerList();
    getTrendyWatch();
    getAllBrands();
    getNotificationCount();
    searchHistoryList();
    // updateNotificationCount();
  }, []);

  useEffect(() => {
    if (refreshing) {
      setFilterDataForNextPage(null);
      setFilterActive(false);
      setPage(1);
      Promise.all([
        getBannerList(),
        getTrendyWatch(),
        getAllBrands(),
        getTopNotchWatch({page: 1}),
      ]).then(val => {
        setRefreshing(false);
      });
    }
  }, [refreshing]);

  const onLoadMore = async () => {
    if (exploreProduct?.isLoadMore) {
      console.log(
        'load more',
        filterDataForNextPage,
        exploreProduct?.topNotchWatchCurrentPage,
      );
      await getTopNotchWatch({
        page: exploreProduct?.topNotchWatchCurrentPage + 1,
        ...filterDataForNextPage,
      });
    }
  };

  useEffect(() => {
    // if (query.length > 0) {
    //   setPage(1);
    //   getTopNotchWatch({page: 1, keyWord: query});
    // } else {
    if (filterActive === false) {
      //alert('filter is running while filter is active inside');
      getTopNotchWatch();
    }
  }, []);

  useEffect(() => {
    if (
      exploreProduct?.bannerListLoadingStatus === LoadingStatus.LOADED &&
      exploreProduct?.trendyWatchesLoadingStatus === LoadingStatus.LOADED
    ) {
      setIsLoading(false);
    }
    if (exploreProduct?.topNotchWatchLoadingStatus === LoadingStatus.LOADED) {
      if (query.length > 0 || page === 1) {
        setTopNotchWatch(exploreProduct?.topNotchWatch);
      } else {
        // const result = [
        //   ...topNotchWatch,
        //   ...exploreProduct?.topNotchWatch,
        // ].reduce((res, data) => {
        //   if (!res.some(item => item.id === data.id)) {
        //     res.push(data);
        //   }
        //   return res;
        // }, []);
        const mergedData = mergeArrays(
          topNotchWatch,
          exploreProduct?.topNotchWatch,
        );
        console.log('Merge==', mergedData);
        setTopNotchWatch(mergedData);
      }
    }
  }, []);

  // useEffect(() => {
  //   if (query1?.length > 0) {
  //     var params = {
  //       query1: query1,
  //     };
  //     productSearch(params);
  //   }
  // }, [query1]);

  useEffect(() => {
    userProfile();
  }, []);

  const renderItem = ({item, index}) => {
    //console.log('Product card item ====================>>>>>>>>>>>>>', item);
    return <ProductCard key={index} item={item} />;
  };

  const renderItemm = ({section}) => {
    if (section.horizontal) {
      return (
        <>
          <Banner bannerData={exploreProduct?.bannerList} />
          <TrendyWatch
            setIsFilter={setIsFilter}
            refreshing={refreshing}
            {...props}
          />
        </>
      );
    } else {
      return (
        <FlatList
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 40,
          }}
          data={props?.exploreProduct?.topNotchWatch}
          renderItem={renderItem}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{
            flex: 1,
            justifyContent: 'flex-start',
            paddingHorizontal: 10,
            paddingBottom: 10,
          }}
          onEndReachedThreshold={0.9876}
          onEndReached={onLoadMore}
          ListFooterComponent={() => {
            return exploreProduct?.topNotchWatchLoadingStatus ===
              LoadingStatus.LOADING ? (
              <ActivityIndicator style={{marginVertical: 10}} />
            ) : null;
          }}
          ListEmptyComponent={() =>
            exploreProduct?.topNotchWatchLoadingStatus ===
            LoadingStatus.LOADING ? null : (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <CustomText>No Data Found</CustomText>
              </View>
            )
          }
        />
      );
    }
  };
  //console.log(exploreProduct, 'exploreProductdata=====>>>>');
  return (
    <Container useSafeAreaView={true}>
      {serachToggle === false && (
        <>
          {authReducer?.userProfileDetails?.email === 'swi@swi.com' ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <SearchBarComponent
                onPress={() => {
                  LoginAlertCheck(dispatch);
                }}
              />
              <Pressable
                onPress={() => {
                  if (
                    authReducer?.userProfileDetails?.email === 'swi@swi.com'
                  ) {
                    LoginAlertCheck(dispatch);
                  } else {
                    updateNotificationCount();
                    props.navigation?.navigate(RoutesName.NOTIFICATION_SCREEN);
                  }
                }}
                style={{
                  marginLeft: SPACING.SCALE_5,
                  marginTop: SPACING.SCALE_8,
                  //backgroundColor: 'red',
                }}>
                <Image source={IMAGES.notificationBell} />
                {notifyCount?.total_unread ? (
                  <View
                    style={{
                      height: 10,
                      width: 10,
                      borderRadius: 5,
                      backgroundColor: COLORS.APPGREEN,
                      position: 'absolute',
                      marginLeft: 15,
                      marginTop: -5,
                      justifyContent: 'center',
                      alignContent: 'center',
                    }}>
                    {/* <Text
                      style={{
                        color: COLORS.BLACK,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        // marginLeft: ,
                        alignSelf: 'center',
                        color: 'white',

                        // fontSize: 24,
                      }}>
                      {notifyCount?.total_unread}
                    </Text> */}
                  </View>
                ) : null}
              </Pressable>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <SearchBarComponent
                onPress={() => {
                  setSearchToggle(true);
                }}
              />
              <Pressable
                onPress={() => {
                  if (
                    authReducer?.userProfileDetails?.email === 'swi@swi.com'
                  ) {
                    LoginAlertCheck(dispatch);
                  } else {
                    updateNotificationCount();
                    props.navigation?.navigate(RoutesName.NOTIFICATION_SCREEN);
                  }
                }}
                style={{
                  marginLeft: SPACING.SCALE_5,
                  marginTop: SPACING.SCALE_8,
                  //backgroundColor: 'red',
                }}>
                <Image source={IMAGES.notificationBell} />
                {notifyCount?.total_unread ? (
                  <View
                    style={{
                      height: 10,
                      width: 10,
                      borderRadius: 5,
                      backgroundColor: COLORS.APPGREEN,
                      position: 'absolute',
                      marginLeft: 15,
                      marginTop: -5,
                      justifyContent: 'center',
                      alignContent: 'center',
                    }}>
                    {/* <Text
                      style={{
                        color: COLORS.BLACK,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        // marginLeft: ,
                        alignSelf: 'center',
                        color: 'white',

                        // fontSize: 24,
                      }}>
                      {notifyCount?.total_unread}
                    </Text> */}
                  </View>
                ) : null}
              </Pressable>
            </View>
          )}
        </>
      )}
      {serachToggle && (
        <>
          <View
            style={{
              alignSelf: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
              marginTop: 10,
              //backgroundColor: 'red',
            }}>
            <Pressable
              //style={{backgroundColor: 'red'}}
              onPress={() => {
                setSearchToggle(false);
                setSearchQueryNew('');
              }}>
              <Image
                style={{
                  //backgroundColor: 'red',
                  height: SPACING.SCALE_24,
                  width: SPACING.SCALE_24,
                  resizeMode: 'cover',
                }}
                source={IMAGES.BACKARROW}
              />
            </Pressable>
            <Spacer width={6} />
            <Searchbar
              autoFocus={true}
              traileringRippleColor={false}
              onFocus={onFocusSearch}
              onBlur={onBlurSearch}
              //clearIcon={true}
              placeholder="Search by product/ brand/ model"
              onChangeText={onChangeSearchNew}
              onSubmitEditing={e => {
                var params = {
                  keyword: searchQueryNew,
                  type: 'product',
                };
                searchHistory(params).then(res => {
                  if (res?.type?.includes('fulfilled')) {
                    searchHistoryList();

                    if (searchQueryNew != '') {
                      setSearchQueryNew('');
                      props.navigation.navigate(RoutesName.SEARCH_SCREEN, {
                        from: 'explore',
                        keyWord: searchQueryNew,
                      });
                    }
                  }
                  //console.log(e, 'mmmmmmm');
                });
                //console.log(res, 'mmmmmmmmmmmm');
              }}
              value={searchQueryNew}
              style={{
                marginLeft: 0,
                backgroundColor: 'white',
                borderRadius: 10,
                width: '83%',
                borderWidth: 1,
                borderColor: 'grey',
              }}
            />

            {
              /* <Pressable
              onPress={() => {
                if (authReducer?.userProfileDetails?.email === 'swi@swi.com') {
                  LoginAlertCheck(dispatch);
                } else {
                  props.navigation?.navigate(RoutesName.NOTIFICATION_SCREEN);
                }
              }}
              style={{
                marginLeft: SPACING.SCALE_5,
                marginTop: SPACING.SCALE_8,
                //backgroundColor: 'red',
              }}>
              <Image source={IMAGES.notificationBell} />
              {notifyCount?.total_unread ? (
                <View
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                    backgroundColor: 'black',
                    position: 'absolute',
                    marginLeft: 15,
                    marginTop: -15,
                    justifyContent: 'center',
                    alignContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: COLORS.BLACK,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      // marginLeft: ,
                      alignSelf: 'center',
                      color: 'white',

                      // fontSize: 24,
                    }}>
                    {notifyCount?.total_unread}
                  </Text>
                </View>
              ) : null}
            </Pressable> */
              // rahul searchers
            }
          </View>
          {serachToggle ? (
            <>
              {Platform.OS === 'android' ? (
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={{
                    flexGrow: 1,
                    // zIndex: 2,
                    // height: '60%',
                    width: '80%',
                    alignSelf: 'center',
                    //backgroundColor: 'red',
                  }}>
                  <Pressable
                    onPress={() => {
                      // Alert.alert('dfghjkl');

                      // NavigationService.navigate(RoutesName.SEARCH_USER);
                      props.navigation.navigate(RoutesName.SEARCH_USER);
                    }}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        //backgroundColor: 'red',
                        alignItems: 'center',
                      }}>
                      <CustomIcon
                        color={'black'}
                        origin={ICON_TYPE.FEATHER_ICONS}
                        name={'user'}
                      />
                      <Spacer width={10} />
                      <Text style={{color: 'black'}}>Search users instead</Text>
                    </View>
                    <CustomIcon
                      color={'black'}
                      origin={ICON_TYPE.MATERIAL_ICONS}
                      name={'keyboard-arrow-right'}
                    />
                  </Pressable>
                  <Spacer />
                  {exploreProduct?.searchHistoryList.length !== 0 && (
                    <>
                      {serachToggle && (
                        <>
                          <View
                            style={{
                              flexDirection: 'row',
                              //backgroundColor: 'red',
                              justifyContent: 'space-between',
                            }}>
                            <Text
                              style={{
                                color: COLORS.BLACK,
                                fontSize: 16,
                                fontWeight: '900',
                              }}>
                              Recent searches
                            </Text>
                            <Text
                              onPress={() => {
                                const params = {deleteKey: 'all'};
                                searchHistoryDelete(params).then(response => {
                                  if (response.type.includes('fulfilled')) {
                                    showAlert({
                                      title: 'success',
                                      message: response?.payload?.message,
                                    });
                                    searchHistoryList();
                                  }
                                  //console.log(e, 'respons from delete id history');
                                });

                                //Alert.alert('dfghjkl');
                              }}
                              style={{
                                color: COLORS.APPGREEN,
                                fontSize: 15,
                                fontWeight: '400',
                              }}>
                              Clear all
                            </Text>
                          </View>

                          <Spacer />
                          {exploreProduct?.searchHistoryList
                            .slice(0, 5)
                            .map((item, index) => {
                              //console.log(item);
                              return (
                                <View
                                  key={item?.id}
                                  style={{
                                    flexDirection: 'row',
                                    margin: 3,
                                    // backgroundColor: 'red',
                                    justifyContent: 'space-between',
                                  }}>
                                  <Pressable
                                    style={{
                                      //backgroundColor: 'green',
                                      height: 40,
                                      width: '80%',
                                      justifyContent: 'center',
                                    }}
                                    onPress={() => {
                                      setSearchQueryNew(item?.keyword);

                                      props.navigation.navigate(
                                        RoutesName.SEARCH_SCREEN,
                                        {
                                          from: 'explore',
                                          keyWord:
                                            item?.keyword?.length > 30
                                              ? `${item?.keyword?.substring(
                                                  0,
                                                  30,
                                                )}`
                                              : item?.keyword,
                                        },
                                      );
                                      setSearchQueryNew('');

                                      //console.log('fghjkl');
                                    }}>
                                    <Text numberOfLines={1}>
                                      {item?.keyword}
                                    </Text>
                                  </Pressable>

                                  <Pressable
                                    style={{
                                      //backgroundColor: 'green',
                                      width: '10%',
                                      justifyContent: 'center',
                                    }}
                                    onPress={() => {
                                      const params = {id: item.id.toString()};
                                      if (params.id) {
                                        searchHistoryDelete(params).then(
                                          response => {
                                            if (
                                              response.type.includes(
                                                'fulfilled',
                                              )
                                            ) {
                                              showAlert({
                                                title: 'success',
                                                message:
                                                  response?.payload?.message,
                                              });
                                              searchHistoryList();
                                            }
                                            //console.log(e, 'respons from delete id history');
                                          },
                                        );
                                      }
                                    }}>
                                    <CustomIcon
                                      origin={ICON_TYPE.ENTYPO}
                                      name={'cross'}
                                      //color={'red'}
                                    />
                                  </Pressable>
                                </View>
                              );
                            })}
                        </>
                      )}
                    </>
                  )}
                  {exploreProduct?.productSearch?.data?.length > 0 &&
                    searchQueryNew != '' && (
                      <View key={'sdfghjkhgj'}>
                        <Text
                          style={{
                            color: COLORS.BLACK,
                            fontSize: 16,
                            fontWeight: '900',
                          }}>
                          Suggestions
                        </Text>
                        <Spacer height={15} />
                        {exploreProduct?.productSearch?.data.map(
                          (item, index) => {
                            return (
                              <Pressable
                                key={item?.id}
                                onPress={() => {
                                  //Alert.alert('ghjk');
                                  setSearchQueryNew(item?.keyword);

                                  /////////////
                                  var params = {
                                    keyword: item?.keyword,
                                    type: 'product',
                                  };
                                  searchHistory(params).then(res => {
                                    if (res?.type?.includes('fulfilled')) {
                                      searchHistoryList();

                                      // if (searchQueryNew != '') {
                                      //   setSearchQueryNew('');
                                      //   props.navigation.navigate(
                                      //     RoutesName.SEARCH_SCREEN,
                                      //     {
                                      //       from: 'explore',
                                      //       keyWord: searchQueryNew,
                                      //     },
                                      //   );
                                      // }
                                    }
                                  });

                                  ///////////

                                  props.navigation.navigate(
                                    RoutesName.SEARCH_SCREEN,
                                    {
                                      from: 'explore',
                                      keyWord: item?.keyword,
                                    },
                                  );
                                  setSearchQueryNew('');

                                  console.log('fgh====jkl');
                                }}
                                style={{
                                  marginVertical: 1,
                                  height: 40,
                                  width: '90%',
                                  //backgroundColor: 'green',
                                  justifyContent: 'center',
                                }}>
                                <Text numberOfLines={1}>
                                  {item.keyword}
                                  {'jjknk'}
                                </Text>
                              </Pressable>
                            );
                          },
                        )}
                      </View>
                    )}
                  <Spacer height={20} />
                </ScrollView>
              ) : (
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
                    showsVerticalScrollIndicator={false}
                    style={{
                      flexGrow: 1,
                      // zIndex: 2,
                      // height: '60%',
                      width: '80%',
                      alignSelf: 'center',
                      // backgroundColor: 'red',
                    }}>
                    <Pressable
                      onPress={() => {
                        // Alert.alert('dfghjkl');

                        // NavigationService.navigate(RoutesName.SEARCH_USER);
                        props.navigation.navigate(RoutesName.SEARCH_USER);
                      }}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          //backgroundColor: 'red',
                          alignItems: 'center',
                        }}>
                        <CustomIcon
                          color={'black'}
                          origin={ICON_TYPE.FEATHER_ICONS}
                          name={'user'}
                        />
                        <Spacer width={10} />
                        <Text style={{color: 'black'}}>
                          Search users instead
                        </Text>
                      </View>
                      <CustomIcon
                        color={'black'}
                        origin={ICON_TYPE.MATERIAL_ICONS}
                        name={'keyboard-arrow-right'}
                      />
                    </Pressable>
                    <Spacer />
                    {exploreProduct?.searchHistoryList.length !== 0 && (
                      <>
                        {serachToggle && (
                          <>
                            <View
                              style={{
                                flexDirection: 'row',
                                //backgroundColor: 'red',
                                justifyContent: 'space-between',
                              }}>
                              <Text
                                style={{
                                  color: COLORS.BLACK,
                                  fontSize: 16,
                                  fontWeight: '900',
                                }}>
                                Recent searches
                              </Text>
                              <Text
                                onPress={() => {
                                  const params = {deleteKey: 'all'};
                                  searchHistoryDelete(params).then(response => {
                                    if (response.type.includes('fulfilled')) {
                                      showAlert({
                                        title: 'success',
                                        message: response?.payload?.message,
                                      });
                                      searchHistoryList();
                                    }
                                    //console.log(e, 'respons from delete id history');
                                  });

                                  //Alert.alert('dfghjkl');
                                }}
                                style={{
                                  color: COLORS.APPGREEN,
                                  fontSize: 15,
                                  fontWeight: '400',
                                }}>
                                Clear all
                              </Text>
                            </View>

                            <Spacer />
                            {exploreProduct?.searchHistoryList
                              .slice(0, 5)
                              .map((item, index) => {
                                //console.log(item);
                                return (
                                  <View
                                    key={item?.id}
                                    style={{
                                      flexDirection: 'row',
                                      margin: 3,
                                      // backgroundColor: 'red',
                                      justifyContent: 'space-between',
                                    }}>
                                    <Pressable
                                      style={{
                                        //backgroundColor: 'green',
                                        height: 40,
                                        width: '80%',
                                        justifyContent: 'center',
                                      }}
                                      onPress={() => {
                                        setSearchQueryNew(item?.keyword);

                                        props.navigation.navigate(
                                          RoutesName.SEARCH_SCREEN,
                                          {
                                            from: 'explore',
                                            keyWord:
                                              item?.keyword?.length > 30
                                                ? `${item?.keyword?.substring(
                                                    0,
                                                    30,
                                                  )}`
                                                : item?.keyword,
                                          },
                                        );
                                        setSearchQueryNew('');

                                        //console.log('fghjkl');
                                      }}>
                                      <Text numberOfLines={1}>
                                        {item?.keyword}
                                      </Text>
                                    </Pressable>

                                    <Pressable
                                      style={{
                                        //backgroundColor: 'green',
                                        width: '10%',
                                        justifyContent: 'center',
                                      }}
                                      onPress={() => {
                                        const params = {id: item.id.toString()};
                                        if (params.id) {
                                          searchHistoryDelete(params).then(
                                            response => {
                                              if (
                                                response.type.includes(
                                                  'fulfilled',
                                                )
                                              ) {
                                                showAlert({
                                                  title: 'success',
                                                  message:
                                                    response?.payload?.message,
                                                });
                                                searchHistoryList();
                                              }
                                              //console.log(e, 'respons from delete id history');
                                            },
                                          );
                                        }
                                      }}>
                                      <CustomIcon
                                        origin={ICON_TYPE.ENTYPO}
                                        name={'cross'}
                                        //color={'red'}
                                      />
                                    </Pressable>
                                  </View>
                                );
                              })}
                          </>
                        )}
                      </>
                    )}
                    {exploreProduct?.productSearch?.data?.length > 0 &&
                      searchQueryNew != '' && (
                        <View key={'sdfghjkhgj'}>
                          <Text
                            style={{
                              color: COLORS.BLACK,
                              fontSize: 16,
                              fontWeight: '900',
                            }}>
                            Suggestions
                          </Text>
                          <Spacer height={15} />
                          {exploreProduct?.productSearch?.data.map(
                            (item, index) => {
                              return (
                                <Pressable
                                  key={item?.id}
                                  onPress={() => {
                                    //Alert.alert('ghjk');
                                    setSearchQueryNew(item?.keyword);

                                    /////////////
                                    var params = {
                                      keyword: item?.keyword,
                                      type: 'product',
                                    };
                                    searchHistory(params).then(res => {
                                      if (res?.type?.includes('fulfilled')) {
                                        searchHistoryList();

                                        // if (searchQueryNew != '') {
                                        //   setSearchQueryNew('');
                                        //   props.navigation.navigate(
                                        //     RoutesName.SEARCH_SCREEN,
                                        //     {
                                        //       from: 'explore',
                                        //       keyWord: searchQueryNew,
                                        //     },
                                        //   );
                                        // }
                                      }
                                    });

                                    /////////////

                                    props.navigation.navigate(
                                      RoutesName.SEARCH_SCREEN,
                                      {
                                        from: 'explore',
                                        keyWord: item?.keyword,
                                      },
                                    );
                                    setSearchQueryNew('');

                                    console.log('fghjkl');
                                  }}
                                  style={{
                                    marginVertical: 1,
                                    height: 40,
                                    width: '90%',
                                    // backgroundColor: 'green',
                                    justifyContent: 'center',
                                  }}>
                                  <Text numberOfLines={1}>{item.keyword}</Text>
                                </Pressable>
                              );
                            },
                          )}
                        </View>
                      )}
                    <Spacer height={20} />
                  </ScrollView>
                </KeyboardAvoidingView>
              )}
            </>
          ) : null}
        </>
      )}
      {!serachToggle && (
        <>
          <SectionList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => setRefreshing(true)}
              />
            }
            sections={[
              {
                title: 'Horizontal List',
                horizontal: true,
                data: ['Item 1'],
              },
              {
                title: 'Vertical List',
                horizontal: false,
                data: ['Item 4'],
              },
            ]}
            renderItem={renderItemm}
            keyExtractor={(item, index) => index.toString()}
          />
          <Filter
            setFilterDataForNextPage={setFilterDataForNextPage}
            setFilterActive={setFilterActive}
            isFilter={isFilter}
            setIsFilter={setIsFilter}
            setTopNotchWatch={setTopNotchWatch}
            {...props}
          />
        </>
      )}
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    authReducer: state?.authReducer,
    exploreProduct: state?.exploreProductReducer,
  };
};

const mapDispatchToProps = dispatch => ({
  getBannerList: params => dispatch(getBannerAction(params)),
  getTrendyWatch: params => dispatch(getTrendyWatchAction(params)),
  getTopNotchWatch: params => dispatch(getTopNotchWatchAction(params)),
  getAllBrands: params => dispatch(getBrandListingAction(params)),

  onAddWishList: params => dispatch(addWishListAction(params)),
  getNotificationCount: params => dispatch(NotificationCount(params)),
  searchHistoryList: params => dispatch(searchHistoryList(params)),
  searchHistory: params => dispatch(searchHistory(params)),
  searchHistoryDelete: params => dispatch(searchHistoryDelete(params)),
  productSearch: params => dispatch(productSearch(params)),
  userProfile: params => dispatch(userProfile()),

  updateNotificationCount: params => dispatch(NotificationCountUpdateAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreScreen);

const styles = StyleSheet.create({});
