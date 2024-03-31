/* eslint-disable react-native/no-inline-styles */
import {
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {
  BackHeader,
  Container,
  Custombutton,
  NavigationBar,
  Spacer,
  SubmitButton,
} from '@app/components';
import {IMAGES, SPACING} from '@app/resources';
import {RoutesName} from '@app/helper/strings';
import styles from './styles';
import {connect} from 'react-redux';
import {boostPlans} from '@app/store/exploreProductSlice/boostProduct.action';
import {useEffect} from 'react';
import {showAlert} from '@app/helper/commonFunction';

const PurchaseCoin = props => {
  const {boostPlans, boostProductReducer} = props;
  const [selected, setSelected] = useState();
  const [selectedPladId, setSelectedPlanId] = useState();
  useEffect(() => {
    boostPlans();
  }, []);

  const boostProductDetail = {
    pid: props?.route?.params?.product_id,
    planid: selectedPladId,
  };
  return (
    <Container useSafeAreaView={true}>
      <BackHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 40,
          paddingTop: 10,
        }}>
        <View style={styles.CoinContainer}>
          <ImageBackground
            source={IMAGES.sandWatch}
            style={styles.ImageBackgroudContainer}>
            <Image
              style={{top: SPACING.SCALE__35, marginLeft: 30}}
              source={IMAGES.CoinBoostNow}
            />
          </ImageBackground>
        </View>

        <View style={styles.TextContainer}>
          <Text style={styles.TopText}>You can select a</Text>
          <Text style={styles.TopText}>time frame to increase the</Text>
          <Text style={styles.TopText}>visibility of your post.</Text>
        </View>

        <View style={{alignItems: 'center', marginBottom: 20}}>
          <Text style={styles.TextStyle1}>
            No coins? Buy them to use this feature.
          </Text>
        </View>
        {boostProductReducer?.boostPlansData?.data?.length != 0 ? (
          <FlatList
            contentContainerStyle={{
              flexGrow: 1,
            }}
            data={boostProductReducer?.boostPlansData?.data}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{}}
                  onPress={() => {
                    setSelected(index);
                    setSelectedPlanId(item);
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
                      <Text style={styles.outerText}>
                        {' '}
                        for{' '}
                        <Text style={styles.innerText}>
                          {' '}
                          {item.plan_name}{' '}
                        </Text>{' '}
                      </Text>
                      <View style={styles.CardCoinStyle}>
                        <Image
                          source={IMAGES.coin}
                          style={{marginRight: 7, height: 18, width: 22}}
                        />
                        <Text style={styles.NumberStyle}>
                          {item.coins_value}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <View>
            <Text>No Data</Text>
          </View>
        )}
        <Spacer height={40} />
        <SubmitButton
          buttonStyle={{
            width: '80%',
            alignSelf: 'center',
          }}
          lable="Purchase Coins"
          onPress={() => {
            if (boostProductDetail.planid) {
              props.navigation.navigate(RoutesName.PAY_NOW, {
                boostProductDetail,
              });
            } else {
              showAlert({
                title: 'Error',
                message: 'Please select one plan to boost product.',
              });
            }
          }}
        />

        <TouchableOpacity style={{alignSelf: 'center', marginTop: 30}}>
          <Text
            style={{
              fontSize: 14,
              color: '#00958C',
              fontFamily: 'OpenSans-Regular',
              textDecorationLine: 'underline',
            }}
            onPress={() => {
              props?.navigation?.goBack();
              props?.navigation?.goBack();
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
  //boostProduct: params => dispatch(boostProduct(params)),
  boostPlans: params => dispatch(boostPlans(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseCoin);
