import {
  View,
  Text,
  Pressable,
  Image,
  FlatList,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Container, CustomIcon, CustomText, Spacer} from '@app/components';
import {TextInput} from 'react-native-gesture-handler';
import {COLORS, IMAGES, SPACING} from '@app/resources';
import SearchHeader from '@app/screens/atoms/SearchHeader';
import {connect} from 'react-redux';
import {
  UserSearchAction,
  onUserSearchAction,
  onUserSearchDeleteAction,
  onUserSearchListAction,
} from '@app/store/profileSectionSlice';
import {Avatar, Card, IconButton} from 'react-native-paper';
import {RoutesName} from '@app/helper/strings';
import NavigationService from '@app/navigations/NavigationService';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {
  searchHistoryDelete,
  searchHistoryList,
} from '@app/store/exploreProductSlice';
import {showAlert} from '@app/helper/commonFunction';
import useKeyboardVisible from '@app/hooks/useKeyboardVisible';

export function EmptyList() {
  return (
    <View style={styles.empty_container}>
      <CustomText>No record(s)</CustomText>
    </View>
  );
}

const SearchUserScreen = props => {
  const [searchQuery, onChangeSearch] = useState('');
  const [searchQueryNew, setSearchQueryNew] = useState('');
  const {
    getUserSearching,
    profileSectionReducer,
    getUserList,
    deleteUser,
    getSearchList,
    searchHistoryDelete,
    searchHistoryList,
  } = props;
  const [serachToggle, setSearchToggle] = useState(false);
  console.log('Search user', searchQuery);
  useEffect(() => {
    if (searchQuery) {
      getUserList({keyword: searchQuery, type: 'user'});
    } else {
      getUserList({keyword: '', type: 'user'});
    }
  }, []);

  useEffect(() => {
    if (searchQuery != '') {
      getSearchList(searchQuery);
    }
  }, [searchQuery]);

  console.log(props?.profileSection?.UserSearchAction, 'Props============');
  const Data = props?.profileSection?.UserSearchAction;
  const isKeyboardVisible = useKeyboardVisible();

  return (
    <Container useSafeAreaView={true}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View
          style={{
            // backgroundColor: 'red',

            flexDirection: 'row',

            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Spacer width={10} />
          <Pressable
            onPress={() => {
              props?.navigation?.goBack();
            }}>
            <Image
              style={{
                height: SPACING.SCALE_24,
                width: SPACING.SCALE_24,
                resizeMode: 'cover',
                marginTop: 7,
              }}
              source={IMAGES.BACKARROW}
            />
          </Pressable>

          <SearchHeader
            searchQuery={searchQuery}
            onChangeSearch={onChangeSearch}
            placeholder={'Search by User'}
            onSubmitEditing={() => {
              getUserSearching({keyword: searchQuery, type: 'user'});
            }}
          />
        </View>

        <ScrollView>
          {props?.profileSection?.onUserSearchListAction.length !== 0 && (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  //backgroundColor: 'red',
                  justifyContent: 'space-between',
                  marginHorizontal: SPACING.SCALE_10,
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
                    const params = {deleteKey: 'all', type: 'user'};
                    searchHistoryDelete(params).then(response => {
                      getUserList({keyword: '', type: 'user'});
                      // .then(response => {
                      //   if (response.type.includes('fulfilled')) {
                      //     Al
                      //   }
                      //   //console.log(e, 'respons from delete id history');
                      // });

                      //console.log(e, 'respons from delete id history');
                    });
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
              {props?.profileSection.onUserSearchListAction
                .slice(0, 5)
                .map((item, index) => {
                  console.log('Item', item);
                  return (
                    <View
                      key={item?.id}
                      style={{
                        flexDirection: 'row',
                        margin: 3,
                        // backgroundColor: 'red',
                        justifyContent: 'space-between',
                        left: 10,
                      }}>
                      <Pressable
                        style={{
                          //backgroundColor: 'green',
                          height: 40,
                          width: '80%',
                          justifyContent: 'center',
                        }}
                        onPress={() => {
                          getSearchList(item?.keyword);
                          onChangeSearch(item?.keyword);
                          // setSearchQueryNew(item?.keyword)
                        }}>
                        <Text numberOfLines={1}>{item?.keyword}</Text>
                      </Pressable>

                      <Pressable
                        style={{
                          //backgroundColor: 'green',
                          width: '10%',
                          justifyContent: 'center',
                        }}
                        onPress={() => {
                          console.log('Id====', item.id.toString());
                          const params = {id: item.id, type: 'user'};
                          searchHistoryDelete(params).then(response => {
                            if (response.type.includes('fulfilled')) {
                              showAlert({
                                title: 'success',
                                message: response?.payload?.message,
                              });

                              getUserList({keyword: '', type: 'user'});
                              // searchHistoryList();
                            }
                            //console.log(e, 'respons from delete id history');
                          });
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

          {searchQuery === '' ? (
            <View
              style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
              <Text style={{fontSize: 18}}>
                Please enter something to search
              </Text>
            </View>
          ) : (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  // backgroundColor: 'red',
                  justifyContent: 'space-between',
                  margin: SPACING.SCALE_10,
                }}>
                <Text
                  style={{
                    color: COLORS.BLACK,
                    fontSize: 16,
                    fontWeight: '900',
                  }}>
                  User List
                </Text>
              </View>
              <View
                style={{
                  paddingBottom:
                   ( Platform.OS == 'ios' &&
                    isKeyboardVisible) ?
                    SPACING.SCALE_400 : 0,
                }}>
                <FlatList
                  data={Data}
                  keyExtractor={(item, index) => {
                    item.id;
                  }}
                  renderItem={({item, index}) => {
                    console.log(item, 'sdfghjkl');
                    return (
                      <Pressable
                        style={{marginVertical: 5}}
                        onPress={() => {
                          NavigationService.navigate(
                            RoutesName.PORFILE_SECTION_SCREEN_OTHERS,
                            {
                              userId: item?.id,
                              UserIdTag:item?.user_id_tag,
                            },
                          );
                        }}>
                        <Card.Title
                          title={item.user_id_tag ?? 'No User id'}
                          titleStyle={{fontFamily:'OpenSans-Bold'}}
                          subtitle={item.name}
                          left={props =>
                            item?.image ? (
                              <Image
                                style={{
                                  height: 50,
                                  width: 50,
                                  borderRadius: 25,
                                }}
                                source={{uri: item?.image}}
                              />
                            ) : (
                              <Text style={{textAlign: 'center'}}>
                                No Image
                              </Text>
                            )
                          }
                          //right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => { }} />}
                        />
                      </Pressable>
                    );
                  }}
                  ListEmptyComponent={EmptyList}
                  // style={{paddingBottom: SPACING.SCALE_60}}
                />
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};
const mapStateToProps = state => {
  return {
    profileSection: state?.profileSectionReducer,
    exploreProduct: state?.exploreProductReducer,
  };
};

const mapDispatchToProps = dispatch => ({
  getUserSearching: params => dispatch(onUserSearchAction(params)),
  getUserList: params => dispatch(onUserSearchListAction(params)),
  deleteUser: params => dispatch(onUserSearchDeleteAction(params)),
  getSearchList: params => dispatch(UserSearchAction(params)),
  searchHistoryDelete: params => dispatch(searchHistoryDelete(params)),
  searchHistoryList: params => dispatch(searchHistoryList(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchUserScreen);

const styles = StyleSheet.create({
  empty_container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
});
