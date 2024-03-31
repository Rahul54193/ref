import {FontsConst} from '@app/assets/assets';
import {CustomText, Spacer, SubmitButton} from '@app/components';
import {showAlert} from '@app/helper/commonFunction';
import {LoadingStatus} from '@app/helper/strings';
import NavigationService from '@app/navigations/NavigationService';
import {COLORS, SPACING} from '@app/resources';
import {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {TextInput} from 'react-native-paper';

const EditProductPrice = props => {
  const {productReducer, onAddProductPrice, onNextClick} = props;

  const [price, setPrice] = useState(null);
  const numericValue =
    props?.productReducer?.getAllDataAction?.price &&
    props?.productReducer?.getAllDataAction?.price?.includes('.00')
      ? Math.round(props?.productReducer?.getAllDataAction?.price).toString()
      : props?.productReducer?.getAllDataAction?.price;

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
  const onButtonSubmit = () => {
    if (!price) {
      NavigationService.goBack();
      return;
    } else if (price && price <= 0) {
      showAlert({title: 'Amount should be greater that 0. '});
      return;
    } else {
      const numericValue = price?.replace(/[^0-9.]/g, '');
      const data = {
        price: numericValue,
        productID: props?.route?.params?.product_id,
      };
      onAddProductPrice(data).then(res => {
        if (res?.type.includes('fulfilled')) {
          onNextClick();
          NavigationService.goBack();
          showAlert({
            title: 'Product updated successfully.',
          });
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
          }}>
          {/* {props?.productReducer?.getAllDataAction?.gender_type}{' '} */}
          {props?.productReducer?.getAllDataAction?.title}
        </CustomText>
        <CustomText
          style={{
            color: '#00958C',
            fontFamily: FontsConst.OpenSans_SemiBold,
            alignSelf: 'center',
            paddingBottom: 10,
            fontSize: SPACING.SCALE_16,
          }}>
          SGD
        </CustomText>
        {/* <TextInput
          keyboardType="numeric"
          mode="flat"
          style={{
            backgroundColor: '#F0F2FA',
            alignSelf: 'center',
            minWidth: SPACING.SCALE_150,
            paddingBottom: 10,
            height: SPACING.SCALE_70,
          }}
          contentStyle={{
            alignSelf: 'center',
            fontSize: 40,
            color: '#00958C',
          }}
          value={price ?? numericValue}
          onChangeText={v => {
            const numericValue = v.replace(/[^0-9.]/g, '');

            // Format the numeric value with commas every three digits
            const formattedNumber = numericValue.replace(
              /\B(?=(\d{3})+(?!\d))/g,
              ',',
            );
            if (v.length <= 12) {
              // updateProductPrice(formattedNumber);
              setPrice(formattedNumber);
            }
          }}
        /> */}
        <TextInput
          keyboardType="numeric"
          style={{
            backgroundColor: '#F0F2FA',
            alignSelf: 'center',
            minWidth: SPACING.SCALE_150,
            //color: 'red',
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
          value={price ?? numericValue}
          // onChangeText={v => {
          //   const numericValue = v.replace(/[^0-9.]/g, '');

          //   // Format the numeric value with commas every three digits
          //   const formattedNumber = numericValue.replace(
          //     /\B(?=(\d{3})+(?!\d))/g,
          //     ',',
          //   );

          //   // console.log(price,"Price Value ====================>>>>>>>>>>>>>>")
          //   if (v.length <= 11) {
          //     //updateProductPrice(formattedNumber);
          //     setPrice(formattedNumber);
          //   }
          // }}
          //placeholder="Type here..."
          onChangeText={handleTextChange}
        />
      </View>
      <Spacer height={40} />
      <SubmitButton
        onPress={onButtonSubmit}
        lable="Update"
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

export default EditProductPrice;
