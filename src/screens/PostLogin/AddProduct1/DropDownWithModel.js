/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {FontsConst} from '@app/assets/assets';
import {CustomIcon, CustomText, Spacer} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {addEllipsis} from '@app/helper/commonFunction';
import {SPACING} from '@app/resources';
import React, {useEffect, useState} from 'react';
import {FlatList, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';

const DropDownWithModel = ({
  data,
  label,
  isRequired,
  backgroundColor,
  onClick,
  value,
  brandError,
  modelError,
  accessoriesError,
  whichDropDown,
  dialError,
  strapError,
  OtherItem,
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [tempData, setTempData] = useState(data ?? []);
  const [searchQuery, setSearchQuery] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [otherText, setOtherText] = useState('');

  useEffect(() => {
    setTempData(data);
    if (value) {
      const tm = data.filter(it => it.id === value);
      setSelectedItem(tm[0]);
    } else if (value === '') {
      setSelectedItem(null);
    }
  }, [data, value]);

  useEffect(() => {
    if (searchQuery) {
      const d = data?.filter(item =>
        item?.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setTempData(d);
    } else {
      setTempData(data);
    }
  }, [searchQuery]);

  const renderItem = ({item, index}) => {
    return (
      <Pressable
        onPress={() => {
          setSelectedItem(item);
          setIsVisible(false);
          setSearchQuery('');
          setOtherText('');
          onClick(item, null);
        }}
        style={{
          paddingHorizontal: 10,
          height: 50,
          marginVertical: 5,
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <CustomText
          style={{
            width: '90%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {item?.name}
        </CustomText>
        <CustomIcon
          origin={ICON_TYPE.MATERIAL_ICONS}
          name={
            selectedItem?.id === item?.id
              ? 'radio-button-on'
              : 'radio-button-off'
          }
          color={'#00958C'}
          size={20}
        />
      </Pressable>
    );
  };

  const emptyComponent = ({item, index}) => {
    return (
      <View
        style={{
          // justifyContent: 'center',
          //alignItems: 'center',
          flex: 0.8,
          // backgroundColor: 'red',
          //marginBottom: 20,
          //  padd
        }}>
        {whichDropDown === 'brand' && (
          <CustomText
            style={{textAlign: 'center', fontFamily: 'OpenSans-SemiBold'}}>
            If Brand is not found in listing than please select 'Others' from
            listing than enter your Brand.
          </CustomText>
        )}
        {whichDropDown === 'model' && (
          <CustomText
            style={{textAlign: 'center', fontFamily: 'OpenSans-SemiBold'}}>
            If Model not found in listing than please select 'Others' from
            listing than enter your model.
          </CustomText>
        )}
        {whichDropDown === 'accessories' && (
          <CustomText
            style={{textAlign: 'center', fontFamily: 'OpenSans-SemiBold'}}>
            {' '}
            No Data found
          </CustomText>
        )}
        {whichDropDown === 'Dial' && (
          <CustomText
            style={{textAlign: 'center', fontFamily: 'OpenSans-SemiBold'}}>
            {' '}
            If Dial not found in listing than please select 'Others' from
            listing than enter your Dial.
          </CustomText>
        )}
        {whichDropDown === 'Dial_Markers' && (
          <CustomText
            style={{textAlign: 'center', fontFamily: 'OpenSans-SemiBold'}}>
            {' '}
            If Dial Markers not found in listing than please select 'Others'
            from listing than enter your Dial Markers.
          </CustomText>
        )}
        {whichDropDown === 'Case_Size' && (
          <CustomText
            style={{textAlign: 'center', fontFamily: 'OpenSans-SemiBold'}}>
            {' '}
            No Data found
          </CustomText>
        )}
        {whichDropDown === 'movement' && (
          <CustomText
            style={{textAlign: 'center', fontFamily: 'OpenSans-SemiBold'}}>
            {' '}
            If Movement not found in listing than please select 'Others' from
            listing than enter your Movement.
          </CustomText>
        )}
        {whichDropDown === 'case_Material' && (
          <CustomText
            style={{textAlign: 'center', fontFamily: 'OpenSans-SemiBold'}}>
            {' '}
            If Case Material not found in listing than please select 'Others'
            from listing than enter your Case Material.
          </CustomText>
        )}
        {whichDropDown === 'Bracelet' && (
          <CustomText
            style={{textAlign: 'center', fontFamily: 'OpenSans-SemiBold'}}>
            If Strap / Bracelet not found in listing than please select 'Others'
            from listing than enter your Strap / Bracelet.
          </CustomText>
        )}
        {whichDropDown === 'Clasp' && (
          <CustomText
            style={{textAlign: 'center', fontFamily: 'OpenSans-SemiBold'}}>
            {' '}
            If Clasp not found in listing than please select 'Others' from
            listing than enter your Clasp.
          </CustomText>
        )}
      </View>
    );
  };

  const headerComponent = () => {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TextInput
          scrollEnabled={false}
          mode="outlined"
          style={{
            backgroundColor: '#F0F2FA',
            minWidth: '90%',
            marginBottom: 10,
          }}
          value={searchQuery}
          placeholder="Search"
          onChangeText={v => setSearchQuery(v)}
          left={
            <TextInput.Icon
              forceTextInputFocus={false}
              icon={() => (
                <CustomIcon
                  origin={ICON_TYPE.MATERIAL_ICONS}
                  name={'search'}
                  size={25}
                  color={'#00000040'}
                />
              )}
            />
          }
        />
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        padding: 2,
      }}>
      <Pressable onPress={() => setIsVisible(true)}>
        <CustomText style={{color: '#7C7C7C'}}>
          {label}{' '}
          {isRequired ? <CustomText style={{color: 'red'}}>*</CustomText> : ''}
        </CustomText>
        <View
          style={{
            borderWidth:
              brandError ||
              modelError ||
              accessoriesError ||
              dialError ||
              strapError
                ? 2
                : null,
            borderColor:
              brandError ||
              modelError ||
              accessoriesError ||
              dialError ||
              strapError
                ? 'red'
                : null,
            borderRadius: 4,
          }}>
          <TextInput
            scrollEnabled={false}
            style={{
              paddingHorizontal: 0,
              //backgroundColor: 'red',
              backgroundColor: backgroundColor ?? '#F0F2FA',
              width: '100%',
              // marginBottom: 10,
              // marginLeft: SPACING.SCALE_5,
              paddingLeft:
                brandError ||
                modelError ||
                accessoriesError ||
                dialError ||
                strapError
                  ? 5
                  : 0,
            }}
            multiline={true}
            numberOfLines={selectedItem?.name.length > 15 ? 2 : 1}
            contentStyle={{
              color: '#000',
            }}
            value={addEllipsis(selectedItem?.name, 15)}
            //value="sdfghjdfghjdfghjdfghjdfghjdfghjfghjdfghjdfghdfghfghdfghv"
            placeholder="Search"
            disabled={true}
            right={
              <TextInput.Icon
                onPress={() => setIsVisible(true)}
                forceTextInputFocus={true}
                icon={() => (
                  <CustomIcon
                    name={'arrow-drop-down'}
                    origin={ICON_TYPE.MATERIAL_ICONS}
                    // size={20}
                  />
                )}
                // size={20}
              />
            }
            // onChangeText={v => searchText(v)}
          />
        </View>
      </Pressable>

      {selectedItem?.name === 'Others' && whichDropDown == 'brand' ? (
        <TextInput
          style={{
            backgroundColor: backgroundColor ?? '#F0F2FA',
            minWidth: '45%',
            paddingHorizontal: 0,
          }}
          value={OtherItem ?? otherText}
          placeholder="Enter..."
          onChangeText={v => {
            setOtherText(v);
            onClick(selectedItem, v);
          }}
        />
      ) : selectedItem?.name === 'Others' && whichDropDown === 'model' ? (
        <TextInput
          style={{
            backgroundColor: backgroundColor ?? '#F0F2FA',
            minWidth: '45%',
            paddingHorizontal: 0,
          }}
          value={OtherItem ?? otherText}
          placeholder="Enter..."
          onChangeText={v => {
            setOtherText(v);
            onClick(selectedItem, v);
          }}
        />
      ) : selectedItem?.name === 'Others' ? (
        <TextInput
          style={{
            backgroundColor: backgroundColor ?? '#F0F2FA',
            minWidth: '45%',
            paddingHorizontal: 0,
          }}
          value={OtherItem ?? otherText}
          placeholder="Enter..."
          onChangeText={v => {
            setOtherText(v);
            onClick(selectedItem, v);
          }}
        />
      ) : null}
      {brandError ||
      modelError ||
      accessoriesError ||
      strapError ||
      dialError ? (
        <Text style={{color: 'red'}}>Field is required.</Text>
      ) : null}

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
            paddingVertical: 10,
          }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '90%',
                paddingBottom: 20,
              }}>
              <Pressable onPress={() => setIsVisible(false)}>
                <CustomIcon
                  origin={ICON_TYPE.MATERIAL_ICONS}
                  name={'close'}
                  size={25}
                  color={'black'}
                />
              </Pressable>
              <CustomText
                style={{
                  fontFamily: FontsConst.Cabin_SemiBold,
                  fontSize: 16,
                }}>
                {label}
              </CustomText>
              <Spacer />
            </View>
            {headerComponent()}
            <FlatList
              style={{
                width: '90%',
              }}
              keyboardShouldPersistTaps={'always'}
              showsHorizontalScrollIndicator={true}
              showsVerticalScrollIndicator={true}
              data={tempData}
              renderItem={renderItem}
              ListEmptyComponent={emptyComponent}
              contentContainerStyle={{
                paddingBottom: 30,
                flexGrow: 1,
                backgroundColor: '#ffffff',
              }}
              ItemSeparatorComponent={() => (
                <View style={{backgroundColor: '#00000020', height: 1}} />
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DropDownWithModel;

const styles = StyleSheet.create({});
