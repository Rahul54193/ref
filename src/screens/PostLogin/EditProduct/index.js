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
  getAllDataAction,
  getAllProductDropdownAction,
  getAllProductModelAction,
  removeProductImage,
  updateProductImageAction,
} from '@app/store/productSlice';
import {connect} from 'react-redux';

import EditProductDetails from './EditProductDetail';
import EditProductHeader from './EditProductHeader';
import EditProductImage from './EditProductImage';
import EditProductPrice from './EditProductPrice';
const {height, width} = Dimensions.get('window');

const EditProduct = props => {
  const {getAllBrand, getAllProductDropdown, getAllProduct} = props;
  const [currentPage, setCurrentPage] = React.useState(0);
  const flatlistRef = useRef();

  useEffect(() => {
    getAllBrand();
    getAllProductDropdown();
    getAllProduct({product_id: props?.route?.params?.product_id});
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
    } else if (currentPage == 0) {
      props?.navigation?.goBack();
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
          <EditProductImage onNextClick={onPageNext} {...props} />
        ) : currentPage == 1 ? (
          <EditProductDetails onNextClick={onPageNext} {...props} />
        ) : currentPage == 2 ? (
          <EditProductPrice onNextClick={onPageNext} {...props} />
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
          <EditProductHeader currentPage={currentPage} goback={onPagePrev} />
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
          <EditProductHeader currentPage={currentPage} goback={onPagePrev} />
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
  getAllProduct: params => dispatch(getAllDataAction(params)),
  editProductImage: params => dispatch(updateProductImageAction(params)),
  removeProductImage: params => dispatch(removeProductImage(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);

const styles = StyleSheet.create({});
