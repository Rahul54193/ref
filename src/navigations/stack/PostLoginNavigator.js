/* eslint-disable react/react-in-jsx-scope */
import {
  ChatDetailScreen,
  ChatScreen,
  EditProfile,
  InterestList,
  MyFavourites,
  MyProfileScreen,
  NotificationScreen,
  ProductDetails,
  ProfileSection,
  RatingAndReviews,
} from '@app/screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RoutesName } from '@app/helper/strings';
import CoinHistory from '@app/screens/PostLogin/Coin/CoinHistory/Index';
import ItemComparison from '@app/screens/PostLogin/ItemComparison';
import SearchScreen from '@app/screens/PostLogin/Searching/SearchScreen';
import MainTabNavigator from './MainTabNavigator';
import Insight from '@app/screens/PostLogin/Insight/Index';
import BoostNowIntroduction from '@app/screens/PostLogin/BoostProduct/BoostNowIntroduction';
import BoostNow from '@app/screens/PostLogin/Coin/BoostScreens/BoostNow';
import BoostProductSuccess from '@app/screens/PostLogin/BoostProductSucess';
import PurchaseCoin from '@app/screens/PostLogin/Coin/PurchaseCoin';

import ChangePassword from '@app/screens/PostLogin/ChangePassword';
import ProductHistory from '@app/screens/PostLogin/History';
import RateUser from '@app/screens/PostLogin/RatingAndReviews/RateUser';
import BuyCoins from '@app/screens/PostLogin/Coin/BuyCoins';
import AccountSetting from '@app/screens/PostLogin/AccountSetting';
import About from '@app/screens/PostLogin/About/About';
import EditProduct from '@app/screens/PostLogin/EditProduct';
import SearchUserScreen from '@app/screens/PostLogin/Searching/SearchUserScreen';
import ProfileSectionOthers from '@app/screens/PostLogin/ProfileSectionOthers';
import ChangeMobileNumber from '@app/screens/PostLogin/ChangeMobileNumber/ChangeMobileNumber';
import OtpVerification from '@app/screens/PreLogin/OtpVerification';
import OtpVerificationPost from '@app/screens/PostLogin/OtpVerificationPost';
import PriceAlertListing from '@app/screens/PostLogin/PriceAlertListing';
const Stack = createNativeStackNavigator();
const PostLoginNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={RoutesName.MAIN_TAB_NAVIGATOR}
        component={MainTabNavigator}
      />
      <Stack.Screen name={RoutesName.CHAT_LIST_SCREEN} component={ChatScreen} />
      <Stack.Screen
        name={RoutesName.CHAT_DETAIL_SCREEN}
        component={ChatDetailScreen}
      />
      <Stack.Screen
        name={RoutesName.INTERESTLIST_SCREEN}
        component={InterestList}
      />
      <Stack.Screen
        name={RoutesName.PRODUCT_DETAILS}
        component={ProductDetails}
      />
      <Stack.Screen name={RoutesName.COIN_HISTORY} component={CoinHistory} />
      <Stack.Screen
        name={RoutesName.ITEM_COMPARISON}
        component={ItemComparison}
      />
      <Stack.Screen name={RoutesName.MY_FAVOURITES} component={MyFavourites} />
      <Stack.Screen name={RoutesName.SEARCH_SCREEN} component={SearchScreen} />

      <Stack.Screen
        name={RoutesName.NOTIFICATION_SCREEN}
        component={NotificationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={RoutesName.ACCOUNT_SETTING_SCREEN}
        component={AccountSetting}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={RoutesName.UPDATE_MOBILE_NUMBER}
        component={ChangeMobileNumber}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={RoutesName.OTP_VERIFICATIONN}
        component={OtpVerificationPost}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name={RoutesName.PROFILE_SECTION_SCREEN}
        component={ProfileSectionOthers}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name={RoutesName.PORFILE_SECTION_SCREEN_OTHERS}
        component={ProfileSectionOthers}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={RoutesName.EDIT_PROFILE_SECTION_SCREEN}
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={RoutesName.VIEW_INSIGHTS}
        component={Insight}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={RoutesName.BOOST_PRODUCT_INTRODUCTION}
        component={BoostNowIntroduction}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={RoutesName.BOOST_NOW}
        component={BoostNow}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={RoutesName.BOOST_PRODUCT_SUCCESS}
        component={BoostProductSuccess}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={RoutesName.BOOST_PURCHASE_COIN}
        component={PurchaseCoin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={RoutesName.PAY_NOW}
        component={BuyCoins}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={RoutesName.CHANGE_PASSWORD_SCREEN}
        component={ChangePassword}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={RoutesName.REVIEW_RATING_SCREEN}
        component={RatingAndReviews}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={RoutesName.PRODUCT_HISTORY}
        component={ProductHistory}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={RoutesName.RATE_USER}
        component={RateUser}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={RoutesName.About_Page}
        component={About}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={RoutesName.EDIT_PRODUCT}
        component={EditProduct}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={RoutesName.SEARCH_USER}
        component={SearchUserScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={RoutesName.PROFILE_TAB}
        component={MyProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={RoutesName.PRICE_ALERT_LISTING}
        component={PriceAlertListing}
        options={{ headerShown: false }}
      />

      {/* <Stack.Screen name="PostedSuccessfully" component={PostedSuccessfully} /> */}
    </Stack.Navigator>
  );
};
export default PostLoginNavigator;
