import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {COLORS, IMAGES, SPACING} from '../resources';

const Item = ({
  product_image,
  product_name,
  price,
  condition,
  seller_image,
  seller_name,
  posting_day,
  onPress,
  wishListPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.outer}>
        <View style={styles.inner}>
          <Image source={product_image} style={styles.imageStyle} />
          <TouchableOpacity
            onPress={wishListPress}
            style={{
              position: 'absolute',
              top: 3,
              right: 12,
              height: SPACING.SCALE_20,
              width: SPACING.SCALE_20,
            }}>
            <Image source={IMAGES.Vector1} />
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{
              fontFamily: 'OpenSans-SemiBold',
              marginLeft: 2,
              color: COLORS.BLACK,
            }}>
            {product_name}
          </Text>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <Text
              style={{
                fontFamily: 'OpenSans-SemiBold',
                fontSize: 12,
                color: COLORS.HYPERLINK,
                marginLeft: 6,
              }}>
              {' '}
              $ {price} .
            </Text>
            <Text
              style={{
                fontFamily: 'Open Sans',
                fontSize: 10,
                marginTop: 2,
                color: COLORS.HYPERLINK,
              }}>
              {' '}
              {condition}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <View>
              <Image
                source={seller_image}
                style={{height: 17, width: 17, marginTop: 5, marginLeft: 8}}
              />
            </View>
            <View>
              <Text style={{fontFamily: 'OpenSans-SemiBold', marginLeft: 10}}>
                {seller_name}
              </Text>
            </View>
          </View>
          <Text
            style={{
              marginLeft: 7,
              fontFamily: 'Open Sans',
              fontSize: 8,
              marginTop: 10,
            }}>
            {posting_day}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ProductViewComponent = ({data}) => {
  console.log('gjgjgjgjgjgggggggggj', data);
  const renderItem = ({item, index}) => (
    console.log(item, 'hbhbhbhbhbhbh'),
    (
      <Item
        product_image={item.thumb_image}
        product_name={item.title}
        price={item.price}
        condition={item.watch_condition}
        seller_image={item.thumb_image}
        seller_name={item.user.name}
        posting_day={item.created_at}
        index={index}
      />
    )
  );

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        horizontal
      />
    </View>
  );
};

export default ProductViewComponent;

const styles = StyleSheet.create({
  outer: {
    backgroundColor: '#F6F6F6',
    width: 160,
    height: 279,
    borderRadius: 10,
    marginTop: 40,
    marginLeft: 15,
  },
  inner: {
    width: 160,
    height: 160,
    borderRadius: 10,
  },
  imageStyle: {
    width: 160,
    height: 160,
    borderRadius: 10,
    marginTop: -15,
  },
});
