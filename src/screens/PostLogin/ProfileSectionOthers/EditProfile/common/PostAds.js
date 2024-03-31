import {
  FlatList,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {IMAGES} from '@app/resources';
import {CustomIcon, CustomText} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {showAlert} from '@app/helper/commonFunction';
import ImageCropPicker from 'react-native-image-crop-picker';
import {AndroidCameraPermission} from '../../../../../../androidcamerapermission';

const PostAds = ({postAdsImage, postAdsImagePath, setPostAds}) => {
  // Open picker
  const onOpenPicker = async () => {
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
        const newPaths = postAdsImagePath.slice();
        const newImage = postAdsImage.slice();
        newImage.push(objImage);
        newPaths.push(image?.path);

        setPostAds({image: newImage, path: newPaths});
      } else {
        showAlert({title: 'Image size exceed 5MB'});
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
        const newPaths = postAdsImagePath.slice();
        const newImage = postAdsImage.slice();
        newImage.push(objImage);
        newPaths.push(image?.path);

        setPostAds({image: newImage, path: newPaths});
      } else {
        showAlert({title: 'Image size exceed 5MB'});
      }
    });
  };

  return (
    <>
      <CustomText>Post Ads</CustomText>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            height: 200,
          }}
          horizontal>
          {postAdsImagePath?.map((item, index) => {
            return (
              <Image
                key={index}
                style={{
                  height: 160,
                  borderRadius: 10,
                  width: 250,
                  margin: 10,
                }}
                resizeMode="contain"
                source={{uri: item}}
              />
            );
          })}
          <Pressable onPress={onOpenPicker} style={styles.add_container}>
            <CustomIcon
              name={'add'}
              origin={ICON_TYPE.MATERIAL_ICONS}
              size={30}
              color={'#00958C'}
            />
          </Pressable>
        </ScrollView>
      </View>
    </>
  );
};

export default PostAds;

const styles = StyleSheet.create({
  add_container: {
    height: 160,
    width: 250,
    borderRadius: 15,
    margin: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderColor: '#B5B6BB',
  },
});
