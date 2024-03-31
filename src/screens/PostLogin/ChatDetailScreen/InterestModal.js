import {FontsConst} from '@app/assets/assets';
import {
  CustomIcon,
  CustomText,
  KeyboardAwareView,
  SubmitButton,
} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {LoadingStatus} from '@app/helper/strings';
import useDebounce from '@app/hooks/useDebounce';
import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {EmptyList} from '../ChatScreen/commn';
import ClearableSearch from '@app/screens/atoms/ClearableSearch';
import {IMAGES, SPACING} from '@app/resources';
import {width} from '@app/helper/responsiveSize';

const InterestModal = props => {
  const {
    setAddModalVisible,
    modalVisible,
    setModalVisible,
    authReducer,
    exploreProduct,
    route,
    getIntersetList,
    chatReducer,
    onAddIntersetList,
  } = props;
  const {chat_item} = route.params;
  console.log(
    'IDSSSS',
    chat_item,
    chatReducer.getIntersetList,
    authReducer.userProfileDetails,
    exploreProduct.productDetails,
    authReducer.userProfileDetails.id,
  );
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [draftData, setdraftData] = useState([]);

  const query = useDebounce(search);

  const sellerID = exploreProduct?.productDetails?.user?.id;
  const userID =
    authReducer.userProfileDetails.id ===
    exploreProduct?.productDetails?.user?.id
      ? chat_item.user_id
      : authReducer.userProfileDetails.id;

  const isSeller =
    exploreProduct?.productDetails?.user?.id ===
    authReducer.userProfileDetails.id;

  useEffect(() => {
    if (exploreProduct?.productDetailsLoadingStatus === LoadingStatus.LOADED) {
      getIntersetList({
        seller_id: sellerID,
        user_id: userID,
        keyword: search,
      });
    }
  }, [query, exploreProduct?.productDetailsLoadingStatus]);

  useEffect(() => {
    if (
      chatReducer.getIntersetListLoadingStatus === LoadingStatus.LOADED ||
      chatReducer.addInIntersetListLoadingStatus === LoadingStatus.LOADED
    ) {
      setData(chatReducer.getIntersetList?.data);
      setdraftData(chatReducer.getIntersetList?.drafts);
    }
  }, [chatReducer]);

  const addIntersetList = () => {
    // seller_id=36&user_id=5&all_selected=_2,149_1,152_4&selected[0]=152_4&selected[1]=155_&keyword=test
    const params = {
      seller_id: sellerID,
      user_id: userID,
      all_selected: chatReducer.getIntersetList?.all_selected,
      keyword: search,
    };

    const selectedItems = {};

    [...data, ...draftData].forEach((item, index) => {
      if (item.checked === true) {
        selectedItems[`selected[${index}]`] = item.p_interest;
      }
    });
    const dataToSent = {...params, ...selectedItems};
    onAddIntersetList(dataToSent).then(res => {
      if (res.type.includes('addIntersetListOnChat/fulfilled')) {
        alert(res?.payload?.message);
        setModalVisible(false);
      }
    });
  };

  const onUpdateRow = item => {
    const updatedDataArray = data.map(a => {
      if (a.id === item.id) {
        return {...a, checked: !item.checked};
      }
      return a;
    });
    const updatedDraftArray = draftData.map(a => {
      if (a.id === item.id) {
        return {...a, checked: !item?.checked};
      }
      return a;
    });
    setData(updatedDataArray);
    setdraftData(updatedDraftArray);
  };

  const renderItem = ({item, index}) => {
    console.log('Item INterewstlist', item);
    return (
      <View style={styles.listContainer}>
        <Pressable
          style={styles.checkBoxContainer}
          onPress={() => onUpdateRow(item)}>
          <CustomIcon
            origin={ICON_TYPE.MATERIAL_ICONS}
            name={item?.checked ? 'check-box' : 'check-box-outline-blank'}
            color={item?.checked ? '#00958C' : '#868686'}
            size={20}
          />
        </Pressable>
        <View style={styles.product}>
          <Image style={styles.avatar} source={{uri: item?.thumb_image}} />
          <View
            style={{
              paddingLeft: 15,
              // backgroundColor: 'red',
            }}>
            {/* <CustomText style={styles.brandtext}>{item?.title}</CustomText> */}
            <View
              style={{
                flexDirection: 'row',
                maxWidth: width * 0.6,
                flexWrap: 'wrap',
              }}>
              <CustomText style={styles.brandtext}>
                {/* {item?.brand?.name} */}
              </CustomText>
              <CustomText style={styles.brandtext}> </CustomText>
              <CustomText style={styles.brandtext}>
                {item?.model?.name}
              </CustomText>
              <CustomText style={styles.brandtext}> </CustomText>
              {item?.dial_name ? (
                <View>
                  <CustomText style={styles.brandtext}>
                    {item?.dial_name} Dial
                  </CustomText>
                </View>
              ) : null}
            </View>
            {item?.bracelet_acc_name ? (
              <View>
                <CustomText style={styles.brandtext}>
                  {item?.bracelet_acc_name}{' '}
                </CustomText>
              </View>
            ) : null}

            <View style={styles.price_row}>
              <CustomText style={styles.price}>${item?.price}</CustomText>
              <View style={styles.circle} />
              <CustomText style={styles.condition}>
                {item?.watch_condition === 'brand_new'
                  ? 'Brand New'
                  : 'Pre Owned'}
              </CustomText>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderDraftItem = ({item, index}) => {
    console.log('ASDVAD#$#$', item);

    return (
      <View key={index} style={[styles.listContainer]}>
        <Pressable
          style={styles.checkBoxContainer}
          onPress={() => onUpdateRow(item)}>
          <CustomIcon
            origin={ICON_TYPE.MATERIAL_ICONS}
            name={item?.checked ? 'check-box' : 'check-box-outline-blank'}
            color={item?.checked ? '#00958C' : '#868686'}
            size={20}
          />
        </Pressable>
        <View style={[styles.product]}>
          <CustomIcon
            style={{borderWidth: 1, borderRadius: 8, borderColor: '#00000040'}}
            name={'watch'}
            origin={ICON_TYPE.MATERIAL_ICONS}
            size={40}
            color={'#000000'}
          />
          <View
            style={{
              paddingLeft: 15,
              // backgroundColor: 'red',
              maxWidth: width * 0.6,
            }}>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              <CustomText style={styles.brandtext}>
                {item?.brand_name}
              </CustomText>
              <CustomText style={styles.brandtext}>{'  '}</CustomText>
              <CustomText style={styles.brandtext}>
                {item?.model_name}
              </CustomText>

              <CustomText style={styles.brandtext}>{'  '}</CustomText>
              {item?.dial_name ? (
                <View>
                  <CustomText style={styles.brandtext}>
                    {item?.dial_name} Dial
                  </CustomText>
                </View>
              ) : null}
            </View>
            {item?.bracelet_acc_name ? (
              <View>
                <CustomText style={styles.brandtext}>
                  {item?.bracelet_acc_name}
                </CustomText>
              </View>
            ) : null}
            <View style={styles.price_row}>
              <CustomText style={styles.price}>
                {item?.price ? '$ ' + item.price : 'Draft'}
              </CustomText>
              <View style={styles.circle} />
              <CustomText style={styles.condition}>
                {item?.condition === 'brand_new' ? 'Brand New' : 'Pre Owned'}
              </CustomText>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const addButton = () => {
    return (
      <View style={[styles.listContainer]}>
        <View
          style={styles.checkBoxContainer}
          // onPress={() => onUpdateRow(item)}
        >
          <CustomIcon
            origin={ICON_TYPE.MATERIAL_ICONS}
            name={true ? 'check-box' : 'check-box-outline-blank'}
            color={true ? '#00958C' : '#868686'}
            size={20}
          />
        </View>
        <Pressable
          onPress={() => {
            setModalVisible(false);
            setAddModalVisible(true);
          }}
          style={[
            styles.product,
            {
              borderColor: '#00958C',
              borderWidth: 1,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}>
          <View
            style={{
              paddingLeft: 15,
              height: SPACING.SCALE_50,
              justifyContent: 'center',
            }}>
            <CustomText style={[styles.brandtext, {color: '#00958C'}]}>
              {'+ Add New Product'}
            </CustomText>
          </View>
        </Pressable>
      </View>
    );
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
        setData(chatReducer.getIntersetList?.data);
        setdraftData(chatReducer.getIntersetList?.drafts);
      }}>
      <KeyboardAwareView style={styles.container}>
        <Pressable
          style={styles.backdrop}
          onPress={() => {
            setModalVisible(!modalVisible);
            setData(chatReducer.getIntersetList?.data);
            setdraftData(chatReducer.getIntersetList?.drafts);
          }}
        />
        <View style={styles.card_container}>
          <View style={styles.border} />
          <CustomText style={styles.interest_text}>
            Select watch to which user mark their interest
          </CustomText>
          <View style={styles.input}>
            <ClearableSearch search={search} setSearch={setSearch} />
          </View>
          {chatReducer.getIntersetListLoadingStatus ===
          LoadingStatus.LOADING ? (
            <View
              style={{
                flexGrow: 0.94,
                alignItems: 'center',
                justifyContent: 'center',
                //paddingBottom: 20,
              }}>
              <ActivityIndicator size={'large'} />
            </View>
          ) : (
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.flatListContainer}
              data={data}
              renderItem={renderItem}
              ListEmptyComponent={EmptyList}
              ListHeaderComponent={() => {
                return (
                  <>
                    {isSeller ? addButton() : null}
                    {draftData &&
                      draftData.map((item, index) => {
                        return renderDraftItem({item, index});
                      })}
                  </>
                );
              }}
            />
          )}
          <SubmitButton
            // buttonStyle={{: }}
            lable="Add to interest list"
            onPress={addIntersetList}
          />
        </View>
      </KeyboardAwareView>
      {/* <AddInterestModal
        modalVisible={addModalVisible}
        setModalVisible={setAddModalVisible}
        {...props}
      /> */}
    </Modal>
  );
};

export default InterestModal;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#00000040',
  },
  backdrop: {
    height: '10%',
  },
  border: {
    width: 60,
    height: 3,
    backgroundColor: '#B1B1B1',
    borderRadius: 2,
    marginVertical: 10,
    alignSelf: 'center',
  },
  interest_text: {
    color: '#000000',
    fontFamily: FontsConst.Cabin_Bold,
    fontSize: 20,
    paddingHorizontal: 20,
  },
  card_container: {
    height: '90%',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 0,
    flex: 1,
    flexDirection: 'column',
  },
  product: {
    // height: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    width: '85%',
    // backgroundColor: 'red',
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 10,
    backgroundColor: '#D9D9D9',
  },
  brandtext: {
    color: '#000000',

    fontFamily: FontsConst.Cabin_Bold,
    maxWidth: width * 0.55,
    //paddingVertical: 15,
  },
  price_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    color: '#00958C',
    fontFamily: FontsConst.Cabin_Bold,
    fontSize: 15,
  },
  condition: {
    color: '#00958C',
    fontFamily: FontsConst.Cabin_Regular,
    fontSize: 12,
  },
  circle: {
    height: 4,
    width: 4,
    borderRadius: 2,
    backgroundColor: '#00958C',
    marginHorizontal: 2,
  },
  listContainer: {
    // height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: SPACING.SCALE_15,
    paddingRight: 10,
  },
  flatListContainer: {
    flexGrow: 1,
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 40,
  },
  checkBoxContainer: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
});
