import {useEffect, useRef} from 'react';
import {StyleSheet} from 'react-native';
import branch from 'react-native-branch';
import {useNavigation} from '@react-navigation/native';

const DeepLinkng = ({isAuth}) => {
  const navigation = useNavigation();
  const unsubscribe = useRef();
  useEffect(() => {
    const getDeepLink = async () => {
      // Listener
      unsubscribe.current = branch.subscribe({
        onOpenStart: ({uri, cachedInitialEvent}) => {
          console.log(
            'subscribe onOpenStart, will open ' +
              uri +
              ' cachedInitialEvent is ' +
              cachedInitialEvent,
          );
        },
        onOpenComplete: ({error, params, uri}) => {
          if (error) {
            console.error(
              'subscribe onOpenComplete, Error from opening uri: ' +
                uri +
                ' error: ' +
                error,
            );
            return;
          }
          if (params) {
            console.log('Params', params);
            if (!params['+clicked_branch_link']) {
              if (params['+non_branch_link']) {
                console.log('non_branch_link: ' + uri);
                // Route based on non-Branch links
                return;
              }
            } else {
              console.log('Clicked from link', params?.productID, isAuth);
              // Handle params
              let deepLinkPath = params.$deeplink_path;
              let canonicalUrl = params.$canonical_url;
              // Route based on Branch link data
              if (params?.productID) {
                navigation.navigate('ProductDetails', {
                  product_id: params.productID,
                });
              }
              return;
            }
          }
        },
      });

      let latestParams = await branch.getLatestReferringParams(); // Params from last open
      console.log('latestParams', latestParams);
      let installParams = await branch.getFirstReferringParams(); // Params from original install
      console.log('installParams', installParams);
    };

    getDeepLink();

    return () => {
      if (unsubscribe.current) {
        console.log('Branch unsubscribe');
        unsubscribe.current();
        unsubscribe.current = null;
      }
    };
  }, []);
  return null;
};

export default DeepLinkng;

const styles = StyleSheet.create({});
