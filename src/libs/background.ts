import 'babel-polyfill';
import { IsurlExait, getCurrentTabId, getStoreKey, setStore } from './utils/index';
import { SystemType } from './../source/type/storeType';
const updateTab = async (url: string) => {
  let { systemList } = await getStoreKey<{ systemList: Array<SystemType> }>(['systemList']);
  if (!systemList) systemList = [];
  let currectSystem = null;
  systemList.forEach((system) => {
    if (IsurlExait(url, system.urls)) {
      currectSystem = system;
    }
  });
  const currentTabId = await getCurrentTabId();
  setStore({ currectSystem: currectSystem });
  setStore({ currentTabId: currentTabId });
};
chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
  if (data.key === 'pageLoad' || data.key === 'visibilitychange') {
    updateTab(data.info.url);
    sendResponse();
  }
});
