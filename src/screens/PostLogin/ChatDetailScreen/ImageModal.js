import {FontsConst} from '@app/assets/assets';
import {CustomIcon, CustomText, Spacer} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {showAlert} from '@app/helper/commonFunction';
import {useCallback} from 'react';
import {Modal, Pressable, StyleSheet, View} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import {Card} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
const ImageModal = ({modalVisible, setModalVisible, sendMessage}) => {
  // Open Gallery for image
  const launchGallery = () => {
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
    })
      .then(image => {
        if (image?.size <= 5242880) {
          sendMessage({type: 'image', message: image});
        } else {
          showAlert({
            title: 'Alert!',
            message: 'Image size exceed 5MB',
          });
        }
        setModalVisible(false);
      })
      .catch(err => {
        console.log('Error==', err);
      });
  };

  // OPen Camera for image
  const launchCamera = () => {
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
    })
      .then(image => {
        if (image?.size <= 5242880) {
          sendMessage({type: 'image', message: image});
        } else {
          showAlert({
            title: 'Alert!',
            message: 'Image size exceed 5MB',
          });
        }
        setModalVisible(false);
      })
      .catch(err => {
        console.log('Error==', err);
      });
  };

  // Open camera for video
  const launchCameraVideo = () => {
    ImageCropPicker.openCamera({
      mediaType: 'video',
    })
      .then(video => {
        if (video?.size <= 10485760) {
          sendMessage({type: 'video', message: video});
        } else {
          showAlert({
            title: 'Alert!',
            message: 'Video size exceed 10MB',
          });
        }
        setModalVisible(false);
      })
      .catch(err => {
        console.log('Error==', err);
      });
  };

  // OPen gallwery for video
  const launchGalleryVideo = () => {
    ImageCropPicker.openPicker({
      mediaType: 'video',
    })
      .then(video => {
        if (video?.size <= 5242880) {
          sendMessage({type: 'video', message: video});
        } else {
          showAlert({
            title: 'Alert!',
            message: 'Video size exceed 10MB',
          });
        }
        setModalVisible(false);
      })
      .catch(err => {
        console.log('Error==', err);
      });
  };

  // Open gallery for pdf
  const launchGalleryPDF = useCallback(async () => {
    try {
      DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [DocumentPicker.types.pdf],
      }).then(pdf => {
        if (pdf[0]?.size <= 5242880) {
          sendMessage({type: 'pdf', message: pdf[0]});
        } else {
          showAlert({
            title: 'Alert!',
            message: 'PDF size exceed 10MB',
          });
        }
        setModalVisible(false);
      });
    } catch (err) {
      console.warn(err);
    }
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <View style={styles.container}>
        <Pressable
          style={styles.backdrop}
          onPress={() => setModalVisible(false)}
        />
        <Card style={styles.card_container}>
          <View style={styles.border} />
          <>
            <View style={{padding: 20}}>
              <CustomText style={styles.upload_text}>Upload Image</CustomText>
              <Spacer />
              <View style={{flexDirection: 'row', paddingLeft: 30}}>
                <Pressable onPress={launchCamera} style={styles.icon_container}>
                  <CustomIcon
                    name={'camera-plus'}
                    origin={ICON_TYPE.MATERIAL_COMMUNITY}
                    size={30}
                    color={'#ffffff'}
                  />
                </Pressable>
                <Spacer width={50} />
                <Pressable
                  onPress={launchGallery}
                  style={styles.icon_container}>
                  <CustomIcon
                    name={'picture-o'}
                    origin={ICON_TYPE.FONT_AWESOME}
                    size={30}
                    color={'#ffffff'}
                  />
                </Pressable>
              </View>
            </View>
            {/* <View style={{padding: 20}}>
              <CustomText style={styles.upload_text}>Upload Video</CustomText>
              <Spacer />
              <View style={{flexDirection: 'row', paddingLeft: 30}}>
                <Pressable
                  onPress={launchCameraVideo}
                  style={styles.icon_container}>
                  <CustomIcon
                    name={'video'}
                    origin={ICON_TYPE.MATERIAL_COMMUNITY}
                    size={30}
                    color={'#ffffff'}
                  />
                </Pressable>
                <Spacer width={50} />

                <Pressable
                  onPress={launchGalleryVideo}
                  style={styles.icon_container}>
                  <CustomIcon
                    name={'video-collection'}
                    origin={ICON_TYPE.MATERIAL_ICONS}
                    size={30}
                    color={'#ffffff'}
                  />
                </Pressable>
              </View>
            </View>
            <View style={{padding: 20}}>
              <CustomText style={styles.upload_text}>Upload PDF</CustomText>
              <Spacer />
              <View style={{flexDirection: 'row', paddingLeft: 30}}>
                <Pressable
                  onPress={launchGalleryPDF}
                  style={styles.icon_container}>
                  <CustomIcon
                    name={'picture-as-pdf'}
                    origin={ICON_TYPE.MATERIAL_ICONS}
                    size={30}
                    color={'#ffffff'}
                  />
                </Pressable>
              </View>
            </View> */}
          </>
        </Card>
      </View>
    </Modal>
  );
};

export default ImageModal;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    // backgroundColor: '#00000040',
  },
  backdrop: {
    height: '70%',
  },
  border: {
    width: 60,
    height: 3,
    backgroundColor: '#B1B1B1',
    borderRadius: 2,
    marginVertical: 10,
    alignSelf: 'center',
  },
  upload_text: {
    color: '#00958C',
    fontFamily: FontsConst.OpenSans_SemiBold,
    fontSize: 16,
  },
  card_container: {
    height: '30%',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 0,
  },
  button_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
    paddingVertical: 20,
    alignItems: 'center',
  },
  icon_container: {
    height: 60,
    width: 60,
    borderRadius: 10,
    backgroundColor: '#00958C',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
