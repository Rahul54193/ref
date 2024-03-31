/* eslint-disable react-native/no-inline-styles */
import { FontsConst } from '@app/assets/assets';
import { CustomIcon, CustomText } from '@app/components';
import { ICON_TYPE } from '@app/components/CustomIcon';
import { RoutesName } from '@app/helper/strings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Alert, Platform, Pressable, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import {
  ChatScreen,
  ExploreScreen,
  FreshFindScreen,
  MyProfileScreen,
  ProfileSection,
  SellScreen,
} from '@app/screens';
import useKeyboardVisible from '@app/hooks/useKeyboardVisible';
import SellStackNavigator from './SellStackNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction, userProfile } from '@app/store/authSlice';
import ChatStackNavigator from './ChatStackNavigator';
import { showAlert } from '@app/helper/commonFunction';
import { COLORS, SPACING } from '@app/resources';

const Tab = createBottomTabNavigator();

const CustomsellButton = ({ children, onPress, accessibilityState }) => {
  const keyboardVisible = useKeyboardVisible();

  return (
    <Pressable
      onPress={onPress}
      style={{
        top: keyboardVisible ? 0 : Platform.OS === 'ios' ? -5 : -16,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          height: SPACING.SCALE_60,
          width: SPACING.SCALE_60,
          borderRadius: SPACING.SCALE_10,
          backgroundColor: '#000',
          // backgroundColor: 'red',
        }}>
        {children}
      </View>
      <CustomText
        style={{
          fontSize: SPACING.SCALE_12,
          fontFamily: FontsConst.Cabin_SemiBold,
          color: accessibilityState?.selected ? '#00958C' : '#000000',
        }}>
        Sell
      </CustomText>
    </Pressable>
  );
};

const screenOptions = ({ route }) => ({
  headerShown: false,
  tabBarActiveTintColor: '#00958C',
  tabBarInactiveTintColor: '#000000',
  tabBarShowLabel: false,
  tabBarHideOnKeyboard: true,
  unmountOnBlur: true,
  tabBarItemStyle: {
    width: SPACING.SCALE_80,
    // paddingHorizontal: 0,
    // padding: 0,
    height: SPACING.SCALE_60,
    // backgroundColor: 'red',
  },
  tabBarLabelStyle: {
    fontSize: SPACING.SCALE_12,
    fontFamily: FontsConst.Cabin_SemiBold,
  },
  tabBarStyle: {
    width: 'auto',
    height: Platform.OS === 'ios' ? SPACING.SCALE_80 : SPACING.SCALE_60,
  },
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;
    let origin;
    switch (route.name) {
      case RoutesName.EXPLORE_TAB:
        iconName = 'search';
        origin = ICON_TYPE.FEATHER_ICONS;
        break;
      case RoutesName.FRESH_FINDS_TAB:
        iconName = 'zap';
        origin = ICON_TYPE.FEATHER_ICONS;
        break;
      // case RoutesName.SELL_TAB:
      //   iconName = 'plus';
      //   origin = ICON_TYPE.OCTICONS;
      //   color = focused ? color : '#ffffff';
      //   break;
      // case RoutesName.CHAT_TAB:
      //   iconName = 'message-square';
      //   origin = ICON_TYPE.FEATHER_ICONS;

      // {
      //   true
      //     ? ((iconName = 'message-badge-outline'),
      //       (origin = ICON_TYPE.MATERIAL_COMMUNITY))
      //     : ((iconName = 'message-square'),
      //       (origin = ICON_TYPE.FEATHER_ICONS));

      // }

      //  break;
      case RoutesName.PROFILE_SECTION_SCREEN:
        iconName = 'user';
        origin = ICON_TYPE.FEATHER_ICONS;
        break;
      default:
        return;
    }
    // console.log('TTTTTT', route);
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CustomIcon origin={origin} name={iconName} size={size} color={color} />
        {route.name !== RoutesName.SELL_TAB ? (
          <CustomText
            style={{
              fontSize: SPACING.SCALE_10,
              color: color,
            }}>
            {route.name}
          </CustomText>
        ) : null}
      </View>
    );
  },
});

