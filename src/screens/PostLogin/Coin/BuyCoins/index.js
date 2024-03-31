/* eslint-disable react-native/no-inline-styles */

import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Alert,
  ScrollView,
  Pressable,
  Platform,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {
  BackHeader,
  Container,
  CustomIcon,
  CustomText,
  Custombutton,
  NavigationBar,
} from '@app/components';
import {IMAGES, SPACING} from '@app/resources';
import styles from './styles';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {connect} from 'react-redux';
import {
  getProducts,
  getSubscriptions,
  requestPurchase,
  useIAP,
  validateReceiptIos,
  withIAPContext,
} from 'react-native-iap';
import {
  boostProduct,
  coinPlans,
  purchaseCoins,
} from '@app/store/exploreProductSlice/boostProduct.action';
import {useEffect} from 'react';
import {showAlert} from '@app/helper/commonFunction';
import {RoutesName} from '@app/helper/strings';
import {FontsConst} from '@app/assets/assets';
import {constants} from './constants';

const BuyCoins = props => {
  console.log(props, '---------------...');
  const {boostProductReducer, boostProduct, purchaseCoins, coinPlans} = props;
  const [selected, setSelected] = useState();
  const [purchaseCoinItem, setPurchaseCoinItem] = useState();
  const [plans, setPlans] = useState();
  const [buyingPlans, setBuyingPlans] = useState(null);

  const {
    connected,
    products,
    subscriptions,
    purchaseHistory,
    availablePurchases,
    currentPurchase,
    currentPurchaseError,
    setProducts,
    setSubscriptions,
    setAvailablePurchases,
    setPurchaseHistory,
    setCurrentPurchase,
  } = useIAP();

  const handleGetInApp = async () => {
    try {
      const result = await getProducts({skus: constants.productSkus});
      setPlans(result);
      console.log(result, 'coins---------------');
    } catch (error) {
      console.error('handleGetInApp Error ==!!===>>>>>', error);
    }
  };
  const handleGetSubInApp = async () => {
    try {
      const result = await getSubscriptions({skus: constants.subcriptionSkus});
      validateReceiptIos;
      console.log(result, '---------------');
    } catch (error) {
      console.error('handleGetInApp Error =====>bgg>>>>', error);
    }
  };
  //=======handle purchase
  const handlePurchase = async sku => {
    if (Platform.OS === 'ios') {
      await requestPurchase({
        sku,
        andDangerouslyFinishTransactionAutomaticallyIOS: false,
      });
    } else {
      await requestPurchase({
        skus: [sku],
        andDangerouslyFinishTransactionAutomaticallyIOS: false,
      });
    }
  };

  useEffect(() => {
    handleGetInApp();
  }, [connected]);
  // useEffect(() => {
  //   handleGetSubInApp();
  // }, [connected]);

  useEffect(() => {
    console.log(currentPurchase, 'current purchase ----->>>>>>');
    if (currentPurchase) {
      purchaseCoins({
        planid: currentPurchase.productId,
        transactionId: currentPurchase.transactionId,
      }).then(res => {
        if (res?.payload?.message === 'Coins purchased successfully.') {
          // Show an alert
          Alert.alert(
            'Success',
            'Coins purchased successfully.',
            [
              {
                text: 'OK',
                onPress: () => {
                  // Navigate back to the previous screen
                  props.navigation.goBack();
                },
              },
            ],
            {cancelable: false},
          );
        }
      });
    }
  }, [connected, currentPurchase]);

  console.log('Products =====>>>>>', products);
  console.log('Subscription =====>>>>>', subscriptions);

  // useEffect(() => {
  //   coinPlans();
  // }, []);
  // useEffect(() => {
  //   // const skus = Platform.select({
  //   //   ios: [
  //   //     'com.develop.SWI.300',
  //   //     'com.develop.500.SWI',
  //   //     'com.develop.SWI.800',
  //   //   ],
  //   // });
  //   getProducts({
  //     skus: [
  //       'com.develop.SWI.300',
  //       'com.develop.500.SWI',
  //       'com.develop.SWI.800',
  //     ],
  //   }).then(res => {
  //     console.log(res, '<<<<<=coins from ====');
  //   });
  //   // purchase('com.develop.SWI.300');
  // }, []);
  // const purchase = async sku => {
  //   try {
  //     await requestPurchase({
  //       sku,
  //       andDangerouslyFinishTransactionAutomaticallyIOS: false,
  //     });
  //   } catch (err) {
  //     console.warn(err.code, err.message);
  //   }
  // };
  console.log(boostProductReducer?.coinPlansData?.data, 'Coins Data');
  // function to extract number from string
  function extractNumberFromString(inputString) {
    var match = inputString.match(/\d+/); // Match one or more digits in the input string

    if (match) {
      return parseInt(match[0], 10); // Convert the matched string to an integer and return it
    } else {
      return null; // Return null if no number is found in the string
    }
  }

  var buyPlan = null;
  return (
    <Container useSafeAreaView={true}>
      <BackHeader />
      <ScrollView
        //key={23456787654345}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 40,
        }}>
        <View style={styles.CoinContainer}>
          <ImageBackground
            source={IMAGES.bag}
            style={styles.ImageBackgroudContainer}>
            <Image
              style={{
                top: SPACING.SCALE_1,
                marginLeft: 55,
                height: 58,
                width: 73,
              }}
              source={IMAGES.CoinBoostNow}
            />
          </ImageBackground>
        </View>

        <View style={styles.TextContainer}>
          <Text style={styles.TopText}>Buy coins now</Text>
          <Text style={styles.TopText}> and help your post</Text>
          <Text style={styles.TopText}> to boost.</Text>
        </View>

        <View style={{alignItems: 'center', marginBottom: 20}}>
          <Text style={styles.TextStyle1}>Get it Now</Text>
        </View>
        {plans ? (
          <FlatList
            data={plans}
            renderItem={({item, index}) => {
              //console.log(item, 'items=========');
              return (
                <Pressable
                  key={index}
                  onPress={() => {
                    setSelected(index);
                    setPurchaseCoinItem(item);
                    buyPlan = item;
                    // console.log(purchaseCoinItem, 'purchasted coins');
                    console.log(buyPlan, 'buy plans');
                  }}>
                  <View
                    style={[
                      styles.cardStyle,
                      index === selected && styles.highlightedLine,
                    ]}>
                    <View
                      style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingHorizontal: 5,
                        }}>
                        <CustomText
                          style={{
                            fontSize: 18,
                            marginHorizontal: 5,
                            fontFamily: 'OpenSans-Regular',
                            color: '#000',
                          }}>
                          Get
                        </CustomText>
                        <Image
                          source={IMAGES.coin}
                          style={{
                            height: 20,
                            width: 20,
                          }}
                        />
                        <CustomText
                          style={{
                            fontSize: 18,
                            marginHorizontal: 5,
                            fontFamily: FontsConst.OpenSans_Bold,
                            color: '#000',
                          }}>
                          {extractNumberFromString(item.title)}
                        </CustomText>
                        <CustomText
                          style={{
                            fontSize: 18,
                            marginHorizontal: 5,
                            fontFamily: 'OpenSans-Regular',
                            color: '#000',
                          }}>
                          for
                        </CustomText>
                      </View>
                      {/* <Text style={styles.outerText}>
                        Get{'  '}
                        <Text style={styles.innerText}>
                          {'  '}
                          {item.coins_value}{' '}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: 'OpenSans-SemiBold',
                            color: '#7C7C7C',
                          }}>
                          for
                        </Text>
                      </Text> */}

                      <View style={styles.CardCoinStyle}>
                        {/* <CustomIcon
                          origin={ICON_TYPE.FOUNDATION}
                          name={'dollar'}
                          color={'#00958C'}
                          size={30}
                          style={{marginTop: -8}}
                        /> */}
                        <Text style={styles.NumberStyle}>
                          {item?.cost == 0 ? 'Free' : item?.localizedPrice}
                        </Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
              );
            }}
          />
        ) : (
          <ActivityIndicator size={'small'} />
        )}

        <View>
          <Custombutton
            title="Pay now"
            marginTop={10}
            height={50}
            width={'100%'}
            marginHorizontal={20}
            onPress={() => {
              // console.log('fghjkl');
              if (purchaseCoinItem) {
                console.log(purchaseCoinItem.productId, '----');
                handlePurchase(purchaseCoinItem.productId).then(res => {
                  console.log(res, 'response from in app purchase');
                });
                console.log(buyingPlans, 'buying plans');
              } else {
                showAlert({
                  title: 'Alert',
                  message: 'Please select a plan.',
                });
              }
              // console.log('DATA+++++++', props.route.params, purchaseCoinItem);
              // if (
              //   props?.route?.params?.boostProductDetail?.planid?.coins_value >
              //   purchaseCoinItem?.coins_value
              // ) {
              //   showAlert({
              //     title: 'Please select another plan!',
              //     message:
              //       'There are less coins in this plan for boost your product.',
              //   });
              // } else {
              //   if (purchaseCoinItem?.id) {
              //     purchaseCoins({planid: purchaseCoinItem.id}).then(result => {
              //       if (
              //         result?.payload?.message ===
              //         'Coins purchased successfully.'
              //       ) {
              //         if (props?.route?.params?.from === 'coin history') {
              //           props?.navigation?.navigate(
              //             RoutesName.BOOST_PRODUCT_SUCCESS,
              //             {
              //               from: props?.route?.params?.from,
              //             },
              //           );
              //         } else {
              //           if (props?.route?.params?.boostProductDetail?.pid) {
              //             boostProduct({
              //               pid: props?.route?.params?.boostProductDetail?.pid,
              //               planid:
              //                 props?.route?.params?.boostProductDetail?.planid
              //                   ?.id,
              //             }).then(res => {
              //               if (
              //                 res?.payload?.message ===
              //                 'Your product has been successfully boosted.'
              //               ) {
              //                 props?.navigation?.navigate(
              //                   RoutesName.BOOST_PRODUCT_SUCCESS,
              //                 );
              //               }
              //               //
              //             });
              //           }
              //         }
              //       }
              //     });
              //   } else {
              //     showAlert({
              //       title: 'Alert',
              //       message: 'Please select a plan.',
              //     });
              //   }
              // }
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            props?.navigation?.goBack();
            if (props?.route?.params?.from !== 'coin history') {
              props?.navigation?.goBack();
            }
          }}
          style={{alignSelf: 'center', marginTop: 30}}>
          <Text
            style={{
              fontSize: 14,
              color: '#00958C',
              fontFamily: 'OpenSans-Regular',
              textDecorationLine: 'underline',
            }}>
            Not now, I'll do it later
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    boostProductReducer: state?.boostProductReducer,
  };
};

const mapDispatchToProps = dispatch => ({
  boostProduct: params => dispatch(boostProduct(params)),
  coinPlans: params => dispatch(coinPlans(params)),
  purchaseCoins: params => dispatch(purchaseCoins(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withIAPContext(BuyCoins));
