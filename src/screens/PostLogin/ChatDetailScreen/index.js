import {Container, CustomText, KeyboardAwareView} from '@app/components';
import {showAlert} from '@app/helper/commonFunction';
import {LoadingStatus} from '@app/helper/strings';
import {
  addDraftInInterestListAction,
  addIntersetListOnChat,
  chatUserDetailAction,
  getChatHistoryAction,
  getChatListAction,
  getInteresteListOnChat,
  onNewMessageUpdate,
  readUnreadAction,
  sendMessageAction,
  socketJoinAction,
} from '@app/store/chatSlice';
import {getProductDetailsAction} from '@app/store/exploreProductSlice';
import {useEffect, useRef, useState} from 'react';
import {Platform, Pressable, StyleSheet, View, ScrollView} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import {AndroidCameraPermission} from '../../../../androidcamerapermission';
import ActionContainer from './ActionContainer';
import Header from './Header';
import ImageModal from './ImageModal';
import InterestModal from './InterestModal';
import MakeOfferModal from './MakeOfferModal';
import {RenderItem} from './common';

import socket from '@app/helper/socket';
import useSocket from '@app/hooks/useSocket';
import {
  getAllBrandAction,
  getAllProductDropdownAction,
  getAllProductModelAction,
} from '@app/store/productSlice';
import {GiftedChat} from 'react-native-gifted-chat';
import {transformedMessages} from '../../../helper/commonFunction';
import FullScreenModal from '../../atoms/FullScreenModal';
import AddInterestModal from './AddInterestModal';
import {
  onFollowClickAction,
  profileAboutAction,
} from '@app/store/profileSectionSlice';
import {Chip} from 'react-native-paper';
import useKeyboardVisible from '@app/hooks/useKeyboardVisible';
import {onOfferAccepted} from '@app/store/chatSlice/chat.slice';
import {userProfile} from '@app/store/authSlice';