const MainTabNavigator = () => {
  const dispatch = useDispatch();
  const { userProfileDetails } = useSelector(state => state.authReducer);
  console.log(userProfileDetails, 'jhgghjgjhjgj');
  const chatUnreadMessages = userProfileDetails?.chatUnreadMessages;
  // console.log(chatUnreadMessages);

  useEffect(() => {
    // dispatch(userProfile());
    chatUnreadMessages;
  }, []);
  const authDetails = useSelector(state => state.authReducer);
  console.log(
    authDetails?.userProfileDetails?.id,
    '==============================================',
  );

  console.log('CHATUNREAD', chatUnreadMessages);
  console.log('userprofile', userProfileDetails);
  return (
    <Tab.Navigator
      sceneAnimationEnabled={false}
      screenOptions={props => screenOptions(props)}>
      <Tab.Screen
        name={RoutesName.EXPLORE_TAB}
        component={ExploreScreen}
        listeners={{
          tabPress: e => {
            if (userProfileDetails?.email === 'swi@swi.com') {
              e.preventDefault(); // Prevent the default navigation action

              // showAlert({
              //   title: 'Alert',
              //   message: 'Login to use the app.',
              // });
              showAlert({
                title: 'Alert',
                message: 'Login to use the app.',
                actions: [
                  {
                    text: 'Log in',
                    style: 'default',
                    onPress: () => {
                      dispatch(logoutAction());
                      // Code to run when the "Confirm" button is pressed
                    },
                  },
                  {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => {
                      // Code to run when the "Cancel" button is pressed
                    },
                  },
                ],
              });
            }
          },
        }}
      />
      <Tab.Screen
        name={RoutesName.FRESH_FINDS_TAB}
        component={FreshFindScreen}
        listeners={{
          tabPress: e => {
            if (userProfileDetails?.email === 'swi@swi.com') {
              e.preventDefault(); // Prevent the default navigation action

              showAlert({
                title: 'Alert',
                message: 'Login to use the app.',
                actions: [
                  {
                    text: 'Log in',
                    style: 'default',
                    onPress: () => {
                      dispatch(logoutAction());
                      // Code to run when the "Confirm" button is pressed
                    },
                  },
                  {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => {
                      // Code to run when the "Cancel" button is pressed
                    },
                  },
                ],
              });
            }
          },
        }}
      />

      {userProfileDetails?.role === 'seller' && (
        <Tab.Screen
          name={RoutesName.SELL_TAB}
          component={SellStackNavigator}
          options={{
            tabBarStyle: { display: 'none' },
            tabBarIcon: ({
              focused,
              size,
              tabBarActiveTintColor,
              tabBarInactiveTintColor,
            }) => {
              tabBarActiveTintColor = '#00958C';
              tabBarInactiveTintColor = '#000000';

              const iconColor = focused
                ? tabBarActiveTintColor
                : tabBarInactiveTintColor;

              return (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <CustomIcon
                    name={'circle-with-plus'}
                    origin={ICON_TYPE.ENTYPO}
                    color={iconColor}
                    size={SPACING.SCALE_40}
                  />
                  <Text style={{ color: iconColor, fontSize: SPACING.SCALE_12 }}>Sell</Text>
                </View>
              );
            },
          }}
          // options={{
          //   tabBarHideOnKeyboard: true,
          //   // tabBarButton: props => {
          //   //   return <CustomsellButton {...props} />;
          //   // },
          // }}

          listeners={{
            tabPress: e => {
              if (userProfileDetails?.email === 'swi@swi.com') {
                e.preventDefault(); // Prevent the default navigation action

                showAlert({
                  actions: [
                    {
                      text: 'Log in',
                      style: 'default',
                      onPress: () => {
                        dispatch(logoutAction());
                        // Code to run when the "Confirm" button is pressed
                      },
                    },
                    {
                      text: 'Cancel',
                      style: 'cancel',
                      onPress: () => {
                        // Code to run when the "Cancel" button is pressed
                      },
                    },
                  ],
                  title: 'Alert',
                  message: 'Login to use the app.',
                });
              }
            },
          }}
        />
      )}

      <Tab.Screen
        name={RoutesName.CHAT_TAB}
        component={ChatStackNavigator}
        options={{
          tabBarIcon: ({
            focused,
            size,
            tabBarActiveTintColor,
            tabBarInactiveTintColor,
          }) => {
            tabBarActiveTintColor = '#00958C';
            tabBarInactiveTintColor = '#000000';

            const iconColor = focused
              ? tabBarActiveTintColor
              : tabBarInactiveTintColor;

            return (
              <View>
                {chatUnreadMessages ? (
                  <View>
                    <CustomIcon
                      name={'message-square'}
                      origin={ICON_TYPE.FEATHER_ICONS}
                      color={iconColor}
                    />
                    <View
                      style={{
                        height: 20,
                        width: 20,
                        borderRadius: 10,
                        backgroundColor: COLORS.APPGREEN,
                        position: 'absolute',
                        marginLeft: 15,
                        marginTop: -10,
                        justifyContent: 'center',
                        alignContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: COLORS.BLACK,
                          fontWeight: 'bold',
                          textAlign: 'center',
                          // marginLeft: ,
                          alignSelf: 'center',
                          color: 'white',

                          // fontSize: 24,
                        }}>
                        {chatUnreadMessages}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <CustomIcon
                    name={'message-square'}
                    origin={ICON_TYPE.FEATHER_ICONS}
                    color={iconColor}
                  />
                )}
                {focused ? (
                  <Text style={{ color: '#00958C', fontSize: SPACING.SCALE_12 }}>Chat</Text>
                ) : (
                  <Text style={{ color: '#000000', fontSize: SPACING.SCALE_12 }}>Chat</Text>
                )}
              </View>
            );
          },
        }}
        listeners={{
          tabPress: e => {
            if (userProfileDetails?.email === 'swi@swi.com') {
              e.preventDefault(); // Prevent the default navigation action

              showAlert({
                title: 'Alert',
                message: 'Login to use the app.',
                actions: [
                  {
                    text: 'Log in',
                    style: 'default',
                    onPress: () => {
                      dispatch(logoutAction());
                      // Code to run when the "Confirm" button is pressed
                    },
                  },
                  {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => {
                      // Code to run when the "Cancel" button is pressed
                    },
                  },
                ],
              });
            }
          },
        }}
      />
      <Tab.Screen
        name={RoutesName.PROFILE_SECTION_SCREEN}
        component={ProfileSection}
        initialParams={{ id: authDetails?.userProfileDetails?.id }}
        listeners={{
          tabPress: e => {
            if (userProfileDetails?.email === 'swi@swi.com') {
              e.preventDefault(); // Prevent the default navigation action

              showAlert({
                title: 'Alert',
                message: 'Login to use the app.',
                actions: [
                  {
                    text: 'Log in',
                    style: 'default',
                    onPress: () => {
                      dispatch(logoutAction());
                      // Code to run when the "Confirm" button is pressed
                    },
                  },
                  {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => {
                      // Code to run when the "Cancel" button is pressed
                    },
                  },
                ],
              });
            }
          },
        }}
      />
    </Tab.Navigator>
  );
};
export default MainTabNavigator;
