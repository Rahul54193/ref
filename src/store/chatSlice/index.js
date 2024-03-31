export * from './chat.action';

import {
  resetChatSliceState,
  chatReducer,
  onNewMessageUpdate,
} from './chat.slice';

export {resetChatSliceState, onNewMessageUpdate};

export default chatReducer;
