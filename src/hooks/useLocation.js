import {
  Linking,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {showAlert} from '@app/helper/commonFunction';
import {useState} from 'react';
import Geolocation, {GeoPosition} from 'react-native-geolocation-service';
import {Alert} from 'react-native';

const useLocation = () => {
  const [loaction, setLocation] = useState();
  //
  const hasPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        showAlert({title: 'Unable to open settings'});
      });
    };

    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      showAlert({
        title: 'Location permission denied by user.',
        message: 'Please give permission from setting.',
        actions: [
          {
            text: 'Go to settings',
            style: 'default',
            onPress: () => {
              openSetting();
            },
          },
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => {},
          },
        ],
      });
    }

    if (status === 'disabled') {
      //   showAlert({title: 'Turn on Location Services to allow app to determine your location.'});

      Alert.alert(
        `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
        '',
        [
          {text: 'Go to Settings', onPress: openSetting},
          {text: "Don't Use Location", onPress: () => {}},
        ],
      );
    }
    return false;
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      showAlert({title: 'Location permission denied by user.'});
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      showAlert({title: 'Location permission revoked by user.'});
    }

    return false;
  };

  useEffect(() => {
    const getLocation = async () => {
      const hasPermission = await hasLocationPermission();
      if (!hasPermission) {
        return;
      }
      Geolocation.getCurrentPosition(
        position => {
          setLocation(position);
          console.log(position);
        },
        error => {
          // Alert.alert(`Code ${error.code}`, error.message);
          setLocation(null);
          console.log(error);
        },
        {
          accuracy: {
            android: 'high',
            ios: 'best',
          },
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
          distanceFilter: 0,
        },
      );
    };
    getLocation();
  }, []);

  return loaction;
};

export default useLocation;
