import {
  CustomIcon,
  CustomText,
  KeyboardAwareView,
  Spacer,
  SubmitButton,
} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {showAlert} from '@app/helper/commonFunction';
import {LoadingStatus} from '@app/helper/strings';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import MonthPicker from 'react-native-month-year-picker';
import {List, TextInput, Searchbar} from 'react-native-paper';
import DropDownWithModel from '../AddProduct1/DropDownWithModel';
import FactoryGemRow from '../AddProduct1/FactoryGemRow';
import LocationModal from './LocationModal';
import {IMAGES, SPACING} from '@app/resources';
import {Text} from 'react-native';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  width,
} from '@app/helper/responsiveSize';
import {useDispatch, useSelector} from 'react-redux';
import {
  updateMultipleProductDetails,
  updateProductDetails,
} from '@app/store/productSlice/productState.slice';
import {autoCompleteListing} from '@app/store/productSlice';
const DIFF_MODEL = ['Rolex', 'Audemars Piguet', 'Patek Philippe'];
const EditProductDetails = props => {
  const {
    productReducer,
    getAllProductModel,
    getAllProduct,
    onNextClick,
    onAddProductDetail,
    productState,
  } = props;
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [brandError, setBrandError] = useState(false);
  const [modelError, setModelError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [accessoriesError, setAccessoriesError] = useState(false);

  const [dialError, setDialError] = useState(false);
  const [strapError, setStrapError] = useState(false);
  const [customError, setCustomError] = useState(false);

  const [locationError, setLocationError] = useState(false);
  const [Addresses, setAddresses] = useState('');
  const isFocused = useIsFocused();
  const [state, setState] = useState({
    brand_id: '',
    model_id: '',
    brand_custom: '',
    model_custom: '',
    watch_condition: 'brand_new',
    title: '',
    no_certain: 'no', //yes or no
    dated: '',
    accessories: '',
    description: '',
    gender_type: 'Male',
    dial: '',
    dial_markers: '',
    case_size: '',
    movement: '',
    case_materials: '',
    bracelet: '',
    clasp: '',
    factory_gem_set: 'No',
    factory_gem: [],
    custom_gem_set: 'No',
    custom_gem: [],
    location: '',
    latitude: '',
    longitude: '',
    productID: '',
    product_id: '',
    new_brand: false,
    new_model: false,
  });

  const {
    ACCESSORIES,
    CASEMATERIAL,
    CASESIZE,
    CLASP,
    CUSTOMFACTTORYGEM,
    DIAL,
    DIALMARKERS,
    FACTTORYGEM,
    MOVEMENT,
    STRAPBRACELET,
  } = props?.productReducer?.getAllProductDropdown;

  useEffect(() => {
    if (isFocused) {
      getAllProduct({product_id: props?.route?.params?.product_id}).then(
        res => {
          if (res?.type.includes('fulfilled')) {
            const tempData = res?.payload?.data;
            console.log('TempdataEdit', tempData);
            setState(item => {
              return {
                ...item,
                brand_id: tempData.brand_id ?? '',
                model_id: tempData?.model_id,
                watch_condition:
                  tempData.watch_condition === 'Pre-Owned'
                    ? 'pre_owned'
                    : 'brand_new',
                title: tempData?.title ?? '',
                no_certain: tempData?.no_certain ?? 'no', //yes or no
                dated: tempData?.dated ?? '',
                accessories: ACCESSORIES?.filter(
                  item => item.name == tempData.accessories,
                )[0]?.id,
                description: tempData.description ?? '',
                gender_type: tempData?.gender_type ?? 'Male',
                dial: DIAL?.filter(item => item.name == tempData.dial)[0]?.id,
                dial_markers: DIALMARKERS?.filter(
                  item => item.name == tempData.dial_markers,
                )[0]?.id,
                case_size: CASESIZE?.filter(
                  item => item.name == tempData.case_size,
                )[0]?.id,
                movement: MOVEMENT?.filter(
                  item => item.name == tempData.movement,
                )[0]?.id,
                case_materials: CASEMATERIAL?.filter(
                  item => item.id == tempData.case_materials,
                )[0]?.id,
                bracelet: STRAPBRACELET?.filter(
                  item => item.id == tempData.bracelet,
                )[0]?.id,
                clasp: CLASP?.filter(item => item.id == tempData.clasp)[0]?.id,
                factory_gem_set: tempData?.factory_gem_set ?? 'No',
                factory_gem:
                  tempData?.factory_gem_set_data?.map(item => {
                    const obj = {
                      id: FACTTORYGEM?.filter(
                        fg => fg.name == item.gem_position,
                      )[0]?.id,
                      name: item.gem_position,
                      type: 'FACTTORYGEM',
                      text: item.value,
                    };
                    return obj;
                  }) ?? [],
                custom_gem_set: tempData?.custom_gem_set ?? 'No',
                custom_gem:
                  tempData?.custom_gem_set_data?.map(item => {
                    const obj = {
                      id: CUSTOMFACTTORYGEM?.filter(
                        fg => fg.name == item.gem_position,
                      )[0]?.id,
                      name: item.gem_position,
                      type: 'CUSTOMFACTTORYGEM',
                      text: item.value,
                    };
                    return obj;
                  }) ?? [],
                location: tempData?.location ?? '',
                latitude: tempData?.latitude ?? '',
                longitude: tempData?.longitude ?? '',
                product_id: tempData?.id,
                productID: tempData?.id,
                brand_custom: tempData?.brand_custom,
                model_custom: tempData?.model_custom,
              };
            });
            setIsLoading(false);
          }
        },
      );
    }
  }, [isFocused]);

  useEffect(() => {
    if (state?.brand_id) {
      getAllProductModel({id: state?.brand_id});
    }
  }, [state?.brand_id]);

  const checkValidation = () => {
    let errorObj = {
      status: false,
      error: '',
    };
    if (!state.brand_id) {
      errorObj = {
        status: true,
        error: 'Please select brand.',
      };
      setBrandError(true);
      return errorObj;
    } else if (!state.model_id) {
      errorObj = {
        status: true,
        error: 'Please select model.',
      };
      setModelError(true);
      return errorObj;
    } else if (!state.title) {
      errorObj = {
        status: true,
        error: 'Please enter title.',
      };
      setTitleError(true);
      return errorObj;
    } else if (!state.dated && state.no_certain === 'no') {
      errorObj = {
        status: true,
        error: 'Please select date.',
      };
      setDateError(true);
      return errorObj;
    } else if (!state.accessories) {
      errorObj = {
        status: true,
        error: 'Please select accessories.',
      };
      setAccessoriesError(true);
      return errorObj;
    } else if (!state.location) {
      errorObj = {
        status: true,
        error: 'Please enter address.',
      };
      setLocationError(true);
      return errorObj;
    } else if (DIFF_MODEL.includes(selectedBrand) && !state.dial) {
      errorObj = {
        status: true,
        error: 'Please select dial.',
      };
      setDialError(true);
      return errorObj;
    } else if (DIFF_MODEL.includes(selectedBrand) && !state.bracelet) {
      errorObj = {
        status: true,
        error: 'Please select bracelet.',
      };
      setStrapError(true);
      return errorObj;
    } else if (
      state.factory_gem_set === 'Yes' &&
      state?.factory_gem.length <= 0
    ) {
      errorObj = {
        status: true,
        error: 'Please select factory gem set.',
      };
      return errorObj;
    } else if (
      state.factory_gem_set === 'Yes' &&
      state?.factory_gem.length > 0 &&
      state?.factory_gem.some(item => !item.text)
    ) {
      errorObj = {
        status: true,
        error: "Please type what's factory gem.",
      };
      return errorObj;
    } else if (
      state.custom_gem_set === 'Yes' &&
      state?.custom_gem.length <= 0
    ) {
      errorObj = {
        status: true,
        error: 'Please select custom.',
      };
      setCustomError(true);
      return errorObj;
    } else if (
      state.custom_gem_set === 'Yes' &&
      state?.custom_gem.length > 0 &&
      state?.custom_gem.some(item => !item.text)
    ) {
      errorObj = {
        status: true,
        error: "Please type what's custom.",
      };
      return errorObj;
    } else if (
      DIFF_MODEL.includes(selectedBrand) &&
      state?.custom_gem_set === 'No'
    ) {
      errorObj = {
        status: true,
        error: 'Please select custom.',
      };
      setCustomError(true);
      return errorObj;
    } else {
      errorObj = {
        status: false,
        error: '',
      };
      return errorObj;
    }
  };
  console.log(state, 'state for api');

  const onProductDetailSubmit = item => {
    let errorObj = checkValidation();
    if (errorObj.status) {
      showAlert({
        title: 'Fill all required fields.',
        message: errorObj.error,
      });
    } else {
      console.log(state, 'state for api');
      onAddProductDetail({
        ...state,
        dated: state?.dated ? moment(state.dated).format('YYYY-MM-DD') : '',
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
  const [searchText, setSearchText] = useState('');
  const [showList, setShowList] = useState(false);
  const [parentScrollEnabled, setParentScrollEnabled] = useState(true);
  const getAutoCompleteListing = useSelector(
    state => state?.productReducer?.autoCompleteData,
  );
  const dispatch = useDispatch();
  return isLoading ? (
    <ActivityIndicator />
  ) : (
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
            flex: 1,
            //backgroundColor: 'red',
          }}>
          <Pressable
            onPress={() => {
              showAlert({
                message: 'Reference for Autocomplete.',
              });
            }}
            style={{flex: 0.04}}>
            <CustomIcon
              origin={ICON_TYPE.FEATHER_ICONS}
              name={'info'}
              size={14}
            />
          </Pressable>
          <Searchbar
            onClearIconPress={() => {
              setParentScrollEnabled(true);
              setState(prevState => ({
                ...prevState, // spread the previous state to keep its values
                brand_id: '',
                model_id: '',
                dial: '',
                dial_markers: '',
                case_size: '',
                movement: '',
                case_materials: '',
                bracelet: '',
                clasp: '',
              }));
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
              marginLeft: 5,
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
                      setShowList(false);
                      setParentScrollEnabled(true);
                      setSearchText(item?.reference_number);
                      setState(prevState => ({
                        ...prevState, // spread the previous state to keep its values
                        brand_id: item.brand,
                        model_id: item.model,
                        dial: item.dial,
                        dial_markers: item.dial_markers,
                        case_size: item.case_size,
                        movement: item.movement,
                        case_materials: item.case_material,
                        bracelet: item.bracelet,
                        clasp: item.clasp,
                      }));
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
                          item?.brand_name ? item?.brand_name : 'NA'
                        } ${'Collection'}`}</Text>
                        <Text>
                          {item?.model_name ? item?.model_name : 'NA'}
                        </Text>
                        <Text>{`${'Dial'} :${
                          item?.dial_name ? item?.dial_name : 'NA'
                        }`}</Text>
                        <Text>{`${'Bracelet'} :${
                          item?.bracelet_acc_name
                            ? item?.bracelet_acc_name
                            : 'NA'
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
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <DropDownWithModel
            onClick={(item, text) => {
              setState(data => {
                return {
                  ...data,
                  brand_id: item?.id,
                  brand_custom: text,
                  new_brand: item.name === 'Others' ? true : false,
                  model_id: '',
                  new_model: false,
                };
              });
              setBrandError(false);
              setSelectedBrand(item?.name);
            }}
            data={productReducer?.getAllBrand}
            value={state?.brand_id}
            label={'Brand'}
            isRequired={'*'}
            OtherItem={state?.brand_custom}
            whichDropDown={'brand'}
            brandError={brandError}
          />
          <Spacer width={SPACING.SCALE_15} />
          <DropDownWithModel
            onClick={(item, text) => {
              setState(data => {
                return {
                  ...data,
                  model_id: item?.id,
                  model_custom: text,
                  new_model: item.name === 'Others' ? true : false,
                };
              });
              setModelError(false);
            }}
            data={props?.productReducer?.getAllProductModel ?? []}
            value={state?.model_id}
            label={'Model'}
            isRequired={'*'}
            OtherItem={state?.model_custom}
            whichDropDown={'model'}
            modelError={modelError}
          />
        </View>
        <Spacer height={30} />
        {/* <!--------------------------- Dial & Braclet-----------------------------------!/>  */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 15,
            marginBottom: SPACING.SCALE_15,
          }}>
          <DropDownWithModel
            // backgroundColor="#fff"
            label={'Dial'}
            isRequired={
              DIFF_MODEL.includes(selectedBrand) ||
              productState?.productDetails?.brand_id == 3
            }
            onClick={(item, text) => {
              setState(data => {
                return {
                  ...data,
                  dial: item.name === 'Others' ? text : item?.id,
                };
              });

              setDialError(false);
            }}
            data={DIAL ?? []}
            value={state.dial}
            dialError={dialError}
          />
          <Spacer width={SPACING.SCALE_15} />
          <DropDownWithModel
            // backgroundColor="#fff"
            label={'Strap/Bracelet'}
            isRequired={
              DIFF_MODEL.includes(selectedBrand) ||
              productState?.productDetails?.brand_id == 3
            }
            onClick={(item, text) => {
              setState(data => {
                return {
                  ...data,
                  bracelet: item.name === 'Others' ? text : item?.id,
                };
              });
              setStrapError(false);
            }}
            data={STRAPBRACELET ?? []}
            value={state.bracelet}
            strapError={strapError}
          />
        </View>

        {/* <!---------------------------//////////////// Close Dial and Bracelet---------------------!/> */}

        <Spacer height={30} />

        <>
          <CustomText style={{color: '#7C7C7C'}}>
            Title <CustomText style={{color: 'red'}}>*</CustomText>
          </CustomText>
          <TextInput
            scrollEnabled={false}
            style={{
              backgroundColor: '#F0F2FA',
              minWidth: '45%',
              marginBottom: 10,
              paddingHorizontal: 0,
              borderWidth: titleError ? 2 : null,
              borderColor: titleError ? 'red' : null,
              paddingLeft: titleError ? 10 : 0,
            }}
            value={state?.title}
            placeholder="Enter your title..."
            onChangeText={v => {
              setState(data => {
                return {
                  ...data,
                  title: v,
                };
              });

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
          <Spacer width={SPACING.SCALE_10} />
          <View style={{flexDirection: 'row'}}>
            <SubmitButton
              lable="Brand New"
              mode={
                state?.watch_condition === 'brand_new'
                  ? 'contained'
                  : 'outlined'
              }
              buttonColor={
                state?.watch_condition === 'brand_new'
                  ? '#00958C'
                  : 'transparent'
              }
              onPress={() => {
                setState(data => {
                  return {
                    ...data,
                    watch_condition: 'brand_new',
                  };
                });
              }}
              textColor={
                state?.watch_condition === 'brand_new' ? 'white' : '#00958C'
              }
              buttonStyle={{
                borderRadius: 50,
                height: 40,
                borderColor:
                  state?.watch_condition === 'brand_new' ? 'white' : '#00958C',
              }}
            />
            <Spacer width={14} />
            <SubmitButton
              onPress={() => {
                setState(data => {
                  return {
                    ...data,
                    watch_condition: 'pre_owned',
                  };
                });
              }}
              lable="Pre-Owned"
              mode={
                state?.watch_condition === 'pre_owned'
                  ? 'contained'
                  : 'outlined'
              }
              buttonColor={
                state?.watch_condition === 'pre_owned'
                  ? '#00958C'
                  : 'transparent'
              }
              textColor={
                state?.watch_condition === 'pre_owned' ? 'white' : '#00958C'
              }
              buttonStyle={{
                borderRadius: 50,
                height: 40,
                borderColor:
                  state?.watch_condition === 'pre_owned' ? 'white' : '#00958C',
              }}
            />
          </View>
        </>
        <Spacer height={30} />

        <>
          <CustomText style={{color: '#7C7C7C'}}>
            Dated
            {state?.no_certain === 'no' && (
              <CustomText style={{color: 'red'}}>*</CustomText>
            )}
          </CustomText>
          <Spacer width={SPACING.SCALE_10} />
          <View style={{flexDirection: 'row'}}>
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
                {state?.dated
                  ? moment(state?.dated).format('MMM, YYYY')
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
                  setState(data => {
                    return {
                      ...data,
                      no_certain: state?.no_certain === 'yes' ? 'no' : 'yes',
                    };
                  });
                  if (state?.no_certain === 'no') {
                    setDateError(false);
                  }
                }}>
                <CustomIcon
                  name={
                    state?.no_certain === 'yes'
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
          {dateError ? (
            <Text style={{color: 'red'}}>Field is required.</Text>
          ) : null}
        </>
        <Spacer height={20} />

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
                setState(data => {
                  return {
                    ...data,
                    accessories: item.name === 'Others' ? text : item?.id,
                  };
                });
                setAccessoriesError(false);
              }}
              data={ACCESSORIES ?? []}
              value={state?.accessories}
              accessoriesError={accessoriesError}
            />
          </View>
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

          {/* <TextInput
            style={{
              backgroundColor: '#F0F2FA',
              minWidth: '45%',
              // marginBottom: 10,
              paddingHorizontal: 0,
              borderWidth: locationError ? 2 : null,
              borderColor: locationError ? 'red' : null,
            }}
            value={Addresses}
            placeholder="Enter Address..."
            onChangeText={v => {
              setState(data => {
                return {
                  ...data,
                  location: v,
                };
              });
              setLocationError(false);
            }}
          /> */}
          <TextInput
            scrollEnabled={false}
            style={{
              backgroundColor: '#F0F2FA',
              minWidth: '45%',
              marginBottom: 10,
              paddingHorizontal: 0,
              borderWidth: locationError ? 2 : null,
              borderColor: locationError ? 'red' : null,
              paddingLeft: locationError ? 2 : null,
            }}
            value={state?.location}
            placeholder="Enter Address"
            onChangeText={v => {
              setState(data => {
                return {
                  ...data,
                  location: v,
                };
              });
              setLocationError(false);
            }}
          />
        </View>
        {locationError ? (
          <Text style={{color: 'red'}}>Field is required.</Text>
        ) : null}
        <Spacer height={20} />

        <List.Accordion
          title="Fill in additional information"
          style={{backgroundColor: 'white'}}>
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
                value={state?.description}
                placeholder="Enter description..."
                onChangeText={v => {
                  setState(data => {
                    return {
                      ...data,
                      description: v,
                    };
                  });
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  bottom: 5,
                  right: 5,
                }}>
                <CustomText style={{color: '#00958C'}}>
                  {state?.description?.length}/2000
                </CustomText>
              </View>
            </View>
            <Spacer height={30} />
            <>
              <CustomText style={{color: '#7C7C7C'}}>Gender</CustomText>
              <Spacer width={SPACING.SCALE_10} />
              <View
                style={{
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
                      onPress={() => {
                        setState(data => {
                          return {
                            ...data,
                            gender_type: item?.type,
                          };
                        });
                      }}
                      icon={({size, color}) => (
                        <CustomIcon
                          name={item?.icon}
                          origin={ICON_TYPE.ICONICONS}
                          size={13}
                          color={
                            item.type !== state?.gender_type
                              ? '#00958C'
                              : '#fff'
                          }
                        />
                      )}
                      lable={item?.type}
                      mode={
                        item.type === state?.gender_type
                          ? 'contained'
                          : 'outlined'
                      }
                      buttonColor={
                        item.type === state?.gender_type
                          ? '#00958C'
                          : 'transparent'
                      }
                      textColor={
                        item.type === state?.gender_type ? 'white' : '#00958C'
                      }
                      buttonStyle={{
                        borderRadius: 50,
                        height: 40,
                        width: 100,

                        borderColor:
                          item.type === state?.gender_type
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
                backgroundColor="#fff"
                label={'Dial'}
                isRequired={
                  DIFF_MODEL.includes(selectedBrand) ||
                  productState?.productDetails?.brand_id == 3
                }
                onClick={(item, text) => {
                  setState(data => {
                    return {
                      ...data,
                      dial: item.name === 'Others' ? text : item?.id,
                    };
                  });

                  setDialError(false);
                }}
                data={DIAL ?? []}
                value={state.dial}
                dialError={dialError}
              /> */}
              <Spacer width={SPACING.SCALE_15} />
              <DropDownWithModel
                backgroundColor="#fff"
                label={'Dial Markers'}
                onClick={(item, text) => {
                  setState(data => {
                    return {
                      ...data,
                      dial_markers: item.name === 'Others' ? text : item?.id,
                    };
                  });
                }}
                data={DIALMARKERS ?? []}
                value={state.dial_markers}
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
                onClick={(item, text) => {
                  setState(data => {
                    return {
                      ...data,
                      case_size: item.name === 'Others' ? text : item?.id,
                    };
                  });
                }}
                data={CASESIZE ?? []}
                value={state.case_size}
              />
              <Spacer width={SPACING.SCALE_15} />
              <DropDownWithModel
                backgroundColor="#fff"
                label={'Movements'}
                onClick={(item, text) => {
                  setState(data => {
                    return {
                      ...data,
                      movement: item.name === 'Others' ? text : item?.id,
                    };
                  });
                }}
                data={MOVEMENT ?? []}
                value={state.movement}
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
                onClick={(item, text) => {
                  setState(data => {
                    return {
                      ...data,
                      case_materials: item.name === 'Others' ? text : item?.id,
                    };
                  });
                }}
                data={CASEMATERIAL ?? []}
                value={state.case_materials}
              />
              <Spacer width={SPACING.SCALE_15} />
              {/* <DropDownWithModel
                backgroundColor="#fff"
                label={'Strap/Bracelet'}
                isRequired={
                  DIFF_MODEL.includes(selectedBrand) ||
                  productState?.productDetails?.brand_id == 3
                }
                onClick={(item, text) => {
                  setState(data => {
                    return {
                      ...data,
                      bracelet: item.name === 'Others' ? text : item?.id,
                    };
                  });
                  setStrapError(false);
                }}
                data={STRAPBRACELET ?? []}
                value={state.bracelet}
                strapError={strapError}
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
                onClick={(item, text) => {
                  setState(data => {
                    return {
                      ...data,
                      clasp: item.name === 'Others' ? text : item?.id,
                    };
                  });
                }}
                data={CLASP ?? []}
                value={state.clasp}
              />
            </View>

            <FactoryGemRow
              lable={'Factory Gem set ?'}
              description={"If yes,tick what's gems setted ?"}
              titleValue={state?.factory_gem_set}
              descriptionValue={state?.factory_gem}
              descriptionData={
                props?.productReducer?.getAllProductDropdown?.FACTTORYGEM
              }
              type={'factory_gem'}
              onTitlePress={item => {
                setState(data => {
                  return {
                    ...data,
                    factory_gem_set: item,
                  };
                });
                if (item === 'No') {
                  setState(data => {
                    return {
                      ...data,
                      factory_gem: [],
                    };
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
                  updatedArray = state?.factory_gem?.filter(
                    it => it.id != item.id,
                  );
                } else {
                  updatedArray = state?.factory_gem
                    ?.filter(it => it.id != item.id)
                    .concat(obj);
                }
                setState(data => {
                  return {
                    ...data,
                    factory_gem: updatedArray,
                  };
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
            isRequired={DIFF_MODEL.includes(selectedBrand)}
            lable={'Custom ?'}
            description={"If yes,tick what's custom ?"}
            descriptionData={
              props?.productReducer?.getAllProductDropdown?.CUSTOMFACTTORYGEM
            }
            titleValue={state?.custom_gem_set}
            descriptionValue={state?.custom_gem}
            type={'custom_gem'}
            onTitlePress={item => {
              setState(data => {
                return {
                  ...data,
                  custom_gem_set: item,
                };
              });

              if (item === 'No') {
                setState(data => {
                  return {
                    ...data,
                    custom_gem: [],
                  };
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
                updatedArray = state?.custom_gem?.filter(
                  it => it.id != item.id,
                );
              } else {
                updatedArray = state?.custom_gem
                  ?.filter(it => it.id != item.id)
                  .concat(obj);
              }
              setState(data => {
                return {
                  ...data,
                  custom_gem: updatedArray,
                };
                setCustomError(false);
              });
            }}
          />
          {customError ? (
            <Text style={{color: 'red'}}>Field is required.</Text>
          ) : null}
        </View>
        <Spacer />
        {/* <View
              style={{
                marginTop: 15,
                width: '100%',
              }}>
              <LocationModal
                lable={state?.location ?? 'Choose location'}
                setState={setState}
              />
            </View> */}

        <Spacer height={30} />

        <Spacer height={30} />
        <SubmitButton
          onPress={() => onProductDetailSubmit(state)}
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
            setShow(false);
            setState({...state, dated: newDate});
            setDateError(false);
          }}
          value={state.dated ? new Date(state?.dated) : date}
          minimumDate={new Date(2000, 5)}
          maximumDate={new Date()}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container_style: {
    flexGrow: 1,
    paddingBottom: 30,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#F0F2FA',
    marginTop: 10,
  },
});

export default EditProductDetails;
