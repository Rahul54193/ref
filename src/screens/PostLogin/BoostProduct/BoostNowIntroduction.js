/* eslint-disable react-native/no-inline-styles */

import {
  View,
  Text,
  Image,
  ImageBackground,
  Pressable,
  Alert,
  ScrollView,
} from 'react-native';
import React from 'react';
import {
  BackHeader,
  Container,
  CustomText,
  Custombutton,
  NavigationBar,
  Spacer,
  SubmitButton,
} from '@app/components';
import {COLORS, IMAGES, SPACING} from '@app/resources';
import styles from './styles';
import {RoutesName} from '@app/helper/strings';
import {connect, useSelector} from 'react-redux';
import {userProfile} from '@app/store/authSlice';
import NavigationService from '@app/navigations/NavigationService';

const BoostNowIntroduction = props => {
  const {authReducer, userProfile} = props;
  console.log(
    authReducer?.userProfileDetails?.coins,
    userProfile,
    'get started boost coins',
  );
  console.log(
    'product id==>>',
    props?.route?.params?.product_id,
    authReducer?.userProfileDetails,
  );
  const user = useSelector(state => state?.authReducer?.userProfileDetails);
  const isCoins = authReducer?.userProfileDetails?.coins === '0' ? false : true;
  return (
    <Container useSafeAreaView={true}>
      <BackHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 20,
          alignItems: 'center',
        }}>
        <ImageBackground
          source={IMAGES.BoostNowShade1}
          style={styles.ImageBackgroudContainer}>
          <Image
            style={{top: SPACING.SCALE__30}}
            source={IMAGES.CoinBoostNow}
          />
        </ImageBackground>

        <CustomText style={styles.BoostTextStyle}>
          Sell your watch faster Boost it now
        </CustomText>
        <Spacer height={20} />

        <View style={styles.contentMainStyle}>
          <View style={styles.GroupContainerStyle}>
            <View style={styles.GroupStyle}>
              <Image source={IMAGES.GroupIcon} />
            </View>
            <View style={styles.ContentTextStyle}>
              <Text style={styles.HedaerStyle}>Get 3X customers</Text>
              <Text style={styles.ContentStyle}>
                If you want to make any changes to your post you can do that
                from your posted ads section.
              </Text>
            </View>
          </View>
          <Spacer height={25} />
          <View style={styles.GroupContainerStyle}>
            <View style={styles.GroupStyle}>
              <Image
                style={{height: 30, width: 30}}
                source={IMAGES.handDollor}
              />
            </View>
            <View style={styles.ContentTextStyle}>
              <Text style={styles.HedaerStyle}>Sell your watch faster </Text>
              <Text style={styles.ContentStyle}>
                If you want to make any changes to your post you can do that
                from your posted ads section.
              </Text>
            </View>
          </View>
        </View>
        <Spacer height={36} />
        <SubmitButton
          buttonStyle={{
            width: '80%',
          }}
          lable="Get Started"
          onPress={() => {
            console.log('Icsoins==', isCoins);
            if (props?.route?.params?.product_id) {
              props?.navigation?.navigate(
                isCoins ? RoutesName.BOOST_NOW : RoutesName.BOOST_PURCHASE_COIN,
                {
                  product_id: props?.route?.params?.product_id,
                },
              );
            }
          }}
        />
        <Pressable
          style={styles.pressableStyle}
          onPress={() => {
            // NavigationService.navigate(RoutesName.CHANGE_PASSWORD_SCREEN);
            // NavigationService.navigate(RoutesName.EXPLORE_TAB);
            NavigationService.navigate(RoutesName.PROFILE_SECTION_SCREEN, {
              userID: user?.id,
            });
          }}>
          {/* // onPress={() => props?.navigation?.goBack()}> */}
          <Text style={styles.hyperlinkStyle}>Not now, I’ll do it later</Text>
        </Pressable>
      </ScrollView>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    authReducer: state?.authReducer,
  };
};

const mapDispatchToProps = dispatch => ({
  userProfile: params => dispatch(userProfile(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoostNowIntroduction);
