import { sendMessageToContentScript } from './postMessage';
import { injectCustomJs } from './inject';
import { getCurrentTabId } from './chrome';
import { getStoreKey, setStore, clearStore } from './store';
import { IsurlExait, createRandomCode, loadFile, createTips, getELement } from './util';

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
  getELement,
};
