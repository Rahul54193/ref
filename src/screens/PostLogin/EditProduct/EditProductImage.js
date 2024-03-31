import {FontsConst} from '@app/assets/assets';
import {CustomIcon, CustomText, Spacer, SubmitButton} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {showAlert} from '@app/helper/commonFunction';
import {LoadingStatus} from '@app/helper/strings';
import {COLORS, SPACING} from '@app/resources';
import {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  PermissionsAndroid,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';
import {AndroidCameraPermission} from '../../../../androidcamerapermission';
import {height, moderateScale, width} from '@app/helper/responsiveSize';
import ModalComp from '@app/components/ModalComp';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

const EditProductImage = ({onNextClick, ...props}) => {
  console.log(props, '----props 88888');
  const {
    productReducer,
    editProductImage,
    removeProductImage,
    onAddProductDetail,
    getAllProduct,
  } = props;
  const [pickImage, setPickImage] = useState([]);
  const [selected, setSelected] = useState(null);
  const [pause, setPause] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [Imagepath, setImagePath] = useState([]);
  const [newImgsFromGallery, setNewImgsFromGallery] = useState([]);
  const [newImgsFromCamera, setNewImgsFromCamera] = useState([]);
  console.log(productReducer?.getAllDataAction?.files, 'files from ');

  useEffect(() => {
    if (
      productReducer?.getAllDataActionLoadingStatus === LoadingStatus.LOADED
    ) {
      const temp = productReducer?.getAllDataAction?.files.map(item => {
        return {
          path: item?.file,
          mime: item?.type == 'video' ? 'video/mp4' : 'image/jpeg',
          product_id: item?.product_id,
          image_id: item?.id,
        };
      });
      setImagePath(temp);
      setPickImage(temp);
      setSelected(temp[0]);
    }
  }, [productReducer?.getAllDataActionLoadingStatus]);

  console.log(productReducer?.getAllDataAction?.files, 'image path');
  const openPicker = async () => {
    const permissionStatus = await AndroidCameraPermission();
    if (permissionStatus) {
      if (Imagepath.length < 5) {
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

  console.log(pickImage, 'dfghjk=====lkjhg');
  // const openCameraMode = async () => {
  //   showAlert({
  //     title: 'Choose Mode',
  //     actions: [
  //       {
  //         text: 'Photo',
  //         onPress: choosePicFromCamera,
  //       },

  //       {
  //         text: 'Video',
  //         onPress: chooseVideoFromCamera,
  //       },
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

  //       {
  //         text: 'Video',
  //         onPress: chooseVideoFromGallery,
  //       },
  //       {
  //         text: 'Cancel',
  //         style: 'cancel',
  //       },
  //     ],
  //   });
  // };

  const choosePicFromCamera = () => {
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
      if (image?.size <= 5242880) {
        setNewImgsFromGallery([...newImgsFromGallery, {image: image}]);
        setIsModalVisible(false);
        // setPickImage(data => {
        //   return [...data, image];
        // });
        // setImagePath(data => {
        //   return [
        //     ...data,
        //     {
        //       mime: image?.mime,
        //       path: image?.path,
        //     },
        //   ];
        // });
      } else {
        Alert.alert('Image size exceed 5MB');
      }
    });
  };
  // const chooseVideoFromCamera = () => {
  //   ImageCropPicker.openCamera({
  //     mediaType: 'video',
  //   }).then(video => {
  //     if (video?.size <= 10485760) {
  //       setPickImage(data => {
  //         return [...data, video];
  //       });
  //       setImagePath(data => {
  //         return [
  //           ...data,
  //           {
  //             mime: video?.mime,
  //             path: video?.path,
  //           },
  //         ];
  //       });
  //     } else {
  //       Alert.alert('Video length exceed 10MB');
  //     }
  //   });
  // };
  const choosePicFromGallery = () => {
    ImageCropPicker.openPicker({
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
      if (image?.size <= 5242880) {
        setPickImage(data => {
          console.log(data, 'what is in data ---->>>>');
          //return [...data, image];
        });
        setImagePath(data => {
          console.log(data, 'what is in data -----<<<<<<');
          //   return [
          //     ...data,
          //     {
          //       mime: image?.mime,
          //       path: image?.path,
          //     },
          //   ];
          // });
        });
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
  //       setPickImage(data => {
  //         return [...data, video];
  //       });
  //       setImagePath(data => {
  //         return [
  //           ...data,
  //           {
  //             mime: video?.mime,
  //             path: video?.path,
  //           },
  //         ];
  //       });
  //     } else {
  //       Alert.alert('Video length exceed 10MB');
  //     }
  //   });
  // };
  const onImageSubmit = () => {
    if ([...newImgsFromGallery].length <= 0) {
      onNextClick();
    } else {
      const formData = new FormData();

      newImgsFromGallery.forEach((item, index) => {
        formData.append(`product_file[${index}]`, {
          name: 'Image' + index,
          type: 'image/png',
          uri: item?.image?.uri ? item?.image?.uri : item?.image?.path,
        });
      });

      console.log(formData, 'formdate to----->>>>>> send');
      //   // Submit data

      editProductImage({
        product_id: props?.route?.params?.product_id,
        Data: formData,
      }).then(res => {
        if (res?.type.includes('fulfilled')) {
          onNextClick();
        } else if (res?.type.includes('rejected')) {
          showAlert({
            title: 'Server error !',
          });
        }
      });
    }
  };

  // ----------------------------------------------------------------------------------------------
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

  //------------------------------------------------------------------------------------------------

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
                    uri: selected?.path
                      ? selected?.path
                      : selected?.image?.path
                      ? selected?.image?.path
                      : selected?.image?.uri,
                  }}
                  style={styles.selected_image}
                />
              )
            ) : (
              <Pressable
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
          {Imagepath?.map((item, index) => {
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
                  key={index}
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
                      selected?.path == item?.path
                        ? '#00958C'
                        : item.mime == 'video/mp4'
                        ? '#00000080'
                        : '#F0F2FA',
                  }}
                  onPress={() => setSelected(item)}>
                  {item.mime === 'video/mp4' ? (
                    <CustomIcon
                      name={'video'}
                      origin={ICON_TYPE.OCTICONS}
                      size={50}
                      color={'black'}
                    />
                  ) : (
                    <Image
                      source={{uri: item?.path}}
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
                    console.log(item, 'image item');
                    var params = {
                      product_id: item.product_id,
                      image_id: item.image_id,
                    };

                    removeProductImage(params).then(res => {
                      console.log('res++++', res);
                      if (res.type.includes('removeProductImage/fulfilled')) {
                        setSelected(null);
                        getAllProduct({
                          product_id: props?.route?.params?.product_id,
                        });
                      }
                    });
                    // debugger;
                    // getAllProduct({product_id: props?.route?.params?.product_id});

                    // const temp = Imagepath.filter(item => item.path != item.path);
                    // setImagePath(temp);
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
          {newImgsFromGallery?.map((item, index) => {
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
                  key={index}
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
                      selected?.path == item?.path
                        ? '#00958C'
                        : item.mime == 'video/mp4'
                        ? '#00000080'
                        : '#F0F2FA',
                  }}
                  onPress={() => setSelected(item)}>
                  {item.mime === 'video/mp4' ? (
                    <CustomIcon
                      name={'video'}
                      origin={ICON_TYPE.OCTICONS}
                      size={50}
                      color={'black'}
                    />
                  ) : (
                    <Image
                      source={{
                        uri: item?.image?.uri
                          ? item?.image?.uri
                          : item?.image?.path,
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
                    //  console.log(item, 'item printing ');
                    // console.log(item, 'image item');
                    // var params = {
                    //   product_id: item.product_id,
                    //   image_id: item.image_id,
                    // };
                    const afterDelete = newImgsFromGallery.filter(val => {
                      if (val.image.path) {
                        return val.image.path !== item.image.path;
                      } else {
                        return val.image.uri !== item.image.uri;
                      }
                    });

                    setNewImgsFromGallery(afterDelete);
                    setSelected(null);
                    // setNewImgsFromGallery()

                    // removeProductImage(params).then(res => {
                    //   console.log('res++++', res);
                    //   if (res.type.includes('removeProductImage/fulfilled')) {
                    //     getAllProduct({
                    //       product_id: props?.route?.params?.product_id,
                    //     });
                    //   }
                    // });
                    // debugger;
                    // getAllProduct({product_id: props?.route?.params?.product_id});

                    // const temp = Imagepath.filter(item => item.path != item.path);
                    // setImagePath(temp);
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
        </ScrollView>
        <Spacer height={30} />
        <SubmitButton
          onPress={onImageSubmit}
          lable="Next"
          disabled={
            productReducer?.updateProductImageActionLoadingStatus ===
            LoadingStatus.LOADING
          }
          loading={
            productReducer?.updateProductImageActionLoadingStatus ===
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
                  console.log(selectedImages, 'selected image');

                  const resultArray = selectedImages.map(item => ({
                    type: item.type,
                    path: item.image.uri,
                  }));
                  setNewImgsFromGallery([
                    ...newImgsFromGallery,
                    ...selectedImages,
                  ]);
                  setIsModalVisible(false);
                  setSelectedImages([]);

                  // setPickImage([...pickImage, ...selectedImages]);
                  // setImagePath([...Imagepath, ...resultArray]);
                  //console.log(data, 'what is in data -----<<<<<<');
                  //   return [
                  //     ...data,
                  //     {
                  //       mime: image?.mime,
                  //       path: image?.path,
                  //     },
                  //   ];
                  // });

                  // const imagesToAdd = selectedImages.filter(
                  //   item =>
                  //     productState?.productImage?.findIndex(
                  //       x => x.timestamp === item.timestamp,
                  //     ) === -1,
                  // );
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
                  // console.log(imagesToAdd, 'images to add to redux');
                  // updateProductImage(imagesToAdd);

                  // console.log(selectedImage);
                  //console.log(updateProductImage, '------<<<<<<');
                  //setIsModalVisible(false);
                  //setSelectedImages([]);
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
              console.log(item.image.uri, 'items of images');
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

// export default EditProductImage;

const styles = StyleSheet.create({
  scroll_container: {
    flexGrow: 1,
    paddingBottom: 30,
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

export default EditProductImage;
