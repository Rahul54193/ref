import { RoutesName } from '@app/helper/strings';
import useDebounce from '@app/hooks/useDebounce';
import { COLORS, IMAGES, SPACING } from '@app/resources';
import ClearableSearch from '@app/screens/atoms/ClearableSearch';
import { useFocusEffect } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

const Header = props => {
  const {
    getChatHistory,
    navigation,
    authReducer,
    getNotificationCount,
    updateState,
    updateNotificationCount
  } = props;
  const NotifyCount = props?.authReducer.NotificationCountStatus;

  const [search, setSearch] = useState('');
  const searchQuery = useDebounce(search);
  // console.log(, "PropsValue=============")
  useEffect(() => {
    // getChatHistory({keyword: searchQuery});
    updateState(searchQuery);

    getNotificationCount();
  }, [searchQuery]);

  return (
    <View style={styles.search_container}>
      <View style={{ width: '90%' }}>
        <ClearableSearch
          placeholder="Search by keyword"
          search={search}
          setSearch={setSearch}
        />
      </View>
      <Pressable
        onPress={() => {
          navigation?.navigate(RoutesName.NOTIFICATION_SCREEN);
          updateNotificationCount();
        }}
        style={{ marginLeft: SPACING.SCALE_10, marginTop: SPACING.SCALE_8 }}>
        <Image source={IMAGES.notificationBell} />
        {NotifyCount?.total_unread > 0 ? (
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
              {NotifyCount?.total_unread}
            </Text> */}
          </View>
        ) : null}
      </Pressable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  search_container: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});
