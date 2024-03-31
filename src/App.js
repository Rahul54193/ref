import {AlertBox} from 'react-native-alertbox';
// import SplashScreen from 'react-native-splash-screen';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {SplashScreen as CustomSplash} from './screens';
import store from './store';
import {NotificationController} from './services/NotificationController';
import {
  initConnection,
  purchaseErrorListener,
  purchaseUpdatedListener,
  flushFailedPurchasesCachedAsPendingAndroid,
  finishTransaction,
} from 'react-native-iap';
import notifee from '@notifee/react-native';
import {useEffect} from 'react';

const App = () => {
  let purchaseUpdateSubscription = null;
  let purchaseErrorSubscription = null;

  useEffect(() => {
    notifee.setBadgeCount(0).then(() => console.log('Badge count removed'));
    const fetchData = async () => {
      try {
        await initConnection();

        await flushFailedPurchasesCachedAsPendingAndroid();
      } catch (error) {
        console.log(error);
        // Handle any errors here, if needed
      }
    };

    fetchData();

    purchaseUpdateSubscription = purchaseUpdatedListener(purchase => {
      console.log('purchaseUpdatedListener--->>>>', purchase);
      const receipt = purchase.transactionReceipt;

      if (receipt) {
        console.log(receipt, 'receipt------<<<<<');
        // yourAPI
        //   .deliverOrDownloadFancyInAppPurchase(purchase.transactionReceipt)
        //   .then(async deliveryResult => {
        //     if (isSuccess(deliveryResult)) {
        //       // Tell the store that you have delivered what has been paid for.
        //       // Failure to do this will result in the purchase being refunded on Android and
        //       // the purchase event will reappear on every relaunch of the app until you succeed
        //       // in doing the below. It will also be impossible for the user to purchase consumables
        //       // again until you do this.
        //       // If consumable (can be purchased again)
        //       await finishTransaction({purchase, isConsumable: true});
        //       // If not consumable
        //       await finishTransaction({purchase, isConsumable: false});
        //     } else {
        //       // Retry / conclude the purchase is fraudulent, etc...
        //     }
        //   });
      }
    });

    purchaseErrorSubscription = purchaseErrorListener(error => {
      console.warn('purchaseErrorListener', error);
    });

    return () => {
      if (purchaseUpdateSubscription) {
        purchaseUpdateSubscription.remove();
      }

      if (purchaseErrorSubscription) {
        purchaseErrorSubscription.remove();
      }
    };
  }, []);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <PaperProvider theme={'light'}>
        <Provider store={store}>
          <StatusBar
            barStyle="dark-content"

            // backgroundColor={'#00958C'}
          />
          <CustomSplash />
          <AlertBox />
        </Provider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
};

export default App;
