import {
  getCurrentTabId,
  injectCustomJs,
  getStoreKey,
  setStore,
  clearStore,
  sendMessageToContentScript,
  chromeAddListenerMessage,
} from './chrome';
import { IsurlExait, createRandomCode, loadFile, createTips, image2Base64, addEventListener } from './util';

export {
  sendMessageToContentScript,
  getCurrentTabId,
  IsurlExait,
  loadFile,
  createRandomCode,
  injectCustomJs,
  getStoreKey,
  setStore,
  clearStore,
  createTips,
  image2Base64,
  addEventListener,
  chromeAddListenerMessage,
};
