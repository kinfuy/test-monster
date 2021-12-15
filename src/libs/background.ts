import 'babel-polyfill';
import {
  chromeAddListenerMessage,
  sendMessageToContentScript,
  createContextMenus,
  getChromeUrl,
  commandAddListener,
  setStore,
} from './utils';
import { Eventkey } from './utils/const';
createContextMenus('脚本检索', (info, tab) => {
  sendMessageToContentScript({
    key: Eventkey.MONSTER_SCRIPT_TRAY,
  });
});
commandAddListener((name: string) => {
  if (name === 'script-search') {
    sendMessageToContentScript({
      key: Eventkey.MONSTER_SCRIPT_TRAY,
    });
  }
});
chromeAddListenerMessage((request, sendResponse) => {
  sendResponse();
  if (request.key === Eventkey.MONSTER_RECORD_STOP) {
    window.open(getChromeUrl(`/libs/views/script.html`));
    setStore({ currectEventList: request.data });
  }
});
