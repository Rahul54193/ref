import {ScrollView, StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState} from 'react';
import {CustomText, SubmitButton, CustomInput, Spacer} from '@app/components';
import {FontsConst} from '@app/assets/assets';
//import {TextInput} from 'react-native-paper';
import {showAlert} from '@app/helper/commonFunction';
import NavigationService from '@app/navigations/NavigationService';
import {LoadingStatus, RoutesName} from '@app/helper/strings';
import {COLORS, SPACING} from '@app/resources';

const AddProductPrice = ({onNextClick, ...props}) => {
  const {
    productReducer,
    updateProductPrice,
    productState,
    onAddProductPrice,
    resetProductState,
  } = props;
  console.log(productState?.productDetails, 'productState');

  //

  const [text, setText] = useState('');
  const [fontColor, setFontColor] = useState('black');

  const handleTextChange = (inputValue) => {
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
      updateProductPrice(formattedNumber);
    }
  };
  //

  const onButtonSubmit = () => {
    if (!productState?.productPrice) {
      showAlert({title: 'Please enter price.'});
      return;
    } else if (productState?.productPrice <= 0) {
      showAlert({title: 'Amount should be greater that 0. '});
      return;
    } else {
      const numericValue = productState?.productPrice.replace(/[^0-9.]/g, '');
      const props = {
        price: numericValue,
        productID: productState?.productDetails?.productID,
      };
      onAddProductPrice(props).then(res => {
        if (res?.type.includes('fulfilled')) {
          onNextClick();
          NavigationService.navigateAndReset(RoutesName.SUCCESS_SCREEN, {
            productID: productState?.productDetails?.productID,
          });
          resetProductState();
        } else if (res?.type.includes('rejected')) {
          showAlert({
            title: 'Server error !',
          });
        }
      });
    }
  };
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 30,
        paddingTop: 20,
        paddingHorizontal: 20,
        backgroundColor: '#F0F2FA',
      }}>
      <View>
        <CustomText
          style={{
            color: '#00958C',
            fontFamily: FontsConst.OpenSans_SemiBold,
            alignSelf: 'center',
            paddingBottom: 10,
            fontSize: SPACING.SCALE_16,
          }}>
          Set Price
        </CustomText>
        <CustomText
          style={{
            fontFamily: FontsConst.OpenSans_SemiBold,
            alignSelf: 'center',
            paddingBottom: 10,
            fontSize: SPACING.SCALE_16,
          }}>
          {/* {productState?.productDetails?.gender_type}{' '} */}
          {productState?.productDetails?.title}
        </CustomText>
        <CustomText
          style={{
            // backgroundColor: 'red',
            color: '#00958C',
            fontFamily: FontsConst.OpenSans_SemiBold,
            alignSelf: 'center',
            paddingBottom: 10,
            fontSize: SPACING.SCALE_16,
          }}>
          SGD
        </CustomText>

        <TextInput
          keyboardType="decimal-pad"
          style={{
            alignSelf: 'center',
            minWidth: SPACING.SCALE_100,
            // width: 200,
            //height: 40,
            //  borderWidth: 1,
            //borderColor: 'gray',
            //borderRadius: 5,
            // padding: 10,
            //color: COLORS.APPGREEN,
            //borderColor: 'transparent',
            fontSize: 40,
            borderBottomWidth: 2,
            borderColor: COLORS.APPGREEN,
            textAlign: 'center',
          }}
          value={productState?.productPrice}
          // onChangeText={v => {
          //   const numericValue = v.replace(/[^0-9.]/g, '');

          //   // Format the numeric value with commas every three digits
          //   const formattedNumber = numericValue.replace(
          //     /\B(?=(\d{3})+(?!\d))/g,
          //     ',',
          //   );

          //   // console.log(price,"Price Value ====================>>>>>>>>>>>>>>")
          //   if (v.length <= 11) {
          //     updateProductPrice(formattedNumber);
          //   }
          // }}
          onChangeText={handleTextChange}

          //placeholder="Type here..."
        />
      </View>
      <Spacer height={40} />
      {/* <CustomText
        style={{
          alignSelf: 'center',
          paddingVertical: 20,
          fontFamily: FontsConst.OpenSans_Regular,
          color: '#4E4E4E',
        }}>
        Get your watch listed on top{' '}
        <CustomText style={{color: '#00958C'}}>Boost Now</CustomText>
      </CustomText> */}
      <SubmitButton
        onPress={onButtonSubmit}
        lable="Post Now"
        disabled={
          productReducer?.addProductPriceLoadingStatus === LoadingStatus.LOADING
        }
        loading={
          productReducer?.addProductPriceLoadingStatus === LoadingStatus.LOADING
        }
      />
      <Spacer />
    </ScrollView>
  );
};

export default AddProductPrice;

const styles = StyleSheet.create({});
