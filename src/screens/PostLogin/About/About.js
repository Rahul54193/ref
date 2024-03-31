import {BackHeader, Container, Spacer} from '@app/components';
import {LoadingStatus} from '@app/helper/strings';
import PageTitle from '@app/screens/atoms/PageTitle';
import {aboutListingAction} from '@app/store/ratingReviewSlice';
import {useEffect, useMemo} from 'react';
import {Dimensions, View} from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';
import {connect} from 'react-redux';

const About = props => {
  const {getAbout, ratingReviewReducer, authReducer} = props;

  useEffect(() => {
    getAbout({key: 'about-us'});
  }, []);

  const Data = props?.ratingReviewReducer?.aboutListingAction?.data;

  const wrappedContent = useMemo(
    () =>
      Data?.message
        ? `
<!DOCTYPE html />
<html>
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <link href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    ${Data?.message}
  </body>
</html>
  `
        : '',
    [Data],
  );
  return (
    <Container
      useSafeAreaView={true}
      style={{flex: 1}}
      loading={
        ratingReviewReducer.aboutListingActionLoadingStatus ==
        LoadingStatus.LOADING
      }>
      <Spacer height={20} />
      <BackHeader />
      <PageTitle title={Data?.subject} />
      <View
        style={{
          paddingHorizontal: 20,
          flex: 1,
        }}>
        <AutoHeightWebView
          style={{
            width: Dimensions.get('window').width - 50,
          }}
          customScript={`document.body.style.background = 'white';`}
          onSizeUpdated={size => console.log(size.height)}
          source={{html: wrappedContent}}
          scalesPageToFit={true}
          viewportContent={'width=device-width, user-scalable=no'}
          scrollEnabled={false}
        />
      </View>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    authReducer: state.authReducer,
    ratingReviewReducer: state.ratingReviewReducer,
  };
};
const mapDispatchToProps = dispatch => ({
  getAbout: params => dispatch(aboutListingAction(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(About);
