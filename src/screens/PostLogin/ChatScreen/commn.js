import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { CustomIcon, CustomText } from '@app/components';
import { ICON_TYPE } from '@app/components/CustomIcon';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import NavigationService from '@app/navigations/NavigationService';
import { RoutesName } from '@app/helper/strings';
import { ActivityIndicator, Avatar } from 'react-native-paper';
import { FontsConst } from '@app/assets/assets';
import moment from 'moment';
import { addEllipsis } from '@app/helper/commonFunction';
import { COLORS } from '@app/resources';
import { deleteUserAction } from '@app/store/chatSlice';
import { useDispatch } from 'react-redux';

export function Seprator() {
  return <View style={styles.seprator} />;
}

export function EmptyList() {
  return (
    <View style={styles.empty_container}>
      <CustomText>No record(s)</CustomText>
    </View>
  );
}
export function EmptyList1() {
  return (
    <View style={styles.empty_container}>
      <CustomText style={{ textAlign: 'center', color: '#00958C' }}>
        You have not any active conversations yet!
      </CustomText>
      <CustomText style={{ textAlign: 'center' }}>
        You can start new conversation from product detail screen.
      </CustomText>
    </View>
  );
}
export function EmptyList2() {
  return (
    <View style={styles.empty_container}>
      <CustomText style={{ textAlign: 'center', color: '#00958C' }}>
        You have not any archive conversations yet!
      </CustomText>
      {/* <CustomText style={{ textAlign: 'center' }}>
        You can start new conversation from product detail screen.
      </CustomText> */}
    </View>
  );
}




export function FooterList() {
  return <ActivityIndicator size={20} />;
}

export function commn() {
  return (
    <View>
      <Text>commn</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
    height: 80,
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
  },
  name_container: {
    color: '#00958C',
    fontFamily: FontsConst.Cabin_SemiBold,
    fontSize: 15,
  },
});
