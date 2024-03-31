import React, {useRef, useState} from 'react';
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Video from 'react-native-video';

const mediaData = [
  {
    id: 48,
    type: 'image',
    file: 'https://swi.singsys.net//uploads/products/xYRGGZ6Qiij4Qt9vetq73pK8Ag0oRv9jThXF07gL.jpeg',
  },
  {
    id: 49,
    type: 'video',
    file: 'https://swi.singsys.net//uploads/products/pDZ8lBxfWXNj4iEWYjA7mVtiM64P4MzdWORy91Wa.mp4',
  },
  {
    id: 50,
    type: 'image',
    file: 'https://swi.singsys.net//uploads/products/Mw52v1MnuH5AvclWceIZfK0laU0KaFV0ySfS3BgC.png',
  },
  {
    id: 51,
    type: 'image',
    file: 'https://swi.singsys.net//uploads/products/nYmgTolDQWOBTUeWqhjOpYcNVWyYn6eahu3ZvhxN.jpeg',
  },
];

const MediaViewer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);
  const [isVideoPaused, setIsVideoPaused] = useState(true);

  const handleIndexChange = index => {
    setCurrentIndex(index);
  };

  const handleVideoPress = () => {
    if (videoRef.current) {
      setIsVideoPaused(!isVideoPaused);
    }
  };

  //   const handleVideoEnd = () => {
  //     setIsVideoPaused(true);
  //   };

  return (
    <View style={styles.container}>
      <Swiper
        loop={false}
        index={currentIndex}
        onIndexChanged={handleIndexChange}
        showsPagination={false}>
        {mediaData.map((media, index) => (
          <View key={index} style={styles.slide}>
            {media.type === 'image' ? (
              <Image
                source={{uri: media.file}}
                style={styles.image}
                resizeMode="contain"
              />
            ) : (
              <TouchableOpacity onPress={handleVideoPress}>
                <Video
                  ref={videoRef}
                  source={{uri: media.file}}
                  style={styles.video}
                  resizeMode="contain"
                  paused={isVideoPaused || currentIndex !== index}
                  controls={true}
                />
              </TouchableOpacity>
            )}
          </View>
        ))}
      </Swiper>
      <View style={styles.dotContainer}>
        {mediaData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    height: 300,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 239,
    height: 239,
  },
  video: {
    width: 239,
    height: 239,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: 'black',
  },
  inactiveDot: {
    backgroundColor: 'white',
  },
});

export default MediaViewer;
