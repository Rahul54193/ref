import React, {useState} from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';

const ImageView = () => {
  const [selectedImage, setSelectedImage] = useState(0);

  const handleImagePress = index => {
    setSelectedImage(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainView}>
        <Image
          style={styles.mainImage}
          source={{uri: images[selectedImage].source}}
        />
      </View>
      <View style={styles.thumbnailContainer}>
        {images.map((image, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.thumbnail,
              selectedImage === index && styles.selectedThumbnail,
            ]}
            onPress={() => handleImagePress(index)}>
            <Image style={styles.thumbnailImage} source={{uri: image.source}} />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.dotContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, selectedImage === index && styles.selectedDot]}
          />
        ))}
      </View>
    </View>
  );
};

const images = [
  {
    source:
      'https://www.pakainfo.com/wp-content/uploads/2021/09/dummy-user-image-url-300x200.jpg',
  },
  {
    source:
      'https://www.pakainfo.com/wp-content/uploads/2021/09/online-dummy-image-url-300x201.jpg',
  },
  {
    source:
      'https://www.pakainfo.com/wp-content/uploads/2021/09/dummy-user-image-url-300x200.jpg',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainImage: {
    width: 239,
    height: 239,
    resizeMode: 'contain',
  },
  thumbnailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  selectedThumbnail: {
    borderColor: '#000',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    borderRadius: 1,
    resizeMode: 'cover',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  selectedDot: {
    backgroundColor: '#000',
  },
});

export default ImageView;
