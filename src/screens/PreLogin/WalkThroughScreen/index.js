import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import WalkThroughHeader from './WalkThroughHeader';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import NavigationService from '@app/navigations/NavigationService';
import {RoutesName} from '@app/helper/strings';
import {Container} from '@app/components';
import {SharedPreference} from '@app/helper';
const {height, width} = Dimensions.get('window');
const DATA = [1, 2, 3];

const WalkThroughScreen = ({setWalkthroughDisable}) => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const flatlistRef = useRef();

  const onPageNext = () => {
    if (currentPage < 2) {
      flatlistRef?.current?.scrollToIndex({
        animated: false,
        index: currentPage + 1,
      });
      setCurrentPage(currentPage + 1);
    }
    if (currentPage === 2) {
      // NavigationService.navigate(RoutesName.LOGIN_OPTIONS_SCREEN);
      setWalkthroughDisable(true);
      SharedPreference.setItem(
        SharedPreference.keys.WALKTHROUGH_DISABLE,
        'true',
      );
    }
  };
  const onPagePrev = () => {
    if (currentPage > 0) {
      flatlistRef?.current?.scrollToIndex({
        animated: false,
        index: currentPage - 1,
      });
      setCurrentPage(currentPage - 1);
    }
  };

  const handleScroll = event => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const page = Math.round(contentOffset / width);
    setCurrentPage(page);
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        key={index}
        style={{
          width: width,
          alignItems: 'center',
        }}>
        {currentPage == 0 ? (
          <Page1 onPress={onPageNext} />
        ) : currentPage == 1 ? (
          <Page2 onPress={onPageNext} />
        ) : currentPage == 2 ? (
          <Page3 onPress={onPageNext} />
        ) : null}
      </View>
    );
  };
  return (
    <Container useSafeAreaView={true}>
      <WalkThroughHeader
        onBack={onPagePrev}
        onSkip={() => {
          // NavigationService.navigate(RoutesName.LOGIN_OPTIONS_SCREEN);
          setWalkthroughDisable(true);
          SharedPreference.setItem(
            SharedPreference.keys.WALKTHROUGH_DISABLE,
            'true',
          );
        }}
        page={currentPage}
      />
      <FlatList
        horizontal
        ref={flatlistRef}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.toString()}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 10,
          paddingBottom: 20,
        }}
      />
    </Container>
  );
};

export default WalkThroughScreen;
