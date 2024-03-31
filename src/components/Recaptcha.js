import React, {useEffect, useRef} from 'react';
import {View, Button} from 'react-native';

import Recaptcha from 'react-native-recaptcha-that-works';

const G_Recaptcha = () => {
  const recaptcha = useRef();

  useEffect(() => {
    recaptcha.current.open();
  }, []);

  const onVerify = token => {
    console.log('success!', token);
  };

  const onExpire = () => {
    console.warn('expired!');
  };

  return (
    <View>
      <Recaptcha
        ref={recaptcha}
        siteKey="6LffbdMmAAAAAIY1TIokrTY21t1Z7ymsoEFTBFyz"
        baseUrl="https://www.sgwatchinsider.com/"
        onVerify={onVerify}
        onExpire={onExpire}
        size="normal"
      />
    </View>
  );
};

export default G_Recaptcha;
