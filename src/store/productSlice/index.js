export * from './addProduct.action';

import {resetSliceState, productReducer} from './addProduct.slice';
import {
  resetProductState,
  updateProductDetails,
  productStateReducer,
  updateProductPrice,
  updateProductImage,
} from './productState.slice';

export {
  resetSliceState,
  resetProductState,
  updateProductDetails,
  updateProductPrice,
  updateProductImage,
  productReducer,
  productStateReducer,
};
