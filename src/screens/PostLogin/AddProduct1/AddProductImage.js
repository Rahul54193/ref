import {
  FlatList,
  Image,
  PermissionsAndroid,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Container,
  CustomIcon,
  CustomText,
  Spacer,
  SubmitButton,
} from '@app/components';
import {FontsConst} from '@app/assets/assets';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {AndroidCameraPermission} from '../../../../androidcamerapermission';
import {showAlert} from '@app/helper/commonFunction';
import ImageCropPicker, {openCamera} from 'react-native-image-crop-picker';
import {Alert} from 'react-native';
import {Platform} from 'react-native';
import Video from 'react-native-video';
import {LoadingStatus} from '@app/helper/strings';
import {COLORS, SPACING} from '@app/resources';
import {useDispatch, useSelector} from 'react-redux';
import {onDeleteProductImage} from '@app/store/productSlice/productState.slice';
import ModalComp from '@app/components/ModalComp';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {TouchableOpacity} from 'react-native';
import {
  moderateScale,
  moderateScaleVertical,
  width,
  height,
} from '../../../helper/responsiveSize';

const AddProductImage = ({onNextClick, ...props}) => {
  const {
    productReducer,
    updateProductImage,
    productState,
    updateProductDetails,
    onAddProductImage,
    authReducer,
    updateProductImageFromCamera,
    onDeleteCameraProductImage,
  } = props;
  const [selected, setSelected] = useState(null);
  const [pause, setPause] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const st = useSelector(state => state);
  console.log(st.productStateReducer);
  console.log(productState.productImage, 'product image url');

  const dispatch = useDispatch();

  useEffect(() => {
    savePicture();
  }, []);

  const openPicker = async () => {
    const permissionStatus = await AndroidCameraPermission();
    if (permissionStatus) {
      console.log(productState?.productImage.length, 'length');
      if (productState?.productImage.length < 5) {
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
      } else {
        showAlert({
          title: 'Warning',
          message: 'You can not add more than 5 images or videos',
          actions: [
            {
              text: 'OK',
              style: 'cancel',
            },
          ],
        });
      }
    }
  };

  // const openCameraMode = async () => {
  //   showAlert({
  //     title: 'Choose Mode',
  //     actions: [
  //       {
  //         text: 'Photo',
  //         onPress: choosePicFromCamera,
  //       },
  //       // {
  //       //   text: 'Video',
  //       //   onPress: chooseVideoFromCamera,
  //       // },
  //       {
  //         text: 'Cancel',
  //         style: 'cancel',
  //       },
  //     ],
  //   });
  // };
  // const openGalleryMode = async () => {
  //   showAlert({
  //     title: 'Choose Mode',
  //     actions: [
  //       {
  //         text: 'Photo',
  //         onPress: choosePicFromGallery,
  //       },

  //       // {
  //       //   text: 'Video',
  //       //   onPress: chooseVideoFromGallery,
  //       // },
  //       {
  //         text: 'Cancel',
  //         style: 'cancel',
  //       },
  //     ],
  //   });
  // };

  const choosePicFromCamera = () => {
    if (selectedImages.length > 0) {
      alert('Please save selected images before clicking on camera.');
    } else {
      ImageCropPicker.openCamera({
        width: SPACING.SCALE_774,
        height: SPACING.SCALE_800,
        cropping: true,
        includeBase64: false,
        compressImageQuality: 1,
        compressImageMaxHeight: 1,
        compressImageMaxWidth: 1,
        compressImageMaxWidth: 1500,
        compressImageMaxHeight: 1000,
      }).then(image => {
        console.log(image, 'image++++++');
        if (image?.size <= 5242880) {
          updateProductImage([{image: image}]);
          // updateProductImageFromCamera(image);
          //alert('dfghjkl');
          setIsModalVisible(false);
          setSelectedImages([]);
          const combinedImages = [
            ...productState?.productImage,
            ...productState?.productCameraImage,
          ];
          console.log('CombinedImaaged', combinedImages);
          console.log('imageFromCamera', image);

          setSelected({image: image});
        } else {
          Alert.alert('Image size exceed 5MB');
        }
      });
    }
  };
  // const chooseVideoFromCamera = () => {
  //   ImageCropPicker.openCamera({
  //     mediaType: 'video',
  //   }).then(image => {
  //     if (image?.size <= 10485760) {
  //       updateProductImage(image);
  //     } else {
  //       Alert.alert('Video length exceed 10MB');
  //     }
  //   });
  // };
  const choosePicFromGallery = () => {
    ImageCropPicker.openPicker({
      // multiple: true,
      width: SPACING.SCALE_774,
      height: SPACING.SCALE_800,
      cropping: true,
      includeBase64: false,
      compressImageQuality: 1,
      compressImageMaxHeight: 1,
      compressImageMaxWidth: 1,
      compressImageMaxWidth: 1500,
      compressImageMaxHeight: 1000,
    }).then(image => {
      console.log(image, 'image++++++');
      if (image?.size <= 5242880) {
        updateProductImage(image);
      } else {
        Alert.alert('Image size exceed 5MB');
      }
    });
  };
  // const chooseVideoFromGallery = () => {
  //   ImageCropPicker.openPicker({
  //     mediaType: 'video',
  //     height: 400,
  //     width: 300,
  //   }).then(video => {
  //     if (video?.size <= 10485760) {
  //       updateProductImage(video);
  //     } else {
  //       Alert.alert('Video length exceed 10MB');
  //     }
  //   });
  // };
  const onImageSubmit = () => {
    console.log('authReducer', authReducer);
    if (
      productState?.productCameraImage?.length <= 0 &&
      productState?.productImage?.length <= 0
    ) {
      showAlert({
        title: 'Please choose image/video.',
      });
    } else {
      if (
        [...productState?.productCameraImage, ...productState?.productImage]
          .length > 10
      ) {
        showAlert({
          title: 'Message',
          message: 'Can not add more than 10 images.',
        });
      } else {
        const formData = new FormData();
        let thumbImage = false;

        productState?.productImage.forEach((item, index) => {
          console.log(item, 'images from redux----->>>>');
          formData.append(`product_file[${index}]`, {
            name: 'Image' + index,
            type: 'image/png',
            uri: item?.image?.uri ? item?.image?.uri : item?.image?.path,
          });

          //Set thumbnail in key
          if (!thumbImage) {
            thumbImage = true;
            formData.append('thumb_image', {
              name: 'Image' + index,
              type: 'image/png',
              uri: item?.image?.uri ? item?.image?.uri : item?.image?.path,
            });
          }
        });
        console.log(formData, 'formdata====>>> ');
        if (thumbImage) {
          formData.append('title', 'draft project');
          formData.append(
            'user_id',
            authReducer?.userProfileDetails?.id ?? '3',
          );
          // onNextClick();
          if (!productState?.productDetails?.productID) {
            // console.log(formData, 'formdata');
            onAddProductImage(formData).then(res => {
              console.log(res, '-----respose');
              if (res?.type.includes('fulfilled')) {
                updateProductDetails({
                  key: 'productID',
                  value: res?.payload?.data?.id,
                });
                onNextClick();
              } else if (res?.type.includes('rejected')) {
                showAlert({
                  title: 'Server error !',
                });
              }
            });
          } else {
            onNextClick();
          }
        } else {
          showAlert({
            title: 'Please add thumbnail image.',
          });
        }
      }
    }
  };

  // for gallery photos
  const [photos, setPhotos] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentImage, setCurrentImage] = useState({});
  const [nextPhotos, setNextPhotos] = useState(30);

  //--
  async function hasAndroidPermission() {
    const getCheckPermissionPromise = () => {
      if (Platform.Version >= 33) {
        return Promise.all([
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          ),
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          ),
        ]).then(
          ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
            hasReadMediaImagesPermission && hasReadMediaVideoPermission,
        );
      } else {
        return PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
      }
    };

    const hasPermission = await getCheckPermissionPromise();
    if (hasPermission) {
      return true;
    }
    const getRequestPermissionPromise = () => {
      if (Platform.Version >= 33) {
        return PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]).then(
          statuses =>
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
              PermissionsAndroid.RESULTS.GRANTED,
        );
      } else {
        return PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ).then(status => status === PermissionsAndroid.RESULTS.GRANTED);
      }
    };

    return await getRequestPermissionPromise();
  }

  //--

  async function savePicture() {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }
    try {
      let res = await CameraRoll.getPhotos({
        first: nextPhotos,
        assetType: 'Photos',
        mimeTypes: ['image/jpeg', 'image/png', 'image/jpg'],
        //groupName: 'Recent Photos',
      });
      console.log(res, 'res from camera');
      const result = res.edges.map((val, i) => val.node);
      setCurrentImage(result[0]);
      setPhotos(result);
    } catch (error) {
      console.log('erro raised');
    }
  }
  const onSelect = (item, index) => {
    console.log(item, 'item++++++');
    let clonePhotos = [...photos];

    clonePhotos[index].isSelected = !item?.isSelected;
    setPhotos(clonePhotos);
    setCurrentImage(item);

    let cloneSelectImg = [...selectedImages];

    const indexItem = cloneSelectImg.findIndex(
      val => val.timestamp === item?.timestamp,
    );
    if (indexItem === -1) {
      setSelectedImages(prev => [...prev, ...[item]]);
    } else {
      cloneSelectImg.splice(indexItem, 1);
      setSelectedImages(cloneSelectImg);
    }
  };

  //-------
  console.log(productState?.productImage, 'checking state ');
  console.log('asdbab  selectedImage', selectedImages);
  console.log('asdbab  current ', currentImage);

  console.log('asdbab  photos', photos);

  return (
    <View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll_container}>
        <CustomText
          style={{
            fontFamily: FontsConst.OpenSans_Bold,
          }}>
          Upload watch images<CustomText style={{color: 'red'}}>*</CustomText>
        </CustomText>
        <Spacer />
        <CustomText
          style={{
            fontFamily: FontsConst.OpenSans_Regular,
            fontSize: 12,
          }}>
          Please upload Image of max 10mb
        </CustomText>
        <Spacer />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 20,
            //  backgroundColor: 'red',
          }}>
          <View style={styles.selected_container}>
            {selected ? (
              selected.mime === 'video/mp4' ? (
                <Pressable style={{}} onPress={() => setPause(!pause)}>
                  <Video
                    controls={false}
                    source={{uri: selected?.path}}
                    resizeMode="cover"
                    style={{
                      height: 250,
                      width: 250,
                      // borderWidth: 2,
                      // borderRadius: 16,
                      // borderColor: COLORS.APPGREEN,
                    }}
                    paused={pause}
                    repeat={true}
                  />
                  {pause ? (
                    <View
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <CustomIcon
                        origin={ICON_TYPE.ICONICONS}
                        name={'play-circle-outline'}
                        color={COLORS.BLACK}
                        size={40}
                      />
                    </View>
                  ) : null}
                </Pressable>
              ) : (
                <Image
                  source={{
                    uri: selected?.image?.path
                      ? selected?.image?.path
                      : selected?.image?.uri,
                  }}
                  style={styles.selected_image}
                />
              )
            ) : (
              <Pressable
                //onPress={openPicker}
                onPress={() => {
                  setIsModalVisible(true);
                  savePicture();
                }}
                style={styles.add_container}>
                <CustomIcon
                  name={'add'}
                  origin={ICON_TYPE.MATERIAL_ICONS}
                  size={30}
                  color={'#00958C'}
                />
              </Pressable>
            )}
          </View>
        </View>
        <CustomText
          style={{
            paddingVertical: 10,
            fontFamily: FontsConst.OpenSans_Bold,
          }}>
          Selected images/videos
        </CustomText>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          horizontal
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: 'center',
          }}>
          {productState?.productImage.map((item, index) => {
            console.log(item);
            return (
              <View
                style={{
                  height: 100,
                  width: 100,
                  marginTop: 20,
                  marginRight: 1,
                  // backgroundColor: 'green',
                }}>
                <Pressable
                  style={{
                    height: 75,
                    width: 75,
                    margin: 5,
                    borderRadius: 10,
                    padding: 5,
                    borderWidth: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor:
                      selected?.path === item?.path ? '#00958C' : '#F0F2FA',
                  }}
                  onPress={() => setSelected(item)}>
                  {item?.mime === 'video/mp4' && Platform.OS === 'ios' ? (
                    <Video
                      controls={false}
                      source={{uri: item?.path}}
                      resizeMode="cover"
                      style={{
                        height: 70,
                        width: 70,
                        borderRadius: 8,
                      }}
                      paused={true}
                      // repeat={true}
                    />
                  ) : (
                    <Image
                      source={{
                        uri: item?.image?.path
                          ? item?.image?.path
                          : item?.image?.uri,
                      }}
                      resizeMode="stretch"
                      style={{
                        height: 70,
                        width: 70,
                        borderRadius: 8,
                      }}
                    />
                  )}
                </Pressable>
                <Pressable
                  style={{position: 'absolute', top: -10, right: -0}}
                  onPress={() => {
                    //console.log(item, 'item clicked');
                    dispatch(onDeleteProductImage(item));
                    setSelected(null);
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
          {productState?.productCameraImage.map((item, index) => {
            console.log(item, '--->>>>>>><<<<<<<?????????');
            return (
              <View
                style={{
                  height: 100,
                  width: 100,
                  marginTop: 20,
                  marginRight: 1,
                  // backgroundColor: 'green',
                }}>
                <Pressable
                  style={{
                    height: 75,
                    width: 75,
                    margin: 5,
                    borderRadius: 10,
                    padding: 5,
                    borderWidth: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor:
                      selected?.path === item?.path ? '#00958C' : '#F0F2FA',
                  }}
                  onPress={() => setSelected(item)}>
                  {item?.mime === 'video/mp4' && Platform.OS === 'ios' ? (
                    <Video
                      controls={false}
                      source={{uri: item?.path}}
                      resizeMode="cover"
                      style={{
                        height: 70,
                        width: 70,
                        borderRadius: 8,
                      }}
                      paused={true}
                      // repeat={true}
                    />
                  ) : (
                    <Image
                      source={{
                        uri: item?.path,
                      }}
                      resizeMode="stretch"
                      style={{
                        height: 70,
                        width: 70,
                        borderRadius: 8,
                      }}
                    />
                  )}
                </Pressable>
                <Pressable
                  style={{position: 'absolute', top: -10, right: -0}}
                  onPress={() => {
                    console.log(item, 'item clicked');
                    dispatch(onDeleteCameraProductImage(item.path));
                    setSelected(null);
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
          <Pressable
            onPress={() => {
              if (
                [
                  ...productState?.productCameraImage,
                  ...productState?.productImage,
                ].length > 9
              ) {
                showAlert({
                  title: 'Upload Limit Exceeded',
                  message:
                    "Oops! You've reached the maximum limit of 10 images.",
                });
              } else {
                setIsModalVisible(true);
                // setSelectedImages([]);
                savePicture();
              }
            }}
            style={styles.add_container}>
            <CustomIcon
              name={'add'}
              origin={ICON_TYPE.MATERIAL_ICONS}
              size={30}
              color={'#00958C'}
            />
          </Pressable>
        </ScrollView>
        <Spacer height={30} />
        <SubmitButton
          onPress={onImageSubmit}
          lable="Next"
          disabled={
            productReducer?.addProductImageLoadingStatus ===
            LoadingStatus.LOADING
          }
          loading={
            productReducer?.addProductImageLoadingStatus ===
            LoadingStatus.LOADING
          }
        />
      </ScrollView>
      <ModalComp
        isVisible={isModalVisible}
        style={{justifyContent: 'flex-end', margin: 0}}
        onBackdropPress={() => {
          setIsModalVisible(false);
          setSelectedImages([]);
        }}>
        <View
          style={{
            backgroundColor: 'white',
            //paddingHorizontal: 10,
            height: height * 0.9,
            width: width,
            borderTopLeftRadius: moderateScale(10),
            borderTopRightRadius: moderateScale(10),
          }}>
          <View
            style={{
              paddingHorizontal: moderateScale(10),
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontSize: moderateScale(20),
                padding: moderateScale(15),
                fontWeight: 'bold',
                color: 'red',
              }}
              onPress={() => {
                setIsModalVisible(false);
                setSelectedImages([]);
                // console.log(selectedImages, 'selected image');
                // const imagesToAdd = selectedImages.filter(
                //   item =>
                //     productState?.productImage?.findIndex(
                //       x => x.timestamp === item.timestamp,
                //     ) === -1,
                // );
                // // var selectedImage;
                // // const imagesNotSelected = productState?.productImage?.map(
                // //   originalImage => {
                // //     selectedImage = selectedImages.map(
                // //       selectedImage =>
                // //         selectedImage.timestamp != originalImage.timestamp,
                // //     );
                // //   },
                // // );
                // // updateProductImage(selectedImages);
                // console.log(imagesToAdd);
                // updateProductImage(imagesToAdd);
                // // console.log(selectedImage);
                // console.log(updateProductImage, '------<<<<<<');
              }}>
              Cancel
            </Text>
            {selectedImages.length != 0 && (
              <Text
                style={{
                  fontSize: moderateScale(20),
                  padding: moderateScale(15),
                  color: COLORS.APPGREEN,
                  fontWeight: 'bold',
                }}
                onPress={() => {
                  if (
                    [
                      ...productState?.productCameraImage,
                      ...productState?.productImage,
                      ...selectedImages,
                    ].length > 10
                  ) {
                    Alert.alert(
                      'Upload Limit Exceeded',
                      "Oops! You've reached the maximum limit of 10 images",
                    );
                  } else {
                    console.log(selectedImages, 'selected image');

                    const imagesToAdd = selectedImages.filter(
                      item =>
                        productState?.productImage?.findIndex(
                          x => x.timestamp === item.timestamp,
                        ) === -1,
                    );
                    // var selectedImage;
                    // const imagesNotSelected = productState?.productImage?.map(
                    //   originalImage => {
                    //     selectedImage = selectedImages.map(
                    //       selectedImage =>
                    //         selectedImage.timestamp != originalImage.timestamp,
                    //     );
                    //   },
                    // );

                    // updateProductImage(selectedImages);
                    console.log(imagesToAdd, 'images to add to redux');
                    updateProductImage(selectedImages);

                    // console.log(selectedImage);
                    console.log(updateProductImage, '------<<<<<<');
                    const combinedImages = [
                      ...selectedImages,
                      ...productState?.productCameraImage,
                    ];

                    setSelected(
                      combinedImages.length > 0 ? combinedImages[0] : null,
                    );
                    setIsModalVisible(false);
                    setSelectedImages([]);
                  }
                }}>
                Save
              </Text>
            )}
          </View>

          <FlatList
            numColumns={4}
            data={photos}
            windowSize={10}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => onSelect(item, index)}>
                  <Image
                    source={{uri: item.image.uri}}
                    style={{
                      height: width / 4,
                      width: width / 4,
                      borderWidth: 0.5,
                    }}
                  />
                  {!!item?.isSelected ? (
                    <CustomIcon
                      name={'check'}
                      origin={ICON_TYPE.FONT_AWESOME5}
                      color={'#03fccf'}
                      style={{position: 'absolute', top: 2, left: 5}}
                    />
                  ) : null}
                </TouchableOpacity>
              );
            }}
            onEndReached={() => {
              setNextPhotos(prev => prev + 15);
              savePicture();
            }}
          />
          <Pressable
            onPress={choosePicFromCamera}
            style={{
              height: moderateScale(80),
              width: moderateScale(80),
              position: 'absolute',
              bottom: moderateScale(40),
              right: moderateScale(40),
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: moderateScale(80) / 2,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}>
            <CustomIcon
              origin={ICON_TYPE.ICONICONS}
              name={'camera-outline'}
              size={moderateScale(50)}
              color={'black'}
            />
          </Pressable>
        </View>
      </ModalComp>
    </View>
  );
};

export default AddProductImage;

const styles = StyleSheet.create({
  scroll_container: {
    flexGrow: 1,
    //paddingBottom: 30,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#F0F2FA',
  },
  selected_container: {
    height: 250,
    width: 250,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected_image: {
    height: 250,
    width: 250,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#00958C',
  },
  add_container: {
    height: 80,
    width: 80,
    borderRadius: 15,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderColor: '#B5B6BB',
  },
});
