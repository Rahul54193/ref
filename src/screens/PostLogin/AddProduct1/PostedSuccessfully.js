/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { Container, Custombutton2, Spacer, StoryScreen } from '@app/components';
import { FONTS, IMAGES, SPACING } from '@app/resources';
import { RoutesName } from '@app/helper/strings';
import NavigationService from '@app/navigations/NavigationService';
import { useSelector } from 'react-redux';

const PostedSuccessfully = props => {
  // console.log('=======>>>>121', props);
  const user = useSelector(state => state?.authReducer?.userProfileDetails);
  console.log('=======>>>>121', props);

  return (
    <Container useSafeAreaView={true}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 10,
          paddingBottom: 30,
        }}>
        <View>
          <View style={styles.imageSizeStyle}>
            <Image source={IMAGES.check1} style={styles.imageStyle} />
          </View>
          <View>
            <Text style={styles.subheadline}>Posted Successfully</Text>
            <Text style={styles.text}>
              Your post is now visible to the customers
            </Text>
            <Text style={styles.text1}>
              You can boost your post to get higher visibility and get
              attractions
            </Text>
          </View>
          <View style={{ alignSelf: 'center' }}>
            <Custombutton2
              title={'Boost now'}
              marginTop={10}
              width={241}
              height={51}
              marginHorizontal={20}
              onPress={() => {
                if (props?.route?.params?.productID) {
                  props?.navigation?.navigate(
                    RoutesName.BOOST_PRODUCT_INTRODUCTION,
                    {
                      product_id: props?.route?.params?.productID,
                    },
                  );
                }
              }}
            />
          </View>
          <View>
            <TouchableOpacity style={{ alignSelf: 'center', marginTop: 30 }}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#00958C',
                  fontFamily: 'OpenSans-Regular',
                  textDecorationLine: 'underline',
                }}
                onPress={() => {
                  // NavigationService.navigate(RoutesName.CHANGE_PASSWORD_SCREEN);
                  // NavigationService.navigate(RoutesName.EXPLORE_TAB);
                  NavigationService.navigate(
                    RoutesName.PROFILE_SECTION_SCREEN,
                    { userID: user?.id },
                  );
                }}>
                Not now, I'll do it later
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <View style={{ height: 200 }}>
            <Text style={styles.text}>
              If you want to make any changes to your post you can do that from
              your posted ads section.
              <Text
                onPress={() => {
                  NavigationService.navigate(
                    RoutesName.PRODUCT_DETAILS,
                    { product_id: props?.route?.params?.productID, name: 'posted' },
                  );
                }}
                style={{
                  fontSize: 14,
                  color: '#00958C',
                  fontFamily: 'OpenSans-SemiBold',
                  textDecorationLine: 'underline',
                }}>
                View post
              </Text>
              {/* <TouchableOpacity style={{marginRight: 30, marginTop: 20}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#00958C',
                    fontFamily: 'OpenSans-SemiBold',
                    // textDecorationLine: 'underline',
                  }}
                  onPress={() => {
                    NavigationService.navigate(
                      RoutesName.PROFILE_SECTION_SCREEN,
                      {userID: user?.id},
                    );
                  }}>
                  View post
                </Text>
              </TouchableOpacity> */}
            </Text>
          </View>
        </View>
        <Spacer height={30} />
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  imageSizeStyle: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 80,
  },
  imageStyle: {
    height: 75,
    width: 75,
    borderRadius: SPACING.SCALE_10,
  },
  subheadline: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 24,
    fontFamily: 'OpenSans-SemiBold',
    // fontFamily:'Cabin-Bold',
    fontWeight: '600',
    width: 300,
    marginTop: 20,
    color: '#000000',
  },
  text: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    marginTop: 5,
  },

  text1: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 18,
    fontFamily: 'OpenSans-SemiBold',
    marginTop: 80,
    width: 280,

    textAlign: 'center',
    color: 'black',
  },
});

export default PostedSuccessfully;
