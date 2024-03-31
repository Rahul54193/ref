/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import {
  BackHeader,
  Container,
  Custombutton,
  NavigationBar,
  Spacer,
  SubmitButton,
} from '@app/components';
import { IMAGES, SPACING } from '@app/resources';
import styles from './styles';
import { RoutesName } from '@app/helper/strings';
import { ScrollView } from 'react-native-gesture-handler';
import { connect, useSelector } from 'react-redux';
import {
  boostPlans,
  boostProduct,
} from '@app/store/exploreProductSlice/boostProduct.action';
import { useEffect } from 'react';
import { userProfile } from '@app/store/authSlice';
import { addEllipsis, showAlert } from '@app/helper/commonFunction';
import { FontsConst } from '@app/assets/assets';

const BoostNow = props => {
  const [selected, setSelected] = useState();
  const [selectedPlan, setSelectedPlan] = useState();

  const { boostProduct, boostProductReducer, boostPlans, authReducer } = props;

  const params = {
    pid: props?.route?.params?.product_id,
    planid: selectedPlan,
  };

  useEffect(() => {
    boostPlans();
  }, []);

  return (
    <Container useSafeAreaView={true}>
      <BackHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          margin: 20,
          flexGrow: 1,
          paddingBottom: 20,
        }}>
        <View style={styles.CoinContainer}>
          <ImageBackground
            source={IMAGES.sandWatch}
            style={styles.ImageBackgroudContainer}>
            <Image
              style={{ top: SPACING.SCALE__35, marginLeft: 30 }}
              source={IMAGES.CoinBoostNow}
            />
          </ImageBackground>
        </View>

        <View style={styles.TextContainer}>
          <Text style={styles.TopText}>You can select a</Text>
          <Text style={styles.TopText}>time frame to increase the</Text>
          <Text style={styles.TopText}>visibility of your post.</Text>
        </View>

        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text style={styles.TextStyle1}>
            You have {<Image source={IMAGES.coin} />}{' '}
            {authReducer?.userProfileDetails?.coins} coins with you now
          </Text>
        </View>
        {boostProductReducer?.boostPlansData?.data?.length !== 0 ? (
          <FlatList
            data={boostProductReducer?.boostPlansData?.data}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    params.planid = item.id;
                    console.log(
                      'COINS==',
                      authReducer?.userProfileDetails?.coins,
                      item.coins_value,
                    );
                    if (
                      authReducer?.userProfileDetails?.coins >= item.coins_value
                    ) {
                      setSelected(index);
                      setSelectedPlan(item.id);
                    } else {
                      showAlert({
                        title: 'Not enough coins for this plan.',
                      });
                    }
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
                          {addEllipsis(item?.plan_name, 15)}{' '}
                        </Text>{' '}
                      </Text>
                      {item?.coins_value == 0 ? (
                        <View style={styles.CardCoinStyle}>
                          <Text style={styles.NumberStyle}>Free</Text>
                        </View>
                      ) : (
                        <View style={styles.CardCoinStyle}>
                          <Image
                            source={IMAGES.coin}
                            style={{ marginRight: 7, height: 18, width: 22 }}
                          />
                          <Text style={styles.NumberStyle}>
                            {item?.coins_value}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <View>
            <ActivityIndicator size={40} />
          </View>
        )}

        <SubmitButton
          lable="Boost Now"
          onPress={() => {
            if (selectedPlan) {
              boostProduct(params).then(result => {
                if (
                  result?.payload?.message ===
                  'Your product has been successfully boosted.'
                ) {
                  props?.navigation?.navigate(RoutesName.BOOST_PRODUCT_SUCCESS);
                }
              });
            } else {
              showAlert({
                title: 'Alert',
                message: 'Please select one plan.',
              });
            }
          }}
        />
        <Spacer height={20} />
        <TouchableOpacity style={{ alignSelf: 'center' }}>
          <Text
            style={{
              fontSize: 14,
              color: '#00958C',
              fontFamily: FontsConst.OpenSans_SemiBold,
              textDecorationLine: 'underline',
            }}
            onPress={() => {
              NavigationService.navigate(
                RoutesName.PROFILE_SECTION_SCREEN,
                { userID: authReducer?.userProfileDetails?.id },
              );
            }}>
            Not now, I'll do it later
          </Text>
        </TouchableOpacity>
        <Spacer height={30} />
      </ScrollView>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    boostProductReducer: state?.boostProductReducer,
    authReducer: state?.authReducer,
  };
};

const mapDispatchToProps = dispatch => ({
  boostProduct: params => dispatch(boostProduct(params)),
  boostPlans: params => dispatch(boostPlans(params)),

  userProfile: params => dispatch(userProfile(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BoostNow);
