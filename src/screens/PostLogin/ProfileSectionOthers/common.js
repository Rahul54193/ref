import {View, Text} from 'react-native';
import React from 'react';
import {CustomText, Spacer} from '@app/components';
import {FontsConst} from '@app/assets/assets';

export function AboutRow({title, value}) {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
      }}>
      <CustomText
        style={{
          fontFamily: FontsConst.OpenSans_SemiBold,
          color: '#868686',
          fontSize: 14,
          width: '40%',
        }}>
        {title}
      </CustomText>
      <CustomText
        style={{
          fontFamily: FontsConst.OpenSans_SemiBold,
          color: '#454545',
          fontSize: 14,
          width: '60%',
        }}>
        {value}
      </CustomText>
    </View>
  );
}

export function GetAboutRow({value}) {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 20,
      }}>
      <CustomText
        style={{
          fontFamily: FontsConst.OpenSans_Bold,
          color: '#454545',
          fontSize: 15,
        }}>
        About
      </CustomText>
      <Spacer height={20} />
      <CustomText
        style={{
          fontFamily: FontsConst.OpenSans_Regular,
          color: '#000000',
          fontSize: 14,
        }}>
        {value}
      </CustomText>
    </View>
  );
}

export function PostFollowVisitor({post, follow, visitor}) {
  return (
    <View
      style={{
        height: 70,
        backgroundColor: '#F0F2FA',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CustomText
          style={{
            color: '#000000',
            fontFamily: FontsConst.Cabin_Bold,
            fontSize: 20,
          }}>
          {post}
        </CustomText>
        <CustomText
          style={{
            color: '#7C7C7C',
            fontFamily: FontsConst.OpenSans_SemiBold,
            fontSize: 15,
          }}>
          Posts
        </CustomText>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CustomText
          style={{
            color: '#000000',
            fontFamily: FontsConst.Cabin_Bold,
            fontSize: 20,
          }}>
          {follow}
        </CustomText>
        <CustomText
          style={{
            color: '#7C7C7C',
            fontFamily: FontsConst.OpenSans_SemiBold,
            fontSize: 15,
          }}>
          Followers
        </CustomText>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CustomText
          style={{
            color: '#000000',
            fontFamily: FontsConst.Cabin_Bold,
            fontSize: 20,
          }}>
          {visitor}
        </CustomText>
        <CustomText
          style={{
            color: '#7C7C7C',
            fontFamily: FontsConst.OpenSans_SemiBold,
            fontSize: 15,
          }}>
          Visitors
        </CustomText>
      </View>
    </View>
  );
}
export function common() {
  return (
    <View>
      <Text>common</Text>
    </View>
  );
}
