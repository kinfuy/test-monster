import {
  getCurrentTabId,
  injectCustomJs,
  getStoreKey,
  setStore,
  clearStore,
  sendMessageToContentScript,
  chromeAddListenerMessage,
} from './chrome';
import {
  IsurlExait,
  createRandomCode,
  loadFile,
  image2Base64,
  addEventListener,
  removeEventListener,
  getXPath,
  getELementXpath,
  dispatchEventHandler,
} from './util';

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
  image2Base64,
  addEventListener,
  removeEventListener,
  chromeAddListenerMessage,
  getXPath,
  getELementXpath,
  dispatchEventHandler,
};
