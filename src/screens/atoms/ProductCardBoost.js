import {
    Pressable,
    StyleSheet,
    Text,
    View,
    Platform,
    Dimensions,
  } from 'react-native';
  import React from 'react';
  import {Avatar, Card} from 'react-native-paper';
  import {CustomIcon, CustomText, Custombutton2, Spacer} from '@app/components';
  import {FontsConst} from '@app/assets/assets';
  import {ICON_TYPE} from '@app/components/CustomIcon';
  import {IMAGES, SPACING} from '@app/resources';
  import {formatTimestamp} from '@app/helper/commonFunction';
  import NavigationService from '@app/navigations/NavigationService';
  import {RoutesName} from '@app/helper/strings';
  
  const {width} = Dimensions.get('screen');
  const ProductCardBoost = ({item, onPress}) => {
    const maxLength = 10;
    const truncatedText =
      item?.title?.length > maxLength
        ? `${item?.title.substring(0, maxLength)}...`
        : item?.title;
  
    return (
      <View style={styles.card_container}>
        <Pressable
          onPress={() => {
            NavigationService.navigate(RoutesName.PRODUCT_DETAILS, {
              product_id: item.id,
            });
          }}>
          <Card.Cover
            resizeMode="cover"
            style={styles.cover_style}
            source={{uri: item?.thumb_image}}
          />
        </Pressable>
        <Card.Content>
          <CustomText style={styles.title}>{truncatedText}</CustomText>
          <View style={styles.price_container}>
            <CustomText style={styles.price}>${item?.price}</CustomText>
            <Spacer width={SPACING.SCALE_3} />
            <View style={styles.seprator} />
            <CustomText style={styles.category}>
              {item?.watch_condition === 'pre_owned' ? 'Pre Owned' : 'Brand New'}
            </CustomText>
          </View>
        </Card.Content>
        <Card.Content>
          <View style={styles.user_image}>
            <Avatar.Image
              size={24}
              source={
                item?.user?.image && item?.user?.image !== ''
                  ? {uri: item?.user?.image}
                  : IMAGES.Dollar
              }
            />
            <Spacer width={5} />
            <View style={{maxWidth: SPACING.SCALE_115}}>
              <CustomText style={styles.name}>{item?.user?.name}</CustomText>
            </View>
          </View>
          <CustomText style={styles.duration}>
            {formatTimestamp(item?.created_at)}
          </CustomText>
          <Spacer height={5} />
          <View style={{alignSelf: 'center', marginBottom:5}}>
            <Custombutton2
              title={'Boost Product'}
              marginTop={10}
              width={180}
              height={40}
              marginHorizontal={20}
              fontSize={11}
              borderColor={'gray'}
              onPress={() => {
                // Alert.alert('rrr');
              }}
            />
          </View>
        </Card.Content>
        <View style={styles.bookmark}>
          <Pressable onPress={onPress}>
            <CustomIcon
              size={25}
              color={'white'}
              origin={ICON_TYPE.FEATHER_ICONS}
              name="more-vertical"
            />
          </Pressable>
        </View>
      </View>
    );
  };
  
  export default ProductCardBoost;
  
  const styles = StyleSheet.create({
    card_container: {
      flex: 0.5,
      backgroundColor: '#F6F6F6',
      
      margin: 5,
      width: width / 2 - 20,
      borderRadius:15
    },
    cover_style: {
      height: 150,
      // width: 100,
    },
    title: {
      fontSize: 18,
      fontFamily: FontsConst.Cabin_Bold,
      marginTop: SPACING.SCALE_5,
    },
    price_container: {
      flexDirection: 'row',
      alignItems: 'center',
      //justifyContent: 'space-between',
      paddingVertical: 5,
    },
    price: {
      color: '#00958C',
      fontSize: 12,
      fontFamily: FontsConst.Cabin_Bold,marginHorizontal:5
    },
    seprator: {
      height: 3,
      width: 3,
      borderRadius: 3 / 2,
      backgroundColor: '#00958C',
    },
    category: {
      color: '#00958C',
      fontSize: 12,
      fontFamily: FontsConst.Cabin_Regular,
      marginLeft: SPACING.SCALE_2,
    },
    user_image: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 5,
    },
    name: {
      fontSize: 12,
      fontFamily: FontsConst.OpenSans_SemiBold,
    },
    duration: {
      fontSize: 10,
      fontFamily: FontsConst.OpenSans_Regular,
      color: '#868686',
    },
    bookmark: {
      top: SPACING.SCALE_7,
      right: SPACING.SCALE_7,
      position: 'absolute',
      height: 30,
      width: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  