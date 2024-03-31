import React, {useEffect, useRef} from 'react';
import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';

import {Container} from '@app/components';
import {
  addProductDetailAction,
  addProductImageAction,
  addProductPriceAction,
  getAllBrandAction,
  getAllProductDropdownAction,
  getAllProductModelAction,
  resetProductState,
  updateProductDetails,
  updateProductImage,
  updateProductPrice,
} from '@app/store/productSlice';
import {connect} from 'react-redux';
import AddProductDetail from './AddProductDetail';
import AddProductImage from './AddProductImage';
import AddProductPrice from './AddProductPrice';
import ProductHeader from './ProductHeader';
import {
  onDeleteCameraProductImage,
  updateProductImageFromCamera,
} from '@app/store/productSlice/productState.slice';
const {height, width} = Dimensions.get('window');

const AddProduct = props => {
  const {
    productReducer,
    getAllBrand,
    getAllProductDropdown,
    resetProductState,
  } = props;
  const [currentPage, setCurrentPage] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(true);
  const flatlistRef = useRef();

  useEffect(() => {
    getAllBrand();
    getAllProductDropdown();
    return () => {
      resetProductState();
    };
  }, []);

  const onPageNext = () => {
    if (currentPage < 2) {
      flatlistRef?.current?.scrollToIndex({
        animated: false,
        index: currentPage + 1,
      });
      setCurrentPage(currentPage + 1);
    }
    if (currentPage === 2) {
      setCurrentPage(0);
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
        }}>
        {currentPage == 0 ? (
          // <Page1 onPress={onPageNext} />
          <AddProductImage onNextClick={onPageNext} {...props} />
        ) : currentPage == 1 ? (
          <AddProductDetail onNextClick={onPageNext} {...props} />
        ) : currentPage == 2 ? (
          <AddProductPrice onNextClick={onPageNext} {...props} />
        ) : null}
      </View>
    );
  };
  return (
    <Container useSafeAreaView={true}>
      {Platform.OS === 'ios' ? (
        <KeyboardAvoidingView
          style={{
            flex: 1,
          }}
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <ProductHeader
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            goback={onPagePrev}
          />
          <FlatList
            horizontal
            scrollEnabled={false}
            ref={flatlistRef}
            data={[1, 2, 3]}
            keyExtractor={item => item.toString()}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            renderItem={renderItem}
            contentContainerStyle={{
              flexGrow: 1,
            }}
          />
        </KeyboardAvoidingView>
      ) : (
        <>
          <ProductHeader
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            goback={onPagePrev}
          />
          <FlatList
            horizontal
            scrollEnabled={false}
            ref={flatlistRef}
            data={[1, 2, 3]}
            keyExtractor={item => item.toString()}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            renderItem={renderItem}
            contentContainerStyle={{
              flexGrow: 1,
            }}
          />
        </>
      )}
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    authReducer: state?.authReducer,
    productReducer: state?.productReducer,
    productState: state?.productStateReducer,
  };
};

const mapDispatchToProps = dispatch => ({
  getAllBrand: params => dispatch(getAllBrandAction(params)),
  getAllProductDropdown: params =>
    dispatch(getAllProductDropdownAction(params)),
  getAllProductModel: params => dispatch(getAllProductModelAction(params)),
  onAddProductImage: params => dispatch(addProductImageAction(params)),
  onAddProductDetail: params => dispatch(addProductDetailAction(params)),
  onAddProductPrice: params => dispatch(addProductPriceAction(params)),
  updateProductDetails: params => dispatch(updateProductDetails(params)),
  updateProductPrice: params => dispatch(updateProductPrice(params)),
  updateProductImage: params => dispatch(updateProductImage(params)),
  onDeleteCameraProductImage: params =>
    dispatch(onDeleteCameraProductImage(params)),
  resetProductState: params => dispatch(resetProductState()),
  updateProductImageFromCamera: params =>
    dispatch(updateProductImageFromCamera(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);

const styles = StyleSheet.create({});
