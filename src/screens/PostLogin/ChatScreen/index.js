/* eslint-disable react/react-in-jsx-scope */
import {Container, CustomText} from '@app/components';
import {LoadingStatus, RoutesName} from '@app/helper/strings';
import PageTitle from '@app/screens/atoms/PageTitle';
import {
  archiveChatAction,
  deleteUserAction,
  getArchiveChatListAction,
  getChatListAction,
  unArchiveChatAction,
} from '@app/store/chatSlice';
import {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Button,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import Header from './Header';
import {EmptyList, EmptyList1, EmptyList2, RenderItem, Seprator} from './commn';
import {
  NotificationCount,
  NotificationCountUpdateAction,
  userProfile,
} from '@app/store/authSlice';
import CustomIcon, {ICON_TYPE} from '@app/components/CustomIcon';
import {COLORS, SPACING} from '@app/resources';
import {Swipeable} from 'react-native-gesture-handler';
import {Avatar} from 'react-native-paper';
import {addEllipsis} from '@app/helper/commonFunction';
import moment from 'moment';
import {FontsConst} from '@app/assets/assets';
import NavigationService from '@app/navigations/NavigationService';
import {SlideOutDown} from 'react-native-reanimated';
import Filter from './Filter';
import {filter} from '@app/resources/images';
import {Image} from 'react-native';

const ChatScreen = props => {
  const dispatch = useDispatch();
  const {
    chatReducer,
    getNotificationCount,
    authReducer,
    deleteUserAction,
    archiveChatAction,
    getArchiveChatListAction,
    getChatHistory,
    unArchiveChatAction,
    chatList,
    userProfile,
    updateNotificationCount,
  } = props;
  const [ArchieveChats, setArchieveChats] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => {
    setIsModalVisible(false);
  };
  const rowRefs = useRef({});

  useEffect(() => {
    getNotificationCount();
    getArchiveChatListAction();
    getChatHistory();
  }, []);

  const [searchString, setSearchString] = useState('');
  const updateState = searchString => {
    setSearchString(searchString);
  };
  console.log(selectedFilter, '==filter');
  useEffect(() => {
    getNotificationCount();
    // updateNotificationCount();

    getChatHistory({
      filter: selectedFilter,
      keyword: searchString,
    });
  }, [searchString]);

  useEffect(() => {
    userProfile();
  }, []);

  console.log(chatReducer, 'Search==============');
  const handleFilterChange = filter => {
    setSelectedFilter(filter);
    getChatHistory({
      filter: filter,
      keyword: searchString,
    });

    // getRatingReview({
    //   type: 'user',
    //   user_id: props?.route?.params?.userID,
    //   filter: filter,
    // });
  };

  // function filter() {
  //   console.log("Clicked")
  //   return (

  //   )
  // }

  // render item of flat list
  function RenderItem({item, index}) {
    console.log(item, '====rahul=>>>><<<<<<<<<<<<<');
    let row = [];
    let prevOpenedRow;
    const closeRow = index => {
      // if (prevOpenedRow && prevOpenedRow !== row[index]) {
      //   prevOpenedRow.close();
      // }
      // prevOpenedRow = row[index];

      // if (rowRefs.current[openIndex]) {
      //   rowRefs.current[openIndex].close();

      // }
      // setOpenIndex(index);
      console.log(openIndex, 'Open Index----------------------');
      console.log(index, ' Index----------------------');

      if (openIndex === index) {
        rowRefs.current[openIndex].close();
        setOpenIndex(null);
      } else {
        // rowRefs.current[index].open();

        setOpenIndex(index);
      }
    };

    const onRowClick = index => {
      setOpenIndex(index);
      NavigationService.navigate(RoutesName.CHAT_DETAIL_SCREEN, {
        chat_item: item,
      });
    };

    return (
      <Swipeable
        renderRightActions={() => RenderRightAction(item)}
        onSwipeableOpen={() => closeRow(index)}
        // ref={ref => (row[index] = ref)}
        ref={ref => (rowRefs.current[index] = ref)}
        rightOpenValue={-50}
        renderLeftActions={() => RenderLeftAction(item)}
        // leftThreshold={}
      >
        <Pressable
          style={{...styles.render_container, flex: 1, }}
          onPress={onRowClick}>
          {
            //avatar
          }
          <View style={{justifyContent: 'center', flex: 0.13}}>
            <Avatar.Image
              style={{marginHorizontal: 5}}
              source={{
                uri: item?.user_image,
              }}
              size={35}
            />
            {item?.read_unread_count !== 0 ? (
              <View
                style={{
                  position: 'absolute',
                  height: SPACING.SCALE_12,
                  width: SPACING.SCALE_12,
                  borderRadius: SPACING.SCALE_6,
                  backgroundColor: '#228B22',
                  right: SPACING.SCALE_1,
                  top: SPACING.SCALE_18,
                }}
              />
            ) : null}
          </View>
          <View
            style={{
              //backgroundColor: 'yellow',
              flex: 0.57,
              justifyContent: 'center',
              paddingLeft: 10,
            }}>
            {item?.user_id_tag ? (
              <CustomText style={styles.name_container}>
                {`@${addEllipsis(item?.user_id_tag, 15)}`}
              </CustomText>
            ) : (
              <CustomText style={styles.name_container}>
                {`@${addEllipsis(item?.name, 15)}`}
              </CustomText>
            )}
            <CustomText style={styles.brand_container}>
              {item?.product_title}
            </CustomText>
            <CustomText numberOfLines={2} style={styles.description_container}>
              {addEllipsis(item?.message, 50)}
            </CustomText>
          </View>
          <View
            style={{
              //backgroundColor: 'blue',
              flex: 0.3,
              justifyContent: 'center',
              alignItems: 'center',
              //  paddingTop: 8,
            }}>
            <CustomText style={styles.date_container}>
              {item?.created_at
                ? moment(item?.created_at).format('DD MMM, YYYY') //.tz(time, 'HH:mm', 'Asia/Singapore').utc()
                : '-'}
            </CustomText>
            {item?.thumb_image && (
              <Image
                style={{height: 40, width: 40, borderRadius: 10, marginTop: 4}}
                source={{uri: item?.base_url + item?.thumb_image}}
              />
            )}
          </View>
        </Pressable>
      </Swipeable>
    );
  }

  // //////////////
  function RenderRightAction(item) {
    return (
      <View style={styles.swipe_container}>
        <Pressable
          onPress={() =>
            Alert.alert(
              'Delete',
              'Are you sure you want to Delete?',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                  // onPress: () => setIsLoggingOut(false),
                },
                {
                  text: 'Delete',
                  style: 'destructive',
                  onPress: () =>
                    deleteUserAction({
                      product_id: item?.product_id,
                      user_id: item?.user_id,
                    }).then(res => {
                      console.log(res, 'response of deleted==========');
                      if (res?.payload?.success === true) {
                        console.log('Deleted');
                        getChatHistory();
                        rowRefs.current[openIndex].close();
                        setOpenIndex(null);
                      }
                    }),
                },
              ],
              {cancelable: false},
            )
          }>
          <CustomIcon
            name={'delete'}
            origin={ICON_TYPE.MATERIAL_ICONS}
            size={30}
            color={'red'}
          />
        </Pressable>
      </View>
    );
  }
  function RenderLeftAction(item, index) {
    console.log(item, 'Item=================');

    return (
      <View style={styles.swipe_container_left}>
        {item.archive_by_self == 'Yes' ? (
          <Pressable
            onPress={() =>
              Alert.alert(
                'Unarchive',
                'Are you sure you want to Unarchive?',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                    // onPress: () => setIsLoggingOut(false),
                  },
                  {
                    text: 'Confirm',
                    style: 'destructive',
                    onPress: () =>
                      unArchiveChatAction({
                        product_id: item?.product_id,
                        user_id: item?.user_id,
                      }).then(res => {
                        console.log(res, 'response of archive==========');
                        if (res?.payload?.success === true) {
                          console.log('fulfilled');
                          getArchiveChatListAction();
                          getChatHistory();
                          rowRefs.current[openIndex].close();
                          setOpenIndex(null);
                        }
                      }),
                  },
                ],
                {cancelable: false},
              )
            }>
            <CustomIcon
              name={'unarchive'}
              origin={ICON_TYPE.MATERIAL_ICONS}
              size={30}
              color={COLORS.APPGREEN}
            />
          </Pressable>
        ) : (
          <Pressable
            onPress={() =>
              Alert.alert(
                'Archive',
                'Are you sure you want to Archive?',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                    // onPress: () => setIsLoggingOut(false),
                  },
                  {
                    text: 'Confirm',
                    style: 'destructive',
                    onPress: () =>
                      archiveChatAction({
                        product_id: item?.product_id,
                        user_id: item?.user_id,
                      }).then(res => {
                        console.log(res, 'response of archive==========');
                        if (res?.payload?.success === true) {
                          console.log('fulfilled');
                          getArchiveChatListAction();
                          getChatHistory();
                          rowRefs.current[openIndex].close();
                          setOpenIndex(null);
                        }
                      }),
                  },
                ],
                {cancelable: false},
              )
            }>
            <CustomIcon
              name={'archive'}
              origin={ICON_TYPE.FOUNDATION}
              size={30}
              color={COLORS.APPGREEN}
            />
          </Pressable>
        )}
      </View>
    );
  }
  console.log(
    chatReducer?.getArchiveChatListAction?.data,
    'chatReducerHistory=============>>>>>>>>>',
  );
  return (
    <Container
      useSafeAreaView={true}
      loading={
        chatReducer?.chatListLoadingStatus === LoadingStatus.LOADING ||
        chatReducer?.archiveChatActionLoadingStatus === LoadingStatus.LOADING ||
        chatReducer?.getArchiveChatListActionLoadingStatus ===
          LoadingStatus.LOADING ||
        chatReducer?.deleteUserActionLoadingStatus === LoadingStatus.LOADING ||
        chatReducer?.unArchiveChatActionLoadingStatus === LoadingStatus.LOADING
      }>
      <Header {...props} updateState={updateState} />

      {/* <Modal
        animationOut={SlideOutDown}
        visible={isModalVisible}
        transparent
        onRequestClose={closeModal} style={{ justifyContent: 'flex-end', margin: 0 }}>
        <Pressable
          style={{ flex: 1, backgroundColor: '#00000030', }}

          onPress={closeModal}>
          <View />
        </Pressable>


        <View style={{
          height: '40%',
          backgroundColor: '#ffffff',
          borderRadius: 10,
          bottom: 0,
        }}>
          <View style={{ marginLeft: 10, marginTop: 10 }}>
            <View style={{ alignSelf: 'center' }}>
             
              <Text style={{ fontSize: 20, fontFamily: 'OpenSans-SemiBold', color: 'black' }}>Filter</Text>
            </View>
          </View>
        </View>
      </Modal> */}

      {ArchieveChats == false ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
          }}>
          <PageTitle title={'Chats'} />
          <View
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              paddingRight: 20,
            }}>
            <Filter
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              handleFilterChange={handleFilterChange}
            />
          </View>
        </View>
      ) : (
        <PageTitle title={'Archive Chats'} />
      )}

      {ArchieveChats == false ? (
        <TouchableOpacity
          styles={styles.ArchiveStyle}
          onPress={() => setArchieveChats(!ArchieveChats)}>
          {/* <View style={{ flexDirection: 'row', }}> */}
          {chatReducer?.getArchiveChatListAction?.data?.length > 0 ? (
            <View
              style={{
                backgroundColor: '#F0F2FA',
                height: 80,
                margin: 10,
                justifyContent: 'center',
              }}>
              <View
                style={{
                  marginHorizontal: 25,
                }}>
                {/* <CustomIcon
            name={'archive'}
            origin={ICON_TYPE.MATERIAL_ICONS}
            size={30}
            color={COLORS.APPGREEN}
            style={{ marginHorizontal: 20 }}
          /> */}
                {chatReducer?.getArchiveChatListAction?.data?.length > 0 ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        color: COLORS.APPGREEN,
                        marginHorizontal: 1,
                        alignSelf: 'center',
                        fontFamily: 'OpenSans-SemiBold',
                        fontSize: SPACING.SCALE_18,
                      }}>
                      Go to Archive Chat
                    </Text>
                    <View
                      style={{
                        height: 30,
                        width: 30,
                        borderRadius: 15,
                        borderWidth: 2,
                        borderColor: COLORS.APPGREEN,
                      }}>
                      <Text
                        style={{
                          position: 'absolute',
                          justifyContent: 'center',
                          alignSelf: 'center',
                          color: COLORS.APPGREEN,
                          paddingTop: SPACING.SCALE_3,
                        }}>
                        {chatReducer?.getArchiveChatListAction?.data?.length}
                      </Text>
                    </View>
                  </View>
                ) : null}

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  {/* <View
                    style={{
                      flexDirection: 'row',
                      width: '90%',
                      overflow: 'hidden',
                    }}>
                    {chatReducer?.getArchiveChatListAction?.data?.map(item => {
                      return (
                        <Text style={{ color: 'black' }}>
                          {`@${item?.user_id_tag}`}
                          {','}{' '}
                        </Text>
                      );
                    })}
                  </View> */}
                </View>
              </View>
            </View>
          ) : null}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          styles={styles.ArchiveStyle}
          onPress={() => setArchieveChats(!ArchieveChats)}>
          {/* <View style={{ flexDirection: 'row', }}>
            <CustomIcon
              name={'unarchive'}
              origin={ICON_TYPE.MATERIAL_ICONS}
              size={30}
              color={COLORS.APPGREEN}
              style={{ marginHorizontal: 15 }}
            />
            <Text style={{ color: COLORS.APPGREEN, alignSelf: 'center', fontFamily: 'OpenSans-SemiBold', fontSize: 16, }}> Normal Chats</Text>
          </View> */}
          <View style={{alignSelf: 'center'}}>
            {/* <CustomIcon
            name={'archive'}
            origin={ICON_TYPE.MATERIAL_ICONS}
            size={30}
            color={COLORS.APPGREEN}
            style={{ marginHorizontal: 20 }}
          /> */}
            <Text
              style={{
                color: COLORS.APPGREEN,
                marginHorizontal: 1,
                alignSelf: 'center',
                fontFamily: 'OpenSans-SemiBold',
                fontSize: 16,
              }}>
              Go to Normal Chat
            </Text>
          </View>
        </TouchableOpacity>
      )}
      {ArchieveChats == false ? (
        <FlatList
          data={chatReducer?.chatList?.data}
          contentContainerStyle={styles.flatlist_container}
          keyExtractor={(item, index) => index.toString()}
          renderItem={RenderItem}
          ListEmptyComponent={EmptyList1}
          onEndReachedThreshold={0.2}
          ItemSeparatorComponent={Seprator}
          // onEndReached={onLoadMore}
          // ListFooterComponent={FooterList}
        />
      ) : (
        <FlatList
          data={chatReducer?.getArchiveChatListAction?.data}
          contentContainerStyle={styles.flatlist_container}
          keyExtractor={(item, index) => index.toString()}
          renderItem={RenderItem}
          ListEmptyComponent={EmptyList2}
          onEndReachedThreshold={0.2}
          ItemSeparatorComponent={Seprator}
          // onEndReached={onLoadMore}
          // ListFooterComponent={FooterList}
        />
      )}
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    chatReducer: state?.chatReducer,
    authReducer: state?.authReducer,
  };
};

