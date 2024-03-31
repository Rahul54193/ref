import {Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {SubmitButton, CustomText, Spacer} from '@app/components';
import {IMAGES} from '@app/resources';
import {FontsConst} from '@app/assets/assets';
import Pagination from './Pagination';
import LoginHeader from '@app/screens/atoms/LoginHeader';

const Page3 = ({onPress}) => {
  const rowItem = () => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Image
            source={IMAGES.Rectangle1}
            style={{
              height: 80,
              width: 80,
              alignSelf: 'center',
              borderRadius: 10,
            }}
          />
          <Spacer width={10} />
          <CustomText
            style={{
              fontFamily: FontsConst.OpenSans_Regular,
            }}>
            Lorem ipsum dolor sit amet consectetur. Erat neque facilisi pharetra
            et
          </CustomText>
        </View>
        <Spacer height={30} />
      </>
    );
  };
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={{width: '80%'}}>
      <LoginHeader
        title={'Features'}
        description={
          'Erat neque facilisi pharetra et habitant posuere. Id tortor nisl eu scelerisque tempor orci sit. Egestas mus sapien duis vel necpellentesque sit et convallis'
        }
      />
      <Spacer height={20} />
      {rowItem()}
      {rowItem()}
      {rowItem()}
      <Spacer height={30} />
      <Pagination currentPage={2} />
      <Spacer height={30} />
      <SubmitButton onPress={onPress} lable="Get Started" />
    </ScrollView>
  );
};

export default Page3;

const styles = StyleSheet.create({});
