export * from './exploreProduct.action';

import {
  exploreProductReducer,
  resetSliceState,
  resetserachstate,
  resetfreshFindsState,
} from './exploreProduct.slice';
import {
  addToCompareReducer,
  resetAddToProductSliceState,
  onAddToProductCompare,
} from './addToCompare.slice';

export {
  resetSliceState,
  resetfreshFindsState,
  addToCompareReducer,
  resetAddToProductSliceState,
  onAddToProductCompare,
};

export default exploreProductReducer;
