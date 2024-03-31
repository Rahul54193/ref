import Navigator from '@app//navigations/Navigator';
import {SharedPreference} from '@app/helper';
import {stayLoginAction, userProfile} from '@app/store/authSlice';
import {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import WalkThroughScreen from '../WalkThroughScreen';
import SplashView from './SplashView';

const SplashScreen = props => {
  const {checkIsLoggedInUser, getUserProfile} = props;

  const [isSplashEnd, setIsSplashEnd] = useState(false);
  const [walkthroughDisable, setWalkthroughDisable] = useState(false);

  useEffect(() => {
    SharedPreference.getItem(
      SharedPreference.keys.WALKTHROUGH_DISABLE,
      'false',
    ).then(res => {
      let val = res == 'true' ? true : false;
      setWalkthroughDisable(val);
    });
  }, [walkthroughDisable]);

  useEffect(() => {
    setTimeout(() => {
      setIsSplashEnd(true);
    }, 3000);
    checkIsLoggedInUser();
    getUserProfile();
  }, []);
  return isSplashEnd ? (
    walkthroughDisable ? (
      <Navigator />
    ) : (
      <WalkThroughScreen setWalkthroughDisable={setWalkthroughDisable} />
    )
  ) : (
    <SplashView />
  );
};

const mapStateToProps = state => {
  return {
    authReducer: state?.authReducer,
  };
};

const mapDispatchToProps = dispatch => ({
  checkIsLoggedInUser: () => dispatch(stayLoginAction()),
  getUserProfile: () => dispatch(userProfile()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
