import {Image, Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IMAGES} from '@app/resources';
import {Avatar} from 'react-native-paper';
import {CustomIcon, Spacer} from '@app/components';
import {AssestsConst} from '@app/assets/assets';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {showAlert} from '@app/helper/commonFunction';
import {AndroidCameraPermission} from '../../../../../../androidcamerapermission';
import ImageCropPicker from 'react-native-image-crop-picker';
const ProfilePicture = ({
  profilePath,
  coverPath,
  setProfileValue,
  setCoverValue,
}) => {
  // Open picker
  const onOpenPicker = async type => {
    const permissionStatus = await AndroidCameraPermission();
    if (permissionStatus) {
      showAlert({
        title: 'Choose Mode',
        actions: [
          {
            text: 'Camera',
            onPress: () => choosePicFromCamera(type),
          },

          {
            text: 'Gallery',
            onPress: () => choosePicFromGallery(type),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
      });
    }
  };

  const choosePicFromCamera = type => {
    ImageCropPicker.openCamera({
      width: type === 'cover' ? 533 : 300,
      // width: 1000,
      height: 800,
      cropping: true,
      includeBase64: false,
      compressImageQuality: 1,
      compressImageMaxHeight: 1,
      compressImageMaxWidth: 1,
      compressImageMaxWidth: 1500,
      compressImageMaxHeight: 1000,
    }).then(image => {
      if (image?.size <= 5242880) {
        const d = image?.path?.split('/');
        const name = d[d.length - 1];
        const objImage = {
          name: name ?? 'Image' + '.jpg',
          type: image?.mime,
          uri:
            Platform.OS === 'ios'
              ? image?.path.replace('file://', '')
              : image?.path,
        };
        if (type === 'profile') {
          setProfileValue({image: objImage, path: image.path});
        } else {
          setCoverValue({image: objImage, path: image.path});
        }
      } else {
        showAlert({title: 'Image size exceed 5MB'});
      }
    });
  };
  const choosePicFromGallery = type => {
    ImageCropPicker.openPicker({
      width: type === 'cover' ? 533 : 300,
      // width: 1000,
      height: 800,
      cropping: true,
      includeBase64: false,
      compressImageQuality: 1,
      compressImageMaxHeight: 1,
      compressImageMaxWidth: 1,
      compressImageMaxWidth: 1500,
      compressImageMaxHeight: 1000,
    }).then(image => {
      if (image?.size <= 5242880) {
        const d = image?.path?.split('/');
        const name = d[d.length - 1];
        const objImage = {
          name: name ?? 'Image' + '.jpg',
          type: image?.mime,
          uri:
            Platform.OS === 'ios'
              ? image?.path.replace('file://', '')
              : image?.path,
        };
        if (type === 'profile') {
          setProfileValue({image: objImage, path: image.path});
        } else {
          setCoverValue({image: objImage, path: image.path});
        }
      } else {
        showAlert({title: 'Image size exceed 5MB'});
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.cover_container}>
        <Image
          source={coverPath ? {uri: coverPath} : IMAGES.coverSellerProfile}
          resizeMode="cover"
          style={styles.cover_img}
        />
        <Pressable
          onPress={() => onOpenPicker('cover')}
          style={styles.cover_edit}>
          <CustomIcon
            color={'#fff'}
            name={'pencil'}
            size={20}
            origin={ICON_TYPE.OCTICONS}
          />
        </Pressable>
      </View>
      <View style={styles.profile_container}>
        <Avatar.Image
          style={{
            opacity: 0.6,
          }}
          source={profilePath ? {uri: profilePath} : AssestsConst.AVATAR}
          size={100}
        />
        <Pressable
          onPress={() => onOpenPicker('profile')}
          style={styles.profile_edit}>
          <CustomIcon
            color={'#fff'}
            name={'pencil'}
            size={20}
            origin={ICON_TYPE.OCTICONS}
          />
        </Pressable>
      </View>
      <Spacer height={60} />
    </View>
  );
};

export default ProfilePicture;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile_container: {
    position: 'absolute',
    top: 100,
    backgroundColor: '#fff',
    height: 104,
    width: 104,
    borderRadius: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile_edit: {
    position: 'absolute',
    zIndex: 1,
  },
  cover_edit: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 10,
  },
  cover_img: {
    height: 150,
    opacity: 0.6,
    width: '100%',
  },
  cover_container: {
    height: 150,
    width: '100%',
  },
});
