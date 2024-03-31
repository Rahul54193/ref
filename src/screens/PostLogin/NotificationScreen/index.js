import React, {useEffect} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {COLORS, IMAGES, SPACING} from '@app/resources';
import {
  BackHeader,
  Container,
  CustomIcon,
  CustomText,
  NavigationBar,
} from '@app/components';
import NotificationCard from '@app/screens/atoms/NotificationCard';
import PageTitle from '@app/screens/atoms/PageTitle';
import {FontsConst} from '@app/assets/assets';
import {Avatar, Divider} from 'react-native-paper';
import {LoadingStatus, RoutesName} from '@app/helper/strings';
import {connect} from 'react-redux';
import authReducer, {
  NotificationCount,
  NotificationListing,
  UpdateNotificationStatus,
} from '@app/store/authSlice';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {EmptyList} from '../ChatScreen/commn';
import moment from 'moment';
import NavigationService from '@app/navigations/NavigationService';
import {useIsFocused} from '@react-navigation/native';
import {width} from '@app/helper/responsiveSize';

export function getTimeDifferenceString(date) {
  const now = new Date();
  const timestamp = new Date(date);

  const timeDifferenceInSeconds = Math.floor((now - timestamp) / 1000);

  if (timeDifferenceInSeconds < 60) {
    return 'few seconds ago';
  } else if (timeDifferenceInSeconds < 3600) {
    const minutes = Math.floor(timeDifferenceInSeconds / 60);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (timeDifferenceInSeconds < 86400) {
    const hours = Math.floor(timeDifferenceInSeconds / 3600);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (timeDifferenceInSeconds < 172800) {
    // 24 * 60 * 60 seconds in a day
    return 'yesterday';
  } else {
    return moment(date).format('D MMM YYYY');
  }
}

const NotificationScreen = props => {
  const {
    navigation,
    route,
    getNotificationList,
    authReducer,
    updateNotificationStatus,
    NotificationCount,
  } = props;
  const isFocused = useIsFocused();
  const onRowClick = item => {
    console.log('Item===', item);
    switch (item.type) {
      case 'price-alert': {
        NavigationService.navigate(RoutesName.PRODUCT_DETAILS, {
          product_id: item?.extra_info,
        });

        break;
      }
      case 'follow-visit': {
        props.navigation?.navigate(RoutesName.PORFILE_SECTION_SCREEN_OTHERS, {
          userId: item?.followed_by?.id,
        });
        break;
      }
      case 'interest-list': {
        props.navigation?.navigate(RoutesName.PORFILE_SECTION_SCREEN_OTHERS, {
          userId: item?.followed_by?.id,
        });
        break;
      }
      default:
        break;
    }
  };
  useEffect(() => {
    if (isFocused) {
      getNotificationList();
      NotificationCount();
    }

    return () => {
      console.log('back from Notiication detail');
      NotificationCount();
    };
  }, [isFocused]);

  // Function to categorize notifications
  function categorizeNotifications(notifications) {
    const today = [];
    const thisWeek = [];
    const older = [];

    notifications.forEach(notification => {
      const createdAt = new Date(notification.created_at);

      // Calculate the time difference in days
      const timeDiff = (Date.now() - createdAt) / (1000 * 60 * 60 * 24);
      if (timeDiff >= 0 && timeDiff < 1) {
        today.push(notification);
      } else if (timeDiff <= 7) {
        thisWeek.push(notification);
      } else {
        older.push(notification);
      }
    });

    // return { today, thisWeek, older };
    const newArr = [];
    if (today.length) {
      newArr.push({
        title: 'Today',
        data: today,
      });
    }
    if (thisWeek.length) {
      newArr.push({
        title: 'This Week',
        data: thisWeek,
      });
    }
    if (older.length) {
      newArr.push({
        title: 'Older',
        data: older,
      });
    }

    return newArr;
  }

  const modified = categorizeNotifications(
    props?.authReducer?.NotificationListing?.data?.notifications ?? [],
  );

  const renderSection = item => {
    const {
      section: {title, data},
    } = item;
    if (data.length) {
      return (
        <View style={styles.section}>
          <CustomText style={styles.titleText}>{title}</CustomText>
        </View>
      );
    }
  };

  const renderItem = ({item}) => {
    console.log(item, '========');
    return (
      <View
        style={[
          item?.pivot?.individual_read == 'unread' && {
            backgroundColor: '#F0F2FA',
            //    backgroundColor: 'red',
          },
        ]}>
        <Pressable
          onPress={() => {
            if (item?.pivot?.individual_read == 'unread') {
              updateNotificationStatus({id: item?.id});
            }
            onRowClick(item);
          }}
          style={styles.row}>
          {item?.followed_by_by?.image ? (
            <View style={{justifyContent: 'center'}}>
              <Avatar.Image
                source={{
                  uri: item?.followed_by_by?.image,
                }}
                size={50}
              />
            </View>
          ) : (
            <View
              style={{
                marginTop: 8,
                height: 55,
                width: 55,
                borderRadius: 55 / 2,
                backgroundColor: COLORS.WHITE,
              }}>
              <Text style={{textAlign: 'center'}}>No Image</Text>
            </View>
          )}

          <View
            style={{
              flex: 1,
              paddingHorizontal: 5,
            }}>
            <CustomText style={styles.notification_title}>
              {item?.message}
            </CustomText>
            <CustomText style={styles.notification_price}>
              {getTimeDifferenceString(`${item?.created_at}`)}
            </CustomText>
          </View>
        </Pressable>
        <Divider style={{marginTop: 10}} />
      </View>
    );
  };

  return (
    <Container
      useSafeAreaView={true}
      loading={authReducer.NotificationListing == LoadingStatus.LOADING}>
      <BackHeader />

      <PageTitle title={'Notifications'} />

      <SectionList
        contentContainerStyle={styles.section_container}
        sections={modified}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={renderSection}
        ListEmptyComponent={EmptyList}
        stickySectionHeadersEnabled={false}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  section_container: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  titleText: {
    fontSize: 16,
    fontFamily: FontsConst.Cabin_Bold,
    marginBottom: 10,
  },
  section: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  notification_title: {
    fontSize: 14,
    fontFamily: FontsConst.OpenSans_Regular,
    color: '#000000',
    marginTop: 5,
    maxWidth: width * 0.8,
  },
  notification_price: {
    fontSize: 12,
    fontFamily: FontsConst.OpenSans_Regular,
    color: '#00000080',
    marginTop: 5,
  },
});

const mapStateToProps = state => {
  return {
    authReducer: state.authReducer,
  };
};
const mapDispatchToProps = dispatch => ({
  getNotificationList: params => dispatch(NotificationListing()),
  updateNotificationStatus: params =>
    dispatch(UpdateNotificationStatus(params)),
  NotificationCount: params => dispatch(NotificationCount(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);
