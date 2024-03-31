import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const Banner = ({image, height, width, onItemClick}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % image.length;
      setCurrentIndex(nextIndex);
      scrollViewRef.current.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
    }, 3000); // Change the interval duration according to your preference

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex, image.length]);

  const handlePagination = index => {
    setCurrentIndex(index);
    scrollViewRef.current.scrollTo({
      x: index * width,
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={event => {
          const contentOffset = event.nativeEvent.contentOffset;
          const viewSize = event.nativeEvent.layoutMeasurement;
          const index = Math.floor(contentOffset.x / viewSize.width);
          setCurrentIndex(index);
        }}>
        {image.map((item, index) => (
          <TouchableOpacity
            key={item.image}
            activeOpacity={0.8}
            style={styles.imageContainer}
            onPress={() => onItemClick(index)}>
            <Image
              style={{
                height: height,
                width: width,
                resizeMode: 'cover',
                borderRadius: 8,
              }}
              source={{uri: item.image ? item.image : null}}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.pagination}>
        {image.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : null,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#000',
  },
});

export default Banner;
