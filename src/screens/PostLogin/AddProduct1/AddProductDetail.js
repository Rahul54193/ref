import {
  CustomIcon,
  CustomText,
  DatePicker,
  Spacer,
  SubmitButton,
} from '@app/components';
import React from 'react';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {List, TextInput, Tooltip, IconButton} from 'react-native-paper';
import DropDownWithModel from './DropDownWithModel';
import FactoryGemRow from './FactoryGemRow';
import LocationModal from './LocationModal';
import {showAlert} from '@app/helper/commonFunction';
import {LoadingStatus} from '@app/helper/strings';
import MonthYearPicker from '@app/components/MonthYearPicker';
import MonthPicker from 'react-native-month-year-picker';
import moment from 'moment';
import {FONTS, IMAGES, SPACING} from '@app/resources';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  width,
} from '@app/helper/responsiveSize';
import {Searchbar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {autoCompleteListing} from '@app/store/productSlice';
import {updateMultipleProductDetails} from '@app/store/productSlice/productState.slice';
const DIFF_MODEL = ['Rolex', 'Audemars Piguet', 'Patek Philippe'];
const AddProductDetail = ({onNextClick, ...props}) => {
  const {
    productReducer,
    productState,
    updateProductDetails,
    getAllProductModel,
    onAddProductDetail,
  } = props;
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [brandError, setBrandError] = useState(false);
  const [modelError, setModelError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [accessoriesError, setAccessoriesError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [dialError, setDialError] = useState(false);
  const [strapError, setStrapError] = useState(false);
  const [customError, setCustomError] = useState(false);
  // const [brandName, setBrandName] = useState('');
  console.log(productState?.productDetails?.no_certain, 'product+++++');

  useEffect(() => {
    if (productState?.productDetails?.brand_id) {
      getAllProductModel({id: productState?.productDetails?.brand_id});
    }
  }, [productState?.productDetails?.brand_id]);
  const sellerLocation = useSelector(
    state => state?.authReducer?.userProfileDetails?.additional_info?.location,
  );

  useEffect(() => {
    if (sellerLocation) {
      updateProductDetails({
        key: 'location',
        value: sellerLocation,
      });
    }
  }, []);
  const checkValidation = () => {
    let errorObj = {
      status: false,
      error: '',
    };
    if (!productState?.productDetails.brand_id) {
      setBrandError(true);
      errorObj = {
        status: true,
        error: 'Please select brand.',
      };
      return errorObj;
    } else if (!productState?.productDetails.model_id) {
      setModelError(true);
      errorObj = {
        status: true,
        error: 'Please select model.',
      };
      return errorObj;
    } else if (!productState?.productDetails.title) {
      setTitleError(true);
      errorObj = {
        status: true,
        error: 'Please enter title.',
      };
      return errorObj;
    } else if (
      !productState?.productDetails.dated &&
      productState?.productDetails?.no_certain === 'no'
    ) {
      setDateError(true);
      errorObj = {
        status: true,
        error: 'Please select date.',
      };
      return errorObj;
    } else if (!productState?.productDetails.accessories) {
      setAccessoriesError(true);
      errorObj = {
        status: true,
        error: 'Please select accessories.',
      };
      return errorObj;
    } else if (!productState?.productDetails.location) {
      setLocationError(true);
      errorObj = {
        status: true,
        error: 'Please enter address.',
      };
      return errorObj;
    } else if (
      DIFF_MODEL.includes(selectedBrand) &&
      !productState?.productDetails.dial
    ) {
      setDialError(true);
      errorObj = {
        status: true,
        error: 'Please select dial.',
      };
      return errorObj;
    } else if (
      DIFF_MODEL.includes(selectedBrand) &&
      !productState?.productDetails.bracelet
    ) {
      setStrapError(true);
      errorObj = {
        status: true,
        error: 'Please select bracelet.',
      };
      return errorObj;
    } else if (
      productState?.productDetails.factory_gem_set === 'Yes' &&
      productState?.productDetails?.factory_gem.length <= 0
    ) {
      errorObj = {
        status: true,
        error: 'Please select factory gem set.',
      };
      return errorObj;
    } else if (
      productState?.productDetails.factory_gem_set === 'Yes' &&
      productState?.productDetails?.factory_gem.length > 0 &&
      productState?.productDetails?.factory_gem.some(item => !item.text)
    ) {
      errorObj = {
        status: true,
        error: "Please type what's factory gem.",
      };
      return errorObj;
    } else if (
      productState?.productDetails.custom_gem_set === 'Yes' &&
      productState?.productDetails?.custom_gem.length <= 0
    ) {
      errorObj = {
        status: true,
        error: 'Please select custom.',
      };
      return errorObj;
    } else if (
      productState?.productDetails.custom_gem_set === 'Yes' &&
      productState?.productDetails?.custom_gem.length > 0 &&
      productState?.productDetails?.custom_gem.some(item => !item.text)
    ) {
      errorObj = {
        status: true,
        error: "Please type what's custom.",
      };
      return errorObj;
    } else if (
      DIFF_MODEL.includes(selectedBrand) &&
      productState?.productDetails.custom_gem_set === null
    ) {
      setCustomError(true);
      errorObj = {
        status: true,
        error: `Please select custom for ${selectedBrand} brand.`,
        //error: `Custom should be YES for ${selectedBrand} Brand.`,
      };
      return errorObj;
    } else {
      errorObj = {
        status: false,
        error: '',
      };
      return errorObj;
    }
  };

  const onProductDetailSubmit = () => {
    let errorObj = checkValidation();
    if (errorObj.status) {
      showAlert({
        title: 'Fill all required fields.',
        message: errorObj.error,
      });
    } else {
      console.log(productState?.productDetails, '--&&&&');
      onAddProductDetail({
        ...productState?.productDetails,
        dated:
          productState?.productDetails.dated === ''
            ? ''
            : moment(productState?.productDetails.dated).format('YYYY-MM-DD'),
      }).then(res => {
        if (res?.type.includes('fulfilled')) {
          onNextClick();
        } else if (res?.type.includes('rejected')) {
          showAlert({
            title: 'Server error !',
          });
        }
      });
    }
  };
  //--
  const [searchText, setSearchText] = useState('');
  const [showList, setShowList] = useState(false);
  const [parentScrollEnabled, setParentScrollEnabled] = useState(true);

  //--

  const getAutoCompleteListing = useSelector(
    state => state?.productReducer?.autoCompleteData,
  );

  const dispatch = useDispatch();
  console.log(productState.productDetails, 'product detaiuls');

  return (
    <>
      <ScrollView
        scrollEnabled={parentScrollEnabled}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container_style}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            //backgroundColor: 'red',
          }}>
          <Tooltip
            enterTouchDelay={50}
            title="Reference number for autocomplete.">
            <CustomIcon
              origin={ICON_TYPE.FEATHER_ICONS}
              name={'info'}
              size={14}
            />
          </Tooltip>
          <Searchbar
            onClearIconPress={() => {
              setParentScrollEnabled(true);
              dispatch(
                updateMultipleProductDetails({
                  brand_id: '',
                  model_id: '',
                  dial: '',
                  dial_markers: '',
                  case_size: '',
                  movement: '',
                  case_materials: '',
                  bracelet: '',
                  clasp: '',
                }),
              );
            }}
            placeholder="Reference number"
            onChangeText={text => {
              dispatch(
                autoCompleteListing({
                  ref_no: text,
                }),
              );
              setSearchText(text);
              setShowList(true);
              setParentScrollEnabled(false);
            }}
            value={searchText}
            style={{
              borderRadius: 0,
              marginLeft: 8,
              marginBottom: 0,
              marginTop: 0,
              backgroundColor: 'white',
              //height: moderateScale(50),
              flex: 0.96,
            }}
          />
        </View>
        <View style={{flexDirection: 'row', flex: 1}}>
          <View style={{flex: 0.04}} />
          <View
            style={{
              maxHeight: height * 0.3,
              marginLeft: 5,
              // marginLeft: 10,
              marginTop: 0,
              backgroundColor: 'white',
              flex: 0.96,
            }}>
            {showList && searchText.length > 0 && (
              <FlatList
                data={getAutoCompleteListing}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(
                        updateMultipleProductDetails({
                          brand_id: item.brand,
                          model_id: item.model,
                          dial: item.dial,
                          dial_markers: item.dial_markers,
                          case_size: item.case_size,
                          movement: item.movement,
                          case_materials: item.case_material,
                          bracelet: item.bracelet,
                          clasp: item.clasp,
                        }),
                      );
                      setShowList(false);
                      setParentScrollEnabled(true);
                      setSearchText(item?.reference_number);
                      setSelectedBrand(item.brand_name);
                    }}>
                    <View
                      style={{
                        // backgroundColor: 'yellow',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                        flexDirection: 'row',
                        marginBottom: moderateScaleVertical(3),
                      }}>
                      <View style={{flex: 0.5}}>
                        {item?.thumb_image_url ? (
                          <Image
                            style={{
                              height: 0.13 * height,
                              width: 0.365 * width,
                              resizeMode: 'contain',
                            }}
                            source={{
                              uri: item?.thumb_image_url,
                            }}
                          />
                        ) : null}
                      </View>
                      <View
                        style={{
                          flex: 0.6,
                          // backgroundColor: 'blue',
                          padding: moderateScale(8),
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: moderateScale(18),
                          }}>{`${
                          item?.brand_name ? item?.brand_name : 'N/A'
                        } ${'Collection'}`}</Text>
                        <Text>
                          {item?.model_name ? item?.model_name : 'N/A'}
                        </Text>
                        <Text>{`${'Dial'} :${
                          item?.dial_name ? item?.dial_name : 'N/A'
                        }`}</Text>
                        <Text>{`${'Bracelet'} :${
                          item?.bracelet_acc_name
                            ? item?.bracelet_acc_name
                            : 'N/A'
                        }`}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.id.toString()}
                ListEmptyComponent={() => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setShowList(false);
                        setParentScrollEnabled(true);
                      }}>
                      <View
                        style={{
                          // backgroundColor: 'yellow',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flex: 1,
                          flexDirection: 'row',
                          marginBottom: moderateScaleVertical(3),
                        }}>
                        <View style={{flex: 0.5}}>
                          {true ? (
                            <Image
                              style={{
                                height: 0.13 * height,
                                width: 0.3 * width,
                                resizeMode: 'contain',
                              }}
                              source={IMAGES.dummyProductImage}
                            />
                          ) : null}
                        </View>
                        <View
                          style={{
                            flex: 0.6,
                            // backgroundColor: 'blue',
                            padding: moderateScale(8),
                            justifyContent: 'center',

                            marginLeft: SPACING.SCALE__20,
                          }}>
                          <Text
                            style={{
                              fontSize: moderateScale(18),
                            }}>
                            Custom Entry
                          </Text>
                          <Text>
                            Can't find your watch? Select this option to enter
                            the watch's details manually.
                          </Text>
                          {/* <Text>{`${'Dial'} :${item?.dial_name ? item?.dial_name : 'NA'
                            }`}</Text>
                          <Text>{`${'Bracelet'} :${item?.bracelet_acc_name
                            ? item?.bracelet_acc_name
                            : 'NA'
                            }`}</Text> */}
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            )}
          </View>
        </View>
        <Spacer height={30} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <DropDownWithModel
            onClick={(item, text) => {
              updateProductDetails({
                key: 'brand_id',
                value: item?.id,
              });
              updateProductDetails({
                key: 'brand_custom',
                value: text,
              });
              updateProductDetails({key: 'model_id', value: ''});
              updateProductDetails({
                key: 'new_model',
                value: false,
              });
              setSelectedBrand(item?.name);
              setBrandError(false);
            }}
            data={productReducer?.getAllBrand}
            value={productState?.productDetails?.brand_id}
            label={'Brand'}
            isRequired={'*'}
            brandError={brandError}
            //locationError={locationError}
            whichDropDown={'brand'}
          />
          <Spacer width={SPACING.SCALE_15} />
          <DropDownWithModel
            // onClick={v => updateProductDetails({key: 'model_id', value: v?.id})}
            onClick={(item, text) => {
              updateProductDetails({
                key: 'model_id',
                value: item?.id,
              });
              updateProductDetails({
                key: 'model_custom',
                value: text,
              });
              updateProductDetails({
                key: 'new_model',
                value: item.name === 'Others' ? true : false,
              });
              setModelError(false);
            }}
            data={
              productReducer?.getAllProductModel
                ? productReducer?.getAllProductModel
                : []
            }
            value={productState?.productDetails?.model_id}
            label={'Model'}
            isRequired={'*'}
            modelError={modelError}
            whichDropDown={'model'}
          />
        </View>
        <Spacer height={30} />
        {/* <!--------------------------- Dial & Braclet-----------------------------------!/>  */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 15,
            // backgroundColor: 'red',
            marginBottom: SPACING.SCALE_15,
          }}>
          <DropDownWithModel
            dialError={dialError}
            // backgroundColor="#fff"
            label={'Dial'}
            isRequired={
              DIFF_MODEL.includes(selectedBrand) ||
              productState?.productDetails?.brand_id == 3
            }
            // onClick={v => updateProductDetails({key: 'dial', value: v?.id})}
            onClick={(item, text) => {
              updateProductDetails({
                key: 'dial',
                value: item.name === 'Others' ? text : item?.id,
              });
              setDialError(false);
            }}
            data={productReducer?.getAllProductDropdown?.DIAL ?? []}
            value={productState?.productDetails?.dial}
            whichDropDown={'Dial'}
          />
          <Spacer width={SPACING.SCALE_15} />
          <DropDownWithModel
            strapError={strapError}
            // backgroundColor="#fff"
            label={'Strap/Bracelet'}
            isRequired={
              DIFF_MODEL.includes(selectedBrand) ||
              productState?.productDetails?.brand_id == 3
            }
            // onClick={v =>
            //   updateProductDetails({key: 'bracelet', value: v?.id})
            // }
            onClick={(item, text) => {
              updateProductDetails({
                key: 'bracelet',
                value: item.name === 'Others' ? text : item?.id,
              });
              setStrapError(false);
            }}
            data={productReducer?.getAllProductDropdown?.STRAPBRACELET ?? []}
            value={productState?.productDetails?.bracelet}
            whichDropDown={'Bracelet'}
          />
        </View>

        {/* <!---------------------------//////////////// Close Dial and Bracelet---------------------!/> */}

        <Spacer height={30} />

        <>
          <CustomText style={{color: '#7C7C7C'}}>
            Title <CustomText style={{color: 'red'}}>*</CustomText>
          </CustomText>
          <TextInput
            style={{
              backgroundColor: '#F0F2FA',
              minWidth: '45%',
              marginBottom: 10,
              paddingHorizontal: 0,
              paddingLeft: titleError ? 10 : null,
              borderWidth: titleError ? 2 : null,
              borderColor: titleError ? 'red' : null,
            }}
            value={productState?.productDetails?.title}
            placeholder="Enter your title..."
            onChangeText={v => {
              updateProductDetails({key: 'title', value: v});
              setTitleError(false);
            }}
          />
          {titleError ? (
            <Text style={{color: 'red'}}>Field id required.</Text>
          ) : null}
        </>
        <Spacer height={30} />

        <>
          <CustomText style={{color: '#7C7C7C'}}>
            Watch Condition <CustomText style={{color: 'red'}}>*</CustomText>
          </CustomText>
          <Spacer height={10} />
          <View
            style={{
              flexDirection: 'row',
              // left: 0,
              // backgroundColor: 'red',
            }}>
            <SubmitButton
              lable="Brand New"
              mode={
                productState?.productDetails?.watch_condition === 'brand_new'
                  ? 'contained'
                  : 'outlined'
              }
              buttonColor={
                productState?.productDetails?.watch_condition === 'brand_new'
                  ? '#00958C'
                  : 'transparent'
              }
              onPress={() =>
                updateProductDetails({
                  key: 'watch_condition',
                  value: 'brand_new',
                })
              }
              textColor={
                productState?.productDetails?.watch_condition === 'brand_new'
                  ? 'white'
                  : '#00958C'
              }
              buttonStyle={{
                borderRadius: 50,
                height: 40,
                borderColor:
                  productState?.productDetails?.watch_condition === 'brand_new'
                    ? 'white'
                    : '#00958C',
              }}
            />
            <Spacer width={SPACING.SCALE_14} />
            <SubmitButton
              onPress={() =>
                updateProductDetails({
                  key: 'watch_condition',
                  value: 'pre_owned',
                })
              }
              lable="Pre-Owned"
              mode={
                productState?.productDetails?.watch_condition === 'pre_owned'
                  ? 'contained'
                  : 'outlined'
              }
              buttonColor={
                productState?.productDetails?.watch_condition === 'pre_owned'
                  ? '#00958C'
                  : 'transparent'
              }
              textColor={
                productState?.productDetails?.watch_condition === 'pre_owned'
                  ? 'white'
                  : '#00958C'
              }
              buttonStyle={{
                borderRadius: 50,
                height: 40,
                borderColor:
                  productState?.productDetails?.watch_condition === 'pre_owned'
                    ? 'white'
                    : '#00958C',
              }}
            />
          </View>
        </>
        <Spacer height={30} />

        <>
          <CustomText style={{color: '#7C7C7C'}}>
            Dated
            {productState?.productDetails?.no_certain === 'no' && (
              <CustomText style={{color: 'red'}}>*</CustomText>
            )}
          </CustomText>
          <Spacer height={15} />
          <View style={{flexDirection: 'row'}}>
            {/* <MonthYearPicker
            onChange={e => {
              updateProductDetails({
                key: 'dated',
                value: e,
              });
            }}
            value={productState?.productDetails?.dated}
          /> */}
            <Pressable
              onPress={() => {
                setShow(true);
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '60%',
                borderBottomWidth: 1,
                marginRight: 20,
              }}>
              <CustomText>
                {productState?.productDetails?.dated
                  ? moment(productState?.productDetails?.dated).format(
                      'MMM, YYYY',
                    )
                  : 'MM, YYYY'}
              </CustomText>
              <CustomIcon
                name={'calendar'}
                origin={ICON_TYPE.FEATHER_ICONS}
                style={{
                  paddingRight: 10,
                  marginBottom: 5,
                  color: '#000000',
                }}
                size={20}
              />
            </Pressable>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '30%',
                paddingRight: 20,
              }}>
              <Pressable
                onPress={() => {
                  updateProductDetails({
                    key: 'no_certain',
                    value:
                      productState?.productDetails?.no_certain === 'yes'
                        ? 'no'
                        : 'yes',
                  });
                  if (productState?.productDetails?.no_certain === 'no') {
                    setDateError(false);
                  }
                }}>
                <CustomIcon
                  name={
                    productState?.productDetails?.no_certain === 'yes'
                      ? 'check-box'
                      : 'check-box-outline-blank'
                  }
                  origin={ICON_TYPE.MATERIAL_ICONS}
                  style={{
                    paddingRight: 10,
                    color: '#00958C',
                  }}
                  size={20}
                />
              </Pressable>
              <CustomText>No Certain</CustomText>
            </View>
          </View>
        </>
        {dateError ? (
          <Text style={{color: 'red', marginTop: 3}}>Field is required.</Text>
        ) : null}
        <Spacer height={30} />
        <>
          <View
            style={{
              marginTop: 15,
              width: '100%',
            }}>
            <DropDownWithModel
              label={'Accessories'}
              isRequired={true}
              onClick={(item, text) => {
                updateProductDetails({
                  key: 'accessories',
                  value: item.name === 'Others' ? text : item?.id,
                });
                setAccessoriesError(false);
              }}
              data={productReducer?.getAllProductDropdown?.ACCESSORIES ?? []}
              value={productState?.productDetails?.accessories}
              accessoriesError={accessoriesError}
              whichDropDown={'accessories'}
            />
          </View>
          {/* <TextInput
          style={{
            backgroundColor: '#F0F2FA',
            minWidth: '45%',
            marginBottom: 10,
          }}
          value={productState?.productDetails?.accessories}
          placeholder="Type..."
          onChangeText={v =>
            updateProductDetails({
              key: 'accessories',
              value: v,
            })
          }
        /> */}
        </>
        <Spacer height={30} />
        <CustomText style={{color: '#7C7C7C'}}>
          Address <CustomText style={{color: 'red'}}>*</CustomText>
        </CustomText>
        {/* <Spacer height={0} /> */}
        <View
          style={{
            marginTop: 15,
            width: '100%',
            //  backgroundColor: 'red',
          }}>
          {/* <LocationModal
            lable={productState?.productDetails?.location ?? 'Choose location'}
            updateProductDetails={updateProductDetails}
            setLocationError={setLocationError}
          /> */}

          <TextInput
            style={{
              backgroundColor: '#F0F2FA',
              minWidth: '45%',
              // marginBottom: 10,
              paddingHorizontal: 0,
              paddingLeft: locationError ? 2 : null,
              borderWidth: locationError ? 2 : null,
              borderColor: locationError ? 'red' : null,
            }}
            value={productState?.productDetails?.location}
            placeholder="Enter Address..."
            onChangeText={v => {
              updateProductDetails({
                key: 'location',
                value: v,
              });
              setLocationError(false);
            }}
          />
        </View>
        {locationError ? (
          <Text style={{color: 'red'}}>Field is required.</Text>
        ) : null}
        <Spacer height={30} />

        <List.Accordion
          style={{backgroundColor: 'white'}}
          titleStyle={{
            color: 'black',
            backgroundColor: 'white',
          }}
          title="Fill in additional information">
          <View
            style={{
              backgroundColor: '#fff',
              padding: 10,
            }}>
            <View
              style={{
                position: 'relative',
              }}>
              <CustomText style={{color: '#7C7C7C'}}>
                Tell the customers about this watch
              </CustomText>
              <Spacer height={10} />
              <TextInput
                scrollEnabled={false}
                style={{
                  backgroundColor: '#fff',
                  minWidth: '45%',
                  textAlignVertical: 'top',
                  paddingBottom: 10,
                  paddingHorizontal: 0,
                }}
                maxLength={2000}
                multiline={true}
                numberOfLines={3}
                value={productState?.productDetails?.description}
                placeholder="Enter description..."
                onChangeText={v =>
                  updateProductDetails({
                    key: 'description',
                    value: v,
                  })
                }
              />
              <View
                style={{
                  position: 'absolute',
                  bottom: 5,
                  right: 5,
                }}>
                <CustomText style={{color: '#00958C'}}>
                  {productState?.productDetails?.description.length}/2000
                </CustomText>
              </View>
            </View>
            <Spacer height={30} />
            <>
              <CustomText style={{color: '#7C7C7C'}}>Gender</CustomText>
              <Spacer height={10} />
              <View
                style={{
                  // backgroundColor: 'red',
                  flexDirection: 'row',
                  // flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}>
                {[
                  {id: 1, type: 'Male', icon: 'male'},
                  {id: 2, type: 'Female', icon: 'female'},
                  {id: 3, type: 'Unisex', icon: 'male-female'},
                ].map(item => {
                  return (
                    <SubmitButton
                      key={item.id}
                      onPress={() =>
                        updateProductDetails({
                          key: 'gender_type',
                          value: item?.type,
                        })
                      }
                      icon={({size, color}) => (
                        <CustomIcon
                          name={item?.icon}
                          origin={ICON_TYPE.ICONICONS}
                          size={moderateScale(13)}
                          color={
                            item.type !==
                            productState?.productDetails?.gender_type
                              ? '#00958C'
                              : '#fff'
                          }
                        />
                      )}
                      lable={item?.type}
                      mode={
                        item.type === productState?.productDetails?.gender_type
                          ? 'contained'
                          : 'outlined'
                      }
                      buttonColor={
                        item.type === productState?.productDetails?.gender_type
                          ? '#00958C'
                          : 'transparent'
                      }
                      textColor={
                        item.type === productState?.productDetails?.gender_type
                          ? 'white'
                          : '#00958C'
                      }
                      buttonStyle={{
                        borderRadius: 50,
                        height: 40,
                        width: 100,

                        borderColor:
                          item.type ===
                          productState?.productDetails?.gender_type
                            ? 'white'
                            : '#00958C',
                      }}
                      labelStyle={{
                        fontSize: 13,
                      }}
                    />
                  );
                })}
              </View>
            </>
            <Spacer height={10} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
              }}>
              {/* <DropDownWithModel
                dialError={dialError}
                backgroundColor="#fff"
                label={'Dial'}
                isRequired={
                  DIFF_MODEL.includes(selectedBrand) ||
                  productState?.productDetails?.brand_id == 3
                }
                // onClick={v => updateProductDetails({key: 'dial', value: v?.id})}
                onClick={(item, text) => {
                  updateProductDetails({
                    key: 'dial',
                    value: item.name === 'Others' ? text : item?.id,
                  });
                  setDialError(false);
                }}
                data={productReducer?.getAllProductDropdown?.DIAL ?? []}
                value={productState?.productDetails?.dial}
                whichDropDown={'Dial'}
              />
              <Spacer width={SPACING.SCALE_15} /> */}
              <DropDownWithModel
                backgroundColor="#fff"
                label={'Dial Markers'}
                // onClick={v =>
                //   updateProductDetails({key: 'dial_markers', value: v?.id})
                // }
                onClick={(item, text) => {
                  updateProductDetails({
                    key: 'dial_markers',
                    value: item.name === 'Others' ? text : item?.id,
                  });
                }}
                data={productReducer?.getAllProductDropdown?.DIALMARKERS ?? []}
                value={productState?.productDetails?.dial_markers}
                whichDropDown={'Dial_Markers'}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
              }}>
              <DropDownWithModel
                backgroundColor="#fff"
                label={'Case Size'}
                // onClick={v =>
                //   updateProductDetails({key: 'case_size', value: v?.id})
                // }
                onClick={(item, text) => {
                  updateProductDetails({
                    key: 'case_size',
                    value: item.name === 'Others' ? text : item?.id,
                  });
                }}
                data={productReducer?.getAllProductDropdown?.CASESIZE ?? []}
                value={productState?.productDetails?.case_size}
                whichDropDown={'Case_Size'}
              />
              <Spacer width={SPACING.SCALE_15} />
              <DropDownWithModel
                backgroundColor="#fff"
                label={'Movements'}
                // onClick={v =>
                //   updateProductDetails({key: 'movement', value: v?.id})
                // }
                onClick={(item, text) => {
                  updateProductDetails({
                    key: 'movement',
                    value: item.name === 'Others' ? text : item?.id,
                  });
                }}
                data={productReducer?.getAllProductDropdown?.MOVEMENT ?? []}
                value={productState?.productDetails?.movement}
                whichDropDown={'movement'}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
              }}>
              <DropDownWithModel
                backgroundColor="#fff"
                label={'Case Material'}
                // onClick={v =>
                //   updateProductDetails({key: 'case_materials', value: v?.id})
                // }
                onClick={(item, text) => {
                  updateProductDetails({
                    key: 'case_materials',
                    value: item.name === 'Others' ? text : item?.id,
                  });
                }}
                data={productReducer?.getAllProductDropdown?.CASEMATERIAL ?? []}
                value={productState?.productDetails?.case_materials}
                whichDropDown={'case_Material'}
              />
              <Spacer width={SPACING.SCALE_15} />
              {/* <DropDownWithModel
                strapError={strapError}
                backgroundColor="#fff"
                label={'Strap/Bracelet'}
                isRequired={
                  DIFF_MODEL.includes(selectedBrand) ||
                  productState?.productDetails?.brand_id == 3
                }
                // onClick={v =>
                //   updateProductDetails({key: 'bracelet', value: v?.id})
                // }
                onClick={(item, text) => {
                  updateProductDetails({
                    key: 'bracelet',
                    value: item.name === 'Others' ? text : item?.id,
                  });
                  setStrapError(false);
                }}
                data={
                  productReducer?.getAllProductDropdown?.STRAPBRACELET ?? []
                }
                value={productState?.productDetails?.bracelet}
                whichDropDown={'Bracelet'}
              /> */}
            </View>
            <View
              style={{
                marginTop: 15,
                width: '100%',
              }}>
              <DropDownWithModel
                backgroundColor="#fff"
                label={'Clasp'}
                // onClick={v => updateProductDetails({key: 'clasp', value: v?.id})}
                onClick={(item, text) => {
                  updateProductDetails({
                    key: 'clasp',
                    value: item.name === 'Others' ? text : item?.id,
                  });
                }}
                data={productReducer?.getAllProductDropdown?.CLASP ?? []}
                value={productState?.productDetails?.clasp}
                whichDropDown={'Clasp'}
              />
            </View>

            <FactoryGemRow
              lable={'Factory Gem set ?'}
              description={"If yes,tick what's gems setted ?"}
              titleValue={productState?.productDetails?.factory_gem_set}
              descriptionValue={productState?.productDetails?.factory_gem}
              descriptionData={
                productReducer?.getAllProductDropdown?.FACTTORYGEM
              }
              type={'factory_gem'}
              onTitlePress={item => {
                updateProductDetails({
                  key: 'factory_gem_set',
                  value: item,
                });
                if (item === 'No') {
                  updateProductDetails({
                    key: 'factory_gem',
                    value: [],
                  });
                }
              }}
              onDescriptionPress={({item, text, type}) => {
                const obj = {
                  id: item.id,
                  name: item.name,
                  type: item.type,
                  text: text,
                };
                let updatedArray;
                if (type) {
                  updatedArray =
                    productState?.productDetails?.factory_gem?.filter(
                      it => it.id != item.id,
                    );
                } else {
                  updatedArray = productState?.productDetails?.factory_gem
                    ?.filter(it => it.id != item.id)
                    .concat(obj);
                }
                updateProductDetails({
                  key: 'factory_gem',
                  value: updatedArray,
                });
              }}
            />
          </View>
        </List.Accordion>
        <Spacer />
        <View
          style={{
            // backgroundColor: '#fff',
            padding: 10,
          }}>
          <FactoryGemRow
            setCustomError={setCustomError}
            isRequired={
              DIFF_MODEL.includes(selectedBrand) ||
              productState?.productDetails?.brand_id == 3
            }
            lable={'Custom ?'}
            description={"If yes,tick what's custom ?"}
            descriptionData={
              productReducer?.getAllProductDropdown?.CUSTOMFACTTORYGEM
            }
            titleValue={productState?.productDetails?.custom_gem_set}
            descriptionValue={productState?.productDetails?.custom_gem}
            type={'custom_gem'}
            onTitlePress={item => {
              updateProductDetails({
                key: 'custom_gem_set',
                value: item,
              });
              if (item === 'No') {
                updateProductDetails({
                  key: 'custom_gem',
                  value: [],
                });
              }
            }}
            onDescriptionPress={({item, text, type}) => {
              const obj = {
                id: item.id,
                name: item.name,
                type: item.type,
                text: text,
              };
              let updatedArray;
              if (type) {
                updatedArray = productState?.productDetails?.custom_gem?.filter(
                  it => it.id != item.id,
                );
              } else {
                updatedArray = productState?.productDetails?.custom_gem
                  ?.filter(it => it.id != item.id)
                  .concat(obj);
              }
              updateProductDetails({
                key: 'custom_gem',
                value: updatedArray,
              });
              setCustomError(false);
            }}
          />
          <Spacer />
          {customError && (
            <Text style={{color: 'red'}}>Field is required.</Text>
          )}
        </View>
        <Spacer />

        <Spacer height={30} />
        <SubmitButton
          onPress={onProductDetailSubmit}
          lable="Next"
          disabled={
            productReducer?.addProductDetailLoadingStatus ===
            LoadingStatus.LOADING
          }
          loading={
            productReducer?.addProductDetailLoadingStatus ===
            LoadingStatus.LOADING
          }
        />
      </ScrollView>

      {show && (
        <MonthPicker
          mode="short"
          onChange={(event, newDate) => {
            console.log('dated', newDate);
            setShow(false);
            updateProductDetails({
              key: 'dated',
              value: newDate,
            });
            setDateError(false);
          }}
          value={
            productState?.productDetails?.dated
              ? productState?.productDetails?.dated
              : date
          }
          // minimumDate={new Date(2000, 5)}
          maximumDate={new Date()}
        />
      )}
    </>
  );
};

export default AddProductDetail;

const styles = StyleSheet.create({
  container_style: {
    flexGrow: 1,
    paddingBottom: 30,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#F0F2FA',
    marginTop: SPACING.SCALE_8,
  },
});
