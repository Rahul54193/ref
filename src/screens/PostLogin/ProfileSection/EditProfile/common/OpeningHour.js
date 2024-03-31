import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CustomIcon, CustomInput, CustomText, Spacer} from '@app/components';
import {Switch} from 'react-native-paper';
import {ICON_TYPE} from '@app/components/CustomIcon';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {object} from 'yup';
import moment from 'moment';
import {showAlert} from '@app/helper/commonFunction';
import {SPACING} from '@app/resources';

export const OPENING_HOUR = [
  {
    lable: 'Monday',
    isEnable: 'false',
    openTime: '10:00 AM',
    closeTime: '06:00 PM',
  },
  {
    lable: 'Tuesday',
    isEnable: 'false',
    openTime: '10:00 AM',
    closeTime: '06:00 PM',
  },
  {
    lable: 'Wednesday',
    isEnable: 'false',
    openTime: '10:00 AM',
    closeTime: '06:00 PM',
  },
  {
    lable: 'Thursday',
    isEnable: 'false',
    openTime: '10:00 AM',
    closeTime: '06:00 PM',
  },
  {
    lable: 'Friday',
    isEnable: 'false',
    openTime: '10:00 AM',
    closeTime: '06:00 PM',
  },
  {
    lable: 'Saturday',
    isEnable: 'false',
    openTime: '10:00 AM',
    closeTime: '06:00 PM',
  },
  {
    lable: 'Sunday',
    isEnable: 'false',
    openTime: '10:00 AM',
    closeTime: '06:00 PM',
  },
];
const OpeningHour = ({openingHours, setOpeningHours}) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [openingTime, setOpeningTime] = useState();
  const [selectedTimeType, setSelectedTimeType] = useState('openTime');

  const openDateTimePicker = (index, type) => {
    setSelectedItemIndex(index);
    setSelectedTimeType(type);
    setOpenModal(true);
  };

  const closeModal = date => {
    const updated = () => {
      const newArr = openingHours.map(elem => {
        return {...elem}; // Use spread operator for shallow copy
      });

      if (selectedItemIndex !== null) {
        if (selectedTimeType === 'openTime') {
          newArr[selectedItemIndex].openTime = formatTime(date);
        } else if (selectedTimeType === 'closeTime') {
          const formattedDate = formatTime(date);

          // Validate that CloseTime is greater than OpenTime
          if (
            compareTimes(formattedDate, newArr[selectedItemIndex].openTime) > 0
          ) {
            newArr[selectedItemIndex].closeTime = formattedDate;
          } else {
            showAlert({
              title: 'Alert',
              message: 'Closing time must be greater than Opening time',
            });
            // alert('Closing time must be greater than Opening time ');
            // You can handle this validation error as you prefer, e.g., show an error message
            // console.error('CloseTime must be greater than OpenTime');
          }
        }
      }

      return newArr;
    };

    setOpeningHours(updated());
    setSelectedItemIndex(null);
    setOpenModal(false);
  };

  const formatTime = date => {
    return moment(date).format('hh:mm A');
  };

  // Helper function to compare times in "h:mm A" format
  const compareTimes = (time1, time2) => {
    return moment(time1, 'hh:mm A').diff(moment(time2, 'hh:mm A'));
  };

  // const closeModal = date => {
  //   const updated = () => {
  //     const newArr = openingHours.map(elem => {
  //       return Object.assign({}, elem);
  //     });
  //     if (selectedItemIndex !== null) {
  //       if (selectedTimeType === 'openTime') {
  //         newArr[selectedItemIndex].openTime = formatTime(date);
  //       } else if (selectedTimeType === 'closeTime') {
  //         newArr[selectedItemIndex].closeTime = formatTime(date);
  //       }
  //     }

  //     return newArr;
  //   };

  //   setOpeningHours(updated());

  //   setSelectedItemIndex(null);
  //   setOpenModal(false);
  // };

  // const formatTime = date => {
  //   return moment(date).format('h:mm A'); // Format as 'h:mm A' to include AM/PM
  // };

  return (
    <View
      style={{
        paddingBottom: 10,
        width: '100%',
        //  backgroundColor: 'red',
      }}>
      <View
        style={{
          flexDirection: 'row',
          //backgroundColor: 'green',
          width: '100%',
        }}>
        <View style={{width: '45%'}}>
          <Text>Set Opening Hours</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: '55%',
            // flex: 1,
            // backgroundColor: 'yellow',
            // marginHorizontal: SPACING.SCALE_13,
            // paddingLeft: SPACING.SCALE_25,
            //maxWidth: SPACING.SCALE_170,
          }}>
          <Text>Opening Time</Text>
          <Text>{'   '}</Text>
          <Text>Closing Time</Text>
        </View>
      </View>
      {openingHours.map((item, index) => {
        return (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 50,
            }}>
            <View
              style={{
                width: '35%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <CustomText>{item?.lable}</CustomText>
              <Pressable
                onPress={() => {
                  const updated = () => {
                    const newArr = openingHours.map(elem => {
                      return Object.assign({}, elem);
                    });
                    newArr[index].isEnable =
                      newArr[index].isEnable === 'true' ? 'false' : 'true';
                    if (newArr[index].isEnable === 'false') {
                      newArr[index].openTime = '10:00 AM';
                      newArr[index].closeTime = '06:00PM';
                    }
                    console.log('$$$$$$$$$$$ABC', newArr);
                    return newArr;
                  };

                  setOpeningHours(updated());
                }}>
                <CustomIcon
                  origin={ICON_TYPE.MATERIAL_ICONS}
                  name={item?.isEnable === 'true' ? 'toggle-on' : 'toggle-off'}
                  color={item?.isEnable === 'true' ? '#00958C' : '#868686'}
                  size={30}
                />
              </Pressable>
            </View>

            {/* <View
              style={{
                width: '60%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <CustomInput
                style={{
                  height: 30,
                  width: '100%',
                }}
                placeholder="--"
                keyboardType="email-address"
                returnKeyType="next"
                onChangeText={val => {
                  const updated = () => {
                    const newArr = openingHours.map(elem => {
                      return Object.assign({}, elem);
                    });
                    newArr[index].text = val;
                    return newArr;
                  };
                  setOpeningHours(updated());
                }}
                value={item?.text}
                editable={item?.isEnable === 'true'}
                maxLength={20}
              />
            </View>  */}
            {/* Opening Time Section */}

            {item?.isEnable === 'true' ? (
              <Pressable>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',

                    // backgroundColor: 'red',
                  }}>
                  <CustomText
                    onPress={() => openDateTimePicker(index, 'openTime')}>
                    {item?.openTime}
                  </CustomText>
                </View>
              </Pressable>
            ) : (
              <Text>-</Text>
            )}

            {/*   Closing Time section */}

            {item.isEnable === 'true' ? (
              <Pressable>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    // backgroundColor: 'blue',
                    paddingRight: 10,
                  }}>
                  <CustomText
                    style={{marginRight: SPACING.SCALE_25}}
                    onPress={() => openDateTimePicker(index, 'closeTime')}>
                    {item?.closeTime}
                  </CustomText>
                </View>
              </Pressable>
            ) : (
              <Text style={{marginRight: SPACING.SCALE_60}}>-</Text>
            )}

            {selectedItemIndex === index && (
              <DateTimePicker
                mode="time"
                display="spinner"
                isVisible={openModal && selectedItemIndex === index}
                onConfirm={closeModal}
                onCancel={() => {
                  setOpenModal(false);
                  setSelectedItemIndex(null);
                }}
              />
            )}
          </View>
        );
      })}
    </View>
  );
};

export default OpeningHour;

const styles = StyleSheet.create({});
