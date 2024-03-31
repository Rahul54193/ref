/* eslint-disable react/react-in-jsx-scope */
import {CustomIcon, CustomText} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';
import PageTitle from '@app/screens/atoms/PageTitle';
import ProductCard from '@app/screens/atoms/ProductCard';
import {useState} from 'react';
import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import Filter from './Filter';
import {SPACING} from '@app/resources';

const TrendyWatch = props => {
  const {exploreProduct, onAddWishList, setIsFilter} = props;
  const [reachedEnd, setReachedEnd] = useState(false);
  const [showCustomIcon, setShowCustomIcon] = useState(false);
  const [maxXOffset, setMaxXOffset] = useState(null);

  const handleEndReached = () => {
    setReachedEnd(true);
  };

  // const handleScroll = event => {
  //   const currentOffset = event.nativeEvent.contentOffset.x;
  //   const scrollThreshold = SPACING.SCALE_100; // Adjust this threshold based on your preference
  //   setReachedEnd(false);
  //   setShowCustomIcon(currentOffset > scrollThreshold);
  // };

  const handleScroll = event => {
    const {contentOffset} = event.nativeEvent;
    const currentXOffset = contentOffset.x;

    // Check if the currentXOffset is greater than the stored maximum value
    if (maxXOffset === null || currentXOffset > maxXOffset) {
      setMaxXOffset(currentXOffset);
    }

    const scrollThreshold = SPACING.SCALE_100; // Adjust this threshold based on your preference
    //   console.log("scrollThreshold", scrollThreshold)
    setReachedEnd(false);
  };
  console.log('Reached end ======', reachedEnd);
  const renderItem = ({item, index}) => {
    return (
      <View>
        <ProductCard key={index} item={item} />
      </View>
    );
  };
  return (
    <View style={{paddingHorizontal: 10}}>
      <PageTitle title={'Check out trendy watches for you'} />
      <View>
        <FlatList
          horizontal
          data={exploreProduct?.trendyWatches}
          renderItem={renderItem}
          keyExtractor={(item, index) => index?.toString()}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          onEndReached={handleEndReached}
          ListEmptyComponent={() => (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <CustomText>No Data Found</CustomText>
            </View>
          )}
        />
        {reachedEnd == false ? (
          <View
            style={{
              position: 'absolute',
              alignSelf: 'flex-end',
              flexGrow: 1,
              right: SPACING.SCALE_30,
              top: SPACING.SCALE_100,
            }}>
            <View
              style={{
                height: SPACING.SCALE_30,
                width: SPACING.SCALE_30,
                borderRadius: SPACING.SCALE_15,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 20,
              }}>
              <CustomIcon
                name={'keyboard-arrow-right'}
                origin={ICON_TYPE.MATERIAL_ICONS}
                size={SPACING.SCALE_30}
                color={'black'}
              />
            </View>
          </View>
        ) : maxXOffset != null ? (
          <View
            style={{
              position: 'absolute',
              alignSelf: 'flex-end',
              flexGrow: 1,
              right: SPACING.SCALE_30,
              top: SPACING.SCALE_100,
            }}>
            <View
              style={{
                height: SPACING.SCALE_30,
                width: SPACING.SCALE_30,
                borderRadius: SPACING.SCALE_15,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 20,
              }}>
              <CustomIcon
                name={'keyboard-arrow-left'}
                origin={ICON_TYPE.MATERIAL_ICONS}
                size={SPACING.SCALE_30}
                color={'black'}
              />
            </View>
          </View>
        ) : (
          <View
            style={{
              position: 'absolute',
              alignSelf: 'flex-end',
              flexGrow: 1,
              right: SPACING.SCALE_30,
              top: SPACING.SCALE_100,
            }}>
            <View
              style={{
                height: SPACING.SCALE_30,
                width: SPACING.SCALE_30,
                borderRadius: SPACING.SCALE_15,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 20,
              }}>
              <CustomIcon
                name={'keyboard-arrow-right'}
                origin={ICON_TYPE.MATERIAL_ICONS}
                size={SPACING.SCALE_30}
                color={'black'}
              />
            </View>
          </View>
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingRight: 30,
        }}>
        <PageTitle title={'Top-notch watches'} />
        <Pressable
          onPress={() => {
            setIsFilter(true);
          }}>
          <CustomIcon
            origin={ICON_TYPE.FEATHER_ICONS}
            name={'filter'}
            color={'#000'}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default TrendyWatch;

const styles = StyleSheet.create({});
