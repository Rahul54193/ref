/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {CustomIcon, CustomText, Spacer} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';
import React, {useEffect, useRef} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import ImageView from 'react-native-image-viewing';
import Pagination from './Pagination';

const {height, width} = Dimensions.get('screen');

const ProductImageDetail = ({data, onVideoClick}) => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const [selectedView, setSelectedView] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [images, setImages] = React.useState([]);
  const [videos, setVideos] = React.useState([]);

  const flatlistRef = useRef();

  const handleScroll = event => {
    const contentOffset = event?.nativeEvent?.contentOffset?.x;
    const page = Math.round(contentOffset / width);
    setCurrentPage(page);
  };

  useEffect(() => {
    let tempimage = data?.files
      .filter(item => item?.type === 'image')
      .map(item => ({uri: item?.file}));

    let tempvideo = data?.files
      .filter(item => item?.type === 'video')
      .map(item => ({uri: item?.file}));

    setImages(tempimage);

    setVideos(tempvideo);
  }, [data]);

  const renderItem = ({item, index}) => {
    return (
      <View
        key={index}
        style={{
          width: width,
          alignItems: 'center',
        }}>
        <Pressable
          onPress={() => {
            const inde = (item?.type === 'image' ? images : videos)?.findIndex(
              (v, index) => v?.uri === item?.file,
            );
            setSelectedIndex(inde);
            setSelectedView(item?.type);
            if (item?.type === 'video') {
              onVideoClick(videos[inde]);
            }
          }}
          style={{
            width: '80%',
            height: 300,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={{
              height: 300,
              width: 240,
              borderRadius: 16,
              borderWidth: 0.5,
              borderColor: '#00000040',
              //backgroundColor: '#ffffff',
              //opacity: item?.type === 'image' ? 1 : 0.7,
            }}
            resizeMode="cover"
            source={{
              uri: item?.type === 'image' ? item?.file : data?.thumb_image,
            }}
          />
          {item?.type !== 'image' && (
            <CustomIcon
              style={{
                position: 'absolute',
              }}
              name={'video-box'}
              origin={ICON_TYPE.MATERIAL_COMMUNITY}
              size={60}
              color={'black'}
            />
          )}
        </Pressable>
      </View>
    );
  };

  console.log(data?.files, '-----');

  return (
    <View>
      <FlatList
        horizontal
        ref={flatlistRef}
        data={data?.files ?? []}
        renderItem={renderItem}
        keyExtractor={(item, index) => index?.toString()}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingTop: 10,
          paddingBottom: 20,
          flexGrow: 1,
        }}
      />
      {data?.files?.length > 0 && (
        <Pagination
          data={data?.files ?? []}
          currentPage={currentPage}
          handleImageClick={res => {
            flatlistRef?.current?.scrollToIndex({index: res});
          }}
        />
      )}

      {selectedView === 'image' && (
        <ImageView
          images={images}
          imageIndex={selectedIndex}
          doubleTapToZoomEnabled={true}
          visible={selectedView === 'image'}
          presentationStyle="fullScreen"
          onRequestClose={() => setSelectedView(null)}
          FooterComponent={(item, index) => {
            console.log(index, item);
            return (
              <CustomText
                style={{
                  color: '#fff',
                  alignSelf: 'center',
                  marginTop: 40,
                }}>
                {`${item?.imageIndex + 1}/${images?.length}`}
              </CustomText>
            );
          }}
        />
      )}
      <Spacer />
    </View>
  );
};

export default ProductImageDetail;

const styles = StyleSheet.create({});
