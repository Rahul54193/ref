import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Avatar} from 'react-native-paper';
import {CustomIcon} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {AndroidCameraPermission} from '../../../../androidcamerapermission';
import {showAlert} from '@app/helper/commonFunction';
import ImageCropPicker from 'react-native-image-crop-picker';
import {AssestsConst} from '@app/assets/assets';

const ImageContainer = ({handleChange, value}) => {
  const openPicker = async () => {
    const permissionStatus = await AndroidCameraPermission();
    if (permissionStatus) {
      showAlert({
        title: 'Choose Mode',
        actions: [
          {
            text: 'Camera',
            onPress: choosePicFromCamera,
          },

          {
            text: 'Gallery',
            onPress: choosePicFromGallery,
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
      });
    }
  };

  const choosePicFromCamera = () => {
    ImageCropPicker.openCamera({
      width: 1000,
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
        handleChange('image', image);
        handleChange('path', image?.path);
      } else {
        Alert.alert('Image size exceed 5MB');
      }
    });
  };
  const choosePicFromGallery = () => {
    ImageCropPicker.openPicker({
      width: 1000,
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
        handleChange('image', image);
        handleChange('path', image?.path);
      } else {
        Alert.alert('Image size exceed 5MB');
      }
    });
  };

  return (
    <View
      style={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Pressable onPress={openPicker}>
        {value ? (
          <Avatar.Image
            style={{
              opacity: 0.8,
            }}
            size={120}
            source={{
              uri: value,
            }}
          />
        ) : (
          <Avatar.Image
            style={{
              opacity: 0.4,
            }}
            size={120}
            source={AssestsConst.AVATAR}
          />
        )}
      </Pressable>

      <Pressable
        onPress={openPicker}
        style={{
          position: 'absolute',
        }}>
        <CustomIcon
          name={'pencil'}
          origin={ICON_TYPE.OCTICONS}
          size={40}
          color={'#00958C'}
        />
      </Pressable>
    </View>
  );
};

export default ImageContainer;

const styles = StyleSheet.create({});
