import React, {useEffect} from 'react';

import messaging from '@react-native-firebase/messaging';

import notifee, {AuthorizationStatus, EventType} from '@notifee/react-native';
import {RoutesName} from '@app/helper/strings';
import NavigationService from '@app/navigations/NavigationService';
import {SharedPreference} from '@app/helper';
import {ChatScreen} from '@app/screens';
import {useDispatch, useSelector} from 'react-redux';
import {NotificationCount, userProfile} from '@app/store/authSlice';
import {getChatListAction} from '@app/store/chatSlice';
import {Platform} from 'react-native';

let channelId;
const TOPIC = 'test_notification';

// ! Notification logic
export const NotificationController = () => {
  const dispatch = useDispatch();

  //  Function for navigation on proper screen
  const naviagteToScreen = detail => {
    console.log('Navigate to ====', detail);
    switch (detail?.type) {
      case 'text':
        // NavigationService.navigate(RoutesName.CHAT_TAB);
        NavigationService.navigate(RoutesName.CHAT_DETAIL_SCREEN, {
          chat_item: {
            product_id: detail?.product_id,
            user_id: detail?.sender_id,
            sender_id: detail?.sender_id,
            id: 0,
            user_image: detail?.user_image,
            user_name: detail?.user_name,
          },
        });
        break;
      case 'make_offer':
        NavigationService.navigate(RoutesName.CHAT_DETAIL_SCREEN, {
          chat_item: {
            product_id: detail?.product_id,
            user_id: detail?.sender_id,
            sender_id: detail?.sender_id,
            id: 0,
            user_image: detail?.user_image,
            user_name: detail?.user_name,
          },
        });
        break;
      case 'chat':
        NavigationService.navigate(RoutesName.CHAT_DETAIL_SCREEN, {
          chat_item: {
            product_id: detail?.product_id,
            user_id: detail?.sender_id,
            sender_id: detail?.sender_id,
            id: 0,
            user_image: detail?.user_image,
            user_name: detail?.user_name,
          },
        });
        break;

      default:
        NavigationService.navigate(RoutesName.NOTIFICATION_SCREEN);
        break;
    }
  };

  const onNotifiClick = async ({type, detail}) => {
    try {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS || EventType.ACTION_PRESS:
          console.log(
            'User pressed notification of background',
            detail.notification,
          );
          await notifee.decrementBadgeCount();

          naviagteToScreen(detail?.notification?.data);
          break;
      }
    } catch (error) {
      console.log('hello Error', error);
    }
  };

  //  Functon for request permission
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  };

  useEffect(() => {
    const unsubscribe = notifee.onBackgroundEvent(async ({type, detail}) => {
      console.log('notifee.onBackgroundEvent', type, detail);
      onNotifiClick({type, detail});
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = notifee.onForegroundEvent(({type, detail}) => {
      console.log('notifee.onForegroundEvent', type, detail);
      onNotifiClick({type, detail});
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    // initialize notifee for local notification
    configureNotification();

    /**
     * On iOS, messaging permission must be requested by
     * the current application before messages can be
     * received or sent
     */

    if (requestUserPermission()) {
      /**
       * Returns an FCM token for this device
       */
      messaging()
        .getToken()
        .then(async fcmToken => {
          SharedPreference.setItem(
            SharedPreference.keys.DEVICE_TOKEN,
            fcmToken,
          );
          console.log('FCM Token->', fcmToken);
        });
    } else {
      console.log('Not Authorization status:');
    }

    /**
     * When a notification from FCM has triggered the application
     * to open from a quit state, this method will return a
     * `RemoteMessage` containing the notification data, or
     * `null` if the app was opened via another method.
     */
    messaging()
      .getInitialNotification()
      .then(async remoteMessage => {
        if (remoteMessage) {
          console.log(
            'getInitialNotification:' +
              'Notification caused app to open from quit state',
          );
          console.log(remoteMessage, 'remoteMessage====');
          naviagteToScreen(remoteMessage.data);
        }
      });

    /**
     * When the user presses a notification displayed via FCM,
     * this listener will be called if the app has opened from
     * a background state. See `getInitialNotification` to see
     * how to watch for when a notification opens the app from
     * a quit state.
     */
    messaging().onNotificationOpenedApp(async remoteMessage => {
      if (remoteMessage) {
        console.log(
          'onNotificationOpenedApp: ' +
            'Notification caused app to open from background state',
        );
        console.log(remoteMessage);
        naviagteToScreen(remoteMessage.data);
      }
    });

    /**
     * Set a message handler function which is called when
     * the app is in the background or terminated. In Android,
     * a headless task is created, allowing you to access the
     * React Native environment to perform tasks such as updating
     * local storage, or sending a network request.
     */
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
      await notifee.incrementBadgeCount();
      dispatch(NotificationCount());
    });

    /**
     * When any FCM payload is received, the listener callback
     * is called with a `RemoteMessage`. Returns an unsubscribe
     * function to stop listening for new messages.
     */
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(
        'A new FCM message arrived!++',
        JSON.stringify(remoteMessage),
      );
      if (remoteMessage?.notification?.title) {
        displayNotification(
          `${remoteMessage?.notification?.title}`,
          `${remoteMessage?.notification?.body}`,
          remoteMessage?.data,
        );
      }

      dispatch(getChatListAction());
      dispatch(NotificationCount());
      dispatch(userProfile());
    });

    /**
     * Apps can subscribe to a topic, which allows the FCM
     * server to send targeted messages to only those devices
     * subscribed to that topic.
     */
    messaging()
      .subscribeToTopic(TOPIC)
      .then(() => {
        console.log(`Topic: ${TOPIC} Subscribed`);
      });

    return () => {
      /**
       * Unsubscribe listening new messsages and the device from a topic.
       */
      unsubscribe();
      messaging().unsubscribeFromTopic(TOPIC);
    };
  }, []);

  return null;
};

// Configure notifee in app
export const configureNotification = async () => {
  const settings = await notifee.requestPermission();
  if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
    console.log('User denied permissions request');
  } else if (settings.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
    console.log('User granted permissions request');
  } else if (settings.authorizationStatus === AuthorizationStatus.PROVISIONAL) {
    console.log('User provisionally granted permissions request');
  }

  // Create a channel (required for Android)
  channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });
};

// Function for displaying local notifications in app
export const displayNotification = async (title, body, data) => {
  if (data?.thumb_image || data?.product_image) {
    return await notifee.displayNotification({
      title: title ?? 'Notification Title',
      body: body ?? 'Main body content of the notification',
      data: data,
      android: {
        largeIcon: data?.thumb_image ? data?.thumb_image : data?.product_image,
        channelId: channelId?.id ?? 'default',
        smallIcon: 'ic_launcher',
        // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
      ios: {
        attachments: [
          {
            // Remote image
            url: data?.thumb_image ? data?.thumb_image : data?.product_image,
          },
        ],
      },
    });
  } else {
    return await notifee.displayNotification({
      title: title ?? 'Notification Title',
      body: body ?? 'Main body content of the notification',
      data: data,
      android: {
        // largeIcon: data?.thumb_image ? data?.thumb_image : data?.product_image,
        channelId: channelId?.id ?? 'default',
        smallIcon: 'ic_launcher',
        // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
      ios: {},
    });
  }
};
