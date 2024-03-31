import {FontsConst} from '@app/assets/assets';
import {CustomIcon, CustomText, Spacer} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {showAlert} from '@app/helper/commonFunction';
import {width} from '@app/helper/responsiveSize';
import {useState} from 'react';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import {ActivityIndicator, Avatar} from 'react-native-paper';
// const IMAGE = {
//   uri: 'https://lh3.googleusercontent.com/ogw/AGvuzYbkLlIwF2xKG4QZq9aFTMRH7Orn1L39UADtLp70Eg=s64-c-mo',
// };
export function Seprator() {
  return <View style={styles.seprator} />;
}

export function EmptyList() {
  return (
    <View style={styles.empty_container}>
      <CustomText>No record(s)</CustomText>
    </View>
  );
}

export function RenderItem({
  item,
  index,
  sendNotification,
  onCallback,
  deleteNotification,
  selected,
  setSeleted,
}) {
  const userName = item?.user?.name;
  const profilePic = item?.user?.image;
  const price = item?.price;
  const watch_title = item?.title;
  const watch_condition = item?.lists_condition;

  const isSelected = index == selected ? true : false;
  console.log(item, 'Item==================');
  // console.log(profilePic, '---------------')
  return (
    <View style={styles.product}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Avatar.Image size={30} source={{uri: profilePic}} />
            <Spacer width={10} />
            <CustomText style={styles.brandtext}>{userName}</CustomText>
          </View>
          <CustomText style={styles.branddescriptiontext}>
            {item.p_id == null
              ? item?.brand?.name + ' ' + item?.brandmodel?.name
              : watch_title}
          </CustomText>
        </View>
        {isSelected == true ? (
          <ActivityIndicator />
        ) : (
          <Pressable
            onPress={() => {
              setSeleted(index);
              showAlert({
                title: `Are you sure want to Delete? `,
                // message: `Sdfghjk`,
                actions: [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => {
                      setSeleted(null);
                    },
                  },
                  {
                    text: 'Confirm',
                    onPress: () => {
                      deleteNotification({id: item?.lists_id}).then(res => {
                        if (res?.type.includes('fulfilled')) {
                          setSeleted(null);
                          showAlert({
                            title: 'Success',
                            message: 'Deleted Successfully.',
                          });
                          onCallback();
                          // resetForm();
                        }
                        if (res?.type.includes('rejected')) {
                          showAlert({
                            title: 'Error',
                            message:
                              res?.payload?.message ?? 'Internal server error!',
                          });
                        }
                      });
                    },
                  },
                ],
              });
            }}>
            <CustomIcon
              origin={ICON_TYPE.ANT_ICON}
              name={'delete'}
              color={'red'}
              size={30}
            />
          </Pressable>
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}>
        <View style={styles.price_row}>
          <CustomText style={styles.price}>
            {/* ${item.p_id == null ? 0 : price} */}${price == null ? 0 : price}
          </CustomText>
          <View style={styles.circle} />
          <CustomText style={styles.condition}>{watch_condition}</CustomText>
        </View>
        <Pressable
          onPress={() => {
            showAlert({
              title: `Are you sure want to send? `,
              // message: `Sdfghjk`,
              actions: [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'Confirm',
                  onPress: () => {
                    sendNotification({id: item?.lists_id}).then(res => {
                      if (res?.type.includes('fulfilled')) {
                        showAlert({
                          title: 'Success',
                          message: 'Notification sent succesfully.',
                        });
                        onCallback();
                        // resetForm();
                      }
                      if (res?.type.includes('rejected')) {
                        showAlert({
                          title: 'Error',
                          message:
                            res?.payload?.message ?? 'Internal server error!',
                        });
                      }
                    });
                    // alert('fghjk');
                    // const numericValue = amount?.replace(/[^0-9.]/g, '');
                    // // sendMessage({message: 'I have make an offer.', type: 'text'});
                    // sendMessage({message: numericValue, type: 'make_offer'});
                  },
                },
              ],
            });
            // sendNotification({id: item?.lists_id}).then(res => {
            //   if (res?.type.includes('fulfilled')) {
            //     showAlert({
            //       title: 'Success',
            //       message: 'Notification sent succesfully.',
            //     });
            //     onCallback();
            //     // resetForm();
            //   }
            //   if (res?.type.includes('rejected')) {
            //     showAlert({
            //       title: 'Error',
            //       message: res?.payload?.message ?? 'Internal server error!',
            //     });
            //   }
            // });
          }}>
          <CustomIcon
            origin={ICON_TYPE.FEATHER_ICONS}
            name={'send'}
            color={'#00958C'}
            size={30}
          />
        </Pressable>
      </View>
    </View>
  );
}
export function FooterList() {
  return <ActivityIndicator size={20} />;
}

export function commn() {
  return (
    <View>
      <Text>commn</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  seprator: {
    borderWidth: 0.5,
    borderColor: '#00000020',
    paddingHorizontal: 10,
  },
  empty_container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },

  product: {
    // height: 100,
    width: '100%',
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 10,
    backgroundColor: '#D9D9D9',
  },
  brandtext: {
    color: '#000000',
    fontFamily: FontsConst.Cabin_Bold,
  },
  branddescriptiontext: {
    maxWidth: width * 0.75,
    color: '#717171',
    fontFamily: FontsConst.OpenSans_Regular,
  },
  price_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    color: '#00958C',
    fontFamily: FontsConst.Cabin_Bold,
    fontSize: 15,
  },
  condition: {
    color: '#00958C',
    fontFamily: FontsConst.Cabin_Regular,
    fontSize: 12,
  },
  circle: {
    height: 4,
    width: 4,
    borderRadius: 2,
    backgroundColor: '#00958C',
    marginHorizontal: 2,
  },
});
