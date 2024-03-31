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

const PostAds = ({
  postAdsImage,
  postAdsImagePath,
  setPostAds,
  setOnDeleteImage,
  onDeleteImage,
}) => {
  console.log(postAdsImagePath, 'postAdsImagePath');
  console.log(onDeleteImage, 'deleting image');
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
      height: 600,
      cropping: true,
      includeBase64: false,
      compressImageQuality: 1,
      compressImageMaxHeight: 1,
      compressImageMaxWidth: 1,
      compressImageMaxWidth: 1500,
      compressImageMaxHeight: 1000,
      freeStyleCropEnabled: true,
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
      height: 600,
      cropping: true,
      includeBase64: false,
      compressImageQuality: 1,
      compressImageMaxHeight: 1,
      compressImageMaxWidth: 1,
      compressImageMaxWidth: 1500,
      compressImageMaxHeight: 1000,
      freeStyleCropEnabled: true,
      showCropGuidelines: true,
      //showCropFrame: false,
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
              <View>
                <Image
                  key={index}
                  style={{
                    height: 150,
                    borderRadius: 10,
                    width: 250,
                    margin: 10,
                  }}
                  resizeMode="contain"
                  source={{uri: item}}
                />
                <Pressable
                  style={{position: 'absolute', top: 0, right: -0}}
                  onPress={() => {
                    // const filename = item.split('/').pop();

                    setOnDeleteImage(prev => [...prev, item]);
                    console.log(item, 'iteclickedm ');

                    const updatedPaths = postAdsImagePath.slice();
                    console.log('WRETRETWETRE', updatedPaths);
                    updatedPaths.splice(index, 1); // Remove the image at the current index
                    const updatedImages = postAdsImage.slice();
                    updatedImages.splice(index, 1); // Remove the image at the current index
                    setPostAds({image: updatedImages, path: updatedPaths});
                  }}>
                  <CustomIcon
                    origin={ICON_TYPE.ANT_ICON}
                    name={'minuscircle'}
                    size={30}
                    color={'red'}
                  />
                </Pressable>
              </View>
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
