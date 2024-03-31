import {PermissionsAndroid, Platform} from 'react-native';

export const AndroidCameraPermission = () =>
  new Promise(async resolve => {
    try {
      if (Platform.OS === 'android' && Platform.Version > 29) {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ]);
        console.log(granted, 'granted response');
        if (
          granted['android.permission.CAMERA'] !== 'granted'
          //|| granted['android.permission.WRITE_EXTERNAL_STORAGE'] !== 'granted' ||
          // granted['android.permission.READ_EXTERNAL_STORAGE'] !== 'granted'
        ) {
          // eslint-disable-next-line no-undef
          // showError('Dont have required permission. please allow permission');
          return resolve(false);
        }
        return resolve(true);
      }
      return resolve(true);
    } catch (error) {
      console.log('Error===========', error);
      return resolve(false);
    }
  });
