/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
  Alert,
} from 'react-native';
import React from 'react';
import {
  BackHeader,
  Container,
  CustomIcon,
  CustomText,
  Spacer,
} from '@app/components';
import styles from './styles';
import HorizontalLine from '@app/components/HorizontalLine';
import { COLORS, IMAGES, SPACING, TYPOGRAPHY } from '@app/resources';
import { FONT_SIZE_16, FONT_SIZE_33 } from '@app/resources/typography';
import { useDispatch, useSelector } from 'react-redux';
import {
  onhandleRemoveProduct,
  resetAddToProductSliceState,
} from '@app/store/exploreProductSlice/addToCompare.slice';
import { ICON_TYPE } from '@app/components/CustomIcon';
import { addEllipsis } from '@app/helper/commonFunction';
import { FontsConst } from '@app/assets/assets';
import PageTitle from '@app/screens/atoms/PageTitle';
import moment from 'moment';
import NavigationService from '@app/navigations/NavigationService';
import { RoutesName } from '@app/helper/strings';

const ItemComparison = props => {
  const dispatch = useDispatch();
  let temp = productCompareList ?? [];
  console.log(
    'Shiftttt',
    temp.filter((item, index) => index != 0),
  );
  console.log('========>>>>', props?.route?.params);
  const { productCompareList } = useSelector(state => state?.addToCompareReducer);
  console.log('============>>>>>', productCompareList);
  return (
    <Container useSafeAreaView={true} style={{}}>
      <BackHeader />
      {productCompareList.length !== 0 ? (
        <View style={{ flex: 1 }}>
          <CustomText
            style={{
              fontSize: SPACING.SCALE_22,
              fontFamily: FontsConst.Cabin_Bold,
              marginLeft: SPACING.SCALE_20,
            }}>
            Compare products
          </CustomText>
          <Spacer height={SPACING.SCALE_20} />
          <TouchableOpacity
            style={{
              fontWeight: 'bold',
              marginLeft: SPACING.SCALE_20,
            }}
            onPress={() => {
              dispatch(resetAddToProductSliceState());
            }}>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: SPACING.SCALE_18,
              }}>
              Remove all
            </Text>
          </TouchableOpacity>
          <Spacer />
          {/* <Text>{props?.route?.params?.product_id}</Text> */}

          <View
            style={{
              height: 3,
              width: 30,
              backgroundColor: '#00958C',
              marginLeft: SPACING.SCALE_20,
            }}></View>

          <View style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ flexDirection: 'row' }}>
                <Pressable

                  onPress={() => {
                    NavigationService.navigate(RoutesName.PRODUCT_DETAILS, {
                      product_id: productCompareList[0]?.id
                    })
                  }}
                >
                  <View style={{ marginLeft: 20 }}>
                    {productCompareList[0]?.thumb_image ? (
                      <>
                        <Image
                          style={styles.imageStyle}
                          source={{
                            uri: productCompareList[0]?.thumb_image,
                          }}
                        />
                      </>
                    ) : null}

                    <CustomText
                      style={{
                        fontSize: SPACING.SCALE_18,
                        color: COLORS.APPGREEN,
                        fontWeight: 'bold',
                        // marginLeft: SPACING.SCALE_33,
                      }}>
                      {addEllipsis(productCompareList[0]?.title, 10)}
                    </CustomText>
                    <Spacer height={SPACING.SCALE_25} />
                    <CustomText
                      style={{
                        fontSize: SPACING.SCALE_18,
                        color: COLORS.BLACK,
                        fontWeight: 'bold',
                        // marginLeft: SPACING.SCALE_33,
                      }}>
                      Model Number
                    </CustomText>
                    <Spacer />
                    <CustomText
                      style={{
                        fontSize: SPACING.SCALE_18,
                        color: COLORS.modalViewTextColor,
                        maxWidth: SPACING.SCALE_145,
                        // backgroundColor: 'red',
                      }}>
                      {addEllipsis(productCompareList[0]?.model?.name, 10)}
                    </CustomText>
                    <Spacer />
                    <HorizontalLine width={SPACING.SCALE_160} />
                    <Spacer height={SPACING.SCALE_25} />
                    <CustomText
                      style={{
                        fontSize: SPACING.SCALE_18,
                        color: COLORS.BLACK,
                        fontWeight: 'bold',
                        // marginLeft: SPACING.SCALE_33,
                      }}>
                      Condition
                    </CustomText>
                    <Spacer />
                    <CustomText
                      style={{
                        fontSize: SPACING.SCALE_18,
                        color: COLORS.modalViewTextColor,
                        maxWidth: SPACING.SCALE_145,
                      }}>
                      {addEllipsis(productCompareList[0]?.watch_condition, 10)}
                    </CustomText>
                    <Spacer />
                    <HorizontalLine width={SPACING.SCALE_160} />
                    <Spacer height={SPACING.SCALE_25} />
                    <CustomText
                      style={{
                        fontSize: SPACING.SCALE_18,
                        color: COLORS.BLACK,
                        fontWeight: 'bold',
                        // marginLeft: SPACING.SCALE_33,
                      }}>
                      Price
                    </CustomText>
                    <Spacer />
                    <CustomText
                      style={{
                        fontSize: SPACING.SCALE_18,
                        color: COLORS.modalViewTextColor,
                        maxWidth: SPACING.SCALE_145,
                      }}>
                      $ {addEllipsis(productCompareList[0]?.price, 10)}
                    </CustomText>
                    <Spacer />
                    <HorizontalLine width={SPACING.SCALE_160} />
                    <Spacer height={SPACING.SCALE_25} />
                    <CustomText
                      style={{
                        fontSize: SPACING.SCALE_18,
                        color: COLORS.BLACK,
                        fontWeight: 'bold',
                        // marginLeft: SPACING.SCALE_33,
                      }}>
                      Dated
                    </CustomText>
                    <Spacer />
                    <CustomText
                      style={{
                        fontSize: SPACING.SCALE_18,
                        color: COLORS.modalViewTextColor,
                      }}>
                      {moment(productCompareList[0]?.dated).format('MMM, YYYY')}
                    </CustomText>
                    <Spacer />
                    <HorizontalLine width={SPACING.SCALE_160} />
                    <Spacer height={SPACING.SCALE_25} />
                    <CustomText
                      style={{
                        fontSize: SPACING.SCALE_18,
                        color: COLORS.BLACK,
                        fontWeight: 'bold',
                        // marginLeft: SPACING.SCALE_33,
                      }}>
                      Sold by
                    </CustomText>
                    <Spacer />
                    <CustomText
                      style={{
                        fontSize: SPACING.SCALE_18,
                        color: COLORS.modalViewTextColor,
                        maxWidth: SPACING.SCALE_145,
                      }}>
                      {/* {addEllipsis(productCompareList[0]?.user?.name, 10)} */}
                     @ {
                        productCompareList[0]?.user?.user_id_tag
                      }
                    </CustomText>
                    <Spacer />
                    <HorizontalLine width={SPACING.SCALE_160} />
                    <Spacer height={SPACING.SCALE_20} />
                  </View>
                </Pressable>

                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={productCompareList}
                  renderItem={({ item, index }) => {
                    return index !== 0 ? (
                      <Pressable style={{ marginLeft: 16 }} onPress={() => {
                        NavigationService.navigate(RoutesName.PRODUCT_DETAILS, {
                          product_id: item?.id,
                        });
                      }}>
                        {item?.thumb_image ? (
                          <>
                            <Image
                              style={styles.imageStyle}
                              source={{
                                uri: item?.thumb_image,
                              }}
                            />

                            <TouchableOpacity
                              style={{
                                position: 'absolute',
                                right: 23,
                                top: 10,
                                backgroundColor: 'black',
                                height: 25,
                                width: 25,
                                borderRadius: 25 / 2,
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                              onPress={() => {
                                dispatch(onhandleRemoveProduct(item?.id));
                              }}>
                              <CustomIcon
                                origin={ICON_TYPE.ANT_ICON}
                                name={'closecircleo'}
                                size={20}
                                color={'white'}
                              />
                            </TouchableOpacity>
                          </>
                        ) : null}

                        <CustomText
                          style={{
                            fontSize: SPACING.SCALE_18,
                            color: COLORS.APPGREEN,
                            fontWeight: 'bold',
                            // marginLeft: SPACING.SCALE_33,
                          }}>
                          {addEllipsis(item?.title, 10)}
                        </CustomText>
                        <Spacer height={SPACING.SCALE_25} />
                        <CustomText
                          style={{
                            fontSize: SPACING.SCALE_18,
                            color: COLORS.BLACK,
                            fontWeight: 'bold',
                            // marginLeft: SPACING.SCALE_33,
                          }}>
                          Model Number
                        </CustomText>
                        <Spacer />
                        <CustomText
                          style={{
                            fontSize: SPACING.SCALE_18,
                            color: COLORS.modalViewTextColor,
                            maxWidth: SPACING.SCALE_145,
                          }}>
                          {addEllipsis(item?.model?.name, 10)}
                        </CustomText>
                        <Spacer />
                        <HorizontalLine width={SPACING.SCALE_160} />
                        <Spacer height={SPACING.SCALE_25} />
                        <CustomText
                          style={{
                            fontSize: SPACING.SCALE_18,
                            color: COLORS.BLACK,
                            fontWeight: 'bold',
                            // marginLeft: SPACING.SCALE_33,
                          }}>
                          Condition
                        </CustomText>
                        <Spacer />
                        <CustomText
                          style={{
                            fontSize: SPACING.SCALE_18,
                            color: COLORS.modalViewTextColor,
                            maxWidth: SPACING.SCALE_145,
                          }}>
                          {addEllipsis(item?.watch_condition, 10)}
                        </CustomText>
                        <Spacer />
                        <HorizontalLine width={SPACING.SCALE_160} />
                        <Spacer height={SPACING.SCALE_25} />
                        <CustomText
                          style={{
                            fontSize: SPACING.SCALE_18,
                            color: COLORS.BLACK,
                            fontWeight: 'bold',
                            // marginLeft: SPACING.SCALE_33,
                          }}>
                          Price
                        </CustomText>
                        <Spacer />
                        <CustomText
                          style={{
                            fontSize: SPACING.SCALE_18,
                            color: COLORS.modalViewTextColor,
                            maxWidth: SPACING.SCALE_145,
                          }}>
                          $ {addEllipsis(item?.price, 10)}
                        </CustomText>
                        <Spacer />
                        <HorizontalLine width={SPACING.SCALE_160} />
                        <Spacer height={SPACING.SCALE_25} />
                        <CustomText
                          style={{
                            fontSize: SPACING.SCALE_18,
                            color: COLORS.BLACK,
                            fontWeight: 'bold',
                            // marginLeft: SPACING.SCALE_33,
                          }}>
                          Dated
                        </CustomText>
                        <Spacer />
                        <CustomText
                          style={{
                            fontSize: SPACING.SCALE_18,
                            color: COLORS.modalViewTextColor,
                            maxWidth: SPACING.SCALE_145,
                          }}>
                          {moment(item?.dated).format('MMM, YYYY')}
                        </CustomText>
                        <Spacer />
                        <HorizontalLine width={SPACING.SCALE_160} />
                        <Spacer height={SPACING.SCALE_25} />
                        <CustomText
                          style={{
                            fontSize: SPACING.SCALE_18,
                            color: COLORS.BLACK,
                            fontWeight: 'bold',
                            // marginLeft: SPACING.SCALE_33,
                          }}>
                          Sold by
                        </CustomText>
                        <Spacer />
                        <CustomText
                          style={{
                            fontSize: SPACING.SCALE_18,
                            color: COLORS.modalViewTextColor,
                            maxWidth: SPACING.SCALE_145,
                          }}>
                          {/* {addEllipsis(item?.user?.name, 10)} */}
                         @ {
                            item?.user?.user_id_tag
                          }
                        </CustomText>
                        <Spacer />
                        <HorizontalLine width={SPACING.SCALE_160} />
                        <Spacer height={SPACING.SCALE_20} />
                      </Pressable>
                    ) : null;
                  }}
                />
              </View>

              <Spacer height={SPACING.SCALE_25} />
            </ScrollView>
          </View>
        </View>
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: SPACING.SCALE_20, fontWeight: 'bold' }}>
            Please add products to compare.
          </Text>
        </View>
      )}
    </Container>
  );
};

export default ItemComparison;
