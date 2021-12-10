import { unref } from 'vue';
import { clipboardStore } from './index';
const updateCurrectClipboard = (id: string, type: 'file' | 'floder', content = {}) => {
  clipboardStore.value.currect = {
    id: id,
    content: content,
    type: type,
  };
};
const clearCurrectClipboard = (history: boolean = false) => {
  const currect = unref(clipboardStore.value.currect);
  if (currect && history) clipboardStore.value.history.push(currect);
  clipboardStore.value.currect = undefined;
};
export const createAction = () => {
  return { updateCurrectClipboard, clearCurrectClipboard };
};
