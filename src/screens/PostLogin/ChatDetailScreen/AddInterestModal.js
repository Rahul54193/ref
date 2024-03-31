import {FontsConst} from '@app/assets/assets';
import {CustomInput, CustomText, Spacer, SubmitButton} from '@app/components';
import {showAlert} from '@app/helper/commonFunction';
import {useEffect, useState} from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import DropDownWithModel from '../AddProduct1/DropDownWithModel';
import {SPACING} from '@app/resources';

const AddInterestModal = props => {
  const {
    modalVisible,
    setModalVisible,
    authReducer,
    exploreProduct,
    route,
    productReducer,
    getAllProductModel,
    onAddDraftInteresetList,
    getIntersetList,
    getAllProductDropdownAction,
  } = props;
  const {chat_item} = route.params;

  console.log(productReducer, 'poduct reducer ++++++');

  const [brand, setBrand] = useState(null);
  const [model, setModel] = useState(null);
  const [dial, setDial] = useState('');
  const [bracelet, setBracelet] = useState('');
  const [watchCondition, setWatchCondition] = useState('brand_new');
  const [price, setPrice] = useState('');

  const handleTextChange = inputValue => {
    const numericValue = inputValue.replace(/[^0-9.]/g, '');
    const [integerPart, decimalPart] = numericValue.split('.');

    // Format the integer part with commas every three digits
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Limit the decimal part to two digits
    const formattedDecimal =
      decimalPart !== undefined ? `.${decimalPart.slice(0, 2)}` : '';

    const formattedNumber = `${formattedInteger}${formattedDecimal}`;

    // setFormattedPrice(formattedNumber);

    // You can adjust the length condition based on your requirements
    if (inputValue.length <= 11) {
      setPrice(formattedNumber);
    }
  };

  useEffect(() => {
    if (brand?.brand_id) {
      getAllProductModel({id: brand?.brand_id});
    }
  }, [brand]);

  const sellerID = exploreProduct?.productDetails?.user?.id;
  const userID =
    authReducer.userProfileDetails.id ===
    exploreProduct?.productDetails?.user?.id
      ? chat_item.user_id
      : authReducer.userProfileDetails.id;

  const isSeller =
    exploreProduct?.productDetails?.user?.id ===
    authReducer.userProfileDetails.id;
  const [brandError, setBrandError] = useState(false);
  const [modelError, setModelError] = useState(false);

  const addDraftIntersetList = () => {
    if (price === '.') {
      alert('Please enter valid price.');
      // showAlert({
      //   title: 'Alert',
      //   message: 'Please enter valid price.',
      // });
    } else {
      if (brand?.brand_id == null) {
        // setModalVisible(false);
        // showAlert({
        //   title: 'Required',
        //   message: 'Choose brand and model of watch.',
        //   // message: 'Please Fill The Blank Space ',
        // });

        setBrandError(true);
        errorObj = {
          status: true,
          error: 'Please select brand.',
        };
        return errorObj;
      }

      console.log('ModelId', model);
      console.log('BrandId', brand);
      if (model?.model_id == '') {
        setModelError(true);
        errorObj = {
          status: true,
          error: 'Please select Model.',
        };
        return errorObj;
      }
      if (brand?.brand_id && model?.model_id) {
        onAddDraftInteresetList({
          seller_id: sellerID,
          user_id: userID,
          model_id: model?.model_id,
          new_model: model?.new_model,
          brand_id: brand?.brand_id,
          new_brand: brand?.new_brand,
          dial_id: dial?.dial_id ?? '',
          bracelet_id: bracelet?.bracelet_id,
          condition: watchCondition,
          price: price,
        }).then(res => {
          if (res?.type.includes('fulfilled')) {
            getIntersetList({
              seller_id: sellerID,
              user_id: userID,
              keyword: '',
            });
            showAlert({
              title: 'success',
              message: res?.payload?.message,
            });
            setBrand(null);
            setModel(null);
            setDial(null);
            setBracelet(null);
            setPrice(null);
            setWatchCondition('brand_new');
            setModalVisible(false);
          }
        });
      } else {
        // showAlert({
        //   title: 'Alert!',
        //   message: 'Choose brand and model of watch.',
        // });
      }
    }
  };
  // console.log('brand', brand);
  // console.log('model', model);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.container}>
        <Pressable
          style={styles.backdrop}
          onPress={() => setModalVisible(!modalVisible)}
        />
        <View style={styles.card_container}>
          <View style={styles.border} />
          <CustomText style={styles.interest_text}>Add new watch</CustomText>
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingVertical: 20,
              flexGrow: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <DropDownWithModel
                label={'Choose Brand'}
                data={productReducer?.getAllBrand}
                isRequired={true}
                onClick={(item, text) => {
                  setBrand({
                    brand_id: item.name === 'Others' ? text : item?.id,
                    new_brand: item.name === 'Others' ? true : false,
                  });
                  setModel({
                    model_id: '',
                    new_model: false,
                  });
                  setBrandError(false);
                }}
                value={''}
                backgroundColor={'#fff'}
                brandError={brandError}
              />
              <DropDownWithModel
                label={'Model'}
                data={productReducer?.getAllProductModel}
                isRequired={true}
                onClick={(item, text) => {
                  setModel({
                    model_id: item.name === 'Others' ? text : item?.id,
                    new_model: item.name === 'Others' ? true : false,
                  });
                  setModelError(false);
                }}
                value={''}
                backgroundColor={'#fff'}
                modelError={modelError}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <DropDownWithModel
                backgroundColor="#fff"
                label={'Dial'}
                // isRequired={DIFF_MODEL.includes(selectedBrand)}
                // onClick={v => updateProductDetails({key: 'dial', value: v?.id})}
                onClick={(item, text) => {
                  setDial({
                    dial_id: item.name === 'Others' ? text : item?.id,
                    new_dial: item.name === 'Others' ? true : false,
                  });
                }}
                data={productReducer?.getAllProductDropdown?.DIAL ?? []}
                value={''}
              />
              <DropDownWithModel
                backgroundColor="#fff"
                label={'Strap/Bracelet'}
                //isRequired={DIFF_MODEL.includes(selectedBrand)}
                // onClick={v =>
                //   updateProductDetails({key: 'bracelet', value: v?.id})
                // }
                onClick={(item, text) => {
                  console.log(item);
                  setBracelet({
                    bracelet_id: item.name === 'Others' ? text : item?.id,
                    new_bracelet: item.name === 'Others' ? true : false,
                  });
                }}
                data={
                  productReducer?.getAllProductDropdown?.STRAPBRACELET ?? []
                }
                value={''}
              />
            </View>
            <Spacer height={SPACING.SCALE_10} />
            <View>
              <CustomInput
                label={'Price'}
                style={{
                  flexDirection: 'row',
                  // backgroundColor: 'red',
                  maxWidth: '50%',
                  minWidth: '50%',
                  paddingHorizontal: 10,
                }}
                placeholder=" Price "
                keyboardType={'numeric'}
                value={price}
                CurrencyIcon={'S$'}
                onChangeText={handleTextChange}
                // onChangeText={v => {
                //   const numericValue = v.replace(/[^0-9.]/g, match =>
                //     match === '.' ? match : '',
                //   );

                //   // Ensure there's at most one dot in the numeric value
                //   const dotCount = numericValue.split('.').length - 1;
                //   if (dotCount <= 1) {
                //     // Format the numeric value with commas every three digits
                //     const formattedNumber = numericValue.replace(
                //       /\B(?=(\d{3})+(?!\d))/g,
                //       ',',
                //     );

                //     if (v.length <= 12) {
                //       setPrice(formattedNumber);
                //     }
                //   }
                // }}
              />
            </View>

            <Spacer height={30} />

            <>
              <CustomText style={{color: '#7C7C7C'}}>
                Watch Condition{' '}
                <CustomText style={{color: 'red'}}>*</CustomText>
              </CustomText>
              <View style={{flexDirection: 'row'}}>
                <SubmitButton
                  lable="Brand New"
                  mode={
                    watchCondition === 'brand_new' ? 'contained' : 'outlined'
                  }
                  buttonColor={
                    watchCondition === 'brand_new' ? '#00958C' : 'transparent'
                  }
                  onPress={() => setWatchCondition('brand_new')}
                  textColor={
                    watchCondition === 'brand_new' ? 'white' : '#00958C'
                  }
                  buttonStyle={{
                    borderRadius: 50,
                    height: 40,
                    borderColor:
                      watchCondition === 'brand_new' ? 'white' : '#00958C',
                  }}
                />
                <SubmitButton
                  onPress={() => setWatchCondition('pre_owned')}
                  lable="Pre-Owned"
                  mode={
                    watchCondition === 'pre_owned' ? 'contained' : 'outlined'
                  }
                  buttonColor={
                    watchCondition === 'pre_owned' ? '#00958C' : 'transparent'
                  }
                  textColor={
                    watchCondition === 'pre_owned' ? 'white' : '#00958C'
                  }
                  buttonStyle={{
                    borderRadius: 50,
                    height: 40,
                    marginHorizontal: 10,
                    borderColor:
                      watchCondition === 'pre_owned' ? 'white' : '#00958C',
                  }}
                />
              </View>
            </>
            <View
              style={{
                flex: 1,
              }}
            />
            <SubmitButton
              lable="Add to interest list"
              onPress={addDraftIntersetList}
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default AddInterestModal;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#00000040',
  },
  backdrop: {
    height: '10%',
  },
  border: {
    width: 60,
    height: 3,
    backgroundColor: '#B1B1B1',
    borderRadius: 2,
    marginVertical: 10,
    alignSelf: 'center',
  },
  interest_text: {
    color: '#000000',
    fontFamily: FontsConst.Cabin_Bold,
    fontSize: 20,
    paddingHorizontal: 20,
  },
  card_container: {
    height: '90%',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 0,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  product: {
    height: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    width: '85%',
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
  listContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  flatListContainer: {
    flexGrow: 1,
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 40,
  },
  checkBoxContainer: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
});
