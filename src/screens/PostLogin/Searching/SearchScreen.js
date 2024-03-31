import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Container, CustomIcon, Spacer} from '@app/components';
import SearchBarComponent from '@app/components/SearchBarComponent';
import SearchHeader from '@app/screens/atoms/SearchHeader';
import useDebounce from '@app/hooks/useDebounce';
import ProductCard from '@app/screens/atoms/ProductCard';
import {COLORS, IMAGES, SPACING} from '@app/resources';
import {
  freshFindsSearchingAction,
  getTopNotchWatchSearchingAction,
} from '@app/store/exploreProductSlice';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
  resetfreshFindsState,
  resetserachstate,
} from '@app/store/exploreProductSlice/exploreProduct.slice';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {TEXT} from '@app/resources/colors';
import {LoadingStatus} from '@app/helper/strings';
import Filter from '../ExploreScreen/Filter';
import SearchFilter from '../ExploreScreen/SearchFilter';
import {showAlert} from '@app/helper/commonFunction';
import {width} from '@app/helper/responsiveSize';

const SearchScreen = props => {
  console.log('props', props?.route?.params);
  const searchingLoadMore = useSelector(
    state => state?.exploreProductReducer?.topNotchWatchSearchingLoadMore,
  );
  const currentPage = useSelector(
    state => state?.exploreProductReducer?.topNotchWatchSearchingCurrentPage,
  );
  const topNotchWatchTotalResult = useSelector(
    state => state?.exploreProductReducer?.topNotchWatchSearchingTotalResult,
  );
  console.log(searchingLoadMore, 'datatatatatatatata');
  const {
    getTopNotchWatchSearching,
    exploreProduct,
    onFreshFinds,
    resetState,
    onFreshFindsSearching,
    resetFreshFindsState,
  } = props;

  console.log('================22322', props);

  // for filter

  const [isFilter, setIsFilter] = useState(false);
  const filterRef = useRef(false);

  //

  const [searchQuery, onChangeSearch] = useState('');
  const [topNotchWatch, setTopNotchWatch] = useState([]);
  const [page, setPage] = useState(1);
  const query = useDebounce(searchQuery, 1000);
  const [toShow, setToShow] = useState(false);
  const [filterActive, setFilterActive] = useState(false);
  const [filterDataForNextPage, setFilterDataForNextPage] = useState(null);
  const [loadMore, setLoadMore] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    onChangeSearch(props?.route?.params?.keyWord);
    ///alert('sdfghjhghh++++');
  }, [props?.route?.params?.keyWord]);

  console.log(
    'sdfghjkdfghjkdfghm===',
    query,
    exploreProduct?.topNotchWatchSearching,
  );

  useEffect(() => {
    if (query?.length > 0) {
      if (props?.route?.params?.from === 'explore') {
        dispatch(resetserachstate());
        console.log('asdfghjkjhfdsdhjhgfdjhgv');
        setFilterDataForNextPage(null);

        // setPage(1);
        getTopNotchWatchSearching({page: 1, keyWord: query}).then(res => {
          if (res.payload.data.current_page < res.payload.data.last_page) {
            setLoadMore(true);
          } else setLoadMore(false);
        });

        // if (res.payload.data.current_page < res.payload.data.last_page) {
        //   setLoadMore(true);
        // } else {
        //   setLoadMore(false);
        // }
        // setTopNotchWatch(exploreProduct?.topNotchWatchSearching);
        setToShow(true);
      } else if (props?.route?.params?.from === 'freshFinds') {
        console.log('RAHUL CALLED');
        onFreshFindsSearching({keyWord: query});
        setToShow(true);
      }
    }
    return () => {
      console.log('Unmounrt');
      resetState();
      resetFreshFindsState();
      dispatch(resetserachstate());
    };
  }, [query]);

  // useEffect(() => {
  //   if (
  //     exploreProduct?.topNotchWatchSearchingLoadingStatus ===
  //     LoadingStatus.LOADED
  //   ) {
  //     if (query.length > 0 || page === 1) {
  //       setTopNotchWatch(exploreProduct?.topNotchWatchSearching);
  //     } else {
  //       // const result = [
  //       //   ...topNotchWatch,
  //       //   ...exploreProduct?.topNotchWatch,
  //       // ].reduce((res, data) => {
  //       //   if (!res.some(item => item.id === data.id)) {
  //       //     res.push(data);
  //       //   }
  //       //   return res;
  //       // }, []);
  //       const mergedData = [
  //         ...topNotchWatch,
  //         ...exploreProduct?.topNotchWatchSearching,
  //       ];

  //       console.log('Merge==', mergedData);
  //       setTopNotchWatch(mergedData);
  //     }
  //   }
  // }, [exploreProduct]);

  return (
    <Container
      loading={
        exploreProduct.freshFindSearchingLoadingStatus ===
          LoadingStatus.LOADING ||
        (toShow === false && props?.route?.params?.from != 'freshFinds')
      }
      useSafeAreaView={true}>
      <View
        style={{
          //flex: 1,
          flexDirection: 'row',
          // backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Spacer width={10} />
        <Pressable
          onPress={() => {
            props?.navigation?.goBack();
            dispatch(resetserachstate());
          }}>
          <Image
            style={{
              height: SPACING.SCALE_24,
              width: SPACING.SCALE_24,
              resizeMode: 'cover',
            }}
            source={IMAGES.BACKARROW}
          />
        </Pressable>

        <SearchHeader
          value={searchQuery}
          // placeholder={searchQuery ? searchQuery : null}
          searchQuery={searchQuery}
          onChangeSearch={onChangeSearch}
        />
      </View>

      <SearchFilter
        setFilterDataForNextPage={setFilterDataForNextPage}
        setFilterActive={setFilterActive}
        isFilter={isFilter}
        setIsFilter={setIsFilter}
        setTopNotchWatch={setTopNotchWatch}
        keyWord={searchQuery}
        setLoadMore={setLoadMore}
        {...props}
      />

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {(exploreProduct?.topNotchWatchSearching?.length > 0 ||
          exploreProduct?.freshFindsSearching?.length > 0) && (
          <Text
            style={{
              marginLeft: SPACING.SCALE_20,
              color: COLORS.BLACK,
              fontSize: SPACING.SCALE_16,
              marginRight: SPACING.SCALE_10,
              marginTop: SPACING.SCALE_2,
              // backgroundColor:'red',
              maxWidth: width * 0.8,
            }}>
            We've found{' '}
            {props?.route?.params?.from === 'explore'
              ? topNotchWatchTotalResult
              : exploreProduct?.freshFindsSearching?.length}{' '}
            results for "{searchQuery}"
          </Text>
        )}
        <Spacer />
        {props?.route?.params?.from != 'freshFinds' && (
          <Pressable
            onPress={() => {
              setIsFilter(!isFilter);
            }}
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              // backgroundColor: 'red',
              marginHorizontal: SPACING.SCALE_20,
              marginTop: SPACING.SCALE__12,
            }}>
            <CustomIcon
              color={COLORS.BLACK}
              origin={ICON_TYPE.ANT_ICON}
              name={'filter'}
            />
          </Pressable>
        )}
      </View>

      <Spacer />
      <View
        style={{
          flex: 1,
          marginHorizontal: SPACING.SCALE_10,
        }}>
        <FlatList
          data={
            props?.route?.params?.from === 'explore'
              ? exploreProduct?.topNotchWatchSearching
              : exploreProduct?.freshFindsSearching
          }
          numColumns={2}
          renderItem={({item, index}) => {
            //  console.log('======56754', item);
            return <ProductCard item={item} />;
          }}
          onEndReached={async () => {
            //console.log(loadMore, 'loadmore value ');
            if (exploreProduct.topNotchWatchSearchingLoadMore === true) {
              const res = await getTopNotchWatchSearching({
                page: exploreProduct.topNotchWatchSearchingCurrentPage + 1,
                keyWord: query,
                ...filterDataForNextPage,
              });
            }
            // if (filterActive) {
            //   if (searchingLoadMore) {
            //     getTopNotchWatchSearching({
            //       page: currentPage + 1,
            //       keyWord: query,
            //       ...filterDataForNextPage,
            //     });
            //   }
            // } else if (searchingLoadMore) {
            //   getTopNotchWatchSearching({
            //     page: currentPage + 1,
            //     keyWord: query,
            //   });
            // }
            //else {
            //   showAlert({
            //     title: 'Alert',
            //     message: 'No more data',
            //   });
            // }
          }}
          ListFooterComponent={() => {
            return exploreProduct?.topNotchWatchSearchingLoadingStatus ===
              LoadingStatus.LOADING ? (
              <ActivityIndicator style={{marginVertical: 10}} />
            ) : null;
          }}
          ListEmptyComponent={() => {
            return exploreProduct?.topNotchWatchSearchingLoadingStatus ===
              LoadingStatus.LOADING ? null : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {toShow ? <Text>No Record Found</Text> : null}
              </View>
            );
          }}
        />
        {/* <Spacer height={SPACING.SCALE_60} /> */}
      </View>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    exploreProduct: state?.exploreProductReducer,
  };
};

const mapDispatchToProps = dispatch => ({
  getTopNotchWatchSearching: params =>
    dispatch(getTopNotchWatchSearchingAction(params)),
  onFreshFindsSearching: params => dispatch(freshFindsSearchingAction(params)),
  resetState: () => dispatch(resetserachstate()),
  resetFreshFindsState: () => dispatch(resetfreshFindsState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
