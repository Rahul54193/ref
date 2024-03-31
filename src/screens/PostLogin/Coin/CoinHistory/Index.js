/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
} from 'react-native';
import React, { useEffect } from 'react';
import {
  BackHeader,
  Container,
  CustomIcon,
  CustomText,
  Custombutton,
  NavigationBar,
  Spacer,
  SubmitButton,
} from '@app/components';
import { ICON_TYPE } from '@app/components/CustomIcon';
import { IMAGES } from '@app/resources';
import styles from './styles';
import { CoinHistoryAction } from '@app/store/sellersProfileSclice';
import { connect, useSelector } from 'react-redux';
import { EmptyList } from '../../ChatScreen/commn';
import PageTitle from '@app/screens/atoms/PageTitle';
import { Seprator } from '../../Interestlist/common';
import { LoadingStatus, RoutesName } from '@app/helper/strings';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

const CoinHistory = props => {
  const isFocus = useIsFocused();
  const { getCoinHistory, sellersProfileReducer } = props;
  const Data = sellersProfileReducer?.CoinHistoryAction?.data?.history;
  const Coins = sellersProfileReducer?.CoinHistoryAction?.data?.total_coins;

  const coinValue = Coins ? Coins : '0';
  useEffect(() => {
    if (isFocus) {
      getCoinHistory();
    }
  }, [isFocus]);
  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          //width: '90%',
          //alignItems: 'center',
          justifyContent: 'space-between',
          //height: 60,
          paddingVertical: 5,
          paddingHorizontal: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 15,
              fontFamily: 'OpenSans-SemiBold',
              color: 'black',
            }}>
            {item?.description}
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Image source={IMAGES.coin} />
            <Text
              style={{
                marginHorizontal: 10,
                fontFamily: 'OpenSans-SemiBold',
                fontSize: 15,
                color: 'black',
              }}>
              {item?.type == 'debit'
                ? item?.coins_value * -1
                : item?.coins_value}
            </Text>
            {item?.type == 'credit' && (
              <Image source={IMAGES.GreenTriangle} style={{ marginTop: 5 }} />
            )}
            {item?.type == 'debit' && (
              <Image source={IMAGES.RedTriangle} style={{ marginTop: 5 }} />
            )}
          </View>
        </View>
        <Text
          style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, marginTop: 10 }}>
          {item?.created_at_dis}
        </Text>
      </View>
    );
  };
  return (
    <Container
      useSafeAreaView={true}
      loading={
        sellersProfileReducer.CoinHistoryActionLoadingStatus ==
        LoadingStatus.LOADING
      }>
      <Spacer height={20} />
      <BackHeader />
      <View style={{ flexDirection: 'row' }}>
        <View style={{ margin: 10, marginTop: 30 }}>
          <Image source={IMAGES.CoinHistory} style={{ height: 72, width: 92 }} />
        </View>
        <View>
          <CustomText
            style={{
              fontSize: 35,
              fontFamily: 'OpenSans-SemiBold',
            }}>
            {coinValue}
          </CustomText>
          <View style={{ height: 100, width: 200 }}>
            <CustomText style={styles.TextStyle1}>
              You have {<Image source={IMAGES.coin} />} {coinValue} coins with
              you now
            </CustomText>
          </View>
        </View>
      </View>
      <View
        style={{
          marginHorizontal: 20,
        }}>
        <SubmitButton
          lable="Purchase Coins"
          onPress={() => {
            console.log('fghjk');
            props?.navigation?.navigate(RoutesName.PAY_NOW, {
              from: 'coin history',
            });
          }}
        />
      </View>
      <View
        style={{
          height: 2,
          backgroundColor: '#00000020',
          marginHorizontal: 20,
        }}
      />
      <PageTitle title={'History'} />
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 60,
          paddingTop: 20,
        }}
        data={Data}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        ListEmptyComponent={EmptyList}
        ItemSeparatorComponent={<Seprator />}
      />
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    authReducer: state.authReducer,
    sellersProfileReducer: state.sellersProfileReducer,
  };
};
const mapDispatchToProps = dispatch => ({
  getCoinHistory: params => dispatch(CoinHistoryAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CoinHistory);
