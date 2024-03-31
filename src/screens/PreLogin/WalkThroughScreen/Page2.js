import {Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {SubmitButton, CustomText, Spacer} from '@app/components';
import {IMAGES} from '@app/resources';
import {FontsConst} from '@app/assets/assets';
import Pagination from './Pagination';
import LoginHeader from '@app/screens/atoms/LoginHeader';

const Page2 = ({onPress}) => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={{width: '80%'}}>
      <Image
        source={IMAGES.Rectangle1}
        style={{
          height: 342,
          width: 284,
          alignSelf: 'center',
          borderRadius: 10,
        }}
      />
      <Spacer height={30} />
      <LoginHeader
        title={'Buy and Sell'}
        description={
          'Erat neque facilisi pharetra et habitant posuere. Id tortor nisl eu scelerisque tempor orci sit. Egestas mus sapien duis vel necpellentesque sit et convallis'
        }
      />
      <Spacer height={30} />
      <Pagination currentPage={1} />
      <Spacer height={30} />
      <SubmitButton onPress={onPress} lable="Next" />
    </ScrollView>
  );
};

export default Page2;

const styles = StyleSheet.create({});