const customMessage = ['Hello', 'Hi', "I'm interested in this product."];
const ChatDetailScreen = props => {
  const {
    chatReducer,
    authReducer,
    getChatDetails,
    getProductDetails,
    sendChatMessage,
    updateSocketId,
    getChatHistory,
    updateNewMessage,
    getAllBrand,
    navigation,
    exploreProduct,
    followClickAction,
    route,
    getProfile,
    readUnread,
    userProfile,
    getAllProductDropdownAction,
    onAddIntersetList,
    onAddDraftInteresetList,
  } = props;
  // console.log('===kkkkkkkkk', props?.chatReducer);
  const dispatch = useDispatch();
  const flatRef = useRef();
  const [initialLoad, setInitialLoad] = useState(true);

  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [offerModalVisible, setOfferModalVisible] = useState(false);
  const [interestModalVisible, setInterestModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [fullImageVisible, setFullImageVisible] = useState({
    visible: false,
    uri: '',
    type: '',
  });

  const [loading, setLoading] = useState(true);
  const [forOfferAccepted, setForOfferAccepted] = useState(false);
  const isKeyboardVisible = useKeyboardVisible();
  const {chat_item, isOffer} = route.params;
  console.log('============chat_item=============', chat_item);

  //  Use socket
  useSocket({updateNewMessage, chat_item});

  // First render
  useEffect(() => {
    if (isOffer) {
      setOfferModalVisible(true);
    }
    getChatDetails({
      product_id: chat_item?.product_id,
      receiver_id: chat_item?.user_id,
    }).then(res => {
      if (res?.type.includes('fulfilled')) {
        setLoading(false);
      }
    });
    readUnread({
      product_id: chat_item?.product_id,
      receiver_id: chat_item?.user_id,
    });
    getProfile({
      userId: chat_item?.user_id,
    });
    getAllBrand();
    getProductDetails({
      product_id: chat_item?.product_id,
    });
    updateSocketId({
      socket_id: socket?.id,
    });
    return () => {
      console.log('back from chat detail');
      readUnread({
        product_id: chat_item?.product_id,
        receiver_id: chat_item?.user_id,
      }).then(res => {
        // console.log(res, '====<<<<<');
        // console.log('back from  res chat detail');
        getChatHistory();
        userProfile();
      });
    };
  }, [props.route.params.chat_item]);

  useEffect(() => {
    getAllProductDropdownAction();
  }, []);

  useEffect(() => {
    return () => {
      // console.log('back from  res chat detail');
      getChatHistory();
    };
  }, []);

  // console.log('chatreducer=============', authReducer?.userProfileDetails?.id);
  const isSeller =
    exploreProduct?.productDetails?.user?.id ===
    authReducer.userProfileDetails.id;
  // console.log('IsSeller==', isSeller);
  //  Send text message
  const sendMessage = ({type = 'text', message}) => {
    if (chatReducer?.chatHistory?.length >= 1) {
      scrollToIndex(0);
    }

    const formData = new FormData();
    formData.append('receiver_id', chat_item?.user_id);
    formData.append('type', type);
    formData.append('product_id', chat_item?.product_id);
    if (chatReducer?.chatHistory[0]?.archive_by != null) {
      formData.append('archive_by', chatReducer?.chatHistory[0]?.archive_by);
    }

    if (type === 'text' || type === 'make_offer') {
      formData.append('message', message);
    } else if (type === 'pdf') {
      formData.append('media', {
        name: message?.name ?? 'PDF' + Date.now() + '.pdf',
        type: message.type,
        uri: message?.uri,
      });
      formData.append('message', 'PDF');
    } else if (type === 'image') {
      const d = message?.path?.split('/');
      const name = d[d.length - 1];
      formData.append('media', {
        name: name ?? 'Image' + Date.now() + '.jpg',
        type: message.mime,
        uri:
          Platform.OS === 'ios'
            ? message.path.replace('file://', '')
            : message.path,
      });
      formData.append('message', 'Image');
    } else if (type === 'video') {
      const d = message?.path?.split('/');
      const name = d[d.length - 1];
      formData.append('media', {
        name: name ?? 'Video' + Date.now() + '.mp4',
        type: message.mime,
        uri:
          Platform.OS === 'ios'
            ? message.path.replace('file://', '')
            : message.path,
      });
      formData.append('message', 'Video');
    }
    sendChatMessage(formData);
  };

  const onAcceptReject = (type, messageId) => {
    // console.log('$$$$$$$$$$$$$$$$$$$$%%%%%', type);
    dispatch(onOfferAccepted(true));
    if (chatReducer?.chatHistory?.length >= 1) {
      scrollToIndex(0);
    }

    const formData = new FormData();
    formData.append('receiver_id', chat_item?.user_id);
    formData.append('buyer_id', chat_item?.user_id);
    formData.append('type', 'make_offer');
    formData.append('product_id', chat_item?.product_id);
    formData.append('message', type === 'accepted' ? 'Accepted' : 'Rejected');
    formData.append(
      'offer_action',
      type === 'accepted' ? `accepted_${messageId}` : `rejected_${messageId}`,
    );
    formData.append('isOfferAccepted', type);
    formData.append('seller_id', exploreProduct?.productDetails?.user?.id);
    sendChatMessage(formData);
  };

  // Open attachment modal if permission
  const sendAttachment = async () => {
    const permissionStatus = await AndroidCameraPermission();
    if (permissionStatus) {
      setImageModalVisible(!imageModalVisible);
    } else {
      showAlert({
        title: 'Error!',
        message: 'Permission denied',
      });
    }
  };

  const onFollowClick = () => {
    followClickAction({
      user_id: chat_item?.user_id,
      followed_visited_by: authReducer?.userProfileDetails?.id,
      type: 'follow',
    }).then(res => {
      if (res?.type.includes('fulfilled')) {
        getProfile({
          userId: chat_item?.user_id,
        });
        showAlert({
          title: 'Success',
          message: res?.payload?.message,
        });
      }
      if (res?.type.includes('rejected')) {
        showAlert({
          title: 'Error',
          message: res?.payload?.message ?? 'Internal server error!',
        });
      }
    });
  };

  const scrollToIndex = index => {
    if (flatRef.current) {
      flatRef.current._listRef.scrollToIndex({
        // animated: true,
        index: index,
      });
    }
  };
  //  For moving chat on search index
  useEffect(() => {
    if (chatReducer?.chatHistory && chatReducer?.chatHistory.length) {
      if (initialLoad && flatRef.current) {
        const findIndex = chatReducer?.chatHistory?.findIndex(
          (item, index) => item.id === chat_item.id,
        );

        if (findIndex >= 0) {
          flatRef.current._listRef?.scrollToOffset({
            offset: findIndex * 1000,
            // animated: true,
          });
          const wait = new Promise(resolve => setTimeout(resolve, 2000));
          wait
            .then(() => {
              scrollToIndex(findIndex);
              setInitialLoad(false);
            })
            .catch(err => {
              console.log('errrr', err);
            });
        }
      }
    }
  }, [chatReducer, initialLoad]);

  // const reversedData = (chatReducer?.chatHistory ?? []).slice().reverse();
  const modifyData = transformedMessages(chatReducer?.chatHistory);
  const hasEnabledObject = chatReducer?.chatHistory.some(
    obj => obj.isOfferAccepted === 'accepted',
  );

  // console.log(
  //   'hasEnabledObject=============>',
  //   hasEnabledObject,
  //   chatReducer?.chatHistory,
  // );

  return (
    <Container
      style={{
        backgroundColor: '#FFFFFF90',
      }}
      useSafeAreaView={true}
      loading={loading || chatReducer?.offerAccepted}>
      <Header chat_item={chat_item} onFollowClick={onFollowClick} {...props} />
      {Platform.select({
        ios: (
          <ScrollView
            scrollEnabled={false}
            nestedScrollEnabled={false}
            contentContainerStyle={{
              height: isKeyboardVisible ? 700 : '100%',
            }}>
            <GiftedChat
              messageContainerRef={ref => (flatRef.current = ref)}
              keyboardShouldPersistTaps="never"
              messages={modifyData}
              listViewProps={{
                contentContainerStyle: {
                  margin: 0,
                  padding: 0,
                },
              }}
              renderComposer={null}
              bottomOffset={0}
              renderAvatar={null}
              renderActions={() => null}
              renderChatFooter={() => null}
              renderSend={() => null}
              renderBubble={props => {
                return RenderItem({
                  ...props,
                  chatReducer: chatReducer,

                  isSeller: isSeller,
                  hasEnabledObject: hasEnabledObject,
                  onAcceptReject: onAcceptReject,
                  setFullImageVisible: setFullImageVisible,
                  callback: () => {
                    getChatDetails({
                      product_id: chat_item?.product_id,
                      receiver_id: chat_item?.user_id,
                    });
                  },
                });
              }}
              user={{
                _id: `${authReducer?.userProfileDetails?.id}`,
              }}
              minInputToolbarHeight={5}
              renderInputToolbar={props => {}}
              renderFooter={
                modifyData.length
                  ? null
                  : () => {
                      return (
                        <View
                          style={{
                            paddingHorizontal: 20,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            paddingBottom: 20,
                          }}>
                          {customMessage.map((item, index) => {
                            return (
                              <Chip
                                style={{
                                  margin: 5,
                                }}
                                onPress={() =>
                                  sendMessage({
                                    type: 'text',
                                    message: item,
                                  })
                                }>
                                {item}
                              </Chip>
                            );
                          })}
                        </View>
                      );
                    }
              }
            />
          </ScrollView>
        ),
        android: (
          <View
            style={{
              flex: 1,
            }}>
            <GiftedChat
              messageContainerRef={ref => (flatRef.current = ref)}
              keyboardShouldPersistTaps="never"
              messages={modifyData}
              listViewProps={{
                contentContainerStyle: {
                  margin: 0,
                  padding: 0,
                },
              }}
              renderComposer={null}
              bottomOffset={0}
              renderAvatar={null}
              renderActions={() => null}
              renderChatFooter={() => null}
              renderSend={() => null}
              renderBubble={props => {
                return RenderItem({
                  ...props,
                  chatReducer: chatReducer,

                  isSeller: isSeller,
                  hasEnabledObject: hasEnabledObject,
                  onAcceptReject: onAcceptReject,
                  setFullImageVisible: setFullImageVisible,
                  callback: () => {
                    getChatDetails({
                      product_id: chat_item?.product_id,
                      receiver_id: chat_item?.user_id,
                    });
                  },
                });
              }}
              user={{
                _id: `${authReducer?.userProfileDetails?.id}`,
              }}
              minInputToolbarHeight={5}
              renderInputToolbar={props => {}}
              renderFooter={
                modifyData.length
                  ? null
                  : () => {
                      return (
                        <View
                          style={{
                            paddingHorizontal: 20,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                          }}>
                          {customMessage.map((item, index) => {
                            return (
                              <Chip
                                style={{
                                  margin: 5,
                                }}
                                onPress={() =>
                                  sendMessage({
                                    type: 'text',
                                    message: item,
                                  })
                                }>
                                {item}
                              </Chip>
                            );
                          })}
                        </View>
                      );
                    }
              }
            />
          </View>
        ),
      })}

      {hasEnabledObject ? null : (
        <KeyboardAwareView>
          <ActionContainer
            isSeller={isSeller}
            onAttachmentClick={sendAttachment}
            onSendMessageClick={sendMessage}
            onInterestClick={() =>
              setInterestModalVisible(!interestModalVisible)
            }
            onMakeOfferClick={() => setOfferModalVisible(!offerModalVisible)}
            {...props}
          />
        </KeyboardAwareView>
      )}
      {/* Image Modal */}
      <ImageModal
        modalVisible={imageModalVisible}
        setModalVisible={setImageModalVisible}
        sendMessage={sendMessage}
      />
      {/* Make Offer Modal */}
      {hasEnabledObject ? null : (
        <MakeOfferModal
          modalVisible={offerModalVisible}
          setModalVisible={setOfferModalVisible}
          sendMessage={sendMessage}
        />
      )}
      {/* Interest List Modal */}
      <InterestModal
        modalVisible={interestModalVisible}
        setModalVisible={setInterestModalVisible}
        setAddModalVisible={setAddModalVisible}
        {...props}
      />
      {/* Add New Watch Modal */}
      <AddInterestModal
        modalVisible={addModalVisible}
        setModalVisible={setAddModalVisible}
        {...props}
      />
      {/* Full Screen Image Modal */}

      <FullScreenModal
        selectedFile={fullImageVisible}
        onClose={() => {
          setFullImageVisible({
            visible: false,
            uri: '',
            type: '',
          });
        }}
      />
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    chatReducer: state?.chatReducer,
    authReducer: state?.authReducer,
    exploreProduct: state?.exploreProductReducer,
    productReducer: state?.productReducer,
    profileSectionReducer: state?.profileSectionReducer,
  };
};

const mapDispatchToProps = dispatch => ({
  getChatDetails: params => dispatch(getChatHistoryAction(params)),
  getChatHistory: params => dispatch(getChatListAction(params)),
  getAllBrand: params => dispatch(getAllBrandAction(params)),
  getAllProductModel: params => dispatch(getAllProductModelAction(params)),
  getProductDetails: params => dispatch(getProductDetailsAction(params)),
  updateSocketId: params => dispatch(socketJoinAction(params)),
  sendChatMessage: params => dispatch(sendMessageAction(params)),
  updateNewMessage: params => dispatch(onNewMessageUpdate(params)),
  getIntersetList: params => dispatch(getInteresteListOnChat(params)),
  followClickAction: params => dispatch(onFollowClickAction(params)),
  onAddDraftInteresetList: params =>
    dispatch(addDraftInInterestListAction(params)),
  onAddIntersetList: params => dispatch(addIntersetListOnChat(params)),
  getProfile: params => dispatch(chatUserDetailAction(params)),
  readUnread: params => dispatch(readUnreadAction(params)),
  userProfile: params => dispatch(userProfile()),
  getAllProductDropdownAction: params =>
    dispatch(getAllProductDropdownAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatDetailScreen);

const styles = StyleSheet.create({
  flatlist_container: {
    flexGrow: 1,
    marginHorizontal: 20,
    paddingVertical: 10,
  },
});
