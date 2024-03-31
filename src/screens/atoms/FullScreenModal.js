import { Container, CustomIcon } from '@app/components';
import { ICON_TYPE } from '@app/components/CustomIcon';
import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Pdf from 'react-native-pdf';
import Video from 'react-native-video';
import ImageView from 'react-native-image-viewing'
import ImageViewer from 'react-native-image-zoom-viewer';

const FullScreenModal = ({ selectedFile, onClose }) => {
  let uriArray = [];

  // Adding the URI to the array
  uriArray.push("https://php8.singsys.net/swi/backend/public/uploads/chat/bac61697551033.jpg");
  console.log(selectedFile, '---->>>>')
  const [videoLoading, setVideoLoading] = useState(true);
  const [isVideoPause, setIsVideoPause] = useState(false);

  const videoRef = useRef();

  const onScreenClose = () => {
    onClose();
    setIsVideoPause(false);
    setVideoLoading(true);
  };
  return (
    <>
      {/* <Modal
        style={{
          flex: 1,
          backgroundColor: '#000000',
          paddingBottom: 20,
        }}
        visible={selectedFile.visible}
        presentationStyle="fullScreen"
        onRequestClose={onScreenClose}
        supportedOrientations={['portrait']}
        hardwareAccelerated>
        <Container
          useSafeAreaView={true}
          style={{
            flex: 1,
            backgroundColor: '#000000',
            justifyContent: 'center',
          }}>
          <View
            style={{
              padding: 20,
              flexDirection: 'row-reverse',
            }}>
            <Pressable onPress={onScreenClose}>
              <CustomIcon
                name={'close'}
                origin={ICON_TYPE.MATERIAL_ICONS}
                size={25}
                color={'#fff'}
              />
            </Pressable>
          </View>
          {selectedFile.type === 'image' ? (


            <ImageView
              images={[{ uri: 'https://php8.singsys.net/swi/backend/public/uploads/chat/bac61697551033.jpg' }]}
              presentationStyle="fullScreen"
              // imageIndex={0}
              visible={true}
              onRequestClose={onScreenClose}
            />



          ) : null}
          {selectedFile.type === 'pdf' ? (
            <Pdf
              trustAllCerts={false}
              source={{ uri: selectedFile.uri }}
              style={{ flex: 1 }}
              // onLoadProgress={() => {
              //   setVideoLoading(true);
              // }}
              onLoadComplete={(numberOfPages, filePath) => {
                setVideoLoading(false);
                console.log(`Number of pages: ${numberOfPages}`);
              }}
              onPageChanged={(page, numberOfPages) => {
                console.log(`Current page: ${page}`);
              }}
              onError={error => {
                console.log(error);
              }}
            />
          ) : null}
          {selectedFile.type === 'video' ? (
            <Pressable
              style={{ flex: 1 }}
              onPress={() => {
                setIsVideoPause(!isVideoPause);
              }}>
              <Video
                ref={videoRef}
                source={{ uri: selectedFile.uri }} // Replace with your video URL
                style={{ flex: 1 }}
                controls
                paused={isVideoPause}
                resizeMode="contain"
                onLoad={() => {
                  setVideoLoading(false);
                }}
              />

              {isVideoPause && (
                <Pressable
                  onPress={() => {
                    setIsVideoPause(!isVideoPause);
                  }}
                  style={{
                    height: 50,
                    width: 50,
                    position: 'absolute',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    top: '40%',
                  }}>
                  <CustomIcon
                    name={'pause'}
                    origin={ICON_TYPE.MATERIAL_ICONS}
                    size={40}
                  />
                </Pressable>
              )}
            </Pressable>
          ) : null}
          {videoLoading && selectedFile.type != 'image' && (
            <View
              style={{
                height: 40,
                width: 40,
                position: 'absolute',
                alignSelf: 'center',
              }}>
              <ActivityIndicator size={30} color={'#fff'} />
            </View>
          )}
        </Container>
      </Modal> */}
      {
        selectedFile.type === 'image' ? (


          <ImageView
            images={[{ uri: selectedFile?.uri }]}
            presentationStyle="fullScreen"
            // imageIndex={0}
            visible={true}
            onRequestClose={onScreenClose}
          />



        ) : null
      }
    </>
  );
};

export default FullScreenModal;

const styles = StyleSheet.create({});
