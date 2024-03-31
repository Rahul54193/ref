/* eslint-disable react-native/no-inline-styles */
import {CustomIcon, CustomText} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';
import React from 'react';
import {Modal, Pressable, StyleSheet, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const LocationModal = ({updateProductDetails, lable, setLocationError}) => {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <>
      <Pressable onPress={() => setIsVisible(true)}>
        <CustomText style={{color: '#7C7C7C'}}>
          What is the location of this product?{' '}
          <CustomText style={{color: 'red'}}>*</CustomText>
        </CustomText>
        <View style={{flexDirection: 'row', paddingTop: 10}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              borderBottomWidth: 1,
              borderColor: '#afb0b7',
              //backgroundColor: 'green',
            }}>
            <CustomText style={{width: '90%'}}>{lable}</CustomText>
            <CustomIcon
              name={'location-outline'}
              origin={ICON_TYPE.ICONICONS}
              style={{
                paddingRight: 10,
                color: '#00000080',
              }}
              size={25}
            />
          </View>
        </View>
      </Pressable>
      <Modal
        animationType="slide"
        transparent
        visible={isVisible}
        //   presentationStyle="pageSheet"
        onDismiss={() => setIsVisible(false)}>
        <Pressable
          style={{flex: 1, backgroundColor: '#00000030'}}
          onPress={() => setIsVisible(false)}>
          <View />
        </Pressable>
        <View
          style={{
            height: '90%',
            backgroundColor: '#ffffff',
            bottom: 0,
            paddingVertical: 20,
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingHorizontal: 20,
            }}>
            <GooglePlacesAutocomplete
              keepResultsAfterBlur={true}
              placeholder="Type a place"
              listViewDisplayed={false}
              fetchDetails={true}
              onPress={(data, details) => {
                updateProductDetails({
                  key: 'location',
                  value: data?.description,
                });
                updateProductDetails({
                  key: 'latitude',
                  value: details.geometry.location?.lat,
                });
                updateProductDetails({
                  key: 'longitude',
                  value: details.geometry.location?.lng,
                });
                setIsVisible(false);
                setLocationError(false);
              }}
              query={{key: 'AIzaSyCGz3NzE46sAz0Q7J912AJftXjdy0fOrgI'}}
              onFail={error => console.log(error)}
              onNotFound={() => console.log('no results')}
              enablePoweredByContainer={false}
              styles={{
                textInputContainer: {},
                textInput: {
                  height: 38,
                  color: '#5d5d5d',
                  fontSize: 16,
                  borderWidth: 1,
                },
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default LocationModal;

const styles = StyleSheet.create({});
