import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Avatar, Divider, List} from 'react-native-paper';
import {CustomIcon, CustomText, Spacer} from '@app/components';
import {AssestsConst, FontsConst} from '@app/assets/assets';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {addEllipsis} from '@app/helper/commonFunction';
import {useSelector} from 'react-redux';
import {RoutesName} from '@app/helper/strings';

const NormalProfile = props => {
  console.log(props.authReducer, '======');
  const {route, navigation, profileSectionReducer, isSelf, authReducer} = props;
  const st = useSelector(state => state.authReducer);
  console.log(st, 'fghjkl');
  //  console.log(profileSectionReducer, 'ghjkl');
  const useDetail = profileSectionReducer?.profileAbout;
  console.log('hgvjhbjb', useDetail);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 30,
      }}>
      <View style={styles.imageContainer}>
        <Avatar.Image
          source={
            useDetail?.image
              ? {
                  uri: useDetail?.image,
                }
              : AssestsConst.AVATAR
          }
          size={100}
        />
        <CustomText
          style={{
            fontFamily: FontsConst.Cabin_Bold,
            color: '#000000',
            fontSize: 24,
          }}>
          {addEllipsis(useDetail?.name, 15)}
        </CustomText>
        {props.authReducer?.userProfileDetails?.user_id_tag && (
          <CustomText
            style={{
              // fontFamily: FontsConst.Cabin_Bold,
              color: '#000000',
              fontSize: 16,
            }}>
            {'@'}
            {addEllipsis(props.authReducer.userProfileDetails.user_id_tag, 15)}
          </CustomText>
        )}

        {/* <CustomText
          style={{
            fontFamily: FontsConst.OpenSans_Regular,
            color: '#737373',
            fontSize: 14,
          }}>
          {useDetail?.email}
        </CustomText> */}
        {/* <CustomText
          style={{
            fontFamily: FontsConst.OpenSans_Regular,
            color: '#737373',
            fontSize: 14,
          }}>
          {'+65 ' + useDetail?.mobile}
        </CustomText> */}
      </View>
      <Divider style={styles.divider} />
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
        <CustomText
          style={{
            fontFamily: FontsConst.OpenSans_Regular,
            color: '#000000',
            fontSize: 14,
          }}>
          {useDetail?.bio ?? '-'}
        </CustomText>
      </View>
      {isSelf ? (
        <View>
          <Divider style={styles.divider} />
          <View
            style={{
              height: 70,
              paddingHorizontal: 20,
              justifyContent: 'center',
            }}>
            <List.Item
              title={`${useDetail?.total_following} Followings`}
              titleStyle={{
                fontFamily: FontsConst.OpenSans_Regular,
                fontSize: 16,
              }}
              left={props => (
                <CustomIcon
                  origin={ICON_TYPE.ANT_ICON}
                  name={'adduser'}
                  color={'black'}
                  size={25}
                />
              )}
              right={props => (
                <CustomIcon
                  origin={ICON_TYPE.SIMPLE_LINE_ICONS}
                  name={'arrow-right'}
                  color={'black'}
                  size={15}
                />
              )}
            />
          </View>
          <Divider style={styles.divider} />
          <Pressable
            onPress={() =>
              navigation?.navigate(RoutesName.REVIEW_RATING_SCREEN, {
                userID: useDetail?.id,
                UserIdTag: useDetail?.user_id_tag,
              })
            }>
            <View
              style={{
                height: 70,
                paddingHorizontal: 20,
                justifyContent: 'center',
              }}>
              <List.Item
                title={'See Your Rating '}
                titleStyle={{
                  fontFamily: FontsConst.OpenSans_Regular,
                  fontSize: 16,
                }}
                right={props => (
                  <CustomIcon
                    origin={ICON_TYPE.SIMPLE_LINE_ICONS}
                    name={'arrow-right'}
                    color={'black'}
                    size={15}
                  />
                )}
              />
            </View>
          </Pressable>

          <Divider style={styles.divider} />
        </View>
      ) : null}
      <Spacer />
    </ScrollView>
  );
};

export default NormalProfile;

const styles = StyleSheet.create({
  divider: {
    width: '90%',
    alignSelf: 'center',
    height: 2,
  },
  imageContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
