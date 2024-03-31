import {
  BackHeader,
  Container,
  CustomIcon,
  NavigationBar,
} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {COLORS, IMAGES, SPACING} from '@app/resources';
import {margin} from '@app/resources/mixins';
import React, {useEffect, useState} from 'react';
import {Alert, FlatList, ScrollView} from 'react-native';
import {StyleSheet} from 'react-native';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {AirbnbRating, Rating} from 'react-native-ratings';
import styles from '../ItemComparison/styles';
import {connect} from 'react-redux';
import {
  ratingReviewAction,
  ratingReviewAsBuyerAction,
} from '@app/store/ratingReviewSlice';
import {RenderItem} from './RenderList';
import {EmptyList} from '../ChatScreen/commn';
import {RenderItemBuyer} from './RenderListBuyer';
import {Button, Divider, Menu} from 'react-native-paper';
import Filter from './Filter';
import {addEllipsis} from '@app/helper/commonFunction';

const RatingAndReviews = props => {
  const {
    route,
    navigation,
    ratingReviewReducer,
    getRatingReview,
    getRatingReviewAsBuyer,
  } = props;
  console.log(props, 'propsdata');
  // console.log('UserID@#$%^&*(*&^%$', props?.ratingReviewReducer?.ratingReviewAction?.data);

  //Data
  // As user
  const userRole = props?.route?.params?.userRole
    ? props?.route?.params?.userRole
    : props?.authReducer?.userProfileDetails?.role;
  const loginUserId = props?.authReducer?.userProfileDetails?.id;
  console.log(loginUserId, 'UUUUUUUUUUU');

  //As seller
  const item = props?.ratingReviewReducer?.ratingReviewAction?.data;
  const average = item?.average;
  const count = item?.count;
  const userPic = item?.rated_user?.image;
  const userName = item?.rated_user?.name;
  const user_id_tag = item?.rated_user?.user_id_tag;
  const ratingList = item?.list;
  const sortData = ratingList?.slice(0, 10);

  console.log(item, 'sortData======================>>>>>>>>>>>');

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [BuyerSelect, setBuyerSelect] = useState(null);
  const isSelf = props?.route?.params?.userID == loginUserId ? true : false;
  console.log('ISSelf', isSelf);

  // if (item?.list?.length <= 2) {
  //   setShow(true);

  // }

  const handleFilterChange = filter => {
    setSelectedFilter(filter);
    console.log(filter, 'Seller');
    getRatingReview({
      type: 'user',
      user_id: props?.route?.params?.userID,
      filter: filter,
    });

    // Implement your filter logic here based on the selected filter value
  };
  const handleFilterChangeBuyer = filter => {
    setBuyerSelect(filter);
    console.log(filter, 'buyer');
    getRatingReviewAsBuyer({
      user_id: props?.route?.params?.userID,
      filter: filter,
    });
    // Implement your filter logic here based on the selected filter value
  };

  //as Buyer
  const BuyerItem = props?.ratingReviewReducer?.ratingReviewAsBuyerAction?.data;
  const averageBuyer = BuyerItem?.average;
  const countBuyer = BuyerItem?.count;
  const userPicBuyer = BuyerItem?.rated_user?.image;
  const userNameBuyer = BuyerItem?.rated_user?.name;
  const ratingListBuyer = BuyerItem?.list;
  const sortDataBuyer = ratingListBuyer?.slice(0, 10);
  const UserIdTag = props?.route?.params?.UserIdTag;
  console.log('BuyerItem', UserIdTag);

  const ratingCount = 5;
  const [selected, setSelected] = useState('seller');
  const handlePress = button => {
    setSelected(button);
    // console.log(selected);
  };
  const handleBuyerPress = button => {
    setSelected(button);
  };
  // const handleRatedToBuyerPress = button => {
  //   setSelected(button);
  // };
  const [show, setShow] = useState(false);
  const [filter, setFilter] = useState('');
  console.log('RatingUserId', props?.route?.params?.userID);

  useEffect(() => {
    // if (props?.authReducer?.userProfileDetails?.additional_info?.user_id) {
    getRatingReview({
      type: 'user',
      user_id: props?.route?.params?.userID,
      filter: filter,
    });
    getRatingReviewAsBuyer({
      user_id: props?.route?.params?.userID,
      filter: selectedFilter,
    });
    // }
  }, []);

  return (
    <Container useSafeAreaView={true}>
      <BackHeader />

      <View style={{marginHorizontal: 20, flex: 1}}>
        {/* {isSelf == true ? */}
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <TouchableOpacity
              onPress={() => {
                handlePress('seller');
                setShow(false);
              }}>
              {userRole === 'user' ? (
                <Text
                  style={[
                    style.btnText,
                    selected === 'seller' && {
                      fontSize: 17,
                      fontFamily: 'OpenSans-SemiBold',
                      color: '#00958C',
                    },
                  ]}>
                  To the Seller
                </Text>
              ) : (
                <Text
                  style={[
                    style.btnText,
                    selected === 'seller' && {
                      fontSize: 17,
                      fontFamily: 'OpenSans-SemiBold',
                      color: '#00958C',
                    },
                  ]}>
                  As a Seller
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                handleBuyerPress('buyer');
                setShow(false);
              }}>
              {userRole === 'user' ? (
                <Text
                  style={[
                    style.btnText,
                    selected === 'buyer' && {
                      fontSize: 17,
                      fontFamily: 'OpenSans-SemiBold',
                      color: '#00958C',
                    },
                  ]}>
                  From The Seller
                </Text>
              ) : (
                <Text
                  style={[
                    style.btnText,
                    selected === 'buyer' && {
                      fontSize: 17,
                      fontFamily: 'OpenSans-SemiBold',
                      color: '#00958C',
                    },
                  ]}>
                  As a Buyer
                </Text>
              )}
            </TouchableOpacity>
            {/* <TouchableOpacity
            onPress={() => {
              handleRatedToBuyerPress('ratedToBuyer');
              setShow(false);
            }}>
            <Text
              style={[
                style.btnText,
                selected === 'ratedToBuyer' && {
                  fontSize: 17,
                  fontFamily: 'OpenSans-SemiBold',
                  color: '#00958C',
                },
              ]}>
              Rated to Buyer
            </Text>
          </TouchableOpacity> */}
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              justifyContent: 'space-evenly',
            }}>
            <View
              style={[
                style.lineStyle,
                selected === 'seller' && {
                  height: 4,
                  width: '50%',
                  backgroundColor: '#00958C',
                  borderRadius: 10,
                },
              ]}
            />
            <View
              style={[
                style.lineStyle,
                selected === 'buyer' && {
                  height: 4,
                  width: '50%',
                  backgroundColor: '#00958C',
                  borderRadius: 10,
                },
              ]}
            />
            {/* <View
            style={[
              style.lineStyle,
              selected === 'ratedToBuyer' && {
                height: 4,
                width: '33%',
                backgroundColor: '#00958C',
                borderRadius: 10,
              },
            ]}
          /> */}
          </View>
        </View>
        {/* :
          <View>
            <Text
              style={{
                fontSize: SPACING.SCALE_20,
                fontFamily: 'OpenSans-SemiBold',
                color: '#00958C',
                justifyContent: 'center',
                alignSelf: 'center',

              }}>
              Rate and Reviews
            </Text>
            <View
              style={[
                style.lineStyle,
                selected === 'seller' && {
                  height: 4,
                  width: '90%',
                  backgroundColor: '#00958C',
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignSelf: 'center',
                },
              ]}
            />
          </View>
        } */}

        <View
          style={{
            alignItems: 'center',
            marginTop: 30,
          }}>
          <Image
            source={{uri: userPic}}
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
              marginTop: 10,
              textAlign:'center'
            }}>
            {/* {addEllipsis(userName, 15)} */}
            {userName}
          </Text>
          {UserIdTag && (
            <Text
              style={{
                fontSize: 16,
                // fontFamily: 'OpenSans-Bold',
                color: '#000000',
                // marginTop: 10,
              }}>
              {`@${UserIdTag}`}
            </Text>
          )}

          {selected === 'seller' && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 15,
              }}>
              <Rating
                type="star"
                ratingCount={ratingCount}
                startingValue={average}
                imageSize={16}
                readonly
              />
              {/* <AirbnbRating
                count={ratingCount}
                showRating={false}
                defaultRating={average}
                isDisabled
                size={15}
                style={{marginHorizontal: 10}}
                ratingContainerStyle={{marginHorizontal: 10}}
                starContainerStyle={{
                  paddingVertical: 10,
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}
              /> */}
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: 'OpenSans-SemiBold',
                  color: '#454545',
                  marginLeft: 5,
                }}>
                {item?.count} reviews
              </Text>
            </View>
          )}
        </View>

        {selected === 'seller' && (
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Cabin-Regular',
                color: '#090909',
              }}>
              Overall Rating
            </Text>
            <View
              style={{
                flexDirection: 'row',
                // backgroundColor: 'red'
              }}>
              <View>
                <Text
                  style={{
                    fontSize: 50,
                    fontFamily: 'Cabin-SemiBold',
                    // marginTop: 15,
                    // marginLeft: 5,
                    color: COLORS.BLACK,
                  }}>
                  {average}
                  <Text
                    style={{
                      fontSize: 37,
                      marginTop: 15,
                      fontFamily: 'Cabin-SemiBold',
                      color: COLORS.BLACK,
                    }}>
                    /{ratingCount}{' '}
                  </Text>
                </Text>
              </View>
              <View style={{marginTop: 30}}>
                {/* <AirbnbRating
                  count={ratingCount}
                  showRating={false}
                  // defaultRating={average}
                  isDisabled
                  defaultRating={average}
                  size={15}
                  style={{marginHorizontal: 10}}
                  ratingContainerStyle={{marginHorizontal: 10}}
                  starContainerStyle={{
                    paddingVertical: 10,
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                  }}
                /> */}
                <Rating
                  type="star"
                  ratingCount={ratingCount}
                  startingValue={average}
                  jumpValue={0.1}
                  imageSize={25}
                  readonly
                  style={{
                    marginLeft: -10,
                  }}
                />

                <Text
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 20,
                    marginTop: 5,
                    fontFamily: 'OpenSans-Regular',
                  }}>
                  Based on {item?.count} reviews
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'Cabin-Regular',
                  color: '#090909',
                }}>
                Reviews
              </Text>
              <Filter
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                handleFilterChange={handleFilterChange}
              />
            </View>
            <View style={{flex: 1, paddingBottom: 20}}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <FlatList
                  data={show === true ? ratingList : sortData}
                  renderItem={RenderItem}
                  ListEmptyComponent={EmptyList}
                />
              </ScrollView>
            </View>
          </ScrollView>
        )}

        {selected === 'buyer' && (
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            {/* <Text
              style={{
                fontSize: 18,
                fontFamily: 'Cabin-Regular',
                color: '#090909',
              }}>
              Overall Rating
            </Text> */}
            {/* <View
              style={{
                flexDirection: 'row',
                // backgroundColor: 'red'
              }}>
              <View>
                <Text
                  style={{
                    fontSize: 50,
                    fontFamily: 'Cabin-SemiBold',
                    // marginTop: 15,
                    // marginLeft: 5,
                    color: COLORS.BLACK,
                  }}>
                  {averageBuyer}
                  <Text
                    style={{
                      fontSize: 37,
                      marginTop: 15,
                      fontFamily: 'Cabin-SemiBold',
                      color: COLORS.BLACK,
                    }}>
                    /{ratingCount}{' '}
                  </Text>
                </Text>
              </View>
              <View style={{marginTop: 30}}>
                <AirbnbRating
                  count={ratingCount}
                  showRating={false}
                  defaultRating={averageBuyer}
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
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 20,
                    marginTop: 5,
                    fontFamily: 'OpenSans-Regular',
                  }}>
                  Based on {item?.count} reviews
                </Text>
              </View>
            </View> */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'Cabin-Regular',
                  color: '#090909',
                }}>
                Reviews
              </Text>

              <Filter
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                handleFilterChange={handleFilterChange}
              />
            </View>
            <View style={{flex: 1}}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <FlatList
                  data={show === true ? ratingListBuyer : sortDataBuyer}
                  renderItem={RenderItemBuyer}
                  ListEmptyComponent={EmptyList}
                />
              </ScrollView>
            </View>
          </ScrollView>
        )}

        {/* Rating  To Buyer  */}
        {/* {selected === 'ratedToBuyer' && (
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'Cabin-Regular',
                  color: '#090909',
                }}>
                Reviews
              </Text>

              <Filter
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                handleFilterChange={handleFilterChange}
              />
            </View>
            <View style={{flex: 1}}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <FlatList
                  data={show === true ? ratingListBuyer : sortDataBuyer}
                  renderItem={RenderItemBuyer}
                  ListEmptyComponent={EmptyList}
                />
              </ScrollView>
            </View>
          </ScrollView>
        )} */}

        {((ratingListBuyer?.length > 10 && selected === 'buyer') ||
          (ratingList?.length > 10 && selected === 'seller')) && (
          <View
            style={{
              alignItems: 'center',
              paddingBottom: 10,
            }}>
            {show === false && (
              <TouchableOpacity
                onPress={() => {
                  setShow(true);
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'Cabin-SemiBold',
                    color: '#00958C',
                    marginTop: 5,
                    textDecorationLine: 'underline',
                  }}>
                  See all reviews
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </Container>
  );
};

const style = StyleSheet.create({
  btnText: {
    fontSize: 17,
    fontFamily: 'OpenSans-Regular',
    color: '#868686',
    // marginHorizontal: 10,
  },
  lineStyle: {
    height: 4,
    width: '50%',
    backgroundColor: '#E7E7E7',
    borderRadius: 10,
  },
  lineStyleHighlite: {
    height: 4,
    width: '50%',
    backgroundColor: '#00958C',
  },
});

const mapStateToProps = state => {
  return {
    authReducer: state.authReducer,
    ratingReviewReducer: state.ratingReviewReducer,
  };
};
const mapDispatchToProps = dispatch => ({
  getRatingReview: params => dispatch(ratingReviewAction(params)),
  getRatingReviewAsBuyer: params => dispatch(ratingReviewAsBuyerAction(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RatingAndReviews);
