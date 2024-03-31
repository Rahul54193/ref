import React, {useRef} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Linking,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import Pagination from './Pagination';
const {height, width} = Dimensions.get('window');

const Banner = ({bannerData}) => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const flatlistRef = useRef();
  const handleScroll = event => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const page = Math.round(contentOffset / width);
    setCurrentPage(page);
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        key={index}
        style={{
          width: width,
          height: 150,
          alignItems: 'center',
          borderRadius: 10,
          paddingHorizontal: 20,
        }}>
        <Pressable
          onPress={() => {
            item?.link ? Linking.openURL(item?.link) : null;
          }}>
          <View
            style={{
              width: width - 5,
              height: 150,
              alignItems: 'center',
            }}>
            <Image
              style={{
                height: 150,
                width: '100%',
                borderRadius: 10,
                borderWidth: 0.5,
              }}
              resizeMode="cover"
              source={{uri: item?.image}}
            />
          </View>
          <View
            style={{
              bottom: 20,
            }}>
            <Pagination data={bannerData} currentPage={currentPage} />
          </View>
        </Pressable>
      </View>
    );
  };
  return (
    <View
      style={{
        height: bannerData.length > 0 ? 160 : 0,
      }}>
      <FlatList
        horizontal
        ref={flatlistRef}
        data={bannerData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index?.toString()}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingTop: 10,
          paddingBottom: 20,
        }}
      />
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({});
