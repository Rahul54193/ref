import {
  BackHeader,
  Container,
  CustomIcon,
  NavigationBar,
} from '@app/components';
import { ICON_TYPE } from '@app/components/CustomIcon';
import { RoutesName, LoadingStatus } from '@app/helper/strings';
import NavigationService from '@app/navigations/NavigationService';
import { COLORS, IMAGES, SPACING } from '@app/resources';
import {
  getNotificationPermission,
  updateNotificationPermission,
} from '@app/store/authSlice';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import ToggleSwitch from 'toggle-switch-react-native';

const AccountSetting = props => {
  const {
    navigation,
    route,
    authReducer,
    getNotificationPermission,
    getNotification,
    updateNotificationPermission,
    updateNotification,
  } = props;
  const item = props?.authReducer?.getNotificationDetails;

  useEffect(() => {
    getNotification().then(e => {
      setSwitch(item?.push_notifications);
      setEmailToggle(item?.email_notifications);
    });
  }, [
    props?.authReducer?.getNotificationDetails?.push_notifications,
    props?.authReducer?.getNotificationDetails?.email_notifications,
  ]);

  const [switchOn, setSwitch] = useState(item?.push_notifications);
  const [emailToggle, setEmailToggle] = useState(item?.email_notifications);

  const onToggleNotification = () => {
    var paramsNotification = {
      type: 'push_notifications',
      action: switchOn,
    };
    console.log('sdfghjk');
    setSwitch(!switchOn);

    updateNotification(paramsNotification).then(res => {
      if (res.message === 'Notification status updated successfully.') {
        getNotification;
      }
      console.log(res, '======>>dfghjhgfgf');
    });
  };
  const onToggleEmail = () => {
    var paramsEmail = {
      type: 'email_notifications',
      action: emailToggle,
    };
    setEmailToggle(!emailToggle);

    updateNotification(paramsEmail);
  };
  return (
    <Container
      useSafeAreaView={true}
      loading={
        authReducer?.getNotificationPermissionLoadingStatus ===
        LoadingStatus.LOADING
      }>
      <BackHeader />
      <View style={{ paddingHorizontal: 20 }}>
        <View style={style.Notification}>
          <View style={{ flexDirection: 'row' }}>
            <CustomIcon
              origin={ICON_TYPE.MATERIAL_ICONS}
              name={'notifications-none'}
              color={COLORS.BLACK}
            />
            <Text style={style.text}>Push Notification</Text>
          </View>
          <View>
            <ToggleSwitch
              isOn={switchOn}
              onToggle={e => {
                console.log(e);
                setSwitch(e);
                var paramsNotification = {
                  type: 'push_notifications',
                  action: e,
                };

                updateNotification(paramsNotification);
              }}
              onColor={'#00958C'}
              offColor={'#ACACAC'}
            />
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: SPACING.SCALE_10,
          }}>
          <View style={style.line} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 5,
          }}>
          <View style={{ flexDirection: 'row' }}>
            <CustomIcon
              origin={ICON_TYPE.MATERIAL_COMMUNITY}
              name={'email-outline'}
              color={COLORS.BLACK}
            />
            <Text style={style.text}>Email Notification</Text>
          </View>
          <View>
            <ToggleSwitch
              isOn={emailToggle}
              onToggle={e => {
                console.log(e);
                setEmailToggle(e);
                var paramsEmail = {
                  type: 'email_notifications',
                  action: e,
                };
                setEmailToggle(e);

                updateNotification(paramsEmail);
              }}
              onColor={'#00958C'}
              offColor={'#ACACAC'}
            />
          </View>
        </View>
        <View style={style.line} />
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            NavigationService.navigate(RoutesName.CHANGE_PASSWORD_SCREEN);
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{ flexDirection: 'row' }}>
              <CustomIcon
                origin={ICON_TYPE.FEATHER_ICONS}
                name={'lock'}
                color={COLORS.BLACK}
              />
              <Text style={style.text}>Change Password</Text>
            </View>
            <View>
              <CustomIcon
                origin={ICON_TYPE.FEATHER_ICONS}
                name={'chevron-right'}
                color={COLORS.BLACK}
              />
            </View>
          </View>
        </TouchableOpacity>
        <View style={style.line} />

        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            NavigationService.navigate(RoutesName.UPDATE_MOBILE_NUMBER);
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{ flexDirection: 'row' }}>
              <CustomIcon
                origin={ICON_TYPE.ENTYPO}
                name={'mobile'}
                color={COLORS.BLACK}
              />
              <Text style={style.text}>Change Mobile Number</Text>
            </View>
            <View>
              <CustomIcon
                origin={ICON_TYPE.FEATHER_ICONS}
                name={'chevron-right'}
                color={COLORS.BLACK}
              />
            </View>
          </View>
        </TouchableOpacity>
        <View style={style.line} />
      </View>
    </Container>
  );
};

const style = StyleSheet.create({
  Notification: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    color: COLORS.BLACK,
    marginLeft: 10,
  },
  line: {
    height: 2,
    width: '100%',
    marginHorizontal: 5,
    backgroundColor: 'black',
    flexShrink: 1,
    marginVertical: 15,
    opacity: 0.2,
  },
});

const mapStateToProps = state => {
  return {
    authReducer: state.authReducer,
  };
};
const mapDispatchToProps = dispatch => ({
  getNotification: params => dispatch(getNotificationPermission()),
  updateNotification: params => dispatch(updateNotificationPermission(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AccountSetting);
