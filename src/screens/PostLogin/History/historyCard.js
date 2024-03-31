import {FontsConst} from '@app/assets/assets';
import {CustomIcon, CustomText, Custombutton, Spacer} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {RoutesName} from '@app/helper/strings';
import NavigationService from '@app/navigations/NavigationService';
import {COLORS, SPACING} from '@app/resources';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ActivityIndicator, Avatar} from 'react-native-paper';
import { useSelector } from 'react-redux';
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

export function RenderItem({item, index, loginUserId}) {
  const onRowClick = () => {
    //
  };

  
 
  const sellerName = item?.seller?.name;
  const profilePic = item?.seller?.image;
  const user_Data = item?.seller;
  const price = item?.product?.price;
  const productList = item?.product?.title;
  const watch_condition = item?.product?.watch_condition;
  const soldBY= item?.seller?.id == loginUserId ? "Sold":"Purchased";
  console.log(loginUserId, 'Item==================');
  console.log(user_Data, 'userDataRate');
  return (
    <Pressable onPress={onRowClick} style={styles.product}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Avatar.Image size={30} source={{uri: profilePic}} />
        <Spacer width={10} />
        <View style={{flexDirection:'row', justifyContent:'space-between', flex:1}}>
        <CustomText style={styles.brandtext}>{sellerName}</CustomText>
       <View style={{backgroundColor: soldBY == "Purchased" ? 'green':'red', height: 30,
            width: 100,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center', }}>
       <CustomText style={{fontFamily: 'OpenSans-SemiBold', color: 'white'}}>
      {soldBY}
      </CustomText>
       </View>
        </View>
      </View>
      <CustomText style={styles.branddescriptiontext}>{productList}</CustomText>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}>
        <View style={styles.price_row}>
          <CustomText style={styles.price}>${price}</CustomText>
          <View style={styles.circle} />
          <CustomText style={styles.condition}>
            {watch_condition === 'brand_new' ? 'Brand new' : 'Pre Owned'}
          </CustomText>
        </View>
        {/* <Custombutton
                    title={'Get Started'}
                    width={'20%'}
                    fontSize={SPACING.SCALE_20}
                    onPress={() => {
                        // if (props?.route?.params?.product_id) {
                        //     props?.navigation?.navigate(
                        //         isCoins ? RoutesName.BOOST_NOW : RoutesName.BOOST_PURCHASE_COIN,
                        //         {
                        //             product_id: props?.route?.params?.product_id,
                        //         },
                        //     );
                        // }
                    }}
                /> */}
        <TouchableOpacity
          onPress={() => {
            NavigationService.navigate(RoutesName.RATE_USER, {
              userData: user_Data,
              product_id: item?.product?.id,
            });
          }}
          style={{
            height: 30,
            width: 100,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.APPGREEN,
          }}>
          <Text style={{fontFamily: 'OpenSans-SemiBold', color: 'white'}}>
            {item?.isRated ? 'View Rating' : 'Rate User'}
          </Text>
        </TouchableOpacity>
      </View>
    </Pressable>
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
    fontSize: 15,
  },
  branddescriptiontext: {
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