const mapDispatchToProps = dispatch => ({
  getChatHistory: params => dispatch(getChatListAction(params)),
  getNotificationCount: params => dispatch(NotificationCount(params)),
  deleteUserAction: params => dispatch(deleteUserAction(params)),
  archiveChatAction: params => dispatch(archiveChatAction(params)),
  unArchiveChatAction: params => dispatch(unArchiveChatAction(params)),
  getArchiveChatListAction: params =>
    dispatch(getArchiveChatListAction(params)),
  userProfile: params => dispatch(userProfile()),
  updateNotificationCount: params => dispatch(NotificationCountUpdateAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);

const styles = StyleSheet.create({
  flatlist_container: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingBottom: 50,
  },
  ArchiveStyle: {
    height: 20,
    justifyContent: 'center',
  },
  seprator: {
    borderWidth: 0.5,
    borderColor: '#00000020',
    paddingHorizontal: 10,
  },
  empty_container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    paddingHorizontal: 40,
  },
  render_container: {
    // height: 80,
    margin: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  swipe_container: {
    margin: 0,
    alignContent: 'center',
    justifyContent: 'center',
    width: 50,
  },
  swipe_container_left: {
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    // backgroundColor: 'yellow',
  },
  chat_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  brand_container: {
    color: '#8F959E',
    fontFamily: FontsConst.OpenSans_Bold,
    fontSize: 12,
  },
  description_container: {
    color: '#8F959E',
    fontFamily: FontsConst.OpenSans_Regular,
    fontSize: 12,
  },
  date_container: {
    color: '#8F959E',
    fontFamily: FontsConst.OpenSans_Regular,
    fontSize: 10,
    marginTop: 10,
  },
  name_container: {
    color: '#00958C',
    fontFamily: FontsConst.Cabin_SemiBold,
    fontSize: 15,
  },
});
